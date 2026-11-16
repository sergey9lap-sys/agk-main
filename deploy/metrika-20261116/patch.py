"""Only inject analytics into four existing pages. Never rebuild the site."""
from pathlib import Path
import sys

ROUTES = ['moderator/index.html', 'moderator/thanks/index.html',
          'method-fest/index.html', 'method-fest/thanks/index.html']
TAG = '<script defer src="/campaign-metrika-20261116.js" data-agk-metrika="110484880"></script>'

def patch(root, script):
    root = Path(root)
    planned = []
    for route in ROUTES:
        p = root / route
        before = p.read_bytes()
        if TAG.encode() in before:
            continue
        assert b'</head>' in before and b'data-agk-metrika' not in before, route
        assert b'mc.yandex.ru/metrika/' not in before, 'Existing counter: ' + route
        after = before.replace(b'</head>', TAG.encode() + b'</head>', 1)
        assert after.replace(TAG.encode(), b'', 1) == before
        planned.append((p, after))
    # Unlink first: release files may be hardlinked to the previous release.
    for p, data in planned:
        p.unlink()
        p.write_bytes(data)
        p.chmod(0o644)
    target = root / 'campaign-metrika-20261116.js'
    if target.exists(): target.unlink()
    target.write_bytes(Path(script).read_bytes())
    target.chmod(0o644)
    print('PATCHED', len(planned), 'PAGES')

if __name__ == '__main__':
    patch(sys.argv[1], sys.argv[2])
