// 매일 오후 6시(KST) 매수 의견 — 검증된 6개 규칙(①~⑥)만 사용. tossinvest.com 탭에서 eval. 주문 기능 없음.
// await window.__daily6() → window.__D6 {title, cards[], near[], text}
// 무기: QQQ · TQQQ · UGL (D만 개별 종목)
// 등급(2026-10-13 검증, 2011~2026 규칙 신호 216건):
//   S = 기준 대비 +6.3%p, 승 90%  /  A = +5.5%p, 승 73%  /  B = −1.4%p, 승 54% (매수 안 함, 참고만)
(function () {
  const INFO = 'https://wts-info-api.tossinvest.com', CERT = 'https://wts-cert-api.tossinvest.com';
  const get = async (u) => { const r = await fetch(u, { credentials: 'include' }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  // 토스 종목 코드 → 미국 티커(공유 썸네일에 MRVL처럼 티커가 크게 나오게). 실패하면 한글 이름
  const SYM = {}; const symOf = async (code, nm) => { if (SYM[code]) return SYM[code]; try { const j = await get(`${INFO}/api/v2/stock-infos/code-or-symbol/${code}`); SYM[code] = (j.result && j.result.symbol) || nm || code; } catch (e) { SYM[code] = nm || code; } return SYM[code]; };
  const post = async (u, b) => { const r = await fetch(u, { method: 'POST', credentials: 'include', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  const pool = async (items, n, fn) => { const out = new Array(items.length); let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; try { out[k] = await fn(items[k]); } catch (e) { out[k] = null; } } })); return out; };
  const fu = (p) => '$' + p.toFixed(2);
  const pct = (x) => (x >= 0 ? '+' : '−') + Math.abs(x * 100).toFixed(1) + '%';
  const avg = (a) => a.reduce((s, v) => s + v, 0) / a.length;
  const sd = (a) => { const m = avg(a); return Math.sqrt(avg(a.map(v => (v - m) ** 2))); };
  const ma = (c, n, end) => { end = end == null ? c.length - 1 : end; let s = 0; for (let k = end - n + 1; k <= end; k++) s += c[k]; return s / n; };

  // 미국 시각 기준으로 아직 안 끝난 날의 일봉은 뺀다
  const etNow = () => { const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false }).formatToParts(new Date()); const g = (t) => p.find(x => x.type === t).value; return { d: `${g('year')}-${g('month')}-${g('day')}`, h: +g('hour') % 24 }; };
  const codeOf = {}; const code = async (sym) => { if (codeOf[sym]) return codeOf[sym]; const j = await get(`${INFO}/api/v2/stock-infos/code-or-symbol/${sym}`); return (codeOf[sym] = j.result.code || j.result.stockCode); };
  const candles = async (c, n) => { let cs = [], from = ''; while (cs.length < n) { const j = await get(`${INFO}/api/v1/c-chart/us-s/${c}/day:1?count=400&useAdjustedRate=true` + (from ? `&from=${encodeURIComponent(from)}` : '')); const k = j.result.candles || []; cs = k.slice().reverse().concat(cs); from = j.result.nextDateTime; if (!from || k.length < 400) break; }
    const et = etNow(); cs = cs.filter(x => x.dt.slice(0, 10) < et.d || (x.dt.slice(0, 10) === et.d && et.h >= 16)); return cs.slice(-n); };
  const last30 = async (c) => { try { const j = await get(`${INFO}/api/v1/c-chart/us-s/${c}/min:30?count=3&useAdjustedRate=true`); const k = j.result.candles || []; return k.length ? k[0].close : null; } catch (e) { return null; } };
  const byDate = (cs) => { const m = {}; cs.forEach(x => m[x.dt.slice(0, 10)] = x); return m; };

  // 발행: 매수 의견(S·A)이 있으면 알림. 같은 날 같은 카드로 이미 알렸으면 화면만 갱신(quiet).
  window.__d6Publish = async function () {
    const A = window.__D6; if (!A) throw new Error('no __D6');
    // 중복 알림 막기는 __berryPublish(scanner.js)가 한다: 새 카드가 있을 때만 울림
    const st = await window.__berryPublish(A, []);
    const loud = (A.fresh || []).length > 0;
    return st + (loud ? ' 알림(새 카드 ' + A.fresh.join(', ') + ')' : ' 조용히');
  };
  window.__daily6 = async function (opt) {
    opt = opt || {};
    const sym = ['SPY', 'QQQ', 'TQQQ', 'UGL', 'GLD', 'SLV', 'IEF', 'USO', 'SOXX'];
    const C = {}; for (const s of sym) C[s] = await code(s);
    const [spy, qqq, gld, slv, ief, uso, soxx] = await Promise.all([candles(C.SPY, 330), candles(C.QQQ, 330), candles(C.GLD, 300), candles(C.SLV, 300), candles(C.IEF, 300), candles(C.USO, 30), candles(C.SOXX, 30)]);
    const px = {}; for (const s of ['QQQ', 'TQQQ', 'UGL']) px[s] = await last30(C[s]);
    // 카드용 최근 40거래일 종가(꺾은선) + 전일 종가 대비 등락
    const LN = {}, PC = {}; const keep = (cs) => cs.slice(-40).map(x => Math.round(x.close * 100) / 100);
    LN.QQQ = keep(qqq); const tq = await candles(C.TQQQ, 40), ug = await candles(C.UGL, 40); LN.TQQQ = keep(tq); LN.UGL = keep(ug);
    PC.QQQ = qqq[qqq.length - 1].close; PC.TQQQ = tq[tq.length - 1].close; PC.UGL = ug[ug.length - 1].close;
    const lastDay = qqq[qqq.length - 1].dt.slice(0, 10);
    const cards = [], near = [], state = [];
    const Q = qqq.map(x => x.close), S = spy.map(x => x.close), nQ = Q.length, nS = S.length;
    const qUp200 = Q[nQ - 1] > ma(Q, 200);
    const sDn = S[nS - 1] < S[nS - 2];
    const card = (g, rule, n, kn, p, o) => { const c = Object.assign({ g, m: 'US', n, kn, s: rule, px: p ? fu(p) : '-', ch: p && PC[n] ? pct(p / PC[n] - 1) : '', ln: LN[n], buy: p ? fu(p * 1.01) : '-', tp: '', sp: '', rr: '', when: '오늘 밤 정규장(또는 지금 데이마켓)' }, o);
      const num = (x) => /^\$[0-9.]+$/.test(x) ? +x.slice(1) : null; if (p && num(c.tgt)) c.tp = pct(num(c.tgt) / p - 1); if (p && num(c.stop)) c.sp = pct(num(c.stop) / p - 1); return c; };

    // ① 급락 초입 → QQQ 40일
    { const hi60 = (t) => Math.max(...S.slice(t - 60, t + 1)); const dd = (t) => 1 - S[t] / hi60(t);
      const fresh = (t) => { for (let k = t - 25; k < t; k++) if (dd(k) < 0.03) return true; return false; };
      let trig = -1, nearT = -1; for (let t = nS - 21; t < nS; t++) { if (dd(t) >= 0.07 && fresh(t) && trig < 0) trig = t; if (dd(t) >= 0.05 && dd(t) < 0.07 && fresh(t)) nearT = t; }
      const dNow = dd(nS - 1); state.push('① S&P 고점 대비 ' + pct(-dNow));
      if (trig >= 0 && nS - 1 - trig <= 3) cards.push(card('A', '① 급락 초입', 'QQQ', '나스닥100', px.QQQ, { tgt: px.QQQ ? fu(px.QQQ * 1.20) : '+20%', stop: px.QQQ ? fu(px.QQQ * 0.85) : '−15%', hold: '최대 40거래일 · 실제 산 값 기준 +20% 익절 / −15% 손절(거의 안 닿는 안전장치) · 40일째 종가 매도 · 발동 ' + spy[trig].dt.slice(5, 10) + ' (3일 안에 사면 됨)', why: `S&P가 60일 고점 대비 ${pct(-dd(trig))} · 급락 초입. 2014~2026 23회 40일 +7.1% 승 74%` }));
      else if (nearT === nS - 1) near.push(card('B', '① 급락 근접', 'QQQ', '나스닥100', px.QQQ, { tgt: '-', stop: '-', hold: '매수 안 함', why: `S&P 고점 대비 ${pct(-dNow)} (발동 −7%)` })); }

    // ② 나스닥 상승 후 박스 하단 → TQQQ
    { const H = qqq.map(x => x.high), Lw = qqq.map(x => x.low); let box = null, sig = null;
      for (let t = 210; t < nQ; t++) {
        if (!box) { const lo60 = Math.min(...Lw.slice(t - 60, t + 1)); let hi = -1, hiI = 0; for (let k = t - 40; k <= t; k++) if (H[k] > hi) { hi = H[k]; hiI = k; }
          if (hi / lo60 - 1 < 0.12 || t - hiI < 8) continue; const loS = Math.min(...Lw.slice(hiI, t + 1)), w = hi / loS - 1; if (w < 0.04 || w > 0.12 || Q[t] < loS * 1.02) continue; box = { hi, lo: loS, start: t, hiI }; continue; }
        if (Q[t] > box.hi * 1.01 || Q[t] < box.lo * 0.96 || t - box.start > 60) { box = null; continue; }
        box.lo = Math.min(box.lo, Math.min(...Lw.slice(box.hiI, t + 1)));
        const bp = (Q[t] - box.lo) / (box.hi - box.lo);
        let touch = 0, last = -99; for (let k = box.hiI; k <= t; k++) if (Lw[k] <= box.lo * 1.015) { if (k - last >= 5) touch++; last = k; }
        const ok = bp >= 0 && bp <= 0.2 && touch >= 2 && t - box.hiI >= 15 && Q[t] > ma(Q, 200, t);
        if (ok && t >= nQ - 2) sig = { box: Object.assign({}, box), t, bp, m50: Q[t] / ma(Q, 50, t) };
      }
      state.push(box ? `② QQQ 박스 ${fu(box.lo)}~${fu(box.hi)} 중 ${Math.round(100 * (Q[nQ - 1] - box.lo) / (box.hi - box.lo))}%` : '② 박스 없음');
      if (sig) { const qc = Q[nQ - 1], tc = px.TQQQ || 0, lvl = sig.box.lo + 0.75 * (sig.box.hi - sig.box.lo), qStop = sig.box.lo * 0.96, toT = (q) => tc * (1 + 3 * (q / qc - 1));
        const g = sig.m50 >= 0.96 ? 'B+' : 'B'; // 2026-10-15 재점검: 조합 108개 중 49%만 플러스(보유 기간·진입만 바꿔도 흔들림) → S·A에서 B+로
        const c = card(g, '② 박스 하단', 'TQQQ', '나스닥100 3배', tc, { tgt: fu(toT(lvl)), stop: fu(toT(qStop)), hold: '최대 15일 · QQQ ' + fu(qStop) + ' 닿으면 바로 자동매도 · 2일 안에 사야 함',
          why: `QQQ 박스 ${fu(sig.box.lo)}~${fu(sig.box.hi)} 하단 ${Math.round(sig.bp * 100)}% · QQQ/50일선 ${(sig.m50 * 100).toFixed(1)}% · 목표 QQQ ${fu(lvl)}` });
        (g === 'B' ? near : cards).push(c); } }

    // ③ 유가 급등 + S&P 하락 → TQQQ 20~30일 (실시간은 USO로 대신: FRED 유가는 하루 늦음)
    { const U = uso.map(x => x.close), nU = U.length; const ud = byDate(spy);
      let hit = null; for (let t = nU - 3; t < nU; t++) { const d = uso[t].dt.slice(0, 10), ur = U[t] / U[t - 1] - 1; const si = spy.findIndex(x => x.dt.slice(0, 10) === d); if (si < 1) continue; const sr = S[si] / S[si - 1] - 1; const qi = qqq.findIndex(x => x.dt.slice(0, 10) === d); const up = qi >= 200 && Q[qi] > ma(Q, 200, qi);
        if (sr < 0 && up && ur >= 0.05) hit = { d, ur, sr, g: 'A' }; else if (sr < 0 && up && ur >= 0.04 && t === nU - 1) hit = hit || { d, ur, sr, g: 'B' }; }
      state.push('③ 유가(USO) 전일 ' + pct(U[nU - 1] / U[nU - 2] - 1));
      if (hit) { const c = card(hit.g, '③ 유가 급등', 'TQQQ', '나스닥100 3배', px.TQQQ, { tgt: px.TQQQ ? fu(px.TQQQ * 1.30) : '+30%', stop: px.TQQQ ? fu(px.TQQQ * 0.85) : '−15%', hold: '최대 20거래일 · 실제 산 값 기준 +30% 익절 / −15% 손절 · 20일째 종가 매도 · 발동 ' + hit.d.slice(5) + ' (3일 안에 사면 됨)', why: `유가 ${pct(hit.ur)} · S&P ${pct(hit.sr)} · QQQ 200일선 위. 2004~2026 TQQQ 20일 +13.5% 승 78%` }); (hit.g === 'B' ? near : cards).push(c); }
      { const t = nU - 1, d = uso[t].dt.slice(0, 10), ur = U[t] / U[t - 1] - 1; const si = spy.findIndex(x => x.dt.slice(0, 10) === d); const qi = qqq.findIndex(x => x.dt.slice(0, 10) === d);
        if (si > 0 && qi >= 200 && S[si] < S[si - 1] && Q[qi] > ma(Q, 200, qi) && ur >= 0.03 && px.TQQQ) cards.push(card('A', '③ 유가 급등 · 단타', 'TQQQ', '나스닥100 3배', px.TQQQ, { v: 1, hd: 3, tgt: fu(px.TQQQ * 1.05), stop: fu(px.TQQQ * 0.92), when: '오늘 밤 정규장 시가', hold: '최대 3거래일 · 실제 산 값 기준 +5% 익절 / −8% 손절 · 3일째 종가 매도', why: `유가 ${pct(ur)} · S&P 하락 · QQQ 200일선 위. 짧게: 2011~2026 55건 3일 안에 71% 성공, 평균 +1.7%(세 기간 모두 아무 날보다 나음)` })); } }

    // ⑤ 금리·금·은 동반 하락 → UGL 20일 (금리는 IEF로 대신: 금리 하락 = IEF 상승)
    { const dg = byDate(gld), ds = byDate(slv), di = byDate(ief), dsp = byDate(spy);
      const days = gld.map(x => x.dt.slice(0, 10)).filter(d => ds[d] && di[d] && dsp[d]); const n = days.length;
      const r = (m, i) => m[days[i]].close / m[days[i - 1]].close - 1;
      const z = (m, i) => { const xs = []; for (let k = i - 250; k < i; k++) xs.push(r(m, k)); return (r(m, i) - avg(xs)) / sd(xs); };
      let hit = null; for (let i = n - 3; i < n; i++) { const zg = z(dg, i), zs = z(ds, i), zi = z(di, i); if (zg <= -1 && zs <= -1 && zi >= 1) { const sp = r(dsp, i) < 0; const G = gld.map(x => x.close); const gi = gld.findIndex(x => x.dt.slice(0, 10) === days[i]); const g50 = G[gi] > ma(G, 50, gi); hit = { d: days[i], g: sp && g50 ? 'S' : sp ? 'A' : 'B', zg, zs }; } }
      state.push('⑤ 금 전일 ' + pct(r(dg, n - 1)));
      if (hit) { const c = card(hit.g, '⑤ 금·금리 동반 하락', 'UGL', '금 2배', px.UGL, { tgt: px.UGL ? fu(px.UGL * 1.15) : '+15%', stop: px.UGL ? fu(px.UGL * 0.90) : '−10%', hold: '최대 20거래일 · 실제 산 값 기준 +15% 익절 / −10% 손절 · 20일째 종가 매도 · 발동 ' + hit.d.slice(5) + ' (3일 안에 사면 됨)', why: `금리·금·은 함께 급락(금 z ${hit.zg.toFixed(1)}) · ${hit.g === 'B' ? 'S&P 상승일이라 약함' : 'S&P도 하락'}. UGL 20일 +7.0% 승 77%` }); (hit.g === 'B' ? near : cards).push(c);
        if (hit.g !== 'B' && px.UGL) cards.push(card('A', '⑤ 금·금리 동반 하락 · 단타', /* 2026-10-15 재점검: 48개 조합 100% 플러스 → A */ 'UGL', '금 2배', px.UGL, { v: 1, hd: 10, tgt: fu(px.UGL * 1.08), stop: fu(px.UGL * 0.92), hold: '최대 10거래일 · 실제 산 값 기준 +8% 익절 / −8% 손절 · 10일째 종가 매도', why: '같은 신호를 짧게: 2009~2026 30건 10일 안에 67% 성공, 평균 +2.4%(세 기간 모두 아무 날보다 나음)' })); } }

    // ⑥ QQQ 200일선 위 + 반도체 5일 −7% → TQQQ 20일(−15% 손절)
    { const X = soxx.map(x => x.close), nX = X.length; const s5 = (t) => X[t] / X[t - 5] - 1; const recent = [...Array(10).keys()].some(k => s5(nX - 2 - k) <= -0.07);
      state.push('⑥ 반도체 5일 ' + pct(s5(nX - 1)));
      if (qUp200 && s5(nX - 1) <= -0.07 && !recent) cards.push(card('A', '⑥ 반도체만 급락', 'TQQQ', '나스닥100 3배', px.TQQQ, { tgt: px.TQQQ ? fu(px.TQQQ * 1.25) : '+25%', stop: px.TQQQ ? fu(px.TQQQ * 0.85) : '−15%', hold: '최대 20거래일 · 실제 산 값 기준 +25% 익절 / −15% 손절 필수 · 20일째 종가 매도 · 오늘 밤 정규장 시가까지 사야 함(늦으면 수익 급감)', why: `반도체(SOXX) 5일 ${pct(s5(nX - 1))} · QQQ 200일선 위. TQQQ 20일 +8.7% 승 74%` }));
      else if (qUp200 && s5(nX - 1) <= -0.05 && !recent) near.push(card('B', '⑥ 반도체 급락 근접', 'TQQQ', '나스닥100 3배', px.TQQQ, { tgt: '-', stop: '-', hold: '매수 안 함', why: `반도체 5일 ${pct(s5(nX - 1))} (발동 −7%)` }));
      if (qUp200 && s5(nX - 1) <= -0.07 && !recent && px.TQQQ) cards.push(card('A', '⑥ 반도체만 급락 · 단타', 'TQQQ', '나스닥100 3배', px.TQQQ, { v: 1, hd: 3, tgt: fu(px.TQQQ * 1.06), stop: fu(px.TQQQ * 0.90), hold: '최대 3거래일 · 실제 산 값 기준 +6% 익절 / −10% 손절 · 3일째 종가 매도 · 오늘 밤 정규장 시가', why: '같은 신호를 짧게: 2010~2026 36건 3일 안에 78% 성공, 평균 +2.6%(세 기간 모두 아무 날보다 나음)' })); }

    // ④ 실적 좋은 종목 급락 + 커뮤니티 공포 여론
    if (!opt.skipD) { try {
      const U = []; for (let p = 1; p <= 5; p++) { const j = await post(CERT + '/api/v2/screener/screen', { pagingParam: { key: null, number: p, size: 100 }, filters: [], sort: { column: 'C_시가총액', label: '시가총액', order: 'DESC' }, nation: 'us' }); (j.result.stocks || []).forEach(s => U.push({ code: s.stockCode, name: s.name })); }
      const uni = U.filter(x => !/우선주|ADR|만기|%/.test(x.name)).slice(0, 400);
      const drops = (await pool(uni, 8, async (s) => { const cs = await candles(s.code, 40); const n = cs.length; if (n < 25) return null; const c = cs.map(x => x.close); const r3 = (t) => c[t] / c[t - 3] - 1; if (r3(n - 1) > -0.08) return null;
        for (let t = n - 21; t < n - 1; t++) if (r3(t) <= -0.08) return null; let am = 0; for (let k = n - 21; k < n - 1; k++) am += cs[k].amount; if (am / 20 < 2e7 || c[n - 1] < 5) return null; return { ...s, r3: r3(n - 1), px: c[n - 1], d: cs[n - 1].dt.slice(0, 10), ln: keep(cs) }; })).filter(Boolean);
      const EMO = /무섭|무서워|무서운|말이\s?되|말이\s?돼|말이\s?됨|말이냐|한강|눈물|울고|운다|끝났|끝남|망했|망함|패닉|공포/;
      const BUY = /줍줍|추매|담았|분할\s?매수|물타|낙폭|과매도|바겐|세일|하따|정찰병/;
      const WRY = /어디까지|끝이\s?없|바닥이\s?없|이정도|이렇게까지|꼬라박|처박|쳐박|떨어질까|더\s?빠지|살려|제발|멘붕|어떡|어쩌/;
      const UJ = /억까|억울|개미\s?털|털기|흔들기|흔드|세력|작전/; // ④ 억까 여론(C+)
      const FEAR = /한강|무섭|무서워|말이\s?되|말이\s?돼|미쳤|살려|패닉|공포|멘붕|어떡|무너|대폭락|눈물|ㅠㅠ|ㅜㅜ|끝났|끝남|상폐|반토막|지옥|탈출|도망/;
      for (const s of drops) {
        const dt = new Date(s.d).getTime();
        // 실적·재무(④ 조건) — 여기서 실패해도 ④ 억까 여론(C+) 확인은 계속
        let good = false, stb = null;
        try {
          const rv = (await post(`${INFO}/api/v2/stock-infos/revenue-and-net-profit/${s.code}`, { range: 5, period: 'Q' })).result; const oi = (await post(`${INFO}/api/v2/stock-infos/operating-income/${s.code}`, { range: 5, period: 'Q' })).result;
          const om = {}; (oi && oi.graph || []).forEach(g => om[g.period] = g.operatingIncome);
          const av = (rv && rv.graph || []).map(g => ({ p: g.period, rev: g.revenue, oi: om[g.period] })).filter(q => { const [y, m] = q.p.split('-').map(Number); return new Date(y, m, 0).getTime() + 50 * 864e5 <= dt && q.rev != null; });
          if (av.length >= 8) { const L = av.length, t4 = av.slice(L - 4), p4 = av.slice(L - 8, L - 4);
            good = t4.reduce((x, q) => x + q.rev, 0) > p4.reduce((x, q) => x + q.rev, 0) && t4.reduce((x, q) => x + (q.oi || 0), 0) > 0 && av[L - 1].rev > av[L - 5].rev; }
          if (good) { try { stb = (await post(`${INFO}/api/v2/stock-infos/stability/${s.code}`, {})).result; } catch (e) {}
            if (!stb || stb.liabilityRatio == null || stb.liabilityRatio >= 200 || (stb.interestCoverageRatio != null && stb.interestCoverageRatio <= 3)) good = false; }
        } catch (e) {}
        // 급락일(미국 날짜 D) 기준 한국시각 D−1 12:00 ~ D+1 12:00 사이(급락 전후 이틀) 댓글을 개수 제한 없이 전부 읽음
        //   2026-10-15 석진: 개수를 정하지 말고 종목마다 그 기간에 달린 댓글 전부(인기 종목은 많이, 조용한 종목은 적게). 기간 밖 옛날 글은 안 셈
        //   댓글이 100개 미만인 종목은 표본이 작아 제외. 비율은 구간별로 낸 뒤 평균(검증 때와 같은 구간 가중). 구간이 끝난 종목은 결과를 저장해 다시 안 읽음
        const D0 = new Date(s.d + 'T00:00:00+09:00').getTime(), wins = [6, 30, 36].map(h => [D0 + (h - 18) * 3600e3, D0 + h * 3600e3]);
        const CK = 'd6c5:' + s.code + ':' + s.d, RES = { EMO, BUY, WRY, FEAR, UJ };
        let cc = null; try { cc = JSON.parse(localStorage.getItem(CK) || 'null'); } catch (e) {}
        if (!cc) {
          const got = wins.map(() => []); let id = null, nIn = 0;
          for (let p = 0; p < 400; p++) { const j = await get(`${CERT}/api/v4/comments?subjectType=STOCK&subjectId=${s.code}&commentSortType=RECENT` + (id ? '&lastCommentId=' + id : '')); const r = (j.result && j.result.results) || []; if (!r.length) break;
            for (const x of r) { const t = new Date(x.createdAt).getTime(); const m = ((x.message && x.message.title) || '') + ' ' + ((x.message && x.message.message) || ''); if (t >= wins[0][0] && t <= wins[2][1]) nIn++; wins.forEach((w, k) => { if (t >= w[0] && t <= w[1]) got[k].push(m); }); }
            id = r[r.length - 1].commentId; if (new Date(r[r.length - 1].createdAt).getTime() < wins[0][0]) break; }
          const n = new Set([].concat(...got)).size, ws = got.filter(g => g.length >= 5), shr = {};
          for (const k in RES) shr[k] = ws.length ? ws.reduce((a, g) => a + g.filter(m => RES[k].test(m)).length / g.length, 0) / ws.length : 0;
          cc = { n, nIn, sh: shr };
          if (Date.now() > wins[2][1] + 3600e3) try { localStorage.setItem(CK, JSON.stringify(cc)); for (let q = localStorage.length - 1; q >= 0; q--) { const k = localStorage.key(q); if (k && (k.startsWith('d6c4:') || k.startsWith('d6c5:')) && Date.now() - new Date(k.split(':')[2]).getTime() > 40 * 864e5) localStorage.removeItem(k); } } catch (e) {}
        }
        const nIn = cc.nIn, all = { length: cc.n }; if (cc.n < 100) continue; // 댓글이 너무 적은 종목은 제외
        const sh = (re) => cc.sh[Object.keys(RES).find(k => RES[k] === re)] || 0; const emo = sh(EMO), buy = sh(BUY), wry = sh(WRY), fear = sh(FEAR);
        let g = null; if (good) { if (emo >= 0.05 && buy < emo && wry < emo) g = 'S'; else if (emo >= 0.03 && buy < emo) g = 'A'; else if (fear >= 0.07) g = 'B'; }
        if (g) {
          const tk = await symOf(s.code, s.name); LN[tk] = s.ln; const c = card(g, '④ 실적주 공포 여론', tk, s.name, s.px, { code: s.code, tgt: s.px ? fu(s.px * 1.20) : '+20%', stop: s.px ? fu(s.px * 0.85) : '−15%', hold: '20~60일 · 실제 산 값 기준 +20% 익절 / −15% 손절(일반 가이드, 개별주 검증 전) · 60일째 종가 매도', why: `3일 ${pct(s.r3)} · 매출↑·흑자·부채비율 ${Math.round(stb.liabilityRatio)}% · 댓글 ${all.length}개 중 감정형 공포 ${(emo * 100).toFixed(0)}% · 줍줍 ${(buy * 100).toFixed(0)}% · 걱정 ${(wry * 100).toFixed(0)}%` });
          (g === 'B' ? near : cards).push(c); continue;
        }
        // ④ 억까 여론(C+ 관찰, 2026-10-14): 댓글 많은 급락주에서 '억까·세력·작전·털기'(억울하다·누가 일부러 누른다) 말이 3% 이상
        //   검증(토스 댓글, 2023~2026 3일 −8% 급락 중 급락 전후 댓글 80개 이상 327건): 16건 20일 +11.0%(승 75%) 60일 +24.6% vs 전체 +3.4%(53%) — 우연 확률 7%, 2025~26 12건 +5.7%
        //   반대로 '이유를 모르겠다·왜 빠지냐'는 오히려 나빴음(20일 +1.4% vs 없을 때 +5.0%), '너무 빠졌다·과하다'는 차이 없음
        const uj = sh(UJ);
        if (nIn >= 80 && uj >= 0.03 && s.px) { const tk = await symOf(s.code, s.name); LN[tk] = s.ln;
          cards.push(card('C+', '④ 억까 여론', tk, s.name, s.px, { v: 1, hd: 20, art: 'r04u', code: s.code, tgt: fu(s.px * 1.20), stop: fu(s.px * 0.85), hold: '최대 20거래일 · 실제 산 값 기준 +20% 익절 / −15% 손절(검증 전 일반 가이드) · 20일째 종가 매도', why: `아직 효과 검증 중인 관찰 후보(C+) · 소액만. 3일 ${pct(s.r3)} · 급락 전후 댓글 ${nIn}개 · '억까·세력·작전·털기' ${(uj * 100).toFixed(0)}%` })); }
      }
      state.push(`④ 급락 후보 ${drops.length}개`);
    } catch (e) { state.push('④ 오류: ' + String(e).slice(0, 60)); } }

    const ord = { SSS: 0, SS: 0, S: 0, 'A+': 1, A: 1, 'A-': 1, 'B+': 2, B: 2, 'C+': 3 }; cards.sort((a, b) => ord[a.g] - ord[b.g]);
    const kst = new Date(Date.now() + 9 * 3600e3), hhmm = String(kst.getUTCHours()).padStart(2, '0') + ':' + String(kst.getUTCMinutes()).padStart(2, '0');
    const title = (cards.length ? '매수 의견: ' + cards.map(c => c.g + '등급 ' + c.n).join(' · ') : '매수 의견 없음') + (near.length ? ' · 참고(B등급): ' + near.map(c => c.n).join(', ') : '') + (cards.length ? '' : ' · ' + state.slice(0, 3).join(' · '));
    const line = (c) => `${c.g} · ${c.n} (${c.s}) — 매수 상한 ${c.buy} · ${c.stop !== '-' ? '손절/자동매도 ' + c.stop + ' · ' : ''}${c.hold}\n   ${c.why}`;
    const text = `[${(kst.getUTCMonth() + 1)}/${kst.getUTCDate()} ${hhmm} · 미국 ${lastDay} 마감 기준]\n` + (cards.length ? cards.map(line).join('\n') : '매수 의견 없음') + (near.length ? '\n참고(B, 매수 안 함): ' + near.map(c => c.n + ' ' + c.s).join(', ') : '') + '\n상태: ' + state.join(' · ');
    const alert = { v: 3, slot: opt.slot || '18시', time: (kst.getUTCMonth() + 1) + '/' + kst.getUTCDate() + ' ' + hhmm, cards, near, sPlus: cards.map(c => c.g + ' ' + c.n), title, level: 'info', text, lastDay };
    alert.body = JSON.stringify({ v: 3, slot: alert.slot, time: alert.time, cards });
    window.__D6 = alert;
    return text;
  };
})();
