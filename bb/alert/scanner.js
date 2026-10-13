// 베리 알럿 스캐너 v1.0 — tossinvest.com 탭에서 실행 (credentials 포함 fetch)
// 사용: await window.__berryScan({slot:'11시'}) → window.__ALERT {title, cards:[{g 등급, n 종목, buy 매수상한, tgt 목표, stop 손절…}], body(JSON)}
// 규칙: 「국내 우량주 박스권 순환매 v1.3」 3장(단기 스윙) 기준. 주문 기능 없음.
// 저장소 파일을 캐시 없이 읽기(GitHub API, 실패하면 raw)
window.__berryLoad = async function (path) {
  try { const r = await fetch('https://api.github.com/repos/yoonjintar2-ctrl/yoonjintar2-ctrl.github.io/contents/' + path + '?ref=main', { headers: { Accept: 'application/vnd.github.raw' }, cache: 'no-store' }); if (r.ok) return await r.text(); } catch (e) {}
  return await (await fetch('https://raw.githubusercontent.com/yoonjintar2-ctrl/yoonjintar2-ctrl.github.io/main/' + path, { cache: 'no-store' })).text();
};
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
  // 마지막으로 끝난 미국 정규장 날짜(ET): 16시 이후면 오늘, 아니면 직전 평일
  const usDone = (() => { const d = new Date(etDate + 'T12:00:00Z'); if (etHour < 16) d.setUTCDate(d.getUTCDate() - 1); while (d.getUTCDay() === 0 || d.getUTCDay() === 6) d.setUTCDate(d.getUTCDate() - 1); return d.toISOString().slice(0, 10); })();
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
    if (mk === 'us-s') cs = cs.filter(x => x.dt.slice(0, 10) <= usDone); // 끝난 정규장 봉만 (데이마켓·프리장 봉 제외)
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
    const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
    const liq = clamp(Math.log10(avgAmt / (kr ? 2e10 : 3e8)) * 10, 0, 10); // 거래대금 여유 0~10
    const trend = clamp((ma20 / ma60 - 1) * 400, 0, 20);                     // 20일선이 60일선 위로 얼마나 0~20
    // A 눌림 반등: 상승 추세 속 RSI(2) 과매도
    if (px > ma100 && ma20 > ma60 && r2 <= 10) {
      const stop = Math.max(px - 1.5 * a, px * 0.94), tgt = Math.max(ma5, px + 1.0 * a);
      const rr = (tgt - px) / (px - stop);
      const above100 = (px / ma100 - 1) * 100; // 100일선 위 여유(너무 멀면 추세 끝물)
      const score = clamp((10 - r2) * 3, 0, 30) + trend + clamp(rr * 15, 0, 20) + liq + (above100 > 2 && above100 < 25 ? 15 : above100 <= 2 ? 5 : 8) + (chg > -6 ? 5 : 0);
      res.push({ setup: 'A', score, name: s.name, code: s.code, px, chg, r2, stop, tgt, rr, volR, why: `RSI(2) ${r2.toFixed(0)} 과매도 · 상승 추세 속 눌림` });
    }
    // B 돌파: 20일 고가 돌파 + 거래량
    if (px > hi20 && px > ma60 && volR >= 1.8 && pos >= 0.6 && chg <= (kr ? 8 : 10) && chg > 0) {
      const stop = Math.max(hi20 * 0.985, px - 1.5 * a, px * 0.95);
      if (stop < px) {
        const ext = (px / hi20 - 1) * 100; // 돌파 후 얼마나 달렸나(작을수록 좋음)
        const score = clamp((volR - 1.8) * 12, 0, 30) + clamp((pos - 0.6) * 37, 0, 15) + clamp(15 - ext * 3, 0, 15) + trend + liq + (chg >= 2 && chg <= 6 ? 10 : 4);
        res.push({ setup: 'B', score, name: s.name, code: s.code, px, chg, r2, stop, tgt: px + 2 * (px - stop), rr: 2, volR, why: `20일 고가 돌파 · 거래량 ${volR.toFixed(1)}배` });
      }
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

  // ── 등급 (조건에 잘 맞을수록 높게): SSS SS S A+ A A- B+ B
  const GR = [[85, 'SSS'], [78, 'SS'], [71, 'S'], [64, 'A+'], [57, 'A'], [50, 'A-'], [43, 'B+'], [0, 'B']];
  const grade = (x) => GR.find(g => x >= g[0])[1];
  const penalty = (reg) => reg === '위험회피' ? 10 : reg === '주의' ? 5 : 0;
  const krAllowed = !(krReg === '위험회피' && kstMin < 840);       // 국내 위험회피 14시 전은 추천 안 함
  const take = (R, reg, allowed) => {
    if (!allowed) return [];
    const list = reg === '위험회피' ? R.A.slice(0, 2) : R.A.slice(0, 3).concat(R.B.slice(0, 3));
    return list.map(x => Object.assign({}, x, { score: x.score - penalty(reg) }));
  };
  const card = (x, kr) => {
    const f = kr ? fk : fu, buy = kr ? rk(x.px * 1.003, 'down') : x.px * (x.setup === 'B' ? 1.01 : 1.003);
    const stop = kr ? rk(x.stop, 'down') : x.stop, tgt = kr ? rk(x.tgt, 'up') : x.tgt;
    return {
      g: grade(x.score), sc: Math.round(x.score), m: kr ? 'KR' : 'US', n: x.name, code: x.code,
      s: x.setup === 'A' ? '눌림 반등' : '거래량 돌파',
      px: f(x.px), ch: pct(x.chg),
      buy: f(buy), tgt: f(tgt), stop: f(stop),
      tp: pct(100 * (tgt / buy - 1)), sp: pct(100 * (stop / buy - 1)), rr: x.rr.toFixed(1),
      why: x.why,
      hold: x.setup === 'A' ? '1~5일 · 종가가 5일선 위면 매도' : '1~5일 · 목표/손절 도달 시',
      when: kr ? '지금(장중)' : '오늘 밤 22:30 정규장',
    };
  };
  const cards = take(KR, krReg, krAllowed).map(x => card(x, true)).concat(take(US, usReg, true).map(x => card(x, false)))
    .sort((a, b) => b.sc - a.sc).slice(0, 6);
  const hhmm = String(kst.getUTCHours()).padStart(2, '0') + ':' + String(kst.getUTCMinutes()).padStart(2, '0');
  const top = cards[0];
  const alert = {
    v: 2, slot: opt.slot || hhmm, time: (kst.getUTCMonth() + 1) + '/' + kst.getUTCDate() + ' ' + hhmm,
    actionable: cards.length, krActionable: cards.filter(c => c.m === 'KR').length, usActionable: cards.filter(c => c.m === 'US').length,
    level: 'info',
    title: top ? `${top.g} ${top.n}${cards.length > 1 ? ' 외 ' + (cards.length - 1) + '종목' : ''} · ${opt.slot || hhmm}` : `지금은 들어갈 종목 없음 · ${opt.slot || hhmm}`,
    cards,
  };
  alert.body = JSON.stringify({ v: 2, slot: alert.slot, time: alert.time, cards });
  window.__ALERT = alert;
  window.__ALERT_JSON = JSON.stringify(alert);
  return 'ok ' + window.__ALERT_JSON.length;
};

// ── ntfy 발행 / 요청 대기 ─────────────────────────────
window.__BERRY = { alerts: 'berry-3059012bcc6b7db9-a', requests: 'berry-3059012bcc6b7db9-r' };
window.__berryPublish = async function (alert, extraTags) {
  const enc = new TextEncoder();
  let body = alert.body || '';
  if (alert.cards) { const cs = alert.cards.slice(); body = JSON.stringify({ v: 2, slot: alert.slot, time: alert.time, cards: cs }); while (enc.encode(body).length > 3800 && cs.length > 1) { cs.pop(); body = JSON.stringify({ v: 2, slot: alert.slot, time: alert.time, cards: cs }); } }
  else while (enc.encode(body).length > 3800) body = body.slice(0, body.lastIndexOf('\n', body.length - 2)) + '\n…(생략)';
  const tags = [alert.level || 'info'].concat(extraTags || []);
  const r = await fetch('https://ntfy.sh/', { method: 'POST', body: JSON.stringify({ topic: window.__BERRY.alerts, title: alert.title, message: body, tags, priority: alert.level === 'warn' ? 4 : 3 }) });
  return r.status;
};
// 블랙베리 "종목 찾기" 요청을 기다렸다가 바로 검색해서 보낸다. 탭 하나에서만 돈다.
window.__berryWatch = function () {
  const me = Math.random().toString(36).slice(2), KEY = 'berryWatcher';
  const live = () => { try { const o = JSON.parse(localStorage.getItem(KEY) || '{}'); return o.id && o.id !== me && Date.now() - o.ts < 25000; } catch (e) { return false; } };
  if (window.__berryWatchState && window.__berryWatchState.alive) return 'already running here';
  if (live()) return 'running in another tab';
  const st = window.__berryWatchState = { alive: true, me, started: new Date().toISOString(), handled: 0, last: '' };
  const beat = setInterval(() => { try { localStorage.setItem(KEY, JSON.stringify({ id: me, ts: Date.now() })); } catch (e) {} }, 10000);
  try { localStorage.setItem(KEY, JSON.stringify({ id: me, ts: Date.now() })); } catch (e) {}
  let busy = false, lastRun = 0;
  const seen = new Set();
  const es = new EventSource('https://ntfy.sh/' + window.__BERRY.requests + '/sse');
  st.es = es;
  es.onmessage = async (ev) => {
    let m; try { m = JSON.parse(ev.data); } catch (e) { return; }
    if (m.event !== 'message' || seen.has(m.id) || !/^scan/.test(m.message || '')) return;
    seen.add(m.id);
    if (Date.now() / 1000 - (m.time || 0) > 600) return; // 10분 지난 요청은 무시
    if (busy || Date.now() - lastRun < 45000) return;
    busy = true; lastRun = Date.now();
    try {
      await fetch('https://ntfy.sh/', { method: 'POST', body: JSON.stringify({ topic: window.__BERRY.alerts, title: '검색 중', message: '맥에서 지금 시세로 검색 중이에요 (30초~1분)', tags: ['ack'] }) });
      await window.__berryScan({ slot: '요청' });
      await window.__berryPublish(window.__ALERT, ['req']);
      st.handled++; st.last = new Date().toISOString();
    } catch (e) {
      st.last = 'ERR ' + e;
      try { await fetch('https://ntfy.sh/', { method: 'POST', body: JSON.stringify({ topic: window.__BERRY.alerts, title: '검색 실패', message: '맥에서 검색하다 오류가 났어요: ' + String(e).slice(0, 200), tags: ['warn', 'req'] }) }); } catch (e2) {}
    } finally { busy = false; }
  };
  es.onerror = () => { st.err = new Date().toISOString(); };
  window.addEventListener('beforeunload', () => { clearInterval(beat); try { localStorage.removeItem(KEY); } catch (e) {} });
  return 'watching';
};
'scanner loaded';
