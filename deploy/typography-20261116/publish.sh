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
script=base64.b64decode('KCgpPT57CiBjb25zdCBuYnNwPSdcdTAwYTAnOwogZnVuY3Rpb24gZm9ybWF0KHMpewogIHJldHVybiBzLnJlcGxhY2UoL9CT0L7RgNC10LIoW9CwLdGP0ZFdKilbLeKAkV3QmtGD0YDRgtGL0YjQtdCyKFvQsC3Rj9GRXSopL2dpLCfQk9C+0YDQtdCyJDHigJHQmtGD0YDRgtGL0YjQtdCyJDInKQogICAucmVwbGFjZSgvKFxkKVsgXHUwMGEwXSg/PVxkezN9KD86XER8JCkpL2csJyQxJytuYnNwKQogICAucmVwbGFjZSgvKFxkKVsgXHUwMGEwXSsoPz0oPzrRgNGD0LFcLnzRgNGD0LHQu9C10Ll80YDRg9Cx0LvRj3zRgNGD0LHQu9GMfOKCvXwlfNGH0LDRgXzQvNC40L3Rg9GCfNC00LXQutCw0LHRgNGPfNC90L7Rj9Cx0YDRj3zQvNC10YHRgnzQvNC+0LTRg9C7fNGC0LXQvCkoPzpcYnxb0LAt0Y/RkS5dfCQpKS9naSwnJDEnK25ic3ApCiAgIC5yZXBsYWNlKC8oXGQpWyBcdTAwYTBdKlvigJPigJQtXVsgXHUwMGEwXSooPz1cZCkvZywnJDFcdTIwNjDigJNcdTIwNjAnKQogICAucmVwbGFjZSgvKFteXHNdKVsgXSsoW+KAlOKAk10pKD89XHMpL2csJyQxJytuYnNwKyckMicpCiAgIC5yZXBsYWNlKC8oXnxbXHMowqtdKSgoPzrQsnzQstC+fNC90LB80Lp80LrQvnzRgXzRgdC+fNGDfNC+fNC+0LF80L7QsdC+fNC+0YJ80LTQvnzQuNC3fNC30LB80L/QvnzQv9C+0LR80L3QsNC0fNC00LvRj3zQsdC10Ld80L/RgNC4fNC4fNCwfNC90L580L3QtXzQvdC4KSkgKyg/PVxTKS9naSwnJDEkMicrbmJzcCk7CiB9CiBjb25zdCB3YWxrZXI9ZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihkb2N1bWVudC5ib2R5LE5vZGVGaWx0ZXIuU0hPV19URVhULHthY2NlcHROb2RlOm49Pm4ucGFyZW50RWxlbWVudC5jbG9zZXN0KCdzY3JpcHQsc3R5bGUsdGV4dGFyZWEsaW5wdXQsY29kZSxwcmUsW2NvbnRlbnRlZGl0YWJsZV0nKT9Ob2RlRmlsdGVyLkZJTFRFUl9SRUpFQ1Q6Tm9kZUZpbHRlci5GSUxURVJfQUNDRVBUfSk7CiBjb25zdCBub2Rlcz1bXTt3aGlsZSh3YWxrZXIubmV4dE5vZGUoKSlub2Rlcy5wdXNoKHdhbGtlci5jdXJyZW50Tm9kZSk7CiBub2Rlcy5mb3JFYWNoKG49Pm4ubm9kZVZhbHVlPWZvcm1hdChuLm5vZGVWYWx1ZSkpOwogY29uc3QgaW50cm89ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm8gLmludHJvJyk7CiBpZihpbnRybyYmaW50cm8udGV4dENvbnRlbnQuaW5jbHVkZXMoJ9CR0L7Qu9GM0YjQvtC5INC/0YDQvtC00YPQutGC0L7QstGL0Lkg0YXQsNC60LDRgtC+0L0nKSl7CiAgaW50cm8ucmVwbGFjZUNoaWxkcmVuKCk7CiAgZm9yKGNvbnN0IHRleHQgb2YgWyfQkdC+0LvRjNGI0L7QuSDQv9GA0L7QtNGD0LrRgtC+0LLRi9C5INGF0LDQutCw0YLQvtC9Jywn0JDQu9C10LrRgdCw0L3QtNGA0Ysg0JPQvtGA0LXQstC+0LnigJHQmtGD0YDRgtGL0YjQtdCy0L7QuSddKXtjb25zdCBzcGFuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtzcGFuLnRleHRDb250ZW50PXRleHQ7c3Bhbi5jbGFzc05hbWU9J2Fnay1pbnRyby1saW5lJztpbnRyby5hcHBlbmQoc3Bhbik7fQogfQogLy8gS2VlcCBlYWNoIHN1cm5hbWUgaW50YWN0OyBhbGxvdyB0aGUgZmlyc3QgbmFtZSB0byB3cmFwIGluIG5hcnJvdyBjYXJkcy4KIGNvbnN0IHN0eWxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7c3R5bGUudGV4dENvbnRlbnQ9Jy5hZ2staW50cm8tbGluZXtkaXNwbGF5OmJsb2NrO3doaXRlLXNwYWNlOm5vd3JhcH0uaGVybyAuaW50cm97bWF4LXdpZHRoOjEwMCV9QG1lZGlhKG1heC13aWR0aDo0MjBweCl7Lmhlcm8gLmludHJve2ZvbnQtc2l6ZTpjbGFtcCgxNHB4LDQuMXZ3LDE3cHgpIWltcG9ydGFudDtsZXR0ZXItc3BhY2luZzotLjAyZW19fSc7ZG9jdW1lbnQuaGVhZC5hcHBlbmQoc3R5bGUpOwogZnVuY3Rpb24gZml0KCl7CiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaDEsaDIsaDMsLmFnay1pbnRyby1saW5lJykuZm9yRWFjaChlPT57CiAgIGlmKCFlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKXJldHVybjsKICAgaWYoZS5kYXRhc2V0LnR5cG9TaXplKXtlLnN0eWxlLmZvbnRTaXplPWUuZGF0YXNldC50eXBvU2l6ZTt9CiAgIGVsc2UgZS5kYXRhc2V0LnR5cG9TaXplPWUuc3R5bGUuZm9udFNpemV8fCcnOwogICBsZXQgc2l6ZT1wYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoZSkuZm9udFNpemUpOwogICB3aGlsZShlLnNjcm9sbFdpZHRoPmUuY2xpZW50V2lkdGgrMiYmc2l6ZT4xNCl7c2l6ZS09LjU7ZS5zdHlsZS5mb250U2l6ZT1zaXplKydweCc7fQogIH0pOwogfQogZG9jdW1lbnQuZm9udHMucmVhZHkudGhlbihmaXQpO3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLGZpdCk7Cn0pKCk7Cg==')
patchcode=base64.b64decode('ZnJvbSBwYXRobGliIGltcG9ydCBQYXRoClJPVVRFUz1bJ21vZGVyYXRvci9pbmRleC5odG1sJywnbW9kZXJhdG9yL3RoYW5rcy9pbmRleC5odG1sJywnbWV0aG9kLWZlc3QvaW5kZXguaHRtbCcsJ21ldGhvZC1mZXN0L3RoYW5rcy9pbmRleC5odG1sJ10KVEFHPSc8c2NyaXB0IGRlZmVyIHNyYz0iL2Fnay10eXBvZ3JhcGh5LTIwMjYxMTE2LmpzIj48L3NjcmlwdD4nCmRlZiBwYXRjaChyb290LHNjcmlwdCk6CiBmb3IgciBpbiBST1VURVM6CiAgcD1QYXRoKHJvb3QpL3I7cz1wLnJlYWRfYnl0ZXMoKQogIGlmIFRBRy5lbmNvZGUoKSBub3QgaW4gczoKICAgbj1zLnJlcGxhY2UoYic8L2hlYWQ+JyxUQUcuZW5jb2RlKCkrYic8L2hlYWQ+JywxKTthc3NlcnQgbiE9cwogICBwLnVubGluaygpO3Aud3JpdGVfYnl0ZXMobik7cC5jaG1vZCgwbzY0NCkKIHQ9UGF0aChyb290KS8nYWdrLXR5cG9ncmFwaHktMjAyNjExMTYuanMnCiBpZiB0LmV4aXN0cygpOnQudW5saW5rKCkKIHQud3JpdGVfYnl0ZXMoUGF0aChzY3JpcHQpLnJlYWRfYnl0ZXMoKSk7dC5jaG1vZCgwbzY0NCkK')
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
