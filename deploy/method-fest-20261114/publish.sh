#!/usr/bin/env bash
set -Eeuo pipefail
test "$(id -u)" = 0 || { echo 'Run in the root console'; exit 1; }
exec 9>/run/lock/agk-main-update.lock
flock -n 9 || { echo 'Another AGK update is running'; exit 1; }
exec 8>/var/lock/agk-moderator.lock
flock -n 8 || { echo 'Another AGK update is running'; exit 1; }
base=/var/www/agk-main
previous=$(readlink -f "$base/current")
case "$previous" in /var/www/agk-main/releases/*) ;; *) echo 'Unexpected AGK current path'; exit 1;; esac
test -f "$previous/moderator/index.html"
stamp=$(date -u +%Y%m%d-%H%M%S)-$$
backup=/var/backups/agk-main/method-fest-$stamp
release=$base/releases/method-fest-$stamp
mkdir -p "$backup"
printf '%s\n' "$previous" > "$backup/previous-release.txt"
curl --retry 3 --connect-timeout 15 -fsSL 'https://raw.githubusercontent.com/sergey9lap-sys/agk-main/release/method-fest-20261114/deploy/method-fest-20261114/site.tar.gz' -o "$backup/site.tar.gz"
printf '%s  %s\n' 'e3db869c62cf702d9fa14b30d0ca3c7731e4a248c57cf7adf881691ff0cd3e3b' "$backup/site.tar.gz" | sha256sum -c -
python3 - "$previous" "$release" "$backup" <<'PY'
import sys,os,tarfile,hashlib,json,shutil
from pathlib import Path
old,new,backup=map(Path,sys.argv[1:])
assert not new.exists()
assert old.is_dir() and old.parent==Path('/var/www/agk-main/releases')
with tarfile.open(backup/'site.tar.gz') as t:
 for m in t.getmembers():
  p=Path(m.name)
  assert not p.is_absolute() and '..' not in p.parts and p.parts[0]=='method-fest'
  assert m.isfile() or m.isdir(), 'Unexpected archive entry'
 shutil.copytree(old,new,copy_function=os.link,symlinks=True,ignore=lambda path,names:['method-fest'] if Path(path)==old else [])
 t.extractall(new)
def manifest(root):
 return {str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in root.rglob('*') if p.is_file() and p.relative_to(root).parts[0]!='method-fest'}
a,b=manifest(old),manifest(new)
assert a==b,'Unrelated site changed'
(backup/'other-files.json').write_text(json.dumps(a,sort_keys=True))
route=new/'method-fest'
assert (route/'index.html').is_file() and (route/'thanks/index.html').is_file()
for p in [route,*route.rglob('*')]:os.chmod(p,0o755 if p.is_dir() else 0o644)
print('OTHER_FILES_IDENTICAL',len(a))
PY
test "$(readlink -f "$base/current")" = "$previous"
switched=0
rollback(){ if test "$switched" = 1 && test "$(readlink -f "$base/current")" = "$release"; then ln -s "$previous" "$base/current.rollback-$stamp"; mv -Tf "$base/current.rollback-$stamp" "$base/current"; echo 'Rolled back to previous release'; fi; }
trap rollback EXIT
ln -s "$release" "$base/current.method-fest-$stamp"
mv -Tf "$base/current.method-fest-$stamp" "$base/current"
switched=1
for path in index.html thanks/index.html audience-v7.css assets/audience-busts-v7.webp thanks/thanks.css assets/thanks-scene.webp; do
 curl --retry 2 -fsSL --resolve agk-edu.ru:443:127.0.0.1 "https://agk-edu.ru/method-fest/$path" -o "$backup/health-file"
 cmp "$backup/health-file" "$release/method-fest/$path"
done
curl -fsSL --resolve agk-edu.ru:443:127.0.0.1 https://agk-edu.ru/moderator/ -o "$backup/moderator-after.html"
cmp "$backup/moderator-after.html" "$previous/moderator/index.html"
switched=0
trap - EXIT
printf 'METHOD_FEST_DEPLOY_OK\nhttps://agk-edu.ru/method-fest/\nhttps://agk-edu.ru/method-fest/thanks/\nBackup: %s\n' "$backup"
