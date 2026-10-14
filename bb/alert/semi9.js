// ⑨ 반도체 급락 반등 → SOXL · ⑩ 위험 모드 추세 이탈 → SOXS. tossinvest.com 탭에서 eval. 주문 기능 없음.
// 검증(2026-10-14, 일봉 2012~2026, 다음 날 시가 매수, 비용 0.2%, 장중 고가·저가로 익절·손절 판정, 손절 먼저):
// ⑨ SOXX 종가가 직전 20거래일 최고 종가보다 −12% 이상 → 다음 날 SOXL 매수, 익절 +40% · 손절 −20% · 최대 15거래일
//    아무 날 같은 방식으로 산 것 대비 건당 +9.2%p(2012~18, 9건 승 67%) · +1.5%p(2019~22, 21건 57%) · +7.7%p(2023~26, 17건 59%)
//    같은 기준 27개 익절·손절·보유 조합 중 14개가 세 기간 모두 아무 날보다 나음(−10%·−15%는 3·9개, 5일 급락 속도는 0개)
// ⑩ 반반도체지수 90 이상(위험 모드)인데 SOXX 종가가 20일선을 처음 밑돌면 → 다음 날 SOXS 매수, 익절 +15% · 손절 −10%(반드시) · 최대 10거래일
//    건당 +2.2%(2012~18, 12건 50%) · +3.0%(2019~22, 12건 50%) · +2.8%(2023~26, 6건 33%) vs 아무 날 SOXS −1.5 / −1.2 / −2.2%. 36개 조합 중 14개가 세 기간 모두 플러스. 표본 작아 B+
// ⑫ 조용한 눌림 · Ⓩ 반도체 과열 뒤 꺾임(매수 금지) — 아래 본문 주석 참고. window.__semi9z(매수 금지 카드), window.__semi9froth(과열 창)
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
    // 2026-10-15 재점검: ⑨ 단타는 조합 48개 중 40%만 플러스(효과 없음) → 끔(NINE_S = true로 다시 켤 수 있음)
    const NINE_S = false;
    if (NINE_S && !(nowSig || lateSig) && dd <= -0.09) cards.push({ g: 'C+', v: 1, hd: 5, m: 'US', n: 'SOXL', kn: '반도체 3배', s: '⑨ 반도체 급락 반등 · 단타', semi: 1, px: fu(pL), ch: pct(chL), ln: lnL,
      buy: fu(pL * 1.02), tgt: fu(pL * 1.12), tp: '+12.0%', stop: fu(pL * 0.88), sp: '−12.0%', rr: '1.0',
      when: '오늘 밤 정규장 시가', hold: '최대 5거래일 · 실제 산 값 기준 +12% 익절 / −12% 손절 · 5일째 종가 매도 · 소액',
      why: `아직 효과 검증 중인 관찰 후보(C+). ${day.slice(5)} SOXX ${pct(dd)}(20일 최고 종가 대비, 큰 신호 −12%보다 얕음). 2010~2026 165건 5일 안에 58% 성공, 평균 +1.8% · 2019~22엔 아무 날과 비슷했음` });
    // ── 반도체 과열 뒤 꺾임(매수 금지 C-) · ⑫ 조용한 눌림(SOXL 매수 B+) — 2026-10-14 검증(SOXX·SOXL 일봉 2010~2026)
    //   과열 = SOXL 거래대금 20일 평균이 그 전 250일 평균의 1.5배 이상(개인 레버리지 쏠림). 상승 = SOXX 60일 +12% 이상
    //   꺾임 = 20일선 첫 이탈(직전 30일 중 27일 이상 20일선 위) 또는 7일 넘게 10일 고점 갱신 없이 60일 고점 −3~8%
    //   두 꺾임 기준 합쳐 20일 안 첫 신호만: 13번, 20일 뒤 SOXX −0.6%(46%) · 기준별로는 과열+꺾임 → 20일 뒤 SOXX −4.5%(7건, 오른 비율 14%) / −1.8%(13건, 38%) vs 과열 없는 꺾임 +3.3%(24건 83%) / +3.9%(37건 73%), 8가지 기준 모두 같은 방향
    //   ⑨ 중 직전 과열이 있던 9건 −3.1%(승 44%) vs 없던 31건 +5.9% → 과열 뒤 20거래일 동안 ⑥·⑨ 매수 카드는 B로 낮춤(scanner.js)
    //   ⑫ 과열 없는 상승 뒤 20일선 첫 이탈 → 다음 날 SOXL, +40% 익절 / −20% 손절 / 최대 20거래일: 16건 평균 +8.3% 승 75%(아무 날 +3.2% 53%), 2010~18 +1.8 · 2019~22 +11.7 · 2023~ +8.7%
    window.__semi9z = []; window.__semi9froth = null;
    try {
      const [X, Lv] = await Promise.all([daily('SOXX', 140), daily('SOXL', 330)]);
      const C = X.map(x => x.close), N = C.length, am = {}; Lv.forEach(x => am[x.dt.slice(0, 10)] = x.amount || 0);
      const A = X.map(x => am[x.dt.slice(0, 10)]); const LA = Lv.map(x => x.amount || 0), LD = Lv.map(x => x.dt.slice(0, 10));
      const fr = (t) => { const d = X[t].dt.slice(0, 10); const j = LD.indexOf(d); if (j < 270) return null; let a = 0, b = 0; for (let k = j - 19; k <= j; k++) a += LA[k]; for (let k = j - 269; k <= j - 20; k++) b += LA[k]; return (a / 20) / (b / 250); };
      const MA = (k) => C.slice(k - 19, k + 1).reduce((x, y) => x + y, 0) / 20;
      const run = (t) => C[t] / C[t - 60] - 1;
      const brk = (t) => { if (!(C[t] < MA(t) && C[t - 1] >= MA(t - 1))) return false; let up = 0; for (let k = t - 30; k < t; k++) if (C[k] > MA(k)) up++; return up >= 27; };
      const stall = (t) => { let hi = 0; for (let k = t - 60; k <= t; k++) hi = Math.max(hi, C[k]); let h10 = 0, hI = 0; for (let k = t - 10; k <= t; k++) if (C[k] > h10) { h10 = C[k]; hI = k; } const dd = 1 - C[t] / hi; return t - hI >= 7 && dd >= 0.03 && dd <= 0.08; };
      let trig = -1, trigFr = null;
      for (let t = Math.max(80, N - 21); t < N; t++) { const f = fr(t); if (f != null && f >= 1.5 && run(t) >= 0.12 && (brk(t) || stall(t))) { trig = t; trigFr = f; } }
      if (trig >= 0) { const left = 20 - (N - 1 - trig); window.__semi9froth = { d: X[trig].dt.slice(0, 10), left, fr: trigFr };
        window.__semi9z.push({ g: 'C-', z: 1, v: 1, art: 'z2', m: 'US', n: 'SOXL·SOXX', kn: '반도체 전체', s: 'Ⓩ 반도체 과열 뒤 꺾임', px: '-', ch: '', buy: '반도체 새로 사지 않기', tgt: '꺾임 뒤 20거래일', stop: '기존 카드 손절 그대로', sp: '', rr: '',
          when: `${X[trig].dt.slice(5, 10)} 꺾임 · ${left}거래일 남음`, hold: '이 기간 ⑥·⑨ 반도체 매수 카드는 B(참고)로 낮춰 보여 줘요',
          why: `반도체가 60일 새 크게 오른 뒤 꺾였는데, 개인 레버리지(SOXL) 거래대금이 1년 평균의 ${trigFr.toFixed(1)}배로 몰려 있었어요. 이런 '과열 뒤 꺾임'(2010~2026 13번) 다음 20일 SOXX는 평균 −0.6%(오른 비율 46%)로, 과열 없는 꺾임(+3~4%, 73~83%)보다 확실히 약했고, 그 사이 SOXL 급락 매수(⑨)는 평균 −3.1%였어요.` }); }
      // ⑫ 조용한 눌림: 오늘 20일선 첫 이탈 + 과열 아님
      const f0 = fr(N - 1);
      if (f0 != null && f0 < 1.5 && run(N - 1) >= 0.12 && brk(N - 1)) cards.push({ g: 'C+', m: 'US', n: 'SOXL', kn: '반도체 3배', s: '⑫ 조용한 눌림', /* 2026-10-15: 2025~26 2번 모두 손절 → C+ 관찰 */ semi: 1, px: fu(pL), ch: pct(chL), ln: lnL,
        buy: fu(pL * 1.03), tgt: fu(pL * 1.40), tp: '+40%', stop: fu(pL * 0.80), sp: '−20%(필수)', rr: '2.0',
        when: '오늘 밤 정규장 시가(또는 지금 데이마켓)', hold: '최대 20거래일 · 실제 산 값 기준 +40% 익절 / −20% 손절(자동 주문 걸기) · 20일째 종가 매도',
        why: `${day.slice(5)} SOXX가 60일 ${pct(run(N - 1))} 오른 뒤 20일선 아래로 처음 내려왔는데, SOXL 거래대금은 1년 평균의 ${f0.toFixed(1)}배로 조용해요(과열 아님). 아직 효과 검증 중인 관찰 후보(C+) · 소액만. 2010~2026 16건 평균 +8.3% 승 75%(아무 날 +3.2%)지만 2025~26년 2번은 모두 손절이었어요` });
    } catch (eF) { window.__semi9frothErr = String(eF); }
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
