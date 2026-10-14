// ⑨ 반도체 급락 반등 → SOXL · ⑩ 위험 모드 추세 이탈 → SOXS. tossinvest.com 탭에서 eval. 주문 기능 없음.
// 검증(2026-10-14, 일봉 2012~2026, 다음 날 시가 매수, 비용 0.2%, 장중 고가·저가로 익절·손절 판정, 손절 먼저):
// ⑨ SOXX 종가가 직전 20거래일 최고 종가보다 −12% 이상 → 다음 날 SOXL 매수, 익절 +40% · 손절 −20% · 최대 15거래일
//    아무 날 같은 방식으로 산 것 대비 건당 +9.2%p(2012~18, 9건 승 67%) · +1.5%p(2019~22, 21건 57%) · +7.7%p(2023~26, 17건 59%)
//    같은 기준 27개 익절·손절·보유 조합 중 14개가 세 기간 모두 아무 날보다 나음(−10%·−15%는 3·9개, 5일 급락 속도는 0개)
// ⑩ 반반도체지수 90 이상(위험 모드)인데 SOXX 종가가 20일선을 처음 밑돌면 → 다음 날 SOXS 매수, 익절 +15% · 손절 −10%(반드시) · 최대 10거래일
//    건당 +2.2%(2012~18, 12건 50%) · +3.0%(2019~22, 12건 50%) · +2.8%(2023~26, 6건 33%) vs 아무 날 SOXS −1.5 / −1.2 / −2.2%. 36개 조합 중 14개가 세 기간 모두 플러스. 표본 작아 B+
// await window.__semi9(rk) → [card, ...]
(function () {
  const INFO = 'https://wts-info-api.tossinvest.com';
  const get = async (u) => { const r = await fetch(u, { credentials: 'include' }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  const fu = (p) => '$' + p.toFixed(2);
  const pct = (x) => (x >= 0 ? '+' : '−') + Math.abs(x * 100).toFixed(1) + '%';
  const etNow = () => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false }).formatToParts(new Date()).map(x => [x.type, x.value])); return { d: p.year + '-' + p.month + '-' + p.day, h: +p.hour % 24 }; };
  const daily = async (sym, n) => { const j0 = await get(`${INFO}/api/v2/stock-infos/code-or-symbol/${sym}`); const c = j0.result.code || j0.result.stockCode; const j = await get(`${INFO}/api/v1/c-chart/us-s/${c}/day:1?count=${n}&useAdjustedRate=true`); const et = etNow(); return (j.result.candles || []).slice().reverse().filter(x => x.dt.slice(0, 10) < et.d || (x.dt.slice(0, 10) === et.d && et.h >= 16)); };

  window.__semi9 = async function (rk) {
    const [sx, sl, ss, spy] = await Promise.all([daily('SOXX', 60), daily('SOXL', 41), daily('SOXS', 41), daily('SPY', 60)]);
    const n = sx.length; if (n < 25) return [];
    const c = sx.map(x => x.close), day = sx[n - 1].dt.slice(0, 10);
    const hi20 = Math.max(...c.slice(n - 21, n - 1)), dd = c[n - 1] / hi20 - 1;
    const ma20 = (k) => c.slice(k - 19, k + 1).reduce((a, b) => a + b, 0) / 20;
    const cards = [];
    const lnL = sl.slice(-40).map(x => x.close), pL = lnL[lnL.length - 1], chL = pL / sl[sl.length - 2].close - 1;
    const lnS = ss.slice(-40).map(x => x.close), pS = lnS[lnS.length - 1], chS = pS / ss[ss.length - 2].close - 1;
    // ⑨ −12% 이하인 날(검증과 같게: 앞선 매매가 끝났으면 다시 매수 신호). 같은 카드는 3일 안엔 다시 안 울림
    // 2026-10-14: 반도체만 단체 급락한 날(SOXX −3% 이하인데 S&P는 −1.5%보다 덜 빠짐)엔 바로 사지 않고 2거래일 기다림
    //   그 날 바로 산 9건 평균 +8.5% → 2일 미룬 6건 +12.7%, 전체 성적 11.1 / 3.6 / 11.0% → 11.5 / 3.9 / 13.7%(익절 40·손절 20·15일). 모두 미루면 오히려 나빠짐
    const spm = {}; spy.forEach(x => spm[x.dt.slice(0, 10)] = x.close);
    const ddAt = (k) => k >= 21 ? c[k] / Math.max(...c.slice(k - 20, k)) - 1 : null;
    const dragAt = (k) => { if (k < 1) return false; const d0 = sx[k - 1].dt.slice(0, 10), d1 = sx[k].dt.slice(0, 10); const a = c[k] / c[k - 1] - 1, b = spm[d1] && spm[d0] ? spm[d1] / spm[d0] - 1 : 0; return a <= -0.03 && b >= -0.015; };
    const nowSig = dd <= -0.12 && !dragAt(n - 1), lateSig = ddAt(n - 3) != null && ddAt(n - 3) <= -0.12 && dragAt(n - 3);
    window.__semi9wait = dd <= -0.12 && dragAt(n - 1) ? `${day.slice(5)} 반도체만 단체 급락 → ⑨ SOXL은 2거래일 뒤 판단` : '';
    if (nowSig || lateSig) {
      const late = !nowSig && lateSig ? `반도체만 단체 급락한 ${sx[n - 3].dt.slice(5, 10)}에서 2거래일 기다린 뒤 매수. ` : '';
      const risk = rk && rk.v >= 90;
      cards.push({ g: 'A', m: 'US', n: 'SOXL', kn: '반도체 3배', s: '⑨ 반도체 급락 반등', semi: 1, px: fu(pL), ch: pct(chL), ln: lnL,
        buy: fu(pL * 1.03), tgt: fu(pL * 1.40), tp: '+40%', stop: fu(pL * 0.80), sp: '−20%(필수)', rr: '2.0',
        when: '오늘 밤 정규장 시가(또는 지금 데이마켓)', hold: '최대 15거래일 · 실제 산 값 기준 +40% 익절 / −20% 손절(자동 주문 걸기) · 15일째 종가 매도',
        why: `${late}${day.slice(5)} SOXX ${pct(dd)}(20일 최고 종가 대비) — 빠르게 빠진 반도체는 다시 오르는 일이 많았음. 2012~26 아무 날보다 건당 +9.2 / +1.5 / +7.7%p(기간별), 승률 57~67%${rk && rk.sh ? ` · 추가 하락 가능성 ${['낮음', '보통', '높음'][rk.sh.t]}` : ''}${risk ? '\n⚠ 위험 모드(반반도체지수 ' + rk.v + '): 평소의 절반만' : ''}` });
    }
    // ⑨ 단타(관찰 C+): −9% 이상이면 SOXL 5거래일 +12% / −12% — 2010~2026 165건 58% 성공 평균 +1.8%, 연 10번쯤. 2019~22에 약해 C+로 시작
    if (!(nowSig || lateSig) && dd <= -0.09) cards.push({ g: 'C+', v: 1, hd: 5, m: 'US', n: 'SOXL', kn: '반도체 3배', s: '⑨ 반도체 급락 반등 · 단타', semi: 1, px: fu(pL), ch: pct(chL), ln: lnL,
      buy: fu(pL * 1.02), tgt: fu(pL * 1.12), tp: '+12.0%', stop: fu(pL * 0.88), sp: '−12.0%', rr: '1.0',
      when: '오늘 밤 정규장 시가', hold: '최대 5거래일 · 실제 산 값 기준 +12% 익절 / −12% 손절 · 5일째 종가 매도 · 소액',
      why: `아직 효과 검증 중인 관찰 후보(C+). ${day.slice(5)} SOXX ${pct(dd)}(20일 최고 종가 대비, 큰 신호 −12%보다 얕음). 2010~2026 165건 5일 안에 58% 성공, 평균 +1.8% · 2019~22엔 아무 날과 비슷했음` });
    // ⑩ 위험 모드 + 20일선 처음 이탈
    const vr = rk ? (rk.vr != null ? rk.vr : rk.v) : null; // 검증은 급락 위험 축(v4) 기준
    if (vr != null && vr >= 90 && n >= 21 && c[n - 1] < ma20(n - 1) && c[n - 2] >= ma20(n - 2)) {
      cards.push({ g: 'B+', m: 'US', n: 'SOXS', kn: '반도체 3배 인버스', s: '⑩ 위험 모드 추세 이탈(인버스)', px: fu(pS), ch: pct(chS), ln: lnS,
        buy: fu(pS * 1.03), tgt: fu(pS * 1.15), tp: '+15%', stop: fu(pS * 0.90), sp: '−10%(반드시)', rr: '1.5',
        when: '오늘 밤 정규장 시가(또는 지금 데이마켓)', hold: '최대 10거래일 · 실제 산 값 기준 +15% 익절 / −10% 손절 자동 주문 필수 · 10일째 종가 매도 · 오래 들고 있으면 녹아내림',
        why: `반반도체지수 급락 위험 축 ${vr}(90↑)인데 ${day.slice(5)} SOXX가 20일선(${fu(ma20(n - 1))}) 아래로 처음 내려옴. 2012~26 30건 건당 +2.2 / +3.0 / +2.8%(기간별), 아무 날 SOXS는 −1.2~−2.2%. 이기는 건 절반뿐이라 손절이 생명, 소액` });
    }
    return cards;
  };
})();
'semi9 loaded';
