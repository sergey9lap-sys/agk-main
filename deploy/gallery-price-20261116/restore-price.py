"""Run only from the confirmed one-shot server timer, against the current release."""
from pathlib import Path
import os,re,shutil,datetime,fcntl,subprocess
lock=open('/run/lock/agk-main-update.lock','w');fcntl.flock(lock,fcntl.LOCK_EX)
base=Path('/var/www/agk-main');old=(base/'current').resolve()
assert old.parent==base/'releases'
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%d-%H%M%S')
new=base/'releases'/('method-price-3900-'+stamp)
p=old/'method-fest/index.html';before=p.read_bytes()
pattern=rb'(<article\b[^>]*id="author-ticket"[^>]*>.*?<div class="ticket-bottom"><strong>)(.*?)(</strong>)'
found=list(re.finditer(pattern,before,re.S));assert len(found)==1
current=found[0][2].decode('utf8')
if re.sub(r'\s','',current)=='3900руб.':print('PRICE_ALREADY_3900');raise SystemExit(0)
assert re.sub(r'\s','',current)=='2900руб.', 'Unexpected price; preserve manual changes'
after=re.sub(pattern,lambda m:m[1]+'3\u00a0900\u00a0руб.'.encode()+m[3],before,flags=re.S)
shutil.copytree(old,new,copy_function=os.link,symlinks=True)
target=new/'method-fest/index.html';target.unlink();target.write_bytes(after);target.chmod(0o644)
backup=Path('/var/backups/agk-main')/('method-price-'+stamp);backup.mkdir()
(backup/'previous-release.txt').write_text(str(old))
assert (base/'current').resolve()==old
temp=base/('current.price-'+stamp);temp.symlink_to(new);os.replace(temp,base/'current')
try:
 served=subprocess.check_output(['curl','--retry','2','-fsSL','--resolve','agk-edu.ru:443:127.0.0.1','https://agk-edu.ru/method-fest/'],timeout=60)
 assert served==after,'Live price check failed'
except Exception:
 temp=base/('current.price-rollback-'+stamp);temp.symlink_to(old);os.replace(temp,base/'current')
 raise
assert (new/'method-fest/index.html').read_bytes()==after
print('AUTHOR_PRICE_RESTORED_3900',stamp)
