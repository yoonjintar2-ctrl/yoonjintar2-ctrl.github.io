"""하나은행 시니어 타겟팅 맵 — 기상청·에어코리아 실시간 수집기 (GitHub Actions에서 매시 실행)

필요: 저장소 Secret  DATA_GO_KR_KEY  (공공데이터포털 일반 인증키, Decoding 값)
활용신청 필요 서비스(같은 키 사용):
  1) 기상청_단기예보 조회서비스            (VilageFcstInfoService_2.0)
  2) 기상청_기상특보 조회서비스            (WthrWrnInfoService)
  3) 한국환경공단_에어코리아_대기오염정보   (ArpltnInforInqireSvc)
출력: hana-map/data/live.json
"""
import json, math, os, sys, time, urllib.parse, urllib.request
from datetime import datetime, timedelta, timezone

KST = timezone(timedelta(hours=9))
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'data', 'live.json')
KEY = os.environ.get('DATA_GO_KR_KEY', '').strip()
BASE = 'https://apis.data.go.kr'


def grid(lat, lon):
    """위경도 → 기상청 동네예보 격자(nx, ny), 기상청 LCC 공식"""
    RE, GRID, SLAT1, SLAT2, OLON, OLAT, XO, YO = 6371.00877, 5.0, 30.0, 60.0, 126.0, 38.0, 43, 136
    D = math.pi / 180.0
    re = RE / GRID
    s1, s2, olon, olat = SLAT1 * D, SLAT2 * D, OLON * D, OLAT * D
    sn = math.log(math.cos(s1) / math.cos(s2)) / math.log(math.tan(math.pi * .25 + s2 * .5) / math.tan(math.pi * .25 + s1 * .5))
    sf = math.tan(math.pi * .25 + s1 * .5) ** sn * math.cos(s1) / sn
    ro = re * sf / math.tan(math.pi * .25 + olat * .5) ** sn
    ra = re * sf / math.tan(math.pi * .25 + lat * D * .5) ** sn
    th = lon * D - olon
    th = (th + 2 * math.pi) % (2 * math.pi)
    if th > math.pi: th -= 2 * math.pi
    th *= sn
    return int(ra * math.sin(th) + XO + .5), int(ro - ra * math.cos(th) + YO + .5)


def call(path, params, tries=3):
    q = dict(params); q['serviceKey'] = KEY
    url = f'{BASE}{path}?{urllib.parse.urlencode(q)}'
    last = None
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'hana-map/1.0'}), timeout=20) as r:
                txt = r.read().decode('utf-8')
            if txt.lstrip().startswith('<'):
                raise RuntimeError('XML/오류 응답: ' + txt[:200].replace('\n', ' '))
            j = json.loads(txt)
            h = j.get('response', {}).get('header', {})
            if h.get('resultCode') not in ('00', None):
                raise RuntimeError(f"{h.get('resultCode')} {h.get('resultMsg')}")
            return j
        except Exception as e:  # noqa
            last = e; time.sleep(1.5 * (i + 1))
    raise RuntimeError(str(last))


def items(j):
    it = j.get('response', {}).get('body', {}).get('items', {})
    it = it.get('item', []) if isinstance(it, dict) else it
    return it if isinstance(it, list) else [it]


def num(v, default=None):
    if v is None: return default
    s = str(v).strip()
    if s in ('', '-', '강수없음', '적설없음'): return 0.0 if default is None else default
    if '미만' in s: return 0.5
    if '이상' in s:
        return float(''.join(c for c in s if c.isdigit() or c == '.') or 0)
    if '~' in s:
        a, b = s.replace('mm', '').replace('cm', '').split('~')[:2]
        return (float(a) + float(b)) / 2
    try: return float(s.replace('mm', '').replace('cm', ''))
    except ValueError: return default


def main():
    now = datetime.now(KST)
    prev = {}
    if os.path.exists(OUT):
        try: prev = json.load(open(OUT, encoding='utf-8'))
        except Exception: prev = {}
    pts = json.load(open(os.path.join(HERE, 'points.json'), encoding='utf-8'))
    if not KEY:
        if prev.get('status') == 'no_key': print('no key (unchanged)'); return
        out = dict(prev); out.update({'status': 'no_key', 'checked': now.isoformat(timespec='minutes'),
                                       'message': '저장소 Secret DATA_GO_KR_KEY가 없어 기상청 수집을 건너뜀'})
        json.dump(out, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print('no key'); return
    status = {}
    # 초단기실황 기준시각: 매시 정각 자료가 약 40분 후 제공
    ob = now - timedelta(minutes=45); ob = ob.replace(minute=0, second=0, microsecond=0)
    # 초단기예보(하늘상태): 매시 30분 발표, 약 45분 후 제공
    fs = now - timedelta(minutes=50); fs = fs.replace(minute=30, second=0, microsecond=0)
    # 단기예보: 오늘 최고/최저·적설 → 02시 발표분(없으면 전날 23시)
    vf = now.replace(hour=2, minute=0, second=0, microsecond=0)
    if now < vf + timedelta(minutes=15): vf = (now - timedelta(days=1)).replace(hour=23, minute=0, second=0, microsecond=0)
    today = now.strftime('%Y%m%d')
    hist = prev.get('hist', {})
    P = {}
    for p in pts:
        nx, ny = grid(p['lat'], p['lon'])
        d = {'nx': nx, 'ny': ny, 'n': p['n']}
        try:
            j = call('/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst',
                     {'pageNo': 1, 'numOfRows': 60, 'dataType': 'JSON', 'base_date': ob.strftime('%Y%m%d'), 'base_time': ob.strftime('%H00'), 'nx': nx, 'ny': ny})
            for it in items(j): d[it['category']] = num(it['obsrValue'])
            d['obs'] = ob.isoformat(timespec='minutes'); status['ncst'] = 'ok'
        except Exception as e:
            status['ncst'] = f'error: {e}'
        try:
            j = call('/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst',
                     {'pageNo': 1, 'numOfRows': 60, 'dataType': 'JSON', 'base_date': fs.strftime('%Y%m%d'), 'base_time': fs.strftime('%H%M'), 'nx': nx, 'ny': ny})
            fc = sorted([it for it in items(j) if it['category'] == 'SKY'], key=lambda x: x['fcstDate'] + x['fcstTime'])
            if fc: d['SKY'] = num(fc[0]['fcstValue'])
            status['ufcst'] = 'ok'
        except Exception as e:
            status['ufcst'] = f'error: {e}'
        try:
            j = call('/1360000/VilageFcstInfoService_2.0/getVilageFcst',
                     {'pageNo': 1, 'numOfRows': 1000, 'dataType': 'JSON', 'base_date': vf.strftime('%Y%m%d'), 'base_time': vf.strftime('%H00'), 'nx': nx, 'ny': ny})
            sno = 0.0; pop = 0
            for it in items(j):
                if it['fcstDate'] != today: continue
                c = it['category']
                if c == 'TMX': d['TMX'] = num(it['fcstValue'])
                elif c == 'TMN': d['TMN'] = num(it['fcstValue'])
                elif c == 'SNO': sno += num(it['fcstValue'], 0) or 0
                elif c == 'POP': pop = max(pop, int(num(it['fcstValue'], 0) or 0))
            d['SNO_today'] = round(sno, 1); d['POP_max'] = pop; status['vfcst'] = 'ok'
        except Exception as e:
            status['vfcst'] = f'error: {e}'
        # 최근 3시간·오늘 누적 강수: 매시 RN1 기록을 이어 붙임
        h = [x for x in hist.get(p['id'], []) if x['t'] >= (now - timedelta(hours=26)).isoformat(timespec='minutes')]
        if 'RN1' in d and d.get('obs') and not any(x['t'] == d['obs'] for x in h):
            h.append({'t': d['obs'], 'rn1': d['RN1']})
        hist[p['id']] = h[-26:]
        last3 = [x['rn1'] for x in h if x['t'] > (ob - timedelta(hours=3)).isoformat(timespec='minutes')]
        d['rain3'] = round(sum(last3), 1)
        d['rain_today'] = round(sum(x['rn1'] for x in h if x['t'][:10] == now.strftime('%Y-%m-%d')), 1)
        P[p['id']] = d
    # 에어코리아 시도별 실시간 평균
    air = {}
    for sido in sorted({p['air'] for p in pts}):
        try:
            j = call('/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',
                     {'returnType': 'json', 'numOfRows': 300, 'pageNo': 1, 'sidoName': sido, 'ver': '1.0'})
            v10 = [num(i.get('pm10Value')) for i in items(j)]; v25 = [num(i.get('pm25Value')) for i in items(j)]
            v10 = [x for x in v10 if x]; v25 = [x for x in v25 if x]
            air[sido] = {'pm10': round(sum(v10) / len(v10)) if v10 else None, 'pm25': round(sum(v25) / len(v25)) if v25 else None,
                         'time': (items(j)[0] or {}).get('dataTime') if items(j) else None, 'n': len(v10)}
            status['air'] = 'ok'
        except Exception as e:
            status['air'] = f'error: {e}'
    for p in pts:
        a = air.get(p['air']) or {}
        P[p['id']]['pm10'] = a.get('pm10'); P[p['id']]['pm25'] = a.get('pm25'); P[p['id']]['pm_time'] = a.get('time')
    # 기상특보 현황
    warn_text = ''; warn = {}
    try:
        j = call('/1360000/WthrWrnInfoService/getPwnStatus', {'pageNo': 1, 'numOfRows': 10, 'dataType': 'JSON'})
        it = items(j)[0] if items(j) else {}
        warn_text = (it.get('t6') or '').strip()
        TOK = {'서울': '11', '인천': '23', '경기': '31', '부산': '21', '대구': '22', '광주': '36', '대전': '25', '울산': '26', '세종': '29', '강원': '32',
               '충청북도': '33', '충북': '33', '충청남도': '34', '충남': '34', '전라북도': '35', '전북': '35', '전라남도': '36', '전남': '36',
               '경상북도': '37', '경북': '37', '경상남도': '38', '경남': '38', '제주': '39'}
        for line in warn_text.replace('\r', '').split('\n'):
            if ':' not in line: continue
            kind, area = line.split(':', 1)
            kind = kind.replace('o', '').strip()
            for tok, k1 in TOK.items():
                if tok in area: warn.setdefault(k1, set()).add(kind)
        status['warn'] = 'ok'
    except Exception as e:
        status['warn'] = f'error: {e}'
    ok = sum(1 for v in P.values() if 'T1H' in v)
    out = {'status': 'ok' if ok else 'error', 'source': 'kma', 'updated': now.isoformat(timespec='minutes'), 'checked': now.isoformat(timespec='minutes'),
           'obs_base': ob.isoformat(timespec='minutes'), 'api_status': status, 'points': P, 'air': air,
           'warn': {k: sorted(v) for k, v in warn.items()}, 'warn_text': warn_text[:3000], 'hist': hist}
    if not ok and prev.get('points'):  # 실패 시 직전 자료 유지
        prev.update({'status': 'stale', 'checked': now.isoformat(timespec='minutes'), 'api_status': status}); out = prev
    json.dump(out, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(json.dumps(status, ensure_ascii=False), ok, 'points')


if __name__ == '__main__':
    main()
