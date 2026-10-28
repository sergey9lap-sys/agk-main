"""High-fidelity format conversion, originals retained as browser fallbacks."""
from pathlib import Path
from PIL import Image,ImageChops,ImageStat
import json,re,math
ROOT=Path(__file__).resolve().parents[1];SITE=ROOT/'sites/november';PUBLIC=SITE/'public'
text=(SITE/'index.html').read_text(encoding='utf-8')+'\n'+'\n'.join(p.read_text(encoding='utf-8') for p in PUBLIC.glob('*.css'))
paths=set(re.findall(r'assets/[\w/.-]+\.webp',text));rows=[];mapping={}
generated=PUBLIC/'assets/optimized'
if generated.exists():
 for oldfile in generated.rglob('*'):
  if oldfile.is_file():
   assert oldfile.resolve().is_relative_to(generated.resolve());oldfile.unlink()
for name in sorted(paths):
 source=PUBLIC/name
 if not source.is_file():continue
 im=Image.open(source);mode='RGBA' if 'A' in im.getbands() else 'RGB';im=im.convert(mode)
 target=PUBLIC/'assets/optimized'/Path(name).relative_to('assets').with_suffix('.webp' if mode=='RGBA' else '.avif');target.parent.mkdir(parents=True,exist_ok=True)
 if mode=='RGBA':im.save(target,format='WEBP',quality=94,method=6,exact=True)
 else:im.save(target,format='AVIF',quality=75,speed=6,subsampling='4:4:4')
 decoded=Image.open(target).convert(mode);mask=im.getchannel('A').point(lambda v:255 if v>=64 else 0) if mode=='RGBA' else None
 rms=ImageStat.Stat(ImageChops.difference(im.convert('RGB'),decoded.convert('RGB')),mask).rms;error=sum(v*v for v in rms)/3;psnr=99 if error==0 else 10*math.log10(255*255/error)
 alpha_error=0 if mode=='RGB' else ImageChops.difference(im.getchannel('A'),decoded.getchannel('A')).getextrema()[1]
 accepted=target.stat().st_size<source.stat().st_size*.95 and psnr>=40 and alpha_error<=1
 after=target.stat().st_size
 if accepted:mapping[name]=target.relative_to(PUBLIC).as_posix()
 else:target.unlink()
 rows.append({'source':name,'bytesBefore':source.stat().st_size,'bytesAfter':after,'psnr':round(psnr,2),'alphaMaxError':alpha_error,'accepted':accepted,'size':im.size})
(SITE/'optimized-media.json').write_text(json.dumps(mapping,ensure_ascii=False,indent=2),encoding='utf-8')
out=ROOT/'output/sale2026-performance';out.mkdir(parents=True,exist_ok=True);(out/'media.json').write_text(json.dumps(rows,indent=2),encoding='utf-8')
chosen=[r for r in rows if r['accepted']];print(json.dumps({'converted':len(chosen),'before':sum(r['bytesBefore'] for r in chosen),'after':sum(r['bytesAfter'] for r in chosen)}))
