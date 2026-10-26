/* JIN-mail 첨부 미리보기 (샘플) — 종류별로 모양만 보여줌 */
'use strict';
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let d = {};
try { d = JSON.parse(decodeURIComponent(location.hash.slice(1))); } catch (e) { d = { t: 'PDF', n: '파일', s: '' }; }
document.title = d.n + ' · 미리보기';
$('#ft').textContent = d.t; $('#ft').className = 'ft ' + d.t;
$('#nm').textContent = d.n; $('#meta').textContent = [d.s, d.from && '보낸사람 ' + d.from].filter(Boolean).join(' · ');
$('#cl').addEventListener('click', () => window.close());
$('#dl').addEventListener('click', () => alert('샘플이라 실제로 내려받지는 않아요'));
document.addEventListener('keydown', e => { if (e.key === 'Escape') window.close(); });

const ph = n => Array.from({ length: n }, (_, i) => `<div class="ph" style="width:${70 + (i * 37) % 30}%"></div>`).join('');
const views = {
  XLS() {
    const rows = [['매체', '상품', '기간', '노출(만)', '단가', '금액(원)'], ['포털 배너', '메인 롤링', '11/1~11/30', '1,200', '3,000', '36,000,000'], ['메신저 광고', '채팅 상단', '11/1~11/30', '900', '3,500', '31,500,000'],
      ['동영상 플랫폼', '인스트림 15s', '11/4~11/24', '650', '4,200', '27,300,000'], ['OTT', '중간광고 15s', '11/1~11/30', '400', '7,500', '30,000,000']];
    const cols = 'ABCDEF';
    let h = `<div><table class="xl"><tr><th></th>${[...cols].map(c => `<th>${c}</th>`).join('')}</tr>`;
    rows.forEach((r, i) => { h += `<tr class="${i === 0 ? 'h' : ''}"><th>${i + 1}</th>${r.map((v, j) => `<td class="${j >= 3 && i ? 'n' : ''}">${esc(v)}</td>`).join('')}</tr>`; });
    h += `<tr class="t"><th>${rows.length + 1}</th><td>합계</td><td></td><td></td><td class="n">3,150</td><td></td><td class="n">124,800,000</td></tr>`;
    for (let i = rows.length + 2; i < 22; i++) h += `<tr><th>${i}</th>${[...cols].map(() => '<td></td>').join('')}</tr>`;
    return h + '</table><div class="tabs"><span class="on">Media Mix</span><span>일정</span><span>소재</span></div></div>';
  },
  PPT() {
    return `<div class="slides">
      <div class="page slide"><span class="k">PROPOSAL</span><h1>${esc(d.n.replace(/\.\w+$/, ''))}</h1><div style="color:#5f6368;font-size:16px">예시컴퍼니 마케팅팀</div><div class="num">1 / 3</div></div>
      <div class="page slide"><span class="k">STRATEGY</span><h1>집행 방향</h1><ul><li>브랜드 인지 확대: 대형 영상 매체 중심</li><li>전환 강화: 검색·리타게팅 병행</li><li>11월 프로모션 기간 집중 편성</li></ul><div class="num">2 / 3</div></div>
      <div class="page slide"><span class="k">BUDGET</span><h1>매체별 예산</h1><div class="bars"><div style="height:80%"><span>포털</span></div><div style="height:70%"><span>메신저</span></div><div style="height:60%"><span>동영상</span></div><div style="height:66%"><span>OTT</span></div></div><div class="num">3 / 3</div></div></div>`;
  },
  PDF() { return `<div class="page doc"><h1>${esc(d.n.replace(/\.\w+$/, ''))}</h1><div class="sub">${esc(d.from || '')}</div><h3>1. 개요</h3>${ph(5)}<h3>2. 주요 내용</h3>${ph(8)}<h3>3. 참고</h3>${ph(4)}</div>`; },
  DOC() { return `<div class="page doc"><h1>${esc(d.n.replace(/\.\w+$/, ''))}</h1><div class="sub">작성: ${esc(d.from || '')}</div><h3>보고 항목</h3>${ph(4)}<h3>결과 요약</h3>${ph(7)}</div>`; },
  IMG() { return `<div class="page img">이미지 미리보기 · ${esc(d.n)}</div>`; },
  ZIP() { return `<div class="zip"><b>압축파일 안의 파일</b>${['POP_A4_세로.pdf|4.2 MB', 'POP_A3_가로.pdf|6.8 MB', '배너_1080x1080.jpg|1.1 MB', '원본_AI.zip|21.9 MB'].map(x => { const [a, b] = x.split('|'); return `<div><span>${a}</span><span style="color:#80868b">${b}</span></div>`; }).join('')}</div>`; }
};
$('#main').innerHTML = (views[d.t] || views.PDF)();
