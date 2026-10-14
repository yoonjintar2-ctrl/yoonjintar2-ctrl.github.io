// 클석진 반반도체 지수(통칭 '반반도체지수', v4) — 반도체 급락 위험 0~100 + 충격 뒤 '추가 하락' 점수 — 실시간 계산. tossinvest.com 탭에서 eval. 주문 기능 없음.
// FRED 자료는 맥 크롬의 FRED 탭(fredwatch.js)이 1시간마다 받아 ntfy(-f 토픽)에 첨부로 올려 둠 → 여기서 받아 계산.
// 반반도체지수 v4 (2026-10-14): 9요인 z점수를 똑같은 비중으로 평균 → 직전 3년 안 백분위(0~100)
//   10년 금리 수준 · NFCI 13주 변화 · 순유동성 13주 감소 · 원달러 '수준'(직전 3년 대비) · 기대인플레 20일 하락 · 유가 20일 하락 · 가이던스 감속
//   · 장단기 금리차(10년−2년) 축소 · 2년 금리 120일 상승
//   v3 대비: 원달러 20일 변화는 2023~26에 예측력 사라짐(AUC .47) → 3년 수준으로(.71/.63/.71). 장단기차·2년 120일은 세 기간 모두 일관. PCE·30년·기준금리는 기간마다 뒤집혀 탈락
//   AUC 2012~18 .743 · 2019~22 .685 · 2023~26 .716 / 90 이상이면 20일 안 SOXX −10% 급락 2019~26 31% vs 14%
//   위험 모드(90↑ 현금): SOXL 2013~18 연 49.8→73.8%, 2019~26 48.3→88.1% · SOXX 19.5→24.7%, 34.8→41.0%
// 추가 하락 점수 (반도체가 20일 고점 대비 −8% 이상 빠진 '충격' 상태에서만): 그 뒤 20일 안 −7% 더 빠질 확률
//   반반도체지수·NFCI 13주·원달러 20일·기대인플레 20일(−)·달러 20일·시장 전체 하락 여부·VIX/VIX3M·5일 수익률을 직전 3년 백분위로 평균
//   2010~2018에서 고른 요인 → 2018~2026 AUC 0.65. 상위 1/3이면 52%, 하위 1/3이면 15%(기준 30%)
// await window.__risk() → { d, v, lv, h:[최근 10일], sh:{dd, cs, t, p} | null }
(function () {
  const INFO = 'https://wts-info-api.tossinvest.com';
  const FTOPIC = 'berry-3059012bcc6b7db9-f';
  const get = async (u) => { const r = await fetch(u, { credentials: 'include' }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  // 반도체 16개사 가이던스 성장률 가속/감속(실적 시즌마다 갱신, 2026-10-14까지). 'YYMMDD:값×1e5'
  const DGP = '210121:-9169,210126:-2633,210127:-694,210128:2422,210201:1762,210203:-2502,210204:-280,210217:187,210304:-229,210331:906,210421:383,210422:1424,210427:1722,210428:6226,210429:6352,210503:7115,210504:6246,210519:5882,210603:6561,210630:5272,210721:4626,210727:3649,210728:-1722,210802:-2900,210804:-4112,210809:-4241,210830:-4595,210902:-4425,210928:-5757,211020:-5874,211022:-6047,211026:-6877,211027:1859,211028:1419,211101:2026,211103:989,211209:-24,211220:1904,220125:2548,220126:1799,220127:1225,220201:1335,220202:212,220207:-2868,220210:-1957,220216:-1452,220303:2607,220329:3211,220420:3514,220426:2979,220427:6840,220428:6795,220502:6751,220509:7465,220513:8050,220518:7708,220525:7115,220526:3269,220630:226,220721:-606,220726:225,220727:-2123,220801:-3338,220805:-5777,220808:-4985,220817:-4957,220824:-6045,220825:-6081,220901:-6055,220929:-5356,221006:-3774,221019:-4307,221025:-5463,221026:-5123,221027:-3981,221031:-4312,221102:-6359,221122:-6587,221201:-7349,221205:-6967,221208:-7548,221221:-3516,230117:-5362,230124:-3957,230125:-4665,230126:-3636,230131:-4575,230202:-2448,230206:-1400,230208:-975,230215:-590,230302:461,230328:-998,230419:1443,230420:-253,230425:-199,230426:-801,230427:3571,230501:4599,230502:6605,230503:5509,230504:5159,230508:4872,230524:4542,230525:5102,230601:5491,230628:5263,230725:4923,230726:7438,230727:3502,230731:3315,230801:3516,230802:4413,230817:4564,230823:4294,230831:4248,230905:3884,230927:4040,231018:2067,231024:1218,231025:1493,231026:2199,231030:1051,231031:440,231101:480,231121:1302,231130:1180,231211:1043,231220:803,240123:1359,240124:45,240125:-3236,240130:-4410,240131:-6749,240205:-5987,240207:-4878,240221:-5786,240307:-7140,240320:-7229,240423:-5527,240424:-4846,240425:1224,240429:1313,240501:3179,240506:3303,240510:5047,240522:8468,240530:12048,240626:11824,240723:10425,240724:10495,240725:6633,240729:7154,240731:7597,240801:6217,240815:6154,240821:4518,240828:3173,240829:1686,240905:1751,240925:1912,241022:398,241023:6,241024:6665,241028:6107,241030:4137,241031:4353,241106:3953,241114:3573,241126:3181,241203:3092,241209:3253,241212:2861,241218:1380,250121:675,250123:1949,250129:2251,250130:48,250203:-6060,250205:-7151,250206:-5994,250210:-6895,250213:-7014,250219:-5971,250305:-7426,250306:-7482,250320:-4617,250423:-4504,250424:-2652,250429:896,250430:-1436,250501:-1379,250505:1130,250506:1885,250515:2201,250522:1801,250528:1310,250529:1987,250605:2575,250625:1775,250722:993,250724:1063,250729:-787,250730:4030,250731:4242,250804:3231,250805:4551,250814:3846,250820:3787,250827:4931,250828:4376,250904:4280,250923:3672,251021:3186,251022:3332,251023:2557,251028:2581,251029:1960,251030:1259,251103:826,251104:-1235,251105:-1494,251113:-398,251125:-596,251202:-231,251208:-1083,251211:-1510,251217:438,260122:204,260127:1435,260128:2176,260129:2467,260203:885,260204:-786,260205:-72,260209:109,260212:70,260213:700,260218:1590,260225:1426,260304:2111,260305:2034,260318:580,260422:232,260423:1751,260428:2267,260429:3719,260430:4017,260504:4597,260514:4328,260520:3387,260527:3473,260603:4141,260624:2695,260722:2333,260723:1060,260728:679,260729:2290,260730:2120,260803:1720,260804:2140,260805:1947,260810:2051,260813:1755,260819:1905,260826:2138,260827:2127,260902:34,260930:821';
  const dgRows = DGP.split(',').map(s => { const [d, v] = s.split(':'); return ['20' + d.slice(0, 2) + '-' + d.slice(2, 4) + '-' + d.slice(4, 6), +v / 1e5]; });
  const W = { y10: [252, 1], nfci: [252, 1], liq: [252, -1], krwL: [756, 1], bei: [252, -1], oil: [252, -1], dg: [252, -1], curve: [252, -1], y2c: [252, 1] }; // [z점수 기간, 방향]

  // 날짜 D[]에 맞춰 앞값 채우기. lag=1이면 전날까지 나온 값만(미리 알 수 없는 값 안 씀)
  const align = (D, rows, lag) => { const out = new Array(D.length).fill(null); let j = 0, last = null; const r = (rows || []).slice().sort((a, b) => a[0] < b[0] ? -1 : 1); for (let i = 0; i < D.length; i++) { while (j < r.length && r[j][0] <= D[i]) { last = r[j][1]; j++; } out[i] = last; } return lag ? D.map((_, i) => i >= lag ? out[i - lag] : null) : out; };
  const zs = (a, t, L) => { let s = 0, ss = 0, m = 0; for (let k = Math.max(0, t - L + 1); k <= t; k++) { const v = a[k]; if (v == null || !isFinite(v)) continue; s += v; ss += v * v; m++; } if (m < L * 0.6 || a[t] == null || !isFinite(a[t])) return null; const mu = s / m, sd = Math.sqrt(Math.max(ss / m - mu * mu, 1e-18)); return (a[t] - mu) / sd; };
  const pctOf = (a, t, L, minN) => { const v = a[t]; if (v == null || !isFinite(v)) return null; let b = 0, m = 0; for (let k = Math.max(0, t - L); k < t; k++) { const u = a[k]; if (u == null || !isFinite(u)) continue; m++; if (u < v) b++; } return m >= minN ? b / m : null; };

  // P: {SERIES:[[date,value],...]} (FRED) · spy/sox: {date: close}
  window.__riskCalc = function (P, spy, sox) {
    const D = Object.keys(spy).filter(d => d >= '2009-01-01').sort(); const n = D.length;
    const A = {}; for (const k of ['DGS10', 'NFCI', 'WALCL', 'WTREGEN', 'RRPONTSYD', 'DEXKOUS', 'T10YIE', 'DCOILWTICO', 'DTWEXBGS', 'VIXCLS', 'VXVCLS', 'DGS2', 'T10Y2Y']) A[k] = align(D, P[k], 1);
    const dg = align(D, dgRows, 0).map((v, i) => D[i] >= '2021-01-21' ? v : null);
    const ch = (a, k, rel) => a.map((v, i) => i >= k && v != null && a[i - k] != null && (!rel || a[i - k]) ? (rel ? v / a[i - k] - 1 : v - a[i - k]) : null);
    const L = A.WALCL.map((w, i) => w != null && A.WTREGEN[i] != null ? w - A.WTREGEN[i] - (A.RRPONTSYD[i] || 0) * 1000 : null);
    const F = { y10: A.DGS10, nfci: ch(A.NFCI, 65), liq: ch(L, 65, true), krwL: A.DEXKOUS, krw: ch(A.DEXKOUS, 20, true), bei: ch(A.T10YIE, 20), oil: ch(A.DCOILWTICO, 20, true), dg, curve: A.T10Y2Y, y2c: ch(A.DGS2, 120) };
    const comp = new Array(n).fill(null);
    for (let t = 0; t < n; t++) { let s = 0, m = 0, ok = true; for (const k in W) { const z = zs(F[k], t, W[k][0]); if (z == null) { if (k === 'dg') continue; ok = false; break; } s += W[k][1] * z; m++; } if (ok) comp[t] = s / m; }
    const idx = comp.map((_, t) => { const p = pctOf(comp, t, 756, 200); return p == null ? null : Math.round(p * 100); });
    // 충격 뒤 추가 하락 점수
    const sx = D.map(d => sox[d] ?? null), sp = D.map(d => spy[d]);
    const sxdd = (t) => { let mx = 0; for (let k = t - 20; k < t; k++) if (sx[k] != null) mx = Math.max(mx, sx[k]); return mx && sx[t] != null ? sx[t] / mx - 1 : null; };
    const spdd = (t) => { let mx = 0; for (let k = t - 20; k <= t; k++) mx = Math.max(mx, sp[k] || 0); return sp[t] / mx - 1; };
    const SF = [
      [idx, 1], [F.nfci, 1], [F.krw, 1], [F.bei, -1], [ch(A.DTWEXBGS, 20, true), 1],
      [D.map((_, t) => t >= 21 ? (sxdd(t) == null ? null : sxdd(t) - spdd(t)) : null), 1], // 반도체만이 아니라 시장 전체가 빠질수록 더 이어짐
      [A.VIXCLS.map((v, i) => v != null && A.VXVCLS[i] ? v / A.VXVCLS[i] : null), 1],
      [sx.map((v, i) => i >= 5 && v != null && sx[i - 5] ? v / sx[i - 5] - 1 : null), 1] // 천천히 빠질수록 더 이어짐(하루 폭락은 반등이 잦음)
    ];
    const cscore = (t) => { let s = 0, m = 0; for (const [a, sg] of SF) { const p = pctOf(a, t, 756, 150); if (p == null) continue; s += sg > 0 ? p : 1 - p; m++; } return m >= 5 ? s / m : null; };
    // 과거 충격(20일 고점 −8%, 15일 간격) → 점수 1/3 경계와 구간별 실제 확률
    const ev = []; let cool = -1;
    for (let t = 21; t < n - 20; t++) { const dd = sxdd(t); if (dd != null && dd <= -0.08 && t > cool) { const c = cscore(t); cool = t + 15; if (c == null) continue; let mn = 1e9; for (let k = t + 1; k <= t + 20; k++) if (sx[k] != null) mn = Math.min(mn, sx[k]); ev.push({ t, c, y: mn / sx[t] - 1 <= -0.07 ? 1 : 0 }); } }
    const cs = ev.map(e => e.c).sort((a, b) => a - b), q1 = cs[Math.floor(cs.length / 3)], q2 = cs[Math.floor(cs.length * 2 / 3)];
    const rate = (f) => { const g = ev.filter(f); return g.length ? Math.round(g.filter(e => e.y).length / g.length * 100) : null; };
    const R = [rate(e => e.c < q1), rate(e => e.c >= q1 && e.c < q2), rate(e => e.c >= q2)];
    const t = n - 1, v = idx[t], dd = sxdd(t);
    let sh = null;
    if (dd != null && dd <= -0.08) { const c = cscore(t); if (c != null) { const tier = c >= q2 ? 2 : c >= q1 ? 1 : 0; sh = { dd: +(dd * 100).toFixed(1), cs: Math.round(c * 100), t: tier, p: R[tier], base: rate(() => true), n: ev.length }; } }
    const lv = v == null ? '-' : v >= 90 ? '위험 모드' : v >= 80 ? '경계' : v >= 60 ? '주의' : '보통';
    return { d: D[t], v, lv, h: idx.slice(-10), sh, dd: dd == null ? null : +(dd * 100).toFixed(1), cut: [q1, q2].map(x => Math.round(x * 100)), rates: R, _idx: idx, _D: D };
  };

  const hist = async (sym) => { const j0 = await get(`${INFO}/api/v2/stock-infos/code-or-symbol/${sym}`); const c = j0.result.code || j0.result.stockCode; let cs = [], from = '';
    for (let p = 0; p < 12; p++) { const j = await get(`${INFO}/api/v1/c-chart/us-s/${c}/day:1?count=400&useAdjustedRate=true` + (from ? `&from=${encodeURIComponent(from)}` : '')); const k = j.result.candles || []; cs = k.slice().reverse().concat(cs); from = j.result.nextDateTime; if (!from || k.length < 400 || cs[0].dt < '2009') break; }
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false }).formatToParts(new Date()).map(x => [x.type, x.value]));
    const today = p.year + '-' + p.month + '-' + p.day, done = +p.hour % 24 >= 16;
    const m = {}; cs.forEach(x => { const d = x.dt.slice(0, 10); if (d < today || (d === today && done)) m[d] = x.close; }); return m; };

  // FRED 묶음: 맥이 올린 최신 첨부. 못 받으면 마지막으로 받은 것(3일 이내)
  const fredPack = async () => {
    try {
      const t = await (await fetch(`https://ntfy.sh/${FTOPIC}/json?poll=1&since=12h`, { cache: 'no-store' })).text();
      const ms = t.split('\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(m => m && m.attachment && m.attachment.url);
      if (ms.length) { const m = ms[ms.length - 1]; const P = await (await fetch(m.attachment.url, { cache: 'no-store' })).json(); if (P && P.DGS10) { try { localStorage.setItem('fredpack', JSON.stringify({ t: m.time, P })); } catch (e) {} return { t: m.time, P }; } }
    } catch (e) {}
    try { const o = JSON.parse(localStorage.getItem('fredpack') || 'null'); if (o && Date.now() / 1000 - o.t < 3 * 86400) return o; } catch (e) {}
    return null;
  };

  // 지금 반도체 주식을 어떻게 하면 좋을지 한 줄(참고 의견)
  const opinion = (v, sh) => {
    if (sh) return ['반도체 급락 중 · 과거엔 대부분 여기서 멈춤 → 나눠서 조금씩 매수 고려', '반도체 급락 중 · 추가 하락 반반 → 서두르지 말고 나눠서', '반도체 급락 중 · 더 빠질 가능성 높음 → 바닥 잡기 서두르지 말기'][sh.t];
    if (v == null) return '';
    if (v >= 90) return '위험 모드 → 반도체·레버리지 비중 줄이고, 새로 살 땐 평소의 절반만';
    if (v >= 80) return '경계 → 레버리지 새 매수는 자제, 1배 보유는 유지';
    if (v >= 60) return '주의 → 평소대로, 레버리지는 가볍게';
    return '보통 → 평소대로 운용';
  };
  window.__risk = async function (opt) {
    const F = await fredPack(); if (!F) return null;
    const [spy, sox] = await Promise.all([hist('SPY'), hist('SOXX')]);
    const r = window.__riskCalc(F.P, spy, sox);
    const out = { d: r.d, v: r.v, lv: r.lv, h: r.h, sh: r.sh, dd: r.dd, op: opinion(r.v, r.sh), ft: F.t };
    if (opt && opt.hist) { const i0 = r._D.findIndex((d, i) => r._idx[i] != null); out.H = { D: r._D.slice(i0), v: r._idx.slice(i0), sox: r._D.slice(i0).map(d => sox[d] == null ? null : +sox[d].toFixed(2)) }; }
    try { localStorage.setItem('riskLast', JSON.stringify(out)); } catch (e) {}
    return out;
  };

  // 알림: 90 넘어 '위험 모드'에 처음 들어갈 때(80 밑으로 내려가야 다시 울림) · 반도체 충격(−8%)이 새로 시작될 때
  window.__riskAlert = async function (rk, topic) {
    if (!rk || rk.v == null) return [];
    let s = {}; try { s = JSON.parse(localStorage.getItem('riskAlert') || '{}'); } catch (e) {}
    const sent = [];
    const post = async (title, message, pr) => { const r = await fetch('https://ntfy.sh/', { method: 'POST', body: JSON.stringify({ topic, title, message, tags: ['warn', 'risk'], priority: pr }) }); if (r.status === 200) sent.push(title); };
    if (rk.v >= 90 && !s.hi) {
      await post(`반반도체지수 ${rk.v} · 위험 모드`, `클석진 반반도체 지수가 ${rk.v}(0~100)로 위험 모드에 들어갔어요.\n과거엔 이 구간에서 20일 안 반도체 −10% 급락 확률이 평소의 약 2.5배였어요.\nTQQQ(②③⑥)와 ⑧ 반도체주 매수 의견은 평소의 절반만 사는 걸 권해요. 레버리지 비중도 줄여 두세요.`, 4);
      s.hi = rk.d;
    } else if (rk.v < 80 && s.hi) { s.hi = null; }
    if (rk.sh && (!s.sh || (Date.parse(rk.d) - Date.parse(s.sh)) / 86400e3 > 21)) {
      const lab = ['낮음', '보통', '높음'][rk.sh.t];
      await post(`반도체 급락 ${rk.sh.dd}% · 추가 하락 가능성 ${lab}`, `반도체(SOXX)가 20일 고점보다 ${rk.sh.dd}% 빠졌어요. 추가 하락 점수 ${rk.sh.cs}(${lab}).\n과거 같은 구간에서 20일 안 −7% 더 빠진 비율 ${rk.sh.p}%(평균 ${rk.sh.base}%).${rk.sh.t === 2 ? '\n바닥 잡기는 서두르지 마세요.' : rk.sh.t === 0 ? '\n과거엔 대부분 이 근처에서 멈췄어요.' : ''}`, rk.sh.t === 2 ? 4 : 3);
      s.sh = rk.d;
    }
    try { localStorage.setItem('riskAlert', JSON.stringify(s)); } catch (e) {}
    return sent;
  };

  // 일봉 그래프용 전체 기록(2013~): ntfy(-k)에 첨부로 올림 → 웹 팝업이 받아 그림. 첨부는 3시간 뒤 사라져서 1시간마다 다시 올림
  window.__riskHistPush = async function () {
    const r = await window.__risk({ hist: true }); if (!r || !r.H) return 'no data';
    const body = JSON.stringify({ v: 1, d: r.d, now: { v: r.v, lv: r.lv, op: r.op, dd: r.dd, sh: r.sh }, D: r.H.D, x: r.H.v, s: r.H.sox });
    const res = await fetch('https://ntfy.sh/berry-3059012bcc6b7db9-k', { method: 'PUT', headers: { Filename: 'banban.json', Title: 'banban ' + r.d }, body });
    return res.status + ' ' + r.H.D.length + '일';
  };
})();
'risk v4 loaded';
