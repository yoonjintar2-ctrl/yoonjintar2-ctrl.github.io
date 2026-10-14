// 주간 규칙 점검(매주 토요일 아침, 금요일 미국장 마감 뒤) — 규칙별 성공률 재검증 → 등급 상한 조정 → 앱·웹 규칙 화면에 공시. 주문 기능 없음.
// await window.__weekly() → { at, rules: { '①': {g, n, win, avg, edge, n3, win3, avg3, edge3, n1, win1, live:{n, win, avg}} ... }, changed: [...] }
// 등급 상한(최근 3년 기준, 3년 표본 5건 미만이면 전체 기간): 점수 = 승률 × 기대 이익(아무 날 대비 평균 초과수익, 20거래일 환산)
//   S 점수 4↑ · A 2↑ · B+ 1↑ · 그 밖 또는 기대 이익 0 이하 B(알림 멈춤, 참고만)
(function () {
  const INFO = 'https://wts-info-api.tossinvest.com';
  const get = async (u) => { for (let t = 0; t < 3; t++) { try { const r = await fetch(u, { credentials: 'include' }); if (r.ok) return r.json(); } catch (e) {} await new Promise(z => setTimeout(z, 700)); } throw new Error('fail ' + u); };
  const avg = (a) => a.length ? a.reduce((s, x) => s + x, 0) / a.length : NaN;
  const sd = (a) => { const m = avg(a); return Math.sqrt(avg(a.map(v => (v - m) ** 2))); };
  const code = async (sym) => { const j = await get(`${INFO}/api/v2/stock-infos/code-or-symbol/${encodeURIComponent(sym)}`); return j.result.code || j.result.stockCode; };
  const etDay = () => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false }).formatToParts(new Date()).map(x => [x.type, x.value])); const d = p.year + '-' + p.month + '-' + p.day; return +p.hour % 24 >= 16 ? d + 'z' : d; }; // 장 마감 뒤면 오늘도 포함
  const hist = async (sym) => { const c = await code(sym); let cs = [], from = ''; for (let p = 0; p < 12; p++) { const j = await get(`${INFO}/api/v1/c-chart/us-s/${c}/day:1?count=400&useAdjustedRate=true` + (from ? `&from=${encodeURIComponent(from)}` : '')); const k = j.result.candles || []; cs = k.slice().reverse().concat(cs); from = j.result.nextDateTime; if (!from || k.length < 400) break; }
    const today = etDay(); const m = {}; cs.forEach(x => { const d = x.dt.slice(0, 10); if (d < today) m[d] = { o: x.open, h: x.high, l: x.low, c: x.close }; }); return m; };
  const GR = ['B', 'B+', 'A', 'S'];
  const gradeOf = (win, e20) => { if (win == null || e20 == null || !(e20 > 0)) return 'B'; const sc = win / 100 * e20; return sc >= 4 ? 'S' : sc >= 2 ? 'A' : sc >= 1 ? 'B+' : 'B'; };

  window.__weekly = async function () {
    const P = {}; for (const s of ['SPY', 'QQQ', 'TQQQ', 'SOXX', 'USO', 'GLD', 'SLV', 'IEF', 'UGL']) P[s] = await hist(s);
    const D = Object.keys(P.QQQ).sort().filter(d => P.SPY[d]); const n = D.length; const idx = {}; D.forEach((d, i) => idx[d] = i);
    const C = (s, i) => P[s][D[i]] ? P[s][D[i]].c : null;
    const fwd = (s, i, h) => { const a = P[s][D[i + 1]], b = P[s][D[i + h]]; return a && b ? b.c / a.o - 1 - 0.002 : null; }; // 신호 다음 날 시가 매수 → h일째 종가
    const base = (s, h) => { const v = []; for (let i = 210; i < n - h; i++) { const x = fwd(s, i, h); if (x != null) v.push(x); } return v; };
    const ma = (s, i, L) => { let t = 0, k = 0; for (let j = i - L + 1; j <= i; j++) { const v = C(s, j); if (v != null) { t += v; k++; } } return k ? t / k : null; };
    const R = {};
    const add = (rule, i, ret, h, veh) => { (R[rule] = R[rule] || { trades: [], h, veh }).trades.push({ d: D[i], ret }); };

    // ① S&P 60일 고점 대비 −7% '초입'(직전 25일 안에 고점 −3% 이내) → QQQ 40일
    { const dd = (i) => { let hi = 0; for (let k = i - 60; k <= i; k++) hi = Math.max(hi, C('SPY', k)); return 1 - C('SPY', i) / hi; };
      let next = 0; for (let i = 90; i < n - 41; i++) { if (i < next) continue; if (dd(i) >= 0.07 && dd(i - 1) < 0.07) { let fresh = false; for (let k = i - 25; k < i; k++) if (dd(k) < 0.03) fresh = true; if (fresh) { const r = fwd('QQQ', i, 40); if (r != null) { add('①', i, r, 40, 'QQQ'); next = i + 40; } } } } }

    // ② QQQ 상승 뒤 박스 하단 → TQQQ 최대 15일(목표 박스 75%, QQQ 박스 바닥 −4% 자동매도)
    { let box = null, next = 0;
      for (let t = 210; t < n - 16; t++) { const q = C('QQQ', t); const H = (k) => P.QQQ[D[k]].h, L = (k) => P.QQQ[D[k]].l;
        if (!box) { let lo60 = 1e9; for (let k = t - 60; k <= t; k++) lo60 = Math.min(lo60, L(k)); let hi = -1, hiI = 0; for (let k = t - 40; k <= t; k++) if (H(k) > hi) { hi = H(k); hiI = k; }
          if (hi / lo60 - 1 < 0.12 || t - hiI < 8) continue; let loS = 1e9; for (let k = hiI; k <= t; k++) loS = Math.min(loS, L(k)); const w = hi / loS - 1; if (w < 0.04 || w > 0.12 || q < loS * 1.02) continue; box = { hi, lo: loS, start: t, hiI }; continue; }
        if (q > box.hi * 1.01 || q < box.lo * 0.96 || t - box.start > 60) { box = null; continue; }
        for (let k = box.hiI; k <= t; k++) box.lo = Math.min(box.lo, L(k));
        const bp = (q - box.lo) / (box.hi - box.lo); let touch = 0, last = -99; for (let k = box.hiI; k <= t; k++) if (L(k) <= box.lo * 1.015) { if (k - last >= 5) touch++; last = k; }
        if (t >= next && bp >= 0 && bp <= 0.2 && touch >= 2 && t - box.hiI >= 15 && q > ma('QQQ', t, 200) && P.TQQQ[D[t + 1]]) {
          const lvl = box.lo + 0.75 * (box.hi - box.lo), stopQ = box.lo * 0.96, en = P.TQQQ[D[t + 1]].o; let ex = null, k;
          for (k = t + 1; k <= t + 15 && k < n; k++) { const qq = P.QQQ[D[k]], tq = P.TQQQ[D[k]]; if (!tq) break; if (qq.l <= stopQ || qq.h >= lvl) { ex = tq.c; break; } }
          if (ex == null && P.TQQQ[D[Math.min(n - 1, t + 15)]]) ex = P.TQQQ[D[Math.min(n - 1, t + 15)]].c;
          if (ex != null) { add('②', t, ex / en - 1 - 0.002, 15, 'TQQQ'); next = k + 1; } } } }

    // ③ 유가(USO) 하루 +5% & S&P 하락 & QQQ 200일선 위 → TQQQ 20일
    { let next = 0; for (let i = 201; i < n - 21; i++) { if (i < next) continue; const u0 = C('USO', i - 1), u1 = C('USO', i); if (!u0 || !u1) continue;
        if (u1 / u0 - 1 >= 0.05 && C('SPY', i) < C('SPY', i - 1) && C('QQQ', i) > ma('QQQ', i, 200)) { const r = fwd('TQQQ', i, 20); if (r != null) { add('③', i, r, 20, 'TQQQ'); next = i + 20; } } } }

    // ⑤ 금리(IEF↑)·금·은 동반 급락(z ≤ −1) → UGL 20일
    { const dr = (s, i) => { const a = C(s, i - 1), b = C(s, i); return a && b ? b / a - 1 : null; }; const z = (s, i) => { const xs = []; for (let k = i - 250; k < i; k++) { const r = dr(s, k); if (r != null) xs.push(r); } const r = dr(s, i); return xs.length > 200 && r != null ? (r - avg(xs)) / sd(xs) : null; };
      let next = 0; for (let i = 260; i < n - 21; i++) { if (i < next) continue; const zg = z('GLD', i), zs = z('SLV', i), zi = z('IEF', i); if (zg == null || zs == null || zi == null) continue;
        if (zg <= -1 && zs <= -1 && zi >= 1 && C('SPY', i) < C('SPY', i - 1)) { const r = fwd('UGL', i, 20); if (r != null) { add('⑤', i, r, 20, 'UGL'); next = i + 20; } } } }

    // ⑥ QQQ 200일선 위 & 반도체(SOXX) 5일 −7% (직전 10일 안에 처음) → TQQQ 20일, −15% 손절
    { const s5 = (i) => { const a = C('SOXX', i - 5), b = C('SOXX', i); return a && b ? b / a - 1 : null; }; let next = 0;
      for (let i = 210; i < n - 21; i++) { if (i < next) continue; const v = s5(i); if (v == null || v > -0.07 || !(C('QQQ', i) > ma('QQQ', i, 200))) continue; let recent = false; for (let k = i - 10; k < i; k++) { const w = s5(k); if (w != null && w <= -0.07) recent = true; } if (recent) continue;
        const e = P.TQQQ[D[i + 1]]; if (!e) continue; let ex = null; for (let k = i + 1; k <= i + 20; k++) { const tq = P.TQQQ[D[k]]; if (!tq) break; if (tq.l <= e.o * 0.85) { ex = e.o * 0.85; break; } } if (ex == null) { const tq = P.TQQQ[D[i + 20]]; if (tq) ex = tq.c; }
        if (ex != null) { add('⑥', i, ex / e.o - 1 - 0.002, 20, 'TQQQ'); next = i + 20; } } }

    // 실전 기록(앱에 띄운 카드)의 실제 결과
    let log = []; try { log = JSON.parse(localStorage.getItem('cardlog') || '[]'); } catch (e) {}
    const live = {}; const cache = {};
    for (const x of log) { try { const sym = x.code || x.n; const h = cache[sym] || (cache[sym] = await (async () => { const c = x.code || await code(x.n); const j = await get(`${INFO}/api/v1/c-chart/us-s/${c}/day:1?count=120&useAdjustedRate=true`); const m = {}; (j.result.candles || []).forEach(k => m[k.dt.slice(0, 10)] = k.close); return m; })());
        const days = Object.keys(h).sort().filter(d => d > x.d); if (!days.length) continue; const hd = days[Math.min(days.length, x.h) - 1]; const r = h[hd] / x.px - 1 - 0.002; const done = days.length >= x.h;
        (live[x.r] = live[x.r] || []).push({ r, done }); } catch (e) {} }

    // 성적표 + 등급 상한
    const today = D[n - 1], y3 = new Date(new Date(today).getTime() - 3 * 365 * 864e5).toISOString().slice(0, 10), y1 = new Date(new Date(today).getTime() - 365 * 864e5).toISOString().slice(0, 10);
    const prev = (() => { try { return JSON.parse(localStorage.getItem('ruleStats') || 'null'); } catch (e) { return null; } })();
    const out = { at: today, rules: {}, changed: [] };
    const stat = (tr, b) => ({ n: tr.length, win: tr.length ? Math.round(tr.filter(t => t.ret > 0).length / tr.length * 100) : null, avg: tr.length ? +(avg(tr.map(t => t.ret)) * 100).toFixed(1) : null, edge: tr.length ? +((avg(tr.map(t => t.ret)) - b) * 100).toFixed(1) : null });
    for (const rule of ['①', '②', '③', '⑤', '⑥']) { const X = R[rule]; if (!X) { out.rules[rule] = { g: 'B', n: 0 }; continue; }
      const bAll = avg(base(X.veh, X.h)); const all = stat(X.trades, bAll), r3 = stat(X.trades.filter(t => t.d >= y3), bAll), r1 = stat(X.trades.filter(t => t.d >= y1), bAll);
      const use = r3.n >= 5 ? r3 : all; const e20 = use.edge == null ? null : +(use.edge * 20 / X.h).toFixed(1); const g = gradeOf(use.win, e20); const score = e20 == null ? null : +(use.win / 100 * e20).toFixed(2);
      const lv = live[rule] || []; const lvDone = lv.filter(x => x.done);
      out.rules[rule] = { g, basis: r3.n >= 5 ? '3년' : '전체', bn: use.n, bwin: use.win, e20, score, veh: X.veh, h: X.h, n: all.n, win: all.win, avg: all.avg, edge: all.edge, n3: r3.n, win3: r3.win, avg3: r3.avg, edge3: r3.edge, n1: r1.n, win1: r1.win, live: { n: lvDone.length, win: lvDone.length ? Math.round(lvDone.filter(x => x.r > 0).length / lvDone.length * 100) : null, avg: lvDone.length ? +(avg(lvDone.map(x => x.r)) * 100).toFixed(1) : null, open: lv.length - lvDone.length } };
      const pg = prev && prev.rules && prev.rules[rule] && prev.rules[rule].g; if (pg && pg !== g) out.changed.push(`${rule} ${pg}→${g}`); }
    // 과거 재검증이 매주 어려운 규칙(④ 댓글, ⑦ 1분봉, ⑧ 상위 500 종목)은 실전 기록으로만 채점. 기록 10건 전까지는 처음 검증한 등급 유지
    for (const [rule, g0] of [['④', 'A'], ['⑦', 'B+'], ['⑧', 'A'], ['⑨', 'A'], ['⑩', 'B+']]) { const lv = live[rule] || []; const done = lv.filter(x => x.done); const win = done.length ? Math.round(done.filter(x => x.r > 0).length / done.length * 100) : null, a = done.length ? +(avg(done.map(x => x.r)) * 100).toFixed(1) : null;
      const H = { '④': 20, '⑦': 1, '⑧': 20, '⑨': 15, '⑩': 10 }[rule]; const e20 = a == null ? null : +(a * 20 / H).toFixed(1); const score = e20 == null || win == null ? null : +(win / 100 * e20).toFixed(2);
      let g = g0; if (done.length >= 10) { g = gradeOf(win, e20); if (GR.indexOf(g) > GR.indexOf(g0)) g = g0; }
      out.rules[rule] = { g, liveOnly: true, basis: '실전', bn: done.length, bwin: win, e20, score, live: { n: done.length, win, avg: a, open: lv.length - done.length } };
      const pg = prev && prev.rules && prev.rules[rule] && prev.rules[rule].g; if (pg && pg !== g) out.changed.push(`${rule} ${pg}→${g}`); }
    try { localStorage.setItem('ruleStats', JSON.stringify(out)); } catch (e) {}
    return out;
  };

  // 앱·웹 공시용 짧은 성적표: { at, r: { '①': [등급, 3년 건수, 3년 승률, 3년 기준 대비, 실전 건수, 실전 승률] } }
  window.__statsCompact = function () { let st = null; try { st = JSON.parse(localStorage.getItem('ruleStats') || 'null'); } catch (e) {} if (!st) return null;
    const r = {}; for (const k in st.rules) { const x = st.rules[k]; r[k] = [x.g, x.basis || '', x.bn || 0, x.bwin, x.e20, x.score, x.live ? x.live.n : 0, x.live ? x.live.win : null]; } return { at: st.at, v: 2, r }; }; // [등급, 기준 기간, 건수, 승률, 기대 이익(20일 환산 %p), 점수, 실전 건수, 실전 승률]

  // 카드 등급에 규칙 상한 적용(B면 알림 대상에서 빼서 참고로)
  window.__applyRuleCaps = function (A) {
    let st = null; try { st = JSON.parse(localStorage.getItem('ruleStats') || 'null'); } catch (e) {} if (!st) return A;
    const keep = [], toNear = [];
    for (const c of A.cards) { const r = (c.s || '').trim().charAt(0); const cap = st.rules[r] && st.rules[r].g; if (!cap) { keep.push(c); continue; }
      if (cap === 'B') { c.g = 'B'; c.why = (c.why || '') + ' · 주간 점검에서 B(알림 멈춤)'; toNear.push(c); continue; }
      if (GR.indexOf(c.g) > GR.indexOf(cap)) { c.why = (c.why || '') + ` · 주간 점검 상한 ${cap}(원래 ${c.g})`; c.g = cap; }
      keep.push(c); }
    A.cards = keep; A.near = (A.near || []).concat(toNear); return A;
  };

  // 띄운 카드를 실전 기록에 남김(규칙·종목·날짜당 한 번)
  window.__logCards = function (A) {
    const HOLD = { '①': 40, '②': 15, '③': 20, '④': 20, '⑤': 20, '⑥': 20, '⑧': 20, '⑨': 15, '⑩': 10 }; // ⑦은 당일 매매라 vlog로 따로
    let log = []; try { log = JSON.parse(localStorage.getItem('cardlog') || '[]'); } catch (e) {}
    for (const c of A.cards || []) { const r = (c.s || '').trim().charAt(0); const px = +(String(c.px || '').replace(/[^0-9.]/g, '')); if (!HOLD[r] || !(px > 0)) continue;
      const d = A.lastDay || new Date().toISOString().slice(0, 10); if (log.some(x => x.r === r && x.n === c.n && Math.abs(new Date(x.d) - new Date(d)) < 5 * 864e5)) continue;
      log.push({ r, n: c.n, code: c.code || null, d, px, h: HOLD[r], g: c.g }); }
    try { localStorage.setItem('cardlog', JSON.stringify(log.slice(-500))); } catch (e) {}
  };
})();
