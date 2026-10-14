// FRED 자료 올리기 — 맥 크롬의 fred.stlouisfed.org 탭에서 eval. 1시간마다 11개 지표를 받아 ntfy(-f)에 첨부로 올림.
// (FRED는 맥 파이썬·curl 요청을 막아서 크롬 탭이 대신 받는다. risk.js가 이걸 받아 '클석진 반도체 위험지수'를 계산)
(function () {
  const TOPIC = 'berry-3059012bcc6b7db9-f';
  const IDS = ['DGS10', 'NFCI', 'WALCL', 'WTREGEN', 'RRPONTSYD', 'DEXKOUS', 'T10YIE', 'DCOILWTICO', 'DTWEXBGS', 'VIXCLS', 'VXVCLS', 'DGS2', 'T10Y2Y', 'IPG3344S', 'CAPG3344S'];
  window.__fredPush = async function () {
    const out = {};
    for (const id of IDS) {
      const t = await (await fetch('/graph/fredgraph.csv?id=' + id + '&cosd=2009-01-01', { cache: 'no-store' })).text();
      out[id] = t.trim().split('\n').slice(1).map(l => l.split(',')).filter(r => r[1] && r[1] !== '.').map(r => [r[0], +r[1]]);
    }
    if (!(out.DGS10 && out.DGS10.length > 1000)) throw new Error('FRED 비어 있음');
    const r = await fetch('https://ntfy.sh/' + TOPIC, { method: 'PUT', headers: { Filename: 'fred.json', Title: 'fred ' + new Date().toISOString().slice(0, 16) }, body: JSON.stringify(out) });
    return r.status;
  };
  window.__fredWatch = function () {
    if (window.__fredWatchState && window.__fredWatchState.alive) return 'already running';
    const st = window.__fredWatchState = { alive: true, n: 0, last: '' };
    const run = async () => { try { st.last = (await window.__fredPush()) + ' ' + new Date().toISOString(); st.n++; setTimeout(run, 3600e3); } catch (e) { st.last = 'ERR ' + e; setTimeout(run, 600e3); } };
    run();
    return 'fred watching';
  };
})();
'fredwatch loaded';
