// ⓒ 상시 카드(C 등급) — 규칙 신호가 아니라 '언제 사도 되는' 교과서적인 장기 전략. 수익은 낮거나 느리지만 등락을 견디는 용도.
// 알림·주간 성적표에는 넣지 않고 화면 맨 아래 '상시 카드'에만 보여 줌. tossinvest.com 탭에서 eval. 주문 기능 없음.
// 검증·근거(2026-10-14, 토스 일봉, 매달 첫 거래일에 같은 금액, 2026-10-13 평가 · 낙폭 = 넣은 돈 대비 평가액의 최대 하락):
//   QQQ 매달 적립 2007~ 7.5배(낙폭 −49%) · 2011~ 5.3배(−39%) · 2021~ 1.8배(−34%) / SPY 2011~ 3.1배(−34%)
//   QLD 매달 적립 2007~ 36.5배(−77%) · 2011~ 18.7배(−67%) · 2021~ 2.6배(−59%) — 크게 벌지만 반 토막 이상을 견뎌야 함
//   급락을 기다렸다 사기는 16개 비교 모두 '매달 바로'보다 못했음(장부 'QQQ·SOXX 장기 우상향 전제의 단순 전략')
// await window.__evergreen() → [card, ...]
(function () {
  const INFO = 'https://wts-info-api.tossinvest.com';
  const get = async (u) => { const r = await fetch(u, { credentials: 'include' }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  const fu = (p) => '$' + p.toFixed(2);
  const pct = (x) => (x >= 0 ? '+' : '−') + Math.abs(x * 100).toFixed(1) + '%';
  const daily = async (sym, n) => { const j0 = await get(`${INFO}/api/v2/stock-infos/code-or-symbol/${sym}`); const c = j0.result.code || j0.result.stockCode; const j = await get(`${INFO}/api/v1/c-chart/us-s/${c}/day:1?count=${n}&useAdjustedRate=true`); return (j.result.candles || []).slice().reverse(); };
  const lastOf = (P, id) => { const a = P && P[id]; return a && a.length ? a[a.length - 1] : null; };

  window.__evergreen = async function () {
    let P = null; try { const o = JSON.parse(localStorage.getItem('fredpack') || 'null'); P = o && o.P; } catch (e) {}
    const bill = lastOf(P, 'DTB3') || lastOf(P, 'DGS2'), y10 = lastOf(P, 'DGS10'), bei = lastOf(P, 'T10YIE');
    const px = {}; for (const s of ['SGOV', 'QQQ', 'QLD', 'IEF']) { try { px[s] = await daily(s, 260); } catch (e) {} }
    const cards = [];
    const base = (s, kn, extra) => { const k = px[s]; if (!k || k.length < 2) return null; const C = k.map(x => x.close), n = C.length;
      return Object.assign({ g: 'C', m: 'US', n: s, kn, px: fu(C[n - 1]), ch: pct(C[n - 1] / C[n - 2] - 1), ln: C.slice(-40), base: 1 }, extra(C, n)); };
    // ⓒ1 현금 대기 = 초단기 국채(SGOV): 단기 금리가 3% 이상이면 놀리는 돈은 여기
    const b = bill ? bill[1] : null;
    if (b == null || b >= 3) { const c = base('SGOV', '0~3개월 미국 국채', (C, n) => ({ s: 'ⓒ 현금 대기 · 초단기 국채',
      buy: '언제든', tgt: b != null ? '연 ' + b.toFixed(1) + '% 안팎' : '단기 금리만큼', tp: '', stop: '없음', sp: '', rr: '',
      when: '언제든 · 다른 카드를 기다리는 돈, 곧 쓸 돈',
      hold: '필요할 때까지(하루만 넣어도 이자) · 매달 분배금',
      why: `미국 ${lastOf(P, 'DTB3') ? '3개월' : '2년'} 국채 금리 ${b != null ? b.toFixed(2) + '%' : '-'}(${bill ? bill[0].slice(5) : ''}) — 가격이 거의 안 움직이고 이자만 쌓이는 현금 대용. 단기 금리가 3% 아래로 내려가면 이 카드는 사라져요. 수익은 낮지만 급락장에서 쓸 '총알'을 지키는 자리.` })); if (c) cards.push(c); }
    // ⓒ2 QQQ 매달 정액 적립
    { const c = base('QQQ', '나스닥100', (C, n) => { const ma = C.slice(n - 200).reduce((a, x) => a + x, 0) / 200;
      return { s: 'ⓒ 매달 적립 · 나스닥100', buy: '매달 같은 날 같은 금액', tgt: '10년 이상 보유', tp: '', stop: '없음(팔지 않기)', sp: '', rr: '',
        when: '매달 정해진 날(월급날 등) · 시세 보지 않기', hold: '10년 이상 · 급락에도 멈추지 않기 · 팔지 않기',
        why: `매달 같은 금액: 2007년부터 넣은 돈의 7.5배, 2011년부터 5.3배(넣은 돈 대비 최대 −39~−49%를 견뎌야 했음). 급락을 기다렸다 사는 것보다 16번 모두 '매달 바로'가 나았어요. 지금 200일선 대비 ${pct(C[n - 1] / ma - 1)}.` }; }); if (c) cards.push(c); }
    // ⓒ3 QLD(2배) 적립 — QQQ가 200일선 위일 때만 새로 넣기
    { const q = px.QQQ; const qc = q && q.map(x => x.close), qn = qc ? qc.length : 0; const qma = qn >= 200 ? qc.slice(qn - 200).reduce((a, x) => a + x, 0) / 200 : null; const up = qma && qc[qn - 1] > qma;
      const c = base('QLD', '나스닥100 2배', (C, n) => ({ s: 'ⓒ 매달 적립 · 나스닥 2배' + (up ? '' : ' (지금은 쉬기)'), buy: up ? '매달 같은 날 같은 금액' : '이번 달은 쉬기', tgt: '10년 이상 보유', tp: '', stop: '없음(팔지 않기)', sp: '', rr: '',
        when: up ? '매달 정해진 날 · QQQ가 200일선 위일 때만 새로 넣기' : 'QQQ가 200일선 아래 → 새로 넣지 말고 모은 돈은 SGOV에 대기',
        hold: '10년 이상 · 전체 적립금의 일부만(예: QQQ 적립의 1/3 이하)',
        why: `2배 매달 적립: 2007년부터 36.5배, 2011년부터 18.7배 — 대신 넣은 돈 대비 최대 −67~−77%까지 빠진 적이 있어요(2008·2022). 반 토막을 몇 년 견딜 수 있는 돈만. QQQ 200일선 대비 ${qma ? pct(qc[qn - 1] / qma - 1) : '-'}.` })); if (c) cards.push(c); }
    // ⓒ4 중기 국채(IEF): 10년 금리 4.5% 이상이면 분할 매수해 이자 고정
    const y = y10 ? y10[1] : null;
    if (y != null && y >= 4.5) { const c = base('IEF', '7~10년 미국 국채', (C, n) => ({ s: 'ⓒ 높은 금리 고정 · 중기 국채',
      buy: '3~6번에 나눠서', tgt: '연 ' + y.toFixed(1) + '% 안팎 + 금리 내리면 시세 이익', tp: '', stop: '없음(만기 성격)', sp: '', rr: '',
      when: '10년 금리 4.5% 이상인 동안 · 몇 주~몇 달에 나눠서',
      hold: '5년 이상 · 주식이 크게 빠질 때 버팀목(그때 팔아 주식 사기)',
      why: `10년 금리 ${y.toFixed(2)}%(${y10[0].slice(5)}), 물가 예상 ${bei ? bei[1].toFixed(2) : '-'}% → 실질 약 ${bei ? (y - bei[1]).toFixed(1) : '-'}%. 금리가 더 오르면 시세는 더 빠지지만(1%p 오르면 약 −7%) 이자로 메워지고, 경기가 꺾여 금리가 내리면 시세 이익. 10년 금리가 4.5% 아래로 내려가면 이 카드는 사라져요.` })); if (c) cards.push(c); }
    const ART = { SGOV: 'c1', QQQ: 'c2', QLD: 'c3', IEF: 'c4' }; cards.forEach(c => { c.art = ART[c.n]; }); // 상시 카드마다 다른 그림
    return cards;
  };
})();
'evergreen loaded';
