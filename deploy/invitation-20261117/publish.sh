#!/bin/bash
set -euo pipefail
test "$(id -u)" = 0
exec 9>/run/lock/agk-main-update.lock
flock -n 9
exec 8>/var/lock/agk-moderator.lock
flock -n 8
base=/var/www/agk-main
previous=$(readlink -f "$base/current")
case "$previous" in /var/www/agk-main/releases/*) ;; *) exit 1;; esac
test ! -e "$previous/mf_invite"
stamp=$(date -u +%Y%m%d-%H%M%S)-$$
backup=/var/backups/agk-main/invitation-$stamp
release=$base/releases/invitation-$stamp
mkdir -p "$backup"
printf '%s\n' "$previous" > "$backup/previous-release.txt"
curl --retry 2 -fsSL https://raw.githubusercontent.com/sergey9lap-sys/agk-main/release/metrika-20261116/deploy/invitation-20261117/public.tar.gz -o "$backup/public.tar.gz"
echo "f8cff4ffdac064aaacd67a8901fd53b85398d9458780b49d0f5820ed75c41137  $backup/public.tar.gz" | sha256sum -c -
python3 - "$previous" "$release" "$backup" <<'PY'
import sys,os,shutil,hashlib,json,tarfile
from pathlib import Path,PurePosixPath
old,new,backup=map(Path,sys.argv[1:])
assert old.is_dir() and old.parent==Path('/var/www/agk-main/releases') and not new.exists()
assert not (old/'mf_invite').exists()
def manifest(root):
 return {str(f.relative_to(root)):hashlib.sha256(f.read_bytes()).hexdigest() for f in root.rglob('*') if f.is_file()}
before=manifest(old)
shutil.copytree(old,new,copy_function=os.link,symlinks=True)
dest=new/'mf_invite';dest.mkdir(mode=0o755)
allowed={'index.html','tokens.css','invite.css','invite.js','invitation.pdf','method-fest.ics'}
with tarfile.open(backup/'public.tar.gz') as t:
 for m in t.getmembers():
  p=PurePosixPath(m.name)
  assert m.isfile() and not p.is_absolute() and '..' not in p.parts
  assert m.name in allowed or (len(p.parts)==2 and p.parts[0]=='assets' and p.suffix in {'.webp','.gif','.svg','.woff2'})
  target=dest/m.name;target.parent.mkdir(parents=True,exist_ok=True,mode=0o755)
  with t.extractfile(m) as src,target.open('wb') as out:shutil.copyfileobj(src,out)
  target.chmod(0o644)
assert all((dest/n).is_file() for n in allowed)
assert '1500' in (dest/'invite.js').read_text()
after=manifest(new)
assert before=={k:v for k,v in after.items() if not k.startswith('mf_invite/')},'Unrelated files changed'
assert before==manifest(old),'Previous release changed'
(backup/'before.json').write_text(json.dumps(before,sort_keys=True))
print('UNRELATED_FILES_IDENTICAL',len(before))
PY
test "$(readlink -f "$base/current")" = "$previous"
switched=0
rollback(){ if test "$switched" = 1 && test "$(readlink -f "$base/current")" = "$release"; then ln -s "$previous" "$base/current.rollback-$stamp"; mv -Tf "$base/current.rollback-$stamp" "$base/current"; echo ROLLED_BACK; fi; }
trap rollback EXIT
ln -s "$release" "$base/current.invitation-$stamp"
mv -Tf "$base/current.invitation-$stamp" "$base/current"
switched=1
for path in mf_invite/index.html mf_invite/invite.js mf_invite/invite.css mf_invite/assets/opening.webp mf_invite/invitation.pdf mf_invite/method-fest.ics moderator/index.html method-fest/index.html; do
 curl --retry 2 -fsSL --resolve agk-edu.ru:443:127.0.0.1 "https://agk-edu.ru/$path" -o "$backup/health-file"
 cmp "$backup/health-file" "$release/$path"
done
switched=0
trap - EXIT
echo INVITATION_DEPLOY_OK
echo "Backup: $backup"
systemctl is-active agk-method-fest-price.timer
