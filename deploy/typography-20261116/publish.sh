#!/usr/bin/env bash
set -Eeuo pipefail
test "$(id -u)" = 0
exec 9>/run/lock/agk-main-update.lock
flock -n 9
exec 8>/var/lock/agk-moderator.lock
flock -n 8
base=/var/www/agk-main
previous=$(readlink -f "$base/current")
case "$previous" in /var/www/agk-main/releases/*) ;; *) exit 1;; esac
stamp=$(date -u +%Y%m%d-%H%M%S)-$$
backup=/var/backups/agk-main/typography-$stamp
release=$base/releases/typography-$stamp
mkdir -p "$backup"
printf '%s\n' "$previous" > "$backup/previous-release.txt"
python3 - "$previous" "$release" "$backup" <<'PY'
import sys,os,shutil,hashlib,json,base64
from pathlib import Path
old,new,backup=map(Path,sys.argv[1:])
assert old.is_dir() and old.parent==Path('/var/www/agk-main/releases') and not new.exists()
script=base64.b64decode('KCgpPT57DQogY29uc3QgbmJzcD0nXHUwMGEwJzsNCiBmdW5jdGlvbiBmb3JtYXQocyl7DQogIHJldHVybiBzLnJlcGxhY2UoL9CT0L7RgNC10LIoW9CwLdGP0ZFdKilbLeKAkV3QmtGD0YDRgtGL0YjQtdCyKFvQsC3Rj9GRXSopL2dpLCfQk9C+0YDQtdCyJDHigJHQmtGD0YDRgtGL0YjQtdCyJDInKQ0KICAgLnJlcGxhY2UoLyhcZClbIFx1MDBhMF0oPz1cZHszfSg/OlxEfCQpKS9nLCckMScrbmJzcCkNCiAgIC5yZXBsYWNlKC8oXGQpWyBcdTAwYTBdKyg/PSg/OtGA0YPQsVwufNGA0YPQsdC70LXQuXzRgNGD0LHQu9GPfNGA0YPQsdC70Yx84oK9fCV80YfQsNGBfNC80LjQvdGD0YJ80LTQtdC60LDQsdGA0Y980L3QvtGP0LHRgNGPfNC80LXRgdGCfNC80L7QtNGD0Lt80YLQtdC8KSg/OlxifFvQsC3Rj9GRLl18JCkpL2dpLCckMScrbmJzcCkNCiAgIC5yZXBsYWNlKC8oXGQpWyBcdTAwYTBdKlvigJPigJQtXVsgXHUwMGEwXSooPz1cZCkvZywnJDFcdTIwNjDigJNcdTIwNjAnKQ0KICAgLnJlcGxhY2UoLyhbXlxzXSlbIF0rKFvigJTigJNdKSg/PVxzKS9nLCckMScrbmJzcCsnJDInKQ0KICAgLnJlcGxhY2UoLyhefFtccyjCq10pKCg/OtCyfNCy0L580L3QsHzQunzQutC+fNGBfNGB0L580YN80L580L7QsXzQvtCx0L580L7RgnzQtNC+fNC40Ld80LfQsHzQv9C+fNC/0L7QtHzQvdCw0LR80LTQu9GPfNCx0LXQt3zQv9GA0Lh80Lh80LB80L3QvnzQvdC1fNC90LgpKSArKD89XFMpL2dpLCckMSQyJytuYnNwKTsNCiB9DQogY29uc3Qgd2Fsa2VyPWRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoZG9jdW1lbnQuYm9keSxOb2RlRmlsdGVyLlNIT1dfVEVYVCx7YWNjZXB0Tm9kZTpuPT5uLnBhcmVudEVsZW1lbnQuY2xvc2VzdCgnc2NyaXB0LHN0eWxlLHRleHRhcmVhLGlucHV0LGNvZGUscHJlLFtjb250ZW50ZWRpdGFibGVdJyk/Tm9kZUZpbHRlci5GSUxURVJfUkVKRUNUOk5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVH0pOw0KIGNvbnN0IG5vZGVzPVtdO3doaWxlKHdhbGtlci5uZXh0Tm9kZSgpKW5vZGVzLnB1c2god2Fsa2VyLmN1cnJlbnROb2RlKTsNCiBub2Rlcy5mb3JFYWNoKG49PntuLm5vZGVWYWx1ZT1mb3JtYXQobi5ub2RlVmFsdWUpO2lmKGxvY2F0aW9uLnBhdGhuYW1lLmluY2x1ZGVzKCcvdGhhbmtzLycpKW4ubm9kZVZhbHVlPW4ubm9kZVZhbHVlLnJlcGxhY2UoLyjQkNC70LXQutGB0LDQvdC00YBb0LAt0Y/RkV0qKSArKD890JPQvtGA0LXQsikvZywnJDEnK25ic3ApO30pOw0KIGNvbnN0IGludHJvPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvIC5pbnRybycpOw0KIGlmKGludHJvJiZpbnRyby50ZXh0Q29udGVudC5pbmNsdWRlcygn0JHQvtC70YzRiNC+0Lkg0L/RgNC+0LTRg9C60YLQvtCy0YvQuSDRhdCw0LrQsNGC0L7QvScpKXsNCiAgaW50cm8ucmVwbGFjZUNoaWxkcmVuKCk7DQogIGZvcihjb25zdCB0ZXh0IG9mIFsn0JHQvtC70YzRiNC+0Lkg0L/RgNC+0LTRg9C60YLQvtCy0YvQuSDRhdCw0LrQsNGC0L7QvScsJ9CQ0LvQtdC60YHQsNC90LTRgNGLINCT0L7RgNC10LLQvtC54oCR0JrRg9GA0YLRi9GI0LXQstC+0LknXSl7Y29uc3Qgc3Bhbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7c3Bhbi50ZXh0Q29udGVudD10ZXh0O3NwYW4uY2xhc3NOYW1lPSdhZ2staW50cm8tbGluZSc7aW50cm8uYXBwZW5kKHNwYW4pO30NCiB9DQogLy8gS2VlcCBlYWNoIHN1cm5hbWUgaW50YWN0OyBhbGxvdyB0aGUgZmlyc3QgbmFtZSB0byB3cmFwIGluIG5hcnJvdyBjYXJkcy4NCiBjb25zdCBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO3N0eWxlLnRleHRDb250ZW50PScuYWdrLWludHJvLWxpbmV7ZGlzcGxheTpibG9jazt3aGl0ZS1zcGFjZTpub3dyYXB9Lmhlcm8gLmludHJve21heC13aWR0aDoxMDAlfUBtZWRpYShtYXgtd2lkdGg6NDIwcHgpey5oZXJvIC5pbnRyb3tmb250LXNpemU6Y2xhbXAoMTRweCw0LjF2dywxN3B4KSFpbXBvcnRhbnQ7bGV0dGVyLXNwYWNpbmc6LS4wMmVtfX0nO2RvY3VtZW50LmhlYWQuYXBwZW5kKHN0eWxlKTsNCiBmdW5jdGlvbiBmaXQoKXsNCiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaDEsaDIsaDMsLmFnay1pbnRyby1saW5lJykuZm9yRWFjaChlPT57DQogICBpZighZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aClyZXR1cm47DQogICBpZihlLmRhdGFzZXQudHlwb1NpemUpe2Uuc3R5bGUuZm9udFNpemU9ZS5kYXRhc2V0LnR5cG9TaXplO30NCiAgIGVsc2UgZS5kYXRhc2V0LnR5cG9TaXplPWUuc3R5bGUuZm9udFNpemV8fCcnOw0KICAgbGV0IHNpemU9cGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGUpLmZvbnRTaXplKTsNCiAgIHdoaWxlKGUuc2Nyb2xsV2lkdGg+ZS5jbGllbnRXaWR0aCsyJiZzaXplPjE0KXtzaXplLT0uNTtlLnN0eWxlLmZvbnRTaXplPXNpemUrJ3B4Jzt9DQogIH0pOw0KIH0NCiBkb2N1bWVudC5mb250cy5yZWFkeS50aGVuKGZpdCk7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsZml0KTsNCn0pKCk7DQo=')
patchcode=base64.b64decode('ZnJvbSBwYXRobGliIGltcG9ydCBQYXRoClJPVVRFUz1bJ21vZGVyYXRvci9pbmRleC5odG1sJywnbW9kZXJhdG9yL3RoYW5rcy9pbmRleC5odG1sJywnbWV0aG9kLWZlc3QvaW5kZXguaHRtbCcsJ21ldGhvZC1mZXN0L3RoYW5rcy9pbmRleC5odG1sJ10KVEFHPSc8c2NyaXB0IGRlZmVyIHNyYz0iL2Fnay10eXBvZ3JhcGh5LTIwMjYxMTE2LmpzP3Y9MiI+PC9zY3JpcHQ+JwpkZWYgcGF0Y2gocm9vdCxzY3JpcHQpOgogZm9yIHIgaW4gUk9VVEVTOgogIHA9UGF0aChyb290KS9yO3M9cC5yZWFkX2J5dGVzKCkKICBzPXMucmVwbGFjZShiJzxzY3JpcHQgZGVmZXIgc3JjPSIvYWdrLXR5cG9ncmFwaHktMjAyNjExMTYuanM/dj0yIj48L3NjcmlwdD4nLGInJykKICBpZiBUQUcuZW5jb2RlKCkgbm90IGluIHM6CiAgIG49cy5yZXBsYWNlKGInPC9oZWFkPicsVEFHLmVuY29kZSgpK2InPC9oZWFkPicsMSk7YXNzZXJ0IG4hPXMKICAgcC51bmxpbmsoKTtwLndyaXRlX2J5dGVzKG4pO3AuY2htb2QoMG82NDQpCiB0PVBhdGgocm9vdCkvJ2Fnay10eXBvZ3JhcGh5LTIwMjYxMTE2LmpzJwogaWYgdC5leGlzdHMoKTp0LnVubGluaygpCiB0LndyaXRlX2J5dGVzKFBhdGgoc2NyaXB0KS5yZWFkX2J5dGVzKCkpO3QuY2htb2QoMG82NDQpCg==')
(backup/'metrika.js').write_bytes(script)
scope={'__name__':'deploy'}
exec(patchcode,scope)
allowed=set(scope['ROUTES'])|{'agk-typography-20261116.js'}
def manifest(root):
 return {str(f.relative_to(root)):hashlib.sha256(f.read_bytes()).hexdigest() for f in root.rglob('*') if f.is_file()}
before=manifest(old)
shutil.copytree(old,new,copy_function=os.link,symlinks=True)
scope['patch'](new,backup/'metrika.js')
after=manifest(new)
assert {k:v for k,v in before.items() if k not in allowed}=={k:v for k,v in after.items() if k not in allowed},'Unrelated files changed'
assert before==manifest(old),'Previous release was changed'
(backup/'before.json').write_text(json.dumps(before,sort_keys=True))
print('UNRELATED_FILES_IDENTICAL',len([k for k in before if k not in allowed]))
PY
test "$(readlink -f "$base/current")" = "$previous"
switched=0
rollback(){ if test "$switched" = 1 && test "$(readlink -f "$base/current")" = "$release"; then ln -s "$previous" "$base/current.rollback-$stamp"; mv -Tf "$base/current.rollback-$stamp" "$base/current"; echo ROLLED_BACK; fi; }
trap rollback EXIT
ln -s "$release" "$base/current.typography-$stamp"
mv -Tf "$base/current.typography-$stamp" "$base/current"
switched=1
for path in moderator/index.html moderator/thanks/index.html method-fest/index.html method-fest/thanks/index.html agk-typography-20261116.js; do
 curl --retry 2 -fsSL --resolve agk-edu.ru:443:127.0.0.1 "https://agk-edu.ru/$path" -o "$backup/health-file"
 cmp "$backup/health-file" "$release/$path"
done
switched=0
trap - EXIT
echo TYPOGRAPHY_DEPLOY_OK
echo "Backup: $backup"
