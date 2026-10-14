// Ⓩ 큰 이벤트 앞 관망 카드(Z등급, 어두운 카드) — 매수 카드가 아니라 '잠깐 쉬기' 경고. 알림 없음, 화면 맨 위에만.
// 검증(2026-10-14, 토스 일봉·거래량, 이벤트 직전 5거래일 vs 모든 5거래일):
//   엔비디아 실적 발표(SEC 8-K 2.02일) 2023~ 15번: SOXX 직전 5일 평균 −1.1%(평소 +1.0%), 오른 비율 33%(평소 59%), 거래량 0.93배(평소 1.06배) · QQQ −0.8%(평소 +0.6%)
//     2010~ 70번 전체로는 차이 거의 없음(QQQ +0.1% vs +0.4%) → AI 시대(2023~)에만 뚜렷
//   초대형 기술주 상장(FB·BABA·UBER·ARM·CRWV·SPCX) 6번: SOXX 직전 5일 −3.0%(오른 비율 17%), 상장 뒤 5일도 −2.6% · 거래량은 오히려 1.27배
//   → 가격이 잘 못 오르는 건 맞고, 거래량 감소는 엔비디아 실적 앞 반도체에서만 보임. 표본이 작아 '경고'로만 씀
// 이벤트 목록: 날짜가 확정되면 고칠 것(예상일은 est:1). 앤트로픽·오픈AI 상장일이 정해지면 추가
// await window.__zcard() → [card]
(function () {
  const ZEV = [
    { d: '2026-11-18', n: '엔비디아 3분기 실적 발표', est: 1 },
    // { d: 'YYYY-MM-DD', n: '앤트로픽 상장' }, { d: 'YYYY-MM-DD', n: '오픈AI 상장' }
  ];
  const etDay = () => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).map(x => [x.type, x.value])); return p.year + '-' + p.month + '-' + p.day; };
  const tradingDaysBetween = (a, b) => { let n = 0; const d = new Date(a + 'T12:00:00Z'), e = new Date(b + 'T12:00:00Z'); while (d < e) { d.setUTCDate(d.getUTCDate() + 1); const w = d.getUTCDay(); if (w !== 0 && w !== 6) n++; } return n; };
  window.__zcard = async function () {
    const today = etDay(), out = [];
    for (const e of ZEV) {
      if (e.d < today) continue;
      const left = tradingDaysBetween(today, e.d); if (left > 5) continue;
      out.push({ g: 'Z', z: 1, art: 'z', m: 'US', n: 'QQQ·SOXX', kn: '기술주 전체', s: 'Ⓩ 큰 이벤트 앞 관망',
        px: '-', ch: '', buy: '새로 사지 않기', tgt: '이벤트 뒤 다시 보기', stop: '기존 카드 손절 그대로', sp: '', rr: '',
        when: `${e.d.slice(5)} ${e.n}${e.est ? '(예상일)' : ''}까지 ${left}거래일`, hold: '이벤트 지나고 다음 날부터 평소대로',
        why: `${e.n} 앞 5거래일은 반도체·기술주가 잘 못 올랐어요(2023~ 엔비디아 실적 앞 SOXX 평균 −1.1%, 오른 비율 33%).` });
    }
    return out;
  };
})();
'zcard loaded';
