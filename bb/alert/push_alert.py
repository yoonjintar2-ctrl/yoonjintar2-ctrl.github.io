#!/usr/bin/env python3
"""알럿 1건(JSON 파일)을 피드 맨 앞에 넣는다. 사용: python3 bb/alert/push_alert.py alert.json"""
import json, sys, datetime
from pathlib import Path
FEED = Path(__file__).resolve().parent.parent / 'a' / '5543763cc4.json'
a = json.load(open(sys.argv[1], encoding='utf-8'))
assert a.get('id') and a.get('title') and a.get('body'), 'id/title/body 필요'
feed = json.loads(FEED.read_text(encoding='utf-8')) if FEED.exists() else {'alerts': []}
feed['alerts'] = [a] + [x for x in feed.get('alerts', []) if x.get('id') != a['id']]
feed['alerts'] = feed['alerts'][:40]
feed['updated'] = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=9))).isoformat(timespec='seconds')
FEED.write_text(json.dumps(feed, ensure_ascii=False, indent=1), encoding='utf-8')
print('feed', FEED, len(feed['alerts']))
