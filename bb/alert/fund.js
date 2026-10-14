// 개별주 사업성 확인(2026-10-15 석진: "아무리 신호가 맞아도 사업성이 훼손되면 끝" → ④·④억까·⑦·⑧ 모든 개별주 카드에 적용)
// 1) 실적: 최근 4분기 매출 > 그 전 4분기, 최근 분기 매출 > 1년 전 같은 분기, 최근 4분기 영업이익 흑자
// 2) 재무: 부채비율 200% 미만, 이자보상배율 3배 초과(자료 없으면 통과)
// 3) 악재 뉴스: 최근 3일 토스 종목 뉴스 제목에 회사 이름과 함께 소송·조사·회계·리콜·가이던스 하향·실적 쇼크·증자·CEO 사임·제재 등
// 검증(⑧, 2022~2026 재현 952건): 실적 통과 종목은 익절·손절 적용 매매 평균 +1.97%(승 70%, 손절 18%) vs 탈락 +1.44%(승 68%, 손절 21%)
// 뉴스 조건은 과거 뉴스가 없어 검증 못 함(위험 관리용)
(function () {
  const INFO = 'https://wts-info-api.tossinvest.com';
  const get = async (u) => { const r = await fetch(u, { credentials: 'include' }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  const post = async (u, b) => { const r = await fetch(u, { method: 'POST', credentials: 'include', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  const BAD = /소송|피소|조사 ?착수|조사를 ?받|수사|기소|압수 ?수색|법무부|증권거래위원회|\bSEC\b|리콜|회계 ?(부정|오류|문제|조작)|감사인 ?(사임|교체)|재무제표 ?재작성|상장 ?폐지|파산|챕터 ?11|부도|디폴트|유상 ?증자|주식 ?발행|전환사채|가이던스.{0,8}(하향|낮|축소|철회|부진|실망)|(전망|목표).{0,4}(하향|낮춰|철회)|실적 ?(쇼크|부진|악화|하회|미스|실망)|어닝 ?(쇼크|미스)|적자 ?(전환|확대)|(CEO|최고경영자|창업자).{0,6}(사임|사퇴|해임|퇴진|조사)|해킹|(데이터|정보) ?유출|보안 ?사고|제재|벌금|과징금|반독점|(수출|판매) ?(금지|통제|중단)|계약 ?(해지|취소|종료|상실)|(고객|주문) ?(이탈|취소|상실)|공매도 ?(리포트|보고서)|힌덴버그|시트론|머디 ?워터스|FDA.{0,6}(거절|반려|불승인)|임상.{0,4}(실패|중단)|생산 ?중단|공장 ?(화재|폐쇄)|(신용)?등급 ?(하향|강등)|투자 ?의견 ?(하향|강등)/;
  const PRE = /앞두고|앞둔|예정|프리뷰|미리 ?보기|할 ?듯|가능성|우려 ?해소|벗어|종결|기각|승소|합의|무혐의/;
  const KEY = 'fundck:';
  window.__fundCheck = async function (code) {
    const day = new Date(Date.now() - 4 * 3600e3).toISOString().slice(0, 10), ck = KEY + code + ':' + day;
    try { const o = JSON.parse(localStorage.getItem(ck) || 'null'); if (o) return o; } catch (e) {}
    const res = { ok: false, fin: null, debt: null, news: [], why: '' };
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
      const names = [String(si.companyName || si.name || '').split(/[ (]/)[0], si.symbol].filter(x => x && x.length >= 2);
      if (cc) { const j = await get(`${INFO}/api/v2/news/companies/${cc}?size=60&orderBy=latest`); const lo = Date.now() - 72 * 3600e3;
        (j.result.body || []).forEach(x => { const t = Date.parse(String(x.createdAt).slice(0, 19) + '+09:00'); const ti = x.title || ''; if (t >= lo && BAD.test(ti) && !PRE.test(ti) && names.some(nm => ti.includes(nm))) res.news.push(ti.slice(0, 60)); }); }
    } catch (e) {}
    res.ok = res.fin === true && res.debt !== false && !res.news.length;
    res.why = res.ok ? '사업성 확인: ' + res.finTxt + ' · ' + res.debtTxt + ' · 최근 3일 악재 뉴스 없음'
      : '사업성 탈락: ' + [res.fin !== true ? res.finTxt : '', res.debt === false ? res.debtTxt : '', res.news.length ? '악재 뉴스 "' + res.news[0] + '"' : ''].filter(Boolean).join(' · ');
    try { localStorage.setItem(ck, JSON.stringify(res)); for (let q = localStorage.length - 1; q >= 0; q--) { const k = localStorage.key(q); if (k && k.startsWith(KEY) && !k.endsWith(day)) localStorage.removeItem(k); } } catch (e) {}
    return res;
  };
  return 'fund loaded';
})();
