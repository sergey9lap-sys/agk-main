from pathlib import Path
import re,sys

def patch(root,payload):
 root,payload=Path(root),Path(payload)
 p=root/'method-fest/index.html';before=p.read_text(encoding='utf8')
 section=(payload/'section.html').read_text(encoding='utf8').strip()
 pattern=r'<section\b[^>]*id="s8"[^>]*>.*?</section>'
 assert len(re.findall(pattern,before,re.S))==1
 after=re.sub(pattern,lambda _:section,before,flags=re.S)
 for tag in ['<link rel="stylesheet" href="events-gallery.css?v=20261116">','<script defer src="events-gallery.js?v=20261116"></script>']:
  if tag not in after:after=after.replace('</head>',tag+'</head>',1)
 price=r'(<article\b[^>]*id="author-ticket"[^>]*>.*?<div class="ticket-bottom"><strong>)([\d\s\u00a0]+руб\.)(</strong>)'
 assert len(re.findall(price,after,re.S))==1
 after=re.sub(price,lambda m:m[1]+'2\u00a0900\u00a0руб.'+m[3],after,flags=re.S)
 # Every section outside the gallery and price remains exact.
 sections=lambda s:{m[1]:m[0] for m in re.finditer(r'<section\b[^>]*id="([^"]+)"[^>]*>.*?</section>',s,re.S)}
 a,b=sections(before),sections(after)
 assert a.keys()==b.keys()
 assert all(a[k]==b[k] for k in a if k not in ['s8','s10'])
 assert ('data-agk-metrika' in before)==('data-agk-metrika' in after)
 p.unlink();p.write_text(after,encoding='utf8',newline='');p.chmod(0o644)
 return after
if __name__=='__main__':patch(sys.argv[1],sys.argv[2])
