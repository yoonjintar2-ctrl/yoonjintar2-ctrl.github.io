// ⑬ 집 나간 돈이 돌아온다! → TQQQ. tossinvest.com 탭에서 eval. 주문 기능 없음. (2026-10-21)
// 신호(정규장 종가 기준, stock 저장소 c/money.json — GitHub Actions basis.yml이 하루 네 번 tools/money.js로 계산):
//   유동성(연준 총자산 − 재무부 일반계정 − 역레포)이 직전 1년 평균보다 높고,
//   방어주(코스트코·월마트·LLY·XLP·XLV 평균)가 나스닥(QQQ)보다 20거래일 +5% 이상 또는 60거래일 +3% 이상 더 올랐을 때
//   → 다음 날 TQQQ 매수, 산 값 기준 +40% 익절 / −25% 손절(장중, 손절 먼저) / 최대 40거래일, 비용 0.2%
// 검증(장부 'QQQ 절대가격' 4·5차, 일봉 2012~2026): 31건 평균 +14.6% 승 74% 최악 −29%
//   같은 익절·손절·보유로 아무 날 산 것보다 건당 +11.1 / +8.8 / +6.7%p(2012~18 / 2019~22 / 2023~26)
//   익절 15~60% × 손절 15~40% × 보유 15~60일 × 신호 기준 4가지 = 500개 조합 중 302개가 세 기간 모두 아무 날보다 나음
//   유동성이 낮을 때의 같은 방어주 쏠림은 효과 없음(QQQ 3달 뒤 +2.7~+5.1%, 아무 날 +4.3%). 실패: 2021-12·2022-01(긴축 직전), 2020-03, 2025-03, 2026-07
// await window.__money13() → [card]
(function () {
  const INFO = 'https://wts-info-api.tossinvest.com';
  const get = async (u) => { const r = await fetch(u, { credentials: 'include' }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  const fu = (p) => '$' + p.toFixed(2);
  const pct = (x) => (x >= 0 ? '+' : '−') + Math.abs(x * 100).toFixed(1) + '%';
  window.__money13 = async function () {
    const r = await fetch('https://api.github.com/repos/yoonjintar2-ctrl/stock/contents/c/money.json?ref=main', { headers: { Accept: 'application/vnd.github.raw' }, cache: 'no-store' });
    if (!r.ok) throw new Error('money.json ' + r.status);
    const M = await r.json(), L = M.last; window.__money13state = L;
    if (!L || !L.sig) return [];
    // 오래된 자료(5일 넘게 갱신 안 됨)면 카드 안 띄움
    if ((Date.now() - Date.parse(L.d + 'T21:00:00Z')) / 864e5 > 5) return [];
    const j0 = await get(`${INFO}/api/v2/stock-infos/code-or-symbol/TQQQ`);
    const j = await get(`${INFO}/api/v1/c-chart/us-s/${j0.result.code}/day:1?count=41&useAdjustedRate=true`);
    const k = (j.result.candles || []).slice().reverse(), ln = k.slice(-40).map(x => x.close), p = ln[ln.length - 1], ch = p / k[k.length - 2].close - 1;
    const days = M.first ? M.h.filter(x => x.d >= M.first).length : 1;
    const thin = L.lp < 0.02;
    return [{ g: 'A', m: 'US', n: 'TQQQ', kn: '나스닥100 3배', s: '⑬ 집 나간 돈이 돌아온다!', px: fu(p), ch: pct(ch), ln,
      buy: fu(p * 1.03), tgt: fu(p * 1.40), tp: '+40%', stop: fu(p * 0.75), sp: '−25%(필수)', rr: '1.6',
      when: '오늘 밤 정규장 시가(또는 지금 데이마켓)', hold: '최대 40거래일 · 실제 산 값 기준 +40% 익절 / −25% 손절(자동 주문 걸기) · 40일째 종가 매도',
      why: `시중에 돈(유동성)은 1년 평균보다 ${pct(L.lp)} 많은데, 방어주(코스트코·월마트·LLY·필수소비재·헬스케어)가 나스닥보다 20일 ${pct(L.r20)} · 60일 ${pct(L.r60)} 더 올랐어요(${L.d.slice(5)} 기준${days > 1 ? ', 신호 ' + days + '일째' : ''}). 돈이 넘칠 때 잠깐 방어주로 '가출'한 돈은 대개 나스닥으로 돌아왔어요. 2012~26 31번 평균 +14.6%, 이긴 비율 74% · 아무 날 산 것보다 +11.1 / +8.8 / +6.7%p(기간별)${thin ? '\n⚠ 유동성이 평균을 겨우 넘는 수준이에요. 유동성이 꺾이던 2021-12·2022-01엔 손절(−25%)로 끝났어요' : ''}` }];
  };
})();
'money13 loaded';
