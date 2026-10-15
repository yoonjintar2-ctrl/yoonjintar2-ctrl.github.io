// ⑧ 시장 급락일에 '평소 움직임(베타)보다 훨씬 더 빠진' 종목 — 급락 직후(데이마켓) 매수, 5~20일 보유. tossinvest.com 탭에서 eval. 주문 기능 없음.
// 검증(2026-10-14, 일봉 2015~2026, 미국 시총 상위 500, 실적 발표 전후 제외): 나스닥 −1.5% 하락일, 직전 60일 베타로 본 '빠졌어야 할 만큼'보다 −5%p 이상 더 빠진 종목
//   반도체주(SOXX 기준) 112건 5일 +3.6%p · 20일 +5.9%p 승 63% / 그 외(S&P 기준) 1,755건 20일 +2.8%p 승 55% (베타 조정 초과수익, 두 기간 모두 유지)
//   나스닥·S&P·반도체 셋 다 빠진 날 반도체 +6.8%p 승 67%. 돌아서는 걸 기다렸다 사면 +2~3%p로 절반 → 급락 직후 매수가 나음
// 2026-10-14 추가: 실적 발표 때문에 빠진 날은 제외(갭 필터를 통과한 것 중 실적일 급락은 20일 −0.6 / −1.7 / −4.6%p, 승 33~50%)
//   시총 상위 200 재현 2014~26: 갭 필터만 20일 +2.8 / +4.2 / +2.9%p(승 50 / 60 / 60%) → 실적일까지 빼면 +3.5 / +4.5 / +3.6%p(승 49 / 62 / 63%)
//   실시간에선 토스 종목 뉴스 제목(최근 48시간)에 실적 결과 표현이 있으면 실적 급락으로 봄
// await window.__dip8() → [card, ...]
(function () {
  const INFO = 'https://wts-info-api.tossinvest.com', CERT = 'https://wts-cert-api.tossinvest.com';
  const get = async (u) => { const r = await fetch(u, { credentials: 'include' }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  const post = async (u, b) => { const r = await fetch(u, { method: 'POST', credentials: 'include', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) }); if (!r.ok) throw new Error(r.status); return r.json(); };
  const pool = async (items, n, fn) => { const out = new Array(items.length); let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; try { out[k] = await fn(items[k]); } catch (e) { out[k] = null; } } })); return out; };
  const fu = (p) => '$' + p.toFixed(2);
  const pct = (x) => (x >= 0 ? '+' : '−') + Math.abs(x * 100).toFixed(1) + '%';
  const SEMI = new Set(['NVDA', 'AVGO', 'AMD', 'MU', 'TSM', 'QCOM', 'AMAT', 'LRCX', 'KLAC', 'ADI', 'MRVL', 'INTC', 'TXN', 'ARM', 'ASML', 'SNDK', 'WDC', 'STX', 'MPWR', 'NXPI', 'ON', 'MCHP', 'TER', 'COHR', 'CRDO', 'ALAB', 'SKHY', 'UMC', 'STM', 'GFS', 'SMCI', 'LITE', 'CIEN', 'ENTG', 'QRVO', 'SWKS', 'MTSI', 'RMBS', 'SITM', 'AMKR', 'ONTO', 'NVMI', 'CAMT', 'FORM', 'ACLS', 'WOLF', 'LSCC', 'SLAB', 'POWI', 'DIOD', 'SYNA']);
  const etNow = () => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false }).formatToParts(new Date()).map(x => [x.type, x.value])); return { d: p.year + '-' + p.month + '-' + p.day, h: +p.hour % 24 }; };
  const codeOf = async (sym) => { const j = await get(`${INFO}/api/v2/stock-infos/code-or-symbol/${sym}`); return j.result.code || j.result.stockCode; };
  const daily = async (code, n) => { const j = await get(`${INFO}/api/v1/c-chart/us-s/${code}/day:1?count=${n}&useAdjustedRate=true`); const et = etNow(); return (j.result.candles || []).slice().reverse().filter(x => x.dt.slice(0, 10) < et.d || (x.dt.slice(0, 10) === et.d && et.h >= 16)); };
  const byDate = (cs) => { const m = {}; cs.forEach(x => m[x.dt.slice(0, 10)] = x); return m; };

  const EARN_RE = /(실적|어닝|분기).{0,12}(발표|쇼크|서프라이즈|부진|미스|하회|상회|밑돌|웃돌|예상치|기대 ?이하|기대 ?이상)|가이던스|주당순이익|EPS|매출 ?전망/;
  const PRE_RE = /앞두고|앞둔|예정|프리뷰|미리 ?보기|했을 ?듯|할 ?듯|실적 전망$/;
  const earnNews = async (code) => {
    const si = (await get(`${INFO}/api/v2/stock-infos/${code}`)).result; const cc = si.companyCode; if (!cc) return false;
    if (window.__fundVer !== 3) try { (0, eval)(await window.__berryLoad('bb/alert/fund.js')); } catch (e) {}
    const hit = window.__fundNameHit ? window.__fundNameHit(si) : (ti) => [String(si.companyName || si.name || '').split(/[ (]/)[0], si.symbol].filter(x => x && x.length >= 2).some(nm => ti.includes(nm)); // 다른 회사 실적 기사(시장 정리) 빼려고 제목에 회사 이름이 있어야 함(한 글자 이름 '델'도 잡게 fund.js 함수 사용)
    const j = await get(`${INFO}/api/v2/news/companies/${cc}?size=40&orderBy=latest`); const lo = Date.now() - 48 * 3600e3;
    return (j.result.body || []).some(x => { const t = Date.parse(String(x.createdAt).slice(0, 19) + '+09:00'); const ti = x.title || ''; return t >= lo && EARN_RE.test(ti) && !PRE_RE.test(ti) && hit(ti); });
  };
  window.__dip8earn = earnNews;
  window.__dip8 = async function () {
    const [qq, sp, sx] = await Promise.all(['QQQ', 'SPY', 'SOXX'].map(async s => daily(await codeOf(s), 70)));
    const last = qq[qq.length - 1], prev = qq[qq.length - 2]; const day = last.dt.slice(0, 10);
    const qr = last.close / prev.close - 1; if (qr > -0.015) return { cards: [], note: '나스닥 ' + pct(qr) };
    const SP = byDate(sp), SX = byDate(sx);
    const ret = (M, d0, d1) => M[d0] && M[d1] ? M[d1].close / M[d0].close - 1 : null;
    const spr = ret(SP, prev.dt.slice(0, 10), day), sxr = ret(SX, prev.dt.slice(0, 10), day);
    const all3 = qr <= -0.015 && (spr != null && spr <= -0.012) && (sxr != null && sxr <= -0.02);
    // 대상: 미국 시총 상위 500
    const U = []; for (let p = 1; p <= 5; p++) { const j = await post(CERT + '/api/v2/screener/screen', { pagingParam: { key: null, number: p, size: 100 }, filters: [], sort: { column: 'C_시가총액', label: '시가총액', order: 'DESC' }, nation: 'us' }); (j.result.stocks || []).forEach(s => U.push({ code: s.stockCode, name: s.name })); }
    const res = (await pool(U, 8, async (u) => {
      const cs = await daily(u.code, 70); if (cs.length < 63) return null;
      const L = cs[cs.length - 1]; if (L.dt.slice(0, 10) !== day) return null; const P = cs[cs.length - 2];
      const r = L.close / P.close - 1; if (r > -0.05) return null; // 최소 −5%는 빠진 종목만 자세히
      return { u, cs, r };
    })).filter(Boolean);
    const cards = [];
    for (const h of res) {
      let sym = h.u.name; try { sym = (await get(`${INFO}/api/v2/stock-infos/${h.u.code}`)).result.symbol || sym; } catch (e) {}
      const semi = SEMI.has(sym); const M = semi ? SX : SP; const cs = h.cs; const n = cs.length;
      const xs = [], ys = []; for (let k = n - 61; k < n - 1; k++) { const a = ret(M, cs[k - 1].dt.slice(0, 10), cs[k].dt.slice(0, 10)); if (a == null) continue; xs.push(a); ys.push(cs[k].close / cs[k - 1].close - 1); }
      if (xs.length < 40) continue;
      const mx = xs.reduce((s, x) => s + x, 0) / xs.length, my = ys.reduce((s, x) => s + x, 0) / ys.length; let cv = 0, vv = 0; for (let t = 0; t < xs.length; t++) { cv += (xs[t] - mx) * (ys[t] - my); vv += (xs[t] - mx) ** 2; }
      const beta = cv / vv; const ix = semi ? sxr : spr; if (ix == null) continue;
      const resid = h.r - beta * ix; if (resid > -0.05) continue;
      // 개별 악재(실적 등) 걸러내기: 장 시작부터 혼자 크게 갭 하락했으면 제외
      const L = cs[n - 1], P = cs[n - 2]; const gap = L.open / P.close - 1, ixGap = (() => { const a = M[day], b = M[P.dt.slice(0, 10)]; return a && b ? a.open / b.close - 1 : 0; })();
      if (gap - beta * ixGap <= -0.04) continue;
      // 실적 발표 급락 제외(뉴스 제목으로 판단)
      try { if (await earnNews(h.u.code)) continue; } catch (e) {}
      // 사업성 확인(실적·부채·최근 3일 악재 뉴스, fund.js). 2022~26 재현: 통과 종목 매매 평균 +1.97%(손절 18%) vs 탈락 +1.44%(손절 21%)
      if (window.__fundVer !== 3) try { (0, eval)(await window.__berryLoad('bb/alert/fund.js')); } catch (e) {}
      let fc = null; try { fc = window.__fundCheck ? await window.__fundCheck(h.u.code) : null; } catch (e) {}
      if (!fc || !fc.ok) continue;
      cards.push({ resid, card: {
        g: fc.soft && fc.soft.length ? window.__gradeDown(semi ? 'A' : 'B+') : semi ? 'A' : 'B+', dn: fc.soft && fc.soft.length ? 1 : undefined, semi: semi ? 1 : 0, m: 'US', n: sym, kn: h.u.name, s: '⑧ 시장 급락일 과하게 빠진 종목', px: fu(L.close), ch: pct(h.r), ln: cs.slice(-40).map(x => x.close),
        buy: fu(L.close * 1.03), tgt: fu(L.close * (semi ? 1.10 : 1.08)), tp: semi ? '+10.0%' : '+8.0%', stop: fu(L.close * 0.85), sp: '−15.0%', rr: '',
        when: '지금 데이마켓(또는 오늘 밤 정규장 시가까지)', hold: '최대 20거래일 · 실제 산 값 기준 ' + (semi ? '+10%' : '+8%') + ' 익절 / −15% 손절(일반 가이드: 검증은 시장 대비 ' + (semi ? '+5.9%p' : '+2.8%p') + ') · 20일째 종가 매도 · 반등이 빨라 늦게 살수록 손해',
        why: `${day.slice(5)} 나스닥 ${pct(qr)}${spr != null ? ' · S&P ' + pct(spr) : ''}${sxr != null ? ' · 반도체 ' + pct(sxr) : ''}${all3 ? '(셋 다 하락)' : ''}. 이 종목 ${pct(h.r)}, 평소대로면 ${pct(beta * ix)}(베타 ${beta.toFixed(2)}) → ${pct(resid)}p 더 빠짐. ${semi ? '반도체 112건 20일 +5.9%p 승 63%' : '대형주 1,755건 20일 +2.8%p 승 55%'}.\n${fc.why}` } });
    }
    cards.sort((a, b) => a.resid - b.resid);
    return { cards: cards.slice(0, 6).map(x => x.card), note: '나스닥 ' + pct(qr) + ' · 후보 ' + cards.length };
  };
})();
