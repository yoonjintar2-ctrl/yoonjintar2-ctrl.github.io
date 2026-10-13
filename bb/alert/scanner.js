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

  // ── 등급 기준: 지난 6개월 백테스트로 맞춤 (S ≈ 하루 1개, SS ≈ 주 1개, SSS ≈ 월 1개 나올까 말까)
  const GRADES = window.__BERRY_GRADES || [['SSS', 92], ['SS', 86], ['S', 79], ['A+', 72], ['A', 65], ['A-', 58], ['B+', 51], ['B', 0]];
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
    const liq = clamp(Math.log10(avgAmt / (kr ? 2e10 : 3e8)) * 10, 0, 10);
    const trend = clamp((ma20 / ma60 - 1) * 400, 0, 20);
    const res = [];
    // A 눌림 반등: 상승 추세 속 RSI(2) 과매도
    if (px > ma100 && ma20 > ma60 && r2 <= 10) {
      const stop = Math.max(px - 1.5 * a, px * 0.94), tgt = Math.max(ma5, px + 1.0 * a), rr = (tgt - px) / (px - stop);
      const above100 = (px / ma100 - 1) * 100;
      const score = clamp((10 - r2) * 3, 0, 30) + trend + clamp(rr * 15, 0, 20) + liq + (above100 > 2 && above100 < 25 ? 15 : above100 <= 2 ? 5 : 8) + (chg > -6 ? 5 : 0);
      res.push({ setup: 'A', score, px, chg, stop, tgt, rr, why: `RSI(2) ${r2.toFixed(0)} 과매도 · 상승 추세 속 눌림` });
    }
    // B 거래량 돌파: 20일 고가 돌파 + 거래량
    if (px > hi20 && px > ma60 && volR >= 1.8 && pos >= 0.6 && chg <= (kr ? 8 : 10) && chg > 0) {
      const stop = Math.max(hi20 * 0.985, px - 1.5 * a, px * 0.95);
      if (stop < px) {
        const ext = (px / hi20 - 1) * 100;
        const score = clamp((volR - 1.8) * 12, 0, 30) + clamp((pos - 0.6) * 37, 0, 15) + clamp(15 - ext * 3, 0, 15) + trend + liq + (chg >= 2 && chg <= 6 ? 10 : 4);
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
            const score = clamp(25 - position * 80, 5, 25) + clamp((ts + tr - 4) * 3 + 5, 5, 15) + (width >= 12 && width <= 25 ? 15 : 8) + clamp((rr - 2) * 7.5 + 5, 5, 20) + (Math.abs(drift) < 4 ? 15 : 8) + liq;
            res.push({ setup: 'C', score, px, chg, stop, tgt, rr, buyCap: buy, why: `65일 박스 ${fx2(BL, kr)}~${fx2(BH, kr)} · 하단 ${(position * 100).toFixed(0)}% · 지지 ${ts}회` });
          }
        }
      }
    }
    return res;
  };
  window.__berryAnalyze = analyze;

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
        return { ok: oi.recentOperatingIncome > 0 && gr.reduce((a, b) => a + b, 0) > 0 && rf.length === 0 };
      } catch (e) { return { ok: false }; }
    };
    const run = async (nation, mk, n, reg) => {
      const uni = await screen(nation, n);
      const kr = mk === 'kr-s';
      const rows = await pool(uni, 8, async (s) => analyze(await candles(mk, s.code), kr, kr ? krFrac : 1).map(x => Object.assign(x, { name: s.name, code: s.code, kr, score: x.score - penalty(reg) })));
      let all = rows.filter(Boolean).flat();
      if (reg === '위험회피') all = all.filter(x => x.setup !== 'B'); // 위험회피엔 돌파 추격 안 함
      const best = {}; all.forEach(x => { if (!best[x.code] || best[x.code].score < x.score) best[x.code] = x; });
      all = Object.values(best).sort((a, b) => b.score - a.score).slice(0, 12);
      const q = await pool(all, 6, (x) => quality(x.code));
      return { list: all.filter((x, i) => q[i] && q[i].ok), scanned: uni.length };
    };
    const [KR, US] = await Promise.all([run('kr', 'kr-s', opt.krN || 200, krReg), run('us', 'us-s', opt.usN || 150, usReg)]);

    const SETUP = { A: '눌림 반등', B: '거래량 돌파', C: '박스 하단' };
    const card = (x) => {
      const kr = x.kr, f = kr ? fk : fu;
      let buy = x.setup === 'C' ? x.buyCap : x.px * (x.setup === 'B' && !kr ? 1.01 : 1.003);
      if (kr) buy = rk(buy, 'down');
      const stop = kr ? rk(x.stop, 'down') : x.stop, tgt = kr ? rk(x.tgt, 'up') : x.tgt;
      return {
        g: grade(x.score), sc: Math.round(x.score), m: kr ? 'KR' : 'US', n: x.name, code: x.code, s: SETUP[x.setup],
        px: f(x.px), ch: pct(x.chg), buy: f(buy), tgt: f(tgt), stop: f(stop),
        tp: pct(100 * (tgt / buy - 1)), sp: pct(100 * (stop / buy - 1)), rr: x.rr.toFixed(1), why: x.why,
        hold: x.setup === 'A' ? '1~5일 · 종가가 5일선 위면 매도' : x.setup === 'B' ? '1~5일 · 목표/손절 도달 시' : '박스 상단(목표)까지 · 20거래일 부진 시 재평가',
        when: kr ? '지금(장중)' : '오늘 밤 정규장',
      };
    };
    const cards = (krAllowed ? KR.list : []).concat(US.list).map(card)
      .sort((a, b) => GORDER.indexOf(a.g) - GORDER.indexOf(b.g) || b.sc - a.sc).slice(0, 6);
    const sPlus = cards.filter(c => ['SSS', 'SS', 'S'].includes(c.g));
    const hhmm = String(kst.getUTCHours()).padStart(2, '0') + ':' + String(kst.getUTCMinutes()).padStart(2, '0');
    const slot = opt.slot || hhmm;
    const title = sPlus.length ? sPlus.map(c => c.g + ' ' + c.n).join(' · ') : cards.length ? `추천 ${cards.length}종목 (S 미만)` : '지금은 추천 종목 없음';
    const alert = { v: 3, slot, time: (kst.getUTCMonth() + 1) + '/' + kst.getUTCDate() + ' ' + hhmm, cards, sPlus: sPlus.map(c => c.g + ' ' + c.n), actionable: cards.length, title, level: 'info', scanned: KR.scanned + US.scanned, krReg, usReg };
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
    const r = await fetch('https://ntfy.sh/', { method: 'POST', body: JSON.stringify({ topic: window.__BERRY.alerts, title: alert.title, message: body, tags, priority: (alert.sPlus || []).length ? 4 : 2 }) });
    return r.status;
  };
  window.__berryLoad = async function (path) {
    try { const r = await fetch('https://api.github.com/repos/yoonjintar2-ctrl/yoonjintar2-ctrl.github.io/contents/' + path + '?ref=main', { headers: { Accept: 'application/vnd.github.raw' }, cache: 'no-store' }); if (r.ok) return await r.text(); } catch (e) {}
    return await (await fetch('https://raw.githubusercontent.com/yoonjintar2-ctrl/yoonjintar2-ctrl.github.io/main/' + path, { cache: 'no-store' })).text();
  };
  window.__berryWatch = function () {
    const me = Math.random().toString(36).slice(2), KEY = 'berryWatcher';
    const live = () => { try { const o = JSON.parse(localStorage.getItem(KEY) || '{}'); return o.id && o.id !== me && Date.now() - o.ts < 25000; } catch (e) { return false; } };
    if (window.__berryWatchState && window.__berryWatchState.alive) return 'already running here';
    if (live()) return 'running in another tab';
    const st = window.__berryWatchState = { alive: true, me, started: new Date().toISOString(), handled: 0, last: '' };
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
        await fetch('https://ntfy.sh/', { method: 'POST', body: JSON.stringify({ topic: window.__BERRY.alerts, title: '검색 중', message: '맥에서 지금 시세로 검색 중이에요 (30초~1분)', tags: ['ack'] }) });
        try { (0, eval)(await window.__berryLoad('bb/alert/scanner.js')); } catch (e) {} // 항상 최신 규칙으로
        await window.__berryScan({ slot: '요청' });
        await window.__berryPublish(window.__ALERT, ['req']);
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
