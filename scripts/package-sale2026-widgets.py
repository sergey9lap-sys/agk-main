"""RU-only directory update, no main site files or other landing pages."""
from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
import hashlib,json
root=Path(__file__).resolve().parents[1]
source=root/'dist/ru/sale2026'
archive=root/'output/agk-sale2026-ru-widgets-20261027.zip'
with ZipFile(archive,'w',ZIP_DEFLATED) as bundle:
 for item in sorted(source.rglob('*')):
  if item.is_file():bundle.write(item,Path('sale2026')/item.relative_to(source))
with ZipFile(archive) as bundle:
 assert bundle.testzip() is None
 for key in ['1','2','3','help']:assert f'sale2026/forms/{key}/index.html' in bundle.namelist()
 assert all(n.startswith('sale2026/') for n in bundle.namelist())
manifest={'archive':str(archive),'size':archive.stat().st_size,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest()}
(root/'output/sale2026-widgets/package.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps(manifest))
