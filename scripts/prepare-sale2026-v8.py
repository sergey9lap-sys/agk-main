from pathlib import Path
from PIL import Image, ImageOps
import hashlib,json,shutil
root=Path(__file__).resolve().parents[1]
dest=root/'sites/november/public/assets/v8'
dest.mkdir(parents=True,exist_ok=True)
choices=[('17','alexandra-hero.webp','1spa1Si4nocT8vnREKvG8YLpfKx9qP0cD','1J2A6030.jpg',1200),('13','alexandra-author.webp','1KUWNixHLYhZ2ayJhgFZQLuS7nztgukVE','1J2A5887 (3).jpg',800)]
records=[]
for index,name,file_id,original_name,width in choices:
    source=root/'output/sale2026-photos-20261026'/f'{index}.jpg'
    original=Image.open(source)
    image=ImageOps.exif_transpose(original).convert('RGB')
    image.thumbnail((width,1800))
    image.save(dest/name,'WEBP',quality=88)
    records.append({'role':name,'driveId':file_id,'sourceName':original_name,'sourceUrl':f'https://drive.google.com/file/d/{file_id}/view','sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'sourceSize':list(original.size),'asset':'assets/v8/'+name,'assetSize':list(image.size),'processing':'EXIF orientation, proportional resize and WebP encoding only; no generation, retouching, face editing or background replacement'})
mobile_source=root/'output/sale2026-photos-20261026/17.jpg'
mobile=ImageOps.exif_transpose(Image.open(mobile_source)).convert('RGB').crop((900,650,3450,4050))
mobile.thumbnail((600,800))
mobile.save(dest/'alexandra-hero-mobile.webp','WEBP',quality=88)
records.append({'role':'alexandra-hero-mobile.webp','driveId':choices[0][2],'sourceName':choices[0][3],'sourceUrl':records[0]['sourceUrl'],'sourceSha256':records[0]['sourceSha256'],'crop':[900,650,3450,4050],'asset':'assets/v8/alexandra-hero-mobile.webp','assetSize':list(mobile.size),'processing':'Conventional portrait crop from the same original; proportional resize and WebP encoding only, no face edits'})
shutil.copyfile(root/'sites/mentor-consultation/public/fonts/playfair-display.ttf',root/'sites/november/public/fonts/playfair-display-v8.ttf')
target=root/'sites/november/PHOTO-SOURCES-V8.json'
target.write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps([{'role':r['role'],'dimensions':r['assetSize']} for r in records]))
