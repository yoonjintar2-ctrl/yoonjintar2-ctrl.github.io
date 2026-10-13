// 베리 알럿 스캐너 v1.0 — tossinvest.com 탭에서 실행 (credentials 포함 fetch)
// 사용: await window.__berryScan({slot:'11시', positions:[...]}) → window.__ALERT (알럿 1건 객체)
// 규칙: 「국내 우량주 박스권 순환매 v1.3」 3장(단기 스윙) 기준. 주문 기능 없음.
window.__berryScan = async function (opt) {
  opt = opt || {};
  const INFO = 'https://wts-info-api.tossinvest.com', CERT = 'https://wts-cert-api.tossinvest.com';
  const get = async (u) => { const r = await fetch(u, { credentials: 'include' }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  const post = async (u, b) => { const r = await fetch(u, { method: 'POST', credentials: 'include', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  const pool = async (items, n, fn) => { const out = new Array(items.length); let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; try { out[k] = await fn(items[k]); } catch (e) { out[k] = null; } } })); return out; };
  const sma = (a, n, end) => { end = end == null ? a.length : end; if (end < n) return NaN; let s = 0; for (let i = end - n; i < end; i++) s += a[i]; return s / n; };
  const rsi2 = (c) => { let g = 0, l = 0; const n = 2; for (let i = c.length - 30; i < c.length; i++) { if (i < 1) continue; const d = c[i] - c[i - 1]; const up = Math.max(d, 0), dn = Math.max(-d, 0); g = (g * (n - 1) + up) / n; l = (l * (n - 1) + dn) / n; } return l === 0 ? 100 : 100 - 100 / (1 + g / l); };
  const atr = (h, l, c, n) => { let s = 0, k = 0; for (let i = c.length - n; i < c.length; i++) { s += Math.max(h[i] - l[i], Math.abs(h[i] - c[i - 1]), Math.abs(l[i] - c[i - 1])); k++; } return s / k; };
  const tick = (p) => p < 2000 ? 1 : p < 5000 ? 5 : p < 20000 ? 10 : p < 50000 ? 50 : p < 200000 ? 100 : p < 500000 ? 500 : 1000;
  const rk = (p, mode) => { const t = tick(p); return mode === 'up' ? Math.ceil(p / t) * t : mode === 'down' ? Math.floor(p / t) * t : Math.round(p / t) * t; };
  const fk = (p) => Math.round(p).toLocaleString('en-US');
  const fu = (p) => '$' + p.toFixed(2);
  const pct = (x) => (x >= 0 ? '+' : '−') + Math.abs(x).toFixed(1) + '%';

  // ── 시간
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 3600e3);
  const kstMin = kst.getUTCHours() * 60 + kst.getUTCMinutes();
  const etParts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false }).formatToParts(now);
  const ep = Object.fromEntries(etParts.map(x => [x.type, x.value]));
  const etDate = ep.year + '-' + ep.month + '-' + ep.day, etHour = +ep.hour % 24;
  const krOpen = kstMin >= 540 && kstMin < 930;
  const krFrac = krOpen ? Math.max(0.08, (kstMin - 540) / 390) : 1;

  // ── 시장 환경
  const ind = (await get(CERT + '/api/v4/dashboard/wts/overview/indicator')).result;
  const I = {}; ind.indicators.forEach(i => { I[i.code] = { p: i.price.latestPrice, ch: 100 * (i.price.latestPrice / i.price.basePrice - 1) }; });
  const ks = I['KGG01P'] || { ch: 0 }, kq = I['QGG01P'] || { ch: 0 }, nq = I['COMP.NAI'] || { ch: 0 }, sp = I['SPX.CBI'] || { ch: 0 }, vix = I['RGI..VIX'] || { p: 0, ch: 0 }, fx = I['EXCHANGE_RATE'] || { p: 0, ch: 0 }, nqf = I['RFU.NQc1'] || { ch: 0 }, sox = I['SOX.NAI'] || { ch: 0 };
  let krReg = '정상'; if (ks.ch <= -2 || kq.ch <= -3 || fx.ch >= 1) krReg = '위험회피'; else if (ks.ch <= -1 || fx.ch >= 0.5) krReg = '주의';
  let usReg = '정상'; if (vix.p >= 25 || vix.ch >= 20 || sp.ch <= -2 || nqf.ch <= -2) usReg = '위험회피'; else if (vix.p >= 20 || sp.ch <= -1 || nqf.ch <= -1) usReg = '주의';
  const halt = ind.haltStatus || {};

  // ── 캔들
  const candles = async (mk, code, n) => {
    const j = await get(`${INFO}/api/v1/c-chart/${mk}/${code}/day:1?count=${n || 130}&useAdjustedRate=true`);
    let cs = (j.result.candles || []).slice().reverse();
    if (mk === 'us-s' && cs.length && cs[cs.length - 1].dt.slice(0, 10) === etDate && etHour < 16) cs = cs.slice(0, -1); // 미완성 미국 봉 제외
    return cs;
  };
  const screen = async (nation, n) => { const out = []; for (let p = 1; out.length < n && p <= 5; p++) { const j = await post(CERT + '/api/v2/screener/screen', { pagingParam: { key: null, number: p, size: 100 }, filters: [], sort: { column: 'C_시가총액', label: '시가총액', order: 'DESC' }, nation }); (j.result.stocks || []).forEach(s => out.push({ code: s.stockCode, name: s.name })); if (j.result.lastPage) break; } return out.slice(0, n); };

  const analyze = (s, cs, kr) => {
    if (!cs || cs.length < 105) return null;
    const c = cs.map(x => x.close), h = cs.map(x => x.high), l = cs.map(x => x.low), v = cs.map(x => x.volume), am = cs.map(x => x.amount);
    const L = c.length - 1, px = c[L];
    const avgAmt = sma(am, 20, L), avgVol = sma(v, 20, L);
    if (kr ? (px < 5000 || avgAmt < 2e10) : (px < 10 || avgAmt < 3e8)) return null;
    const ma5 = sma(c, 5), ma20 = sma(c, 20), ma60 = sma(c, 60), ma100 = sma(c, 100), a = atr(h, l, c, 14), r2 = rsi2(c);
    const chg = 100 * (px / cs[L].base - 1);
    const volR = (v[L] / (kr ? krFrac : 1)) / avgVol;
    const hi20 = Math.max(...h.slice(L - 20, L));
    const rng = h[L] - l[L], pos = rng > 0 ? (px - l[L]) / rng : 0.5;
    const res = [];
    // A 눌림 반등: 상승 추세 속 RSI(2) 과매도
    if (px > ma100 && ma20 > ma60 && r2 <= 10) {
      const stop = px - 1.5 * a, tgt = Math.max(ma5, px + 1.0 * a);
      res.push({ setup: 'A', score: 10 - r2 + (ma20 / ma60 - 1) * 50, name: s.name, code: s.code, px, chg, r2, stop, tgt, tgt2: px + 1.5 * a, volR });
    }
    // B 돌파: 20일 고가 돌파 + 거래량
    if (px > hi20 && px > ma60 && volR >= 1.8 && pos >= 0.6 && chg <= (kr ? 8 : 10) && chg > 0) {
      const stop = Math.max(hi20 * 0.985, px - 1.5 * a);
      if (stop < px) res.push({ setup: 'B', score: volR + chg / 4, name: s.name, code: s.code, px, chg, r2, stop, tgt: px + 2 * (px - stop), volR, hi20 });
    }
    return res;
  };

  const run = async (nation, mk, n) => {
    const uni = await screen(nation, n);
    const rows = await pool(uni, 8, async (s) => analyze(s, await candles(mk, s.code), mk === 'kr-s'));
    const all = rows.filter(Boolean).flat();
    const A = all.filter(x => x.setup === 'A').sort((a, b) => b.score - a.score), B = all.filter(x => x.setup === 'B').sort((a, b) => b.score - a.score);
    return { A, B, scanned: uni.length };
  };
  const [KR, US] = await Promise.all([run('kr', 'kr-s', opt.krN || 200), run('us', 'us-s', opt.usN || 150)]);

  // ── 보유 종목
  const pos = opt.positions || [];
  const holdLines = [], warnHold = [];
  for (const p of pos) {
    try {
      const cs = await candles(p.code.startsWith('US') ? 'us-s' : 'kr-s', p.code, 3);
      const k = cs[cs.length - 1]; const px = k.close; const us = p.code.startsWith('US'); const f = us ? fu : fk;
      const flags = [];
      if (px <= p.stop) flags.push('손절선 이탈'); else if (k.low <= p.stop) flags.push('장중 손절선 터치');
      else if (p.support && px < p.support) flags.push('지지선 아래');
      if (p.target && px >= p.target) flags.push('목표 도달');
      if (flags.length) warnHold.push(p.name);
      holdLines.push(`${p.name} ${f(px)} (${pct(100 * (px / p.avg - 1))} 평단비) ${flags.length ? '⚠' + flags.join('·') : '유지'} · 손절 ${f(p.stop)} / 목표 ${f(p.target)}`);
    } catch (e) { holdLines.push(p.name + ' 시세 확인 실패'); }
  }

  // ── 알럿 본문
  const L = [];
  L.push(`■ 시장  코스피 ${pct(ks.ch)} 코스닥 ${pct(kq.ch)} 원달러 ${fx.p ? fk(fx.p) : '-'}(${pct(fx.ch)})`);
  L.push(`  나스닥 ${pct(nq.ch)} S&P ${pct(sp.ch)} 나스닥선물 ${pct(nqf.ch)} 반도체 ${pct(sox.ch)} VIX ${vix.p ? vix.p.toFixed(1) : '-'}`);
  L.push(`  국내 ${krReg} / 미국 ${usReg}${halt.kospiCircuitBreaker ? ' · 코스피 서킷브레이커 발동' : ''}${halt.kospiSidecar ? ' · 코스피 사이드카' : ''}`);
  if (holdLines.length) { L.push('■ 보유'); holdLines.forEach(x => L.push('  ' + x)); }
  const krLine = (x) => {
    const e = rk(x.px * 1.003, 'down'), st = rk(x.stop, 'down'), tg = rk(x.tgt, 'up');
    return x.setup === 'A'
      ? `  [눌림] ${x.name} ${fk(x.px)}(${pct(x.chg)}) RSI2 ${x.r2.toFixed(0)} · 매수≤${fk(e)} 손절 ${fk(st)} 1차 ${fk(tg)} · 5일선 위 종가면 매도`
      : `  [돌파] ${x.name} ${fk(x.px)}(${pct(x.chg)}) 거래량 ${x.volR.toFixed(1)}배 · 매수≤${fk(e)} 손절 ${fk(st)} 목표 ${fk(tg)}`;
  };
  const usLine = (x) => x.setup === 'A'
    ? `  [눌림] ${x.name} ${fu(x.px)}(${pct(x.chg)}) RSI2 ${x.r2.toFixed(0)} · 매수≤${fu(x.px * 1.003)} 손절 ${fu(x.stop)} 1차 ${fu(x.tgt)}`
    : `  [돌파] ${x.name} ${fu(x.px)}(${pct(x.chg)}) 거래량 ${x.volR.toFixed(1)}배 · 매수≤${fu(x.px * 1.01)} 손절 ${fu(x.stop)} 목표 ${fu(x.tgt)}`;
  const pick = (R, reg) => { const nA = reg === '위험회피' ? 1 : 2, nB = reg === '위험회피' ? 0 : 2; return R.B.slice(0, nB).concat(R.A.slice(0, nA)); };
  const krPick = pick(KR, krReg), usPick = pick(US, usReg);
  const krNote = krReg === '위험회피' ? (kstMin < 840 ? ' — 관찰만, 14시 이후 지지 확인 시 소액(10%)' : ' — 지지 확인 시에만 소액(10%)') : krReg === '주의' ? ' — 비중 15% 이하' : '';
  L.push(`■ 국내 단기 후보${krNote}`);
  if (krPick.length) krPick.forEach(x => L.push(krLine(x))); else L.push('  조건 맞는 종목 없음');
  L.push(`■ 미국 (오늘 밤 22:30 정규장 기준${usReg !== '정상' ? ', ' + usReg : ''})`);
  if (usPick.length) usPick.forEach(x => L.push(usLine(x))); else L.push('  조건 맞는 종목 없음');
  L.push(`  스캔: 국내 ${KR.scanned} · 미국 ${US.scanned} (신호 국내 ${KR.A.length + KR.B.length} · 미국 ${US.A.length + US.B.length})`);
  L.push('※ 참고용 신호입니다. 주문은 직접 판단하세요.');

  const hhmm = String(kst.getUTCHours()).padStart(2, '0') + ':' + String(kst.getUTCMinutes()).padStart(2, '0');
  const md = (kst.getUTCMonth() + 1) + '/' + kst.getUTCDate();
  const head = [];
  if (warnHold.length) head.push('보유 경고 ' + warnHold.join('·'));
  if (krReg !== '정상') head.push('국내 ' + krReg + ' ' + pct(ks.ch));
  head.push('국내 ' + krPick.length + ' · 미국 ' + usPick.length);
  const alert = {
    id: kst.toISOString().slice(0, 16).replace('T', ' '),
    time: md + ' ' + hhmm,
    slot: opt.slot || hhmm,
    level: warnHold.length || krReg === '위험회피' || usReg === '위험회피' ? 'warn' : 'info',
    title: `[${opt.slot || hhmm}] ` + head.join(' / '),
    body: L.join('\n'),
  };
  window.__ALERT = alert;
  window.__ALERT_JSON = JSON.stringify(alert);
  return 'ok ' + window.__ALERT_JSON.length;
};
'scanner loaded';
