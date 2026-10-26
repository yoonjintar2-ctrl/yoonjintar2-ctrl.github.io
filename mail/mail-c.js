/* JIN-mail 화면 샘플 — 예시 데이터로 동작 (계정 연결만 실제). 실제 메일 연결 전 화면·동작 확인용 */
'use strict';

/* ───────── 아이콘 (무채색 선 아이콘) ───────── */
const IP = {
  pen: 'M4 20h4L20 8l-4-4L4 16z',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.5-4.5',
  me: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c0-4 4-6 8-6s8 2 8 6',
  inbox: 'M3 13h5l2 3h4l2-3h5M3 13l2.5-8h13l2.5 8v6H3z',
  sent: 'M4 12L20 4l-6 16-3-7z',
  draft: 'M5 3h9l5 5v13H5zM14 3v5h5M8 13h8M8 17h6',
  all: 'M4 7h16M4 12h16M4 17h16',
  folder: 'M3 6h6l2 2h10v11H3z',
  right: 'M9 6l6 6-6 6', down: 'M6 9l6 6 6-6',
  clip: 'M20 11l-8.5 8.5a5 5 0 0 1-7-7L13 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L14 7',
  cal: 'M4 6h16v14H4zM4 10h16M9 3v4M15 3v4',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  where: 'M4 6h16M4 11h10M4 16h7M17 14l2 2 3-4',
  from: 'M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 20c0-4 4-6 8-6 1.5 0 3 .3 4.2.9M16 17h6M19 14l3 3-3 3',
  to: 'M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 20c0-4 4-6 8-6 1.5 0 3 .3 4.2.9M22 17h-6M19 14l-3 3 3 3',
  reply: 'M10 7l-6 5 6 5M4 12h10a6 6 0 0 1 6 6',
  replyall: 'M13 7l-6 5 6 5M7 12h7a6 6 0 0 1 6 6M8 7l-6 5 6 5',
  fwd: 'M14 7l6 5-6 5M20 12H10a6 6 0 0 0-6 6',
  more: 'M12 6h.01M12 12h.01M12 18h.01',
  trash: 'M4 7h16M10 7V4h4v3M6 7l1 13h10l1-13',
  move: 'M3 6h6l2 2h10v11H3zM10 13h6M13 10l3 3-3 3',
  pop: 'M14 4h6v6M20 4l-9 9M18 14v6H4V6h6',
  close: 'M6 6l12 12M18 6L6 18',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
  plus: 'M12 5v14M5 12h14', dl: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  alL: 'M4 6h16M4 10h10M4 14h16M4 18h10', alC: 'M4 6h16M7 10h10M4 14h16M7 18h10', alR: 'M4 6h16M10 10h10M4 14h16M10 18h10',
  ul: 'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01', ol: 'M10 6h10M10 12h10M10 18h10M4 5h1v3M4 18h2l-2-2.5a1 1 0 0 1 2-1',
  ind: 'M4 6h16M10 10h10M10 14h10M4 18h16M4 10l3 2-3 2', outd: 'M4 6h16M10 10h10M10 14h10M4 18h16M7 10l-3 2 3 2',
  table: 'M4 5h16v14H4zM4 10h16M4 15h16M10 5v14', hr: 'M4 12h16', link: 'M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1',
  clear: 'M6 5h12M12 5l-3 14M4 20l16-16', mark: 'M9 11l-5 5v3h3l5-5M12 8l4 4M14 6l2-2 4 4-2 2',
  image: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9h.01',
  vtop: 'M4 4h16M12 8v12M8 12l4-4 4 4', vmid: 'M4 12h16M12 3v5M9 6l3 2 3-2M12 21v-5M9 18l3-2 3 2', vbot: 'M4 20h16M12 4v12M8 12l4 4 4-4',
  rowA: 'M4 10h16v10H4zM12 2v6M9 5h6', rowB: 'M4 4h16v10H4zM12 16v6M9 19h6', colL: 'M10 4h10v16H10zM2 12h6M5 9v6', colR: 'M4 4h10v16H4zM16 12h6M19 9v6',
  rowX: 'M4 9h16v6H4zM9 12h6', colX: 'M9 4h6v16H9zM12 9v6', tblX: 'M4 5h16v14H4zM9 9l6 6M15 9l-6 6',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2', hide: 'M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.2 3.8M6.6 6.6C3.7 8.4 2 12 2 12s4 6 10 6a9 9 0 0 0 4.5-1.2',
  read2: 'M3 8l9 6 9-6M3 8v11h18V8l-9-5z', rename: 'M4 20h4L19 9l-4-4L4 16zM13 7l4 4',
  sub: 'M5 4v10a3 3 0 0 0 3 3h11M15 13l4 4-4 4', env: 'M3 5.5h18v13H3zM3.5 6.5l8.5 6.5 8.5-6.5'
};
const ico = (k, s) => `<svg class="i" viewBox="0 0 24 24"${s ? ` style="width:${s}px;height:${s}px"` : ''}><path d="${IP[k]}"/></svg>`;

/* ───────── 저장 (샘플: 이 브라우저 안에만) ───────── */
const store = {
  get(k, d) { try { const v = localStorage.getItem('jin-' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('jin-' + k, JSON.stringify(v)); } catch (e) { /* 저장 불가 환경 */ } }
};

/* ───────── 예시 데이터 ───────── */
const ME = { name: '윤석진', email: 'jintar@smtown.com' };
const C = (name, email) => ({ name, email });
const P = {
  kwon: C('권OO', 'kwon@nasmedia.co.kr'), lee_n: C('이OO', 'lee@nasmedia.co.kr'), kim_n: C('김OO', 'kim@nasmedia.co.kr'),
  kim_b: C('김OO', 'kim.b@bmw.co.kr'), jung_b: C('정OO', 'jung@bmw.co.kr'),
  lee_c: C('이OO', 'jieun@coway.com'), park_c: C('박OO', 'park@coway.com'), kang_c: C('강OO', 'kang@coway.com'),
  choi_k: C('최OO', 'choi@ktnasmedia.co.kr'), jung_t: C('정OO', 'jung@cj.net'), park_h: C('박OO', 'park@hanabank.com'),
  park_s: C('박OO', 'park2@smtown.com'), hr: C('인사팀', 'hr@smtown.com'), mezzo: C('메조미디어', 'report@mezzomedia.co.kr')
};
const CONTACTS = [ME, ...Object.values(P)];
const DEFAULT_BOXES = [
  { id: 'hana', name: '하나은행', parent: null },
  { id: 'bmw', name: 'BMW', parent: null },
  { id: 'bmw-fs', name: 'FS', parent: 'bmw' },
  { id: 'bmw-mt', name: 'Motorrad', parent: 'bmw' },
  { id: 'bmw-mkt', name: 'MKT (On Going)', parent: 'bmw' },
  { id: 'tlj', name: '뚜레쥬르', parent: null },
  { id: 'coway', name: '코웨이', parent: null },
  { id: 'coway-nf', name: '넷플릭스 캠페인', parent: 'coway' },
  { id: 'trend', name: '트렌드 리포트', parent: null },
  { id: 'life', name: '회사생활', parent: null },
  { id: 'life-me', name: '개인', parent: 'life' }
];
const FONT_LIST = ['맑은 고딕', '나눔고딕', '돋움', '굴림', '바탕', 'Arial', 'Calibri', 'Tahoma'];
const DEFAULT_FOOTERS = [
  { id: 'f1', name: '미디어 3팀 공식', html: '고맙습니다.<br>윤석진 드림.<br><br><b>윤석진</b> | Media Planner / 부장<br>SM CULTURE &amp; CONTENTS · Media 3 team', font: { family: '맑은 고딕', size: 10, color: '#202124' }, rule: { type: 'reply', kw: '' } },
  { id: 'f2', name: 'SM C&C', html: '고맙습니다.<br>SM C&amp;C 윤석진 드림.', font: { family: '맑은 고딕', size: 10, color: '#202124' }, rule: { type: 'new', kw: '' } },
  { id: 'f3', name: 'BMW 회신', html: '감사합니다.<br>윤석진 드림.', font: { family: '맑은 고딕', size: 10, color: '#202124' }, rule: { type: 'from', kw: 'bmw' } }
];
const M = (o) => Object.assign({ to: [ME], cc: [], att: [], prev: [], inbox: 0, unread: 0 }, o);
let MAILS = [
  M({ id: 1, d: 0, t: '09:42', from: P.kwon, cc: [P.kim_n, P.lee_n], box: 'hana', inbox: 1, unread: 1,
    subj: 'RE: [SM C&C] 하나은행 앞치마 광고 관련 문의드립니다_261026', att: [['XLS', '하나은행_앞치마_견적_261026.xlsx', '48 KB'], ['PDF', '매체소개서.pdf', '2.1 MB']],
    body: '안녕하세요 부장님,\n나스미디어 권OO입니다.\n\n문의주신 앞치마 광고 건 견적 첨부드립니다.\n11월 첫째 주 집행 가능하며, 소재는 10/30까지 전달 부탁드립니다.\n\n감사합니다.',
    prev: [{ from: ME, to: [P.kwon], cc: [P.kim_n], d: 2, t: '11:12', body: '안녕하세요, SM C&C 윤석진입니다.\n하나은행 앞치마 광고 집행 가능 여부와 견적 문의드립니다.\n\n고맙습니다.\n윤석진 드림.' },
           { from: P.park_h, to: [ME], cc: [], d: 4, t: '15:20', body: '부장님, 앞치마 광고 매체 가능한 곳 알아봐 주실 수 있을까요?\n11월 초 집행 희망합니다.' }] }),
  M({ id: 2, d: 0, t: '09:10', from: P.kim_b, box: 'bmw-fs', inbox: 1, unread: 1,
    subj: 'Re: [BMW AS] 2026년 10월 세금계산서 발행 요청 건', att: [['PDF', '10월_계산서_요청.pdf', '120 KB']],
    body: '부장님 안녕하세요.\n10월분 세금계산서 발행 부탁드립니다.\n금액은 첨부 확인 부탁드립니다.\n\n감사합니다.' }),
  M({ id: 3, d: 0, t: '08:55', from: P.lee_c, cc: [P.park_c], box: 'coway-nf', inbox: 1, draft: '부장님, 증액분 반영해서 다시 정리드리겠습니다.',
    subj: 'Re: [코웨이] 제로 음식물처리기 - 넷플릭스 VA 광고 집행 문의 건_1006',
    body: '부장님, 추가 증액분(2,500만 원) 반영된 금액으로 다시 확인 부탁드립니다.',
    prev: [{ from: ME, to: [P.lee_c], cc: [P.park_c], d: 4, t: '17:21', body: '알겠습니다~!\n제가 이해한 게 맞다면 아래와 같이 예산 확인하고 부킹 진행하겠습니다.' }] }),
  M({ id: 4, d: 0, t: '08:31', from: P.park_s, to: [P.lee_c], cc: [ME], box: 'coway', inbox: 1, unread: 1,
    subj: '[공유] 11월 IMC 서비스 집행 제안', att: [['PPT', '11월_IMC_제안서.pptx', '8.4 MB']], body: '참고용으로 공유드립니다.\n11월 IMC 서비스 집행 제안서 첨부합니다.' }),
  M({ id: 5, d: 1, t: '17:20', from: P.choi_k, cc: [P.jung_b], box: 'bmw-mkt',
    subj: 'RE: [SM C&C] BMW - Automedia On-Going 집행 관련 문의드립니다', body: '안녕하세요 부장님,\n아래 내용으로 오토미디어 측에 전달하였습니다.\n랜딩 URL은 확인되는 대로 공유드리겠습니다.' }),
  M({ id: 6, d: 1, t: '14:05', from: P.jung_t, box: 'tlj', inbox: 1, unread: 1,
    subj: '[뚜레쥬르] 11월 매장 POP 소재 전달드립니다', att: [['ZIP', 'POP_소재_11월.zip', '34 MB']], body: '안녕하세요.\n11월 매장 POP 소재 압축파일 첨부드립니다.\n확인 부탁드립니다.' }),
  M({ id: 7, d: 2, t: '11:12', from: ME, to: [P.kwon], cc: [P.kim_n], box: 'hana', sent: 1,
    subj: '[SM C&C] 하나은행 앞치마 광고 문의드립니다', body: '안녕하세요, SM C&C 윤석진입니다.\n하나은행 앞치마 광고 집행 가능 여부와 견적 문의드립니다.\n\n고맙습니다.\n윤석진 드림.' }),
  M({ id: 8, d: 3, t: '16:40', from: P.kim_b, to: [P.jung_b], cc: [ME], box: 'bmw',
    subj: 'Re: [BMW Korea] Tesla Conquest Campaign', body: '일정 확인 부탁드립니다.\n이번 주 금요일까지 회신 주시면 됩니다.' }),
  M({ id: 9, d: 3, t: '11:48', from: P.lee_c, cc: [P.kang_c, P.choi_k], box: 'coway',
    subj: 'Re: [미디어 3팀 윤석진] 코웨이 안마매트리스 넷플릭스 추가 캠페인', att: [['XLS', '261023_코웨이_MediaMix_F.xlsx', '177 KB']],
    body: '안녕하세요 부장님,\n안마매트리스 11~12월 믹스 최종본(1.25억) 공유드립니다.\n변경 필요시 말씀 부탁드립니다.' }),
  M({ id: 10, d: 4, t: '10:02', from: P.mezzo, box: 'trend', unread: 1, subj: '[트렌드] 2026 4Q 업종 분석 리포트', att: [['PDF', '2026_4Q_업종분석.pdf', '6.2 MB']], body: '이번 분기 업종별 광고 동향 리포트를 보내드립니다.' }),
  M({ id: 11, d: 5, t: '15:30', from: P.hr, to: [C('전 직원', 'all@smtown.com')], box: 'life', unread: 1, subj: '[공지] 11월 사내 건강검진 일정 안내', body: '11월 건강검진 일정을 안내드립니다.' }),
  M({ id: 12, d: 9, t: '09:15', from: P.park_h, box: 'hana', subj: '[하나은행] 4분기 디지털 캠페인 결과 보고 요청', att: [['DOC', '보고양식.docx', '64 KB']], body: '4분기 디지털 캠페인 결과 보고 부탁드립니다.' }),
  M({ id: 13, d: 20, t: '13:00', from: P.jung_t, box: 'tlj', subj: '[뚜레쥬르] 10월 프로모션 결과 공유', att: [['IMG', '프로모션_현장.jpg', '1.8 MB']], body: '10월 프로모션 결과 공유드립니다.' }),
  M({ id: 14, d: 45, t: '10:10', from: P.kim_b, box: 'bmw-mt', subj: '[Motorrad] 3분기 집행 결과 공유', att: [['XLS', 'Q3_결과.xlsx', '210 KB']], body: '3분기 Motorrad 집행 결과 공유드립니다.' })
];
const SAMPLE_MAILS = MAILS.slice();

/* ───────── 상태 ───────── */
let BOXES = store.get('boxes', DEFAULT_BOXES);
let FOOTERS = store.get('footers2', DEFAULT_FOOTERS);
let SET = Object.assign({ composeMode: 'inline', typo: true, showHidden: false }, store.get('settings', {}));
let IGNORE = new Set(store.get('typo-ignore', []));
const st = {
  folder: 'inbox', q: '', open: null, picked: new Set(), anchor: null, collapsed: new Set(store.get('collapsed', [])),
  f: { where: 'all', exclude: '', exact: false, period: { k: 'all' }, att: { k: 'any', types: [] }, readf: 'all', from: null, to: null }
};
const TODAY = new Date(); TODAY.setHours(0, 0, 0, 0);
const dayOf = m => { const x = new Date(TODAY); x.setDate(x.getDate() - m.d); return x; };

/* ───────── 도우미 ───────── */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nl = s => esc(s).replace(/\n/g, '<br>');
const isMe = p => p && p.email === ME.email;
const nameOf = p => isMe(p) ? '나' : p.name;
const fmtD = d => (d.getMonth() + 1) + '/' + d.getDate();
function toast(t, undo) {
  $('#toastT').textContent = t;
  const u = $('#toastUndo'); u.hidden = !undo; u.onclick = () => { undo(); $('#toast').classList.remove('on'); };
  $('#toast').classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => $('#toast').classList.remove('on'), undo ? 5000 : 2400);
}
const childrenOf = id => BOXES.filter(b => b.parent === id);
const descIds = id => [id, ...childrenOf(id).flatMap(c => descIds(c.id))];
const boxById = id => BOXES.find(x => x.id === id);
const boxPath = id => { const out = []; let b = boxById(id); while (b) { out.unshift(b.name); b = boxById(b.parent); } return out.join(' › '); };
const domHue = email => { const d = (email.split('@')[1] || '').toLowerCase(); let h = 0; for (const c of d) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
const chipStyle = email => { const h = domHue(email); return `background:hsl(${h} 70% 94%);border-color:hsl(${h} 45% 78%)`; };
const dotColor = email => `hsl(${domHue(email)} 55% 55%)`;
const PALETTE = ['#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
  '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
  '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
  '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd',
  '#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0',
  '#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79'];
const boxLabel = (b, dep) => `<span style="padding-left:${dep * 14}px;display:inline-flex;align-items:center;gap:7px">${ico('folder', 15)}${esc(b.name)}${b.hidden ? ' <small style="color:var(--mute)">(숨김)</small>' : ''}</span>`;

/* ───────── 폴더(시스템) ───────── */
const SYS = {
  inbox: { name: '받은편지함', ic: 'inbox', f: m => m.inbox },
  tome: { name: '나에게 온 메일', ic: 'me', f: m => !m.sent && m.to.some(isMe), parent: 'inbox' },
  sent: { name: '보낸편지함', ic: 'sent', f: m => m.sent },
  draft: { name: '작성 중인 메일', ic: 'draft', f: m => !!m.draft },
  all: { name: '모든 메일', ic: 'all', f: () => true, hideNav: true }
};
const folderFn = k => SYS[k] ? SYS[k].f : (m => descIds(k).includes(m.box));
const folderName = k => SYS[k] ? SYS[k].name : boxPath(k);

/* ───────── 왼쪽: 폴더·메일함 트리 ───────── */
function renderNav() {
  const unread = f => MAILS.filter(m => f(m) && m.unread).length || '';
  const sysItem = (k, depth) => { const v = SYS[k]; const n = k === 'draft' ? (MAILS.filter(m => m.draft).length || '') : unread(v.f);
    return `<div class="ni${k !== 'tome' ? ' top' : ''}${st.folder === k ? ' on' : ''}${n && k !== 'draft' ? ' unread' : ''}" data-f="${k}" data-sys="${k}" style="padding-left:${14 + depth * 22}px"><span class="ic">${ico(v.ic)}</span><span class="nm">${v.name}</span><span class="n">${n}</span></div>`; };
  // 받은편지함 └ 나에게 온 메일 연결선
  let h = sysItem('inbox', 0) + sysItem('tome', 1).replace('<span class="ic">', '<i class="g e" style="left:22px"></i><span class="ic">') + sysItem('sent', 0) + sysItem('draft', 0);
  h += `<div class="nh">메일함<button class="ib" id="addBox" title="메일함 만들기" style="width:26px;height:26px">${ico('plus', 15)}</button></div>`;
  const nHidden = BOXES.filter(b => b.hidden).length;
  const shown = p => childrenOf(p).filter(b => !b.hidden || SET.showHidden);
  // 상·하위 연결선: cont[k] = k단계 세로선이 아래로 계속 이어지는지
  const walk = (parent, depth, cont) => { const list = shown(parent); list.forEach((b, i) => {
    const last = i === list.length - 1;
    const kids = shown(b.id).length, col = st.collapsed.has(b.id), n = unread(folderFn(b.id));
    let g = '';
    cont.forEach((c, k) => { if (c) g += `<i class="g v" style="left:${16 + k * 18}px"></i>`; });
    if (depth > 0) g += `<i class="g ${last ? 'e' : 't'}${kids ? '' : ' nk'}" style="left:${16 + (depth - 1) * 18}px"></i>`;
    h += `<div class="ni${depth === 0 ? ' top' : ''}${st.folder === b.id ? ' on' : ''}${n ? ' unread' : ''}${b.hidden ? ' hid' : ''}" data-f="${b.id}" data-box="${b.id}" draggable="true" style="padding-left:${8 + depth * 18}px">${g}
      <span class="tw" data-tw="${b.id}">${kids ? ico(col ? 'right' : 'down') : ''}</span><span class="ic">${ico('folder', 17)}</span>
      <span class="nm">${esc(b.name)}</span><span class="n">${n}</span><button class="ib dots" data-dots="${b.id}" title="메일함 메뉴">${ico('more', 16)}</button></div>`;
    if (kids && !col) walk(b.id, depth + 1, depth > 0 ? [...cont, !last] : []);
  }); };
  walk(null, 0, []);
  if (nHidden) h += `<button class="hidtoggle" id="hidToggle">${SET.showHidden ? '숨긴 메일함 감추기' : `숨긴 메일함 ${nHidden}개 보기`}</button>`;
  $('#nav').innerHTML = h;
}
/* 메일함 메뉴 (⋮ · 우클릭) */
function boxMenu(anchor, id, at) {
  const b = boxById(id); if (!b) return;
  const row = $(`.ni[data-box="${id}"]`); if (row) row.classList.add('menu-open');
  const m = menuAt(anchor, [
    { html: ico('read2', 16) + ' 모두 읽음으로 표시', act: () => { const ids = descIds(id); let n = 0; MAILS.forEach(x => { if (ids.includes(x.box) && x.unread) { x.unread = 0; n++; } }); renderNav(); renderList();
      if (!real.on) { toast(`'${b.name}' 메일 ${n}통을 읽음으로 표시했어요`); return; }
      // 화면에 안 불러온 메일까지 Gmail에서 이 메일함의 안 읽은 메일 전부
      sync('모두 읽음', async () => { let total = 0; for (const lid of ids) { const r = await gapi(`messages?labelIds=${lid}&labelIds=UNREAD&maxResults=500`); const g = (r.messages || []).map(x => x.id); if (g.length) { await gapi('messages/batchModify', { method: 'POST', body: { ids: g, removeLabelIds: ['UNREAD'] } }); total += g.length; } } toast(`'${b.name}' 메일 ${total}통을 읽음으로 표시했어요`); }); } },
    { html: ico('rename', 16) + ' 이름 바꾸기', act: () => renameBox(id) },
    { html: ico('gear', 16) + ' 메일함 관리', act: () => openSettings('boxes') },
    { html: ico('hide', 16) + (b.hidden ? ' 다시 보이기' : ' 숨기기'), act: () => { const hide = !b.hidden; descIds(id).forEach(x => { boxById(x).hidden = hide; }); if (hide && descIds(id).includes(st.folder)) st.folder = 'inbox'; saveAll(); if (real.on) store.set('real-hidden', BOXES.filter(x => x.hidden).map(x => x.id)); renderNav(); renderTop(); renderList(); toast(hide ? `'${b.name}'을(를) 숨겼어요` : `'${b.name}'이(가) 다시 보여요`); } },
    '-',
    { html: ico('trash', 16) + ' 삭제', act: () => deleteBox(id) }
  ], false, at);
  m._onClose = () => row && row.classList.remove('menu-open');
}
function renameBox(id) {
  const row = $(`.ni[data-box="${id}"]`); const b = boxById(id); if (!row || !b) return;
  const nm = $('.nm', row); const inp = document.createElement('input'); inp.className = 'ren'; inp.value = b.name;
  nm.replaceWith(inp); inp.focus(); inp.select();
  let done = false;
  const finish = ok => { if (done) return; done = true; const old = b.name; if (ok && inp.value.trim()) b.name = inp.value.trim(); saveAll(); renderNav(); renderList(); renderRead();
    if (!real.on) return;
    if (b.pending) { b.pending = false; sync('메일함 만들기', async () => { const r = await gapi('labels', { method: 'POST', body: { name: labelPath(b.id), labelListVisibility: 'labelShow', messageListVisibility: 'show' } }); const oldId = b.id; b.id = r.id; if (st.folder === oldId) st.folder = r.id; renderNav(); toast(`Gmail에 '${labelPath(b.id)}' 메일함을 만들었어요`); }).catch(() => { BOXES = BOXES.filter(x => x !== b); renderNav(); }); return; }
    if (b.name !== old) renamePaths(id).catch(() => { b.name = old; renderNav(); });
  };
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') finish(true); if (e.key === 'Escape') finish(false); e.stopPropagation(); });
  inp.addEventListener('blur', () => finish(true));
  inp.addEventListener('click', e => e.stopPropagation());
}
// Gmail 라벨은 '상위/하위' 전체 경로가 이름 → 상위가 바뀌면 하위도 전부 고침
function renamePaths(id) { return sync('메일함 이름', async () => { for (const x of descIds(id)) await gapi('labels/' + x, { method: 'PATCH', body: { name: labelPath(x) } }); toast('Gmail 메일함 이름을 바꿨어요'); }); }
async function deleteBox(id) {
  if (real.on) {
    const ids = descIds(id), b = boxById(id);
    try { let n = 0; for (const x of ids) n += (await gapi('labels/' + x)).messagesTotal || 0; if (n) { toast(`'${b.name}'에 메일 ${n}통이 있어요. 먼저 다른 곳으로 옮겨 주세요`); return; } } catch (e) { toast(e.message); return; }
    if (!confirm(`Gmail에서 '${labelPath(id)}' 메일함을 삭제할까요? (비어 있는 메일함이에요)`)) return;
    sync('메일함 삭제', async () => { for (const x of ids.slice().reverse()) await gapi('labels/' + x, { method: 'DELETE' }); BOXES = BOXES.filter(x => !ids.includes(x.id)); if (ids.includes(st.folder)) st.folder = 'inbox'; renderNav(); renderList(); toast('메일함을 삭제했어요'); });
    return;
  }
  const ids = descIds(id); const n = MAILS.filter(m => ids.includes(m.box)).length;
  if (n) { toast(`이 메일함에 메일 ${n}통이 있어요. 먼저 다른 곳으로 옮겨 주세요`); return; }
  const before = BOXES.slice();
  BOXES = BOXES.filter(x => !ids.includes(x.id)); if (ids.includes(st.folder)) st.folder = 'inbox';
  saveAll(); renderNav(); renderList();
  toast('메일함을 삭제했어요', () => { BOXES = before; saveAll(); renderNav(); });
}

/* ───────── 떠 있는 메뉴·팔레트 공통 ───────── */
function placeMenu(m, anchor, at) {
  document.body.append(m);
  const r = at ? { left: at.x, bottom: at.y, top: at.y } : anchor.getBoundingClientRect();
  let left = Math.min(r.left, innerWidth - m.offsetWidth - 8), top = r.bottom + 4;
  if (top + m.offsetHeight > innerHeight - 8) top = Math.max(8, (r.top || top) - m.offsetHeight - 4);
  m.style.left = Math.max(8, left) + 'px'; m.style.top = top + 'px'; m._btn = at ? null : anchor;
  const outside = e => { if (!m.contains(e.target) && !(anchor && anchor.contains && anchor.contains(e.target) && !at)) closeMenus(); };
  setTimeout(() => document.addEventListener('mousedown', outside, true));
  m._off = outside;
}
function menuAt(btn, items, keepOpen, at) {
  closeMenus();
  const m = document.createElement('div'); m.className = 'menu';
  items.forEach(it => {
    if (!it) return;
    if (it === '-') { m.insertAdjacentHTML('beforeend', '<div class="msep"></div>'); return; }
    if (it.head) { m.insertAdjacentHTML('beforeend', `<div class="mh${it.big ? ' big' : ''}">${esc(it.head)}</div>`); return; }
    if (it.node) { m.append(it.node); return; }
    const el = document.createElement(it.check != null ? 'label' : 'div');
    el.className = 'mi' + (it.on ? ' on' : '') + (it.dis ? ' dis' : '');
    el.innerHTML = it.check != null ? `<input type="checkbox"${it.check ? ' checked' : ''}> ${esc(it.label)}` : `<span class="chk">${it.on ? '✓' : ''}</span>${it.html || esc(it.label)}`;
    el.addEventListener(it.check != null ? 'change' : 'click', e => { it.act(e); if (!keepOpen && it.check == null) closeMenus(); });
    m.append(el);
  });
  placeMenu(m, btn, at);
  return m;
}
// 같은 버튼을 다시 누르면 닫기
function toggleMenu(btn, open) { const cur = $('.menu'); if (cur && cur._btn === btn) { closeMenus(); return; } open(); }
function closeMenus() { $$('.menu').forEach(m => { document.removeEventListener('mousedown', m._off, true); if (m._onClose) m._onClose(); m.remove(); }); }
function paletteMenu(anchor, colors, cur, pick, noneLabel) {
  closeMenus();
  const m = document.createElement('div'); m.className = 'menu';
  m.innerHTML = (noneLabel ? `<button class="palnone">${esc(noneLabel)}</button>` : '') + `<div class="pal" style="grid-template-columns:repeat(10,20px)">${colors.map(c => `<span data-c="${c}" title="${c}" class="${c === cur ? 'on' : ''}" style="background:${c}"></span>`).join('')}</div>`;
  m.addEventListener('mousedown', e => { e.preventDefault(); const s = e.target.closest('[data-c]'); if (s) { pick(s.dataset.c); closeMenus(); } if (e.target.closest('.palnone')) { pick(null); closeMenus(); } });
  placeMenu(m, anchor);
}

/* ───────── 위쪽: 검색 + 아이콘 드롭다운 필터 ───────── */
const PERIODS = [['all', '전체'], ['0', '오늘'], ['7', '1주'], ['30', '1개월']];
const ATYPES = [['XLS', '엑셀'], ['PPT', '파워포인트'], ['PDF', 'PDF'], ['DOC', '워드'], ['IMG', '이미지'], ['ZIP', '압축']];
function renderTop() {
  const f = st.f;
  $('#newMail').innerHTML = ico('pen') + ' 새 메일';
  $('#goSearch').innerHTML = ico('search');
  $('#gear').innerHTML = ico('gear', 20);
  let pill = $('#srcPill'); if (!pill) { pill = document.createElement('span'); pill.id = 'srcPill'; $('#gear').before(pill); }
  const R = typeof real !== 'undefined' ? real : {};
  pill.className = 'srcpill' + (R.expired ? ' warn' : R.on ? ' real' : '');
  pill.textContent = R.expired ? 'Gmail 다시 연결하기 (클릭)' : R.prog ? R.prog : R.on ? `Gmail · ${ME.email}` : '예시 메일';
  pill.title = R.expired ? '로그인이 만료됐어요. 누르면 다시 연결해요' : '';
  pill.onclick = R.expired ? () => loadReal(true) : null;
  const set = (id, ic, on, tip) => { const b = $(id); b.innerHTML = ico(ic); b.classList.toggle('on', !!on); b.title = tip; };
  set('#fBox', 'folder', st.folder !== 'inbox', '메일함: ' + folderName(st.folder));
  set('#fWhere', 'where', f.where !== 'all' || f.exclude || f.exact, '검색 범위: ' + (f.where === 'subj' ? '제목만' : '제목+내용') + (f.exact ? ' · 정확히 일치' : '') + (f.exclude ? ' · 제외: ' + f.exclude : ''));
  const p = f.period.k === 'range' ? fmtD(f.period.from) + '~' + fmtD(f.period.to) : PERIODS.find(x => x[0] === f.period.k)[1];
  set('#fPeriod', 'cal', f.period.k !== 'all', '기간: ' + p);
  const a = f.att.k === 'any' ? '전체' : f.att.k === 'no' ? '없음' : '있음' + (f.att.types.length ? '(' + f.att.types.map(t => ATYPES.find(x => x[0] === t)[1]).join('·') + ')' : '');
  set('#fAtt', 'clip', f.att.k !== 'any', '첨부: ' + a);
  set('#fRead', 'eye', f.readf !== 'all', { all: '읽음: 전체', unread: '안 읽은 메일', read: '읽은 메일' }[f.readf]);
  set('#fFrom', 'from', f.from, '보낸사람: ' + (f.from || '전체'));
  set('#fTo', 'to', f.to, '받는사람: ' + (f.to || '전체'));
}
function boxPickItems(cur, pick) {
  const items = ['all', 'inbox', 'tome', 'sent', 'draft'].map(k => ({ html: ico(SYS[k].ic, 16) + ' ' + SYS[k].name, on: cur === k, act: () => pick(k) }));
  items.push('-', { head: '메일함' });
  const walk = (p, dep) => childrenOf(p).forEach(b => { items.push({ on: cur === b.id, html: boxLabel(b, dep), act: () => pick(b.id) }); walk(b.id, dep + 1); });
  walk(null, 0);
  return items;
}
function boxFilterMenu() { menuAt($('#fBox'), [{ head: '어느 메일함에서 볼까요? (검색도 이 안에서)' }, ...boxPickItems(st.folder, k => { st.folder = k; st.picked.clear(); renderNav(); renderTop(); renderList(); })]); }
function whereMenu() {
  const f = st.f;
  const node = document.createElement('div');
  node.innerHTML = `<div class="mh">제외할 단어 (쉼표로 여러 개)</div><div class="mrow"><input type="text" id="exIn" placeholder="예: 광고, 뉴스레터" value="${esc(f.exclude)}"></div>`;
  $('input', node).addEventListener('input', e => { f.exclude = e.target.value; renderTop(); renderList(); });
  return menuAt($('#fWhere'), [
    { label: '제목+내용', on: f.where === 'all', act: () => { f.where = 'all'; renderTop(); renderList(); whereMenu(); } },
    { label: '제목만', on: f.where === 'subj', act: () => { f.where = 'subj'; renderTop(); renderList(); whereMenu(); } },
    '-', { label: '띄어쓰기까지 정확히 일치', check: f.exact, act: () => { f.exact = !f.exact; renderTop(); renderList(); } },
    '-', { node }
  ], true);
}
function periodMenu() {
  const f = st.f; const set = k => { f.period = { k }; renderTop(); renderList(); };
  menuAt($('#fPeriod'), [
    ...PERIODS.map(([k, v]) => ({ label: v, on: f.period.k === k, act: () => set(k) })),
    '-', { label: '선택 기간…', on: f.period.k === 'range', act: () => openCalendar() }
  ]);
}
function attMenu() {
  const f = st.f; const re = () => { renderTop(); renderList(); attMenu(); };
  menuAt($('#fAtt'), [
    { label: '전체', on: f.att.k === 'any', act: () => { f.att = { k: 'any', types: [] }; re(); } },
    { label: '첨부파일 있음', on: f.att.k === 'yes', act: () => { f.att.k = 'yes'; re(); } },
    { label: '첨부파일 없음', on: f.att.k === 'no', act: () => { f.att = { k: 'no', types: [] }; re(); } },
    '-', { head: '파일 종류 (고르면 자동으로 \'있음\')' },
    ...ATYPES.map(([t, n]) => ({ label: n, check: f.att.types.includes(t), act: () => {
      const s = new Set(f.att.types); s.has(t) ? s.delete(t) : s.add(t);
      f.att = { k: s.size ? 'yes' : (f.att.k === 'no' ? 'any' : f.att.k), types: [...s] }; renderTop(); renderList();
    } }))
  ], true);
}
function readMenu() {
  const set = k => { st.f.readf = k; renderTop(); renderList(); };
  menuAt($('#fRead'), [{ label: '전체', on: st.f.readf === 'all', act: () => set('all') }, { label: '안 읽은 메일', on: st.f.readf === 'unread', act: () => set('unread') }, { label: '읽은 메일', on: st.f.readf === 'read', act: () => set('read') }]);
}
// 보낸사람·받는사람: 최근 많이 주고받은 사람 순 추천 + 이름·주소 입력 자동완성
function personMenu(kind) {
  const btn = kind === 'from' ? $('#fFrom') : $('#fTo');
  const cnt = new Map();
  MAILS.forEach(m => { const ps = kind === 'from' ? [m.from] : [...m.to, ...m.cc]; ps.forEach(p => { if (!isMe(p)) cnt.set(p.email, (cnt.get(p.email) || 0) + 1 + (m.d < 7 ? 1 : 0)); }); });
  const people = CONTACTS.filter(p => !isMe(p) && cnt.has(p.email)).sort((a, b) => cnt.get(b.email) - cnt.get(a.email));
  const node = document.createElement('div');
  node.innerHTML = `<div class="mrow"><input type="text" placeholder="이름이나 메일 주소" autocomplete="off"></div><div class="list2"></div>`;
  const inp = $('input', node), box = $('.list2', node);
  const cur = st.f[kind];
  const draw = () => {
    const q = inp.value.trim().toLowerCase();
    const list = (q ? people.filter(p => p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q)) : people).slice(0, q ? 12 : 8);
    box.innerHTML = `<div class="mi${!cur ? ' on' : ''}" data-e=""><span class="chk">${!cur ? '✓' : ''}</span>전체</div>` + (q ? '' : '<div class="mh">최근 자주 주고받은 사람</div>') +
      list.map(p => `<div class="mi${cur === p.email ? ' on' : ''}" data-e="${esc(p.email)}"><span class="chk">${cur === p.email ? '✓' : ''}</span><i style="width:8px;height:8px;border-radius:50%;background:${dotColor(p.email)}"></i>${esc(p.name)} <small style="color:var(--mute)">${esc(p.email)}</small></div>`).join('') +
      (q && !list.length ? '<div class="mh">맞는 사람이 없어요</div>' : '');
  };
  box.addEventListener('click', e => { const it = e.target.closest('[data-e]'); if (!it) return; st.f[kind] = it.dataset.e || null; closeMenus(); renderTop(); renderList(); });
  inp.addEventListener('input', draw);
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') { const first = $('[data-e]:not([data-e=""])', box); if (first) first.click(); } });
  draw();
  menuAt(btn, [{ head: kind === 'from' ? '보낸사람' : '받는사람 (참조 포함)', big: true }, { node }], true);
  setTimeout(() => inp.focus());
}
/* 달력 (시작일·종료일) */
function openCalendar() {
  let from = st.f.period.from || null, to = st.f.period.to || null;
  let base = new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, 1);
  const bg = document.createElement('div'); bg.className = 'modal-bg';
  bg.innerHTML = `<div class="modal"><h3>기간 선택</h3><div class="mbody"><div class="cal" id="cal"></div><div class="calinfo" id="calinfo"></div></div>
    <div class="mfoot"><button class="btn" data-x>취소</button><button class="btn pri" data-ok>적용</button></div></div>`;
  document.body.append(bg);
  const same = (a, b) => a && b && a.getTime() === b.getTime();
  function draw() {
    const mon = off => {
      const m0 = new Date(base.getFullYear(), base.getMonth() + off, 1);
      const days = new Date(m0.getFullYear(), m0.getMonth() + 1, 0).getDate();
      let g = '일월화수목금토'.split('').map(w => `<span class="wd">${w}</span>`).join('') + '<span></span>'.repeat(m0.getDay());
      for (let i = 1; i <= days; i++) {
        const d = new Date(m0.getFullYear(), m0.getMonth(), i);
        g += `<span class="${['d', (from && to && d > from && d < to) ? 'in' : '', (same(d, from) || same(d, to)) ? 'edge' : '', same(d, TODAY) ? 'today' : ''].join(' ')}" data-t="${d.getTime()}">${i}</span>`;
      }
      return `<div class="mon"><div class="mt">${off === 0 ? '<button class="ib" data-nav="-1">‹</button>' : '<span></span>'}<span>${m0.getFullYear()}년 ${m0.getMonth() + 1}월</span>${off === 1 ? '<button class="ib" data-nav="1">›</button>' : '<span></span>'}</div><div class="g">${g}</div></div>`;
    };
    $('#cal', bg).innerHTML = mon(0) + mon(1);
    $('#calinfo', bg).textContent = from ? (to ? `${fmtD(from)} ~ ${fmtD(to)}` : `${fmtD(from)} ~ (종료일을 고르세요)`) : '시작일을 고르세요';
  }
  bg.addEventListener('click', e => {
    const nv = e.target.closest('[data-nav]'); if (nv) { base = new Date(base.getFullYear(), base.getMonth() + (+nv.dataset.nav), 1); draw(); return; }
    const d = e.target.closest('[data-t]');
    if (d) { const x = new Date(+d.dataset.t); if (!from || to) { from = x; to = null; } else if (x < from) { to = from; from = x; } else to = x; draw(); return; }
    if (e.target.closest('[data-ok]')) { if (from) { st.f.period = { k: 'range', from, to: to || from }; renderTop(); renderList(); } bg.remove(); }
    if (e.target.closest('[data-x]') || e.target === bg) bg.remove();
  });
  draw();
}
/* 검색: 입력하는 동안 아래 목록이 바로 걸러지고, 검색창 아래엔 추천(사람·메일)이 뜸 */
function queryMatch(m, raw) {
  const f = st.f; const q = (raw || '').trim();
  const hay = f.where === 'subj' ? m.subj : [m.subj, m.body, m.from.name, m.from.email].join(' ');
  if (f.exclude) { const ex = f.exclude.split(/[,，]/).map(s => s.trim().toLowerCase()).filter(Boolean); if (ex.some(w => hay.toLowerCase().includes(w))) return false; }
  if (!q) return true;
  if (f.exact) return hay.includes(q);
  return q.toLowerCase().split(/\s+/).every(w => hay.toLowerCase().includes(w));
}
function renderSugg() {
  const q = st.q.trim(), box = $('#sugg');
  if (!q || document.activeElement !== $('#q')) { box.classList.remove('on'); return; }
  const hl = s => { const i = s.toLowerCase().indexOf(q.toLowerCase()); return i < 0 ? esc(s) : esc(s.slice(0, i)) + '<mark>' + esc(s.slice(i, i + q.length)) + '</mark>' + esc(s.slice(i + q.length)); };
  const ppl = CONTACTS.filter(p => !isMe(p) && (p.name.includes(q) || p.email.toLowerCase().includes(q.toLowerCase()))).slice(0, 3);
  const mails = visible().slice(0, 6);
  box.innerHTML = (ppl.length ? '<div class="sh">사람 — 누르면 보낸사람으로 거르기</div>' + ppl.map(p => `<div class="si" data-p="${esc(p.email)}">${ico('me', 16)}<span class="s1">${hl(p.name)} <small style="color:var(--mute)">${hl(p.email)}</small></span></div>`).join('') : '') +
    (mails.length ? `<div class="sh">메일 · ${esc(folderName(st.folder))}</div>` + mails.map(m => `<div class="si" data-id="${m.id}">${ico('env', 16)}<span class="s1">${hl(m.subj)}</span><span class="s2">${esc(m.from.name)} · ${dateLabel(m)}</span></div>`).join('') : '<div class="sh">맞는 메일이 없어요</div>');
  box.classList.add('on');
}

/* ───────── 가운데: 목록 ───────── */
function visible() {
  const f = st.f;
  return MAILS.filter(folderFn(st.folder)).filter(m => {
    const p = f.period, day = dayOf(m);
    if (p.k === 'range') { if (day < p.from || day > p.to) return false; } else if (p.k !== 'all' && m.d > +p.k) return false;
    const A = attsOf(m);
    if (f.att.k === 'yes' && !A.length) return false;
    if (f.att.k === 'no' && A.length) return false;
    if (f.att.types.length && !A.some(([a]) => f.att.types.includes(a[0]))) return false;
    if (f.readf === 'unread' && !m.unread) return false;
    if (f.readf === 'read' && m.unread) return false;
    if (f.from && m.from.email !== f.from) return false;
    if (f.to && ![...m.to, ...m.cc].some(p => p.email === f.to)) return false;
    return queryMatch(m, st.q);
  }).sort((a, b) => a.d - b.d || b.t.localeCompare(a.t));
}
const grpName = (d, m) => d === 0 ? '오늘' : d === 1 ? '어제' : d <= 7 ? '이번 주' : d <= 31 ? '이번 달' : (m ? (dayOf(m).getFullYear() !== TODAY.getFullYear() ? dayOf(m).getFullYear() + '년 ' : '') + (dayOf(m).getMonth() + 1) + '월' : '이전');
// 목록 미리보기 한 줄: 본문 앞부분 (인용·빈 줄 제외)
const snipOf = m => (m.snippet || m.body || '').replace(/\s+/g, ' ').trim().slice(0, 200);
const dateLabel = m => m.d === 0 ? m.t : fmtD(dayOf(m));
// 파일 종류 아이콘 (글자 대신 색·모양으로 구분)
const FT_ICON = { XLS: ['#188038', 'M9 12h8M9 15h8M9 18h8M13 11v8'], PPT: ['#d24726', 'M9 18v-3M12 18v-6M15 18v-4'], PDF: ['#d93025', 'M9 13h7M9 16h7M9 19h4'],
  DOC: ['#1a5dc8', 'M9 12h8M9 15h8M9 18h5'], IMG: ['#8430ce', 'M8 19l3-4 2 2 2-3 2.5 5zM10 12h.01'], ZIP: ['#6b7280', 'M13 9v1M13 11v1M13 13v1M12 15h2v3h-2z'], FILE: ['#6b7280', 'M9 13h7M9 16h7'] };
const ftIcon = (t, sz) => { const [c, g] = FT_ICON[t] || FT_ICON.FILE; return `<svg class="fti" viewBox="0 0 24 24" style="width:${sz || 15}px;height:${sz || 15}px" aria-label="${t}"><path d="M6 2.5h9l4.5 4.5v14.5H6z" fill="${c}"/><path d="M15 2.5V7h4.5" fill="#fff" fill-opacity=".35"/><path d="${g}" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`; };
const baseName = n => n.replace(/\.[a-z0-9]{1,5}$/i, '');
// 본문 안에 들어간 그림(서명 로고 등)은 첨부로 안 보여 줌
const attsOf = m => m.att.map((a, i) => [a, i]).filter(([a]) => !(a[3] && a[3].inline));
const ftBadges = list => list.map(([[t, n]]) => `<span class="mini" title="${esc(n)}">${ftIcon(t)}<span class="nm">${esc(baseName(n))}</span></span>`).join('');
// 첨부 줄이 넘치면: 1) 파일 이름 숨기고 종류 표시만 2) 그래도 넘치면 뒤쪽을 '…+N'으로
function fitAttRows() {
  $$('#rows .l3').forEach(l => {
    if (l.scrollWidth <= l.clientWidth + 1) return;
    l.classList.add('compact');
    const minis = $$('.mini', l); let hidden = 0;
    while (l.scrollWidth > l.clientWidth + 1 && hidden < minis.length) {
      minis[minis.length - 1 - hidden].style.display = 'none'; hidden++;
      let more = $('.more', l); if (!more) { more = document.createElement('span'); more.className = 'more'; l.append(more); }
      more.textContent = '…+' + hidden;
    }
  });
}
function renderList() {
  const list = visible();
  [...st.picked].forEach(id => { if (!list.some(m => m.id === id)) st.picked.delete(id); });
  renderHead(list);
  renderSugg();
  if (!list.length) { $('#rows').innerHTML = '<div class="empty">조건에 맞는 메일이 없어요</div>'; return; }
  let g = '', h = '';
  list.forEach(m => {
    const gn = grpName(m.d, m);
    if (gn !== g) { g = gn; h += `<div class="grp">${gn}</div>`; }
    const who = m.sent ? esc('받는사람: ' + m.to.map(nameOf).join(', ')) : `${esc(m.from.name)}${m.from.email && m.from.email.includes('@') ? ` <span class="dom">${esc(m.from.email.split('@')[1])}</span>` : ''}`;
    h += `<div class="row${m.unread ? ' unread' : ''}${st.open === m.id ? ' open' : ''}${st.picked.has(m.id) ? ' picked' : ''}" data-id="${m.id}" draggable="true">
      <input type="checkbox" class="ck"${st.picked.has(m.id) ? ' checked' : ''}><div class="mid">
      <div class="l1"><span class="who">${who}</span><span class="dt">${dateLabel(m)}</span></div>
      <div class="subj">${m.draft ? '<span class="draft">작성 중</span> ' : ''}${esc(m.subj)}</div>
      <div class="snip">${esc(snipOf(m)) || '&nbsp;'}</div>
      ${attsOf(m).length ? `<div class="l3">${ftBadges(attsOf(m))}</div>` : ''}
    </div></div>`;
  });
  $('#rows').innerHTML = h;
  fitAttRows();
}
function renderHead(list) {
  // 체크한 메일이 없어도, 목록에서 눌러서 열어 둔 메일이 있으면 그 메일에 적용
  const n = st.picked.size, all = list.length && list.every(m => st.picked.has(m.id)), dis = (n || list.some(m => m.id === st.open)) ? '' : ' disabled';
  $('#lhead').innerHTML = `<input type="checkbox" class="ck" id="ckAll" title="모두 선택"${all ? ' checked' : ''}>
    <span class="cnt">${n ? `<b>${n}개 선택</b>` : `${esc(folderName(st.folder))} · ${list.length}통`}</span>
    <button class="btn" data-b="move"${dis}>${ico('move', 15)} 이동</button><button class="btn" data-b="read"${dis}>읽음</button><button class="btn" data-b="unread"${dis}>안 읽음</button><button class="ib" data-b="del" title="삭제"${dis}>${ico('trash', 17)}</button>`;
  const ca = $('#ckAll'); if (ca) ca.indeterminate = n > 0 && !all;
}
function pickClick(id, e) {
  const list = visible().map(m => m.id);
  if (e.shiftKey && st.anchor != null) {
    const a = list.indexOf(st.anchor), b = list.indexOf(id);
    if (a >= 0 && b >= 0) list.slice(Math.min(a, b), Math.max(a, b) + 1).forEach(x => st.picked.add(x));
  } else { st.picked.has(id) ? st.picked.delete(id) : st.picked.add(id); st.anchor = id; }
  renderList();
}
function bulk(act, btn) {
  const ids = st.picked.size ? [...st.picked] : st.open != null ? [st.open] : []; if (!ids.length) return;
  const sel = new Set(ids);
  if (act === 'read' || act === 'unread') { MAILS.forEach(m => { if (sel.has(m.id)) m.unread = act === 'unread' ? 1 : 0; }); toast(`${ids.length}통을 ${act === 'read' ? '읽음' : '안 읽음'}으로 표시했어요`); act === 'read' ? syncLabels(ids, [], ['UNREAD'], '읽음') : syncLabels(ids, ['UNREAD'], [], '안 읽음'); }
  if (act === 'del') trashMails(ids);
  if (act === 'move') { moveMenu(btn, ids); return; }
  renderNav(); renderList();
}
function moveMenu(btn, ids) {
  const items = [];
  const walk = (p, dep) => childrenOf(p).forEach(b => { items.push({ html: boxLabel(b, dep), act: () => moveTo(ids, b.id) }); walk(b.id, dep + 1); });
  walk(null, 0);
  menuAt(btn, [{ head: '어느 메일함으로 옮길까요?' }, ...items]);
}
// 삭제 = Gmail 휴지통으로 (30일 동안 되살릴 수 있음, 되돌리기 누르면 바로 복구)
function trashMails(ids) {
  const sel = new Set(ids), before = MAILS.slice(), g = gidsOf(ids);
  real.gone = real.gone || new Set(); g.forEach(x => real.gone.add(x));
  MAILS = MAILS.filter(m => !sel.has(m.id)); if (sel.has(st.open)) st.open = null; st.picked.clear();
  renderNav(); renderList(); renderRead();
  sync('휴지통 이동', () => Promise.all(g.map(x => gapi(`messages/${x}/trash`, { method: 'POST' }))));
  toast(`${ids.length}통을 ${real.on ? '휴지통으로 옮겼어요' : '삭제했어요'}`, () => { g.forEach(x => real.gone.delete(x)); MAILS = before; renderNav(); renderList(); sync('복구', () => Promise.all(g.map(x => gapi(`messages/${x}/untrash`, { method: 'POST' })))); });
}
// 메일함으로 옮기면 받은편지함에서는 빠짐 (Gmail의 '보관처리+라벨'과 같음)
function moveTo(ids, boxId) {
  const before = MAILS.map(m => [m.id, m.box, m.inbox]);
  const olds = [...new Set(MAILS.filter(m => ids.includes(m.id) && m.box && m.box !== boxId).map(m => m.box))];
  MAILS.forEach(m => { if (ids.includes(m.id)) { m.box = boxId; m.inbox = 0; } });
  st.picked.clear(); renderNav(); renderList(); renderRead();
  syncLabels(ids, [boxId], ['INBOX', ...olds], '메일함 이동');
  toast(`${ids.length}통을 '${boxPath(boxId)}'(으)로 옮겼어요`, () => {
    before.forEach(([id, b, i]) => { const m = MAILS.find(x => x.id === id); if (m && ids.includes(id)) { m.box = b; m.inbox = i; if (real.on) syncLabels([id], [...(b ? [b] : []), ...(i ? ['INBOX'] : [])], b === boxId ? [] : [boxId], '되돌리기'); } });
    renderNav(); renderList(); renderRead(); });
}

/* ───────── 오른쪽: 읽기 ───────── */
function personLine(list) { return list.map(p => isMe(p) ? '<span class="me">나</span>' : `${esc(p.name)} <span style="color:var(--mute)">&lt;${esc(p.email)}&gt;</span>`).join(', '); }
function prevHtml(prev, i) {
  if (i >= prev.length) return '';
  const p = prev[i];
  return `<div class="prev"><div class="ph"><b>보낸 사람:</b> ${esc(p.from.name)} &lt;${esc(p.from.email)}&gt;<br><b>보낸 날짜:</b> ${fmtD(dayOf(p))} ${p.t}<br><b>받는 사람:</b> ${p.to.map(x => esc(x.name)).join(', ')}${p.cc.length ? `<br><b>참조:</b> ${p.cc.map(x => esc(x.name)).join(', ')}` : ''}</div>
    <div class="txt">${esc(p.body)}</div>${prevHtml(prev, i + 1)}</div>`;
}
function renderRead() {
  const m = MAILS.find(x => x.id === st.open);
  if (!m) { $('#view').innerHTML = '<div class="blank">목록에서 메일을 고르세요</div>'; return; }
  const toMe = m.to.some(isMe);
  $('#view').innerHTML = `
    <div class="rhead"><h2>${esc(m.subj)}</h2>
      <div class="hrow">
        <div class="people">
          <div class="from">${esc(m.from.name)}<span class="addr">&lt;${esc(m.from.email)}&gt;</span></div>
          <div class="pl${toMe ? ' tome' : ''}"><span class="k">수신</span>${personLine(m.to)}</div>
          ${m.cc.length ? `<div class="pl"><span class="k">참조</span>${personLine(m.cc)}</div>` : ''}
          ${m.box ? `<div class="boxchip">${ico('folder', 13)}${esc(boxPath(m.box))}</div>` : ''}
        </div>
        <div class="racts">
          <div class="bar">
            <button class="btn" data-act="reply">${ico('reply', 16)} 답장</button><button class="btn" data-act="all">${ico('replyall', 16)} 전체답장</button><button class="btn" data-act="fwd">${ico('fwd', 16)} 전달</button>
            <button class="ib" data-act="more" title="이동·삭제">${ico('more', 18)}</button><button class="ib" data-act="popview" title="새 창에서 보기">${ico('pop')}</button>
          </div>
          <span class="when">${m.d === 0 ? '오늘' : fmtD(dayOf(m))} ${m.t}</span>
        </div>
      </div>
    </div>
    ${attsOf(m).length ? `<div class="attbar"><b>${ico('clip', 16)} 첨부 ${attsOf(m).length}</b>${attsOf(m).map(([[t, n, s], i]) => `<span class="att" data-ai="${i}" title="${esc(n)} · 누르면 새 창에서 미리보기">${ftIcon(t, 17)}${esc(n)} <small>${s}</small></span>`).join('')}</div>` : ''}
    ${m.draft ? `<div class="dbanner"><span>${ico('pen', 16)} 이 대화에 작성 중이던 답장이 있어요</span><button data-act="draft">이어서 쓰기</button><button class="ib" data-act="deldraft" title="작성 중이던 메일 삭제">${ico('trash', 17)}</button></div>` : ''}
    <div class="rbody">${m.real && !m.full ? '<div class="blank" style="padding:40px 0">본문 불러오는 중…</div>' : m.html ? '<iframe class="mailhtml" sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>' : `<div class="txt">${esc(m.body)}</div>${prevHtml(m.prev, 0)}`}</div>`;
  const fr = $('#view iframe.mailhtml');
  if (fr) {
    fr.addEventListener('load', () => { try { const d = fr.contentDocument; fr.style.height = Math.max(d.documentElement.scrollHeight, d.body.scrollHeight) + 20 + 'px'; } catch (e) { fr.style.height = '70vh'; } });
    const css = '<base target="_blank"><style>html{overflow-x:auto;overflow-y:hidden}body{margin:0;font:14.5px/1.65 Pretendard,"Malgun Gothic",sans-serif;color:#1f1f1f;word-break:break-word}</style>';
    const show = h => { if ($('#view iframe.mailhtml') === fr) fr.srcdoc = css + h; };
    if (m.htmlReady) show(m.htmlReady);
    else { show(m.html.replace(/src=["']?cid:[^"'\s>]+["']?/gi, 'src="data:image/gif;base64,R0lGODlhAQABAAAAACw="')); resolveInline(m).then(show); }
  }
}
// 메일을 여는 즉시 읽음
function openMail(id) {
  flushCompose();
  st.open = id;
  const m = MAILS.find(x => x.id === id);
  if (m && m.unread) { m.unread = 0; if (real.lab) real.lab.unread.delete(m.gid); syncLabels([id], [], ['UNREAD'], '읽음'); }
  if (m && m.real && !m.full) fetchFull(m);
  $('#read').classList.remove('composing');
  renderNav(); renderList(); renderRead();
}
function previewAtt(m, i) {
  if (m.real) { openRealAtt(m, m.att[i]); return; }
  const [t, n, s] = m.att[i];
  const data = encodeURIComponent(JSON.stringify({ t, n, s, from: m.from.name, subj: m.subj }));
  window.open('preview.html#' + data, '_blank', 'popup,width=1100,height=820');
}
function deleteDraft(m) {
  if (!m || !m.draft) return;
  const keep = m.draft; m.draft = null;
  if (cs.mailId === m.id) { clearTimeout(cs.timer); cs.saving = false; $('#read').classList.remove('composing'); }
  renderNav(); renderList(); renderRead();
  toast('작성 중이던 메일을 삭제했어요', () => { m.draft = keep; renderNav(); renderList(); renderRead(); });
}

/* ───────── 작성 ───────── */
const cs = { mailId: null, kind: null, saving: false, timer: null, footer: null, files: [], sched: null };
const SIZES = Array.from({ length: 15 }, (_, i) => i + 6);
function fmtToolbar() {
  const b = (cmd, ic, t, txt) => `<button class="ib" data-cmd="${cmd}" title="${t}">${txt ? `<span style="${txt[1]}">${txt[0]}</span>` : ico(ic, 17)}</button>`;
  $('#fmt').innerHTML = `
    <select id="fFont" title="글꼴">${FONT_LIST.map(f => `<option>${f}</option>`).join('')}</select>
    <select id="fSize" title="글자 크기">${SIZES.map(s => `<option value="${s}"${s === 10 ? ' selected' : ''}>${s}pt</option>`).join('')}</select>
    <span class="sep"></span>
    ${b('bold', '', '굵게 (Ctrl+B)', ['B', 'font-weight:800'])}${b('italic', '', '기울임 (Ctrl+I)', ['I', 'font-style:italic;font-family:serif;font-size:15px'])}${b('underline', '', '밑줄 (Ctrl+U)', ['U', 'text-decoration:underline'])}${b('strikeThrough', '', '취소선', ['S', 'text-decoration:line-through'])}
    <button class="ib" id="fColor" title="글자색"><span style="font-weight:800">가</span><span class="sw" style="background:#d93025"></span></button>
    <button class="ib" id="fHi" title="형광펜">${ico('mark', 17)}<span class="sw" style="background:#ffff00"></span></button>
    <span class="sep"></span>
    ${b('justifyLeft', 'alL', '왼쪽 정렬')}${b('justifyCenter', 'alC', '가운데 정렬')}${b('justifyRight', 'alR', '오른쪽 정렬')}
    <span class="sep"></span>
    ${b('insertUnorderedList', 'ul', '글머리 기호')}${b('insertOrderedList', 'ol', '번호 매기기')}${b('outdent', 'outd', '내어쓰기')}${b('indent', 'ind', '들여쓰기 (한글 한 글자)')}
    <span class="sep"></span>
    <button class="ib" id="fTable" title="표 넣기">${ico('table', 17)}</button>${b('image', 'image', '그림 넣기')}${b('hr', 'hr', '가로선')}${b('link', 'link', '링크')}${b('removeFormat', 'clear', '서식 지우기')}`;
}
function renderFooterBar() {
  $('#foot').innerHTML = `풋터 ${FOOTERS.map(f => `<button class="chip${cs.footer === f.id ? ' on' : ''}" data-fid="${f.id}">${esc(f.name)}</button>`).join('')}<button class="lnk" data-set="footers">풋터 설정</button>`;
}
function setChips(box, people) { $$('.rc', box).forEach(x => x.remove()); const inp = $('input', box); people.forEach(p => box.insertBefore(chipEl(p), inp)); }
function chipEl(p) {
  const c = document.createElement('span'); c.className = 'rc'; c.style.cssText = chipStyle(p.email); c.title = p.email; c.dataset.email = p.email; c.dataset.name = p.name;
  c.append(document.createTextNode(p.name === p.email ? p.email : p.name));
  const x = document.createElement('button'); x.textContent = '✕'; x.title = '빼기'; x.addEventListener('click', () => { c.remove(); dirty(); }); c.append(x);
  return c;
}
const chipsOf = box => $$('.rc', box).map(c => ({ name: c.dataset.name, email: c.dataset.email }));
const footerStyle = f => `font-family:'${f.font.family}',Pretendard,sans-serif;font-size:${f.font.size}pt;color:${f.font.color}`;
const footerHtml = f => f ? `<div class="gp-footer" data-footer="${f.id}" style="${footerStyle(f)}">${f.html}</div>` : '<div class="gp-footer"></div>';
// 풋터 자동 선택: 조건에 맞는 풋터 중 가장 구체적인 것 (메일 주소 키워드 > 답장/새 메일 > 모든 메일)
function pickFooter(kind, m) {
  const isReply = kind === 'reply' || kind === 'all' || kind === 'draft';
  const fromAddr = m ? (m.from.email + ' ' + m.from.name).toLowerCase() : '';
  const score = f => {
    const r = f.rule || { type: 'none' };
    if (r.type === 'from') return isReply && r.kw && r.kw.split(',').some(k => k.trim() && fromAddr.includes(k.trim().toLowerCase())) ? 3 : 0;
    if (r.type === 'reply') return isReply ? 2 : 0;
    if (r.type === 'new') return kind === 'new' ? 2 : 0;
    if (r.type === 'all') return 1;
    return 0;
  };
  let best = null, bs = 0;
  FOOTERS.forEach(f => { const s = score(f); if (s > bs) { bs = s; best = f; } });
  return best;
}
function composeHtml(text, footer, quote) {
  return nl(text) + '<br><span id="gpCaret"></span><br>' + footerHtml(footer) +
    (quote && quote.length ? `<div class="quote" contenteditable="false">${nestQ(quote, 0)}</div>` : '');
}
function nestQ(blocks, i) { return i >= blocks.length ? '' : `<div class="qb">${esc(blocks[i])}${nestQ(blocks, i + 1)}</div>`;
}
async function openCompose(kind, opts) {
  opts = opts || {};
  const m = MAILS.find(x => x.id === (opts.mailId != null ? opts.mailId : st.open));
  if (m && m.real && !m.full && kind !== 'new') { toast('본문 불러오는 중…'); await fetchFull(m); }
  if (SET.composeMode === 'popup' && !document.body.classList.contains('popmode') && !opts.inline) { popCompose(buildDraft(kind, m)); return; }
  flushCompose();
  loadDraft(opts.draft || buildDraft(kind, m));
}
function buildDraft(kind, m) {
  let to = [], cc = [], subj = '', quote = '', text = '안녕하세요,\nSM C&C 윤석진입니다.\n';
  if (m && kind !== 'new') {
    if (kind === 'reply' || kind === 'draft') to = [m.sent ? m.to[0] : m.from];
    if (kind === 'all') { to = m.sent ? m.to : [m.from, ...m.to.filter(p => !isMe(p))]; cc = m.cc.filter(p => !isMe(p)); }
    subj = (kind === 'fwd' ? 'FW: ' : 'RE: ') + m.subj.replace(/^((re|fw|fwd):\s*)+/i, '');
    // 전체 히스토리: 이 메일 + 그 이전 메일 전부를 차례로 이어 붙임
    const hdr = x => `-----원본 메일-----\n보낸 사람: ${x.from.name} <${x.from.email}>\n보낸 날짜: ${fmtD(dayOf(x))} ${x.t}\n받는 사람: ${x.to.map(p => p.name).join(', ')}${x.cc && x.cc.length ? '\n참조: ' + x.cc.map(p => p.name).join(', ') : ''}\n제목: ${m.subj}\n\n${x.body}`;
    quote = [m, ...m.prev].map(hdr);
    if (kind === 'draft') text = m.draft + '\n';
  }
  const f = pickFooter(kind, m);
  return { kind, mailId: m && kind !== 'new' ? m.id : null, to, cc, subj, html: composeHtml(text, f, quote), footer: f ? f.id : null, files: [] };
}
function loadDraft(d) {
  cs.kind = d.kind; cs.mailId = d.mailId; cs.footer = d.footer; cs.files = (d.files || []).slice(); cs.sched = null;
  setChips($('#toBox'), d.to); setChips($('#ccBox'), d.cc);
  $('#subj').value = d.subj;
  $('#cbody').innerHTML = d.html;
  renderFooterBar(); renderFiles(); setSave(''); $('#schedState').textContent = ''; $('#send').textContent = '보내기';
  $('#read').classList.add('composing');
  const mk = $('#gpCaret');
  cs.initial = null; setTimeout(() => { cs.initial = composeSig(); });
  if (d.kind === 'new' || d.kind === 'fwd' || !d.to.length) { if (mk) mk.remove(); $('#toBox input').focus(); } else caretAt(mk);
  runTypo();
}
function caretAt(mk) {
  const b = $('#cbody'); b.focus();
  const r = document.createRange();
  if (mk) { r.setStartBefore(mk); mk.remove(); } else { r.selectNodeContents(b); r.collapse(false); }
  r.collapse(true); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
}
const draftNow = () => ({ kind: cs.kind, mailId: cs.mailId, to: chipsOf($('#toBox')), cc: chipsOf($('#ccBox')), subj: $('#subj').value, html: $('#cbody').innerHTML, footer: cs.footer, files: cs.files.map(f => ({ name: f.name, size: f.size })) });
/* 자동 임시저장: 입력이 멈추면 1.2초 뒤 저장. 저장 전에 떠나려 하면 알림 */
function setSave(s) { const el = $('#saveState'); el.textContent = s; el.classList.toggle('busy', /중/.test(s)); }
function dirty() {
  if (!$('#read').classList.contains('composing')) return;
  cs.saving = true; setSave('저장 중…');
  clearTimeout(cs.timer); cs.timer = setTimeout(saveDraft, 1200);
}
// 처음 연 상태 그대로인지 (받는사람·참조·제목·본문·첨부)
const composeSig = () => JSON.stringify([chipsOf($('#toBox')), chipsOf($('#ccBox')), $('#subj').value, $('#cbody').innerText.replace(/\s+/g, ' ').trim(), $$('#cbody img').length, cs.files.length]);
function saveDraft() {
  clearTimeout(cs.timer);
  if (cs.initial && composeSig() === cs.initial) { cs.saving = false; setSave(''); return; }
  store.set('draft-last', draftNow());
  const m = MAILS.find(x => x.id === cs.mailId);
  if (m) { const t = $('#cbody').innerText.split(/\n{2,}-----원본/)[0].trim(); m.draft = t || m.draft; }
  cs.saving = false;
  setSave('자동 저장됨 ' + new Date().toTimeString().slice(0, 5));
  renderList(); renderNav();
}
function flushCompose() { if (cs.saving) saveDraft(); }
window.addEventListener('beforeunload', e => { if (cs.saving) { toast('임시저장 중이에요. 잠시 후 닫아 주세요'); e.preventDefault(); e.returnValue = '임시저장 중입니다'; } });
function closeCompose() {
  flushCompose();
  if (document.body.classList.contains('popmode') && !st.open) { window.close(); return; }
  $('#read').classList.remove('composing'); renderRead();
}
function discardCompose() {
  const snap = draftNow(); const m = MAILS.find(x => x.id === cs.mailId); const keep = m && m.draft;
  clearTimeout(cs.timer); cs.saving = false;
  if (m) m.draft = null;
  $('#read').classList.remove('composing'); renderNav(); renderList(); renderRead();
  toast('작성 중이던 메일을 삭제했어요', () => { if (m) m.draft = keep; loadDraft(snap); renderNav(); renderList(); });
  if (document.body.classList.contains('popmode') && !st.open) setTimeout(() => window.close(), 1500);
}
/* 풋터: 누르면 바로 적용, 다른 풋터를 누르면 그 자리를 바꿔 끼움 (중복 없음) */
function applyFooter(id) {
  const f = FOOTERS.find(x => x.id === id); if (!f) return;
  const b = $('#cbody');
  let slot = $('.gp-footer', b);
  if (!slot) { slot = document.createElement('div'); slot.className = 'gp-footer'; const q = $('.quote', b); q ? b.insertBefore(slot, q) : b.append(slot); }
  slot.dataset.footer = id; slot.setAttribute('style', footerStyle(f)); slot.innerHTML = f.html;
  cs.footer = id; renderFooterBar(); dirty();
}
/* 첨부: 첨부 칸을 눌러 고르거나, 작성 화면 어디에든 끌어다 놓기 */
const fmtSize = n => n < 1024 ? n + ' B' : n < 1048576 ? (n / 1024).toFixed(n < 10240 ? 1 : 0) + ' KB' : (n / 1048576).toFixed(1) + ' MB';
function addFiles(list) {
  [...list].forEach(f => cs.files.push({ name: f.name, size: f.size }));
  renderFiles(); dirty();
  if (list.length) toast(`${list.length}개 파일을 첨부했어요`);
}
function renderFiles() {
  const box = $('#attBox');
  $$('.afile', box).forEach(x => x.remove());
  const total = cs.files.reduce((a, f) => a + f.size, 0);
  $('#attHint').textContent = cs.files.length ? `총 ${fmtSize(total)} · 클릭해서 더 첨부` : '클릭해서 파일 고르기 · 작성 화면 어디에든 끌어다 놓기';
  cs.files.forEach((f, i) => {
    const el = document.createElement('span'); el.className = 'afile';
    el.innerHTML = `${esc(f.name)} <small>${fmtSize(f.size)}</small><button title="빼기">✕</button>`;
    $('button', el).addEventListener('click', e => { e.stopPropagation(); cs.files.splice(i, 1); renderFiles(); dirty(); });
    box.insertBefore(el, $('#attHint'));
  });
}
/* 예약 전송 */
function schedMenu() {
  const at = (days, h) => { const d = new Date(); d.setDate(d.getDate() + days); d.setHours(h, 0, 0, 0); return d; };
  const nextMon = () => { const d = new Date(); d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7)); d.setHours(8, 0, 0, 0); return d; };
  const set = d => { cs.sched = d; $('#schedState').innerHTML = `${ico('clock', 14)} ${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} 예약`; $('#send').textContent = '예약 보내기'; };
  const items = [{ head: '예약 전송' }, { html: ico('clock', 16) + ' 내일 오전 8:00', act: () => set(at(1, 8)) }, { html: ico('clock', 16) + ' 내일 오후 1:00', act: () => set(at(1, 13)) }, { html: ico('clock', 16) + ' 다음 주 월요일 오전 8:00', act: () => set(nextMon()) }, '-'];
  const node = document.createElement('div');
  node.innerHTML = `<div class="mh">날짜·시간 직접 고르기</div><div class="mrow"><input type="datetime-local" style="flex:1;border:1px solid #c4cbd6;border-radius:6px;padding:4px 6px"><button class="btn pri" style="padding:4px 10px">설정</button></div>`;
  $('button', node).addEventListener('click', () => { const v = $('input', node).value; if (v) { set(new Date(v)); closeMenus(); } });
  items.push({ node });
  if (cs.sched) items.push('-', { html: ico('close', 16) + ' 예약 취소', act: () => { cs.sched = null; $('#schedState').textContent = ''; $('#send').textContent = '보내기'; } });
  menuAt($('#sendMenu'), items, true);
}
/* 새 창 */
const popFeatures = 'popup,width=1000,height=880';
function popCompose(d) { store.set('pop-draft', d); window.open(location.pathname + '#compose', '_blank', popFeatures); }
function popView(id) {
  const m = MAILS.find(x => x.id === id);
  if (m && m.real) { try { store.set('pop-view', Object.assign({}, m, { htmlReady: m.htmlReady && m.htmlReady.length < 3e6 ? m.htmlReady : null })); } catch (e) { /* */ } window.open(location.pathname + '#view=real', '_blank', popFeatures); return; }
  window.open(location.pathname + '#view=' + id, '_blank', popFeatures);
}

/* ───────── 받는사람: 자동완성 · 블록 선택해서 복사/붙여넣기 ───────── */
const parseAddrs = t => { const out = []; const re = /(?:"?([^"<>;,\n]*?)"?\s*<)?([^\s<>;,]+@[^\s<>;,]+\.[^\s<>;,]+)>?/g; let m; while ((m = re.exec(t))) { const email = m[2]; const known = CONTACTS.find(p => p.email.toLowerCase() === email.toLowerCase()); out.push(known || { name: (m[1] || '').trim() || email, email }); } return out; };
const chipText = chips => chips.map(c => c.dataset.name && c.dataset.name !== c.dataset.email ? `${c.dataset.name} <${c.dataset.email}>` : c.dataset.email).join('; ');
function setupRcpt(box) {
  const inp = $('input', box), ac = box.nextElementSibling;
  let items = [], idx = 0;
  const close = () => { ac.classList.remove('on'); items = []; };
  const add = p => { box.insertBefore(chipEl(p), inp); inp.value = ''; close(); dirty(); inp.focus(); };
  const draw = () => {
    const q = inp.value.trim().toLowerCase();
    if (!q) { close(); return; }
    const taken = new Set(chipsOf(box).map(p => p.email));
    items = CONTACTS.filter(p => !isMe(p) && !taken.has(p.email) && (p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q))).slice(0, 7);
    if (!items.length) { close(); return; }
    idx = Math.min(idx, items.length - 1);
    ac.innerHTML = items.map((p, i) => `<div class="it${i === idx ? ' on' : ''}" data-i="${i}"><i style="background:${dotColor(p.email)}"></i>${esc(p.name)} <small>${esc(p.email)}</small></div>`).join('');
    ac.classList.add('on');
  };
  inp.addEventListener('input', () => { idx = 0; draw(); $$('.rc.sel', box).forEach(c => c.classList.remove('sel')); });
  inp.addEventListener('keydown', e => {
    if (ac.classList.contains('on') && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) { e.preventDefault(); idx = (idx + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; draw(); return; }
    if (e.key === 'Enter' || e.key === ',' || e.key === ';' || e.key === 'Tab') {
      if (items.length && ac.classList.contains('on')) { e.preventDefault(); add(items[idx]); return; }
      const v = inp.value.trim().replace(/[,;]$/, '');
      if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { e.preventDefault(); add({ name: v, email: v }); }
    }
    // 빈 칸에서 Ctrl+A → 받는사람 전체 선택, Ctrl+C → '이름 <주소>; …' 로 복사, Ctrl+X → 잘라내기
    if ((e.ctrlKey || e.metaKey) && e.key === 'a' && !inp.value) { e.preventDefault(); $$('.rc', box).forEach(c => c.classList.add('sel')); }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x') && !inp.value && $$('.rc.sel', box).length) {
      e.preventDefault(); const sel = $$('.rc.sel', box); copyChips(sel); if (e.key === 'x') { sel.forEach(c => c.remove()); dirty(); }
    }
    if ((e.key === 'Backspace' || e.key === 'Delete') && !inp.value) {
      const sel = $$('.rc.sel', box);
      if (sel.length) { sel.forEach(c => c.remove()); dirty(); e.preventDefault(); }
      else if (e.key === 'Backspace') { const last = $$('.rc', box).pop(); if (last) { last.remove(); dirty(); } }
    }
    if (e.key === 'Escape' && ac.classList.contains('on')) { e.stopPropagation(); close(); }
  });
  // 붙여넣기: '이름 <주소>; 주소2' 형태를 칩으로
  inp.addEventListener('paste', e => {
    const t = (e.clipboardData || window.clipboardData).getData('text');
    const ps = parseAddrs(t); if (!ps.length) return;
    e.preventDefault(); const taken = new Set(chipsOf(box).map(p => p.email));
    ps.forEach(p => { if (!taken.has(p.email)) { box.insertBefore(chipEl(p), inp); taken.add(p.email); } }); dirty();
  });
  ac.addEventListener('mousedown', e => { const it = e.target.closest('.it'); if (it) { e.preventDefault(); add(items[+it.dataset.i]); } });
  inp.addEventListener('blur', () => setTimeout(close, 120));
  // 칩 클릭 = 선택 (Ctrl/Shift로 여러 개), 칩 위를 끌면 블록 선택
  let dragSel = null;
  box.addEventListener('mousedown', e => {
    const c = e.target.closest('.rc');
    if (c && !e.target.closest('button')) {
      if (!(e.ctrlKey || e.shiftKey || e.metaKey)) $$('.rc.sel', box).forEach(x => x !== c && x.classList.remove('sel'));
      c.classList.add('sel'); dragSel = c; e.preventDefault(); inp.focus(); return;
    }
    if (e.target === box) $$('.rc.sel', box).forEach(x => x.classList.remove('sel'));
  });
  box.addEventListener('mouseover', e => {
    if (!dragSel || !(e.buttons & 1)) return; const c = e.target.closest('.rc'); if (!c) return;
    const all = $$('.rc', box), a = all.indexOf(dragSel), b = all.indexOf(c);
    all.forEach((x, i) => x.classList.toggle('sel', i >= Math.min(a, b) && i <= Math.max(a, b)));
  });
  document.addEventListener('mouseup', () => { dragSel = null; });
  box.addEventListener('click', e => { if (e.target === box) inp.focus(); });
}
function copyChips(chips) {
  try { navigator.clipboard.writeText(chipText(chips)); } catch (e) { /* */ }
  toast(`${chips.length}명을 복사했어요`);
}

/* ───────── 맞춤법: 자주 틀리는 한글 표현 사전 + 무시한 단어 기억 ───────── */
const W = '(?=[\\s.,!?~)"\']|$)';
const TYPO = [
  ['됬', '됐'], ['됫', '됐'], ['몇일', '며칠'], ['몇 일', '며칠'], ['어떻해', '어떡해'], ['어떻하', '어떡하'], ['어의없', '어이없'], ['어의가 없', '어이가 없'],
  ['금새', '금세'], ['오랫만', '오랜만'], ['희안', '희한'], ['일일히', '일일이'], ['깨끗히', '깨끗이'], ['곰곰히', '곰곰이'], ['틈틈히', '틈틈이'], ['번번히', '번번이'], ['간간히', '간간이'],
  ['역활', '역할'], ['설겆이', '설거지'], ['왠만', '웬만'], ['웬지', '왠지'], ['왠일', '웬일'], ['뵈요', '봬요'], ['바램', '바람'], ['설레임', '설렘'], ['구지', '굳이'],
  ['일부로', '일부러'], ['짜집기', '짜깁기'], ['뒤치닥거리', '뒤치다꺼리'], ['내노라', '내로라'], ['어따 대고', '얻다 대고'],
  ['읍니다', '습니다'], ['했슴', '했음'], ['있슴', '있음'], ['없슴', '없음'], ['갔슴', '갔음'], ['하였슴', '하였음'],
  ['할려고', '하려고'], ['갈려고', '가려고'], ['볼려고', '보려고'], ['올려고', '오려고'], ['할려면', '하려면'], ['할께', '할게'], ['갈께', '갈게'], ['줄께', '줄게'], ['볼께', '볼게'], ['올께', '올게'],
  ['드릴께', '드릴게'], ['할껄', '할걸'], ['할꺼', '할 거'], ['내꺼', '내 거'], ['될꺼', '될 거'],
  ['않되', '안 되'], ['않돼', '안 돼'], ['안되요', '안 돼요'], ['되요', '돼요'], ['되서', '돼서'], ['안 되요', '안 돼요'], ['돼었', '되었'], ['돼어', '되어'],
  ['않하', '안 하'], ['않해', '안 해'], ['조은', '좋은'], ['조아', '좋아'], ['조켔', '좋겠'],
  ['부탁 드립니다', '부탁드립니다'], ['감사 드립니다', '감사드립니다'], ['말씀 드립니다', '말씀드립니다'], ['연락 드리', '연락드리'], ['전달 드리', '전달드리'], ['공유 드리', '공유드리'], ['확인 부탁 드', '확인 부탁드'],
  ['것같', '것 같'], ['할수있', '할 수 있'], ['할수없', '할 수 없'], ['될수있', '될 수 있'], ['할수', '할 수'], ['될수', '될 수'], ['볼수', '볼 수'],
  ['하는데로', '하는 대로'], ['말한데로', '말한 대로'], ['예기하', '얘기하'], ['애기하', '얘기하'], ['안녕하세여', '안녕하세요'], ['감사함니다', '감사합니다'], ['고맙슴니다', '고맙습니다'], ['함니다', '합니다'], ['슴니다', '습니다'],
  ['안녕하새요', '안녕하세요'], ['안녕하셰요', '안녕하세요'], ['안녕하세효', '안녕하세요'], ['안녕하십니가', '안녕하십니까'], ['안녕하싮니까', '안녕하십니까'],
  ['드림니다', '드립니다'], ['감사드림', '감사드립'], ['부탁드림니', '부탁드립니'], ['갑사합니다', '감사합니다'], ['감사합ㄴ디', '감사합니다'], ['고맙읍니다', '고맙습니다'],
  ['어떻개', '어떻게'], ['어떡게', '어떻게'], ['어떻계', '어떻게'], ['희얀', '희한'], ['눈쌀', '눈살'], ['바래요', '바라요'], ['바랬', '바랐'],
  ['거에요', '거예요'], ['꺼에요', '거예요'], ['꺼예요', '거예요'], ['아니예요', '아니에요'], ['할꼐', '할게'], ['드릴꼐', '드릴게'], ['갈꼐', '갈게'],
  ['하겟', '하겠'], ['되겟', '되겠'], ['있겟', '있겠'], ['없겟', '없겠'], ['드리겟', '드리겠'], ['보겟', '보겠'], ['가겟', '가겠'], ['오겟', '오겠'], ['좋겟', '좋겠'],
  ['했는대', '했는데'], ['있는대요', '있는데요'], ['없는대요', '없는데요'], ['드렸는대', '드렸는데'], ['부탁드려용', '부탁드려요'],
  ['확인부탁드', '확인 부탁드'], ['참고부탁드', '참고 부탁드'], ['검토부탁드', '검토 부탁드'], ['공유부탁드', '공유 부탁드'], ['회신부탁드', '회신 부탁드'],
  ['곰방', '금방'], ['어짜피', '어차피'], ['예정되있', '예정돼 있'], ['되있', '돼 있'], ['되 있', '돼 있'], ['됬', '됐'], ['됫다', '됐다']
].map(([w, f]) => [new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + (/[다요]$/.test(w) ? W : ''), 'g'), f, w]);
TYPO.push([/(?<![가-힣])([가-힣]{2,})\s+\1(?![가-힣])/g, m => m.split(/\s+/)[0], '반복']);
TYPO.push([/(하|주|보|가|오|계|드|시|으|드시|주시|보시|하시|가시|오시)새(요|용)/g, m => m.replace(/새(요|용)$/, '세요'), '세요']);
TYPO.push([/(하|주|보|가|오|계|드|시)셰요/g, m => m.replace(/셰요$/, '세요'), '세요']);
let typoHits = [];
function runTypo() {
  clearTimeout(runTypo.t);
  runTypo.t = setTimeout(() => {
    typoHits = [];
    if (!window.CSS || !CSS.highlights) return;
    if (!SET.typo) { CSS.highlights.delete('gp-typo'); return; }
    const body = $('#cbody'); const ranges = [];
    const tw = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('.quote, .gp-footer') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    for (let n = tw.nextNode(); n; n = tw.nextNode()) {
      for (const [re, fix] of TYPO) {
        re.lastIndex = 0; let mt;
        while ((mt = re.exec(n.nodeValue))) {
          if (IGNORE.has(mt[0])) continue;
          const st0 = mt.index, en0 = mt.index + mt[0].length;
          if (typoHits.some(h => h.r.startContainer === n && h.r.startOffset < en0 && st0 < h.r.endOffset)) continue;  // 겹치면 하나만
          const r = document.createRange(); r.setStart(n, mt.index); r.setEnd(n, mt.index + mt[0].length);
          ranges.push(r); typoHits.push({ r, word: mt[0], fix: typeof fix === 'function' ? fix(mt[0]) : fix });
        }
      }
    }
    CSS.highlights.set('gp-typo', new Highlight(...ranges));
  }, 250);
}
function typoAtCaret() {
  const s = getSelection(); if (!s.rangeCount || !s.isCollapsed) return;
  const c = s.getRangeAt(0);
  const hit = typoHits.find(h => h.r.startContainer === c.startContainer && c.startOffset >= h.r.startOffset && c.startOffset <= h.r.endOffset);
  $$('.typo').forEach(x => x.remove());
  if (!hit) return;
  const rect = hit.r.getBoundingClientRect();
  const pop = document.createElement('div'); pop.className = 'typo';
  pop.innerHTML = `<span>${esc(hit.word)} → <b>${esc(hit.fix)}</b></span><button class="btn pri" style="padding:3px 10px">바꾸기</button><button class="btn" style="padding:3px 10px">그대로</button><button class="btn" style="padding:3px 10px" title="이 단어는 앞으로 표시 안 함">무시</button>`;
  pop.style.left = rect.left + 'px'; pop.style.top = (rect.bottom + 6) + 'px';
  document.body.append(pop);
  const [ok, no, ign] = $$('button', pop);
  ok.addEventListener('mousedown', e => { e.preventDefault(); const s2 = getSelection(); s2.removeAllRanges(); s2.addRange(hit.r); document.execCommand('insertText', false, hit.fix); pop.remove(); runTypo(); dirty(); });
  no.addEventListener('mousedown', e => { e.preventDefault(); pop.remove(); });
  ign.addEventListener('mousedown', e => { e.preventDefault(); IGNORE.add(hit.word); store.set('typo-ignore', [...IGNORE]); pop.remove(); runTypo(); });
}

/* ───────── 작성 본문: 서식·표·그림 ───────── */
let lastSpace = 0;
function bodyKeydown(e) {
  // 스페이스 두 번 → 한글 한 글자 너비 들여쓰기(전각 공백, 백스페이스 한 번에 지워짐)
  if (e.key === ' ' && !e.ctrlKey && !e.altKey && !e.isComposing) {
    const s = getSelection(), now = Date.now();
    if (s.isCollapsed && now - lastSpace < 500) {
      const n = s.anchorNode, o = s.anchorOffset;
      if (n && n.nodeType === 3 && o > 0 && /[  ]/.test(n.nodeValue[o - 1])) { e.preventDefault(); document.execCommand('delete'); document.execCommand('insertText', false, '　'); lastSpace = 0; return; }
    }
    lastSpace = now; return;
  }
  lastSpace = 0;
  if (e.key === 'Tab') { const td = cellAtCaret(); if (td) { e.preventDefault(); moveCell(td, e.shiftKey ? -1 : 1); } }
}
let savedRange = null;
document.addEventListener('selectionchange', () => { const s = getSelection(); if (s.rangeCount && $('#cbody') && $('#cbody').contains(s.anchorNode)) { savedRange = s.getRangeAt(0).cloneRange(); syncFmt(); tableBar(); } });
function restoreSel() { const b = $('#cbody'); b.focus(); if (savedRange && b.contains(savedRange.startContainer)) { const s = getSelection(); s.removeAllRanges(); s.addRange(savedRange); } }
function setSizePt(pt) {
  restoreSel(); document.execCommand('styleWithCSS', false, false); document.execCommand('fontSize', false, '7');
  $$('font[size="7"]', $('#cbody')).forEach(f => { const sp = document.createElement('span'); sp.style.fontSize = pt + 'pt'; while (f.firstChild) sp.append(f.firstChild); f.replaceWith(sp); });
  dirty();
}
function fmtCmd(cmd) {
  restoreSel(); const b = $('#cbody');
  if (cmd === 'image') { $('#imgPick').click(); return; }
  if (cmd === 'hr') document.execCommand('insertHTML', false, '<hr style="border:0;border-top:1px solid #bfbfbf"><br>');
  else if (cmd === 'link') { linkMenu(); return; }
  else if (cmd === 'indent' || cmd === 'outdent') {
    const s = getSelection(); let el = s.anchorNode; el = el && (el.nodeType === 1 ? el : el.parentElement);
    while (el && el !== b && !/^(DIV|P|LI)$/.test(el.tagName)) el = el.parentElement;
    if (!el || el === b) { document.execCommand('formatBlock', false, 'div'); el = s.anchorNode.nodeType === 1 ? s.anchorNode : s.anchorNode.parentElement; }
    const cur = parseFloat(el.style.marginLeft) || 0, step = Math.round(parseFloat(getComputedStyle(el).fontSize) || 13);
    const v = Math.max(0, cur + (cmd === 'indent' ? step : -step)); el.style.marginLeft = v ? v + 'px' : '';
  } else { document.execCommand('styleWithCSS', false, true); document.execCommand(cmd, false, null); }
  dirty(); syncFmt();
}
/* 그림: 커서 위치에 넣기 (클립보드 붙여넣기·그림 넣기 버튼 공통) + 모서리 끌어서 크기 조절(비율 유지) */
function insertImage(src) {
  const b = $('#cbody'); let s = getSelection();
  if (!s.rangeCount || !b.contains(s.anchorNode)) { restoreSel(); s = getSelection(); }
  if (!s.rangeCount) return;
  const rg = s.getRangeAt(0); rg.deleteContents();
  const img = new Image(); img.src = src; img.style.maxWidth = '100%';
  img.onload = () => { const max = b.clientWidth - 60; if (img.naturalWidth > max) img.style.width = max + 'px'; posImgSel(); };
  rg.insertNode(img);
  const after = document.createRange(); after.setStartAfter(img); after.collapse(true); s.removeAllRanges(); s.addRange(after);
  dirty();
}
const readImage = file => new Promise(res => { const rd = new FileReader(); rd.onload = () => res(rd.result); rd.readAsDataURL(file); });
let selImg = null;
function selectImg(img) {
  selImg = img;
  let ov = $('#imgsel');
  if (!ov) {
    ov = document.createElement('div'); ov.id = 'imgsel'; ov.className = 'imgsel';
    ov.innerHTML = '<span data-c="nw"></span><span data-c="ne"></span><span data-c="sw"></span><span data-c="se"></span><b></b>';
    ov.addEventListener('mousedown', e => {
      const h = e.target.closest('[data-c]'); if (!h || !selImg) return;
      e.preventDefault(); e.stopPropagation();
      const c = h.dataset.c, sx = c.includes('e') ? 1 : -1, sy = c.includes('s') ? 1 : -1;
      const r0 = selImg.getBoundingClientRect(), ratio = r0.height / r0.width, x0 = e.clientX, y0 = e.clientY;
      const mv = ev => {
        const dx = (ev.clientX - x0) * sx, dy = (ev.clientY - y0) * sy / ratio;
        const w = Math.max(24, Math.round(r0.width + (Math.abs(dx) >= Math.abs(dy) ? dx : dy)));
        selImg.style.width = w + 'px'; selImg.style.height = 'auto'; posImgSel();
      };
      const up = () => { document.removeEventListener('mousemove', mv); document.removeEventListener('mouseup', up); dirty(); };
      document.addEventListener('mousemove', mv); document.addEventListener('mouseup', up);
    });
    document.body.append(ov);
  }
  posImgSel();
}
function posImgSel() {
  const ov = $('#imgsel'); if (!ov) return;
  if (!selImg || !document.contains(selImg) || !$('#read').classList.contains('composing')) { ov.remove(); selImg = null; return; }
  const r = selImg.getBoundingClientRect();
  Object.assign(ov.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
  $('b', ov).textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
}
function linkMenu(atSel) {
  const sel = getSelection(); let at = null, cur = null;
  if (sel.rangeCount && $('#cbody').contains(sel.anchorNode)) {
    savedRange = sel.getRangeAt(0).cloneRange();
    const n = sel.anchorNode; cur = (n.nodeType === 1 ? n : n.parentElement).closest('a');
    if (atSel) { const r = savedRange.getClientRects(); const last = r.length ? r[r.length - 1] : savedRange.getBoundingClientRect(); at = { x: last.left, y: last.bottom }; }
  }
  const hasText = sel.rangeCount && !sel.isCollapsed;
  const node = document.createElement('div');
  node.innerHTML = `<div class="mh">${hasText ? '선택한 글자에 링크 걸기' : '링크 넣기'} <span style="float:right">Ctrl+K</span></div><div class="mrow"><input type="text" placeholder="https://" value="${cur ? esc(cur.getAttribute('href')) : ''}"><button class="btn pri" style="padding:4px 10px">${cur ? '바꾸기' : '넣기'}</button>${cur ? '<button class="btn" data-un style="padding:4px 10px">링크 해제</button>' : ''}</div>`;
  const go = () => {
    const u = $('input', node).value.trim(); if (!u) return; closeMenus(); restoreSel();
    const url = /^(https?:|mailto:)/.test(u) ? u : (/^[^@\s]+@[^@\s]+$/.test(u) ? 'mailto:' + u : 'https://' + u);
    if (cur) { cur.href = url; } else if (getSelection().isCollapsed) document.execCommand('insertHTML', false, `<a href="${esc(url)}">${esc(u)}</a>`); else document.execCommand('createLink', false, url);
    dirty();
  };
  $('button', node).addEventListener('click', go);
  const un = $('[data-un]', node); if (un) un.addEventListener('click', () => { closeMenus(); cur.replaceWith(...cur.childNodes); dirty(); });
  $('input', node).addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); go(); } if (e.key === 'Escape') { closeMenus(); restoreSel(); } e.stopPropagation(); });
  menuAt(at ? $('#cbody') : $('[data-cmd=link]'), [{ node }], true, at); setTimeout(() => { $('input', node).focus(); $('input', node).select(); });
}
/* ───────── 붙여넣기: 기본은 서식 그대로 + 옆에 작은 '붙여넣기 옵션' 버튼 (아웃룩처럼) ─────────
   무시하고 계속 쓰면 버튼은 사라지고 그대로 유지 */
function cleanHtml(html) {
  const d = new DOMParser().parseFromString(html, 'text/html');
  $$('script, style, meta, link, title, xml, iframe, object, embed, form, input, button', d).forEach(x => x.remove());
  $$('*', d.body).forEach(el => { [...el.attributes].forEach(a => { if (/^on/i.test(a.name) || (/^(href|src)$/i.test(a.name) && /^\s*javascript:/i.test(a.value))) el.removeAttribute(a.name); }); });
  return d.body.innerHTML.replace(/<!--[\s\S]*?-->/g, '');
}
const textToHtml = t => esc(t.replace(/\r\n?/g, '\n')).replace(/\n/g, '<br>');
// 글자 + 그림만 (글자 서식은 빼고 줄바꿈만 살림)
function textImgHtml(html) {
  const d = new DOMParser().parseFromString(html, 'text/html'); const out = []; let line = '';
  const flush = () => { out.push(line); line = ''; };
  const walk = n => {
    if (n.nodeType === 3) { line += esc(n.nodeValue.replace(/\s+/g, ' ')); return; }
    if (n.nodeType !== 1 || /^(SCRIPT|STYLE|META|TITLE)$/.test(n.tagName)) return;
    if (n.tagName === 'IMG') { const src = n.getAttribute('src') || ''; if (/^(https?:|data:image)/.test(src)) line += `<img src="${esc(src)}" style="max-width:100%">`; return; }
    if (n.tagName === 'BR') { flush(); return; }
    const block = /^(P|DIV|LI|H[1-6]|TR|BLOCKQUOTE|PRE|UL|OL|TABLE|SECTION|ARTICLE)$/.test(n.tagName);
    if (block && line) flush();
    if (n.tagName === 'TD' || n.tagName === 'TH') { if (line && !/\t$/.test(line)) line += '&nbsp;&nbsp;'; }
    n.childNodes.forEach(walk);
    if (block && line) flush();
  };
  d.body.childNodes.forEach(walk); if (line) flush();
  return out.join('<br>');
}
const pasteOpt = { on: false };
function doPaste(cd) {
  const html = cd.getData('text/html'), text = cd.getData('text/plain');
  const v = { rich: html ? cleanHtml(html) : textToHtml(text), plain: textToHtml(text || (html ? new DOMParser().parseFromString(html, 'text/html').body.innerText : '')), ti: html ? textImgHtml(html) : textToHtml(text) };
  const b = $('#cbody'); let s = getSelection(); if (!s.rangeCount || !b.contains(s.anchorNode)) { restoreSel(); s = getSelection(); }
  const rg = s.getRangeAt(0); rg.deleteContents();
  const ms = document.createElement('span'), me = document.createElement('span'); ms.className = me.className = 'gp-pm';
  rg.insertNode(me); rg.insertNode(ms);
  const put = k => {
    const r = document.createRange(); r.setStartAfter(ms); r.setEndBefore(me); r.deleteContents();
    const t = document.createElement('template'); t.innerHTML = v[k]; me.before(t.content);
    const c = document.createRange(); c.setStartAfter(me); c.collapse(true); const ss = getSelection(); ss.removeAllRanges(); ss.addRange(c);
    pasteOpt.cur = k; dirty(); runTypo();
  };
  put('rich');
  showPasteBtn(me, put, Object.keys(v).filter(k => k !== 'rich' && v[k] !== v.rich).length > 0);
}
function endPasteOpt() { $$('#pasteBtn').forEach(x => x.remove()); $$('#cbody .gp-pm').forEach(x => x.remove()); pasteOpt.on = false; if ($('.menu') && $('.menu')._paste) closeMenus(); }
function showPasteBtn(anchorEl, put, useful) {
  endPasteOpt.skip = true; $$('#pasteBtn').forEach(x => x.remove()); endPasteOpt.skip = false;
  if (!useful) { $$('#cbody .gp-pm').forEach(x => x.remove()); return; }
  pasteOpt.on = true;
  const btn = document.createElement('button'); btn.id = 'pasteBtn'; btn.className = 'pastebtn'; btn.title = '붙여넣기 옵션';
  btn.innerHTML = `${ico('draft', 15)}<span>(Ctrl)</span>${ico('down', 12)}`;
  const place = () => { if (!anchorEl.isConnected) return endPasteOpt(); const r = anchorEl.getBoundingClientRect(); btn.style.left = Math.min(innerWidth - 90, r.right + 4) + 'px'; btn.style.top = (r.bottom + 4) + 'px'; };
  document.body.append(btn); place(); btn._place = place;
  const open = () => { const m = menuAt(btn, [{ head: '붙여넣기 옵션' },
    { html: '서식 포함해서 붙여넣기', on: pasteOpt.cur === 'rich', act: () => put('rich') },
    { html: '서식 없이 글자만', on: pasteOpt.cur === 'plain', act: () => put('plain') },
    { html: '글자와 그림만 (서식 빼고)', on: pasteOpt.cur === 'ti', act: () => put('ti') }]); m._paste = true; };
  btn.addEventListener('mousedown', e => { e.preventDefault(); toggleMenu(btn, open); });
  btn._open = open;
}
function syncFmt() { $$('#fmt [data-cmd]').forEach(x => { let on = false; try { on = /^(bold|italic|underline|strikeThrough|insertUnorderedList|insertOrderedList|justifyLeft|justifyCenter|justifyRight)$/.test(x.dataset.cmd) && document.queryCommandState(x.dataset.cmd); } catch (e) { /* */ } x.classList.toggle('on', on); }); }
/* 표: 먼저 칸 수를 고르고 넣기 */
function tablePicker() {
  const node = document.createElement('div'); node.className = 'grid-pick';
  node.innerHTML = `<div class="g">${Array.from({ length: 80 }, (_, i) => `<span data-r="${Math.floor(i / 10) + 1}" data-c="${i % 10 + 1}"></span>`).join('')}</div><div class="gl">칸 수를 고르세요</div>`;
  node.addEventListener('mouseover', e => { const s = e.target.closest('[data-r]'); if (!s) return; const r = +s.dataset.r, c = +s.dataset.c; $$('span', node).forEach(x => x.classList.toggle('on', +x.dataset.r <= r && +x.dataset.c <= c)); $('.gl', node).textContent = `${r}행 × ${c}열`; });
  node.addEventListener('mousedown', e => { e.preventDefault(); const s = e.target.closest('[data-r]'); if (!s) return; closeMenus(); insertTable(+s.dataset.r, +s.dataset.c); });
  menuAt($('#fTable'), [{ node }], true);
}
function insertTable(r, c) {
  restoreSel();
  const rows = Array.from({ length: r }, () => '<tr>' + Array.from({ length: c }, () => '<td style="border:1px solid #bfbfbf;padding:3px 7px;min-width:60px;height:22px;vertical-align:top">&nbsp;</td>').join('') + '</tr>').join('');
  const s = getSelection(); if (!s.rangeCount) return;
  const rg = s.getRangeAt(0); rg.deleteContents(); rg.collapse(false);
  const tmp = document.createElement('div'); tmp.innerHTML = `<table style="border-collapse:collapse">${rows}</table><br>`;
  const t = tmp.firstChild, frag = document.createDocumentFragment(); frag.append(...tmp.childNodes);
  rg.insertNode(frag);
  const cr = document.createRange(); cr.selectNodeContents(t.rows[0].cells[0]); cr.collapse(true); s.removeAllRanges(); s.addRange(cr);
  dirty();
}
const cellAtCaret = () => { const s = getSelection(); if (!s.rangeCount) return null; let n = s.anchorNode; n = n && (n.nodeType === 1 ? n : n.parentElement); return n && $('#cbody').contains(n) ? n.closest('td') : null; };
function moveCell(td, dir) {
  const cells = $$('td', td.closest('table')); const i = cells.indexOf(td) + dir;
  if (i >= cells.length) { tblAct('rowB'); moveCell(td, 1); return; }
  const t = cells[Math.max(0, i)]; const r = document.createRange(); r.selectNodeContents(t); r.collapse(false); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
}
// 칸 안에 커서가 있으면 표 도구(위·가운데·아래 정렬, 행·열 추가/삭제)
function tableBar() {
  const td = cellAtCaret(); let bar = $('#tbar');
  if (!td) { if (bar) bar.remove(); return; }
  if (!bar) {
    bar = document.createElement('div'); bar.id = 'tbar'; bar.className = 'tbar';
    const b = (a, ic, t) => `<button class="ib" data-ta="${a}" title="${t}">${ico(ic, 17)}</button>`;
    bar.innerHTML = `<span class="lb">칸 정렬</span>${b('vtop', 'vtop', '위로')}${b('vmid', 'vmid', '가운데')}${b('vbot', 'vbot', '아래로')}<span class="sep"></span>${b('rowA', 'rowA', '위에 행 추가')}${b('rowB', 'rowB', '아래에 행 추가')}${b('colL', 'colL', '왼쪽에 열 추가')}${b('colR', 'colR', '오른쪽에 열 추가')}<span class="sep"></span>${b('rowX', 'rowX', '행 삭제')}${b('colX', 'colX', '열 삭제')}${b('tblX', 'tblX', '표 삭제')}`;
    bar.addEventListener('mousedown', e => { e.preventDefault(); const x = e.target.closest('[data-ta]'); if (x) tblAct(x.dataset.ta); });
    document.body.append(bar);
  }
  const va = td.style.verticalAlign || 'top';
  $$('[data-ta^=v]', bar).forEach(x => x.classList.toggle('on', x.dataset.ta === { top: 'vtop', middle: 'vmid', bottom: 'vbot' }[va]));
  const tr = td.closest('table').getBoundingClientRect();
  bar.style.left = Math.max(8, tr.left) + 'px'; bar.style.top = Math.min(innerHeight - 50, tr.bottom + 6) + 'px';
}
function tblAct(a) {
  const td = cellAtCaret(); if (!td) return; const tr = td.parentElement, table = td.closest('table'), ci = [...tr.children].indexOf(td);
  const newTd = () => { const x = td.cloneNode(false); x.innerHTML = '&nbsp;'; return x; };
  if (a[0] === 'v') { td.style.verticalAlign = { vtop: 'top', vmid: 'middle', vbot: 'bottom' }[a]; }
  if (a === 'rowA' || a === 'rowB') { const nr = document.createElement('tr'); [...tr.children].forEach(() => nr.append(newTd())); a === 'rowA' ? tr.before(nr) : tr.after(nr); }
  if (a === 'colL' || a === 'colR') $$('tr', table).forEach(r => { const ref = r.children[ci]; if (ref) a === 'colL' ? ref.before(newTd()) : ref.after(newTd()); });
  if (a === 'rowX') { if (table.rows.length > 1) tr.remove(); else table.remove(); }
  if (a === 'colX') { if (tr.children.length > 1) $$('tr', table).forEach(r => r.children[ci] && r.children[ci].remove()); else table.remove(); }
  if (a === 'tblX') table.remove();
  dirty(); tableBar();
}

/* ───────── 설정 (일반 · 풋터 · 메일함 · 계정) ───────── */
function saveAll() { if (!real.on) store.set('boxes', BOXES); store.set('footers2', FOOTERS); store.set('settings', SET); }
// 저장 폴더: 브라우저가 고른 폴더 권한을 기억 (IndexedDB)
const idb = (op, val) => new Promise(res => { try { const rq = indexedDB.open('jin-mail', 1); rq.onupgradeneeded = () => rq.result.createObjectStore('kv'); rq.onsuccess = () => { const tx = rq.result.transaction('kv', op === 'get' ? 'readonly' : 'readwrite'); const s = tx.objectStore('kv'); const r = op === 'get' ? s.get('dir') : s.put(val, 'dir'); r.onsuccess = () => res(r.result); r.onerror = () => res(null); }; rq.onerror = () => res(null); } catch (e) { res(null); } });
function openSettings(tab) {
  closeMenus();
  const bg = document.createElement('div'); bg.className = 'modal-bg';
  bg.innerHTML = `<div class="modal set"><h3>설정</h3><div class="tabs"><button data-tab="general">일반</button><button data-tab="footers">풋터</button><button data-tab="boxes">메일함</button><button data-tab="account">계정</button></div><div class="mbody" id="setBody"></div><div class="mfoot"><button class="btn pri" data-x>닫기</button></div></div>`;
  document.body.append(bg);
  const body = $('#setBody', bg);
  const rerender = () => { saveAll(); renderNav(); renderList(); renderRead(); renderFooterBar(); renderTop(); };
  const show = t => {
    $$('.tabs button', bg).forEach(b => b.classList.toggle('on', b.dataset.tab === t));
    body.dataset.tab = t;
    if (t === 'general') {
      body.innerHTML = `
      <h5>메일 작성 방식</h5><p class="desc">답장·새 메일을 누르면 어디서 쓸지 정해요. 작성 화면 위 '새 창' 버튼으로 언제든 옮길 수 있어요.</p>
      <label class="opt"><input type="radio" name="cm" value="inline"${SET.composeMode === 'inline' ? ' checked' : ''}> 이 화면 안에서 쓰기 (읽기 칸 자리)</label>
      <label class="opt"><input type="radio" name="cm" value="popup"${SET.composeMode === 'popup' ? ' checked' : ''}> 새 창(팝업)으로 쓰기</label>
      <h5>맞춤법 표시</h5><label class="opt"><input type="checkbox" id="setTypo"${SET.typo ? ' checked' : ''}> 자주 틀리는 한글 표현에 밑줄 표시</label>
      <p class="desc">무시한 단어 ${IGNORE.size}개 ${IGNORE.size ? '<button class="btn" id="clrIgn" style="padding:2px 8px;margin-left:6px">무시 목록 비우기</button>' : ''}</p>
      <h5>메일 저장 폴더 (내 컴퓨터)</h5><p class="desc">첨부파일 저장과 메일 백업에 쓸 폴더예요. 브라우저 보안상 한 번 골라 주시면 그 폴더만 쓸 수 있어요.</p>
      <div class="opt"><button class="btn" id="pickDir">${ico('folder', 16)} 폴더 고르기</button><span id="dirName" style="color:var(--sub)">불러오는 중…</span></div>`;
      idb('get').then(h => { const el = $('#dirName', body); if (el) el.textContent = h && h.name ? '현재: ' + h.name : '아직 고르지 않았어요'; });
    }
    if (t === 'footers') {
      body.innerHTML = '<p class="desc">작성 화면의 풋터 버튼으로 바로 넣을 수 있고, 아래 조건에 맞으면 작성 화면을 열 때 자동으로 들어가요. 여러 개가 맞으면 \'특정 주소\' > \'답장/새 메일\' > \'모든 메일\' 순서로 골라요.</p>' + FOOTERS.map(f => `
        <div class="ftr" data-id="${f.id}">
          <div class="r1"><input type="text" class="nm" value="${esc(f.name)}" data-k="name" placeholder="풋터 이름">
            <select data-k="family" title="글꼴">${FONT_LIST.map(x => `<option${x === f.font.family ? ' selected' : ''}>${x}</option>`).join('')}</select>
            <select data-k="size" title="크기">${SIZES.map(s => `<option value="${s}"${s === f.font.size ? ' selected' : ''}>${s}pt</option>`).join('')}</select>
            <button class="btn" data-k="color" title="글자색"><span style="width:14px;height:14px;border-radius:3px;background:${f.font.color};border:1px solid #ccc"></span> 색</button>
            <button class="btn" data-k="img">${ico('image', 16)} 그림 넣기</button><button class="ib" data-k="del" title="풋터 삭제">${ico('trash')}</button></div>
          <div class="ed" contenteditable="true" spellcheck="false" style="${footerStyle(f)}">${f.html}</div>
          <div class="rule">자동으로 넣기:
            <select data-k="rule">${[['none', '자동으로 넣지 않음'], ['all', '모든 메일'], ['new', '새 메일'], ['reply', '모든 답장'], ['from', '보낸 사람 주소에 키워드가 있는 메일의 답장']].map(([v, l]) => `<option value="${v}"${(f.rule || {}).type === v ? ' selected' : ''}>${l}</option>`).join('')}</select>
            <input type="text" data-k="kw" placeholder="키워드 (쉼표로 여러 개, 예: bmw, coway)" value="${esc((f.rule || {}).kw || '')}" style="${(f.rule || {}).type === 'from' ? '' : 'display:none'};min-width:240px"></div>
        </div>`).join('') + `<button class="btn" id="addFtr">${ico('plus')} 풋터 추가</button><input type="file" accept="image/*" id="ftrImg" hidden>`;
    }
    if (t === 'boxes') {
      let h = '<p class="desc">순서·위치는 왼쪽 목록에서 끌어서 바꿀 수 있고, 메일함에서 우클릭하거나 ⋮을 눌러도 같은 메뉴가 나와요.</p>';
      const walk = (p, dep) => childrenOf(p).forEach(b => {
        h += `<div class="bxr" data-id="${b.id}" style="padding-left:${dep * 22}px">${ico('folder', 16)}<input type="text" value="${esc(b.name)}" data-k="name">
          <label class="opt" style="padding:0 6px;font-size:12.5px"><input type="checkbox" data-k="hide"${b.hidden ? ' checked' : ''}> 숨기기</label>
          <button class="btn" data-k="sub" style="padding:3px 8px">${ico('plus', 14)} 하위</button><button class="ib" data-k="del" title="삭제">${ico('trash')}</button></div>`;
        walk(b.id, dep + 1);
      });
      walk(null, 0);
      body.innerHTML = h + `<button class="btn" id="addTop" style="margin-top:10px">${ico('plus')} 메일함 추가</button>`;
    }
    if (t === 'account') {
      const c = store.get('connected', null);
      body.innerHTML = `<h5>Gmail 계정</h5>${c ? `<p>${ico('env', 16)} <b>${esc(c.email)}</b> 연결됨 <span style="color:var(--mute)">(${esc(c.at || '')})</span></p><p class="desc">${real.on ? '최근 받은 메일 40통·보낸 메일 20통을 보여 주고 있어요. 읽음 표시·메일함 이동·삭제(휴지통)·메일함 이름 바꾸기는 <b>Gmail에도 바로 반영</b>돼요. 메일함 순서와 숨기기는 이 화면에서만 바뀌어요.' : '지금 화면의 메일은 예시예요.'}</p><button class="btn pri" id="loadReal">${real.on ? '다시 불러오기' : '실제 메일 불러오기'}</button> ${real.on ? '<button class="btn" id="useSample">예시 메일로 보기</button> ' : ''}<button class="btn" id="reconn">다시 연결</button> <button class="btn" id="disconn">연결 해제</button>` : `<p class="desc">아직 연결하지 않았어요.</p><button class="btn pri" id="reconn">Gmail 계정 연결하기</button>`}`;
    }
  };
  body.addEventListener('input', e => {
    const k = e.target.dataset.k, fr = e.target.closest('.ftr'), br = e.target.closest('.bxr');
    if (fr) {
      const f = FOOTERS.find(x => x.id === fr.dataset.id);
      if (k === 'name') f.name = e.target.value;
      if (e.target.classList.contains('ed')) f.html = e.target.innerHTML;
      if (k === 'kw') f.rule.kw = e.target.value;
      saveAll(); renderFooterBar();
    }
    if (br && k === 'name') { boxById(br.dataset.id).name = e.target.value; rerender(); }
  });
  body.addEventListener('change', e => {
    const k = e.target.dataset.k, fr = e.target.closest('.ftr'), br = e.target.closest('.bxr');
    if (e.target.name === 'cm') { SET.composeMode = e.target.value; saveAll(); }
    if (e.target.id === 'setTypo') { SET.typo = e.target.checked; saveAll(); runTypo(); }
    if (fr) {
      const f = FOOTERS.find(x => x.id === fr.dataset.id);
      if (k === 'family') f.font.family = e.target.value;
      if (k === 'size') f.font.size = +e.target.value;
      if (k === 'rule') { f.rule = f.rule || {}; f.rule.type = e.target.value; $('[data-k=kw]', fr).style.display = e.target.value === 'from' ? '' : 'none'; }
      $('.ed', fr).setAttribute('style', footerStyle(f)); saveAll();
    }
    if (br && k === 'name' && real.on) renamePaths(br.dataset.id);
    if (br && k === 'hide') { descIds(br.dataset.id).forEach(x => { boxById(x).hidden = e.target.checked; }); if (e.target.checked && descIds(br.dataset.id).includes(st.folder)) st.folder = 'inbox'; rerender(); show('boxes'); }
    if (e.target.id === 'ftrImg' && imgTarget) {
      const file = e.target.files[0]; if (!file) return;
      const tgt = imgTarget;
      const rd = new FileReader(); rd.onload = () => { const ed = $('.ed', tgt); ed.insertAdjacentHTML('beforeend', `<br><img src="${rd.result}" style="max-width:240px">`); const f = FOOTERS.find(x => x.id === tgt.dataset.id); f.html = ed.innerHTML; saveAll(); e.target.value = ''; };
      rd.readAsDataURL(file);
    }
  });
  let imgTarget = null;
  body.addEventListener('click', async e => {
    const t = e.target.closest('button'); if (!t) return;
    const fr = t.closest('.ftr'), br = t.closest('.bxr');
    if (t.id === 'clrIgn') { IGNORE.clear(); store.set('typo-ignore', []); show('general'); runTypo(); return; }
    if (t.id === 'pickDir') {
      if (!window.showDirectoryPicker) { toast('이 브라우저에서는 폴더 고르기를 지원하지 않아요'); return; }
      try { const h = await window.showDirectoryPicker({ mode: 'readwrite' }); await idb('put', h); $('#dirName', body).textContent = '현재: ' + h.name; toast(`'${h.name}' 폴더를 저장 폴더로 정했어요`); } catch (err) { /* 취소 */ }
      return;
    }
    if (t.id === 'reconn') { bg.remove(); openWelcome(true); return; }
    if (t.id === 'loadReal') { bg.remove(); loadReal(!real.token, real.token); return; }
    if (t.id === 'useSample') { location.reload(); return; }
    if (t.id === 'disconn') { store.set('connected', null); show('account'); toast('연결을 해제했어요'); return; }
    if (t.id === 'addFtr') { FOOTERS.push({ id: 'f' + Date.now(), name: '새 풋터', html: '', font: { family: '맑은 고딕', size: 10, color: '#202124' }, rule: { type: 'none', kw: '' } }); saveAll(); show('footers'); renderFooterBar(); return; }
    if (t.id === 'addTop') { const nb = { id: 'b' + Date.now(), name: '새 메일함', parent: null, pending: real.on }; BOXES.push(nb); if (real.on) { bg.remove(); renderNav(); renameBox(nb.id); return; } rerender(); show('boxes'); return; }
    if (fr) {
      const f = FOOTERS.find(x => x.id === fr.dataset.id);
      if (t.dataset.k === 'del') { FOOTERS = FOOTERS.filter(x => x !== f); saveAll(); show('footers'); renderFooterBar(); }
      if (t.dataset.k === 'color') paletteMenu(t, PALETTE, f.font.color, c => { f.font.color = c || '#202124'; saveAll(); show('footers'); }, '기본 (검정)');
      if (t.dataset.k === 'img') { imgTarget = fr; $('#ftrImg', body).click(); }
      return;
    }
    if (br) {
      const b = boxById(br.dataset.id);
      if (t.dataset.k === 'sub') { const nb = { id: 'b' + Date.now(), name: '새 하위 메일함', parent: b.id, pending: real.on }; BOXES.push(nb); st.collapsed.delete(b.id); if (real.on) { bg.remove(); renderNav(); renameBox(nb.id); return; } rerender(); show('boxes'); }
      if (t.dataset.k === 'del') { bg.remove(); deleteBox(b.id); }
    }
  });
  bg.addEventListener('click', e => { const tb = e.target.closest('[data-tab]'); if (tb) show(tb.dataset.tab); if (e.target.closest('[data-x]') || e.target === bg) { bg.remove(); closeMenus(); } });
  show(tab || 'general');
}

/* ───────── 첫 접속: Gmail 계정 연결 ───────── */
const CLIENT_ID = '94151073420-uuu2lscanfblmr7f7ghllcpe90e7c2uv.apps.googleusercontent.com';
const SCOPE = 'https://www.googleapis.com/auth/gmail.modify';  // 읽기 + 읽음표시·라벨(메일함)·휴지통 이동
const IS_EXT = !!(window.chrome && chrome.identity && chrome.identity.launchWebAuthFlow);
// 로그인 토큰(1시간)은 이 브라우저에만 잠깐 보관 → 새로고침해도 다시 로그인하지 않음
const tokCache = { get() { const t = store.get('tok', null); return t && t.exp > Date.now() + 60000 ? t.t : null; }, set(t, sec) { store.set('tok', { t, exp: Date.now() + (sec || 3500) * 1000 }); }, clear() { store.set('tok', null); } };
let gisReady = null;
const loadGis = () => gisReady || (gisReady = new Promise((res, rej) => { const sc = document.createElement('script'); sc.src = 'https://accounts.google.com/gsi/client'; sc.onload = res; sc.onerror = () => rej(new Error('구글 로그인 도구를 불러오지 못했어요')); document.head.append(sc); }));
// interactive=false: 창을 띄우지 않고 가능한 경우에만 로그인
function googleLogin(interactive = true) {
  const c = store.get('connected', null);
  const cached = tokCache.get();
  if (cached && !interactive) return Promise.resolve(cached);
  if (!IS_EXT) {
    if (!interactive) return Promise.reject(new Error('다시 로그인이 필요해요'));
    // Google 로그인은 등록된 https 주소에서만 됨
    const okOrigins = ['https://mail.jintar.co.kr', 'https://yoonjintar2-ctrl.github.io'];
    if (!okOrigins.includes(location.origin)) return Promise.reject(new Error(location.protocol !== 'https:' ? '보안 연결(https)이 아직 준비 중이에요. https://yoonjintar2-ctrl.github.io/mail/ 에서 연결해 주세요' : '이 주소에서는 로그인할 수 없어요 (' + location.origin + ')'));
    return loadGis().then(() => new Promise((res, rej) => {
      const tc = google.accounts.oauth2.initTokenClient({ client_id: CLIENT_ID, scope: SCOPE, hint: c && c.email || undefined,
        callback: r => r.access_token ? (tokCache.set(r.access_token, r.expires_in), res(r.access_token)) : rej(new Error(r.error || '로그인이 취소됐어요')),
        error_callback: e => rej(new Error(e && e.type === 'popup_closed' ? '로그인 창이 닫혔어요' : (e && e.message) || '로그인 실패')) });
      tc.requestAccessToken({ prompt: c ? '' : 'select_account' });
    }));
  }
  return new Promise((res, rej) => {
    const p = { client_id: CLIENT_ID, response_type: 'token', redirect_uri: chrome.identity.getRedirectURL(), scope: SCOPE, prompt: interactive ? 'select_account' : 'none' };
    if (c && c.email) p.login_hint = c.email;
    chrome.identity.launchWebAuthFlow({ url: 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams(p), interactive }, r => {
      if (chrome.runtime.lastError) return rej(new Error(chrome.runtime.lastError.message));
      const h = new URLSearchParams((r || '').split('#')[1] || '');
      h.get('access_token') ? (tokCache.set(h.get('access_token'), +h.get('expires_in')), res(h.get('access_token'))) : rej(new Error(h.get('error') || '로그인이 취소됐어요'));
    });
  });
}
/* ───────── 실제 Gmail 메일 불러오기 · 바뀐 내용 Gmail에 반영 ───────── */
const real = { on: false, token: null };
async function gapi(path, opt, tries) {
  opt = opt || {}; tries = tries || 0;
  const r = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/' + path, { method: opt.method || 'GET', headers: Object.assign({ Authorization: 'Bearer ' + real.token }, opt.body ? { 'Content-Type': 'application/json' } : {}), body: opt.body ? JSON.stringify(opt.body) : undefined });
  if (r.status === 401) { tokCache.clear(); real.expired = true; renderTop(); throw new Error('로그인이 만료됐어요. 위쪽 초록 표시를 눌러 다시 연결해 주세요'); }
  if ((r.status === 429 || r.status >= 500) && tries < 4) { await new Promise(z => setTimeout(z, 800 * 2 ** tries + Math.random() * 400)); return gapi(path, opt, tries + 1); }
  if (!r.ok) { let msg = 'Gmail ' + r.status; try { msg += ': ' + (await r.json()).error.message; } catch (e) { /* */ } throw new Error(msg); }
  return r.status === 204 ? {} : r.json().catch(() => ({}));
}
// 화면에서 바꾼 것을 Gmail에도 반영 (실패하면 알림)
function sync(label, job) { if (!real.on) return Promise.resolve(); return job().catch(e => { toast(`Gmail 반영 실패 (${label}): ${e.message}`); throw e; }); }
const gidsOf = ids => ids.map(id => (MAILS.find(m => m.id === id) || {}).gid).filter(Boolean);
// 이 화면에서 바꾼 상태는 따로 기억 → 뒤에서 받아 오는 목록이 옛 상태로 덮어쓰지 않게
const syncLabels = (ids, add, remove, what) => { real.over = real.over || new Map(); gidsOf(ids).forEach(g => {
    const o = real.over.get(g) || {}; if (add.includes('UNREAD')) o.unread = 1; if (remove.includes('UNREAD')) o.unread = 0;
    if (add.includes('INBOX')) o.inbox = 1; if (remove.includes('INBOX')) o.inbox = 0;
    const nb2 = add.find(x => /^Label_/.test(x)); if (nb2) o.box = nb2; real.over.set(g, o); });
  if (real.lab) gidsOf(ids).forEach(g => {
    if (add.includes('UNREAD')) real.lab.unread.add(g); if (remove.includes('UNREAD')) real.lab.unread.delete(g);
    if (add.includes('INBOX')) real.lab.inbox.add(g); if (remove.includes('INBOX')) real.lab.inbox.delete(g);
    const nb = add.find(x => /^Label_/.test(x)); if (nb) real.lab.box.set(g, nb); else if (remove.some(x => real.lab.box.get(g) === x)) real.lab.box.delete(g); });
  return syncLabels0(ids, add, remove, what); };
const syncLabels0 = (ids, add, remove, what) => sync(what || '라벨', () => gapi('messages/batchModify', { method: 'POST', body: { ids: gidsOf(ids), addLabelIds: add || [], removeLabelIds: remove || [] } }));
const labelPath = id => { const out = []; let b = boxById(id); while (b) { out.unshift(b.name); b = boxById(b.parent); } return out.join('/'); };
const FT_OF = { xls: 'XLS', xlsx: 'XLS', csv: 'XLS', ppt: 'PPT', pptx: 'PPT', pdf: 'PDF', doc: 'DOC', docx: 'DOC', hwp: 'DOC', hwpx: 'DOC', jpg: 'IMG', jpeg: 'IMG', png: 'IMG', gif: 'IMG', webp: 'IMG', bmp: 'IMG', zip: 'ZIP', '7z': 'ZIP', rar: 'ZIP' };
const b64bytes = s => { const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/')); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; };
const b64text = s => new TextDecoder().decode(b64bytes(s));
function parsePeople(str) {
  const out = []; if (!str) return out;
  const re = /(?:"?([^"<,]*?)"?\s*<([^>]+)>)|([^\s,<>"]+@[^\s,<>"]+)/g; let m;
  while ((m = re.exec(str))) { const email = (m[2] || m[3]).trim().toLowerCase(); const name = (m[1] || '').trim().replace(/^'|'$/g, ''); out.push({ name: name || email.split('@')[0], email }); }
  return out;
}
const decodeEnt = t => { const d = document.createElement('textarea'); d.innerHTML = t || ''; return d.value; };
// full=true: 본문까지 / false: 목록용(머리글·첨부 목록·미리보기 한 줄)
function parseMsg(g, full) {
  const H = {}; (g.payload.headers || []).forEach(h => { H[h.name.toLowerCase()] = h.value; });
  let plain = '', html = ''; const parts = [];
  const walk = (p, parent) => {
    const ph = {}; (p.headers || []).forEach(h => { ph[h.name.toLowerCase()] = h.value; });
    if (p.filename && p.body && (p.body.attachmentId || p.body.data)) parts.push({ p, cid: (ph['content-id'] || '').replace(/[<>]/g, ''), disp: ph['content-disposition'] || '', related: parent === 'multipart/related' });
    else if (p.mimeType === 'text/plain' && p.body && p.body.data && !plain) plain = b64text(p.body.data);
    else if (p.mimeType === 'text/html' && p.body && p.body.data && !html) html = b64text(p.body.data);
    (p.parts || []).forEach(c => walk(c, p.mimeType));
  };
  walk(g.payload, '');
  // 본문 안에만 들어간 그림(서명 로고 등) = inline → 첨부 표시에서 뺌
  const att = parts.map(({ p, cid, disp, related }) => {
    const ext = (p.filename.split('.').pop() || '').toLowerCase();
    const img = /^image\//.test(p.mimeType);
    const inline = full && html ? (!!cid && html.includes('cid:' + cid)) || (img && /^\s*inline/i.test(disp)) : img && (/^\s*inline/i.test(disp) || (!!cid && related));
    return [FT_OF[ext] || 'FILE', p.filename, fmtSize(p.body.size || 0), { id: p.body.attachmentId, data: p.body.data, mime: p.mimeType, msg: g.id, cid, inline }];
  });
  if (!plain && html) plain = new DOMParser().parseFromString(html, 'text/html').body.innerText || '';
  const when = new Date(+g.internalDate);
  return { gid: g.id, when: +when, from: parsePeople(H.from)[0] || { name: '(알 수 없음)', email: '' }, to: parsePeople(H.to), cc: parsePeople(H.cc),
    subj: H.subject || '(제목 없음)', snippet: decodeEnt(g.snippet), body: full ? plain.replace(/\r/g, '').trim() : '', html: full ? html : '', att, full: !!full };
}
// 목록용 데이터 → 화면용 메일 (라벨 상태는 따로 매번 새로 받아서 씌움)
function toMail(meta, lab) {
  const when = new Date(meta.when), day = new Date(when); day.setHours(0, 0, 0, 0);
  const g = meta.gid;
  const m = Object.assign({}, meta, { id: real.num(g), real: true, d: Math.max(0, Math.round((TODAY - day) / 86400000)), t: when.toTimeString().slice(0, 5),
    prev: [], draft: null, inbox: lab.inbox.has(g) ? 1 : 0, sent: lab.sent.has(g) ? 1 : 0, unread: lab.unread.has(g) ? 1 : 0, box: lab.box.get(g) || null });
  if (m.from.email === ME.email) m.from = ME;
  const o = real.over && real.over.get(g); if (o) Object.assign(m, o);
  return m;
}
// 이 브라우저 안의 저장소(IndexedDB) — 한 번 받은 목록은 다음부터 다시 안 받음
function cacheDb() {
  return new Promise(res => { try { const rq = indexedDB.open('jin-cache-' + ME.email, 1); rq.onupgradeneeded = () => rq.result.createObjectStore('meta', { keyPath: 'gid' }); rq.onsuccess = () => res(rq.result); rq.onerror = () => res(null); } catch (e) { res(null); } });
}
const cacheAll = db => new Promise(res => { if (!db) return res([]); try { const r = db.transaction('meta').objectStore('meta').getAll(); r.onsuccess = () => res(r.result || []); r.onerror = () => res([]); } catch (e) { res([]); } });
const cachePut = (db, list) => { if (!db || !list.length) return; try { const tx = db.transaction('meta', 'readwrite'); const os = tx.objectStore('meta'); list.forEach(x => os.put(Object.assign({}, x, { body: '', html: '', full: false, att: x.att.map(a => [a[0], a[1], a[2], Object.assign({}, a[3], { data: undefined })]) }))); } catch (e) { /* 저장 실패는 무시 */ } };
async function listIds(q, label) {
  const out = []; let tok = '';
  do { const r = await gapi(`messages?maxResults=500&q=${encodeURIComponent(q)}${label ? '&labelIds=' + label : ''}${tok ? '&pageToken=' + tok : ''}`); (r.messages || []).forEach(x => out.push(x.id)); tok = r.nextPageToken || ''; } while (tok);
  return out;
}
const META_FIELDS = 'id,internalDate,snippet,payload(mimeType,headers,parts(mimeType,filename,headers,body(attachmentId,size),parts(mimeType,filename,headers,body(attachmentId,size),parts(mimeType,filename,headers,body(attachmentId,size),parts(mimeType,filename,headers,body(attachmentId,size))))))';
const DAYS = 92;  // 최근 3개월
// 최신 메일부터 화면에 먼저 보여 주고, 나머지는 뒤에서 차차 받아 옴
async function loadReal(interactive, token) {
  if (real.loading) return; real.loading = true;
  const prog = t => { real.prog = t; renderTop(); const bm = $('#bootMsg'); if (bm && t) bm.textContent = t; };
  try {
    real.token = token || await googleLogin(interactive); real.expired = false;
    prog('Gmail 연결 중…');
    const [prof, labs] = await Promise.all([gapi('profile'), gapi('labels')]);
    ME.email = prof.emailAddress.toLowerCase();
    real.ids = real.ids || new Map(); real.num = g => { if (!real.ids.has(g)) real.ids.set(g, real.ids.size + 1); return real.ids.get(g); };
    // 라벨 → 메일함 ('상위/하위' 이름 구조 그대로). 숨김은 이 브라우저에만 기억
    const hid = new Set(store.get('real-hidden', []));
    const user = (labs.labels || []).filter(l => l.type === 'user').sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    const byName = new Map(user.map(l => [l.name, l.id]));
    BOXES = user.map(l => { const k = l.name.lastIndexOf('/'); return { id: l.id, name: k < 0 ? l.name : l.name.slice(k + 1), parent: k < 0 ? null : (byName.get(l.name.slice(0, k)) || null), hidden: hid.has(l.id) }; });
    const db = await cacheDb(); const cached = new Map((await cacheAll(db)).map(x => [x.gid, x]));
    const metas = new Map(); const lab = { inbox: new Set(), sent: new Set(), unread: new Set(), box: new Map() };
    real.lab = lab;
    const first = !real.on;
    const show = () => {
      const keepFull = new Map(MAILS.filter(m => m.real && m.full).map(m => [m.gid, m]));
      MAILS = [...metas.values()].filter(x => !(real.gone && real.gone.has(x.gid))).map(x => { const k = keepFull.get(x.gid); return toMail(k ? Object.assign({}, x, { body: k.body, html: k.html, htmlReady: k.htmlReady, att: k.att, full: true }) : x, lab); }).sort((a, b) => b.when - a.when);
      if (first && !real.on) { real.on = true; st.folder = 'inbox'; st.open = null; st.picked.clear(); }
      bootScreen('off'); renderNav(); renderList(); renderTop();
      if (st.open == null) { const f = visible()[0]; if (f) openMail(f.id); } else renderRead();
    };
    const fetchMetas = async (ids, label) => {
      const need = ids.filter(g => !metas.has(g));
      need.forEach(g => { if (cached.has(g)) metas.set(g, cached.get(g)); });
      const todo = need.filter(g => !metas.has(g)); let i = 0, done = 0, buf = [];
      await Promise.all(Array.from({ length: 8 }, async () => {
        while (i < todo.length) {
          const g = todo[i++];
          try { const x = parseMsg(await gapi(`messages/${g}?format=full&fields=${encodeURIComponent(META_FIELDS)}`), false); metas.set(g, x); buf.push(x); } catch (e) { /* 한 통 실패는 건너뜀 */ }
          done++;
          if (done % 50 === 0) { cachePut(db, buf); buf = []; prog(`${label} ${done}/${todo.length}`); show(); }
        }
      }));
      cachePut(db, buf);
      return todo.length;
    };
    // 1단계: 최근 1주 (금방) → 바로 화면에
    prog('최근 메일 불러오는 중…');
    const stage = async (q, label) => {
      const [all, inb, snt, unr] = await Promise.all([listIds(q), listIds(q, 'INBOX'), listIds(q, 'SENT'), listIds(q, 'UNREAD')]);
      inb.forEach(g => lab.inbox.add(g)); snt.forEach(g => lab.sent.add(g)); unr.forEach(g => lab.unread.add(g));
      const n = await fetchMetas(all, label); show(); return [all.length, n];
    };
    await stage('newer_than:7d', '최근 메일 받는 중');
    // 메일함(라벨) 정보: 메일함마다 3개월치 번호만 (가벼움)
    prog('메일함 정리 중…');
    for (const b of BOXES) { try { (await listIds(`newer_than:${DAYS}d`, b.id)).forEach(g => { if (!lab.box.has(g)) lab.box.set(g, b.id); }); } catch (e) { /* 건너뜀 */ } }
    show();
    // 2단계: 나머지 3개월 — 뒤에서 차차
    const [total, fresh] = await stage(`newer_than:${DAYS}d`, '3개월치 메일 받는 중');
    prog('');
    toast(`${prof.emailAddress} · 최근 3개월 메일 ${total}통 준비 완료${fresh ? ` (새로 받은 ${fresh}통)` : ''}`);
  } catch (err) { real.expired = !real.on; prog(''); renderTop(); if (!real.on && $('#boot')) bootScreen('login', '메일을 불러오지 못했어요: ' + err.message); else toast('실제 메일을 불러오지 못했어요: ' + err.message); }
  finally { real.loading = false; }
}
// 메일을 열 때 본문 전체 받기
async function fetchFull(m) {
  if (!m || !m.real || m.full || m._loading) return;
  m._loading = true;
  try { const x = parseMsg(await gapi(`messages/${m.gid}?format=full`), true); Object.assign(m, { body: x.body, html: x.html, att: x.att, full: true }); }
  catch (e) { toast('본문을 불러오지 못했어요: ' + e.message); }
  finally { m._loading = false; if (st.open === m.id) renderRead(); renderList(); }
}
// 본문 그림(cid:)을 실제 그림으로 바꿔 끼우기 — 메일을 열 때 한 번만
async function resolveInline(m) {
  if (m.htmlReady || !m.html || !/cid:/i.test(m.html)) { m.htmlReady = m.htmlReady || m.html; return m.htmlReady; }
  let h = m.html;
  await Promise.all(m.att.filter(a => a[3].cid).map(async a => {
    try {
      const data = a[3].data || (await gapi(`messages/${m.gid || a[3].msg}/attachments/${a[3].id}`)).data;
      const src = `data:${a[3].mime};base64,` + data.replace(/-/g, '+').replace(/_/g, '/');
      h = h.split('cid:' + a[3].cid).join(src);
    } catch (e) { /* 그림 하나 실패는 건너뜀 */ }
  }));
  return (m.htmlReady = h);
}

async function openRealAtt(m, a) {
  const meta = a[3];
  if (!/^(PDF|IMG)$/.test(a[0])) { toast('엑셀·PPT·워드 실제 미리보기는 다음 단계에서 연결할게요 (지금은 PDF·이미지)'); return; }
  const w = window.open('', '_blank', 'popup,width=1100,height=820'); if (w) w.document.title = a[1];
  try {
    const data = meta.data || (await gapi(`messages/${m.gid || meta.msg}/attachments/${meta.id}`)).data;
    const url = URL.createObjectURL(new Blob([b64bytes(data)], { type: meta.mime }));
    if (w) w.location.href = url;
  } catch (e) { if (w) w.close(); toast('첨부를 열지 못했어요'); }
}
// 로딩·다시 로그인 화면 (예시 메일이 잠깐 보였다 바뀌는 것 방지)
function bootScreen(mode, msg) {
  let el = $('#boot');
  if (mode === 'off') { if (el) el.remove(); return; }
  if (!el) { el = document.createElement('div'); el.id = 'boot'; document.body.append(el); }
  const c = store.get('connected', null) || {};
  el.innerHTML = `<div class="bootbox"><div class="logo">${ico('env', 44)}</div><h2>JIN-mail</h2>${mode === 'loading'
    ? `<div class="spin"></div><p id="bootMsg">${esc(msg || 'Gmail에서 메일을 불러오는 중…')}</p>`
    : `<p>${esc(msg || (c.email ? c.email + ' 로그인이 만료됐어요' : 'Gmail 계정 연결이 필요해요'))}</p><button class="btn pri gbtn" id="bootGo">${ico('env', 18)} Gmail 다시 연결</button><button class="later" id="bootSample">예시 메일로 둘러보기</button>`}</div>`;
  const go = $('#bootGo', el); if (go) go.onclick = () => { bootScreen('loading'); loadReal(true); };
  const sm = $('#bootSample', el); if (sm) sm.onclick = () => { store.set('skip-connect', true); location.hash = ''; MAILS = SAMPLE_MAILS.slice(); BOXES = store.get('boxes', DEFAULT_BOXES); real.expired = false; bootScreen('off'); renderTop(); renderNav(); renderList(); const f = visible()[0]; if (f) openMail(f.id); };
}
function openWelcome(force) {
  if (!force && (store.get('connected', null) || store.get('skip-connect', false))) return;
  const bg = document.createElement('div'); bg.className = 'modal-bg';
  bg.innerHTML = `<div class="modal welcome"><div class="logo">${ico('env', 48)}</div><h2>JIN-mail</h2><p>쓰던 Gmail 계정을 연결하면 바로 시작할 수 있어요.</p>
    <div class="steps"><div><span class="st" id="s1">1</span>Gmail 계정으로 로그인 (메일 읽기·정리 권한)</div><div><span class="st" id="s2">2</span>라벨을 메일함으로, 서명을 풋터로 가져오기</div><div><span class="st" id="s3">3</span>시작</div></div>
    <button class="btn pri gbtn" id="gConn">${ico('env', 18)} Gmail 계정 연결하기</button><div class="res" id="gRes"></div><button class="later" id="gLater">나중에 할게요 (예시 메일로 둘러보기)</button></div>`;
  document.body.append(bg);
  $('#gLater', bg).addEventListener('click', () => { store.set('skip-connect', true); bg.remove(); });
  $('#gConn', bg).addEventListener('click', async () => {
    const res = $('#gRes', bg); res.textContent = '로그인 창을 여는 중…'; res.style.color = 'var(--sub)';
    try {
      const token = await googleLogin();
      $('#s1', bg).classList.add('ok'); $('#s1', bg).textContent = '✓'; res.textContent = '계정 정보를 읽는 중…';
      const api = p => fetch('https://gmail.googleapis.com/gmail/v1/users/me/' + p, { headers: { Authorization: 'Bearer ' + token } }).then(r => r.ok ? r.json() : Promise.reject(new Error('Gmail API ' + r.status)));
      const prof = await api('profile'); const labs = await api('labels');
      const user = (labs.labels || []).filter(l => l.type === 'user');
      $('#s2', bg).classList.add('ok'); $('#s2', bg).textContent = '✓'; $('#s3', bg).classList.add('ok'); $('#s3', bg).textContent = '✓';
      store.set('connected', { email: prof.emailAddress, labels: user.length, at: new Date().toLocaleString('ko-KR') });
      res.style.color = 'var(--blue)';
      res.innerHTML = `<b>${esc(prof.emailAddress)}</b> 연결 완료 · 라벨 ${user.length}개 확인<br><span style="color:var(--sub)">최근 메일을 불러올게요…</span>`;
      $('#gConn', bg).textContent = '시작하기'; $('#gConn', bg).onclick = () => bg.remove();
      setTimeout(() => { bg.remove(); MAILS = []; BOXES = []; st.open = null; renderNav(); renderList(); renderRead(); bootScreen('loading', '최근 메일을 불러오는 중…'); loadReal(true, token); }, 900);
    } catch (err) { res.style.color = '#d93025'; res.textContent = '연결하지 못했어요: ' + err.message; }
  });
}

/* ───────── 끌어서 놓기: 메일 → 메일함, 메일함 순서·위치 ───────── */
let drag = null;
function navDrop(e, el, doIt) {
  const id = el.dataset.box;
  if (drag.kind === 'mail') { if (!id) return null; return doIt ? moveTo(drag.ids, id) : 'in'; }
  if (drag.kind === 'box') {
    if (!id || descIds(drag.id).includes(id)) return null;
    const r = el.getBoundingClientRect(), y = (e.clientY - r.top) / r.height;
    const pos = y < .3 ? 'before' : y > .7 ? 'after' : 'in';
    if (!doIt) return pos;
    const me = boxById(drag.id), tgt = boxById(id);
    BOXES = BOXES.filter(b => b !== me);
    const oldParent = me.parent;
    if (pos === 'in') { me.parent = tgt.id; BOXES.push(me); st.collapsed.delete(tgt.id); }
    else { me.parent = tgt.parent; const i = BOXES.indexOf(tgt); BOXES.splice(pos === 'before' ? i : i + 1, 0, me); }
    saveAll(); renderNav(); renderList(); renderRead();
    if (real.on && oldParent !== me.parent) renamePaths(me.id);  // Gmail은 상·하위 관계만 반영 (순서는 이 화면에서만)
  }
}
/* 영역 너비: 경계선을 끌어서 조절, 다음에도 유지 */
function setupDragScroll() {
  let tgt = null, speed = 0, raf = 0;
  const tick = () => { if (tgt && speed) { tgt.scrollTop += speed; raf = requestAnimationFrame(tick); } else raf = 0; };
  document.addEventListener('dragover', e => {
    const el = e.target.closest && e.target.closest('#nav, #rows'); speed = 0; tgt = null;
    if (el) { const r = el.getBoundingClientRect(), z = 60;
      if (e.clientY < r.top + z) speed = -Math.ceil((r.top + z - e.clientY) / 4);
      else if (e.clientY > r.bottom - z) speed = Math.ceil((e.clientY - (r.bottom - z)) / 4);
      tgt = el; }
    if (speed && !raf) raf = requestAnimationFrame(tick);
  });
  const stop = () => { speed = 0; tgt = null; };
  document.addEventListener('dragend', stop); document.addEventListener('drop', stop);
  // 혹시 휠 신호가 오는 환경이면 그대로 스크롤
  document.addEventListener('wheel', e => { if (!drag) return; const el = e.target.closest && e.target.closest('#nav, #rows'); if (el) el.scrollTop += e.deltaY; }, { passive: true });
}
function setupSplits() {
  const Wd = store.get('widths', null);
  if (Wd) { document.documentElement.style.setProperty('--w-nav', Wd.nav + 'px'); document.documentElement.style.setProperty('--w-list', Wd.list + 'px'); }
  $$('.split').forEach(sp => sp.addEventListener('mousedown', e => {
    e.preventDefault(); sp.classList.add('drag'); document.body.classList.add('resizing');
    const which = sp.dataset.split, el = which === 'nav' ? $('nav') : $('.list'), x0 = e.clientX, w0 = el.getBoundingClientRect().width;
    const mv = ev => { const w = Math.max(which === 'nav' ? 150 : 260, Math.min(which === 'nav' ? 380 : 760, w0 + ev.clientX - x0)); document.documentElement.style.setProperty(which === 'nav' ? '--w-nav' : '--w-list', w + 'px'); };
    const up = () => { sp.classList.remove('drag'); document.body.classList.remove('resizing'); document.removeEventListener('mousemove', mv); document.removeEventListener('mouseup', up); store.set('widths', { nav: $('nav').getBoundingClientRect().width, list: $('.list').getBoundingClientRect().width }); };
    document.addEventListener('mousemove', mv); document.addEventListener('mouseup', up);
  }));
}

/* ───────── 이벤트 연결 ───────── */
function wire() {
  $('#newMail').addEventListener('click', () => openCompose('new'));
  $('#gear').addEventListener('click', () => openSettings());
  const tg = (id, fn) => $(id).addEventListener('click', () => toggleMenu($(id), fn));
  tg('#fBox', boxFilterMenu); tg('#fWhere', whereMenu); tg('#fPeriod', periodMenu); tg('#fAtt', attMenu); tg('#fRead', readMenu);
  tg('#fFrom', () => personMenu('from')); tg('#fTo', () => personMenu('to'));
  // 검색
  const q = $('#q');
  q.addEventListener('input', () => { st.q = q.value; renderList(); });
  q.addEventListener('focus', renderSugg);
  q.addEventListener('blur', () => setTimeout(() => $('#sugg').classList.remove('on'), 150));
  q.addEventListener('keydown', e => { if (e.key === 'Enter') { $('#sugg').classList.remove('on'); const first = visible()[0]; if (first) openMail(first.id); } if (e.key === 'Escape') { q.value = ''; st.q = ''; renderList(); } });
  $('#goSearch').addEventListener('click', () => { st.q = q.value; $('#sugg').classList.remove('on'); renderList(); });
  $('#sugg').addEventListener('mousedown', e => { e.preventDefault(); const si = e.target.closest('.si'); if (!si) return; if (si.dataset.id) openMail(+si.dataset.id); if (si.dataset.p) { st.f.from = si.dataset.p; q.value = ''; st.q = ''; renderTop(); renderList(); } $('#sugg').classList.remove('on'); });
  // 왼쪽
  const nav = $('#nav');
  nav.addEventListener('click', e => {
    if (e.target.closest('#addBox')) { const nb = { id: 'b' + Date.now(), name: '새 메일함', parent: null, pending: real.on }; BOXES.push(nb); saveAll(); renderNav(); renameBox(nb.id); return; }
    if (e.target.closest('#hidToggle')) { SET.showHidden = !SET.showHidden; saveAll(); renderNav(); return; }
    const dots = e.target.closest('[data-dots]'); if (dots) { e.stopPropagation(); boxMenu(dots, dots.dataset.dots); return; }
    const tw = e.target.closest('[data-tw]');
    if (tw && tw.innerHTML) { const id = tw.dataset.tw; st.collapsed.has(id) ? st.collapsed.delete(id) : st.collapsed.add(id); store.set('collapsed', [...st.collapsed]); renderNav(); return; }
    if (e.target.closest('input.ren')) return;
    const a = e.target.closest('.ni[data-f]'); if (!a) return;
    st.folder = a.dataset.f; st.picked.clear(); renderNav(); renderTop(); renderList();
  });
  nav.addEventListener('contextmenu', e => { const el = e.target.closest('.ni[data-box]'); if (!el) return; e.preventDefault(); boxMenu(el, el.dataset.box, { x: e.clientX, y: e.clientY }); });
  nav.addEventListener('dragstart', e => { const el = e.target.closest('.ni[data-box]'); if (!el) return; drag = { kind: 'box', id: el.dataset.box }; e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', 'box'); });
  nav.addEventListener('dragover', e => {
    if (!drag) return; const el = e.target.closest('.ni'); $$('.ni', nav).forEach(x => x.classList.remove('drop-in', 'drop-before', 'drop-after'));
    if (!el) return; const pos = navDrop(e, el, false); if (!pos) return;
    e.preventDefault(); el.classList.add('drop-' + pos);
  });
  nav.addEventListener('dragleave', e => { if (!e.relatedTarget || !nav.contains(e.relatedTarget)) $$('.ni', nav).forEach(x => x.classList.remove('drop-in', 'drop-before', 'drop-after')); });
  nav.addEventListener('drop', e => { const el = e.target.closest('.ni'); if (!drag || !el) return; e.preventDefault(); navDrop(e, el, true); drag = null; renderNav(); });
  document.addEventListener('dragend', () => { drag = null; $$('.row.dragging').forEach(r => r.classList.remove('dragging')); $$('.ni').forEach(x => x.classList.remove('drop-in', 'drop-before', 'drop-after')); });
  // 목록
  const rows = $('#rows');
  rows.addEventListener('click', e => {
    const r = e.target.closest('.row'); if (!r) return; const id = +r.dataset.id;
    if (e.target.classList.contains('ck') || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) { if (!e.target.classList.contains('ck')) e.preventDefault(); pickClick(id, e); return; }
    st.anchor = id; openMail(id);
  });
  rows.addEventListener('mousedown', e => { if (e.shiftKey) e.preventDefault(); });
  rows.addEventListener('dragstart', e => {
    const r = e.target.closest('.row'); if (!r) return; const id = +r.dataset.id;
    const ids = st.picked.has(id) ? [...st.picked] : [id];
    drag = { kind: 'mail', ids }; e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', ids.join(','));
    $$('.row').forEach(x => x.classList.toggle('dragging', ids.includes(+x.dataset.id)));
  });
  $('#lhead').addEventListener('click', e => {
    if (e.target.id === 'ckAll') { const list = visible(); const all = list.every(m => st.picked.has(m.id)); list.forEach(m => all ? st.picked.delete(m.id) : st.picked.add(m.id)); renderList(); return; }
    const b = e.target.closest('[data-b]'); if (b && !b.disabled) bulk(b.dataset.b, b);
  });
  // 읽기
  $('#view').addEventListener('click', e => {
    const att = e.target.closest('.att[data-ai]'); if (att) { previewAtt(MAILS.find(x => x.id === st.open), +att.dataset.ai); return; }
    const b = e.target.closest('[data-act]'); if (!b) return;
    const act = b.dataset.act, m = MAILS.find(x => x.id === st.open);
    if (act === 'popview') { popView(st.open); return; }
    if (act === 'deldraft') { deleteDraft(m); return; }
    if (act === 'more') { menuAt(b, [{ html: ico('move', 16) + ' 다른 메일함으로 이동', act: () => setTimeout(() => moveMenu(b, [st.open])) }, { html: ico('read2', 16) + ' 안 읽음으로 표시', act: () => { m.unread = 1; renderNav(); renderList(); syncLabels([m.id], ['UNREAD'], [], '안 읽음'); } }, { html: ico('trash', 16) + ' 삭제', act: () => trashMails([m.id]) }]); return; }
    openCompose(act, document.body.classList.contains('popmode') ? { inline: true } : {});
  });
  // 작성
  fmtToolbar();
  $('#sendMenu').innerHTML = ico('down', 16);
  $('#attachBtn').innerHTML = ico('clip', 16) + ' 첨부';
  $('#popBtn').innerHTML = ico('pop', 16) + ' 새 창';
  $('#closeC').innerHTML = ico('close', 16) + ' 닫기';
  $('#discard').innerHTML = ico('trash', 19);
  $('#send').addEventListener('click', () => {
    clearTimeout(cs.timer); cs.saving = false;
    toast(cs.sched ? '예약했어요 (샘플이라 실제로 보내지는 않아요)' : '샘플 화면이라 실제로 보내지는 않아요');
    const m = MAILS.find(x => x.id === cs.mailId); if (m) m.draft = null;
    $('#read').classList.remove('composing'); renderList(); renderNav(); renderRead();
    if (document.body.classList.contains('popmode') && !st.open) setTimeout(() => window.close(), 900);
  });
  $('#sendMenu').addEventListener('click', () => toggleMenu($('#sendMenu'), schedMenu));
  $('#closeC').addEventListener('click', closeCompose);
  $('#discard').addEventListener('click', discardCompose);
  $('#popBtn').addEventListener('click', () => { flushCompose(); popCompose(draftNow()); $('#read').classList.remove('composing'); renderRead(); });
  $('#attachBtn').addEventListener('click', () => $('#filePick').click());
  $('#attBox').addEventListener('click', e => { if (!e.target.closest('.afile')) $('#filePick').click(); });
  $('#filePick').addEventListener('change', e => { addFiles(e.target.files); e.target.value = ''; });
  $('#imgPick').addEventListener('change', e => {
    const file = e.target.files[0]; if (!file) return;
    readImage(file).then(src => { insertImage(src); e.target.value = ''; });
  });
  // 작성 화면 어디에든 파일을 끌어다 놓으면 첨부 (본문에 그림이 들어가지 않게 막음)
  const comp = $('#compose'); let dc = 0;
  const isFiles = e => e.dataTransfer && [...e.dataTransfer.types].includes('Files');
  comp.addEventListener('dragenter', e => { if (!isFiles(e)) return; dc++; comp.classList.add('dragover'); });
  comp.addEventListener('dragleave', e => { if (!isFiles(e)) return; if (--dc <= 0) { dc = 0; comp.classList.remove('dragover'); } });
  comp.addEventListener('dragover', e => { if (isFiles(e)) e.preventDefault(); });
  comp.addEventListener('drop', e => { if (!isFiles(e)) return; e.preventDefault(); e.stopPropagation(); dc = 0; comp.classList.remove('dragover'); addFiles(e.dataTransfer.files); }, true);
  $('#fmt').addEventListener('mousedown', e => {
    const b = e.target.closest('[data-cmd]'); if (b) { e.preventDefault(); fmtCmd(b.dataset.cmd); return; }
    if (e.target.closest('#fTable')) { e.preventDefault(); tablePicker(); return; }
    if (e.target.closest('#fColor')) { e.preventDefault(); paletteMenu($('#fColor'), PALETTE, null, c => { restoreSel(); document.execCommand('styleWithCSS', false, true); document.execCommand('foreColor', false, c || '#000000'); $('#fColor .sw').style.background = c || '#000'; dirty(); }, '자동 (검정)'); return; }
    if (e.target.closest('#fHi')) { e.preventDefault(); paletteMenu($('#fHi'), PALETTE, null, c => { restoreSel(); document.execCommand('styleWithCSS', false, true); document.execCommand('hiliteColor', false, c || 'transparent'); $('#fHi .sw').style.background = c || 'transparent'; dirty(); }, '색 없음'); }
  });
  $('#fFont').addEventListener('change', e => { restoreSel(); document.execCommand('styleWithCSS', false, true); document.execCommand('fontName', false, e.target.value); dirty(); });
  $('#fSize').addEventListener('change', e => setSizePt(+e.target.value));
  $('#foot').addEventListener('mousedown', e => { const c = e.target.closest('[data-fid]'); if (c) { e.preventDefault(); applyFooter(c.dataset.fid); } if (e.target.closest('[data-set]')) { e.preventDefault(); openSettings('footers'); } });
  const body = $('#cbody');
  body.addEventListener('keydown', e => {
    if (selImg && (e.key === 'Delete' || e.key === 'Backspace')) { e.preventDefault(); selImg.remove(); posImgSel(); dirty(); return; }
    if (selImg && e.key !== 'Shift') { selImg = null; posImgSel(); }
    bodyKeydown(e);
  });
  // 붙여넣기: 그림만(캡처 등) → 커서 위치에 그림 / 글자·표 등 → 서식 그대로 + 옵션 버튼
  body.addEventListener('paste', e => {
    const cd = e.clipboardData; if (!cd) return;
    endPasteOpt();
    const img = [...cd.items].find(i => i.kind === 'file' && i.type.startsWith('image/'));
    const hasText = (cd.getData('text/plain') || '').trim() || cd.getData('text/html');
    if (img && !hasText) { e.preventDefault(); readImage(img.getAsFile()).then(insertImage); return; }
    if (!hasText) return;
    e.preventDefault(); doPaste(cd);
  });
  // 옵션 버튼은 계속 쓰거나 다른 데를 누르면 사라짐 (붙여넣은 내용은 그대로)
  body.addEventListener('keydown', e => {
    if (pasteOpt.on && e.key === 'Control' && !e.repeat) { pasteOpt.ctrlAlone = true; return; }
    if (pasteOpt.on && !/^(Shift|Control|Alt|Meta)$/.test(e.key)) endPasteOpt();
  }, true);
  body.addEventListener('keyup', e => { if (pasteOpt.on && e.key === 'Control' && pasteOpt.ctrlAlone) { const b = $('#pasteBtn'); if (b) b._open(); } pasteOpt.ctrlAlone = false; });
  document.addEventListener('keydown', e => { if (e.key !== 'Control') pasteOpt.ctrlAlone = false; }, true);
  document.addEventListener('mousedown', e => { if (pasteOpt.on && !e.target.closest('#pasteBtn, .menu')) endPasteOpt(); }, true);
  document.addEventListener('scroll', () => { const b = $('#pasteBtn'); if (b) b._place(); }, true);
  // Ctrl+K: 선택한 글자에 링크
  body.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && !e.shiftKey && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); e.stopPropagation(); linkMenu(true); } });
  body.addEventListener('mousedown', e => { if (e.target.tagName === 'IMG' && !e.target.closest('.quote')) { e.preventDefault(); selectImg(e.target); } });
  document.addEventListener('mousedown', e => { if (selImg && e.target !== selImg && !e.target.closest('#imgsel')) { selImg = null; posImgSel(); } }, true);
  document.addEventListener('scroll', posImgSel, true);
  window.addEventListener('resize', posImgSel);
  body.addEventListener('input', () => { dirty(); runTypo(); });
  body.addEventListener('compositionend', runTypo);
  body.addEventListener('keyup', () => { runTypo(); syncFmt(); });
  body.addEventListener('mouseup', () => { syncFmt(); typoAtCaret(); });
  body.addEventListener('blur', () => setTimeout(() => { if (!document.activeElement || !$('#cbody').contains(document.activeElement)) { const t = $('#tbar'); if (t && !t.matches(':hover')) t.remove(); } }, 200));
  $('#subj').addEventListener('input', dirty);
  setupRcpt($('#toBox')); setupRcpt($('#ccBox'));
  document.addEventListener('mousedown', e => { if (!e.target.closest('.typo')) $$('.typo').forEach(x => x.remove()); });
  // 단축키: j/k 다음·이전, r 답장, a 전체답장, f 전달, c 새 메일, / 검색, Esc 작성 닫기
  document.addEventListener('keydown', e => {
    if (e.target.closest('input, textarea, select, [contenteditable="true"]')) { if (e.key === 'Escape' && $('#read').classList.contains('composing') && !$('.menu')) closeCompose(); return; }
    if ($('.modal-bg')) return;
    const list = visible(); const i = list.findIndex(m => m.id === st.open);
    if (e.key === 'j' && list[i + 1]) openMail(list[i + 1].id);
    else if (e.key === 'k' && i > 0) openMail(list[i - 1].id);
    else if (st.open && /^[raf]$/.test(e.key)) { e.preventDefault(); openCompose({ r: 'reply', a: 'all', f: 'fwd' }[e.key], document.body.classList.contains('popmode') ? { inline: true } : {}); }
    else if (e.key === 'c') { e.preventDefault(); openCompose('new'); }
    else if (e.key === '/') { e.preventDefault(); $('#q').focus(); }
  });
  setupSplits(); setupDragScroll();
}

/* ───────── 시작 ───────── */
wire(); renderTop(); renderNav();
const hash = location.hash;
if (hash === '#compose') {
  document.body.classList.add('popmode'); document.title = '메일 쓰기 · JIN-mail';
  loadDraft(store.get('pop-draft', null) || buildDraft('new'));
} else if (hash === '#view=real') {
  document.body.classList.add('popmode');
  const m = store.get('pop-view', null);
  if (m) { MAILS = [m]; st.open = m.id; real.on = true; real.token = tokCache.get(); document.title = m.subj + ' · JIN-mail'; }
  renderRead();
} else if (/^#view=\d+/.test(hash)) {
  // 새 창 읽기 — 여기서 답장을 누르면 이 창에서 바로 작성
  document.body.classList.add('popmode');
  st.open = +hash.split('=')[1];
  const m = MAILS.find(x => x.id === st.open); if (m) { m.unread = 0; document.title = m.subj + ' · JIN-mail'; }
  renderRead();
} else if (store.get('connected', null)) {
  // 연결해 둔 계정이면 예시 메일을 잠깐이라도 보여 주지 않고 로딩 화면 → 실제 메일
  MAILS = []; BOXES = []; renderNav(); renderList(); renderRead();
  if (IS_EXT || tokCache.get()) { bootScreen('loading'); loadReal(false); } else { real.expired = true; renderTop(); bootScreen('login'); }
} else {
  renderList();
  const first = visible()[0]; if (first) openMail(first.id); else renderRead();
  openWelcome(false);
}
