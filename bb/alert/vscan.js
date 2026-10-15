// ⑦ 1분봉 V자 반등 후 횡보 (관찰 후보) — 미국 정규장 초반 1시간 반 동안 5분마다 확인. tossinvest.com 탭에서 eval. 주문 기능 없음.
// 조건(2026-10-14 검증, 5분봉 2025-02~2026-10 미국 시총 상위 200: 시장(QQQ)과 같이 빠진 V만 135건 종가까지 +0.93% 승 58%, 종목 혼자 빠진 V는 −0.34%):
//   30분 안 직전 고점 대비 −1.5% 이상 저점 → 30분 안 하락폭 80% 회복 → 그 뒤 20분 움직임이 V 깊이의 50% 이하 & V 중간 위 유지
//   → 매수, 그날 정규장 종가 매도. 관찰 후보라 B+ 등급.
// await window.__vscan() → [card, ...]
(function () {
  const INFO = 'https://wts-info-api.tossinvest.com', CERT = 'https://wts-cert-api.tossinvest.com';
  const get = async (u) => { const r = await fetch(u, { credentials: 'include' }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  const post = async (u, b) => { const r = await fetch(u, { method: 'POST', credentials: 'include', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) }); if (!r.ok) throw new Error(r.status); return r.json(); };
  const pool = async (items, n, fn) => { const out = new Array(items.length); let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; try { out[k] = await fn(items[k]); } catch (e) { out[k] = null; } } })); return out; };
  const fu = (p) => '$' + p.toFixed(2);
  const pct = (x) => (x >= 0 ? '+' : '−') + Math.abs(x * 100).toFixed(1) + '%';
  const et = () => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, weekday: 'short' }).formatToParts(new Date()).map(x => [x.type, x.value])); return { d: p.year + '-' + p.month + '-' + p.day, t: (+p.hour % 24) * 60 + +p.minute - 570, wd: p.weekday }; };

  // V자 + 횡보 찾기 (bars: [t, o, h, l, c] 1분봉, 정규장만)
  const findV = (a) => {
    const n = a.length, c = a.map(x => x[4]), h = a.map(x => x[2]), l = a.map(x => x[3]);
    for (let j = 30; j < n - 21; j++) {
      let H = 0, iH = j - 30; for (let k = j - 30; k < j; k++) if (c[k] > H) { H = c[k]; iH = k; }
      const L = c[j]; if (L / H - 1 > -0.015) continue;
      let isMin = true; for (let k = j - 30; k < j; k++) if (c[k] < L) { isMin = false; break; } if (!isMin) continue;
      let rec = -1; for (let k = j + 1; k <= Math.min(n - 1, j + 30); k++) { if (c[k] < L) break; if (c[k] >= L + 0.8 * (H - L)) { rec = k; break; } }
      if (rec < 0 || rec + 20 >= n) continue;
      let mx = 0, mn = 1e9; for (let k = rec + 1; k <= rec + 20; k++) { mx = Math.max(mx, h[k]); mn = Math.min(mn, l[k]); }
      if (mx - mn <= 0.5 * (H - L) && mn >= L + 0.5 * (H - L)) return { e: rec + 20, te: a[rec + 20][0], tL: a[j][0], tH: a[iH][0], H, L, depth: L / H - 1 };
      j = rec; // 다음 V는 회복 뒤부터
    }
    return null;
  };

  const universe = async () => {
    const key = 'vsU', day = et().d;
    try { const o = JSON.parse(localStorage.getItem(key) || 'null'); if (o && o.d === day && o.list.length) return o.list; } catch (e) {}
    const out = [];
    for (let p = 1; p <= 2; p++) { const j = await post(CERT + '/api/v2/screener/screen', { pagingParam: { key: null, number: p, size: 100 }, filters: [], sort: { column: 'C_시가총액', label: '시가총액', order: 'DESC' }, nation: 'us' }); (j.result.stocks || []).forEach(s => out.push({ code: s.stockCode, name: s.name })); }
    try { localStorage.setItem(key, JSON.stringify({ d: day, list: out })); } catch (e) {}
    return out;
  };

  const todayBars = async (code, day) => {
    let bars = [], from = '';
    for (let p = 0; p < 3; p++) {
      const j = await get(`${INFO}/api/v1/c-chart/us-s/${code}/min:1?count=400&useAdjustedRate=true` + (from ? `&from=${encodeURIComponent(from)}` : ''));
      const k = j.result.candles || []; let older = false;
      for (const x of k) { if (x.dt.slice(0, 10) !== day) { older = true; continue; } const t = +x.dt.slice(11, 13) * 60 + +x.dt.slice(14, 16) - 570; if (t < 0) { older = true; continue; } if (t >= 390) continue; bars.push([t, x.open, x.high, x.low, x.close]); }
      from = j.result.nextDateTime; if (older || !from || k.length < 400) break;
    }
    const m = {}; bars.forEach(b => m[b[0]] = b); return Object.values(m).sort((p, q) => p[0] - q[0]);
  };

  window.__vscanTest = { findV, todayBars, universe };
  window.__vscan = async function () {
    const E = et(); if (E.wd === 'Sat' || E.wd === 'Sun' || E.t < 50 || E.t > 390) return [];
    const U = await universe();
    // 나스닥(QQQ) 같은 구간 등락: 종목만 혼자 빠진 V(개별 악재)는 효과가 없어서 뺀다(5분봉 2025~26 검증: 종목만 빠짐 −0.34% 승 34% / 시장과 같이 빠짐 +0.93% 승 58%)
    let qqq = [];
    try { const q = (await get(`${INFO}/api/v2/stock-infos/code-or-symbol/QQQ`)).result; qqq = await todayBars(q.code || q.stockCode, E.d); } catch (e) {}
    const qAt = (t) => { let r = null; for (const b of qqq) { if (b[0] <= t) r = b; else break; } return r; };
    const hits = (await pool(U, 8, async (u) => { const a = await todayBars(u.code, E.d); if (a.length < 50) return null; const v = findV(a); if (!v) return null; if (E.t - v.te > 45) return null;
      const qH = qAt(v.tH), qL = qAt(v.tL); if (!qH || !qL) return null; v.qV = qL[4] / qH[4] - 1; v.rel = v.depth - v.qV; if (v.rel < -0.014) return null; return { u, a, v }; })).filter(Boolean);
    const cards = [];
    // 사업성 확인(실적·부채·최근 3일 악재 뉴스, fund.js) — 통과한 종목만 카드로
    if (window.__fundVer !== 3) try { (0, eval)(await window.__berryLoad('bb/alert/fund.js')); } catch (e) {}
    for (const h of hits.slice(0, 5)) {
      let fc = null; try { fc = window.__fundCheck ? await window.__fundCheck(h.u.code) : null; } catch (e) {}
      if (!fc || !fc.ok) continue;
      let sym = h.u.name, ln = [], pc = null;
      try { sym = (await get(`${INFO}/api/v2/stock-infos/${h.u.code}`)).result.symbol || sym; } catch (e) {}
      try { const j = await get(`${INFO}/api/v1/c-chart/us-s/${h.u.code}/day:1?count=41&useAdjustedRate=true`); const cs = (j.result.candles || []).slice().reverse().filter(x => x.dt.slice(0, 10) < E.d); ln = cs.slice(-40).map(x => x.close); pc = ln[ln.length - 1]; } catch (e) {}
      const p = h.a[h.a.length - 1][4], hm = (t) => { const m = t + 570; return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };
      cards.push({ quietCard: true, g: fc.soft && fc.soft.length ? 'C' : 'C+', m: 'US', n: sym, kn: h.u.name, s: '⑦ V자 반등 후 횡보(관찰)', px: fu(p), ch: pc ? pct(p / pc - 1) : '', ln: ln.concat([p]).slice(-40),
        buy: fu(p * 1.003), tgt: '오늘 종가', tp: '', stop: fu(h.v.L), sp: pct(h.v.L / p - 1) + ' V 저점(참고)', rr: '',
        when: '지금 사서 오늘 정규장 종가에 매도', hold: '당일(정규장 종가 매도) · 관찰 후보라 소액',
        why: `아직 효과 검증 중인 관찰 후보(C+) · 소액만. 미국 ${hm(h.v.tL)} V자 ${pct(h.v.depth)}(같은 때 나스닥 ${pct(h.v.qV)}, 시장과 함께 빠진 V) → 회복 후 ${hm(h.v.te)}까지 20분 횡보. 5분봉 2025~26 135건 종가까지 +0.93% 승 58%(2025 +1.12 / 2026 +0.66). 관찰 후보\n${fc.why}` });
    }
    // 실제 결과 검증용 기록(오늘 종가와 비교는 나중에)
    try { const log = JSON.parse(localStorage.getItem('vlog') || '[]'); cards.forEach(c => { if (!log.some(x => x.d === E.d && x.n === c.n)) log.push({ d: E.d, n: c.n, code: (hits.find(h => h.u.name === c.kn) || {}).u?.code, px: c.px, t: E.t }); }); localStorage.setItem('vlog', JSON.stringify(log.slice(-300))); } catch (e) {}
    return cards;
  };
})();
