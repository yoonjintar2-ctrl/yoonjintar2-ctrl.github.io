"""OpenStreetMap(Overpass)에서 전국 거점 좌표 수집 → hana-map/data/osm_pois.json
유형: 노인복지관, 노인교실, 전통시장, 공원(면적 큰 곳), 대형점포(백화점·대형마트·쇼핑몰)"""
import json, time, urllib.request, urllib.parse, datetime, sys, os
EPS=['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter','https://maps.mail.ru/osm/tools/overpass/api/interpreter']
AREA='area["ISO3166-1"="KR"][admin_level=2]->.kr;'
Q={
 '노인복지관':'nwr(area.kr)["name"~"노인.*복지관|노인복지센터|시니어.*복지관|노인종합복지"];',
 '노인교실':'nwr(area.kr)["name"~"노인교실|노인대학|어르신.*대학|시니어.*대학"];',
 '전통시장':'nwr(area.kr)["amenity"="marketplace"];nwr(area.kr)["name"~"시장$"]["shop"];nwr(area.kr)["name"~"(전통|재래|중앙|종합)시장$"];',
 '공원':'TILES',
 '대형점포':'nwr(area.kr)["shop"~"department_store|mall"];nwr(area.kr)["shop"="supermarket"]["name"~"이마트|홈플러스|롯데마트|코스트코|트레이더스|하나로마트|메가마트|노브랜드"];',
}
def run(body,area=True):
    q='[out:json][timeout:240];'+(AREA if area else '')+'('+body+');out center tags bb;'
    for ep in EPS:
        try:
            req=urllib.request.Request(ep,data=urllib.parse.urlencode({'data':q}).encode(),headers={'User-Agent':'hana-map/1.0'})
            return json.load(urllib.request.urlopen(req,timeout=300))['elements']
        except Exception as e: print('fail',ep,e); time.sleep(10)
    return []
out={'at':datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=9))).isoformat(timespec='seconds'),'source':'OpenStreetMap contributors (ODbL), Overpass API','types':{}}
ONLY=sys.argv[1:] or list(Q)
if os.path.exists('hana-map/data/osm_pois.json'):
    prev=json.load(open('hana-map/data/osm_pois.json')); out['types']=prev.get('types',{})
for t,b in Q.items():
    if t not in ONLY: continue
    if b=='TILES':
        els=run('way(area.kr)["leisure"="park"]["name"](if: length() > 1500);relation(area.kr)["leisure"="park"]["name"];')
    else: els=run(b)
    rows=[]
    for e in els:
        c=e.get('center') or {'lat':e.get('lat'),'lon':e.get('lon')}
        if c.get('lat') is None: continue
        bb=e.get('bounds'); area=None
        if bb: area=round(abs(bb['maxlat']-bb['minlat'])*110.57*abs(bb['maxlon']-bb['minlon'])*88.4,4)
        tg=e.get('tags',{})
        rows.append({'nm':tg.get('name',''),'lat':round(c['lat'],6),'lon':round(c['lon'],6),'shop':tg.get('shop',''),'amenity':tg.get('amenity',''),'leisure':tg.get('leisure',''),'highway':tg.get('highway',''),'public_transport':tg.get('public_transport',''),'bbox_km2':area,'addr':' '.join(x for x in [tg.get('addr:city',''),tg.get('addr:district',''),tg.get('addr:street',''),tg.get('addr:housenumber','')] if x),'osm':f"{e['type']}/{e['id']}"})
    out['types'][t]=rows; print(t,len(rows)); time.sleep(5)
json.dump(out,open('hana-map/data/osm_pois.json','w'),ensure_ascii=False)
