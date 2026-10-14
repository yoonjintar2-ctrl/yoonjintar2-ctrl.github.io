// ⑪ 위기 매수 — QQQ·SOXX가 3년 최고가 대비 −30% / −40% / −50%에 처음 닿을 때 나눠서 매수(몇 년에 한 번). tossinvest.com 탭에서 eval. 주문 기능 없음.
// 검증(2026-10-14): SOXX 2008-07 −30% 진입 뒤 추가 −50%, 1년 −24%, 3년 +19% · 2008-10 −50% 진입 3년 +42% · 2020-03 −30% 1년 +135% · 2022-09 −40% 3년 +154% · 2025-04 −40% 1년 +135%
//   QQQ 2000-04 −30% 진입 뒤 추가 −75%, 3년 −66%(닷컴) · 2022-06 −30% 3년 +92%
//   → 대부분 크게 벌었지만 진짜 금융위기엔 −30%에서도 −40~−75%가 더 남음 → 한 번에 다 넣지 말고 1차 30% · 2차 30% · 3차 40%
// await window.__crisis() → { cards:[...], near:[...] }
(function () {
  const INFO = 'https://wts-info-api.tossinvest.com';
  const get = async (u) => { const r = await fetch(u, { credentials: 'include' }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  const fu = (p) => '$' + p.toFixed(2);
  const pct = (x) => (x >= 0 ? '+' : '−') + Math.abs(x * 100).toFixed(1) + '%';
  const etNow = () => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false }).formatToParts(new Date()).map(x => [x.type, x.value])); return { d: p.year + '-' + p.month + '-' + p.day, h: +p.hour % 24 }; };
  const daily = async (sym) => { const j0 = await get(`${INFO}/api/v2/stock-infos/code-or-symbol/${sym}`); const c = j0.result.code || j0.result.stockCode; let cs = [], from = '';
    for (let p = 0; p < 2; p++) { const j = await get(`${INFO}/api/v1/c-chart/us-s/${c}/day:1?count=400&useAdjustedRate=true` + (from ? `&from=${encodeURIComponent(from)}` : '')); const k = j.result.candles || []; cs = k.slice().reverse().concat(cs); from = j.result.nextDateTime; if (!from || k.length < 400) break; }
    const et = etNow(); return cs.filter(x => x.dt.slice(0, 10) < et.d || (x.dt.slice(0, 10) === et.d && et.h >= 16)); };
  const TIERS = [[-0.30, '1차', 30], [-0.40, '2차', 30], [-0.50, '3차', 40]];
  const HIST = { QQQ: '닷컴 2000-04엔 −30%에서 사도 그 뒤 −75% 더(3년 −66%), 2022-06 −30%는 3년 +92%', SOXX: '2008-07 −30% 뒤 −50% 더(3년 +19%) · 2008-10 −50%는 3년 +42% · 2020-03 1년 +135% · 2022-09 −40% 3년 +154%' };

  window.__crisis = async function () {
    let st = {}; try { st = JSON.parse(localStorage.getItem('crisisState') || '{}'); } catch (e) {}
    const cards = [], near = [];
    for (const sym of ['QQQ', 'SOXX']) {
      const cs = await daily(sym); if (cs.length < 300) continue;
      const c = cs.map(x => x.close), n = c.length, day = cs[n - 1].dt.slice(0, 10);
      const hi = Math.max(...c.slice(0, n)), dd = c[n - 1] / hi - 1; // 최근 약 3년(가져온 범위) 최고가 대비
      const s = st[sym] || {}; if (dd > -0.15) { st[sym] = {}; continue; } // −15% 안으로 회복하면 다시 장전
      // 이번에 해당하는 단계들(한 번에 여러 단계를 건너뛰면 한 카드로 합침)
      const hit = TIERS.filter(([th, lab]) => dd <= th && (!s[lab] || (Date.parse(day) - Date.parse(s[lab])) / 864e5 <= 3));
      if (hit.length) {
        hit.forEach(([th, lab]) => { if (!s[lab]) s[lab] = day; });
        const first = hit[0][1]; const t0 = s[first];
        const grp = hit.filter(([th, lab]) => s[lab] === t0); // 같은 날 닿은 단계끼리
        const lab = grp.map(x => x[1]).join('·'), w = grp.reduce((a, x) => a + x[2], 0);
        const done = TIERS.filter(([t2, l2]) => s[l2] && s[l2] < t0).reduce((a, x) => a + x[2], 0);
        const nextT = TIERS.find(([t2, l2]) => !s[l2]);
        cards.push({ g: 'S', m: 'US', n: sym, kn: sym === 'QQQ' ? '나스닥100' : '반도체', s: `⑪ 위기 매수 ${lab}`, px: fu(c[n - 1]), ch: pct(c[n - 1] / c[n - 2] - 1), ln: c.slice(-40),
          buy: fu(c[n - 1] * 1.03), tgt: '1~3년 보유', tp: '', stop: '없음(나눠 사기)', sp: '', rr: '',
          when: `지금 · 총 매수 계획의 ${w}%만`, hold: `1~3년 · ${lab} ${w}%${done ? `(앞서 ${done}% 샀으니 합쳐 ${done + w}%)` : ''}${nextT ? ` · 다음 ${nextT[1]}는 최고가 대비 −${Math.round(-nextT[0] * 100)}%에서 ${nextT[2]}%` : ' · 마지막 단계'}`,
          why: `${sym} ${day.slice(5)} 최고가(${fu(hi)}) 대비 ${pct(dd)} — 몇 년에 한 번 오는 위기 구간. 총 매수 계획을 1차 30% · 2차 30% · 3차 40%로 나눠 −30% · −40% · −50%에서 삽니다. 지금은 ${lab}: 계획의 ${w}%만. 과거: ${HIST[sym]}` });
      }
      st[sym] = s;
      if (!cards.some(x => x.n === sym) && dd <= -0.20) near.push({ g: 'B', m: 'US', n: sym, s: '⑪ 위기 매수 준비', px: fu(c[n - 1]), ch: pct(dd), why: `최고가 대비 ${pct(dd)} — −30%부터 1차(계획의 30%)` });
    }
    try { localStorage.setItem('crisisState', JSON.stringify(st)); } catch (e) {}
    return { cards, near };
  };
})();
'crisis loaded';
