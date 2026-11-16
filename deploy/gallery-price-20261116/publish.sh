#!/usr/bin/env bash
set -Eeuo pipefail
test "$(id -u)" = 0
test "$(date -u +%s)" -lt "$(date -u -d '2026-11-22 21:00:00 UTC' +%s)" || { echo 'Discount expired; do not reapply'; exit 1; }
exec 9>/run/lock/agk-main-update.lock
flock -n 9
base=/var/www/agk-main
previous=$(readlink -f "$base/current")
case "$previous" in /var/www/agk-main/releases/*) ;; *) exit 1;; esac
stamp=$(date -u +%Y%m%d-%H%M%S)-$$
backup=/var/backups/agk-main/gallery-price-$stamp
release=$base/releases/gallery-price-$stamp
mkdir -p "$backup/payload"
printf '%s\n' "$previous" > "$backup/previous-release.txt"
curl --retry 3 -fsSL https://raw.githubusercontent.com/sergey9lap-sys/agk-main/release/metrika-20261116/deploy/gallery-price-20261116/payload.tar.gz -o "$backup/payload.tar.gz"
printf '%s  %s\n' '31e5b6f4218ddd1dcbb3175f0a55a5d6cf1ffe25fbcab7c386bd92a17f1812ac' "$backup/payload.tar.gz" | sha256sum -c -
python3 - "$previous" "$release" "$backup" <<'PY'
from pathlib import Path
import sys,tarfile,shutil,os,hashlib,json
old,new,backup=map(Path,sys.argv[1:]);payload=backup/'payload'
with tarfile.open(backup/'payload.tar.gz') as t:
 for m in t.getmembers():
  p=Path(m.name);assert not p.is_absolute() and '..' not in p.parts and m.isfile()
 t.extractall(payload)
scope={'__name__':'deploy'};exec((payload/'patch.py').read_text(),scope)
def manifest(root):return {str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in root.rglob('*') if p.is_file()}
before=manifest(old)
shutil.copytree(old,new,copy_function=os.link,symlinks=True)
scope['patch'](new,payload)
allowed={'method-fest/index.html'}
for src in [payload/'events-gallery.js',payload/'events-gallery.css',*sorted((payload/'assets').glob('*.webp'))]:
 rel=Path('method-fest')/src.relative_to(payload);target=new/rel
 if target.exists():target.unlink()
 target.write_bytes(src.read_bytes());target.chmod(0o644);allowed.add(str(rel))
after=manifest(new)
assert {k:v for k,v in before.items() if k not in allowed}=={k:v for k,v in after.items() if k not in allowed}
assert before==manifest(old)
(backup/'before.json').write_text(json.dumps(before))
print('OTHER_FILES_IDENTICAL',len([k for k in before if k not in allowed]))
PY
test "$(readlink -f "$base/current")" = "$previous"
switched=0
rollback(){ if test "$switched" = 1; then ln -s "$previous" "$base/current.rollback-$stamp"; mv -Tf "$base/current.rollback-$stamp" "$base/current"; fi; }
trap rollback EXIT
ln -s "$release" "$base/current.gallery-$stamp"
mv -Tf "$base/current.gallery-$stamp" "$base/current"
switched=1
for path in index.html events-gallery.js events-gallery.css assets/gathering-20.webp; do
 curl --retry 2 -fsSL --resolve agk-edu.ru:443:127.0.0.1 "https://agk-edu.ru/method-fest/$path" -o "$backup/health"
 cmp "$backup/health" "$release/method-fest/$path"
done
install -d -m 755 /opt/agk-main/scheduled
install -m 644 "$backup/payload/restore-price.py" /opt/agk-main/scheduled/method-fest-restore-price.py
cat > /etc/systemd/system/agk-method-fest-price.service <<'UNIT'
[Unit]
Description=Restore Method Fest Author price to 3900 RUB
After=network-online.target
Wants=network-online.target
[Service]
Type=oneshot
ExecStart=/usr/bin/python3 /opt/agk-main/scheduled/method-fest-restore-price.py
UNIT
cat > /etc/systemd/system/agk-method-fest-price.timer <<'UNIT'
[Unit]
Description=Restore Author price on 23 November at 00:00 Moscow
[Timer]
OnCalendar=2026-11-22 21:00:00 UTC
Persistent=true
AccuracySec=1s
RandomizedDelaySec=0
Unit=agk-method-fest-price.service
[Install]
WantedBy=timers.target
UNIT
systemd-analyze verify /etc/systemd/system/agk-method-fest-price.service /etc/systemd/system/agk-method-fest-price.timer
systemctl daemon-reload
systemctl enable --now agk-method-fest-price.timer
systemctl is-active --quiet agk-method-fest-price.timer
systemctl list-timers agk-method-fest-price.timer --no-pager
switched=0
trap - EXIT
echo GALLERY_AND_PRICE_2900_OK
echo "Backup: $backup"
