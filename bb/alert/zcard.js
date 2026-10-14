// Ⓩ 큰 이벤트 앞 관망 카드(Z등급, 어두운 카드) — 매수 카드가 아니라 '잠깐 쉬기' 경고. 알림 없음, 화면 맨 위에만.
// 검증(2026-10-14, 토스 일봉, 무작위 4000번 뽑기로 우연 확률 p):
//   AI 시대(2023~) 빅테크 실적 주간(MSFT·GOOGL·META·AMZN·AAPL 중 첫 발표일) + 엔비디아 실적 30번:
//   SOXX가 이벤트 15~7거래일 전엔 평소보다 잘 오르다가(+4.1% vs +1.7%) 6거래일 전부터 꺾임 → 이벤트 전 6일 −1.13% vs 평소 +1.17%(p 0.011), 오른 비율 37%
//   엔비디아만 15번: −1.75% vs +1.17%(p 0.013). 2016~22엔 반대로 평소보다 잘 오름 → AI 시대에만 나타나는 흐름
//   대형 상장 19개는 일관된 효과 없음(옛 사례만 약세) → 목록에서 뺌. 앤트로픽·오픈AI 상장은 날짜가 정해지면 관찰용으로 추가
// 알려 주는 시점: 꺾이기 시작하는 6거래일 전보다 하루 앞선 7거래일 전부터 이벤트 날까지
// 이벤트 날짜는 매주 월요일 예약 작업이 확인해서 고침(est:1 = 예상일)
// await window.__zcard() → [card]
(function () {
  const ZEV = [
    { d: '2026-10-28', n: '빅테크 실적 주간(마이크로소프트·알파벳)' },
    { d: '2026-11-18', n: '엔비디아 3분기 실적 발표', est: 1 },
  ];
  const etDay = () => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).map(x => [x.type, x.value])); return p.year + '-' + p.month + '-' + p.day; };
  const tradingDaysBetween = (a, b) => { let n = 0; const d = new Date(a + 'T12:00:00Z'), e = new Date(b + 'T12:00:00Z'); while (d < e) { d.setUTCDate(d.getUTCDate() + 1); const w = d.getUTCDay(); if (w !== 0 && w !== 6) n++; } return n; };
  window.__zcard = async function () {
    const today = etDay(), out = [];
    for (const e of ZEV) {
      if (e.d < today) continue;
      const left = tradingDaysBetween(today, e.d); if (left > 7) continue;
      out.push({ g: 'Z', z: 1, art: 'z', m: 'US', n: 'QQQ·SOXX', kn: '기술주 전체', s: 'Ⓩ 큰 이벤트 앞 관망',
        px: '-', ch: '', buy: '새로 사지 않기', tgt: '이벤트 뒤 다시 보기', stop: '기존 카드 손절 그대로', sp: '', rr: '',
        when: `${e.d.slice(5)} ${e.n}${e.est ? '(예상일)' : ''}까지 ${left}거래일`, hold: '이벤트 지나고 다음 날부터 평소대로',
        why: `${e.n} 앞 6거래일은 반도체가 잘 못 올랐어요(2023~ 빅테크·엔비디아 실적 30번, SOXX 평균 −1.1% vs 평소 +1.2%, 오른 비율 37%).` });
    }
    return out;
  };
})();
'zcard loaded';
