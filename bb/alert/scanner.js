// 베리 알럿 스캐너 v3 — tossinvest.com 탭에서 eval (credentials 포함 fetch). 주문 기능 없음.
// await window.__berryScan({slot:'11시'}) → window.__ALERT {title, cards[], sPlus[], body(JSON)}
(function () {
  const INFO = 'https://wts-info-api.tossinvest.com', CERT = 'https://wts-cert-api.tossinvest.com';
  const get = async (u) => { const r = await fetch(u, { credentials: 'include' }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  const post = async (u, b) => { const r = await fetch(u, { method: 'POST', credentials: 'include', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  const pool = async (items, n, fn) => { const out = new Array(items.length); let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; try { out[k] = await fn(items[k]); } catch (e) { out[k] = null; } } })); return out; };
  const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
  const sma = (a, n, end) => { end = end == null ? a.length : end; if (end < n) return NaN; let s = 0; for (let i = end - n; i < end; i++) s += a[i]; return s / n; };
  const rsi2 = (c) => { let g = 0, l = 0; for (let i = Math.max(1, c.length - 30); i < c.length; i++) { const d = c[i] - c[i - 1]; g = (g + Math.max(d, 0)) / 2; l = (l + Math.max(-d, 0)) / 2; } return l === 0 ? 100 : 100 - 100 / (1 + g / l); };
  const atr = (h, l, c, n) => { let s = 0; for (let i = c.length - n; i < c.length; i++) s += Math.max(h[i] - l[i], Math.abs(h[i] - c[i - 1]), Math.abs(l[i] - c[i - 1])); return s / n; };
  const pctl = (arr, p) => { const a = arr.slice().sort((x, y) => x - y); const i = (a.length - 1) * p, lo = Math.floor(i), hi = Math.ceil(i); return a[lo] + (a[hi] - a[lo]) * (i - lo); };
  const episodes = (idx) => { let n = 0, last = -99; idx.forEach(i => { if (i - last >= 5) n++; last = i; }); return n; };
  const tick = (p) => p < 2000 ? 1 : p < 5000 ? 5 : p < 20000 ? 10 : p < 50000 ? 50 : p < 200000 ? 100 : p < 500000 ? 500 : 1000;
  const rk = (p, mode) => { const t = tick(p); return mode === 'up' ? Math.ceil(p / t) * t : mode === 'down' ? Math.floor(p / t) * t : Math.round(p / t) * t; };
  const fk = (p) => Math.round(p).toLocaleString('en-US');
  const fu = (p) => '$' + p.toFixed(2);
  const fx2 = (p, kr) => kr ? fk(p) : fu(p);
  const pct = (x) => (x >= 0 ? '+' : '−') + Math.abs(x).toFixed(1) + '%';

  // ── 등급 기준 (2026-10-13 백테스트: 국내 200 + 미국 150종목, 최근 137거래일)
  // 점수는 주가 흐름만으로 매긴다. 거래대금·시총·흑자는 통과/탈락 필터일 뿐 가점 없음.
  // 시장(국내/미국)×신호별로 따로 과거 분포의 백분위로 바꿔서, 시장·신호·회사 규모가 등급에 쏠리지 않게 한다.
  //   SSS ≈ 월 1회 · SS ≈ 주 1회 · S ≈ 하루 0.7개 · A+ 1.5 · A 2.5 · A- 4 · B+ 6개/일
  const QT = {"KA":[23.9,48.9,52,54.1,56.1,58,59.1,61.2,62.5,64,65.3,66.6,68,69.7,70.9,72.4,74.7,76.9,79.6,83.2,89.5],"KB":[14.1,21.2,23.2,25.9,27.8,29.1,30,30.9,31.9,34.5,37.5,38,39.3,40.7,41.9,43.5,46.1,47.4,50.7,57.3,73.1],"KC":[39.8,47.6,51.1,52.7,53.8,55.9,57,58,58.9,60.1,63.4,64.5,65.4,66.8,68.2,69.1,71.4,74.6,76,79.9,88.1],"UA":[24.1,38.5,44,48.4,50.7,52.3,53.6,55.1,56.3,57.9,59.8,61.2,62.6,64.2,66.6,68.7,70.2,72.4,74.3,78,88.1],"UB":[15.8,18,20.4,24,26.5,31.1,33.4,34.1,36.1,37,37.7,40.6,41,43.8,45.2,46.5,49,50.5,57.7,59,79.1],"UC":[44.9,49.8,54.2,55.9,57.2,58.5,60,60.9,62.3,63.1,64.8,65.9,67.1,69,70.7,72,73.1,74.7,76.3,79.7,87.5]};
  const norm = (key, x) => { const q = QT[key]; if (x <= q[0]) return 0; if (x >= q[20]) return 100; for (let k = 0; k < 20; k++) if (x <= q[k + 1]) return (k + (x - q[k]) / ((q[k + 1] - q[k]) || 1)) * 5; return 100; };
  const GRADES = [['SSS', 99.5], ['SS', 97.63], ['S', 95.05], ['A+', 89.68], ['A', 82.9], ['A-', 71.94], ['B+', 57.72], ['B', 0]];
  const grade = (x) => GRADES.find(g => x >= g[1])[0];
  const GORDER = ['SSS', 'SS', 'S', 'A+', 'A', 'A-', 'B+', 'B'];

  // ── 기술적 분석 (순수 함수: 백테스트에서도 같이 씀). cs = 오래된→최신 일봉, 마지막이 '지금' 봉
  const analyze = (cs, kr, frac) => {
    if (!cs || cs.length < 105) return [];
    const c = cs.map(x => x.close), h = cs.map(x => x.high), l = cs.map(x => x.low), v = cs.map(x => x.volume), am = cs.map(x => x.amount);
    const L = c.length - 1, px = c[L];
    const avgAmt = sma(am, 20, L), avgVol = sma(v, 20, L);
    if (kr ? (px < 5000 || avgAmt < 2e10) : (px < 10 || avgAmt < 3e8)) return [];
    const ma5 = sma(c, 5), ma20 = sma(c, 20), ma60 = sma(c, 60), ma100 = sma(c, 100), a = atr(h, l, c, 14), r2 = rsi2(c);
    const base = cs[L].base || c[L - 1];
    const chg = 100 * (px / base - 1);
    const volR = (v[L] / (frac || 1)) / avgVol;
    const hi20 = Math.max(...h.slice(L - 20, L));
    const rng = h[L] - l[L], pos = rng > 0 ? (px - l[L]) / rng : 0.5;
    // 거래대금은 최소 기준(필터)만 보고 점수에는 넣지 않는다 — 큰 회사일수록 유리해지지 않게
    const trend = clamp((ma20 / ma60 - 1) * 400, 0, 20);
    const res = [];
    // A 눌림 반등: 상승 추세 속 RSI(2) 과매도
    if (px > ma100 && ma20 > ma60 && r2 <= 10) {
      const stop = Math.max(px - 1.5 * a, px * 0.94), tgt = Math.max(ma5, px + 1.0 * a), rr = (tgt - px) / (px - stop);
      const above100 = (px / ma100 - 1) * 100;
      const score = clamp((10 - r2) * 3, 0, 30) + trend + clamp(rr * 15, 0, 20) + (above100 > 2 && above100 < 25 ? 15 : above100 <= 2 ? 5 : 8) + (chg > -6 ? 5 : 0);
      res.push({ setup: 'A', score, px, chg, stop, tgt, rr, why: `RSI(2) ${r2.toFixed(0)} 과매도 · 상승 추세 속 눌림` });
    }
    // B 거래량 돌파: 20일 고가 돌파 + 거래량
    if (px > hi20 && px > ma60 && volR >= 1.8 && pos >= 0.6 && chg <= (kr ? 8 : 10) && chg > 0) {
      const stop = Math.max(hi20 * 0.985, px - 1.5 * a, px * 0.95);
      if (stop < px) {
        const ext = (px / hi20 - 1) * 100;
        const score = clamp((volR - 1.8) * 12, 0, 30) + clamp((pos - 0.6) * 37, 0, 15) + clamp(15 - ext * 3, 0, 15) + trend + (chg >= 2 && chg <= 6 ? 10 : 4);
        res.push({ setup: 'B', score, px, chg, stop, tgt: px + 2 * (px - stop), rr: 2, why: `20일 고가 돌파 · 거래량 ${volR.toFixed(1)}배` });
      }
    }
    // C 박스 하단: 65거래일 횡보 박스(지침 3~6장)의 하단 25% 안
    {
      const N = 65, s0 = L - N;
      if (s0 >= 1) {
        const lows = l.slice(s0, L), highs = h.slice(s0, L), closes = c.slice(s0, L);
        const BL = pctl(lows, 0.08), BH = pctl(highs, 0.92), W = BH - BL, width = (BH / BL - 1) * 100;
        const sup = [], resi = [];
        for (let i = 0; i < N; i++) { if (lows[i] <= BL * 1.015) sup.push(i); if (highs[i] >= BH * 0.985) resi.push(i); }
        const ts = episodes(sup), tr = episodes(resi);
        let sx = 0, sy = 0, sxy = 0, sxx = 0; closes.forEach((y, x) => { sx += x; sy += y; sxy += x * y; sxx += x * x; });
        const slope = (N * sxy - sx * sy) / (N * sxx - sx * sx), drift = slope * N / (sy / N) * 100;
        const seg = [0, 1, 2].map(k => ({ hi: Math.max(...highs.slice(k * 21, k * 21 + 22)), lo: Math.min(...lows.slice(k * 21, k * 21 + 22)) }));
        const down = seg[1].hi < seg[0].hi && seg[2].hi < seg[1].hi && seg[1].lo < seg[0].lo && seg[2].lo < seg[1].lo;
        const position = (px - BL) / W;
        if (width >= 10 && width <= 30 && ts >= 2 && tr >= 2 && !down && Math.abs(drift) <= 10 && position >= 0 && position <= 0.25) {
          const buy = Math.min(px * 1.003, BL + 0.25 * W), tgt = BL + 0.75 * W, stop = BL * 0.98, cost = buy * 0.0025;
          const rr = (tgt - buy - cost) / (buy - stop + cost);
          if (rr >= 2) {
            const score = clamp(25 - position * 80, 5, 25) + clamp((ts + tr - 4) * 3 + 5, 5, 15) + (width >= 12 && width <= 25 ? 15 : 8) + clamp((rr - 2) * 7.5 + 5, 5, 20) + (Math.abs(drift) < 4 ? 15 : 8);
            res.push({ setup: 'C', score, px, chg, stop, tgt, rr, buyCap: buy, why: `65일 박스 ${fx2(BL, kr)}~${fx2(BH, kr)} · 하단 ${(position * 100).toFixed(0)}% · 지지 ${ts}회` });
          }
        }
      }
    }
    return res;
  };
  window.__berryAnalyze = analyze; window.__berryNorm = norm;

  window.__berryScan = async function (opt) {
    opt = opt || {};
    const now = new Date(), kst = new Date(now.getTime() + 9 * 3600e3), kstMin = kst.getUTCHours() * 60 + kst.getUTCMinutes();
    const ep = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false }).formatToParts(now).map(x => [x.type, x.value]));
    const etDate = ep.year + '-' + ep.month + '-' + ep.day, etHour = +ep.hour % 24;
    const usDone = (() => { const d = new Date(etDate + 'T12:00:00Z'); if (etHour < 16) d.setUTCDate(d.getUTCDate() - 1); while (d.getUTCDay() === 0 || d.getUTCDay() === 6) d.setUTCDate(d.getUTCDate() - 1); return d.toISOString().slice(0, 10); })();
    const krOpen = kstMin >= 540 && kstMin < 930, krFrac = krOpen ? Math.max(0.08, (kstMin - 540) / 390) : 1;

    // 시장 국면 (화면에는 안 보이고 감점·제한에만 씀)
    const ind = (await get(CERT + '/api/v4/dashboard/wts/overview/indicator')).result;
    const I = {}; ind.indicators.forEach(i => { I[i.code] = { p: i.price.latestPrice, ch: 100 * (i.price.latestPrice / i.price.basePrice - 1) }; });
    const g = (k) => I[k] || { p: 0, ch: 0 };
    const ks = g('KGG01P'), kq = g('QGG01P'), fx = g('EXCHANGE_RATE'), vix = g('RGI..VIX'), sp = g('SPX.CBI'), nqf = g('RFU.NQc1');
    let krReg = '정상'; if (ks.ch <= -2 || kq.ch <= -3 || fx.ch >= 1) krReg = '위험회피'; else if (ks.ch <= -1 || fx.ch >= 0.5) krReg = '주의';
    let usReg = '정상'; if (vix.p >= 25 || vix.ch >= 20 || sp.ch <= -2 || nqf.ch <= -2) usReg = '위험회피'; else if (vix.p >= 20 || sp.ch <= -1 || nqf.ch <= -1) usReg = '주의';
    const penalty = (r) => r === '위험회피' ? 10 : r === '주의' ? 5 : 0;
    const krAllowed = !(krReg === '위험회피' && kstMin < 840);

    const candles = async (mk, code, n) => {
      const j = await get(`${INFO}/api/v1/c-chart/${mk}/${code}/day:1?count=${n || 130}&useAdjustedRate=true`);
      let cs = (j.result.candles || []).slice().reverse();
      if (mk === 'us-s') cs = cs.filter(x => x.dt.slice(0, 10) <= usDone);
      return cs;
    };
    const screen = async (nation, n) => { const out = []; for (let p = 1; out.length < n && p <= 5; p++) { const j = await post(CERT + '/api/v2/screener/screen', { pagingParam: { key: null, number: p, size: 100 }, filters: [], sort: { column: 'C_시가총액', label: '시가총액', order: 'DESC' }, nation }); (j.result.stocks || []).forEach(s => out.push({ code: s.stockCode, name: s.name })); if (j.result.lastPage) break; } return out.slice(0, n); };
    const quality = async (code) => {
      try {
        const oi = (await post(`${INFO}/api/v2/stock-infos/operating-income/${code}`, {})).result;
        const gr = (oi.graph || []).slice(-4).map(x => x.operatingIncome);
        const rf = (await get(`${CERT}/api/v1/stock-infos/${code}/red-flags`)).result || [];
        let sym = '';
        if (code.startsWith('US')) { try { sym = (await get(`${INFO}/api/v2/stock-infos/${code}`)).result.symbol || ''; } catch (e) {} }
        return { ok: oi.recentOperatingIncome > 0 && gr.reduce((a, b) => a + b, 0) > 0 && rf.length === 0, sym };
      } catch (e) { return { ok: false }; }
    };
    const run = async (nation, mk, n, reg) => {
      const uni = await screen(nation, n);
      const kr = mk === 'kr-s';
      const rows = await pool(uni, 8, async (s) => analyze(await candles(mk, s.code), kr, kr ? krFrac : 1).map(x => Object.assign(x, { name: s.name, code: s.code, kr, raw: x.score, score: norm((kr ? 'K' : 'U') + x.setup, x.score) - penalty(reg) })));
      let all = rows.filter(Boolean).flat();
      if (reg === '위험회피') all = all.filter(x => x.setup !== 'B'); // 위험회피엔 돌파 추격 안 함
      const best = {}; all.forEach(x => { if (!best[x.code] || best[x.code].score < x.score) best[x.code] = x; });
      all = Object.values(best).sort((a, b) => b.score - a.score).slice(0, 12);
      const q = await pool(all, 6, (x) => quality(x.code));
      all.forEach((x, i) => { if (q[i] && q[i].sym) x.sym = q[i].sym; });
      return { list: all.filter((x, i) => q[i] && q[i].ok), scanned: uni.length };
    };
    // 2026-10-13 결정: 백테스트를 통과한 규칙만 추천한다(규칙 장부). 현재 채택 규칙은 ① 하나.
    // ① 미국장 급락 때 업종 대비 덜 빠진 종목
    //   SPY가 60일 고점 대비 −7% 이상이면 발동. 지수 고점일부터 지금까지 수익률이
    //   같은 업종 중간값보다 5%p↑, 지수보다 3%p↑ 덜 빠지고 100일선 위인 종목 중 상위 5개.
    //   다음 날 시가 매수, 20~40일 보유, −12% 손절. (2021-12~2026-10 급락 7회: 40일 평균 +9.9%, 지수 +0.9%)
    const SPY = 'US19930122001';
    const spy = await candles('us-s', SPY, 130);
    const sc = spy.map(k => k.close), sL = sc.length - 1;
    let hi = -1, hiI = 0; for (let k = Math.max(0, sL - 60); k <= sL; k++) if (sc[k] > hi) { hi = sc[k]; hiI = k; }
    const dd = 1 - sc[sL] / hi, hiDate = spy[hiI].dt.slice(0, 10), ri = sc[sL] / hi - 1;
    const THR = opt.crashThr != null ? opt.crashThr : 0.07; // 테스트용으로만 바꿈
    let crash = dd >= THR, crashStart = '';
    if (crash) { for (let k = sL; k > hiI; k--) { let h2 = -1; for (let j = Math.max(0, k - 60); j <= k; j++) h2 = Math.max(h2, sc[j]); if (1 - sc[k] / h2 >= THR) crashStart = spy[k].dt.slice(0, 10); else break; } }
    let list = [], scanned = 0;
    if (crash) {
      const out = []; for (let p = 1; out.length < (opt.usN || 150) && p <= 2; p++) { const j = await post(CERT + '/api/v2/screener/screen', { pagingParam: { key: null, number: p, size: 100 }, filters: [], sort: { column: 'C_시가총액', label: '시가총액', order: 'DESC' }, nation: 'us' }); (j.result.stocks || []).forEach(s => { const cat = (s.columns || []).find(c => c.id === 'C_CUSTOM_TICS'); out.push({ code: s.stockCode, name: s.name, cat: cat ? cat.value : '' }); }); }
      const uni = out.slice(0, opt.usN || 150); scanned = uni.length;
      const rows = (await pool(uni, 8, async (s) => {
        const cs = await candles('us-s', s.code, 130); const i = cs.length - 1; const a0 = cs.findIndex(k => k.dt.slice(0, 10) === hiDate);
        if (a0 < 0 || i < 100) return null; const c = cs.map(k => k.close);
        const am = cs.slice(i - 19, i + 1).reduce((x, k) => x + k.amount, 0) / 20; if (c[i] < 10 || am < 3e8) return null;
        const ma100 = c.slice(i - 99, i + 1).reduce((x, y) => x + y, 0) / 100;
        return Object.assign(s, { r: c[i] / c[a0] - 1, px: c[i], chg: 100 * (c[i] / cs[i].base - 1), above: c[i] > ma100 });
      })).filter(Boolean);
      const med = (arr) => { const x = arr.slice().sort((p, q) => p - q); return x[Math.floor(x.length / 2)]; };
      const byCat = {}; rows.forEach(x => (byCat[x.cat] = byCat[x.cat] || []).push(x));
      const mkMed = med(rows.map(x => x.r));
      rows.forEach(x => { const peers = (byCat[x.cat] || []).length >= 4 ? byCat[x.cat].filter(y => y !== x) : rows; x.rp = peers.length ? med(peers.map(y => y.r)) : mkMed; x.rs = x.r - x.rp; });
      list = rows.filter(x => x.above && x.r - ri >= 0.03 && x.rs >= 0.05).sort((p, q) => q.rs - p.rs).slice(0, 5);
      const q = await pool(list, 5, (x) => quality(x.code)); list.forEach((x, k) => { if (q[k] && q[k].sym) x.sym = q[k].sym; });
    }
    let cards = list.map((x, k) => ({
      g: 'S', sc: Math.round(x.rs * 1000) / 10, m: 'US', n: x.sym || x.name, kn: x.name, code: x.code, s: '급락장 상대강도',
      px: fu(x.px), ch: pct(x.chg), buy: fu(x.px * 1.01), tgt: '20~40일', stop: fu(x.px * 0.88),
      tp: '보유', sp: pct(-12), rr: '-',
      why: `S&P 고점(${hiDate}) 대비 이 종목 ${pct(100 * x.r)} · 업종 중간 ${pct(100 * x.rp)} · S&P ${pct(100 * ri)}`,
      hold: '20~40일 보유 · −12% 손절 (검증 규칙 ①)', when: '오늘 밤 정규장',
    }));
    // ② 나스닥 상승 후 박스권 — TQQQ 박스 하단 (엄격 기준 + 장중 자동매도)
    //   큰 상승: QQQ 60일 저점→고점 +12%↑ / 박스: 고점 후 8일 이상 신고가 없음, 폭 4~12%, 저점에서 2% 반등
    //   엄격 하단: 박스 15일 이상, 바닥 2번 이상(5일 간격) 확인, 하단 20% 안, QQQ 200일선 위
    //   매도: QQQ가 박스 75% 지점 / 최대 15일 / QQQ가 박스 바닥 −4% 닿는 순간 자동매도(장중)
    //   검증(2011~2026): 13회 평균 +7.6% 승률 77% 최악 −12%, 2011~18 +5.3% · 2019~22 +6.1% · 2023~26 +10.8%
    const r2 = await (async () => {
      const q = await candles('us-s', 'US19990310001', 320), tq = await candles('us-s', 'US20100211003', 5);
      const C = q.map(k => k.close), H = q.map(k => k.high), Lw = q.map(k => k.low), n = C.length;
      const ma200 = (i) => { let s = 0; for (let k = i - 199; k <= i; k++) s += C[k]; return s / 200; };
      let box = null, sig = null;
      for (let t = 210; t < n; t++) {
        if (!box) { const lo60 = Math.min(...Lw.slice(t - 60, t + 1)); let hi = -1, hiI = 0; for (let k = t - 40; k <= t; k++) if (H[k] > hi) { hi = H[k]; hiI = k; }
          if (hi / lo60 - 1 < 0.12 || t - hiI < 8) continue; const loS = Math.min(...Lw.slice(hiI, t + 1)), w = hi / loS - 1; if (w < 0.04 || w > 0.12 || C[t] < loS * 1.02) continue; box = { hi, lo: loS, start: t, hiI }; continue; }
        if (C[t] > box.hi * 1.01 || C[t] < box.lo * 0.96 || t - box.start > 60) { box = null; continue; }
        box.lo = Math.min(box.lo, Math.min(...Lw.slice(box.hiI, t + 1)));
        const bp = (C[t] - box.lo) / (box.hi - box.lo);
        let touch = 0, last = -99; for (let k = box.hiI; k <= t; k++) if (Lw[k] <= box.lo * 1.015) { if (k - last >= 5) touch++; last = k; }
        const ok = bp >= 0 && bp <= 0.2 && touch >= 2 && t - box.hiI >= 15 && C[t] > ma200(t);
        if (t === n - 1 && ok) sig = { box: Object.assign({}, box), t, bp };
      }
      if (!sig) return { card: null, state: box ? `QQQ 박스 진행 중 (${fu(box.lo)}~${fu(box.hi)}, 현재 ${Math.round(100 * (C[n - 1] - box.lo) / (box.hi - box.lo))}% 위치)` : 'QQQ 박스 없음' };
      const qc = C[n - 1], tc = tq[tq.length - 1].close, lvl = sig.box.lo + 0.75 * (sig.box.hi - sig.box.lo), qStop = sig.box.lo * 0.96;
      const toT = (qLevel) => tc * (1 + 3 * (qLevel / qc - 1));
      return { card: {
        g: 'S', sc: 100, m: 'US', n: 'TQQQ', kn: '나스닥100 3배', code: 'US20100211003', s: 'QQQ 박스 하단',
        px: fu(tc), ch: pct(100 * (tc / tq[tq.length - 1].base - 1)), buy: fu(tc * 1.01), tgt: fu(toT(lvl)), stop: fu(toT(qStop)),
        tp: pct(100 * (toT(lvl) / tc - 1)), sp: pct(100 * (toT(qStop) / tc - 1)), rr: '-',
        why: `QQQ 박스 ${fu(sig.box.lo)}~${fu(sig.box.hi)} 하단 ${Math.round(sig.bp * 100)}% · 목표 QQQ ${fu(lvl)} · 자동매도 QQQ ${fu(qStop)}`,
        hold: '최대 15일 · QQQ가 자동매도선 닿으면 바로 매도(스탑로스 걸기) (검증 규칙 ②)', when: '오늘 밤 정규장',
      }, state: 'signal' };
    })();
    if (r2.card) cards.unshift(r2.card);
    const KR = { scanned: 0 }, US = { scanned };
    const sPlus = cards.filter(c => ['SSS', 'SS', 'S'].includes(c.g));
    const hhmm = String(kst.getUTCHours()).padStart(2, '0') + ':' + String(kst.getUTCMinutes()).padStart(2, '0');
    const slot = opt.slot || hhmm;
    const title = sPlus.length ? '추천: ' + sPlus.map(c => c.n).join(' · ') : '지금은 추천 없음 · ① S&P 고점 대비 ' + pct(-100 * dd) + '(발동 −7%) · ② ' + r2.state;
    const alert = { v: 3, slot, time: (kst.getUTCMonth() + 1) + '/' + kst.getUTCDate() + ' ' + hhmm, cards, sPlus: sPlus.map(c => c.g + ' ' + c.n), actionable: cards.length, title, level: 'info', scanned: KR.scanned + US.scanned, krReg, usReg, crash, dd: Math.round(dd * 1000) / 10, crashStart };
    alert.body = JSON.stringify({ v: 3, slot, time: alert.time, cards });
    window.__ALERT = alert;
    return 'ok ' + cards.length + ' cards, S+ ' + sPlus.length;
  };

  // ── ntfy 발행 / 요청 대기
  window.__BERRY = { alerts: 'berry-3059012bcc6b7db9-a', requests: 'berry-3059012bcc6b7db9-r' };
  // tags: 'req' = 요청 응답, 'quiet' = 앱 화면만 갱신하고 알림은 안 울림
  window.__berryPublish = async function (alert, extraTags) {
    const enc = new TextEncoder(), cs = (alert.cards || []).slice();
    let body = JSON.stringify({ v: 3, slot: alert.slot, time: alert.time, cards: cs });
    while (enc.encode(body).length > 3800 && cs.length > 1) { cs.pop(); body = JSON.stringify({ v: 3, slot: alert.slot, time: alert.time, cards: cs }); }
    const tags = [alert.level || 'info'].concat(extraTags || []);
    // 알림 중복 막기(정시·요청 모두): 이미 추천해 계속 남아 있는 카드(같은 종목·같은 규칙)는 다시 울리지 않는다.
    // 새 카드가 있을 때만 울림. 3일 넘게 사라졌다 다시 뜬 카드는 새 신호로 본다.
    const now = Date.now(), key = (c) => c.n + '|' + c.s;
    let seen = {}; try { seen = JSON.parse(localStorage.getItem('d6seen') || '{}'); } catch (e) {}
    const all = alert.cards || [];
    const fresh = all.filter(c => !(seen[key(c)] && now - seen[key(c)] < 3 * 86400e3));
    alert.fresh = fresh.map(c => c.g + '등급 ' + c.n);
    if (!fresh.length && tags.indexOf('quiet') < 0) tags.push('quiet');
    const r = await fetch('https://ntfy.sh/', { method: 'POST', body: JSON.stringify({ topic: window.__BERRY.alerts, title: alert.title, message: body, tags, priority: (alert.sPlus || []).length ? 4 : 2 }) });
    if (r.status === 200 && all.length) { all.forEach(c => { seen[key(c)] = now; }); for (const k in seen) if (now - seen[k] > 30 * 86400e3) delete seen[k]; try { localStorage.setItem('d6seen', JSON.stringify(seen)); } catch (e) {} }
    return r.status;
  };
  // 2026-10-13부터 검색은 6개 규칙(daily6.js)으로 한다. 옛 스캐너는 __berryScanOld로 남겨 둠.
  if (window.__berryScan && !window.__berryScanOld) window.__berryScanOld = window.__berryScan;
  window.__berryScan = async function (opt) {
    opt = opt || {};
    try { (0, eval)(await window.__berryLoad('bb/alert/daily6.js')); } catch (e) { if (!window.__daily6) throw e; }
    await window.__daily6({ slot: opt.slot });
    // ⑦ 미국 정규장 초반 2시간(개장 50~135분 뒤)에는 1분봉 V자 반등 후 횡보도 확인
    try {
      const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: false, weekday: 'short' }).formatToParts(new Date()).map(x => [x.type, x.value]));
      const t = (+p.hour % 24) * 60 + +p.minute - 570;
      if (p.weekday !== 'Sat' && p.weekday !== 'Sun' && t >= 30 && t <= 135) {
        (0, eval)(await window.__berryLoad('bb/alert/vscan.js'));
        const v = await window.__vscan();
        if (v.length) {
          const A = window.__D6; A.cards = A.cards.concat(v); A.sPlus = (A.sPlus || []).concat(v.map(c => c.g + ' ' + c.n));
          A.title = '매수 의견: ' + A.cards.map(c => c.g + '등급 ' + c.n).join(' · ');
        }
        window.__D6.vscan = { at: new Date().toISOString(), hits: v.length };
      }
    } catch (e) { window.__D6.vscanErr = String(e); }
    window.__ALERT = window.__D6;
    return 'ok ' + window.__D6.cards.length + ' cards';
  };
  window.__berryLoad = async function (path) {
    try { const r = await fetch('https://api.github.com/repos/yoonjintar2-ctrl/yoonjintar2-ctrl.github.io/contents/' + path + '?ref=main', { headers: { Accept: 'application/vnd.github.raw' }, cache: 'no-store' }); if (r.ok) return await r.text(); } catch (e) {}
    return await (await fetch('https://raw.githubusercontent.com/yoonjintar2-ctrl/yoonjintar2-ctrl.github.io/main/' + path + '?v=' + Date.now(), { cache: 'no-store' })).text();
  };
  window.__berryWatch = function () {
    const me = Math.random().toString(36).slice(2), KEY = 'berryWatcher';
    const live = () => { try { const o = JSON.parse(localStorage.getItem(KEY) || '{}'); return o.id && o.id !== me && Date.now() - o.ts < 25000; } catch (e) { return false; } };
    if (window.__berryWatchState && window.__berryWatchState.alive) {
      if (window.__berryWatchState.v === 4) return 'already running here';
      try { window.__berryWatchState.es.close(); } catch (e) {} window.__berryWatchState.alive = false; try { localStorage.removeItem(KEY); } catch (e) {} // 옛 버전 감시를 새 버전으로 교체
    }
    if (live()) return 'running in another tab';
    const st = window.__berryWatchState = { v: 4, alive: true, me, started: new Date().toISOString(), handled: 0, last: '' };
    const beat = setInterval(() => { try { localStorage.setItem(KEY, JSON.stringify({ id: me, ts: Date.now() })); } catch (e) {} }, 10000);
    try { localStorage.setItem(KEY, JSON.stringify({ id: me, ts: Date.now() })); } catch (e) {}
    let busy = false, lastRun = 0; const seen = new Set();
    const es = new EventSource('https://ntfy.sh/' + window.__BERRY.requests + '/sse'); st.es = es;
    es.onmessage = async (ev) => {
      let m; try { m = JSON.parse(ev.data); } catch (e) { return; }
      if (m.event !== 'message' || seen.has(m.id) || !/^scan/.test(m.message || '')) return;
      seen.add(m.id);
      if (Date.now() / 1000 - (m.time || 0) > 600 || busy || Date.now() - lastRun < 45000) return;
      busy = true; lastRun = Date.now();
      try {
        if (!/^scan sched/.test(m.message || '')) await fetch('https://ntfy.sh/', { method: 'POST', body: JSON.stringify({ topic: window.__BERRY.alerts, title: '검색 중', message: '맥에서 지금 시세로 검색 중이에요 (1~2분)', tags: ['ack'] }) });
        try { (0, eval)(await window.__berryLoad('bb/alert/scanner.js')); } catch (e) {} // 항상 최신 규칙으로
        const sched = /^scan sched/.test(m.message || '');
        await window.__berryScan({ slot: sched ? new Date(Date.now() + 9 * 3600e3).getUTCHours() + '시' : '요청' });
        if (sched && window.__d6Publish) await window.__d6Publish(); // 정시 검색: 새 매수 의견일 때만 알림
        else await window.__berryPublish(window.__ALERT, ['req']);
        st.handled++; st.last = new Date().toISOString();
      } catch (e) {
        st.last = 'ERR ' + e;
        try { await fetch('https://ntfy.sh/', { method: 'POST', body: JSON.stringify({ topic: window.__BERRY.alerts, title: '검색 실패', message: '맥에서 검색하다 오류가 났어요: ' + String(e).slice(0, 200), tags: ['warn', 'req'] }) }); } catch (e2) {}
      } finally { busy = false; }
    };
    es.onerror = () => { st.err = new Date().toISOString(); };
    window.addEventListener('beforeunload', () => { clearInterval(beat); try { localStorage.removeItem(KEY); } catch (e) {} });
    return 'watching';
  };
})();
'scanner v3 loaded';
