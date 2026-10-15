// 개별주 사업성 확인(2026-10-15 석진: "아무리 신호가 맞아도 사업성이 훼손되면 끝" → ④·④억까·⑦·⑧ 모든 개별주 카드에 적용)
// 1) 실적: 최근 4분기 매출 > 그 전 4분기, 최근 분기 매출 > 1년 전 같은 분기, 최근 4분기 영업이익 흑자
// 2) 재무: 부채비율 200% 미만, 이자보상배율 3배 초과(자료 없으면 통과)
// 3) 악재 뉴스(제외) · 회사 이벤트(분사·인수·차입 등, 제외) · 증권사 하향(등급 한 단계 낮춤): 최근 3일 토스 종목 뉴스 제목에 회사 이름과 함께 소송·조사·회계·리콜·가이던스 하향·실적 쇼크·증자·CEO 사임·제재 등
// 검증(⑧, 2022~2026 재현 952건): 실적 통과 종목은 익절·손절 적용 매매 평균 +1.97%(승 70%, 손절 18%) vs 탈락 +1.44%(승 68%, 손절 21%)
// 뉴스 조건은 과거 뉴스가 없어 검증 못 함(위험 관리용)
(function () {
  const INFO = 'https://wts-info-api.tossinvest.com';
  const get = async (u) => { const r = await fetch(u, { credentials: 'include' }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  const post = async (u, b) => { const r = await fetch(u, { method: 'POST', credentials: 'include', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  const BAD = /소송|피소|조사 ?착수|조사를 ?받|수사|기소|압수 ?수색|법무부|증권거래위원회|\bSEC\b|리콜|회계 ?(부정|오류|문제|조작)|감사인 ?(사임|교체)|재무제표 ?재작성|상장 ?폐지|파산|챕터 ?11|부도|디폴트|유상 ?증자|주식 ?발행|전환사채|가이던스.{0,8}(하향|낮|축소|철회|부진|실망)|전망.{0,4}(하향|낮춰|철회)|실적 ?(쇼크|부진|악화|하회|미스|실망)|어닝 ?(쇼크|미스)|적자 ?(전환|확대)|(CEO|최고경영자|창업자).{0,6}(사임|사퇴|해임|퇴진|조사)|해킹|(데이터|정보) ?유출|보안 ?사고|제재|벌금|과징금|반독점|(수출|판매) ?(금지|통제|중단)|계약 ?(해지|취소|종료|상실)|(고객|주문) ?(이탈|취소|상실)|공매도 ?(리포트|보고서)|힌덴버그|시트론|머디 ?워터스|FDA.{0,6}(거절|반려|불승인)|임상.{0,4}(실패|중단)|생산 ?중단|공장 ?(화재|폐쇄)|신용 ?등급 ?(하향|강등)/;
  const PRE = /앞두고|앞둔|예정|프리뷰|미리 ?보기|할 ?듯|가능성|우려 ?해소|벗어|종결|기각|승소|합의|무혐의/;
  // 회사 이벤트(분사·인수·합병·대규모 차입 등): 좋고 나쁨과 상관없이 '회사 자체 이유'로 움직인 것이라 시장 급락 규칙 전제와 안 맞음 → 제외 (2026-10-15 FLEX 분사·인수·차입 놓침)
  const EVT = /분사|인적 ?분할|물적 ?분할|스핀 ?오프|부문 ?분리|인수 ?(완료|합의|계약|추진|발표)|[을를] 인수|합병|브리지 ?론|차입|회사채|채권 ?발행|전환 ?사채|자금 ?조달|워런트|신주 ?인수권|행동주의|경영권/;
  // 애매한 것(증권사 투자의견·목표가 하향): 빼지 않고 등급 한 단계 낮춤 (2026-10-15 DELL 바클레이즈 하향)
  const SOFT = /투자 ?의견.{0,8}(하향|강등|중립|매도)|목표 ?(주?가|株價).{0,10}(하향|낮춰|낮춘|내려|인하)|(비중 ?축소|매도) ?의견|등급 ?(하향|강등)/;
  // 회사 이름이 제목에 있는지: 한두 글자 이름(델 등)은 앞뒤가 한글이 아닐 때만(모델·마이클델 오인 방지), 한 글자 티커는 (P) 꼴만
  const nameHit = (si) => { const full = String(si.companyName || si.name || '').trim(), tk = full.split(/[ (]/).filter(Boolean), sym = String(si.symbol || '');
    const long = [full, full.replace(/\s+/g, '')].filter(x => x.length >= 3).concat(tk.length > 1 ? [tk[0] + tk[1].charAt(0)] : []);
    const res = [];
    if (tk[0]) res.push(tk[0].length >= 3 ? null : new RegExp('(^|[^가-힣A-Za-z])(?<!(마이클|창업자|회장|CEO|최고경영자) ?)' + tk[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=$|[^가-힣]|[은는이가을를의도와과에만])'));
    if (sym) res.push(sym.length >= 2 ? new RegExp('\\b' + sym + '\\b') : new RegExp('\\(' + sym + '\\)'));
    return (ti) => long.some(n => ti.includes(n)) || (tk[0] && tk[0].length >= 3 && ti.includes(tk[0])) || res.some(r => r && r.test(ti)); };
  window.__fundNameHit = nameHit;
  window.__gradeDown = (g) => ({ SSS: 'SS', SS: 'S', S: 'A', 'A+': 'A', A: 'B+', 'A-': 'B+', 'B+': 'B', B: 'C+', 'C+': 'C', C: 'C-' })[g] || g;
  const KEY = 'fundck3:';
  window.__fundCheck = async function (code) {
    const day = new Date(Date.now() - 4 * 3600e3).toISOString().slice(0, 10), ck = KEY + code + ':' + day;
    try { const o = JSON.parse(localStorage.getItem(ck) || 'null'); if (o) return o; } catch (e) {}
    const res = { ok: false, fin: null, debt: null, news: [], evt: [], soft: [], why: '' };
    // 1) 실적
    try {
      const now = Date.now();
      const rv = (await post(`${INFO}/api/v2/stock-infos/revenue-and-net-profit/${code}`, { range: 5, period: 'Q' })).result;
      const oi = (await post(`${INFO}/api/v2/stock-infos/operating-income/${code}`, { range: 5, period: 'Q' })).result;
      const om = {}; (oi && oi.graph || []).forEach(g => om[g.period] = g.operatingIncome);
      const av = (rv && rv.graph || []).map(g => ({ p: g.period, rev: g.revenue, oi: om[g.period] })).filter(q => { const [y, m] = q.p.split('-').map(Number); return new Date(y, m, 0).getTime() + 20 * 864e5 <= now && q.rev != null; });
      if (av.length >= 8) { const L = av.length, t4 = av.slice(L - 4), p4 = av.slice(L - 8, L - 4), s = (a, k) => a.reduce((x, q) => x + (q[k] || 0), 0);
        const up = s(t4, 'rev') > s(p4, 'rev'), yoy = av[L - 1].rev > av[L - 5].rev, prof = s(t4, 'oi') > 0;
        res.fin = up && yoy && prof; res.finTxt = (up ? '매출↑' : '매출↓') + '·' + (prof ? '흑자' : '적자') + (yoy ? '' : '·최근 분기 역성장'); }
      else res.finTxt = '실적 자료 부족';
    } catch (e) { res.finTxt = '실적 확인 실패'; }
    // 2) 재무
    try { const stb = (await post(`${INFO}/api/v2/stock-infos/stability/${code}`, {})).result;
      const lr = stb && stb.liabilityRatio, ic = stb && stb.interestCoverageRatio;
      const hiD = lr != null && lr >= 200, loI = ic != null && ic <= 3; res.debt = !hiD && !loI;
      res.debtTxt = hiD ? '부채비율 ' + Math.round(lr) + '% 과다' : loI ? '이자보상배율 ' + ic.toFixed(1) + '배 부족' : lr != null ? '부채비율 ' + Math.round(lr) + '%' : '부채 자료 없음';
    } catch (e) { res.debt = true; res.debtTxt = '부채 자료 없음'; }
    // 3) 악재 뉴스(최근 3일)
    try { const si = (await get(`${INFO}/api/v2/stock-infos/${code}`)).result; const cc = si.companyCode;
      const hit = nameHit(si);
      if (cc) { const j = await get(`${INFO}/api/v2/news/companies/${cc}?size=60&orderBy=latest`); const lo = Date.now() - 72 * 3600e3;
        (j.result.body || []).forEach(x => { const t = Date.parse(String(x.createdAt).slice(0, 19) + '+09:00'); const ti = x.title || ''; if (t < lo || !hit(ti)) return;
          if (BAD.test(ti) && !PRE.test(ti)) res.news.push(ti.slice(0, 60));
          else if (EVT.test(ti)) res.evt.push(ti.slice(0, 60));
          else if (SOFT.test(ti)) res.soft.push(ti.slice(0, 60)); }); }
    } catch (e) {}
    res.ok = res.fin === true && res.debt !== false && !res.news.length && !res.evt.length;
    res.why = res.ok ? '사업성 확인: ' + res.finTxt + ' · ' + res.debtTxt + ' · 최근 3일 악재·회사 이벤트 뉴스 없음' + (res.soft.length ? '\n증권사 하향 뉴스가 있어 등급 한 단계 낮춤: "' + res.soft[0] + '"' : '')
      : '사업성 탈락: ' + [res.fin !== true ? res.finTxt : '', res.debt === false ? res.debtTxt : '', res.news.length ? '악재 뉴스 "' + res.news[0] + '"' : '', res.evt.length ? '회사 이벤트 "' + res.evt[0] + '"' : ''].filter(Boolean).join(' · ');
    try { localStorage.setItem(ck, JSON.stringify(res)); for (let q = localStorage.length - 1; q >= 0; q--) { const k = localStorage.key(q); if (k && ((k.startsWith(KEY) && !k.endsWith(day)) || k.startsWith('fundck:') || k.startsWith('fundck2:'))) localStorage.removeItem(k); } } catch (e) {}
    return res;
  };
  return 'fund loaded';
})();
