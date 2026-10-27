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
  all: 'M4 7h16M4 12h16M4 17h16', unreadbox: 'M3 6h12M3 6v12h18v-6M3 6l8 6 3.5-2.2M19 8.5a2.5 2.5 0 1 1 0-.01',
  folder: 'M3 6h6l2 2h10v11H3z',
  right: 'M9 6l6 6-6 6', down: 'M6 9l6 6 6-6',
  drive: 'M8.5 3h7l6.5 11.5-3.5 6h-13L2 14.5zM8.5 3l6.6 11.5H22M15.5 3L8.8 14.5 5.5 20.5',
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
  rowA: 'M3 11h18v10H3zM3 16h18M9 11v10M15 11v10M12 2v6M9 5h6', rowB: 'M3 3h18v10H3zM3 8h18M9 3v10M15 3v10M12 16v6M9 19h6',
  colL: 'M11 3h10v18H11zM16 3v18M11 9h10M11 15h10M2 12h6M5 9v6', colR: 'M3 3h10v18H3zM8 3v18M3 9h10M3 15h10M16 12h6M19 9v6',
  rowX: 'M3 4h18v6H3zM3 14h18v6H3zM9 4v6M15 4v6M9 14v6M15 14v6M8 12h8', colX: 'M4 3h6v18H4zM14 3h6v18h-6zM4 9h6M4 15h6M14 9h6M14 15h6M12 8v8',
  minus: 'M6 12h12', merge: 'M3 5h18v14H3zM7 12h3M14 12h3M8.5 10l-2 2 2 2M15.5 10l2 2-2 2', split: 'M3 5h18v14H3zM12 5v14M5 12h3M16 12h3M6.5 10l-2 2 2 2M17.5 10l2 2-2 2', tstyle: 'M3 4h18v16H3zM3 9h18M9 9v11', tblX: 'M4 5h16v14H4zM9 9l6 6M15 9l-6 6',
  fill: 'M4 13l8-8 7 7-8 8zM4 13h15M20 16s2 2.4 2 3.8a2 2 0 0 1-4 0c0-1.4 2-3.8 2-3.8z', bcolor: 'M4 4h16v16H4z', bstyle: 'M3 6h18M3 12h4M10 12h4M17 12h4M3 18h1.5M7 18h1.5M11 18h1.5M15 18h1.5M19 18h1.5', selall: 'M4 4h16v16H4zM4 10h16M4 15h16M10 4v16M15 4v16',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2', hide: 'M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.2 3.8M6.6 6.6C3.7 8.4 2 12 2 12s4 6 10 6a9 9 0 0 0 4.5-1.2',
  read2: 'M3 8l9 6 9-6M3 8v11h18V8l-9-5z', rename: 'M4 20h4L19 9l-4-4L4 16zM13 7l4 4',
  conv: 'M4 5h11v8H8l-4 3zM9 15v2h7l4 3v-11h-3',
  sub: 'M5 4v10a3 3 0 0 0 3 3h11M15 13l4 4-4 4', env: 'M3 5.5h18v13H3zM3.5 6.5l8.5 6.5 8.5-6.5'
};
const ico = (k, s) => `<svg class="i" viewBox="0 0 24 24"${s ? ` style="width:${s}px;height:${s}px"` : ''}><path d="${IP[k]}"/></svg>`;

/* ───────── 저장 (샘플: 이 브라우저 안에만) ───────── */
const store = {
  get(k, d) { try { const v = localStorage.getItem('jin-' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('jin-' + k, JSON.stringify(v)); } catch (e) { /* 저장 불가 환경 */ } }
};

/* ───────── 예시 데이터 ───────── */
const ME = { name: '홍길동', email: 'me@example.com' };  // 예시 화면용 (실제 연결하면 Gmail 계정 이름·주소로 바뀜)
const C = (name, email) => ({ name, email });
// 예시 메일: 실제 회사·브랜드와 관계없는 가상의 이름만 사용
const P = {
  kwon: C('김하늘', 'sky.kim@adpartner.example'), lee_n: C('이도윤', 'doyun@adpartner.example'), kim_n: C('박서준', 'seojun@adpartner.example'),
  kim_b: C('최유나', 'yuna@haeorum.example'), jung_b: C('정민호', 'minho@haeorum.example'),
  lee_c: C('한소희', 'sohee@pureforest.example'), park_c: C('오지훈', 'jihoon@pureforest.example'), kang_c: C('강다은', 'daeun@pureforest.example'),
  choi_k: C('윤재원', 'jaewon@mediarep.example'), jung_t: C('서하린', 'harin@starlight.example'), park_h: C('임채원', 'chaewon@bluebank.example'),
  park_s: C('송지아', 'jia@example.com'), hr: C('인사팀', 'hr@example.com'), mezzo: C('트렌드랩', 'report@trendlab.example')
};
const CONTACTS = [ME, ...Object.values(P)];
const DEFAULT_BOXES = [
  { id: 'hana', name: '푸른은행', parent: null },
  { id: 'bmw', name: '해오름식품', parent: null },
  { id: 'bmw-fs', name: '정산', parent: 'bmw' },
  { id: 'bmw-mt', name: '신제품', parent: 'bmw' },
  { id: 'bmw-mkt', name: '온라인 캠페인', parent: 'bmw' },
  { id: 'tlj', name: '별빛여행', parent: null },
  { id: 'coway', name: '푸른숲가구', parent: null },
  { id: 'coway-nf', name: '겨울 캠페인', parent: 'coway' },
  { id: 'trend', name: '트렌드 리포트', parent: null },
  { id: 'life', name: '회사생활', parent: null },
  { id: 'life-me', name: '개인', parent: 'life' }
];
const FONT_LIST = ['맑은 고딕', '나눔고딕', '돋움', '굴림', '바탕', 'Arial', 'Calibri', 'Tahoma'];
// 기본 풋터: {이름}은 연결한 계정의 이름으로 바뀜
const DEFAULT_FOOTERS = [
  { id: 'f1', name: '기본', html: '고맙습니다.<br>{이름} 드림.', font: { family: '맑은 고딕', size: 10, color: '#202124' }, rule: { type: 'new', kw: '' } },
  { id: 'f2', name: '답장용', html: '감사합니다.<br>{이름} 드림.', font: { family: '맑은 고딕', size: 10, color: '#202124' }, rule: { type: 'reply', kw: '' } }
];
const M = (o) => Object.assign({ to: [ME], cc: [], att: [], prev: [], inbox: 0, unread: 0 }, o);
let MAILS = [
  M({ id: 1, d: 0, t: '09:42', from: P.kwon, cc: [P.kim_n, P.lee_n], box: 'hana', inbox: 1, unread: 1,
    subj: 'RE: [예시컴퍼니] 푸른은행 지하철 광고 견적 문의드립니다', att: [['XLS', '푸른은행_지하철광고_견적.xlsx', '48 KB'], ['PDF', '매체소개서.pdf', '2.1 MB']],
    body: '안녕하세요 매니저님,\n애드파트너 김하늘입니다.\n\n문의주신 지하철 광고 건 견적 첨부드립니다.\n11월 첫째 주 집행 가능하며, 소재는 10/30까지 전달 부탁드립니다.\n\n감사합니다.',
    prev: [{ from: ME, to: [P.kwon], cc: [P.kim_n], d: 2, t: '11:12', body: '안녕하세요, 예시컴퍼니 홍길동입니다.\n푸른은행 지하철 광고 집행 가능 여부와 견적 문의드립니다.\n\n고맙습니다.\n홍길동 드림.' },
           { from: P.park_h, to: [ME], cc: [], d: 4, t: '15:20', body: '매니저님, 지하철 광고 가능한 노선 알아봐 주실 수 있을까요?\n11월 초 집행 희망합니다.' }] }),
  M({ id: 2, d: 0, t: '09:10', from: P.kim_b, box: 'bmw-fs', inbox: 1, unread: 1,
    subj: 'Re: [해오름식품] 10월 정산서 발행 요청 건', att: [['PDF', '10월_정산_요청.pdf', '120 KB']],
    body: '매니저님 안녕하세요.\n10월분 정산서 발행 부탁드립니다.\n금액은 첨부 확인 부탁드립니다.\n\n감사합니다.' }),
  M({ id: 3, d: 0, t: '08:55', from: P.lee_c, cc: [P.park_c], box: 'coway-nf', inbox: 1, draft: '매니저님, 증액분 반영해서 다시 정리드리겠습니다.',
    subj: 'Re: [푸른숲가구] 겨울 시즌 영상 광고 집행 문의 건',
    body: '매니저님, 추가 증액분(2,500만 원) 반영된 금액으로 다시 확인 부탁드립니다.',
    prev: [{ from: ME, to: [P.lee_c], cc: [P.park_c], d: 4, t: '17:21', body: '알겠습니다~!\n제가 이해한 게 맞다면 아래와 같이 예산 확인하고 부킹 진행하겠습니다.' }] }),
  M({ id: 4, d: 0, t: '08:31', from: P.park_s, to: [P.lee_c], cc: [ME], box: 'coway', inbox: 1, unread: 1,
    subj: '[공유] 11월 통합 캠페인 제안', att: [['PPT', '11월_통합캠페인_제안서.pptx', '8.4 MB']], body: '참고용으로 공유드립니다.\n11월 통합 캠페인 제안서 첨부합니다.' }),
  M({ id: 5, d: 1, t: '17:20', from: P.choi_k, cc: [P.jung_b], box: 'bmw-mkt',
    subj: 'RE: [예시컴퍼니] 해오름식품 온라인 캠페인 집행 관련 문의드립니다', body: '안녕하세요 매니저님,\n아래 내용으로 매체 측에 전달하였습니다.\n랜딩 URL은 확인되는 대로 공유드리겠습니다.' }),
  M({ id: 6, d: 1, t: '14:05', from: P.jung_t, box: 'tlj', inbox: 1, unread: 1,
    subj: '[별빛여행] 11월 매장 포스터 소재 전달드립니다', att: [['ZIP', '포스터_소재_11월.zip', '34 MB']], body: '안녕하세요.\n11월 매장 포스터 소재 압축파일 첨부드립니다.\n확인 부탁드립니다.' }),
  M({ id: 7, d: 2, t: '11:12', from: ME, to: [P.kwon], cc: [P.kim_n], box: 'hana', sent: 1,
    subj: '[예시컴퍼니] 푸른은행 지하철 광고 문의드립니다', body: '안녕하세요, 예시컴퍼니 홍길동입니다.\n푸른은행 지하철 광고 집행 가능 여부와 견적 문의드립니다.\n\n고맙습니다.\n홍길동 드림.' }),
  M({ id: 8, d: 3, t: '16:40', from: P.kim_b, to: [P.jung_b], cc: [ME], box: 'bmw',
    subj: 'Re: [해오름식품] 신제품 출시 캠페인 일정', body: '일정 확인 부탁드립니다.\n이번 주 금요일까지 회신 주시면 됩니다.' }),
  M({ id: 9, d: 3, t: '11:48', from: P.lee_c, cc: [P.kang_c, P.choi_k], box: 'coway',
    subj: 'Re: 푸른숲가구 겨울 캠페인 미디어믹스 최종본', att: [['XLS', '겨울캠페인_MediaMix_F.xlsx', '177 KB']],
    body: '안녕하세요 매니저님,\n겨울 캠페인 11~12월 믹스 최종본(1.25억) 공유드립니다.\n변경 필요시 말씀 부탁드립니다.' }),
  M({ id: 10, d: 4, t: '10:02', from: P.mezzo, box: 'trend', unread: 1, subj: '[트렌드] 2026 4Q 업종 분석 리포트', att: [['PDF', '2026_4Q_업종분석.pdf', '6.2 MB']], body: '이번 분기 업종별 광고 동향 리포트를 보내드립니다.' }),
  M({ id: 11, d: 5, t: '15:30', from: P.hr, to: [C('전 직원', 'all@example.com')], box: 'life', unread: 1, subj: '[공지] 11월 사내 건강검진 일정 안내', body: '11월 건강검진 일정을 안내드립니다.' }),
  M({ id: 12, d: 9, t: '09:15', from: P.park_h, box: 'hana', subj: '[푸른은행] 4분기 디지털 캠페인 결과 보고 요청', att: [['DOC', '보고양식.docx', '64 KB']], body: '4분기 디지털 캠페인 결과 보고 부탁드립니다.' }),
  M({ id: 13, d: 20, t: '13:00', from: P.jung_t, box: 'tlj', subj: '[별빛여행] 10월 프로모션 결과 공유', att: [['IMG', '프로모션_현장.jpg', '1.8 MB']], body: '10월 프로모션 결과 공유드립니다.' }),
  M({ id: 14, d: 45, t: '10:10', from: P.kim_b, box: 'bmw-mt', subj: '[해오름식품] 3분기 신제품 판매 결과 공유', att: [['XLS', 'Q3_결과.xlsx', '210 KB']], body: '3분기 신제품 판매 결과 공유드립니다.' })
];
const SAMPLE_MAILS = MAILS.slice();

/* ───────── 상태 ───────── */
let BOXES = store.get('sample-boxes', DEFAULT_BOXES);
let FOOTERS = store.get('footers2', DEFAULT_FOOTERS);
let SET = Object.assign({ composeMode: 'inline', typo: true, showHidden: false, font: { family: '맑은 고딕', size: 10 } }, store.get('settings', {}));
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
const isMe = p => !!p && !!p.email && p.email.toLowerCase() === (ME.email || '').toLowerCase();
const nameOf = p => isMe(p) ? '나' : p.name;
const fmtD = d => (d.getMonth() + 1) + '/' + d.getDate();
function toast(t, undo, label) {
  $('#toastT').textContent = t;
  const u = $('#toastUndo'); u.hidden = !undo; u.textContent = label || '되돌리기'; u.onclick = () => { undo(); $('#toast').classList.remove('on'); };
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
  // 받은편지함 = Gmail 받은편지함 + 나에게 온 메일(필터로 바로 편지함에 들어간 것 포함) → 하위 '나에게 온 메일'과 숫자가 맞음
  inbox: { name: '받은편지함', ic: 'inbox', f: m => m.inbox },
  tome: { name: '나에게 온 메일', ic: 'me', f: m => m.inbox && !m.sent && m.to.some(isMe), parent: 'inbox' },
  sent: { name: '보낸편지함', ic: 'sent', f: m => m.sent },
  draft: { name: '작성 중인 메일', ic: 'draft', f: m => !!m.draft },
  unread: { name: '안 읽은 메일', ic: 'unreadbox', f: m => !!m.unread && !m.deleted },
  all: { name: '전체 메일', ic: 'all', f: () => true },
  trash: { name: '지운 편지함', ic: 'trash', f: m => !!m.deleted }
};
const folderFn = k => { if (k === 'conv') return m => !!(st.conv && st.conv.ids.has(m.id)); if (k === 'all') return () => true; if (k === 'trash') return m => !!m.deleted; if (k === 'unread') return m => !m.deleted && (m.unread || (m.id === st.open && st.unreadKeep === m.id)); if (SYS[k]) { const sf = SYS[k].f; return m => !m.deleted && sf(m); } const ids = new Set(descIds(k)); const f = m => !m.deleted && ids.has(m.box); f.boxId = k; return f; };
const folderName = k => k === 'conv' ? '대화 보기' + (st.conv ? ' · ' + st.conv.title : '') : SYS[k] ? SYS[k].name : boxPath(k);
/* ── 대화로 보기 (2026-10-26) ──
   같은 Gmail 대화(threadId) + 제목이 같은 답장·전달(같은 사람들끼리)을 한데 모아 시간 순으로 보여 준다. */
const normSubj = s => String(s || '').replace(/^\s*((re|fw|fwd|aw|wg|답장|회신|전달|답변)\s*(\[\d+\]|\(\d+\))?\s*[:：]\s*|\[(외부|external|ext)\]\s*)+/ig, '').replace(/\s+/g, ' ').trim().toLowerCase();
let CONV_IDX = null;
function convIndex() {
  if (CONV_IDX && CONV_IDX.n === MAILS.length && CONV_IDX.ref === MAILS) return CONV_IDX;
  const byT = new Map(), byS = new Map();
  MAILS.forEach(m => { if (m.deleted) return; if (m.threadId) { if (!byT.has(m.threadId)) byT.set(m.threadId, []); byT.get(m.threadId).push(m); }
    const k = normSubj(m.subj); if (k.length >= 4) { if (!byS.has(k)) byS.set(k, []); byS.get(k).push(m); } });
  CONV_IDX = { n: MAILS.length, ref: MAILS, byT, byS, cnt: new Map() };
  return CONV_IDX;
}
function convMembers(seed) {
  const X = convIndex(); const out = new Map();
  (seed.threadId && X.byT.get(seed.threadId) || [seed]).forEach(m => out.set(m.id, m));
  const ppl = new Set(); out.forEach(m => [m.from, ...(m.to || []), ...(m.cc || [])].forEach(p => { if (p && p.email && !isMe(p)) ppl.add(p.email); }));
  const k = normSubj(seed.subj);
  (X.byS.get(k) || []).forEach(m => { if (out.has(m.id)) return; if ([m.from, ...(m.to || []), ...(m.cc || [])].some(p => p && ppl.has(p.email))) out.set(m.id, m); });
  return [...out.values()];
}
const convCount = m => { const X = convIndex(); if (!X.cnt.has(m.id)) { const mem = convMembers(m); mem.forEach(x => X.cnt.set(x.id, mem.length)); } return X.cnt.get(m.id) || 1; };
function openConv(id) {
  const seed = MAILS.find(m => m.id === id); if (!seed) return;
  const mem = convMembers(seed);
  const prev = st.folder === 'conv' && st.conv ? st.conv.prev : st.folder;
  st.conv = { seed: id, ids: new Set(mem.map(m => m.id)), title: seed.subj.replace(/^\s*((re|fw|fwd|답장|회신|전달)\s*[:：]\s*)+/i, ''), prev };
  st.folder = 'conv'; st.picked.clear(); st.listSig = null;
  renderNav(); renderTop(); renderList();
  if (st.open !== id) openMail(id);
}
function closeConv() { const back = (st.conv && st.conv.prev) || 'inbox'; st.conv = null; st.folder = back === 'conv' ? 'inbox' : back; st.picked.clear(); renderNav(); renderTop(); renderList(); }

/* ───────── 왼쪽: 폴더·편지함 트리 ───────── */
function renderNav() {
  // 안 읽은 수: 메일을 한 번만 훑어서 편지함별로 셈 (편지함 수 × 메일 수 반복 없앰)
  const perBox = new Map(); MAILS.forEach(m => { if (m.unread && m.box && !m.deleted) perBox.set(m.box, (perBox.get(m.box) || 0) + 1); });
  const unread = f => f.boxId ? descIds(f.boxId).reduce((a, id) => a + (perBox.get(id) || 0), 0) || '' : MAILS.filter(m => f(m) && m.unread).length || '';
  const sysItem = (k, depth) => { const v = SYS[k]; const n = k === 'draft' ? (MAILS.filter(m => m.draft).length + ndList().length || '') : unread(v.f);
    return `<div class="ni${k !== 'tome' ? ' ni-top' : ''}${st.folder === k ? ' on' : ''}${n && k !== 'draft' ? ' unread' : ''}" data-f="${k}" data-sys="${k}" style="padding-left:${14 + depth * 22}px"><span class="ic">${ico(v.ic)}</span><span class="nm">${v.name}</span><span class="n">${n}</span></div>`; };
  // 받은편지함 └ 나에게 온 메일 연결선
  let h = sysItem('inbox', 0) + sysItem('tome', 1).replace('<span class="ic">', '<i class="g e" style="left:22px"></i><span class="ic">') + sysItem('sent', 0) + sysItem('draft', 0) + sysItem('unread', 0) + sysItem('all', 0).replace(/<span class="n">\d*<\/span>/, '<span class="n"></span>');
  h += `<div class="nh">편지함<button class="ib" id="addBox" title="편지함 만들기" style="width:26px;height:26px">${ico('plus', 15)}</button></div>`;
  const nHidden = BOXES.filter(b => b.hidden).length;
  const shown = p => childrenOf(p).filter(b => !b.hidden || SET.showHidden);
  // 상·하위 연결선: cont[k] = k단계 세로선이 아래로 계속 이어지는지
  const walk = (parent, depth, cont) => { const list = shown(parent); list.forEach((b, i) => {
    const last = i === list.length - 1;
    const kids = shown(b.id).length, col = st.collapsed.has(b.id), n = unread(folderFn(b.id));
    let g = '';
    cont.forEach((c, k) => { if (c) g += `<i class="g v" style="left:${16 + k * 18}px"></i>`; });
    if (depth > 0) g += `<i class="g ${last ? 'e' : 't'}${kids ? '' : ' nk'}" style="left:${16 + (depth - 1) * 18}px"></i>`;
    h += `<div class="ni${depth === 0 ? ' ni-top' : ''}${st.folder === b.id ? ' on' : ''}${n ? ' unread' : ''}${b.hidden ? ' hid' : ''}" data-f="${b.id}" data-box="${b.id}" draggable="true" style="padding-left:${8 + depth * 18}px">${g}
      <span class="tw" data-tw="${b.id}">${kids ? ico(col ? 'right' : 'down') : ''}</span><span class="ic">${ico('folder', 17)}</span>
      <span class="nm">${esc(b.name)}</span><span class="n">${n}</span><button class="ib dots" data-dots="${b.id}" title="편지함 메뉴">${ico('more', 16)}</button></div>`;
    if (kids && !col) walk(b.id, depth + 1, depth > 0 ? [...cont, !last] : []);
  }); };
  walk(null, 0, []);
  if (nHidden) h += `<button class="hidtoggle" id="hidToggle">${SET.showHidden ? '숨긴 편지함 감추기' : `숨긴 편지함 ${nHidden}개 보기`}</button>`;
  const nDel = MAILS.filter(m => m.deleted).length;
  h += `<div class="nsep-trash"></div><div class="ni ni-top ni-trash${st.folder === 'trash' ? ' on' : ''}" data-f="trash" data-sys="trash" style="padding-left:14px"><span class="ic">${ico('trash')}</span><span class="nm">지운 편지함</span><span class="n" style="font-weight:400;color:var(--mute)">${nDel || ''}</span></div>`;
  $('#nav').innerHTML = h;
}
/* 편지함 메뉴 (⋮ · 우클릭) */
function boxMenu(anchor, id, at) {
  const b = boxById(id); if (!b) return;
  const row = $(`.ni[data-box="${id}"]`); if (row) row.classList.add('menu-open');
  const m = menuAt(anchor, [
    { html: ico('read2', 16) + ' 모두 읽음으로 표시', act: () => { const ids = descIds(id); const hit = MAILS.filter(x => ids.includes(x.box) && x.unread && !x.deleted); hit.forEach(x => { x.unread = 0; jSet(x, { u: 0 }); }); renderNav(); renderList(); toast(`'${b.name}' 메일 ${hit.length}통을 읽음으로 표시했어요`); } },
    { html: ico('rename', 16) + ' 이름 바꾸기', act: () => renameBox(id) },
    { html: ico('where', 16) + ' 자동 분류 규칙', act: () => openRules(id) },
    { html: ico('gear', 16) + ' 편지함 관리', act: () => openSettings('boxes') },
    { html: ico('hide', 16) + (b.hidden ? ' 다시 보이기' : ' 숨기기'), act: () => { const hide = !b.hidden; descIds(id).forEach(x => { boxById(x).hidden = hide; }); if (hide && descIds(id).includes(st.folder)) st.folder = 'inbox'; saveAll(); renderNav(); renderTop(); renderList(); toast(hide ? `'${b.name}'을(를) 숨겼어요` : `'${b.name}'이(가) 다시 보여요`); } },
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
    b.pending = false;
  };
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') finish(true); if (e.key === 'Escape') finish(false); e.stopPropagation(); });
  inp.addEventListener('blur', () => finish(true));
  inp.addEventListener('click', e => e.stopPropagation());
}
function renamePaths() { return Promise.resolve(); }  // (예전: Gmail 라벨 이름 변경) — 이제 JIN-mail 안에서만
async function deleteBox(id) {
  const ids = descIds(id); const n = MAILS.filter(m => ids.includes(m.box) && !m.deleted).length;
  if (n) { toast(`이 편지함에 메일 ${n}통이 있어요. 먼저 다른 곳으로 옮겨 주세요`); return; }
  const before = BOXES.slice();
  BOXES = BOXES.filter(x => !ids.includes(x.id)); if (ids.includes(st.folder)) st.folder = 'inbox';
  saveAll(); renderNav(); renderList();
  toast('편지함을 삭제했어요', () => { BOXES = before; saveAll(); renderNav(); });
}

/* ───────── 자동 분류 (실제 계정: Gmail 필터라서 JIN-mail을 닫아도 서버에서 분류) ───────── */
const ruleQuery = r => [r.from && `from:(${r.from})`, r.to && `to:(${r.to})`, r.subject && `subject:(${r.subject})`, r.query].filter(Boolean).join(' ');
const ruleText = r => [r.from && `보낸사람에 '${r.from}'`, r.to && `받는사람에 '${r.to}'`, r.subject && `제목에 '${r.subject}'`, r.query && `내용·키워드 '${r.query}'`].filter(Boolean).join(' 그리고 ');
const FILTER_SCOPE = 'https://www.googleapis.com/auth/gmail.settings.basic';
async function withScope(job) {
  try { return await job(); }
  catch (e) {
    if (!(e.status === 403 && /insufficient|scope|PERMISSION_DENIED/i.test(e.message + ' ' + (e.reason || '')) && !/quota|rate/i.test(e.message))) throw e;
    toast('자동 분류 권한이 필요해요 — Google 창에서 허용해 주세요');
    tokCache.clear(); real.token = await googleLogin(true); return job();
  }
}
async function loadRules() { return real.on ? (J.data.rules || []) : store.get('rules', []); }
async function addRule(r) {
  r.id = 'r' + Date.now();
  if (real.on) { J.data.rules = (J.data.rules || []).concat([r]); jSave(); } else { const all = store.get('rules', []); all.push(r); store.set('rules', all); }
  return r;
}
async function delRule(id) {
  if (real.on) { J.data.rules = (J.data.rules || []).filter(x => x.id !== id); jSave(); } else store.set('rules', store.get('rules', []).filter(x => x.id !== id));
}
// 조건에 맞는지 (JIN-mail 안에서 판단 — Gmail 필터 아님)
function ruleHit(m, r) {
  const has = (hay, k) => !k || k.split(/\s+OR\s+/i).some(alt => alt.split(/\s+/).filter(Boolean).every(w => hay.toLowerCase().includes(w.toLowerCase())));
  return has((m.from.email || '') + ' ' + (m.from.name || ''), r.from) && has(m.to.concat(m.cc || []).map(p => p.email + ' ' + p.name).join(' '), r.to) && has(m.subj || '', r.subject) && has((m.subj || '') + ' ' + (m.body || m.snippet || ''), r.query);
}
// 지금 바로 실행: 받은편지함 메일 중 조건에 맞는 것을 그 편지함으로 (모든 규칙)
async function runRules() {
  const rules = await loadRules();
  if (!rules.length) { toast('실행할 분류 조건이 없어요'); return; }
  let moved = 0;
  MAILS.forEach(m => { if (!m.inbox || m.deleted) return; const r = rules.find(x => ruleHit(m, x)); if (!r) return; m.box = r.box; if (r.skipInbox) m.inbox = 0; jSet(m, { b: r.box, i: m.inbox }); moved++; });
  renderNav(); renderList(); renderRead(true);
  toast(`분류 조건에 맞는 메일 ${moved}통을 옮겼어요`);
}
async function openRules(box) {
  closeMenus();
  const bg = document.createElement('div'); bg.className = 'modal-bg stack';
  bg.innerHTML = `<div class="modal set"><h3>${ico('where', 18)} '${esc(boxPath(box))}' 자동 분류</h3><div class="mbody" id="rb"><p class="desc">불러오는 중…</p></div>
    <div class="mfoot"><button class="btn" id="runNow" title="모든 편지함의 분류 조건을 지금 받은편지함 메일에 적용">${ico('where', 15)} 모든 분류 조건 지금 실행</button><button class="btn" data-x>취소</button><button class="btn pri" id="ruleOk">확인</button></div></div>`;
  document.body.append(bg);
  const body = $('#rb', bg);
  const draw = async () => {
    let rules = [];
    try { rules = (await loadRules()).filter(r => r.box === box); } catch (e) { body.innerHTML = `<p class="desc" style="color:#d93025">규칙을 불러오지 못했어요: ${esc(e.message)}</p>`; return; }
    body.innerHTML = `<p class="desc">아래 조건에 맞는 <b>새 메일</b>은 자동으로 이 편지함에 들어가요 (JIN-mail 안에서만 분류돼요 — Gmail 라벨·필터는 바뀌지 않아요). 이미 받은편지함에 있는 메일은 아래 '모든 분류 조건 지금 실행'을 누르면 모든 편지함 조건이 한꺼번에 적용돼요.</p>
      <h5>지금 있는 조건 <span class="rcount">${rules.length}개</span></h5>${rules.length ? rules.map(r => `<div class="rulerow"><span>${ico('where', 15)} <b>${esc(ruleText(r))}</b>${r.skipInbox ? ' <small>· 받은편지함 건너뛰기</small>' : ''}</span><button class="ib" data-del="${esc(r.id)}" title="조건 삭제">${ico('trash', 16)}</button></div>`).join('') : '<div class="rulerow empty">아직 조건이 없어요 — 아래에서 추가해 주세요</div>'}
      <h5>조건 추가 <small style="font-weight:400;color:var(--mute)">(여러 칸을 채우면 모두 맞을 때만, 칸 안에서 'OR'로 여러 개)</small></h5>
      <div class="rulef"><label>보낸사람 주소·이름에</label><input data-f="from" placeholder="예: coway.com 또는 kim@nasmedia.co.kr"></div>
      <div class="rulef"><label>제목에</label><input data-f="subject" placeholder="예: 정산"></div>
      <div class="rulef"><label>내용·키워드에</label><input data-f="query" placeholder="예: 넷플릭스 OR 제로 음식물처리기"></div>
      <div class="rulef"><label>받는사람에</label><input data-f="to" placeholder="예: team@company.com"></div>
      <label class="opt"><input type="checkbox" id="skipIn" checked> 받은편지함에는 남기지 않기 (이 편지함으로만)</label>
      <div class="opt"><button class="btn pri" id="addRule">${ico('plus', 15)} 조건 추가</button></div>`;
  };
  bg.addEventListener('click', async e => {
    if (e.target.closest('[data-x]')) { bg.remove(); return; }
    // 확인: 입력해 둔 조건이 있으면 추가하고 닫기 → 설정 창(열려 있었다면)으로 돌아감
    if (e.target.closest('#ruleOk')) {
      const r = { box, skipInbox: !$('#skipIn', bg) || $('#skipIn', bg).checked }; $$('[data-f]', bg).forEach(i => { r[i.dataset.f] = i.value.trim(); });
      if (r.from || r.to || r.subject || r.query) { try { await addRule(r); toast('조건을 추가했어요 — 이미 받은 메일에 적용하려면 지금 바로 실행'); } catch (er) { toast('추가하지 못했어요: ' + er.message); return; } }
      bg.remove(); return;
    }
    const d = e.target.closest('[data-del]'); if (d) { try { await delRule(d.dataset.del); toast('조건을 지웠어요'); draw(); } catch (er) { toast('지우지 못했어요: ' + er.message); } return; }
    if (e.target.closest('#runNow')) { runRules(null); return; }
    if (e.target.closest('#addRule')) {
      const btn = e.target.closest('#addRule'); if (btn.disabled) return;
      const r = { box, skipInbox: $('#skipIn', bg).checked }; $$('[data-f]', bg).forEach(i => { r[i.dataset.f] = i.value.trim(); });
      if (!r.from && !r.to && !r.subject && !r.query) { toast('조건을 하나 이상 넣어 주세요'); return; }
      btn.disabled = true; btn.textContent = '추가하는 중…';
      try { await addRule(r); toast('조건을 추가했어요 — 이미 받은 메일에 적용하려면 지금 바로 실행'); draw(); } catch (er) { toast('추가하지 못했어요: ' + er.message); btn.disabled = false; btn.textContent = '조건 추가'; }
    }
  });
  draw();
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
  pill.textContent = R.expired ? (auth.needClick ? '로그인 연장 — 화면을 한 번 눌러 주세요' : 'Gmail 다시 연결하기 (클릭)') : R.prog ? R.prog : R.on ? `Gmail · ${ME.email}` : '예시 메일';
  pill.title = R.expired ? '로그인이 만료됐어요. 누르면 다시 연결해요' : '';
  pill.onclick = R.expired ? () => (R.on ? renewToken().catch(e => toast('연결하지 못했어요: ' + e.message)) : loadReal(true)) : null;
  const set = (id, ic, on, tip) => { const b = $(id); b.innerHTML = ico(ic); b.classList.toggle('on', !!on); b.title = tip; };
  set('#fBox', 'folder', st.folder !== 'all', st.folder === 'all' ? '편지함: 전체 (필터 없음)' : '편지함: ' + folderName(st.folder));
  set('#fWhere', 'where', f.where !== 'all' || f.exclude || f.exact, '검색 범위: ' + (f.where === 'subj' ? '제목만' : '제목+내용') + (f.exact ? ' · 정확히 일치' : '') + (f.exclude ? ' · 제외: ' + f.exclude : ''));
  const p = f.period.k === 'range' ? fmtD(f.period.from) + '~' + fmtD(f.period.to) : PERIODS.find(x => x[0] === f.period.k)[1];
  set('#fPeriod', 'cal', f.period.k !== 'all', '기간: ' + p);
  const a = f.att.k === 'any' ? '전체' : f.att.k === 'no' ? '없음' : '있음' + (f.att.types.length ? '(' + f.att.types.map(t => ATYPES.find(x => x[0] === t)[1]).join('·') + ')' : '');
  // 목록 위 글자 버튼 (보낸사람·받는사람·첨부파일·읽음/안읽음)
  const pname = e => { if (!e) return ''; const p = peopleFromMails('any').find(x => x.email === e); return p ? p.name : e; };
  const tf = (id, on, label, tip) => { const b = $(id); b.innerHTML = esc(label) + '<span class="cv">▾</span>'; b.classList.toggle('on', !!on); b.title = tip; };
  tf('#fFrom', f.from, f.from ? '보낸사람: ' + pname(f.from) : '보낸사람', '보낸사람: ' + (f.from || '전체'));
  tf('#fTo', f.to, f.to ? '받는사람: ' + pname(f.to) : '받는사람', '받는사람(참조 포함): ' + (f.to || '전체'));
  tf('#fAtt', f.att.k !== 'any', f.att.k === 'any' ? '첨부파일' : '첨부: ' + a, '첨부: ' + a);
  tf('#fRead', f.readf !== 'all', { all: '읽음/안읽음', unread: '안 읽은 메일', read: '읽은 메일' }[f.readf], '읽음 여부: ' + { all: '전체', unread: '안 읽은 메일', read: '읽은 메일' }[f.readf]);
  const any4 = f.from || f.to || f.att.k !== 'any' || f.readf !== 'all';
  const cx = $('#fClear'); if (cx) cx.hidden = !any4;
  const lf = $('#lfilt'); if (lf) { lf.classList.toggle('off', st.folder === 'conv'); lf.title = st.folder === 'conv' ? '대화 보기 중에는 필터가 적용되지 않아요' : ''; }
}
function boxPickItems(cur, pick) {
  const items = ['all', 'unread', 'inbox', 'tome', 'sent', 'draft', 'trash'].map(k => ({ html: ico(SYS[k].ic, 16) + ' ' + SYS[k].name, on: cur === k, act: () => pick(k) }));
  items.push('-', { head: '편지함' });
  const walk = (p, dep) => childrenOf(p).forEach(b => { items.push({ on: cur === b.id, html: boxLabel(b, dep), act: () => pick(b.id) }); walk(b.id, dep + 1); });
  walk(null, 0);
  return items;
}
// 편지함 필터: 맨 위 '필터 해제' + 이름 검색 + 스크롤 목록 (편지함이 많아도 빨리 찾기)
function boxFilterMenu() {
  const pick = k => { st.folder = k; st.picked.clear(); closeMenus(); renderNav(); renderTop(); renderList(); };
  const node = document.createElement('div');
  node.innerHTML = `<div class="mi${st.folder === 'all' ? ' on' : ''}" data-k="all" style="font-weight:700"><span class="chk">${st.folder === 'all' ? '✓' : ''}</span>${ico('close', 16)} 필터 해제 (모든 메일에서 보기)</div>
    <div class="mrow"><input type="text" placeholder="편지함 이름으로 찾기" autocomplete="off"></div><div class="boxlist"></div>`;
  const inp = $('input', node), list = $('.boxlist', node);
  const row = (k, html, dep) => `<div class="mi${st.folder === k ? ' on' : ''}" data-k="${k}"><span class="chk">${st.folder === k ? '✓' : ''}</span><span style="padding-left:${(dep || 0) * 14}px;display:inline-flex;align-items:center;gap:7px">${html}</span></div>`;
  const draw = () => {
    const q = inp.value.trim().toLowerCase(); let h = '';
    const sys = ['inbox', 'tome', 'unread', 'sent', 'draft', 'trash'].filter(k => !q || SYS[k].name.includes(q));
    h += sys.map(k => row(k, ico(SYS[k].ic, 16) + ' ' + SYS[k].name)).join('');
    let boxes = '';
    if (q) BOXES.filter(b => boxPath(b.id).toLowerCase().includes(q)).forEach(b => { boxes += row(b.id, ico('folder', 15) + esc(boxPath(b.id)) + (b.hidden ? ' <small style="color:var(--mute)">(숨김)</small>' : '')); });
    else { const walk = (p, dep) => childrenOf(p).forEach(b => { if (b.hidden && !SET.showHidden) return; boxes += row(b.id, ico('folder', 15) + esc(b.name), dep); walk(b.id, dep + 1); }); walk(null, 0); }
    if (boxes) h += (h ? '<div class="msep"></div>' : '') + '<div class="mh">편지함</div>' + boxes;
    list.innerHTML = h || '<div class="mh">맞는 편지함이 없어요</div>';
  };
  node.addEventListener('click', e => { const it = e.target.closest('[data-k]'); if (it) pick(it.dataset.k); });
  inp.addEventListener('input', draw);
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') { const f = $('.boxlist [data-k]', node); if (f) pick(f.dataset.k); } if (e.key === 'Escape') closeMenus(); e.stopPropagation(); });
  draw();
  menuAt($('#fBox'), [{ head: '어느 편지함에서 볼까요? (검색도 이 안에서)' }, { node }], true);
  setTimeout(() => inp.focus());
}
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
/* ── 사람 찾기 (2026-10-26) ──
   예전엔 보낸사람 목록을 CONTACTS(샘플 주소록)에서만 골라서, 실제 Gmail로 받은 사람은 하나도 안 잡혔다.
   이제 불러온 메일(최근 3개월)의 보낸사람·받는사람에서 직접 모은다.
   한글 이름은 로마자(choi→최, kim→김…)와 초성(ㅊㅅㅇ)으로도 찾을 수 있다. */
const RR_I = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'];
const RR_V = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'];
const RR_F = ['','k','k','k','n','n','n','t','l','k','m','l','l','l','p','l','m','p','p','t','t','ng','t','t','k','t','p','t'];
const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const SURNAME_RR = {'김':'kim gim','이':'lee yi rhee li','박':'park bak pak','최':'choi choe','정':'jung jeong chung','강':'kang','조':'cho jo','윤':'yoon yun','장':'jang chang','임':'lim im yim','한':'han','오':'oh o','서':'seo suh','신':'shin sin','권':'kwon gwon','황':'hwang','안':'ahn an','송':'song','류':'ryu yoo yu','유':'yoo yu','전':'jeon jun chun','홍':'hong','고':'ko go','문':'moon mun','양':'yang','손':'son sohn','배':'bae','백':'baek paik','허':'heo huh','남':'nam','심':'shim sim','노':'noh roh no','하':'ha','곽':'kwak','성':'sung seong','차':'cha','주':'joo ju','우':'woo u','구':'koo gu','민':'min','진':'jin','나':'na','지':'ji','엄':'eom um','채':'chae','원':'won','천':'cheon chun','방':'bang','공':'kong gong','현':'hyun hyeon','함':'ham','변':'byun byeon','염':'yeom yum','여':'yeo yuh','추':'choo chu','도':'do doh','소':'so','석':'seok suk','선':'sun seon','설':'seol sul','마':'ma','길':'gil kil','연':'yeon yun','위':'wi wee','표':'pyo','명':'myung myeong','기':'ki gi','반':'ban bahn','왕':'wang','금':'keum geum','옥':'ok','육':'yook yuk','인':'in','맹':'maeng','제':'je','모':'mo','탁':'tak','국':'kook guk','은':'eun','편':'pyun pyeon','용':'yong','경':'kyung gyeong','봉':'bong','부':'boo bu','황보':'hwangbo','남궁':'namgung','선우':'sunwoo','제갈':'jegal','독고':'dokgo'};
function hangulRR(str) {
  let out = '';
  for (const ch of str) { const c = ch.charCodeAt(0) - 0xAC00;
    if (c < 0 || c > 11171) { out += /[a-z0-9]/i.test(ch) ? ch.toLowerCase() : ''; continue; }
    out += RR_I[Math.floor(c / 588)] + RR_V[Math.floor((c % 588) / 28)] + RR_F[c % 28]; }
  return out;
}
const hangulCho = str => [...str].map(ch => { const c = ch.charCodeAt(0) - 0xAC00; return c >= 0 && c <= 11171 ? CHO[Math.floor(c / 588)] : (/[ㄱ-ㅎ]/.test(ch) ? ch : ''); }).join('');
function personKeys(p) {
  if (p._keys) return p._keys;
  const name = String(p.name || '').normalize('NFC'), nm = name.replace(/\s+/g, '');
  const keys = [name.toLowerCase(), nm.toLowerCase(), String(p.email || '').toLowerCase()];
  // '최소영 부장'처럼 뒤에 직함이 붙어도 이름 부분만 로마자로 바꾼다
  const ko = name.match(/[가-힣]+/g) || []; const TITLE = /^(부장|차장|과장|대리|사원|주임|팀장|실장|이사|상무|전무|대표|국장|본부장|매니저|프로|책임|선임|수석|님)$/;
  const hk = (ko.find(w => w.length >= 2 && !TITLE.test(w)) || ko.filter(w => !TITLE.test(w)).join('') || '');
  if (hk) {
    // 이름에 흔히 쓰는 영문 표기도 함께 (영 young · 정 jung · 성 sung · 현 hyun · 연 yun)
    const alt = x => x.replace(/yeong/g, 'young').replace(/eong/g, 'ung').replace(/yeon/g, 'yun').replace(/eon/g, 'un').replace(/eo/g, 'u');
    const full = hangulRR(hk); keys.push(full, alt(full), hangulCho(hk));
    const sn = SURNAME_RR[hk.slice(0, 2)] && hk.length > 2 ? hk.slice(0, 2) : hk.slice(0, 1);
    const rest = hangulRR(hk.slice(sn.length));
    (SURNAME_RR[sn] || '').split(' ').filter(Boolean).forEach(v => { [rest, alt(rest)].forEach(r => keys.push(v + r, r + v)); });
  }
  Object.defineProperty(p, '_keys', { value: keys, enumerable: false });
  return keys;
}
function personMatch(p, q) {
  q = String(q || '').normalize('NFC').trim().toLowerCase(); if (!q) return true;
  const qq = q.replace(/\s+/g, '');
  return personKeys(p).some(k => k && (k.includes(q) || k.includes(qq)));
}
// kind: 'from'(보낸사람) | 'to'(받는사람·참조) | 'any'
function peopleFromMails(kind) {
  const by = new Map();
  const add = (pp, w) => { if (!pp || !pp.email || isMe(pp)) return; const e = String(pp.email).toLowerCase(); let x = by.get(e);
    if (!x) { x = { name: pp.name || e.split('@')[0], email: e, n: 0 }; by.set(e, x); }
    else if (pp.name && pp.name !== e.split('@')[0] && x.name === e.split('@')[0]) x.name = pp.name;   // 이름이 있는 쪽으로
    x.n += w; };
  MAILS.forEach(m => { const w = 1 + (m.d < 7 ? 1 : 0); if (kind !== 'to') add(m.from, w); if (kind !== 'from') { (m.to || []).forEach(pp => add(pp, w)); (m.cc || []).forEach(pp => add(pp, w)); } });
  return [...by.values()].sort((a, b) => b.n - a.n);
}
// 작성 화면 받는사람 자동완성·이름 찾기용 주소록: 실제 메일이면 주고받은 사람들(많이 주고받은 순), 예시 화면이면 예시 주소록
const rcptBook = { n: -1, list: [] };
function rcptPeople() {
  if (!real.on) return CONTACTS;
  if (rcptBook.n !== MAILS.length) { rcptBook.list = peopleFromMails('any'); rcptBook.n = MAILS.length; }
  return rcptBook.list;
}
// 보낸사람·받는사람: 최근 많이 주고받은 사람 순 추천 + 이름·주소 입력 자동완성
function personMenu(kind) {
  const btn = kind === 'from' ? $('#fFrom') : $('#fTo');
  const people = peopleFromMails(kind === 'from' ? 'from' : 'to');
  const node = document.createElement('div');
  node.innerHTML = `<div class="mrow"><input type="text" placeholder="이름이나 메일 주소" autocomplete="off"></div><div class="list2"></div>`;
  const inp = $('input', node), box = $('.list2', node);
  const cur = st.f[kind];
  const draw = () => {
    const q = inp.value.trim();
    const list = (q ? people.filter(p => personMatch(p, q)) : people).slice(0, q ? 12 : 8);
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
  const hay = f.where === 'subj' ? m.subj : [m.subj, m.body || m.snippet || '', m.from.name, m.from.email].join(' ');
  if (f.exclude) { const ex = f.exclude.split(/[,，]/).map(s => s.trim().toLowerCase()).filter(Boolean); if (ex.some(w => hay.toLowerCase().includes(w))) return false; }
  if (!q) return true;
  if (f.exact) return hay.includes(q);
  return q.toLowerCase().split(/\s+/).every(w => hay.toLowerCase().includes(w));
}
function renderSugg() {
  const q = st.q.trim(), box = $('#sugg');
  if (!q || document.activeElement !== $('#q')) { box.classList.remove('on'); return; }
  const hl = s => { const i = s.toLowerCase().indexOf(q.toLowerCase()); return i < 0 ? esc(s) : esc(s.slice(0, i)) + '<mark>' + esc(s.slice(i, i + q.length)) + '</mark>' + esc(s.slice(i + q.length)); };
  const ppl = peopleFromMails('from').filter(p => personMatch(p, q)).slice(0, 3);
  const mails = visible().slice(0, 6);
  box.innerHTML = (ppl.length ? '<div class="sh">사람 — 누르면 보낸사람으로 거르기</div>' + ppl.map(p => `<div class="si" data-p="${esc(p.email)}">${ico('me', 16)}<span class="s1">${hl(p.name)} <small style="color:var(--mute)">${hl(p.email)}</small></span></div>`).join('') : '') +
    (mails.length ? `<div class="sh">메일 · ${esc(folderName(st.folder))}</div>` + mails.map(m => `<div class="si" data-id="${m.id}">${ico('env', 16)}<span class="s1">${hl(m.subj)}</span><span class="s2">${esc(m.from.name)} · ${dateLabel(m)}</span></div>`).join('') : '<div class="sh">맞는 메일이 없어요</div>');
  box.classList.add('on');
}

/* ───────── 가운데: 목록 ───────── */
function visible() {
  const f = st.f;
  if (st.folder === 'conv') return MAILS.filter(folderFn('conv')).sort((a, b) => (b.when || 0) - (a.when || 0) || a.d - b.d || b.t.localeCompare(a.t));  // 대화 보기도 최근 메일이 위
  return (st.folder === 'draft' ? ndMails().concat(MAILS) : MAILS).filter(folderFn(st.folder)).filter(m => {
    const p = f.period, day = dayOf(m);
    if (p.k === 'range') { if (day < p.from || day > p.to) return false; } else if (p.k !== 'all' && m.d > +p.k) return false;
    const A = attsOf(m);
    if (f.att.k === 'yes' && !A.length) return false;
    if (f.att.k === 'no' && A.length) return false;
    if (f.att.types.length && !A.some(([a]) => f.att.types.includes(a[0]))) return false;
    // 지금 열어 둔 메일은 읽음 상태가 바뀌어도 목록에 남김 (다른 메일을 누르면 그때 필터 적용)
    if (f.readf === 'unread' && !m.unread && m.id !== st.open) return false;
    if (f.readf === 'read' && m.unread && m.id !== st.open) return false;
    if (f.from && m.from.email !== f.from) return false;
    if (f.to && ![...m.to, ...m.cc].some(p => p.email === f.to)) return false;
    return queryMatch(m, st.q);
  }).sort((a, b) => a.d - b.d || b.t.localeCompare(a.t));
}
const grpName = (d, m) => d === 0 ? '오늘' : d === 1 ? '어제' : d <= 7 ? '이번 주' : d <= 31 ? '이번 달' : (m ? (dayOf(m).getFullYear() !== TODAY.getFullYear() ? dayOf(m).getFullYear() + '년 ' : '') + (dayOf(m).getMonth() + 1) + '월' : '이전');
// 목록 미리보기 한 줄: 본문 앞부분 (인용·빈 줄 제외)
const snipOf = m => (m.snippet || m.body || '').replace(/\s+/g, ' ').trim().slice(0, 200);
const dateLabel = m => m.d === 0 ? m.t : fmtD(dayOf(m));
// 파일 종류 아이콘: 무채색 종이 모양 + 확장자 앞 글자 (그림은 산 모양, 압축은 지퍼)
const extOf = n => ((n || '').split('.').length > 1 ? n.split('.').pop() : '').toLowerCase();
const ftIcon = (t, sz, name) => {
  const ext = extOf(name);
  let mark;
  if (t === 'IMG') mark = '<path d="M8.5 18.5l2.6-3.4 1.9 2 1.6-2.2 2.4 3.6z" fill="#5f6368"/><circle cx="10.2" cy="12.2" r="1.1" fill="#5f6368"/>';
  else if (t === 'PDF') mark = '<text x="12.75" y="17.6" text-anchor="middle" font-size="5.6" font-weight="800" font-family="Arial,sans-serif" fill="#5f6368">PDF</text>';
  else { const L = (ext[0] || (t || 'F')[0] || 'F').toUpperCase(); mark = `<text x="12.75" y="18.2" text-anchor="middle" font-size="9" font-weight="800" font-family="Arial,sans-serif" fill="#5f6368">${esc(L)}</text>`; }
  return `<svg class="fti" viewBox="0 0 24 24" style="width:${sz || 15}px;height:${sz || 15}px" aria-label="${esc(ext || t)}"><path d="M6 2.5h9l4.5 4.5v14.5H6z" fill="#fff" stroke="#80868b" stroke-width="1.3" stroke-linejoin="round"/><path d="M15 2.5V7h4.5" fill="none" stroke="#80868b" stroke-width="1.3" stroke-linejoin="round"/>${mark}</svg>`;
};
const baseName = n => n.replace(/\.[a-z0-9]{1,5}$/i, '');
// 본문 안에 들어간 그림(서명 로고 등)은 첨부로 안 보여 줌
const attsOf = m => m.att.map((a, i) => [a, i]).filter(([a]) => !(a[3] && a[3].inline));
// 목록에서는 파일 이름 대신 '종류 + 개수'만 (예: 엑셀 2 · PPT 1) — 이름은 마우스를 올리면 보임
const ATT_KIND = (t, n) => { const e = extOf(n);
  if (t === 'XLS' || /^(xlsx?|xlsm|csv)$/.test(e)) return ['XLS', '엑셀'];
  if (t === 'PPT' || /^pptx?$/.test(e)) return ['PPT', 'PPT'];
  if (t === 'PDF' || e === 'pdf') return ['PDF', 'PDF'];
  if (/^(hwp|hwpx)$/.test(e)) return ['DOC', '한글'];
  if (t === 'DOC' || /^(docx?|rtf|txt)$/.test(e)) return ['DOC', '워드'];
  if (t === 'IMG' || /^(png|jpe?g|gif|bmp|webp|heic)$/.test(e)) return ['IMG', '이미지'];
  if (t === 'ZIP' || /^(zip|7z|rar|alz|egg)$/.test(e)) return ['ZIP', '압축'];
  if (/^(mp4|mov|avi|wmv|mkv)$/.test(e)) return [t || 'FILE', '동영상'];
  return [t || 'FILE', '파일']; };
const ftBadges = list => {
  const g = new Map();
  list.forEach(([[t, n]]) => { const [kt, kl] = ATT_KIND(t, n); if (!g.has(kl)) g.set(kl, { t: kt, n: n, c: 0, names: [] }); const x = g.get(kl); x.c++; x.names.push(n); });
  return [...g.entries()].map(([kl, x]) => `<span class="mini" title="${esc(x.names.join('\n'))}">${ftIcon(x.t, 15, x.n)}<span class="nm">${esc(kl)} ${x.c}</span></span>`).join('');
};
// 첨부 줄이 넘치면: 1) 파일 이름 숨기고 종류 표시만 2) 그래도 넘치면 뒤쪽을 '…+N'으로
function renderList() {
  const list = visible();
  const sig = [st.folder, st.conv ? st.conv.seed : '', st.q, JSON.stringify(st.f)].join('|');
  if (sig !== st.listSig) { st.listSig = sig; st.limit = 200; const r = $('#rows'); if (r) r.scrollTop = 0; }
  const shown = list.slice(0, st.limit || 200);
  [...st.picked].forEach(id => { if (!list.some(m => m.id === id)) st.picked.delete(id); });
  renderHead(list);
  renderSugg();
  if (!list.length) { $('#rows').innerHTML = '<div class="empty">조건에 맞는 메일이 없어요</div>'; return; }
  let g = '', h = '';
  shown.forEach(m => {
    const gn = grpName(m.d, m);
    if (gn !== g) { g = gn; h += `<div class="grp">${gn}</div>`; }
    const who = m.sent ? esc('받는사람: ' + m.to.map(nameOf).join(', ')) : `${esc(m.from.name)}${m.from.email && m.from.email.includes('@') ? ` <span class="dom">${esc(m.from.email.split('@')[1])}</span>` : ''}`;
    h += `<div class="row${m.unread ? ' unread' : ''}${st.open === m.id || (m.nd && st.ndOpen === m.id && $('#read').classList.contains('composing')) ? ' open' : ''}${st.picked.has(m.id) ? ' picked' : ''}" data-id="${m.id}" draggable="true">
      <input type="checkbox" class="ck"${st.picked.has(m.id) ? ' checked' : ''}><div class="mid">
      <div class="l1"><span class="who">${who}</span><span class="dt">${dateLabel(m)}</span></div>
      <div class="subj">${m.deleted ? '<span class="deltag">삭제됨</span> ' : ''}${m.draft ? '<span class="draft">작성 중</span> ' : ''}${esc(m.subj)}</div>
      <div class="snip">${esc(snipOf(m)) || '&nbsp;'}</div>
      ${attsOf(m).length ? `<div class="l3">${ftBadges(attsOf(m))}</div>` : ''}
    </div>${(() => { const n = convCount(m); return `<button class="convb${n > 1 ? ' has' : ''}" data-conv="${m.id}" title="이 메일과 이어진 대화 ${n}통 보기">${ico('conv', 15)}${n > 1 ? n : ''}</button>`; })()}</div>`;
  });
  if (list.length > shown.length) h += `<div class="more-rows">아래로 내리면 ${list.length - shown.length}통 더 보여요</div>`;
  $('#rows').innerHTML = h;
}
function renderHead(list) {
  // 체크한 메일이 없어도, 목록에서 눌러서 열어 둔 메일이 있으면 그 메일에 적용
  const n = st.picked.size, all = list.length && list.every(m => st.picked.has(m.id)), dis = (n || list.some(m => m.id === st.open)) ? '' : ' disabled';
  const lh = $('#lhead'); const conv = st.folder === 'conv' && st.conv;
  lh.classList.toggle('sel', n > 0);
  // 대화 보기: 제목·닫기 버튼은 목록 막대 위 별도 줄로 (좁은 폭에서도 제목이 보이게)
  let cb = $('#convbar');
  if (conv) {
    if (!cb) { cb = document.createElement('div'); cb.id = 'convbar'; cb.className = 'convbar'; lh.before(cb); cb.addEventListener('click', e => { if (e.target.closest('[data-b="convclose"]')) closeConv(); }); }
    cb.innerHTML = `${ico('conv', 16)}<span class="k">대화 보기</span><b title="${esc(st.conv.title)}">${esc(st.conv.title)}</b><span class="n">${list.length}통</span><button class="btn" data-b="convclose" title="원래 보던 편지함으로">${ico('close', 14)} 대화 닫기</button>`;
  } else if (cb) cb.remove();
  const label = n ? `<span class="cnt"><b>${n}개 선택</b></span>`
    : conv ? `<span class="cnt">대화 · ${list.length}통 (오래된 메일부터)</span>`
    : `<span class="cnt">${esc(folderName(st.folder))} · ${list.length}통</span>`;
  lh.innerHTML = `<input type="checkbox" class="ck" id="ckAll" title="모두 선택"${all ? ' checked' : ''}>
    ${label}
    <button class="btn" data-b="move"${dis}>${ico('move', 15)} 이동</button><button class="btn" data-b="read"${dis}>읽음 처리</button><button class="btn" data-b="unread"${dis}>안읽음 처리</button>${st.folder === 'trash' ? `<button class="btn" data-b="restore"${dis}>되살리기</button>` : `<button class="ib" data-b="del" title="삭제"${dis}>${ico('trash', 17)}</button>`}`;
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
  if (act === 'restore') { st.picked.clear(); restoreMails(ids); if (st.folder === 'trash' && ids.includes(st.open)) { st.open = null; renderRead(); } }
  if (act === 'move') { moveMenu(btn, ids); return; }
  renderNav(); renderList();
}
function moveMenu(btn, ids) {
  const items = [];
  const walk = (p, dep) => childrenOf(p).forEach(b => { items.push({ html: boxLabel(b, dep), act: () => moveTo(ids, b.id) }); walk(b.id, dep + 1); });
  walk(null, 0);
  menuAt(btn, [{ head: '어느 편지함으로 옮길까요?' }, ...items]);
}
// 삭제 = Gmail 휴지통으로 (30일 동안 되살릴 수 있음, 되돌리기 누르면 바로 복구)
function trashMails(ids) {
  const nds = ids.filter(id => id < 0); if (nds.length) { const xs = nds.map(id => ndRemove(-id)); ids = ids.filter(id => id >= 0); if (!ids.length) { st.picked.clear(); renderNav(); renderList(); toast(`작성 중이던 메일 ${nds.length}통을 삭제했어요`, () => { xs.forEach(ndRestore); renderNav(); renderList(); }); return; } }
  const list = MAILS.filter(m => ids.includes(m.id));
  list.forEach(m => { m.deleted = 1; jSet(m, { d: 1 }); });
  if (ids.includes(st.open) && st.folder !== 'all') st.open = null; st.picked.clear();
  renderNav(); renderList(); renderRead(true);
  toast(`${ids.length}통을 지운 편지함으로 옮겼어요`, () => restoreMails(list.map(m => m.id)));
}
function restoreMails(ids) { MAILS.forEach(m => { if (ids.includes(m.id)) { m.deleted = 0; jSet(m, { d: 0 }); } }); renderNav(); renderList(); renderRead(true); toast(`${ids.length}통을 되살렸어요`); }
// 편지함으로 옮기면 받은편지함에서는 빠짐 (Gmail의 '보관처리+라벨'과 같음)
function moveTo(ids, boxId) {
  const before = MAILS.map(m => [m.id, m.box, m.inbox, m.deleted]);
  const olds = [...new Set(MAILS.filter(m => ids.includes(m.id) && m.box && m.box !== boxId).map(m => m.box))];
  MAILS.forEach(m => { if (ids.includes(m.id)) { m.box = boxId; m.inbox = 0; if (m.deleted) { m.deleted = 0; jSet(m, { d: 0 }); } } });
  st.picked.clear(); renderNav(); renderList(); renderRead();
  syncLabels(ids, [boxId], ['INBOX', ...olds], '편지함 이동');
  toast(`${ids.length}통을 '${boxPath(boxId)}'(으)로 옮겼어요`, () => {
    before.forEach(([id, b, i, d]) => { const m = MAILS.find(x => x.id === id); if (m && ids.includes(id)) { m.box = b; m.inbox = i; m.deleted = d || 0; jSet(m, { b: b || '', i, d: d ? 1 : 0 }); } });
    renderNav(); renderList(); renderRead(); });
}

/* ───────── 오른쪽: 읽기 ───────── */
// 받는사람이 20명을 넘으면 접어서 보여 줌 (펼치기는 이 메일을 보는 동안만)
const PPL_MAX = 20;
function personLine(list, k) {
  if (list.length <= PPL_MAX || st.pplOpen === st.open + ':' + k) return personLine0(list) + (list.length > PPL_MAX ? ` <button class="pplmore" data-act="ppl" data-k="${k}">접기</button>` : '');
  return personLine0(list.slice(0, PPL_MAX)) + ` <button class="pplmore" data-act="ppl" data-k="${k}">외 ${list.length - PPL_MAX}명 펼치기</button>`;
}
function personLine0(list) { return list.map(p => isMe(p) ? '<span class="me">나</span>' : `${esc(p.name)} <span style="color:var(--mute)">&lt;${esc(p.email)}&gt;</span>`).join(', '); }
function prevHtml(prev, i) {
  if (i >= prev.length) return '';
  const p = prev[i];
  return `<div class="prev"><div class="ph"><b>보낸 사람:</b> ${esc(p.from.name)} &lt;${esc(p.from.email)}&gt;<br><b>보낸 날짜:</b> ${fmtD(dayOf(p))} ${p.t}<br><b>받는 사람:</b> ${p.to.map(x => esc(x.name)).join(', ')}${p.cc.length ? `<br><b>참조:</b> ${p.cc.map(x => esc(x.name)).join(', ')}` : ''}</div>
    <div class="txt">${esc(p.body)}</div>${prevHtml(prev, i + 1)}</div>`;
}
function renderRead(force) {
  const m = MAILS.find(x => x.id === st.open);
  if (!m) { $('#view').innerHTML = '<div class="blank">목록에서 메일을 고르세요</div>'; $('#view').dataset.key = ''; return; }
  if (m.real && !m.full && !m._loading) fetchFull(m);  // 새로 고침 직후 열려 있던 메일도 본문 받기
  // 뒤에서 메일을 받아 오며 화면을 다시 그릴 때, 보고 있는 메일이 그대로면 본문을 새로 그리지 않음 (깜빡임 방지)
  const key = [m.id, m.full ? 1 : 0, m.box, boxPath(m.box), m.draft ? 1 : 0, m.deleted ? 1 : 0, attsOf(m).length, m.subj].join('|');
  if (!force && $('#view').dataset.key === key && $('#view').firstElementChild) return;
  $('#view').dataset.key = key;
  const toMe = m.to.some(isMe);
  $('#view').innerHTML = `
    <div class="rhead"><h2>${esc(m.subj)}</h2>
      <div class="hrow">
        <div class="people">
          <div class="from">${esc(m.from.name)}<span class="addr">&lt;${esc(m.from.email)}&gt;</span></div>
          <div class="pl${toMe ? ' tome' : ''}"><span class="k">수신</span>${personLine(m.to, 'to')}</div>
          ${m.cc.length ? `<div class="pl"><span class="k">참조</span>${personLine(m.cc, 'cc')}</div>` : ''}
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
    ${attsOf(m).length ? `<div class="attbar${st.attFull === m.id ? ' full' : ''}"><b>${ico('clip', 16)} 첨부 ${attsOf(m).length}</b><div class="attgrid n${Math.min(3, attsOf(m).length)}">${attsOf(m).map(([[t, n, s], i]) => `<span class="attw"><span class="att" data-ai="${i}" title="${esc(n)} · 누르면 다운로드">${ftIcon(t, 17, n)}<span class="an">${esc(n)}</span> <small>${s}</small></span>${attBtns(m, i, n)}</span>`).join('')}</div><button class="attmore" data-act="attfull" hidden>${st.attFull === m.id ? '접기' : '펼치기'}</button></div>` : ''}
    ${m.deleted ? `<div class="dbanner delb"><span>${ico('trash', 16)} 삭제한 메일이에요</span><button data-act="restore">되살리기</button></div>` : ''}
    ${m.draft ? `<div class="dbanner"><span>${ico('pen', 16)} 이 대화에 작성 중이던 답장이 있어요</span><button data-act="draft">이어서 쓰기</button><button class="ib" data-act="deldraft" title="작성 중이던 메일 삭제">${ico('trash', 17)}</button></div>` : ''}
    <div class="rbody">${m.real && !m.full ? '<div class="blank" style="padding:40px 0">본문 불러오는 중…</div>' : m.html ? '<iframe class="mailhtml" sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>' : `<div class="txt">${esc(m.body)}</div>${prevHtml(m.prev, 0)}`}</div>`;
  const fr = $('#view iframe.mailhtml');
  attMoreCheck();
  if (fr) {
    fr.addEventListener('load', () => { try {
      const d = fr.contentDocument, W = fr.clientWidth, sw = d.documentElement.scrollWidth;
      ['pointerdown', 'keydown'].forEach(ev => d.addEventListener(ev, authGesture, true));  // 메일 본문을 눌러도 로그인 연장
      // 화면보다 조금 넓은 메일(서명·표)은 살짝 줄여서 한눈에 (너무 많이 줄여야 하면 그대로 두고 옆으로 스크롤)
      if (sw > W + 4) { const z = W / sw; if (z >= 0.9) d.body.style.zoom = z.toFixed(3); }  // 10% 넘게 줄여야 하면 그대로 두고 옆으로 스크롤 (글자가 작아지지 않게)
      fr.style.height = Math.max(d.documentElement.scrollHeight, d.body.getBoundingClientRect().height) + 20 + 'px';
    } catch (e) { fr.style.height = '70vh'; } });
    const css = '<base target="_blank"><style>html{overflow-x:auto;overflow-y:hidden}body{margin:0;font:14.5px/1.65 Pretendard,"Malgun Gothic",sans-serif;color:#1f1f1f;word-break:break-word}</style>';
    const show = h => { if ($('#view iframe.mailhtml') === fr) fr.srcdoc = css + h; };
    if (m.htmlReady) show(m.htmlReady);
    else { show(m.html.replace(/src=["']?cid:[^"'\s>]+["']?/gi, 'src="data:image/gif;base64,R0lGODlhAQABAAAAACw="')); resolveInline(m).then(show); }
  }
}
// 메일을 여는 즉시 읽음
// 첨부 이름이 잘린 게 있을 때만 '펼치기' 보이기
function attMoreCheck() {
  const bar = $('#view .attbar'); if (!bar) return; const b = $('.attmore', bar);
  b.hidden = !bar.classList.contains('full') && ![...bar.querySelectorAll('.an')].some(e => e.scrollWidth > e.clientWidth + 1);
}
window.addEventListener('resize', () => { clearTimeout(attMoreCheck.t); attMoreCheck.t = setTimeout(attMoreCheck, 150); });
function openMail(id) {
  if (id < 0) { openNd(id); return; }
  st.unreadKeep = st.folder === 'unread' ? id : null;  // 안 읽은 메일에서 연 메일은 다른 메일을 누를 때까지 목록에 남김
  st.ndOpen = null;
  flushCompose();
  if (st.attFull !== id) st.attFull = null;
  if (st.pplOpen && !st.pplOpen.startsWith(id + ':')) st.pplOpen = null;  // 첨부 펼치기는 그 메일을 보는 동안만
  st.open = id;
  const m = MAILS.find(x => x.id === id);
  if (m && m.unread) { m.unread = 0; jSet(m, { u: 0 }); }
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
  const keep = m.draft, keepD = m.draftD; m.draft = null; rdRemove(m);
  if (cs.mailId === m.id) { clearTimeout(cs.timer); cs.saving = false; $('#read').classList.remove('composing'); }
  renderNav(); renderList(); renderRead();
  toast('작성 중이던 메일을 삭제했어요', () => { m.draft = keep; if (keepD) { m.draftD = keepD; rdSave(m, keepD); } renderNav(); renderList(); renderRead(); });
}

/* ───────── 답장 임시저장 (이 PC): 받는사람·참조·서식·인용까지 통째로 ───────── */
const rdKey = () => 'rd-' + (real.on ? ME.email : 'sample');
const rdId = m => m.gid || 's' + m.id;
function rdSave(m, d) {
  const all = store.get(rdKey(), {}); const c = Object.assign({}, d, { files: (d.files || []).filter(f => f.fwd) });
  // 원본 메일 인용(그림 포함 — 용량 큼)은 저장하지 않고 다시 열 때 새로 붙임
  c.html = (c.html || '').replace(/<div class="quote qhtml"[\s\S]*$/, '<div class="quote qhtml" data-req="1"></div>');
  all[rdId(m)] = { at: Date.now(), d: c, text: m.draft }; RD_MEM.set(rdId(m), d);
  store.set(rdKey(), all);
}
const RD_MEM = new Map();  // 첨부 파일 내용까지 (이 창이 열려 있는 동안)
function rdRemove(m) { if (!m) return; m.draftD = null; RD_MEM.delete(rdId(m)); const all = store.get(rdKey(), {}); if (all[rdId(m)]) { delete all[rdId(m)]; store.set(rdKey(), all); } }
// 메일 목록을 새로 만들 때 저장해 둔 답장을 다시 붙임
function applyReplyDrafts() { const all = store.get(rdKey(), {}); if (!Object.keys(all).length && !RD_MEM.size) return; MAILS.forEach(m => { const x = all[rdId(m)], mem = RD_MEM.get(rdId(m)); if ((x || mem) && !m.draft) { m.draft = (x && x.text) || ' '; m.draftD = Object.assign({}, mem || x.d, { mailId: m.id }); } }); }
/* ───────── 새 메일 임시저장 (이 PC) ───────── */
const ndKey = () => 'nd-' + (real.on ? ME.email : 'sample');
const ndList = () => store.get(ndKey(), []);
const ND_MEM = new Map();  // 직접 고른 첨부 파일 내용 (이 창이 열려 있는 동안만 — 저장소에는 못 넣음)
function ndSave() {
  if (!cs.nd) cs.nd = Date.now();
  ND_MEM.set(cs.nd, cs.files.slice());
  const d = draftNow(); d.files = d.files.filter(f => f.fwd);  // 직접 고른 파일은 브라우저 보안상 다시 첨부해야 함
  const L = ndList().filter(x => x.k !== cs.nd); L.unshift({ k: cs.nd, at: Date.now(), d, lost: cs.files.length - d.files.length });
  try { store.set(ndKey(), L); } catch (e) { d.html = d.html.replace(/src="data:[^"]{2000,}"/g, 'src=""'); try { store.set(ndKey(), L); } catch (e2) { /* 저장 공간 부족 */ } }
}
function ndRemove(k) { if (!k) return null; const L = ndList(); const x = L.find(y => y.k === k); store.set(ndKey(), L.filter(y => y.k !== k)); if (x) x._files = ND_MEM.get(k); ND_MEM.delete(k); return x || null; }
function ndRestore(x) { if (!x) return; const L = ndList().filter(y => y.k !== x.k); L.unshift(x); store.set(ndKey(), L); if (x._files) ND_MEM.set(x.k, x._files); }
// 목록에 보일 모양 (id는 음수: 진짜 메일과 겹치지 않게)
function ndMails() {
  return ndList().map(x => { const when = new Date(x.at), day = new Date(when); day.setHours(0, 0, 0, 0); const t = (x.d.html || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    return { id: -x.k, nd: x.k, when: +when, d: Math.max(0, Math.round((TODAY - day) / 86400000)), t: when.toTimeString().slice(0, 5), from: ME, to: x.d.to || [], cc: x.d.cc || [], subj: x.d.subj || '(제목 없음)', body: t, snippet: (x.d.to || []).length ? '받는사람: ' + x.d.to.map(p => p.name || p.email).join(', ') : t, draft: t || ' ', att: [], prev: [], box: null, inbox: 0, sent: 0, unread: 0 }; });
}
function openNd(id) {
  const x = ndList().find(y => -y.k === id); if (!x) return;
  flushCompose(); st.open = null; st.ndOpen = id;
  const mem = ND_MEM.get(x.k);  // 같은 창에서 닫았다 열면 첨부 파일도 그대로
  loadDraft(Object.assign({}, x.d, { nd: x.k, kind: 'new', mailId: null, files: mem ? mem.slice() : x.d.files }));
  if (x.lost && !mem) toast(`직접 첨부했던 파일 ${x.lost}개는 다시 첨부해 주세요`);
  renderList();
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
function setChips(box, people) { $$('.rc', box).forEach(x => x.remove()); const inp = $('input', box); inp.value = ''; people.forEach(p => box.insertBefore(chipEl(p), inp)); foldChips(box, true); }
// 작성 화면: 받는사람이 20명을 넘으면 접어 두고, 칸을 누르면 모두 펼침
function foldChips(box, on) {
  const all = $$('.rc', box), fold = on && all.length > PPL_MAX;
  box.classList.toggle('fold', fold);
  all.forEach((c, i) => c.classList.toggle('fhide', fold && i >= PPL_MAX));
  let b = $('.chipmore', box);
  if (fold) { if (!b) { b = document.createElement('button'); b.className = 'chipmore'; b.type = 'button'; box.insertBefore(b, $('input', box)); b.addEventListener('mousedown', e => { e.preventDefault(); e.stopPropagation(); foldChips(box, false); $('input', box).focus(); }); } b.textContent = `외 ${all.length - PPL_MAX}명 펼치기`; }
  else if (b) b.remove();
}
// 이름 없이 주소만 있는 사람(이름이 주소 앞부분)은 아는 이름으로: 나 → 내 이름, 주소록에 있으면 그 이름
function nicePerson(p) {
  if (!p || !p.email) return p; if (isMe(p)) return Object.assign({}, p, { name: ME.name || p.name, email: ME.email });
  const bare = !p.name || p.name === p.email || p.name.toLowerCase() === p.email.split('@')[0].toLowerCase();
  if (!bare) return p; const k = rcptPeople().find(c => c.email && c.email.toLowerCase() === p.email.toLowerCase() && c.name && c.name !== c.email && c.name.toLowerCase() !== c.email.split('@')[0].toLowerCase());
  return k ? Object.assign({}, p, { name: k.name }) : p;
}
function chipEl(p) {
  p = nicePerson(p);
  const c = document.createElement('span'); c.className = 'rc'; c.style.cssText = chipStyle(p.email); c.title = p.email; c.dataset.email = p.email; c.dataset.name = p.name;
  c.append(document.createTextNode(p.name === p.email ? p.email : p.name));
  const x = document.createElement('button'); x.textContent = '✕'; x.title = '빼기'; x.addEventListener('click', () => { c.remove(); dirty(); }); c.append(x);
  return c;
}
const chipsOf = box => $$('.rc', box).map(c => ({ name: c.dataset.name, email: c.dataset.email }));
const RCPT_RE = /^[^@\s<>,;"]+@[^@\s<>,;"]+\.[^@\s<>,;"]+$/;
// 받는사람·참조·숨은참조에 이미 있는 주소면 알려 주고 true
function rcptTaken(email, box) {
  const e = (email || '').toLowerCase();
  for (const [id, nm] of [['#toBox', '받는사람'], ['#ccBox', '참조'], ['#bccBox', '숨은참조']]) { const b = $(id); if (!b) continue; if (chipsOf(b).some(p => p.email.toLowerCase() === e)) { toast(`${email}은(는) 이미 ${nm}에 있어요`); return true; } }
  return false;
}
// 받는사람 칸들에 글자로 남은 주소를 칩으로 (보내기 직전). 주소 꼴이 아닌 글자가 있으면 false
const commitRcpts = () => ['#toBox', '#ccBox', '#bccBox'].every(id => { const b = $(id); return !b || !b._commit || b._commit(false); });
const footerStyle = f => `font-family:'${f.font.family}',Pretendard,sans-serif;font-size:${f.font.size}pt;color:${f.font.color}`;
// 풋터 맨 앞의 빈 줄(<br>, 빈 문단)은 떼어 냄 — 작성 칸과 풋터 사이가 너무 벌어지지 않게
function trimLead(html) {
  const d = document.createElement('div'); d.innerHTML = html || '';
  const empty = n => n.nodeType === 3 ? !n.textContent.replace(/[\s\u00a0]/g, '') : n.nodeType === 1 && (n.tagName === 'BR' || (!/^(IMG|TABLE|HR)$/.test(n.tagName) && !n.querySelector('img,table,hr') && !n.textContent.replace(/[\s\u00a0]/g, '')));
  // 감싼 div·p 안쪽의 맨 앞 빈 줄까지 (예: <div><div><br></div>안녕하세요…</div>), 맨 앞 줄의 위쪽 여백도 없앰
  let box = d;
  for (let depth = 0; box && depth < 6; depth++) {
    while (box.firstChild && empty(box.firstChild)) box.firstChild.remove();
    const f = box.firstChild; if (!f || f.nodeType !== 1 || !/^(DIV|P|SPAN|FONT|SECTION|BLOCKQUOTE)$/.test(f.tagName)) break;
    f.style.marginTop = '0'; f.style.paddingTop = '0'; box = f;
  }
  return d.innerHTML;
}
const fillName = h => (h || '').replace(/\{이름\}/g, esc(ME.name || ''));
const footerHtml = f => f ? `<div class="gp-footer" spellcheck="false" data-footer="${f.id}" style="${footerStyle(f)}">${fillName(trimLead(f.html))}</div>` : '<div class="gp-footer" spellcheck="false"></div>';
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
  // 순서가 위에 있는 풋터일수록 먼저 적용 (조건이 맞는 첫 번째)
  return FOOTERS.find(f => score(f) > 0) || null;
}
function composeHtml(text, footer, quote) {
  // 풋터가 있으면 위에 빈 줄을 따로 두지 않음 → 풋터 안 첫 빈 줄(인사말과 맺음말 사이)에 커서 (loadDraft에서)
  return nl(text) + (footer ? '' : '<div><span id="gpCaret"></span><br></div>') + footerHtml(footer) +
    (quote && quote.length ? `<div class="quote" contenteditable="false" spellcheck="false">${nestQ(quote, 0)}</div>` : '');
}
function nestQ(blocks, i) { return i >= blocks.length ? '' : `<div class="qb">${esc(blocks[i])}${nestQ(blocks, i + 1)}</div>`;
}
async function openCompose(kind, opts) {
  opts = opts || {};
  const m = MAILS.find(x => x.id === (opts.mailId != null ? opts.mailId : st.open));
  if (m && m.real && !m.full && kind !== 'new') { toast('본문 불러오는 중…'); await fetchFull(m); }
  // 작성 중이던 답장: 저장해 둔 그대로(전체 답장·받는사람·서식·첨부) 다시 열기
  let d = opts.draft || (kind === 'draft' && m && m.draftD ? Object.assign({}, m.draftD, { files: (m.draftD.files || []).slice() }) : null);
  if (d && m && m.real && /<div class="quote qhtml" data-req="1">/.test(d.html || '')) { let q = null; try { q = await quoteHtml(m); } catch (e) { /* 인용 없이 */ } d.html = d.html.replace(/<div class="quote qhtml" data-req="1"><\/div>[\s\S]*$/, q || ''); }
  if (!d) {
    d = buildDraft(kind, m);
    // 답장·전달: 원래 메일을 글자만이 아니라 원본 모양(표·색·그림) 그대로 아래에 붙임
    if (m && m.real && m.html && /^(reply|all|fwd)$/.test(kind)) { try { const q = await quoteHtml(m); if (q) d.html = d.html.replace(/<div class="quote"[\s\S]*$/, '') + q; } catch (e) { /* 실패하면 글자 인용 그대로 */ } }
  }
  if (SET.composeMode === 'popup' && !document.body.classList.contains('popmode') && !opts.inline) { popCompose(d); return; }
  flushCompose();
  loadDraft(d);
}
async function quoteHtml(m) {
  const src = m.htmlReady || await resolveInline(m) || m.html;
  const r = await renderPasted(src, { quote: true });  // 메일 안 <style> 모양을 칸·글자마다 직접 입힘 (작성 화면 전체에 번지지 않게)
  if (!r) return null;
  const who = p => p.name && p.name !== p.email ? `${esc(p.name)} &lt;${esc(p.email)}&gt;` : esc(p.email);
  const hdr = `<div class="qhdr">-----원본 메일-----<br><b>보낸 사람:</b> ${who(m.from)}<br><b>보낸 날짜:</b> ${fmtD(dayOf(m))} ${m.t}<br><b>받는 사람:</b> ${m.to.map(who).join(', ')}${m.cc && m.cc.length ? `<br><b>참조:</b> ${m.cc.map(who).join(', ')}` : ''}<br><b>제목:</b> ${esc(m.subj)}</div><br>`;
  return `<div class="quote qhtml" contenteditable="false" spellcheck="false">${hdr}<div class="qbody">${cleanHtml(r.html)}</div></div>`;
}
function buildDraft(kind, m) {
  // 맨 위 인사말: 설정 > 일반에서 정함 (기본은 비움 — 풋터에 인사말이 있으면 겹치지 않게)
  let to = [], cc = [], subj = '', quote = '', text = SET.greeting ? SET.greeting.replace(/\n*$/, '\n') : '';
  if (m && kind !== 'new') {
    const sender = m.replyTo && m.replyTo.email && !isMe(m.replyTo) ? m.replyTo : m.from;  // Reply-To가 있으면 거기로
    const uniq = list => { const seen = new Set(); return list.filter(p => p && p.email && !seen.has(p.email.toLowerCase()) && seen.add(p.email.toLowerCase())); };
    if (kind === 'reply' || kind === 'draft') to = [m.sent ? m.to[0] : sender].filter(Boolean);
    if (kind === 'all') { to = uniq(m.sent ? m.to : [sender, ...m.to.filter(p => !isMe(p))]); const inTo = new Set(to.map(p => p.email.toLowerCase())); cc = uniq(m.cc.filter(p => !isMe(p) && !inTo.has(p.email.toLowerCase()))); }
    subj = (kind === 'fwd' ? 'FW: ' : 'RE: ') + m.subj.replace(/^((re|fw|fwd):\s*)+/i, '');
    // 전체 히스토리: 이 메일 + 그 이전 메일 전부를 차례로 이어 붙임
    const hdr = x => `-----원본 메일-----\n보낸 사람: ${x.from.name} <${x.from.email}>\n보낸 날짜: ${fmtD(dayOf(x))} ${x.t}\n받는 사람: ${x.to.map(p => p.name).join(', ')}${x.cc && x.cc.length ? '\n참조: ' + x.cc.map(p => p.name).join(', ') : ''}\n제목: ${m.subj}\n\n${x.body}`;
    quote = [m, ...m.prev].map(hdr);
    if (kind === 'draft') text = m.draft + '\n';
  }
  const f = pickFooter(kind, m);
  const files = m && kind === 'fwd' ? attsOf(m).map(([a]) => ({ name: a[1], size: (a[3] && a[3].bytes) || parseSize(a[2]), fwd: { gid: m.gid || null, id: a[3] && a[3].id, mime: a[3] && a[3].mime } })) : [];
  const thread = m && m.real && /^(reply|all|draft)$/.test(kind) ? { threadId: m.threadId, inReplyTo: m.msgId, refs: m.refs } : null;
  return { kind, mailId: m && kind !== 'new' ? m.id : null, to, cc, subj, html: composeHtml(text, f, quote), footer: f ? f.id : null, files, thread };
}
function loadDraft(d) {
  cs.nd = d.nd || null; cs.kind = d.kind; cs.mailId = d.mailId; cs.thread = d.thread || null; cs.footer = d.footer; cs.files = (d.files || []).slice();
  setChips($('#toBox'), d.to); setChips($('#ccBox'), d.cc); setChips($('#bccBox'), d.bcc || []);
  showBcc((d.bcc || []).length > 0);
  $('#subj').value = d.subj;
  $('#cbody').innerHTML = d.html;
  $$('#cbody .tdsel, #cbody .hrsel').forEach(x => x.classList.remove('tdsel', 'hrsel')); TS.cells = []; TS.multi = false;
  renderFooterBar(); renderFiles(); setSave('');
  $('#read').classList.add('composing');
  applyBaseFont();
  let mk = $('#gpCaret');
  if (!mk && $('.gp-footer', $('#cbody'))) mk = caretInFooter($('.gp-footer', $('#cbody')));
  cs.initial = null; setTimeout(() => { cs.initial = composeSig(); });
  // 새 메일·전달은 받는사람부터. 커서 자리 표시는 남겨 두고, 나중에 Tab으로 본문에 오면 그 자리로
  if (d.kind === 'new' || d.kind === 'fwd' || !d.to.length) $('#toBox input').focus(); else caretAt(mk);
  runTypo();
}
// 작성 칸 기본 글꼴 (설정 > 일반)
function applyBaseFont() {
  const F = SET.font || { family: '맑은 고딕', size: 10 }, b = $('#cbody');
  b.style.fontFamily = `'${F.family}', sans-serif`; b.style.fontSize = F.size + 'pt';
  if ($('#fFont')) $('#fFont').value = F.family; if ($('#fSize')) $('#fSize').value = String(F.size);
}
// 풋터 안에서 글을 쓸 자리: 글자가 나온 뒤 첫 빈 줄(빈 문단 또는 <br><br>). 없으면 풋터 위에 한 줄 만듦
// 숨은참조 칸: 필요할 때만 (넣은 사람이 있으면 계속 보임)
function showBcc(on) { $('#bccFld').hidden = !on; $('#bccTog').hidden = on; }
function caretInFooter(f) {
  const mk = document.createElement('span'); mk.id = 'gpCaret';
  const isEmptyBlock = n => n.nodeType === 1 && /^(DIV|P)$/.test(n.tagName) && !n.textContent.replace(/[\s\u00a0]/g, '') && !n.querySelector('img,table,hr');
  let seen = false, spot = null;
  const tw = document.createTreeWalker(f, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  for (let n = tw.nextNode(); n; n = tw.nextNode()) {
    if (n.nodeType === 3) { if (n.textContent.replace(/[\s\u00a0]/g, '')) seen = true; continue; }
    if (!seen) continue;
    if (isEmptyBlock(n)) { spot = () => n.insertBefore(mk, n.firstChild); break; }
    if (n.tagName === 'BR') { let x = n.nextSibling; while (x && x.nodeType === 3 && !x.textContent.trim()) x = x.nextSibling; if (x && x.nodeName === 'BR') { spot = () => n.after(mk); break; } }
    if (/^(TABLE|HR)$/.test(n.tagName)) break;  // 서명 표·선 아래로는 내려가지 않음
  }
  if (spot) spot(); else { const d = document.createElement('div'); d.append(mk, document.createElement('br')); f.before(d); }
  return mk;
}
// 본문에 처음 들어올 때: Tab 등 키보드로 오면 커서 자리로, 마우스로 누른 곳이 있으면 거기 그대로
let cbodyMouse = 0; const lastEdit = { r: null };
document.addEventListener('input', e => { if (e.target.id === 'cbody') { const s = getSelection(); if (s.rangeCount) lastEdit.r = s.getRangeAt(0).cloneRange(); } }, true);
document.addEventListener('mousedown', e => {
  if (!(e.target.closest && e.target.closest('#cbody'))) return; cbodyMouse = Date.now();
  // 본문 아래 빈 곳을 누르면 브라우저는 풋터(서명) 맨 끝에 커서를 둠 → 풋터 위 글 쓰는 자리로 옮김
  const b = $('#cbody'), f = $('.gp-footer', b); if (e.target !== b || !f || e.button !== 0) return;
  const fr = f.getBoundingClientRect(), q = $('.quote', b); if (e.clientY < fr.top || (q && e.clientY >= q.getBoundingClientRect().top)) return;
  e.preventDefault(); b.focus();
  const mk = $('#gpCaret'); if (mk) { caretAt(mk); return; }
  const le = lastEdit.r; if (le && b.contains(le.startContainer) && !le.startContainer.parentElement.closest('.quote')) { const s0 = getSelection(); s0.removeAllRanges(); s0.addRange(le.cloneRange()); return; }  // 마지막으로 글 쓰던 자리
  let prev = f.previousElementSibling;
  if (!prev) { prev = document.createElement('div'); prev.innerHTML = '<br>'; f.before(prev); }
  const r = document.createRange(); r.selectNodeContents(prev); r.collapse(false);
  if (prev.lastChild && prev.lastChild.nodeName === 'BR') r.setStartBefore(prev.lastChild), r.collapse(true);
  const s = getSelection(); s.removeAllRanges(); s.addRange(r);
}, true);
document.addEventListener('focusin', e => {
  if (e.target.id !== 'cbody') return; const mk = $('#gpCaret'); if (!mk) return;
  if (Date.now() - cbodyMouse < 400) { mk.remove(); return; }
  setTimeout(() => { if ($('#gpCaret')) caretAt($('#gpCaret')); });
});
function caretAt(mk) {
  const b = $('#cbody'); b.focus();
  const r = document.createRange();
  if (mk) { r.setStartBefore(mk); mk.remove(); } else { r.selectNodeContents(b); r.collapse(false); }
  r.collapse(true); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
}
const draftNow = () => ({ nd: cs.nd || null, thread: cs.thread || null, kind: cs.kind, mailId: cs.mailId, to: chipsOf($('#toBox')), cc: chipsOf($('#ccBox')), bcc: chipsOf($('#bccBox')), subj: $('#subj').value, html: $('#cbody').innerHTML, footer: cs.footer, files: cs.files.map(f => Object.assign({}, f)) });
/* 자동 임시저장: 입력이 멈추면 1.2초 뒤 저장. 저장 전에 떠나려 하면 알림 */
function setSave(s) { const el = $('#saveState'); el.textContent = s; el.classList.toggle('busy', /중/.test(s)); }
// 풋터 끝에서 Enter를 치면 브라우저가 풋터 칸을 통째로 복제함 → 두 번째부터는 평범한 줄로
function dedupeFooter() { const fs = $$('#cbody .gp-footer'); fs.slice(1).forEach(x => { x.removeAttribute('class'); x.removeAttribute('data-footer'); x.removeAttribute('spellcheck'); }); }
function dirty() {
  dedupeFooter();
  if (!$('#read').classList.contains('composing')) return;
  cs.saving = true; setSave('저장 중…');
  clearTimeout(cs.timer); cs.timer = setTimeout(saveDraft, 1200);
}
// 처음 연 상태 그대로인지 (받는사람·참조·제목·본문·첨부)
const composeSig = () => JSON.stringify([chipsOf($('#toBox')), chipsOf($('#ccBox')), chipsOf($('#bccBox')), $('#subj').value, $('#cbody').innerText.replace(/\s+/g, ' ').trim(), $$('#cbody img').length, cs.files.length]);
function saveDraft() {
  clearTimeout(cs.timer);
  if (cs.initial && composeSig() === cs.initial) { cs.saving = false; setSave(''); return; }
  store.set('draft-last', draftNow());
  if (cs.mailId == null) ndSave();
  const m = MAILS.find(x => x.id === cs.mailId);
  if (m) { const t = $('#cbody').innerText.split(/\n{2,}-----원본/)[0].trim(); m.draft = t || m.draft || ' '; const dd = draftNow(); dd.files = cs.files.slice(); m.draftD = dd; rdSave(m, dd); }
  cs.saving = false;
  setSave('자동 저장됨 ' + new Date().toTimeString().slice(0, 5));
  renderList(); renderNav();
}
function flushCompose() { if (cs.saving) saveDraft(); }
// 새로고침·창 닫기·다른 탭으로 갈 때: 1.2초 기다리지 않고 바로 저장 (이 PC 저장소는 즉시 기록됨)
window.addEventListener('beforeunload', () => { try { if (cs.saving) saveDraft(); } catch (e) { /* */ } });
document.addEventListener('visibilitychange', () => { if (document.hidden) try { flushCompose(); } catch (e) { /* */ } });
function closeCompose() {
  flushCompose();
  if (document.body.classList.contains('popmode') && !st.open) { window.close(); return; }
  $('#read').classList.remove('composing'); renderRead();
}
function discardCompose() {
  const snap = draftNow(); const m = MAILS.find(x => x.id === cs.mailId); const keep = m && m.draft;
  clearTimeout(cs.timer); cs.saving = false;
  const ndx = ndRemove(cs.nd); cs.nd = null;
  if (m) { m.draft = null; rdRemove(m); }
  $('#read').classList.remove('composing'); renderNav(); renderList(); renderRead();
  toast('작성 중이던 메일을 삭제했어요', () => { if (m) m.draft = keep; ndRestore(ndx); loadDraft(snap); renderNav(); renderList(); });
  if (document.body.classList.contains('popmode') && !st.open) setTimeout(() => window.close(), 1500);
}
/* 풋터: 누르면 바로 적용, 다른 풋터를 누르면 그 자리를 바꿔 끼움 (중복 없음) */
// 글자·그림·표가 있는지
const nodesText = ns => ns.map(n => n.textContent).join('').replace(/[\s\u00a0\u3000]/g, '');
const nodesMedia = ns => ns.some(n => n.nodeType === 1 && (n.matches('img,table,hr') || !!n.querySelector('img,table,hr')));
const nodesHave = ns => !!nodesText(ns) || nodesMedia(ns);
// 풋터 안에서 사용자가 쓴 부분: 처음 넣은 풋터 모양과 앞·뒤가 같은 부분을 빼고 남은 가운데 (인사말과 맺음말 사이에 쓴 본문)
function footerUserNodes(slot) {
  const f = FOOTERS.find(x => x.id === slot.dataset.footer); if (!f) return [];
  const t = document.createElement('div'); t.innerHTML = fillName(trimLead(f.html));
  const key = n => { if (n.nodeType === 3) return 't:' + n.nodeValue.replace(/[\s\u00a0]+/g, ' ').trim(); if (n.nodeType !== 1) return ''; const c = n.cloneNode(true); $$('#gpCaret', c).forEach(x => x.remove()); return c.outerHTML.replace(/\s+/g, ' '); };
  const keep = n => n.nodeType === 1 ? n.id !== 'gpCaret' : n.nodeType === 3 ? !!n.nodeValue.trim() : false;
  const A = [...slot.childNodes].filter(keep), B = [...t.childNodes].filter(keep);
  let i = 0; while (i < A.length && i < B.length && key(A[i]) === key(B[i])) i++;
  let j = 0; while (j < A.length - i && j < B.length - i && key(A[A.length - 1 - j]) === key(B[B.length - 1 - j])) j++;
  const mid = A.slice(i, A.length - j), tmid = B.slice(i, B.length - j);
  if (!nodesHave(mid) || mid.map(key).join('|') === tmid.map(key).join('|')) return [];
  return mid;
}
// 풋터 넣기·바꾸기: 이미 쓴 본문은 그대로 살림
//  - 새 풋터에 인사말과 맺음말 사이 빈 줄이 있으면 → 본문을 그 자리로 옮김
//  - 없으면 → 본문은 풋터 위에
function applyFooter(id) {
  const f = FOOTERS.find(x => x.id === id); if (!f) return;
  const b = $('#cbody');
  let slot = $('.gp-footer', b);
  const q = $('.quote', b);
  // 풋터 위(인용 전까지)에 쓴 글, 예전 풋터 빈 줄에 쓴 글
  const kids = [...b.childNodes], stop = slot || q;
  const above = (stop ? kids.slice(0, kids.indexOf(stop)) : kids).filter(n => n.id !== 'gpCaret');
  const inF = slot && slot.dataset.footer ? footerUserNodes(slot) : [];
  inF.forEach(n => n.remove());
  $$('#gpCaret', b).forEach(x => x.remove());
  if (!slot) { slot = document.createElement('div'); slot.className = 'gp-footer'; slot.spellcheck = false; q ? b.insertBefore(slot, q) : b.append(slot); }
  slot.dataset.footer = id; slot.setAttribute('style', footerStyle(f)); slot.innerHTML = fillName(trimLead(f.html));
  // 새 풋터의 글 쓰는 자리
  const mk = caretInFooter(slot), inSlot = slot.contains(mk);
  // 블록이 아닌 글자·<br>은 한 줄(div)씩 묶어서 옮김
  const asBlocks = ns => { const out = []; let line = null; ns.forEach(n => { if (n.nodeType === 1 && /^(DIV|P|TABLE|UL|OL|HR|BLOCKQUOTE|H[1-6])$/.test(n.tagName)) { line = null; out.push(n); } else if (n.nodeName === 'BR') { if (!line) { line = document.createElement('div'); out.push(line); } line.append(n); line = null; } else { if (!line) { line = document.createElement('div'); out.push(line); } line.append(n); } }); return out; };
  const trimEmpty = ns => { ns = ns.slice(); while (ns.length && !nodesHave([ns[0]])) ns.shift(); while (ns.length && !nodesHave([ns[ns.length - 1]])) ns.pop(); return ns; };
  let moved = [];
  if (inSlot) {
    const aboveC = nodesHave(above) ? trimEmpty(asBlocks(above)) : [];
    above.forEach(n => n.isConnected && n.parentNode === b && n.remove());
    moved = aboveC.concat(inF);
    if (moved.length) { const host = mk.parentNode; if (host !== slot && /^(DIV|P)$/.test(host.nodeName) && !nodesHave([host])) host.replaceWith(...moved); else mk.replaceWith(...moved); }
  } else if (inF.length) { moved = asBlocks(inF); mk.parentNode.replaceWith(...moved); }  // 새 풋터에 빈 줄이 없으면 풋터 위로
  else if (nodesHave(above)) { mk.parentNode.remove(); const lastC = trimEmpty(above.filter(n => n.isConnected)).pop(); if (lastC) moved = [lastC]; }  // 위에 쓴 글 그대로, 빈 줄 더 만들지 않음
  // 커서: 옮긴 본문 끝, 없으면 글 쓰는 자리
  if (moved.length && moved[moved.length - 1].isConnected) { const last = moved[moved.length - 1]; const r = document.createRange(); if (last.nodeType === 3) r.setStartAfter(last); else r.selectNodeContents(last); r.collapse(last.nodeType === 3); if (last.lastChild && last.lastChild.nodeName === 'BR') { r.setStartBefore(last.lastChild); r.collapse(true); } const s = getSelection(); s.removeAllRanges(); s.addRange(r); $$('#gpCaret', b).forEach(x => x.remove()); }
  else if (mk.isConnected) caretAt(mk);
  cs.footer = id; renderFooterBar(); dirty();
}
/* 첨부: 첨부 칸을 눌러 고르거나, 작성 화면 어디에든 끌어다 놓기 */
const fmtSize = n => n < 1024 ? n + ' B' : n < 1048576 ? (n / 1024).toFixed(n < 10240 ? 1 : 0) + ' KB' : (n / 1048576).toFixed(1) + ' MB';
function addFiles(list) {
  [...list].forEach(f => cs.files.push({ name: f.name, size: f.size, file: f }));
  renderFiles(); dirty();
  const tot = cs.files.reduce((x, f) => x + (f.size || 0), 0);
  if (tot > 25 * 1048576) toast(`첨부 합계가 ${fmtSize(tot)}예요. Gmail 한도(25MB)를 넘어서 이대로는 못 보내요 — 큰 파일은 드라이브 링크로`);
  else if ([...list].some(f => !f.size)) toast('크기가 0인 파일이 있어요. 폴더나 빈 파일인지 확인해 주세요');
  else if (list.length) toast(`${list.length}개 파일을 첨부했어요`);
}
const parseSize = t => { const m = /([\d.]+)\s*(B|KB|MB|GB)/i.exec(t || ''); return m ? Math.round(+m[1] * ({ B: 1, KB: 1024, MB: 1048576, GB: 1073741824 })[m[2].toUpperCase()]) : 0; };
let fileDrag = null;
function renderFiles() {
  const box = $('#attBox');
  $$('.afile', box).forEach(x => x.remove());
  const total = cs.files.reduce((a, f) => a + f.size, 0);
  $('#attHint').textContent = cs.files.length ? `총 ${fmtSize(total)} · 클릭해서 더 첨부` : '클릭해서 파일 고르기 · 작성 화면 어디에든 끌어다 놓기';
  cs.files.forEach((f, i) => {
    const el = document.createElement('span'); el.className = 'afile'; el.draggable = true; el.title = '끌어서 순서 바꾸기';
    el.innerHTML = `${ftIcon(FT_OF[extOf(f.name)] || 'FILE', 15, f.name)}${esc(f.name)} <small>${fmtSize(f.size)}</small>${f.fwd ? '<small class="fwdtag">원본 첨부</small>' : ''}<button title="빼기">✕</button>`;
    $('button', el).addEventListener('click', e => { e.stopPropagation(); cs.files.splice(i, 1); renderFiles(); dirty(); });
    el.addEventListener('click', e => e.stopPropagation());
    // 끌어서 순서 바꾸기
    el.addEventListener('dragstart', e => { fileDrag = i; el.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/x-jin-file', String(i)); });
    el.addEventListener('dragend', () => { fileDrag = null; $$('.afile', box).forEach(x => x.classList.remove('dragging', 'drop-l', 'drop-r')); });
    el.addEventListener('dragover', e => { if (fileDrag == null) return; e.preventDefault(); e.stopPropagation(); const r = el.getBoundingClientRect(), right = e.clientX > r.left + r.width / 2; $$('.afile', box).forEach(x => x.classList.remove('drop-l', 'drop-r')); el.classList.add(right ? 'drop-r' : 'drop-l'); });
    el.addEventListener('drop', e => {
      if (fileDrag == null) return; e.preventDefault(); e.stopPropagation();
      const r = el.getBoundingClientRect(); let to = i + (e.clientX > r.left + r.width / 2 ? 1 : 0);
      const [mv] = cs.files.splice(fileDrag, 1); if (fileDrag < to) to--; cs.files.splice(to, 0, mv); fileDrag = null; renderFiles(); dirty();
    });
    box.insertBefore(el, $('#attHint'));
  });
}
/* 새 창 */
const popFeatures = 'popup,width=1000,height=880';
// 새 창으로 옮기기: 첨부 파일 내용까지 그대로 넘김 (저장소에는 파일 내용을 못 넣어서 창끼리 직접 전달)
function popCompose(d) {
  window.__jinPop = d;
  try { store.set('pop-draft', Object.assign({}, d, { files: (d.files || []).filter(f => f.fwd) })); } catch (e) { /* 너무 크면 저장 생략 */ }
  const w = window.open(location.pathname + '#compose', '_blank', popFeatures);
  if (!w) { toast('새 창이 차단됐어요. 주소창 오른쪽의 팝업 차단 표시에서 허용해 주세요 (작성 내용은 그대로예요)'); return false; }
  return true;
}
function popView(id) {
  const m = MAILS.find(x => x.id === id);
  if (m && m.real) { try { store.set('pop-view', Object.assign({}, m, { htmlReady: m.htmlReady && m.htmlReady.length < 3e6 ? m.htmlReady : null })); } catch (e) { /* */ } window.open(location.pathname + '#view=real', '_blank', popFeatures); return; }
  window.open(location.pathname + '#view=' + id, '_blank', popFeatures);
}

/* ───────── 메일 보내기 (Gmail로 실제 발송) ───────── */
// 글자 → base64 (한글 포함)
const u8b64 = u8 => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); };
const strB64 = t => u8b64(new TextEncoder().encode(t));
const wrap76 = b => b.replace(/.{1,76}/g, '$&\r\n');
// 한글 등은 RFC 2047 encoded-word 로. 한 조각이 75자를 넘지 않게 나눠서(글자 중간에서 끊지 않음) 줄바꿈+공백으로 이어 붙임
const encHdr = t => {
  if (/^[\x20-\x7e]*$/.test(t)) return t;
  const enc = new TextEncoder(), out = []; let cur = '';
  for (const ch of t) { if (enc.encode(cur + ch).length > 45 && cur) { out.push(cur); cur = ''; } cur += ch; }
  if (cur) out.push(cur);
  return out.map(x => '=?UTF-8?B?' + strB64(x) + '?=').join('\r\n ');
};
const addrHdr = list => list.map(p => p.name && p.name !== p.email ? `${encHdr(p.name)} <${p.email}>` : p.email).join(', ');
const blobB64 = blob => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(',')[1] || ''); r.onerror = rej; r.readAsDataURL(blob); });
const fileHdrName = n => `filename="${encHdr(n)}"; filename*=UTF-8''${encodeURIComponent(n)}`;
const boundary = () => '----jin' + Math.random().toString(36).slice(2) + Date.now().toString(36);
// 작성 칸 내용 → 보낼 HTML (편집용 표시 지우고, 기본 글꼴로 감싸고, 붙여넣은 그림은 cid 그림으로)
// 보낼 HTML은 '보내기를 누른 순간'의 작성 내용(src)으로 만듦 — 5초 기다리는 사이 다른 메일을 열어도 섞이지 않게
function outgoingHtml(src) {
  const d = document.createElement('div'); d.innerHTML = src;
  $$('.gp-pm, #gpCaret', d).forEach(x => x.remove());
  $$('.hrsel, .tdsel', d).forEach(x => { x.classList.remove('hrsel', 'tdsel'); if (!x.className) x.removeAttribute('class'); });
  $$('[data-tsbg]', d).forEach(x => x.removeAttribute('data-tsbg'));
  $$('.gp-footer', d).forEach(x => { x.classList.remove('gp-footer'); x.removeAttribute('data-footer'); if (!x.className) x.removeAttribute('class'); });  // 받는 쪽에는 편집용 표시 없이
  $$('p', d).forEach(x => { if (!x.style.margin && !x.style.marginTop && !x.style.marginBottom) x.style.margin = '0'; });  // 작성 화면과 같은 줄 간격
  $$('[contenteditable], [spellcheck]', d).forEach(x => { x.removeAttribute('contenteditable'); x.removeAttribute('spellcheck'); });
  const inl = [];
  const seen = new Map();
  $$('img[src^="data:"]', d).forEach(img => {
    const src = img.getAttribute('src'), m = /^data:([^;,]+);base64,(.*)$/.exec(src); if (!m) return;
    let cid = seen.get(src);
    if (!cid) { cid = `img${inl.length}.${Date.now().toString(36)}@jin-mail`; seen.set(src, cid); inl.push({ cid, mime: m[1], b64: m[2], name: `image${inl.length + 1}.${(m[1].split('/')[1] || 'png').replace('jpeg', 'jpg').replace(/\+.*$/, '')}` }); }
    img.setAttribute('src', 'cid:' + cid);
  });
  // 인용(원본 메일) 칸 모양을 받는 쪽에서도 보이게
  $$('.quote', d).forEach(q => { q.setAttribute('style', q.classList.contains('qhtml') ? 'margin-top:20px;padding-top:10px;border-top:1px solid #e1e3e6' : 'margin-top:20px;padding-left:12px;border-left:2px solid #c4c9d2;color:#5f6368;white-space:pre-wrap'); q.removeAttribute('class'); });
  $$('.qb .qb', d).forEach(q => q.setAttribute('style', 'margin-top:16px;padding-left:12px;border-left:2px solid #d5d9e0'));
  // 글자로 쓴 주소(https://…, www.…)는 받는 쪽에서 눌러지게 링크로
  const tw = document.createTreeWalker(d, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('a, .quote, [contenteditable=false]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT }), tn = [];
  for (let n = tw.nextNode(); n; n = tw.nextNode()) if (/(https?:\/\/|www\.)/i.test(n.nodeValue)) tn.push(n);
  tn.forEach(n => { const frag = document.createDocumentFragment(); let last = 0; const re = /\b(?:https?:\/\/|www\.)[^\s<>"'\u3000]+[^\s<>"'\u3000.,;:!?)\]}]/gi; let mt;
    while ((mt = re.exec(n.nodeValue))) { frag.append(n.nodeValue.slice(last, mt.index)); const a = document.createElement('a'); a.href = /^www\./i.test(mt[0]) ? 'http://' + mt[0] : mt[0]; a.textContent = mt[0]; frag.append(a); last = mt.index + mt[0].length; }
    frag.append(n.nodeValue.slice(last)); n.replaceWith(frag); });
  const F = SET.font || { family: '맑은 고딕', size: 10 };
  const html = `<div style="font-family:'${F.family}',sans-serif;font-size:${F.size}pt">${d.innerHTML}</div>`;
  // 글자만 버전: 화면 밖에 잠깐 붙여서 줄바꿈대로 읽음
  const tmp = document.createElement('div'); tmp.style.cssText = 'position:fixed;left:-99999px;top:0;width:800px;white-space:normal'; tmp.innerHTML = src; $$('.gp-pm, #gpCaret', tmp).forEach(x => x.remove());
  document.body.append(tmp); const text = tmp.innerText; tmp.remove();
  return { html, text, inl };
}
async function buildMime(d) {
  const { html, text, inl } = outgoingHtml(d.html);
  const alt = boundary(), rel = boundary(), mix = boundary();
  const hdr = [`From: ${addrHdr([ME])}`, `To: ${addrHdr(d.to)}`];
  if (d.cc.length) hdr.push(`Cc: ${addrHdr(d.cc)}`);
  if (d.bcc && d.bcc.length) hdr.push(`Bcc: ${addrHdr(d.bcc)}`);  // Gmail이 보낼 때 이 줄은 지우고 각자에게만 전달
  hdr.push(`X-JIN-Id: ${d.jid || (d.jid = 'jin' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8))}`);
  hdr.push(`Subject: ${encHdr(d.subj)}`, 'MIME-Version: 1.0', `Date: ${new Date().toUTCString().replace('GMT', '+0000')}`);
  if (d.inReplyTo) { hdr.push(`In-Reply-To: ${d.inReplyTo}`, `References: ${[d.refs, d.inReplyTo].filter(Boolean).join(' ')}`); }
  const altPart = [`Content-Type: multipart/alternative; boundary="${alt}"`, '', `--${alt}`, 'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', wrap76(strB64(text)), `--${alt}`, 'Content-Type: text/html; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', wrap76(strB64(html)), `--${alt}--`, ''].join('\r\n');
  let bodyPart = altPart;
  if (inl.length) bodyPart = [`Content-Type: multipart/related; boundary="${rel}"`, '', `--${rel}`, altPart, ...inl.flatMap(x => [`--${rel}`, `Content-Type: ${x.mime}; name="${x.name}"`, 'Content-Transfer-Encoding: base64', `Content-ID: <${x.cid}>`, `Content-Disposition: inline; filename="${x.name}"`, '', wrap76(x.b64)]), `--${rel}--`, ''].join('\r\n');
  if (!d.files.length) return hdr.join('\r\n') + '\r\n' + bodyPart;
  const parts = [];
  for (const f of d.files) {
    let blob = f.file || null;
    if (!blob && f.fwd && f.fwd.id) { const r = await gapi(`messages/${f.fwd.gid}/attachments/${f.fwd.id}`); blob = new Blob([b64bytes(r.data)], { type: f.fwd.mime || 'application/octet-stream' }); }
    if (!blob) throw new Error(`'${f.name}' 파일 내용을 찾을 수 없어요. 다시 첨부해 주세요`);
    parts.push([`--${mix}`, `Content-Type: ${blob.type || 'application/octet-stream'}; name="${encHdr(f.name)}"`, 'Content-Transfer-Encoding: base64', `Content-Disposition: attachment; ${fileHdrName(f.name)}`, '', wrap76(await blobB64(blob))].join('\r\n'));
  }
  return hdr.join('\r\n') + '\r\n' + [`Content-Type: multipart/mixed; boundary="${mix}"`, '', `--${mix}`, bodyPart, ...parts, `--${mix}--`, ''].join('\r\n');
}
// 큰 첨부도 되게 업로드 방식으로 보냄 (최대 약 35MB)
async function uploadMime(kind, mime, meta) {
  quota.hold = (quota.hold || 0) + 1;  // 보내는 동안 뒤에서 받는 일 멈춤
  try {
    const waits = [0, 6, 15, 30];
    for (let t = 0; ; t++) {
      if (waits[t]) { toast(`Gmail 사용량이 잠깐 몰렸어요. ${waits[t]}초 뒤에 다시 보낼게요 (작성 내용은 그대로예요)`); await new Promise(z => setTimeout(z, waits[t] * 1000)); }
      // 연결이 끊겨 실패로 보였어도 실제로는 보내졌을 수 있음 → 다시 보내기 전에 보낸편지함 확인 (두 번 가지 않게)
      if (t > 0 && kind === 'messages/send') { const done = await alreadySent(mime); if (done) return done; }
      // Gmail 업로드 주소는 브라우저에서 응답을 못 읽음(보내지긴 하는데 실패로 보임) → 일반 주소로 보냄 (약 35MB까지 됨)
      try { return await uploadOnce(kind, mime, meta, true); }
      catch (e) { if (!e.retry || t >= waits.length - 1) { if (e.retry && kind === 'messages/send') { const done = await alreadySent(mime); if (done) return done; } throw e; } }
    }
  } finally { quota.hold--; }
}
async function alreadySent(mime) {
  const jid = (/^X-JIN-Id: (\S+)/m.exec(mime) || [])[1]; if (!jid) return null;
  try {
    const l = await gapi('messages?maxResults=10&q=' + encodeURIComponent('in:sent newer_than:1d'));
    for (const x of l.messages || []) { const g = await gapi(`messages/${x.id}?format=metadata&metadataHeaders=X-JIN-Id`); if ((g.payload.headers || []).some(h => h.value === jid)) return { id: x.id, threadId: g.threadId }; }
  } catch (e) { /* 확인 못 하면 그냥 다시 시도 */ }
  return null;
}
async function uploadOnce(kind, mime, meta, viaJson) {
  await takeQuota(100, false);
  let r;
  try {
    if (viaJson) {  // 업로드 주소가 막힐 때: 일반 주소로 (오류 이유도 알 수 있음)
      const raw = u8b64(new TextEncoder().encode(mime)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      const body = kind === 'drafts' ? { message: Object.assign({ raw }, (meta && meta.message) || {}) } : Object.assign({ raw }, meta || {});
      r = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/${kind}`, { method: 'POST', headers: { Authorization: 'Bearer ' + curTok(), 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    } else {
      const b = boundary();
      const body = `--${b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(meta || {})}\r\n--${b}\r\nContent-Type: message/rfc822\r\n\r\n${mime}\r\n--${b}--`;
      r = await fetch(`https://gmail.googleapis.com/upload/gmail/v1/users/me/${kind}?uploadType=multipart`, { method: 'POST', headers: { Authorization: 'Bearer ' + curTok(), 'Content-Type': `multipart/related; boundary=${b}` }, body });
    }
  } catch (e) { throw Object.assign(new Error('Gmail에 연결하지 못했어요 (사용량 초과 또는 네트워크)'), { retry: true }); }
  if (r.status === 401) { await tokenAfter401(); throw Object.assign(new Error('로그인을 연장했어요'), { retry: true }); }
  if (!r.ok) {
    let msg = 'Gmail ' + r.status; try { msg += ': ' + (await r.json()).error.message; } catch (e) { /* */ }
    const busy = r.status === 429 || r.status >= 500 || (r.status === 403 && /quota|rate/i.test(msg));
    if (busy) quota.cool = Date.now() + 30000;
    throw Object.assign(new Error(busy ? 'Gmail 사용량이 잠깐 넘쳤어요. 1분쯤 뒤에 다시 보내 주세요' : msg), { retry: busy });
  }
  return r.json();
}
const sendTotal = d => d.files.reduce((a, f) => a + (f.size || 0), 0);
function composeDraftForSend() {
  const d = draftNow(); d.files = cs.files.slice();
  const m = MAILS.find(x => x.id === cs.mailId);
  if (m && m.real && (cs.kind === 'reply' || cs.kind === 'all' || cs.kind === 'draft')) { d.threadId = m.threadId; d.inReplyTo = m.msgId; d.refs = m.refs; }
  else if (cs.thread) Object.assign(d, cs.thread);
  return d;
}
// 작성 중인 본문에서 내가 쓴 글자만 (풋터·원본 인용 제외)
// 풋터 안 빈 줄에 쓰는 경우도 있어서 풋터를 통째로 빼지 않고, 처음 넣은 풋터 글자와 같은 부분만 뺌
function myBodyText() {
  const norm = t => t.replace(/[\s\u00a0\u3000]+/g, '').trim();
  const d = document.createElement('div'); d.innerHTML = $('#cbody').innerHTML; $$('.quote, .gp-pm, #gpCaret', d).forEach(x => x.remove());
  const fEl = $('.gp-footer', d), f = fEl && FOOTERS.find(x => x.id === fEl.dataset.footer);
  let all = d.textContent.replace(/[\s\u00a0\u3000]+/g, ' ').trim(), rich = !!d.querySelector('img, table');
  if (fEl && f) { const t = document.createElement('div'); t.innerHTML = fillName(trimLead(f.html)); const pristine = norm(t.textContent);
    if (norm(fEl.textContent) === pristine) { all = all.replace(fEl.textContent.replace(/[\s\u00a0\u3000]+/g, ' ').trim(), '').trim(); if (t.querySelector('img, table')) rich = !!$$('img, table', d).filter(x => !fEl.contains(x)).length; } }
  return { text: all, rich };
}
async function sendMail() {
  if (!commitRcpts()) return;  // 칸에 글자로 남은 주소는 칩으로, 주소 꼴이 아니면 멈춤
  const d = composeDraftForSend();
  if (!d.to.length && !d.cc.length && !(d.bcc || []).length) { toast('받는사람을 넣어 주세요'); $('#toBox input').focus(); return; }
  if (!d.subj.trim() && !confirm('제목 없이 보낼까요?')) return;
  const mine = myBodyText();
  if (!mine.text && !mine.rich && !$('#cbody .quote') && !d.files.length && !confirm('본문이 비어 있어요 (서명만 있음). 그대로 보낼까요?')) return;
  // '첨부'라고 썼는데 파일이 없을 때 (원래 메일에 첨부가 있던 답장이면 그 얘기일 수 있으니 묻지 않음)
  const om = MAILS.find(x => x.id === cs.mailId), omAtt = om && (om.att || []).some(a => !(a[3] && a[3].inline));
  if (!d.files.length && !omAtt && /첨부|attach/i.test(mine.text) && !confirm('본문에 \'첨부\'라고 썼는데 첨부 파일이 없어요. 그대로 보낼까요?')) return;
  if (sendTotal(d) > 25 * 1048576) { toast(`첨부가 너무 커요 (지금 ${fmtSize(sendTotal(d))}, Gmail 한도 25MB). 큰 파일은 드라이브 링크로 보내 주세요`); return; }
  if (!real.on) {  // 예시 메일 화면
    clearTimeout(cs.timer); cs.saving = false;
    toast('예시 화면이라 실제로 보내지는 않아요');
    const m = MAILS.find(x => x.id === cs.mailId); if (m) m.draft = null; ndRemove(cs.nd); cs.nd = null;
    $('#read').classList.remove('composing'); renderList(); renderNav(); renderRead(true); return;
  }
  clearTimeout(cs.timer); cs.saving = false;
  const snap = draftNow(); snap.files = cs.files.slice();
  // 새 창에서 쓴 메일: 원래 JIN-mail 창에 넘겨서 거기서 보내고(5초 취소도 거기서), 이 창은 바로 닫음
  if (document.body.classList.contains('popmode') && !st.open && await handOffSend(d, snap)) { window.close(); return; }
  return runSend(d, snap);
}
function showSending() { $('#view').innerHTML = '<div class="blank">메일을 보내는 중이에요… 보내고 나면 이 창은 저절로 닫혀요</div>'; $('#view').dataset.key = ''; }
async function packFiles(list) { return Promise.all((list || []).map(async f => f.file && f.file.arrayBuffer ? { name: f.name, size: f.size, type: f.file.type, buf: await f.file.arrayBuffer() } : Object.assign({}, f, { file: undefined }))); }
const unpackFiles = list => (list || []).map(f => f.buf ? { name: f.name, size: f.size, file: new File([f.buf], f.name, { type: f.type || 'application/octet-stream' }) } : f);
function handOffSend(d, snap) {
  let op = null; try { op = window.opener && !window.opener.closed && window.opener.location.origin === location.origin ? window.opener : null; } catch (e) { op = null; }
  if (!op) return Promise.resolve(false);
  return new Promise(async res => {
    const t = setTimeout(() => { window.removeEventListener('message', ok); res(false); }, 2000);
    const ok = e => { if (e.origin === location.origin && e.data && e.data.type === 'jin-send-ok') { clearTimeout(t); window.removeEventListener('message', ok); res(true); } };
    window.addEventListener('message', ok);
    try { op.postMessage({ type: 'jin-send', d: Object.assign({}, d, { files: await packFiles(d.files) }), snap: Object.assign({}, snap, { files: await packFiles(snap.files) }) }, location.origin); }
    catch (e) { clearTimeout(t); res(false); }
  });
}
window.addEventListener('message', e => {
  if (e.origin !== location.origin || !e.data || e.data.type !== 'jin-send' || !real.on) return;
  const d = e.data.d, snap = e.data.snap; d.files = unpackFiles(d.files); snap.files = unpackFiles(snap.files);
  try { e.source.postMessage({ type: 'jin-send-ok' }, location.origin); } catch (er) { /* */ }
  runSend(d, snap);
});
async function runSend(d, snap) {
  const files = snap.files || [];
  // 보내기를 누르면 '작성 중이던 답장' 표시는 바로 없앰 → 취소하거나 보내지 못했을 때만 되살림
  const origId = d.mailId, orig0 = MAILS.find(x => x.id === origId), keepDraft = orig0 && orig0.draft;
  const setDraft = v => { const o = MAILS.find(x => x.id === origId); if (o) { o.draft = v; if (!v) o.draftD = null; } };
  const keepD = orig0 && orig0.draftD;
  setDraft(null);
  if (cs.mailId === origId && $('#read').classList.contains('composing') && cs.nd === snap.nd) $('#read').classList.remove('composing');
  if (document.body.classList.contains('popmode') && !st.open) showSending();
  renderRead(true); renderList(); renderNav();
  let cancelled = false;
  // 5초 동안 '보내기 취소' 가능 → 그 뒤 실제 발송
  toast('보내는 중… (5초 안에 취소할 수 있어요)', () => { cancelled = true; flushCompose(); if ($('#read').classList.contains('composing') && cs.nd !== snap.nd && cs.mailId == null && !cs.nd && myBodyText().text) ndSave(); setDraft(keepDraft); if (orig0) orig0.draftD = keepD; cs.files = files; loadDraft(snap); cs.files = files; renderFiles(); renderList(); renderNav(); toast('보내기를 취소했어요'); });
  await new Promise(z => setTimeout(z, 5000));
  if (cancelled) return;
  try {
    const r = await uploadMime('messages/send', await buildMime(d), d.threadId ? { threadId: d.threadId } : {});
    setDraft(null); rdRemove(MAILS.find(x => x.id === origId));
    store.set('draft-last', null); ndRemove(d.nd); renderNav(); renderList();
    const all = d.to.concat(d.cc, d.bcc || []);
    toast(`보냈어요 — ${all.map(p => p.name || p.email).slice(0, 3).join(', ')}${all.length > 3 ? ' 외' : ''}`);
    // 보낸편지함에 바로 보이게
    try { const g = await gapi(`messages/${r.id}?format=full`); const x = parseMsg(g, true); const mm = toMail(x, real.lab || { inbox: new Set(), sent: new Set([r.id]), unread: new Set(), box: new Map() }); mm.sent = 1; mm.from = ME; MAILS.unshift(mm); saveFull(mm); renderNav(); renderList(); } catch (e) { /* 목록은 다음 새로 고침 때 */ }
    if (document.body.classList.contains('popmode') && !st.open) setTimeout(() => window.close(), 600);
  } catch (e) {
    toast('보내지 못했어요: ' + e.message + ' — 작성 내용을 다시 열어 둘게요');
    setDraft(keepDraft || '(보내지 못한 답장)'); renderList(); renderNav();
    cs.files = files; loadDraft(snap); cs.files = files; renderFiles();
  }
}

/* ───────── 받는사람: 자동완성 · 블록 선택해서 복사/붙여넣기 ───────── */
const parseAddrs = t => { const out = []; const re = /(?:"?([^"<>;,\n]*?)"?\s*<)?([^\s<>;,]+@[^\s<>;,]+\.[^\s<>;,]+)>?/g; let m; while ((m = re.exec(t))) { const email = m[2]; const known = rcptPeople().find(p => p.email.toLowerCase() === email.toLowerCase()); out.push(known || { name: (m[1] || '').trim() || email, email }); } return out; };
const chipText = chips => chips.map(c => c.dataset.name && c.dataset.name !== c.dataset.email ? `${c.dataset.name} <${c.dataset.email}>` : c.dataset.email).join('; ');
function setupRcpt(box) {
  const inp = $('input', box), ac = box.nextElementSibling;
  let items = [], idx = 0;
  const close = () => { ac.classList.remove('on'); items = []; };
  const add = p => { inp.value = ''; close(); if (rcptTaken(p.email, box)) { inp.focus(); return; } box.insertBefore(chipEl(p), inp); dirty(); inp.focus(); };
  // 칸에 남은 글자를 칩으로: 주소 꼴이면 넣고, 아니면 알려 줌 (quiet: 그냥 둠)
  const commit = quiet => { const v = inp.value.trim().replace(/[,;]$/, ''); if (!v) return true; if (RCPT_RE.test(v)) { add({ name: v, email: v }); return true; } const ps = parseAddrs(v); if (ps.length) { inp.value = ''; ps.forEach(add); return true; } if (!quiet) toast(`'${v}'은(는) 메일 주소 꼴이 아니에요 (예: name@company.com)`); return false; };
  box._commit = commit;
  const draw = () => {
    const q = inp.value.trim().toLowerCase();
    if (!q) { close(); return; }
    const taken = new Set(chipsOf(box).map(p => p.email));
    items = rcptPeople().filter(p => !isMe(p) && !taken.has(p.email) && personMatch(p, q)).slice(0, 7);
    if (!items.length) { close(); return; }
    idx = Math.min(idx, items.length - 1);
    ac.innerHTML = items.map((p, i) => `<div class="it${i === idx ? ' on' : ''}" data-i="${i}"><i style="background:${dotColor(p.email)}"></i>${esc(p.name)} <small>${esc(p.email)}</small></div>`).join('');
    ac.classList.add('on');
  };
  inp.addEventListener('input', () => { idx = 0; draw(); $$('.rc.sel', box).forEach(c => c.classList.remove('sel')); });
  inp.addEventListener('keydown', e => {
    if (ac.classList.contains('on') && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) { e.preventDefault(); idx = (idx + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; draw(); return; }
    if (e.key === 'Enter' || e.key === ',' || e.key === ';' || e.key === 'Tab' || (e.key === ' ' && RCPT_RE.test(inp.value.trim()))) {
      if (items.length && ac.classList.contains('on')) { e.preventDefault(); add(items[idx]); return; }
      if (e.key === 'Tab') { commit(true); return; }  // Tab은 다음 칸으로 넘어가면서 넣을 수 있는 것만
      if (inp.value.trim()) { e.preventDefault(); commit(false); return; }
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
    if (e.shiftKey && (e.key === 'ArrowLeft' || e.key === 'Home') && !inp.value) {
      e.preventDefault(); const all = $$('.rc', box); if (!all.length) return;
      if (e.key === 'Home') { all.forEach(c => c.classList.add('sel')); return; }
      const first = all.findIndex(c => c.classList.contains('sel')); const i = first < 0 ? all.length - 1 : Math.max(0, first - 1); all[i].classList.add('sel');
    }
    if (e.shiftKey && e.key === 'ArrowRight' && !inp.value) { e.preventDefault(); const first = $$('.rc', box).find(c => c.classList.contains('sel')); if (first) first.classList.remove('sel'); }
    if (!e.shiftKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !inp.value) $$('.rc.sel', box).forEach(c => c.classList.remove('sel'));
    if (e.key === 'Escape' && ac.classList.contains('on')) { e.stopPropagation(); close(); }
  });
  // 붙여넣기: '이름 <주소>; 주소2' 형태를 칩으로
  inp.addEventListener('paste', e => {
    const t = (e.clipboardData || window.clipboardData).getData('text');
    const ps = parseAddrs(t); if (!ps.length) return;
    e.preventDefault();
    $$('.rc.sel', box).forEach(c => c.remove());  // 고른 칩이 있으면 글자처럼 바꿔 끼움
    const taken = new Set(chipsOf(box).map(p => p.email));
    ps.forEach(p => { if (!taken.has(p.email) && !rcptTaken(p.email, box)) { box.insertBefore(chipEl(p), inp); taken.add(p.email); } }); dirty();
  });
  ac.addEventListener('mousedown', e => { const it = e.target.closest('.it'); if (it) { e.preventDefault(); add(items[+it.dataset.i]); } });
  inp.addEventListener('blur', () => setTimeout(() => { close(); if (inp.value.trim() && RCPT_RE.test(inp.value.trim())) { const v = inp.value.trim(); inp.value = ''; if (!rcptTaken(v, box)) { box.insertBefore(chipEl({ name: v, email: v }), inp); dirty(); } } }, 120));
  // 칩 클릭 = 선택 (Ctrl/Shift로 여러 개), 칩 위를 끌면 블록 선택
  let dragSel = null;
  box.addEventListener('mousedown', e => {
    const c = e.target.closest('.rc');
    if (c && !e.target.closest('button')) {
      if (!(e.ctrlKey || e.shiftKey || e.metaKey)) $$('.rc.sel', box).forEach(x => x !== c && x.classList.remove('sel'));
      c.classList.add('sel'); dragSel = c; e.preventDefault(); inp.focus(); return;
    }
    if (e.target === box || (e.target === inp && !inp.value)) {
      $$('.rc.sel', box).forEach(x => x.classList.remove('sel'));
      if (e.target === box) { e.preventDefault(); inp.focus(); }
      band = { x: e.clientX, y: e.clientY };
    }
  });
  // 글 읽는 순서로 '점 p가 칩보다 앞인가'
  const before = (p, r) => p.y < r.top || (p.y <= r.bottom && p.x < (r.left + r.right) / 2);
  let band = null;
  document.addEventListener('mousemove', e => {
    if (!(e.buttons & 1)) { dragSel = band = null; return; }
    if (band) {
      const q = { x: e.clientX, y: e.clientY }; if (Math.abs(q.x - band.x) + Math.abs(q.y - band.y) < 4) return;
      $$('.rc', box).forEach(c => { const r = c.getBoundingClientRect(); c.classList.toggle('sel', before(band, r) !== before(q, r)); });
      getSelection().removeAllRanges(); return;
    }
    if (!dragSel || !box.contains(e.target)) return; const c = e.target.closest('.rc'); if (!c) return;
    const all = $$('.rc', box), a = all.indexOf(dragSel), b = all.indexOf(c);
    all.forEach((x, i) => x.classList.toggle('sel', i >= Math.min(a, b) && i <= Math.max(a, b)));
  });
  document.addEventListener('mouseup', () => { if (band && $$('.rc.sel', box).length) inp.focus(); dragSel = null; band = null; });
  box.addEventListener('click', e => { if (e.target === box) inp.focus(); });
  box.addEventListener('focusin', () => foldChips(box, false));
  box.addEventListener('focusout', () => setTimeout(() => { if (!box.contains(document.activeElement)) { $$('.rc.sel', box).forEach(c => c.classList.remove('sel')); foldChips(box, true); } }, 150));
  // 오른쪽 클릭: 복사 · 잘라내기 · 붙여넣기 · 삭제
  box.addEventListener('contextmenu', e => {
    const c = e.target.closest('.rc'); if (!c && !$$('.rc.sel', box).length) return;
    e.preventDefault(); if (c && !c.classList.contains('sel')) { $$('.rc.sel', box).forEach(x => x.classList.remove('sel')); c.classList.add('sel'); }
    const sel = () => $$('.rc.sel', box);
    menuAt(box, [
      { label: `복사 (${sel().length}명)  Ctrl+C`, act: () => copyChips(sel()) },
      { label: '잘라내기  Ctrl+X', act: () => { const x = sel(); copyChips(x); x.forEach(y => y.remove()); dirty(); } },
      { label: '붙여넣기  Ctrl+V', act: async () => { try { const t = await navigator.clipboard.readText(); const ps = parseAddrs(t); if (!ps.length) { toast('붙여넣을 메일 주소가 없어요'); return; } sel().forEach(y => y.remove()); const taken = new Set(chipsOf(box).map(p => p.email)); ps.forEach(p => { if (!taken.has(p.email)) { box.insertBefore(chipEl(p), inp); taken.add(p.email); } }); dirty(); } catch (er) { toast('받는사람 칸을 누르고 Ctrl+V로 붙여넣어 주세요'); } } },
      '-',
      { label: '빼기  Delete', act: () => { sel().forEach(y => y.remove()); dirty(); } }
    ], false, { x: e.clientX, y: e.clientY });
  });
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
  if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.isComposing) keepIndentOnEnter(e);
}
// 커서가 있는 한 줄(앞뒤 <br> 사이)을 <div>로 묶어 돌려줌
function wrapLine(container, s) {
  let top = s.anchorNode; while (top && top.parentNode !== container) top = top.parentNode;
  if (!top) { const d = document.createElement('div'); d.innerHTML = '<br>'; container.append(d); return d; }
  const isStop = n => n.nodeName === 'BR' || (n.nodeType === 1 && /^(DIV|P|TABLE|UL|OL|HR|BLOCKQUOTE)$/.test(n.tagName));
  if (top.nodeType === 1 && /^(DIV|P)$/.test(top.tagName)) return top;
  let a = top; while (a.previousSibling && !isStop(a.previousSibling)) a = a.previousSibling;
  let z = top.nodeName === 'BR' ? null : top; if (z) while (z.nextSibling && !isStop(z.nextSibling)) z = z.nextSibling;
  const d = document.createElement('div'); a.before(d);
  if (top.nodeName === 'BR' && a === top) { d.innerHTML = '<br>'; top.remove(); }
  else { const nodes = []; for (let n = a; n; n = n.nextSibling) { nodes.push(n); if (n === z) break; } d.append(...nodes); const br = d.nextSibling; if (br && br.nodeName === 'BR') br.remove(); }
  const r = document.createRange(); r.setStart(s.anchorNode, Math.min(s.anchorOffset, s.anchorNode.nodeType === 3 ? s.anchorNode.length : s.anchorNode.childNodes.length)); r.collapse(true);
  try { s.removeAllRanges(); s.addRange(r); } catch (e) { /* */ }
  return d;
}
// 들여쓰기한 줄에서 Enter → 다음 줄도 같은 들여쓰기. 들여쓰기만 있는 빈 줄에서 한 번 더 Enter → 들여쓰기 없앰
// (들여쓰기 버튼으로 준 왼쪽 여백, 스페이스 두 번으로 넣은 앞 공백 둘 다)
function keepIndentOnEnter(e) {
  const b = $('#cbody'), s = getSelection(); if (!s.rangeCount || !s.isCollapsed || !b.contains(s.anchorNode)) return;
  let n = s.anchorNode; n = n.nodeType === 1 ? n : n.parentElement;
  if (n.closest('li, td, th, .quote')) return;  // 목록·표·인용은 브라우저 기본대로
  let blk = n; while (blk && blk !== b && !/^(DIV|P)$/.test(blk.tagName)) blk = blk.parentElement;
  const blkOk = blk && blk !== b && !blk.classList.contains('gp-footer');
  // 1) 왼쪽 여백 들여쓰기
  const ml = blkOk ? parseFloat(blk.style.marginLeft) || 0 : 0;
  if (ml > 0) {
    if (!blk.textContent.replace(/[\s\u00a0\u3000]/g, '') && !blk.querySelector('img,table')) { e.preventDefault(); blk.style.marginLeft = ''; dirty(); return; }
    // 줄 나누기를 직접 해서 바로 들여쓰기 (빨리 Enter를 두 번 쳐도 순서가 꼬이지 않게)
    e.preventDefault(); document.execCommand('insertParagraph');
    const s2 = getSelection(); let m = s2.anchorNode; m = m && (m.nodeType === 1 ? m : m.parentElement); while (m && m !== b && !/^(DIV|P)$/.test(m.tagName)) m = m.parentElement;
    if (m && m !== b && m !== blk && !parseFloat(m.style.marginLeft)) m.style.marginLeft = ml + 'px';
    dirty(); return;
  }
  // 2) 줄 앞 공백 들여쓰기: 지금 줄(앞쪽 <br> 이후)의 맨 앞 공백
  const root = blkOk ? blk : b, r = document.createRange(); r.setStart(root, 0); r.setEnd(s.anchorNode, s.anchorOffset);
  const frag = r.cloneContents(), tmp = document.createElement('div'); tmp.append(frag);
  $$('br', tmp).forEach(x => x.replaceWith('\n')); $$('div,p', tmp).forEach(x => x.prepend('\n'));
  const line = tmp.textContent.split('\n').pop(); const lead = (line.match(/^[ \u00a0\u3000]+/) || [''])[0];
  if (!lead) return;
  if (line === lead) {  // 공백만 있는 줄 → 들여쓰기 지우고 줄은 그대로
    e.preventDefault(); for (let i = 0; i < lead.length; i++) document.execCommand('delete'); dirty(); return;
  }
  e.preventDefault(); document.execCommand('insertParagraph'); document.execCommand('insertText', false, lead.replace(/ /g, '\u00a0')); dirty();
}
let savedRange = null;
// 가로선도 글자처럼: 드래그로 고른 범위 안에 들어오면 파랗게 표시, 누르면 그 가로선을 선택(Delete로 지우기)
function markHr() {
  const b = $('#cbody'); if (!b) return; const s = getSelection(); const r = s.rangeCount && !s.isCollapsed && b.contains(s.anchorNode) ? s.getRangeAt(0) : null;
  $$('hr', b).forEach(h => h.classList.toggle('hrsel', !!r && r.intersectsNode(h)));
}
document.addEventListener('selectionchange', markHr);
document.addEventListener('mousedown', e => {
  const h = e.target.tagName === 'HR' && e.target.closest('#cbody') ? e.target : null; if (!h) return;
  e.preventDefault(); $('#cbody').focus(); const r = document.createRange(); r.selectNode(h); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
});
document.addEventListener('selectionchange', () => { const s = getSelection(); if (s.rangeCount && $('#cbody') && $('#cbody').contains(s.anchorNode)) { savedRange = s.getRangeAt(0).cloneRange(); syncFmt(); tableBar(); } });
function restoreSel() { const b = $('#cbody'); b.focus(); if (savedRange && b.contains(savedRange.startContainer)) { const s = getSelection(); s.removeAllRanges(); s.addRange(savedRange); } }
function setSizePt(pt) {
  const run = () => { document.execCommand('styleWithCSS', false, false); document.execCommand('fontSize', false, '7'); };
  if (!cellsDo(run)) { restoreSel(); run(); }
  $$('font[size="7"]', $('#cbody')).forEach(f => { const sp = document.createElement('span'); sp.style.fontSize = pt + 'pt'; while (f.firstChild) sp.append(f.firstChild); f.replaceWith(sp); });
  dirty();
}
// 여러 칸을 골랐으면 칸마다 내용 전체를 골라 fn 실행 → 끝나면 다시 그 칸들 선택 상태로
function cellsDo(fn) {
  const cells = TS.multi ? TS.cells.filter(c => c.isConnected) : []; if (!cells.length) return false;
  const b = $('#cbody'); b.focus(); const s = getSelection();
  cells.forEach((c, i) => { const r = document.createRange(); r.selectNodeContents(c); s.removeAllRanges(); s.addRange(r); fn(c, i); });
  const r = document.createRange(); r.selectNodeContents(cells[0]); r.collapse(true); s.removeAllRanges(); s.addRange(r); savedRange = r.cloneRange();
  tdSel(cells, true); dirty(); tableBar(); return true;
}
const TOGGLES = /^(bold|italic|underline|strikeThrough)$/;
function cellsToggle(cmd) {
  let want = null;
  return cellsDo((c, i) => { document.execCommand('styleWithCSS', false, true); if (i === 0) want = !document.queryCommandState(cmd); if (document.queryCommandState(cmd) !== want) document.execCommand(cmd, false, null); });
}
function fmtCmd(cmd) {
  if (TS.multi) {
    if (TOGGLES.test(cmd) && cellsToggle(cmd)) { syncFmt(); return; }
    if (/^justify(Left|Center|Right)$/.test(cmd)) { TS.cells.forEach(c => { c.style.textAlign = { justifyLeft: 'left', justifyCenter: 'center', justifyRight: 'right' }[cmd]; }); dirty(); return; }
    if (cmd === 'removeFormat' && cellsDo(() => document.execCommand('removeFormat'))) return;
  }
  restoreSel(); const b = $('#cbody');
  if (cmd === 'image') { $('#imgPick').click(); return; }
  if (cmd === 'hr') document.execCommand('insertHTML', false, '<hr style="border:0;border-top:1px solid #bfbfbf;margin:8px 0"><br>');
  else if (cmd === 'link') { linkMenu(); return; }
  else if (cmd === 'indent' || cmd === 'outdent') {
    const s = getSelection(); let el = s.anchorNode; el = el && (el.nodeType === 1 ? el : el.parentElement);
    while (el && el !== b && !/^(DIV|P|LI)$/.test(el.tagName)) el = el.parentElement;
    // 줄이 따로 묶여 있지 않으면(본문 바로 아래나 풋터 안에 <br>로만 나뉜 줄) 그 한 줄만 묶어서 들여씀
    if (!el || el === b || el.classList.contains('gp-footer') || el.classList.contains('quote')) el = wrapLine(el && el !== b ? el : b, s);
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
  b.focus();
  document.execCommand('insertHTML', false, `<img src="${src}" style="max-width:100%" data-newimg="1">`);
  const img = $('img[data-newimg]', b); if (!img) return; img.removeAttribute('data-newimg');
  const fit = () => { const max = b.clientWidth - 60; if (img.naturalWidth > max) img.style.width = max + 'px'; posImgSel(); };
  img.complete ? fit() : (img.onload = fit);
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
/* ───────── 서식 복사·붙여넣기 ───────── */
let fmtClip = null;
function caretEl() { const s = getSelection(); if (!s.rangeCount) return null; let n = s.getRangeAt(0).startContainer; if (n.nodeType === 3) { if (s.getRangeAt(0).startOffset === n.length && n.nextSibling == null && !s.isCollapsed) { /* 끝 */ } n = n.parentElement; } return n && $('#cbody').contains(n) ? n : null; }
function copyFormat() {
  const el = caretEl(); if (!el) return;
  const cs = getComputedStyle(el), b = $('#cbody');
  let deco = [], bg = '';
  for (let x = el; x && x !== b; x = x.parentElement) {
    const c = getComputedStyle(x);
    (c.textDecorationLine || '').split(' ').forEach(d => { if (d && d !== 'none' && !deco.includes(d)) deco.push(d); });
    if (!bg && c.backgroundColor && !/rgba\(0, 0, 0, 0\)|transparent/.test(c.backgroundColor)) bg = c.backgroundColor;
  }
  fmtClip = { fontFamily: cs.fontFamily, fontSize: (Math.round(parseFloat(cs.fontSize) * 0.75 * 2) / 2) + 'pt', fontWeight: cs.fontWeight, fontStyle: cs.fontStyle, color: cs.color, textDecoration: deco.join(' ') || 'none', backgroundColor: bg || 'transparent' };
  const pt = Math.round(parseFloat(cs.fontSize) * 0.75);
  toast(`서식을 복사했어요 (${cs.fontFamily.split(',')[0].replace(/['"]/g, '')} ${pt}pt${+cs.fontWeight >= 600 ? ' · 굵게' : ''}${cs.fontStyle === 'italic' ? ' · 기울임' : ''}) — 바꿀 글자를 고르고 Ctrl+Shift+V`);
}
const FMT_TAGS = /^(B|STRONG|I|EM|U|S|STRIKE|FONT|SPAN|MARK|SMALL|BIG)$/;
function pasteFormat() {
  const s = getSelection(); if (!s.rangeCount || !$('#cbody').contains(s.anchorNode)) return;
  if (s.isCollapsed) { s.modify('move', 'backward', 'word'); s.modify('extend', 'forward', 'word'); }  // 선택이 없으면 커서가 있는 낱말에
  if (s.isCollapsed) return;
  const r = s.getRangeAt(0);
  const frag = r.extractContents();
  // 원래 글자 모양은 지우고(굵게·색 등) 복사한 모양만 입힘 — 링크·줄바꿈·그림은 그대로
  const strip = node => { [...node.childNodes].forEach(c => { if (c.nodeType !== 1) return; strip(c); if (FMT_TAGS.test(c.tagName)) c.replaceWith(...c.childNodes); else { ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'color', 'textDecoration', 'backgroundColor'].forEach(k => { c.style[k] = ''; }); } }); };
  strip(frag);
  const sp = document.createElement('span');
  Object.assign(sp.style, fmtClip);
  sp.append(frag); r.insertNode(sp);
  const nr = document.createRange(); nr.selectNodeContents(sp); s.removeAllRanges(); s.addRange(nr);
  dirty(); runTypo();
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
// 엑셀·워드·아웃룩에서 복사한 HTML은 모양이 <style>(xl65 같은 이름)에 들어 있어서 그냥 붙이면 테두리·색이 사라짐
// → 보이지 않는 칸에서 실제로 그려 본 뒤, 칸마다 계산된 모양(테두리·배경·글꼴·정렬·너비)을 직접 써넣음
const INLINE_CELL = ['border-top', 'border-right', 'border-bottom', 'border-left', 'background-color', 'color', 'font-family', 'font-size', 'font-weight', 'font-style', 'text-decoration-line', 'text-align', 'vertical-align', 'white-space', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'width', 'height'];
const INLINE_TEXT = ['color', 'background-color', 'font-family', 'font-size', 'font-weight', 'font-style', 'text-decoration-line'];
// opts.quote: 답장·전달에 붙이는 원본 메일 (메일 화면 너비로 그려 보고, 붙여넣기용 손질은 하지 않음)
function renderPasted(html, opts) {
  opts = opts || {};
  return new Promise(res => {
    const f = document.createElement('iframe'); f.setAttribute('sandbox', 'allow-same-origin'); f.style.cssText = `position:fixed;left:-10000px;top:0;width:${opts.quote ? 860 : 1600}px;height:400px;border:0;visibility:hidden`;
    // 글꼴을 따로 정하지 않은 내용은 작성 칸 기본 글꼴로 (엑셀·워드 자체 서식이 있으면 그게 우선)
    const F = SET.font || { family: '맑은 고딕', size: 10 };
    f.srcdoc = `<style>body{font-family:'${F.family}',sans-serif;font-size:${F.size}pt}</style>` + html.replace(/<script[\s\S]*?<\/script>/gi, '');
    f.onload = () => {
      try {
        const d = f.contentDocument, w = f.contentWindow;
        // 크기·줄 수는 모양을 써넣기 전에 한꺼번에 재 둠 (하나씩 쓰면 표가 다시 계산돼 칸이 좁아짐)
        const rect = new Map(), oneLine = new Set();
        $$('*', d.body).forEach(el => rect.set(el, el.getBoundingClientRect()));
        // 너비는 원래 정해져 있던 것만 살림: '100%' 같은 표를 그려 본 화면 너비(px)로 굳히면 받는 쪽에서 아주 넓은 메일이 됨
        //  - 표: 원래 적힌 너비 그대로 (없으면 안 씀)
        //  - 칸: 엑셀처럼 열 너비(<col>)나 고정 너비(px·pt) 표일 때만 실제 너비로, 아니면 원래 적힌 너비만
        const spec = el => (el.getAttribute('width') || el.style.width || '').trim();
        const fixedTbl = new Set($$('table', d.body).filter(t => t.querySelector('col') || /^\d+(\.\d+)?(px|pt)?$/i.test(spec(t))));
        $$('td, th', d.body).forEach(td => { const rg = d.createRange(); rg.selectNodeContents(td); const tops = new Set([...rg.getClientRects()].filter(r => r.width > 0).map(r => Math.round(r.top / 4))); if (tops.size <= 1 && !td.querySelector('br, div, p, table')) oneLine.add(td); });
        $$('*', d.body).forEach(el => {
          const cs = w.getComputedStyle(el), cell = /^(TD|TH)$/.test(el.tagName), keys = cell ? INLINE_CELL : el.tagName === 'TABLE' ? ['border-collapse', 'width', 'background-color', 'font-family', 'font-size'] : INLINE_TEXT;
          keys.forEach(k => { let v = cs.getPropertyValue(k); if (!v) return;
            if (/border-/.test(k) && /^0px|none/.test(v)) v = 'none';
            if (k === 'background-color' && /rgba\(0, 0, 0, 0\)|transparent/.test(v)) return;
            if (k === 'width' || k === 'height') {
              if (!cell && k === 'height') return;
              const t = cell && el.closest('table'), fixed = t && fixedTbl.has(t);
              if (!cell) { const sp = spec(el); if (!sp) return; v = /%$/.test(sp) ? sp : /^\d+(\.\d+)?$/.test(sp) ? sp + 'px' : sp; }  // 표
              else if (fixed) v = Math.round(rect.get(el)[k]) + 'px';
              else { if (k === 'height') return; const sp = spec(el); if (!sp) return; v = /^\d+(\.\d+)?$/.test(sp) ? sp + 'px' : sp; }
            }
            el.style.setProperty(k === 'text-decoration-line' ? 'text-decoration' : k, v); });
          el.removeAttribute('class');
        });
        $$('table', d.body).forEach(t => { if (!t.style.borderCollapse) t.style.borderCollapse = 'collapse'; });
        // 칸 안 글자가 한 줄이었으면 줄바꿈 금지 (작성 화면 글꼴이 조금 넓어도 '네이/버'처럼 깨지지 않게), 안쪽 여백이 0이면 조금 줌
        if (!opts.quote) $$('td, th', d.body).forEach(td => {
          if (oneLine.has(td)) td.style.whiteSpace = 'nowrap';
          if (['top', 'right', 'bottom', 'left'].every(k => !parseFloat(td.style.getPropertyValue('padding-' + k)))) td.style.padding = '1px 5px';
        });
        // 실제 내용 크기 (iframe 너비가 아니라 표 등 내용이 차지하는 만큼)
        d.body.style.margin = '0'; let W = 0, H = 0; [...d.body.children].forEach(c => { const r = c.getBoundingClientRect(); W = Math.max(W, r.right); H = Math.max(H, r.bottom); });
        const out = { html: d.body.innerHTML, w: Math.ceil(W || d.body.scrollWidth) + 2, h: Math.ceil(H || d.body.scrollHeight) + 2, node: d.body };
        res(out);
      } catch (e) { res(null); }
      setTimeout(() => f.remove(), 3000);
    };
    document.body.append(f);
  });
}
// 붙여넣은 표를 그림(PNG)으로: 클립보드에 그림이 같이 왔으면(엑셀) 그것, 없으면 직접 그려서
async function htmlToPng(r) {
  try {
    const box = r.node.ownerDocument.createElement('div'); box.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml'); box.style.cssText = 'display:inline-block;background:#fff;font-family:\'맑은 고딕\',sans-serif;font-size:13px';
    box.innerHTML = r.html; const xml = new XMLSerializer().serializeToString(box);
    const W = Math.min(r.w, 1600), H = Math.min(r.h, 4000), k = 2;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><foreignObject width="100%" height="100%">${xml}</foreignObject></svg>`;
    const img = new Image(); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    await img.decode();
    const c = document.createElement('canvas'); c.width = W * k; c.height = H * k; const g = c.getContext('2d'); g.scale(k, k); g.fillStyle = '#fff'; g.fillRect(0, 0, W, H); g.drawImage(img, 0, 0);
    return `<img src="${c.toDataURL('image/png')}" width="${W}" style="max-width:100%">`;
  } catch (e) { return null; }
}
function doPaste(cd) {
  const html = cd.getData('text/html'), text = cd.getData('text/plain');
  const imgItem = [...cd.items].find(i => i.kind === 'file' && i.type.startsWith('image/')), imgFile = imgItem ? imgItem.getAsFile() : null;
  const v = { rich: html ? cleanHtml(html) : textToHtml(text), plain: textToHtml(text || (html ? new DOMParser().parseFromString(html, 'text/html').body.innerText : '')), ti: html ? textImgHtml(html) : textToHtml(text) };
  const complex = !!html && /<(table|img)\b/i.test(html);  // 표·그림이 있으면 '그림으로' 고를 수 있게
  if (complex) v.img = '';
  const b = $('#cbody'); let s = getSelection(); if (!s.rangeCount || !b.contains(s.anchorNode)) { restoreSel(); s = getSelection(); }
  const rg = s.getRangeAt(0); rg.deleteContents();
  const ms = document.createElement('span'), me = document.createElement('span'); ms.className = me.className = 'gp-pm';
  rg.insertNode(me); rg.insertNode(ms);
  const put = k => {
    const r = document.createRange(); r.setStartAfter(ms); r.setEndBefore(me); r.deleteContents();
    const t = document.createElement('template'); t.innerHTML = v[k]; me.before(t.content);
    const c = document.createRange(); c.setStartAfter(me); c.collapse(true); const ss = getSelection(); ss.removeAllRanges(); ss.addRange(c);
    pasteOpt.cur = k; dirty(); runTypo(); $$('#pasteBtn [data-k]').forEach(x => x.classList.toggle('on', x.dataset.k === k));
    const pb = $('#pasteBtn'); if (pb && pb._place) requestAnimationFrame(() => pb._place());
  };
  const putAsync = async k => { if (k === 'img' && !v.img) { pasteOpt.cur = 'img'; v.img = await v._img(); } put(k); };
  pasteOpt.put = putAsync;
  put('rich');
  showPasteBtn(me, put, Object.keys(v).filter(k => k !== 'rich' && v[k] !== v.rich).length > 0, complex);
  if (/<style/i.test(html || '') || complex) {
    // 원본 모양을 칸마다 입힌 버전으로 바꿔 끼움 (사용자가 그사이 다른 걸 고르지 않았을 때만)
    renderPasted(html).then(r => {
      if (!r) return; pasteOpt.rendered = r; v.rich = cleanHtml(r.html);
      if (pasteOpt.cur === 'rich' && ms.isConnected) put('rich');
    });
  }
  // '그림으로': 고를 때 만듦
  v._img = async () => {
    if (v.img) return v.img;
    if (imgFile) v.img = `<img src="${await readImage(imgFile)}" style="max-width:100%">`;
    else { const r = pasteOpt.rendered || await renderPasted(html); v.img = (r && await htmlToPng(r)) || v.rich; }
    return v.img;
  };
  pasteOpt.v = v;
}
function endPasteOpt() { $$('#pasteBtn').forEach(x => x.remove()); $$('#cbody .gp-pm').forEach(x => x.remove()); pasteOpt.on = false; if ($('.menu') && $('.menu')._paste) closeMenus(); }
function showPasteBtn(anchorEl, put, useful, complex) {
  endPasteOpt.skip = true; $$('#pasteBtn').forEach(x => x.remove()); endPasteOpt.skip = false;
  if (!useful && !complex) { $$('#cbody .gp-pm').forEach(x => x.remove()); return; }
  pasteOpt.on = true;
  if (complex) {
    const bar = document.createElement('div'); bar.id = 'pasteBtn'; bar.className = 'pastebar';
    bar.innerHTML = `<span class="pl">붙여넣기</span><button data-k="rich" class="on">원본 모양</button><button data-k="img">그림으로</button><button data-k="plain">글자만</button><button class="px" title="닫기 (붙여넣은 그대로 두기)">✕</button>`;
    const place = () => { if (!anchorEl.isConnected) return endPasteOpt(); const r = anchorEl.getBoundingClientRect(), cb = $('#cbody').getBoundingClientRect(); bar.style.left = Math.max(cb.left + 6, Math.min(r.left, cb.right - bar.offsetWidth - 6)) + 'px'; bar.style.top = Math.min(cb.bottom - bar.offsetHeight - 6, Math.max(cb.top + 6, r.bottom + 6)) + 'px'; };
    document.body.append(bar); place(); bar._place = place; bar._open = () => {};
    bar.addEventListener('mousedown', async e => { e.preventDefault(); const b = e.target.closest('button'); if (!b) return; if (b.classList.contains('px')) { endPasteOpt(); return; }
      b.classList.add('busy'); await pasteOpt.put(b.dataset.k); b.classList.remove('busy'); place(); });
    return;
  }
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
  const rows = Array.from({ length: r }, () => '<tr>' + Array.from({ length: c }, () => '<td style="border:1px solid #000000;padding:3px 7px;min-width:60px;height:22px;vertical-align:top"><br></td>').join('') + '</tr>').join('');
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
/* ───────── 표 편집: 칸 선택(음영) · 도구 막대 · 크기 조절 점 ───────── */
const TS = { cells: [], multi: false, drag: null };
const TBS = { color: '#000000', style: 'solid', w: '1px' };  // 마지막으로 고른 테두리
function tdSel(cells, multi) {
  $$('#cbody .tdsel').forEach(x => x.classList.remove('tdsel'));
  TS.cells = (cells || []).filter(Boolean); TS.multi = !!multi && TS.cells.length > 1;
  TS.cells.forEach(c => c.classList.add('tdsel'));
}
const selCells = () => { const c = TS.cells.filter(x => x.isConnected); if (c.length) return c; const td = cellAtCaret(); return td ? [td] : []; };
// 두 칸을 꼭짓점으로 하는 사각형 안의 칸들 (엑셀처럼)
function tableGrid(t) {
  const pos = new Map(), taken = [];
  [...t.rows].forEach((r, ri) => { let ci = 0; taken[ri] = taken[ri] || [];
    [...r.cells].forEach(c => { while (taken[ri][ci]) ci++; const rs = c.rowSpan || 1, cs = c.colSpan || 1;
      for (let y = 0; y < rs; y++) for (let x = 0; x < cs; x++) { (taken[ri + y] = taken[ri + y] || [])[ci + x] = 1; }
      pos.set(c, { r: ri, c: ci, r2: ri + rs - 1, c2: ci + cs - 1 }); ci += cs; }); });
  return pos;
}
function rectCells(a, b) {
  const t = a.closest('table'); if (t !== b.closest('table')) return [a];
  const g = tableGrid(t), A = g.get(a), B = g.get(b); if (!A || !B) return [a];
  let r0 = Math.min(A.r, B.r), r1 = Math.max(A.r2, B.r2), c0 = Math.min(A.c, B.c), c1 = Math.max(A.c2, B.c2);
  // 합친 칸이 걸치면 사각형을 넓힘 (엑셀처럼)
  for (let grow = true; grow;) { grow = false; g.forEach(p => { if (p.r <= r1 && p.r2 >= r0 && p.c <= c1 && p.c2 >= c0) { if (p.r < r0) { r0 = p.r; grow = true; } if (p.r2 > r1) { r1 = p.r2; grow = true; } if (p.c < c0) { c0 = p.c; grow = true; } if (p.c2 > c1) { c1 = p.c2; grow = true; } } }); }
  const out = []; g.forEach((p, c) => { if (p.r <= r1 && p.r2 >= r0 && p.c <= c1 && p.c2 >= c0) out.push(c); });
  return out.sort((x, y) => (g.get(x).r - g.get(y).r) || (g.get(x).c - g.get(y).c));
}
// 커서가 칸 안에 있으면 그 칸에 옅은 음영 (여러 칸을 끌어서 골랐을 땐 그대로 유지)
function syncTdSel() {
  const td = cellAtCaret();
  if (TS.multi && td && TS.cells.includes(td)) return;
  tdSel(td ? [td] : [], false);
}
function tableBar() {
  syncTdSel();
  const td = TS.cells[0] || cellAtCaret(); let bar = $('#tbar');
  if (!td || !td.isConnected) { if (bar) bar.remove(); return; }
  if (!bar) {
    bar = document.createElement('div'); bar.id = 'tbar'; bar.className = 'tbar';
    const b = (a, ic, t, extra) => `<button class="ib" data-ta="${a}" title="${t}">${ico(ic, 18)}${extra || ''}</button>`;
    const tb = (a, ic, txt, t, cls) => `<button class="tbt${cls ? ' ' + cls : ''}" data-ta="${a}" title="${t}">${ico(ic, 15)}${txt}</button>`;
    bar.innerHTML = `<span class="lb">정렬</span>${b('hl', 'alL', '칸 안에서 왼쪽')}${b('hc', 'alC', '칸 안에서 가운데')}${b('hr', 'alR', '칸 안에서 오른쪽')}<span class="vsep"></span>${b('vtop', 'vtop', '칸 안에서 위로')}${b('vmid', 'vmid', '칸 안에서 가운데(세로)')}${b('vbot', 'vbot', '칸 안에서 아래로')}<span class="sep"></span>`
      + `${tb('merge', 'merge', '합치기', '고른 칸 합치기 (여러 칸을 끌어서 고른 뒤)')}${tb('split', 'split', '나누기', '합친 칸 다시 나누기')}<span class="sep"></span>`
      + `<span class="lb">행</span>${tb('rowA', 'rowA', '위', '선택한 칸 위에 행 넣기')}${tb('rowB', 'rowB', '아래', '선택한 칸 아래에 행 넣기')}${tb('rowX', 'minus', '삭제', '선택한 행 지우기', 'del')}<span class="sep"></span>`
      + `<span class="lb">열</span>${tb('colL', 'colL', '왼쪽', '선택한 칸 왼쪽에 열 넣기')}${tb('colR', 'colR', '오른쪽', '선택한 칸 오른쪽에 열 넣기')}${tb('colX', 'minus', '삭제', '선택한 열 지우기', 'del')}<span class="sep"></span>`
      + `${b('fill', 'fill', '칸 음영(배경색)', '<span class="sw" id="tbFill" style="background:#ffff00"></span>')}${b('bcolor', 'bcolor', '테두리 색', `<span class="sw" id="tbBc" style="background:${TBS.color}"></span>`)}${b('bstyle', 'bstyle', '테두리 모양')}<span class="sep"></span>`
      + `${tb('tstyle', 'tstyle', '스타일', '표 스타일 (머리글·줄무늬 등)')}${b('selall', 'selall', '표 전체 선택')}${b('tblX', 'trash', '표 삭제')}<span class="tinfo" id="tbInfo"></span>`;
    bar.addEventListener('mousedown', e => { e.preventDefault(); const x = e.target.closest('[data-ta]'); if (x) tblAct(x.dataset.ta, x); });
    document.body.append(bar);
  }
  const va = td.style.verticalAlign || 'top';
  $$('[data-ta^=v]', bar).forEach(x => x.classList.toggle('on', x.dataset.ta === { top: 'vtop', middle: 'vmid', bottom: 'vbot' }[va]));
  const ha = td.style.textAlign || 'left';
  $$('[data-ta=hl],[data-ta=hc],[data-ta=hr]', bar).forEach(x => x.classList.toggle('on', x.dataset.ta === { left: 'hl', start: 'hl', center: 'hc', right: 'hr', end: 'hr' }[ha]));
  $('[data-ta=merge]', bar).disabled = !(TS.multi && TS.cells.length > 1);
  $('[data-ta=split]', bar).disabled = !((td.colSpan || 1) > 1 || (td.rowSpan || 1) > 1);
  $('#tbInfo', bar).textContent = TS.multi ? TS.cells.length + '칸 선택됨' : '';
  const tr = td.closest('table').getBoundingClientRect(), cr = $('#cbody').getBoundingClientRect();
  bar.style.maxWidth = Math.max(320, cr.width - 8) + 'px';  // 작성 칸보다 넓으면 두 줄로
  bar.style.left = Math.max(cr.left + 4, Math.min(tr.left, cr.right - bar.offsetWidth - 4)) + 'px';
  const h = bar.offsetHeight, vb = Math.min(innerHeight, cr.bottom) - 4;
  const top = tr.bottom + 6 + h <= vb ? tr.bottom + 6 : vb - h;
  bar.style.top = top + 'px';
  const cur = cellAtCaret();
  if (cur && !tableBar.scrolling) { const r = cur.getBoundingClientRect(); if (r.bottom > top - 4 && r.top > cr.top) { const sc = $('#cbody'); const by = Math.min(r.bottom - top + 12, r.top - cr.top - 8); if (by > 0 && sc.scrollHeight > sc.clientHeight) { tableBar.scrolling = true; sc.scrollTop += by; tableBar.scrolling = false; } } }
}
// 칸 합치기: 고른 사각형의 왼쪽 위 칸에 내용을 모으고 rowspan/colspan
function mergeCells(cells) {
  const rows = [...new Set(cells.map(c => c.parentElement))];
  const g = tableGrid(cells[0].closest('table')), P = cells.map(c => g.get(c));
  const first = cells[0];
  const cs = Math.max(...P.map(p => p.c2)) - Math.min(...P.map(p => p.c)) + 1, rsN = Math.max(...P.map(p => p.r2)) - Math.min(...P.map(p => p.r)) + 1;
  const html = cells.map(c => c.innerHTML.replace(/^(\s|&nbsp;)+/i, '').replace(/^(\s|<br>)+$/i, '')).filter(Boolean).join('<br>');
  cells.slice(1).forEach(c => c.remove());
  first.colSpan = cs; first.rowSpan = rsN; first.innerHTML = html || '<br>';
  rows.slice(1).forEach(r => { if (!r.cells.length) r.remove(); });
  tdSel([first], false);
  const r = document.createRange(); r.selectNodeContents(first); r.collapse(false); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
}
// 칸 나누기: 합친 칸을 원래 칸 수대로 (빈 칸 채우기)
function splitCell(td) {
  const cs = td.colSpan || 1, rs = td.rowSpan || 1; if (cs === 1 && rs === 1) return;
  const mk = () => { const x = td.cloneNode(false); x.removeAttribute('colspan'); x.removeAttribute('rowspan'); x.classList.remove('tdsel'); if (!x.className) x.removeAttribute('class'); x.innerHTML = '<br>'; return x; };
  const row = td.parentElement, table = td.closest('table'), ci = td.cellIndex;
  td.removeAttribute('colspan'); td.removeAttribute('rowspan');
  for (let k = 1; k < cs; k++) td.after(mk());
  for (let k = 1; k < rs; k++) { const r = table.rows[row.rowIndex + k]; if (!r) break; const ref = r.cells[ci]; for (let j = 0; j < cs; j++) ref ? ref.before(mk()) : r.append(mk()); }
}
// 표 스타일: 표 전체에 한 번에
const TSTYLES = [
  ['basic', '기본 (검정 테두리)', '<i style="border:1px solid #000;background:#fff"></i>'],
  ['gray', '머리글 회색', '<i style="border:1px solid #000;background:linear-gradient(#d9d9d9 40%,#fff 40%)"></i>'],
  ['navy', '머리글 남색', '<i style="border:1px solid #8ea9c8;background:linear-gradient(#1f3864 40%,#fff 40%)"></i>'],
  ['stripe', '줄무늬', '<i style="border:1px solid #b4c6e7;background:repeating-linear-gradient(#dde6f4 0 4px,#fff 4px 8px)"></i>'],
  ['lines', '가로선만 (깔끔하게)', '<i style="border-top:2px solid #000;border-bottom:2px solid #000;background:repeating-linear-gradient(#fff 0 5px,#bfbfbf 5px 6px)"></i>'],
  ['total', '마지막 행 합계 강조', '<i style="border:1px solid #000;background:linear-gradient(#fff 60%,#fff2cc 60%)"></i>']
];
function applyTStyle(t, k) {
  const rows = [...t.rows], all = rows.flatMap(r => [...r.cells]);
  const set = (c, o) => { if (o.backgroundColor) c.dataset.tsbg = '1'; Object.assign(c.style, o); };
  if (k === 'total') { const last = rows[rows.length - 1]; if (last) [...last.cells].forEach(c => set(c, { backgroundColor: '#fff2cc', fontWeight: '700', borderTop: '2px solid #000' })); return; }
  t.style.borderCollapse = 'collapse';
  // 앞서 스타일이 칠한 색만 지우고, 직접 칠한 음영은 그대로
  all.forEach(c => { c.style.border = '1px solid #000'; if (c.dataset.tsbg) { c.style.backgroundColor = ''; c.style.color = ''; c.style.fontWeight = ''; delete c.dataset.tsbg; } });
  const mine = c => c.style.backgroundColor && !c.dataset.tsbg;  // 직접 칠한 칸
  const head = rows[0] ? [...rows[0].cells] : [];
  if (k === 'gray') head.forEach(c => set(c, { backgroundColor: '#d9d9d9', fontWeight: '700', textAlign: 'center' }));
  if (k === 'navy') { all.forEach(c => set(c, { border: '1px solid #8ea9c8' })); head.forEach(c => set(c, { backgroundColor: '#1f3864', color: '#ffffff', fontWeight: '700', textAlign: 'center' })); }
  if (k === 'stripe') { all.forEach(c => set(c, { border: '1px solid #b4c6e7' })); head.forEach(c => set(c, { backgroundColor: '#b4c6e7', fontWeight: '700', textAlign: 'center' })); rows.slice(1).forEach((r, i) => { if (i % 2) [...r.cells].forEach(c => { if (!mine(c)) set(c, { backgroundColor: '#eef3fb' }); }); }); }
  if (k === 'lines') { all.forEach(c => set(c, { border: 'none', borderBottom: '1px solid #bfbfbf' })); head.forEach(c => set(c, { borderTop: '2px solid #000', borderBottom: '1px solid #000', fontWeight: '700', textAlign: 'center' })); if (rows.length > 1) [...rows[rows.length - 1].cells].forEach(c => set(c, { borderBottom: '2px solid #000' })); }
}
function keepIn(cells) {
  cells = cells.filter(c => c.isConnected); if (!cells.length) return;
  const b = $('#cbody'); b.focus(); const r = document.createRange(); r.selectNodeContents(cells[0]); r.collapse(false);
  const s = getSelection(); s.removeAllRanges(); s.addRange(r); savedRange = r.cloneRange();
  tdSel(cells, cells.length > 1); tableBar();
}
// 작은 확인 창 (표 삭제 등)
function askConfirm(msg, ok) {
  return new Promise(res => {
    const bg = document.createElement('div'); bg.className = 'modal-bg stack';
    bg.innerHTML = `<div class="modal ask"><p>${esc(msg)}</p><div class="mfoot"><button class="btn" data-n>취소</button><button class="btn pri danger" data-y>${esc(ok || '확인')}</button></div></div>`;
    const done = v => { bg.remove(); document.removeEventListener('keydown', key, true); res(v); };
    const key = e => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); done(false); } if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); done(true); } };
    bg.addEventListener('mousedown', e => { if (e.target === bg || e.target.closest('[data-n]')) done(false); else if (e.target.closest('[data-y]')) done(true); });
    document.addEventListener('keydown', key, true); document.body.append(bg); $('[data-y]', bg).focus();
  });
}
const BSTYLES = [['solid', '1px', '실선'], ['solid', '2px', '굵은 실선'], ['dotted', '1px', '점선'], ['dashed', '1px', '파선'], ['double', '3px', '이중선'], ['none', '0', '테두리 없음']];
const setBorder = (cells, o) => { cells.forEach(c => { c.style.border = o.style === 'none' ? 'none' : `${o.w} ${o.style} ${o.color}`; }); dirty(); };
async function tblAct(a, btn) {
  const cells = selCells(); const td = cells[0]; if (!td) return;
  const tr = td.parentElement, table = td.closest('table'), ci = td.cellIndex;
  const newTd = ref => { const x = (ref || td).cloneNode(false); x.classList.remove('tdsel'); if (!x.className) x.removeAttribute('class'); x.removeAttribute('rowspan'); x.removeAttribute('colspan'); x.innerHTML = '<br>'; return x; };
  if (a[0] === 'v' && a.length === 4) cells.forEach(c => { c.style.verticalAlign = { vtop: 'top', vmid: 'middle', vbot: 'bottom' }[a]; });
  if (a === 'rowA' || a === 'rowB') { const nr = document.createElement('tr'); [...tr.cells].forEach(c => nr.append(newTd(c))); a === 'rowA' ? tr.before(nr) : tr.after(nr); }
  if (a === 'colL' || a === 'colR') [...table.rows].forEach(r => { const ref = r.cells[Math.min(ci, r.cells.length - 1)]; if (ref) a === 'colL' && ci < r.cells.length ? ref.before(newTd(ref)) : ref.after(newTd(ref)); });
  if (a === 'rowX') { const rows = [...new Set(cells.map(c => c.parentElement))]; if (rows.length >= table.rows.length) { if (await askConfirm('표의 모든 행이 지워져요. 표를 삭제할까요?', '표 삭제')) table.remove(); else return; } else rows.forEach(r => r.remove()); tdSel([]); }
  if (a === 'colX') { const cols = [...new Set(cells.map(c => c.cellIndex))].sort((x, y) => y - x); const maxC = Math.max(...[...table.rows].map(r => r.cells.length)); if (cols.length >= maxC) { if (await askConfirm('표의 모든 열이 지워져요. 표를 삭제할까요?', '표 삭제')) table.remove(); else return; } else [...table.rows].forEach(r => cols.forEach(k => r.cells[k] && r.cells[k].remove())); tdSel([]); }
  if (a === 'hl' || a === 'hc' || a === 'hr') cells.forEach(c => { c.style.textAlign = { hl: 'left', hc: 'center', hr: 'right' }[a]; });
  if (a === 'merge') { if (!(TS.multi && cells.length > 1)) return; mergeCells(cells); }
  if (a === 'split') splitCell(td);
  if (a === 'tstyle') { menuAt(btn, TSTYLES.map(([k, l, sw]) => ({ html: `<span class="tsw">${sw}</span>${l}`, act: () => { applyTStyle(table, k); dirty(); keepIn([td]); } }))); return; }
  if (a === 'selall') { tdSel($$('td,th', table).filter(c => c.closest('table') === table), true); }
  if (a === 'fill') { paletteMenu(btn, PALETTE, null, c => { cells.forEach(x => { x.style.backgroundColor = c || ''; delete x.dataset.tsbg; }); keepIn(cells); if (c) $('#tbFill').style.background = c; dirty(); }, '음영 없음'); return; }
  if (a === 'bcolor') { paletteMenu(btn, PALETTE, TBS.color, c => { TBS.color = c || '#000000'; $('#tbBc').style.background = TBS.color; if (TBS.style === 'none') { TBS.style = 'solid'; TBS.w = '1px'; } setBorder(cells, TBS); keepIn(cells); }, '기본 (검정)'); return; }
  if (a === 'bstyle') {
    menuAt(btn, BSTYLES.map(([st2, w, l]) => ({ on: TBS.style === st2 && TBS.w === w, html: `<span class="bsamp" style="border-top:${st2 === 'none' ? '1px dashed #dadce0' : `${w === '1px' && st2 !== 'solid' ? '2px' : w} ${st2} #202124`}"></span>${l}`, act: () => { TBS.style = st2; TBS.w = w; setBorder(cells, TBS); keepIn(cells); } })));
    return;
  }
  if (a === 'tblX') { if (!(await askConfirm('이 표를 삭제할까요?', '삭제'))) return; table.remove(); tdSel([]); }
  dirty(); tableBar(); placeTSize();
}
// 여러 칸을 끌어서 고르기 + 고른 칸 Delete로 내용 지우기
document.addEventListener('mousedown', e => {
  const td = e.target.closest && e.target.closest('#cbody td, #cbody th');
  if (e.target.closest && e.target.closest('#tbar, .menu, #tsize, #fmt')) return;  // 위 서식 막대(색·굵게 등)를 눌러도 고른 칸 유지
  if (!td) { if (TS.multi) tdSel([]); TS.drag = null; return; }
  if (e.shiftKey && TS.cells[0] && TS.cells[0].closest('table') === td.closest('table')) { e.preventDefault(); tdSel(rectCells(TS.cells[0], td), true); TS.drag = TS.cells[0]; tableBar(); return; }
  TS.drag = td; TS.multi = false;
});
document.addEventListener('mouseover', e => {
  if (!TS.drag || !(e.buttons & 1)) return; const td = e.target.closest && e.target.closest('#cbody td, #cbody th');
  if (!td || td === TS.drag && !TS.multi || td.closest('table') !== TS.drag.closest('table')) return;
  tdSel(rectCells(TS.drag, td), true);
  const r = document.createRange(); r.selectNodeContents(TS.drag); r.collapse(true); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
  tableBar();
});
document.addEventListener('mouseup', () => { TS.drag = null; });
document.addEventListener('keydown', e => {
  if (!TS.multi || !$('#cbody') || document.activeElement !== $('#cbody')) return;
  if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); TS.cells.forEach(c => { c.innerHTML = '<br>'; }); dirty(); return; }
  if (e.key === 'Escape') { tdSel([]); tableBar(); return; }
  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && /^[biu]$/i.test(e.key)) { e.preventDefault(); e.stopPropagation(); cellsToggle({ b: 'bold', i: 'italic', u: 'underline' }[e.key.toLowerCase()]); syncFmt(); return; }
  if (!e.ctrlKey && !e.metaKey && e.key.length === 1 || e.key === 'Enter') { tdSel([TS.cells[0]]); }
}, true);
// 표 오른쪽 아래 끝 근처에 마우스를 대면 점이 나오고, 끌면 표 크기 조절
let tsizeT = null, tsizing = false;
function placeTSize() {
  const hd = $('#tsize'); if (!hd) return;
  if (!tsizeT || !tsizeT.isConnected) { hd.style.display = 'none'; return; }
  const r = tsizeT.getBoundingClientRect(), br = $('#cbody').getBoundingClientRect();
  if (r.bottom < br.top || r.bottom > br.bottom + 4 || !r.width) { hd.style.display = 'none'; return; }
  hd.style.display = 'block'; hd.style.left = (r.right - 6) + 'px'; hd.style.top = (r.bottom - 6) + 'px';
}
document.addEventListener('mousemove', e => {
  if (tsizing) return; const b = $('#cbody'); if (!b || !$('#read').classList.contains('composing')) { if (tsizeT) { tsizeT = null; placeTSize(); } return; }
  let hit = null;
  if (e.target.id !== 'tsize') {
    for (const t of $$('table', b)) { const r = t.getBoundingClientRect(); if (Math.abs(e.clientX - r.right) < 26 && Math.abs(e.clientY - r.bottom) < 26) { hit = t; break; } }
    if (!hit) { const t = e.target.closest && e.target.closest('#cbody table'); if (t) { const r = t.getBoundingClientRect(); if (r.right - e.clientX < 40 && r.bottom - e.clientY < 40) hit = t; } }
  } else hit = tsizeT;
  if (hit !== tsizeT) { tsizeT = hit; let hd = $('#tsize');
    if (!hd && hit) { hd = document.createElement('div'); hd.id = 'tsize'; hd.title = '끌어서 표 크기 조절'; document.body.append(hd); hd.addEventListener('mousedown', startTSize); }
    placeTSize(); }
});
function startTSize(e) {
  e.preventDefault(); e.stopPropagation(); const t = tsizeT; if (!t) return; tsizing = true;
  const r0 = t.getBoundingClientRect(), rowsH = [...t.rows].map(r => r.getBoundingClientRect().height), sx = e.clientX, sy = e.clientY;
  const move = ev => {
    const w = Math.max(60, Math.round(r0.width + ev.clientX - sx)), k = Math.max(0.3, (r0.height + ev.clientY - sy) / r0.height);
    t.style.width = w + 'px';
    if (Math.abs(ev.clientY - sy) > 3) [...t.rows].forEach((tr, i) => { const h = Math.max(18, Math.round(rowsH[i] * k)); [...tr.cells].forEach(c => { if ((c.rowSpan || 1) === 1) c.style.height = h + 'px'; }); });
    placeTSize(); if ($('#tbar')) tableBar();
  };
  const up = () => { tsizing = false; document.removeEventListener('mousemove', move, true); document.removeEventListener('mouseup', up, true); dirty(); };
  document.addEventListener('mousemove', move, true); document.addEventListener('mouseup', up, true);
}
document.addEventListener('scroll', () => { placeTSize(); if ($('#tbar')) tableBar(); }, true);

/* ───────── 설정 (일반 · 풋터 · 편지함 · 계정) ───────── */
function saveAll() { if (!real.on) store.set('sample-boxes', BOXES); else if (J.data) { J.data.boxes = BOXES.map(b => ({ id: b.id, name: b.name, parent: b.parent, hidden: !!b.hidden })); jSave(); } store.set('footers2', FOOTERS); store.set('settings', SET); }
// 저장 폴더: 브라우저가 고른 폴더 권한을 기억 (IndexedDB)
const idb = (op, val) => new Promise(res => { try { const rq = indexedDB.open('jin-mail', 1); rq.onupgradeneeded = () => rq.result.createObjectStore('kv'); rq.onsuccess = () => { const tx = rq.result.transaction('kv', op === 'get' ? 'readonly' : 'readwrite'); const s = tx.objectStore('kv'); const r = op === 'get' ? s.get('dir') : s.put(val, 'dir'); r.onsuccess = () => res(r.result); r.onerror = () => res(null); }; rq.onerror = () => res(null); } catch (e) { res(null); } });
function openSettings(tab) {
  closeMenus();
  const bg = document.createElement('div'); bg.className = 'modal-bg';
  bg.innerHTML = `<div class="modal set"><h3>설정</h3><div class="tabs"><button data-tab="general">일반</button><button data-tab="footers">풋터</button><button data-tab="boxes">편지함</button><button data-tab="account">계정</button></div><div class="mbody" id="setBody"></div><div class="mfoot"><button class="btn pri" data-x>닫기</button></div></div>`;
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
      <h5>작성 칸 맨 위 인사말</h5><p class="desc">새 메일·답장을 열 때 맨 위에 자동으로 넣을 글이에요. 풋터에 인사말이 이미 있으면 비워 두세요.</p>
      <textarea id="setGreet" rows="2" placeholder="예: 안녕하세요, OO팀 OOO입니다." style="width:100%;border:1px solid #c4cbd6;border-radius:6px;padding:7px 9px;font:inherit;resize:vertical">${esc(SET.greeting || '')}</textarea>
      <h5>기본 글꼴</h5><p class="desc">새로 쓰는 메일과 답장의 기본 글꼴이에요. 보내는 메일에도 이 글꼴로 들어가요.</p>
      <div class="opt"><select id="setFont">${FONT_LIST.map(f => `<option${f === SET.font.family ? ' selected' : ''}>${f}</option>`).join('')}</select>
        <select id="setSize">${SIZES.map(z => `<option value="${z}"${z === SET.font.size ? ' selected' : ''}>${z}pt</option>`).join('')}</select>
        <span id="fontPrev" style="margin-left:8px;font-family:'${SET.font.family}';font-size:${SET.font.size}pt">가나다 ABC 123</span></div>
      <h5>맞춤법 표시</h5><label class="opt"><input type="checkbox" id="setTypo"${SET.typo ? ' checked' : ''}> 자주 틀리는 한글 표현에 밑줄 표시</label>
      <p class="desc">무시한 단어 ${IGNORE.size}개 ${IGNORE.size ? '<button class="btn" id="clrIgn" style="padding:2px 8px;margin-left:6px">무시 목록 비우기</button>' : ''}</p>
      <h5>이 PC에 저장한 메일</h5><p class="desc">불러온 메일 목록과 본문을 이 PC(브라우저 저장소)에 저장해 두고, 다음부터 바로 열고 본문 전체에서 검색해요. Google 외 다른 곳으로는 보내지 않아요.</p>
      <div class="opt"><span id="cacheInfo" style="color:var(--sub)">확인 중…</span><button class="btn" id="clrCache" style="padding:3px 10px">저장한 메일 비우기</button></div>`;
      (async () => { const el = $('#cacheInfo', body); if (!el) return; let n = real.texts ? real.texts.size : 0, sz = '';
        try { const e = await navigator.storage.estimate(); sz = ` · 사용 ${fmtSize(e.usage || 0)}`; } catch (er) { /* */ }
        el.textContent = real.on ? `본문 저장 ${n}통 / 전체 ${MAILS.length}통${sz}` : `예시 메일 사용 중${sz}`; })();
    }
    if (t === 'footers') {
      body.innerHTML = '<p class="desc">작성 화면의 풋터 버튼으로 바로 넣을 수 있고, 아래 조건에 맞으면 작성 화면을 열 때 자동으로 들어가요. 여러 개가 맞으면 <b>위에 있는 풋터가 먼저</b> 적용돼요. 왼쪽 ⠿를 끌거나 ↑↓로 순서를 바꿀 수 있어요.</p>' + FOOTERS.map((f, fi) => `
        <div class="ftr" data-id="${f.id}">
          <div class="r1"><span class="fgrip" draggable="true" title="끌어서 순서 바꾸기">⠿</span><span class="fno">${fi + 1}</span><button class="ib" data-k="up" title="위로"${fi === 0 ? ' disabled' : ''}>↑</button><button class="ib" data-k="down" title="아래로"${fi === FOOTERS.length - 1 ? ' disabled' : ''}>↓</button><input type="text" class="nm" value="${esc(f.name)}" data-k="name" placeholder="풋터 이름">
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
      let h = `<p class="desc">순서·위치는 왼쪽 목록에서 끌어서 바꿀 수 있고, 편지함에서 우클릭하거나 ⋮을 눌러도 같은 메뉴가 나와요. '자동 분류'로 조건을 정하면 새로 오는 메일이 그 편지함으로 들어가요.</p>
        <div class="opt" style="margin-bottom:8px"><button class="btn pri" id="runAllRules">${ico('where', 15)} 모든 분류 조건 지금 실행 (받은편지함 메일에 적용)</button></div>`;
      const walk = (p, dep) => childrenOf(p).forEach(b => {
        h += `<div class="bxr" data-id="${b.id}" style="padding-left:${dep * 22}px">${ico('folder', 16)}<input type="text" value="${esc(b.name)}" data-k="name">
          <label class="opt" style="padding:0 6px;font-size:12.5px"><input type="checkbox" data-k="hide"${b.hidden ? ' checked' : ''}> 숨기기</label>
          <button class="btn" data-k="rules" style="padding:3px 8px">${ico('where', 14)} 자동 분류</button><button class="btn" data-k="sub" style="padding:3px 8px">${ico('plus', 14)} 하위</button><button class="ib" data-k="del" title="삭제">${ico('trash')}</button></div>`;
        walk(b.id, dep + 1);
      });
      walk(null, 0);
      body.innerHTML = h + `<button class="btn" id="addTop" style="margin-top:10px">${ico('plus')} 편지함 추가</button>`;
    }
    if (t === 'account') {
      const c = store.get('connected', null);
      body.innerHTML = `<h5>Gmail 계정</h5>${c ? `<p>${ico('env', 16)} <b>${esc(c.email)}</b> 연결됨 <span style="color:var(--mute)">(${esc(c.at || '')})</span></p><p class="desc">${real.on ? '최근 받은 메일 40통·보낸 메일 20통을 보여 주고 있어요. 읽음 표시·편지함 이동·삭제(휴지통)·편지함 이름 바꾸기는 <b>Gmail에도 바로 반영</b>돼요. 편지함 순서와 숨기기는 이 화면에서만 바뀌어요.' : '지금 화면의 메일은 예시예요.'}</p><button class="btn pri" id="loadReal">${real.on ? '다시 불러오기' : '실제 메일 불러오기'}</button> ${real.on ? '<button class="btn" id="useSample">예시 메일로 보기</button> ' : ''}<button class="btn" id="reconn">다시 연결</button> <button class="btn" id="disconn">연결 해제</button>` : `<p class="desc">아직 연결하지 않았어요.</p><button class="btn pri" id="reconn">Gmail 계정 연결하기</button>`}`;
    }
  };
  body.addEventListener('input', e => {
    if (e.target.id === 'setGreet') { SET.greeting = e.target.value; saveAll(); return; }
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
    if (e.target.id === 'setFont' || e.target.id === 'setSize') {
      SET.font = { family: $('#setFont', body).value, size: +$('#setSize', body).value }; saveAll();
      const pv = $('#fontPrev', body); pv.style.fontFamily = `'${SET.font.family}'`; pv.style.fontSize = SET.font.size + 'pt';
      if ($('#read').classList.contains('composing')) applyBaseFont();
      toast(`기본 글꼴: ${SET.font.family} ${SET.font.size}pt`);
    }
    if (e.target.id === 'setTypo') { SET.typo = e.target.checked; saveAll(); runTypo(); }
    if (fr) {
      const f = FOOTERS.find(x => x.id === fr.dataset.id);
      if (k === 'family') f.font.family = e.target.value;
      if (k === 'size') f.font.size = +e.target.value;
      if (k === 'rule') { f.rule = f.rule || {}; f.rule.type = e.target.value; $('[data-k=kw]', fr).style.display = e.target.value === 'from' ? '' : 'none'; }
      $('.ed', fr).setAttribute('style', footerStyle(f)); saveAll();
    }
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
    if (t.id === 'clrCache') { if (!confirm('이 PC에 저장한 메일 목록·본문을 지울까요? (Gmail의 메일은 그대로예요. 다음에 열 때 다시 받아요)')) return; try { if (real.db) real.db.close(); real.db = null; indexedDB.deleteDatabase('jin-cache-' + ME.email); } catch (er) { /* */ } toast('저장한 메일을 비웠어요 — 새로고침하면 다시 받아요'); return; }
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
    if (t.id === 'runAllRules') { runRules(null); return; }
    if (t.id === 'addTop') { const nb = { id: 'b' + Date.now(), name: '새 편지함', parent: null, }; BOXES.push(nb); rerender(); show('boxes'); return; }
    if (fr) {
      const f = FOOTERS.find(x => x.id === fr.dataset.id);
      if (t.dataset.k === 'del') { FOOTERS = FOOTERS.filter(x => x !== f); saveAll(); show('footers'); renderFooterBar(); }
      if (t.dataset.k === 'up' || t.dataset.k === 'down') { const i = FOOTERS.indexOf(f), j = i + (t.dataset.k === 'up' ? -1 : 1); if (j >= 0 && j < FOOTERS.length) { FOOTERS.splice(i, 1); FOOTERS.splice(j, 0, f); saveAll(); show('footers'); renderFooterBar(); } }
      if (t.dataset.k === 'color') paletteMenu(t, PALETTE, f.font.color, c => { f.font.color = c || '#202124'; saveAll(); show('footers'); }, '기본 (검정)');
      if (t.dataset.k === 'img') { imgTarget = fr; $('#ftrImg', body).click(); }
      return;
    }
    if (br) {
      const b = boxById(br.dataset.id);
      if (t.dataset.k === 'rules') { openRules(b.id); return; }
      if (t.dataset.k === 'sub') { const nb = { id: 'b' + Date.now(), name: '새 하위 편지함', parent: b.id, }; BOXES.push(nb); st.collapsed.delete(b.id); rerender(); show('boxes'); }
      if (t.dataset.k === 'del') { bg.remove(); deleteBox(b.id); }
    }
  });
  let fdrag = null;
  body.addEventListener('dragstart', e => { const g = e.target.closest && e.target.closest('.fgrip'); if (!g) return; fdrag = g.closest('.ftr').dataset.id; e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/x-jin-footer', fdrag); g.closest('.ftr').classList.add('dragging'); });
  body.addEventListener('dragover', e => { if (!fdrag) return; const t = e.target.closest('.ftr'); if (!t) return; e.preventDefault(); const r = t.getBoundingClientRect(); $$('.ftr', body).forEach(x => x.classList.remove('drop-b', 'drop-a')); t.classList.add(e.clientY < r.top + r.height / 2 ? 'drop-b' : 'drop-a'); });
  body.addEventListener('drop', e => {
    if (!fdrag) return; const t = e.target.closest('.ftr'); if (!t) return; e.preventDefault();
    const mv = FOOTERS.find(x => x.id === fdrag), tgt = FOOTERS.find(x => x.id === t.dataset.id); fdrag = null;
    if (!mv || mv === tgt) { show('footers'); return; }
    const r = t.getBoundingClientRect(), after = e.clientY >= r.top + r.height / 2;
    FOOTERS.splice(FOOTERS.indexOf(mv), 1); FOOTERS.splice(FOOTERS.indexOf(tgt) + (after ? 1 : 0), 0, mv);
    saveAll(); show('footers'); renderFooterBar();
  });
  body.addEventListener('dragend', () => { fdrag = null; $$('.ftr', body).forEach(x => x.classList.remove('dragging', 'drop-b', 'drop-a')); });
  bg.addEventListener('click', e => { const tb = e.target.closest('.tabs [data-tab]'); if (tb) show(tb.dataset.tab); if (e.target.closest('[data-x]') || e.target === bg) { bg.remove(); closeMenus(); } });
  show(tab || 'general');
}

/* ───────── 첫 접속: Gmail 계정 연결 ───────── */
const CLIENT_ID = '94151073420-uuu2lscanfblmr7f7ghllcpe90e7c2uv.apps.googleusercontent.com';
const SCOPE = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file';  // Gmail은 읽기·보내기만, JIN-mail 편지함 정보는 드라이브 숨은 앱 공간  // + 자동 분류(필터)  // 읽기 + 읽음표시·라벨(편지함)·휴지통 이동
const IS_EXT = !!(window.chrome && chrome.identity && chrome.identity.launchWebAuthFlow);
// 로그인 토큰(1시간)은 이 브라우저에만 잠깐 보관 → 새로고침해도 다시 로그인하지 않음
const tokCache = { get() { const t = store.get('tok', null); return t && t.exp > Date.now() + 60000 ? t.t : null; }, left() { const t = store.get('tok', null); return t ? t.exp - Date.now() : 0; }, set(t, sec) { store.set('tok', { t, exp: Date.now() + (sec || 3500) * 1000 }); }, clear() { store.set('tok', null); } };
let gisReady = null;
const loadGis = () => gisReady || (gisReady = new Promise((res, rej) => { const sc = document.createElement('script'); sc.src = 'https://accounts.google.com/gsi/client'; sc.onload = res; sc.onerror = () => rej(new Error('구글 로그인 도구를 불러오지 못했어요')); document.head.append(sc); }));
// interactive=false: 창을 띄우지 않고 가능한 경우에만 로그인
function googleLogin(interactive = true, force = false) {
  const c = store.get('connected', null);
  const cached = tokCache.get();
  if (cached && !interactive && !force) return Promise.resolve(cached);
  if (!IS_EXT) {
    if (!interactive) return Promise.reject(new Error('다시 로그인이 필요해요'));
    // Google 로그인은 등록된 https 주소에서만 됨
    const okOrigins = ['https://mail.jintar.co.kr', 'https://yoonjintar2-ctrl.github.io'];
    if (!okOrigins.includes(location.origin)) return Promise.reject(new Error(location.protocol !== 'https:' ? '보안 연결(https)이 아직 준비 중이에요. https://yoonjintar2-ctrl.github.io/mail/ 에서 연결해 주세요' : '이 주소에서는 로그인할 수 없어요 (' + location.origin + ')'));
    return loadGis().then(() => new Promise((res, rej) => {
      const tc = google.accounts.oauth2.initTokenClient({ client_id: CLIENT_ID, scope: SCOPE, hint: c && c.email || undefined,
        callback: r => r.access_token ? (tokCache.set(r.access_token, r.expires_in), store.set('tok-scope', r.scope || ''), res(r.access_token)) : rej(new Error(r.error || '로그인이 취소됐어요')),
        error_callback: e => rej(Object.assign(new Error(e && e.type === 'popup_closed' ? '로그인 창이 닫혔어요' : e && e.type === 'popup_failed_to_open' ? '로그인 창이 막혔어요' : (e && e.message) || '로그인 실패'), { type: e && e.type })) });
      tc.requestAccessToken({ prompt: c ? '' : 'select_account' });
    }));
  }
  return new Promise((res, rej) => {
    const p = { client_id: CLIENT_ID, response_type: 'token', redirect_uri: chrome.identity.getRedirectURL(), scope: SCOPE, prompt: interactive ? 'select_account' : 'none' };
    if (c && c.email) p.login_hint = c.email;
    chrome.identity.launchWebAuthFlow({ url: 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams(p), interactive }, r => {
      if (chrome.runtime.lastError) return rej(new Error(chrome.runtime.lastError.message));
      const h = new URLSearchParams((r || '').split('#')[1] || '');
      h.get('access_token') ? (tokCache.set(h.get('access_token'), +h.get('expires_in')), store.set('tok-scope', h.get('scope') || ''), res(h.get('access_token'))) : rej(new Error(h.get('error') || '로그인이 취소됐어요'));
    });
  });
}
/* ───────── 로그인 자동 연장 ─────────
   Google 로그인은 1시간짜리. 끝나기 5분 전부터는 '다음 클릭' 때 새로 받음 → 이미 허락한 계정이라 작은 창이 잠깐 떴다 바로 닫힘.
   (클릭 없이 창을 띄우면 크롬이 막고 주소창에 '팝업 차단' 표시가 생기므로, 웹에서는 늘 클릭할 때만)
   확장 프로그램 안에서는 창 없이 조용히 연장. 쓰던 화면·작성 내용은 그대로 */
const auth = { p: null, needClick: false, waiters: [] };
function renewToken() {
  if (auth.p) return auth.p;
  auth.p = (IS_EXT ? googleLogin(false, true).catch(() => googleLogin(true, true)) : googleLogin(true, true))
    .then(t => { real.token = t; real.expired = false; auth.needClick = false; auth.waiters.splice(0).forEach(w => w(t)); renderTop(); return t; })
    .finally(() => { auth.p = null; });
  return auth.p;
}
// 지금 쓸 토큰: 같은 브라우저의 다른 JIN-mail 탭이 새로 받아 둔 게 있으면 그것 (탭마다 따로 다시 로그인하지 않게)
function curTok() { const t = tokCache.get(); if (t && t !== real.token) { real.token = t; if (real.expired || auth.needClick) { real.expired = false; auth.needClick = false; auth.waiters.splice(0).forEach(w => w(t)); renderTop(); } } return real.token; }
// 다른 탭에서 로그인을 연장하면 이 탭도 바로 이어서 (기다리던 요청 재개)
window.addEventListener('storage', e => { if (e.key === 'jin-tok' && real.on) curTok(); });
// 401(만료)을 받았을 때: 연장해 보고, 안 되면 다음 클릭까지 기다렸다가 이어서 진행
function tokenAfter401() {
  // 다른 탭이 이미 새 토큰을 받아 뒀으면 지우지 말고 그걸로 (예전엔 오래된 탭 하나가 401을 받으면 모든 탭의 로그인이 풀렸음)
  const stored = tokCache.get(); if (stored && stored !== real.token) { real.token = stored; return Promise.resolve(stored); }
  tokCache.clear();
  const tryNow = IS_EXT ? renewToken() : Promise.reject(new Error('click'));
  return tryNow.catch(e => {
    auth.needClick = true; real.expired = true; renderTop();
    toast('로그인을 이어가려면 화면 아무 곳이나 한 번 눌러 주세요');
    return new Promise(res => auth.waiters.push(res));
  });
}
const authGesture = () => { if (auth.needClick && !auth.p) renewToken().catch(() => {}); };
['pointerdown', 'keydown'].forEach(ev => document.addEventListener(ev, authGesture, true));
setInterval(() => {
  if (!real.on || auth.p || auth.needClick) return;
  if (tokCache.left() < 6 * 60000) { if (IS_EXT) renewToken().catch(() => { auth.needClick = true; }); else auth.needClick = true; }  // 웹: 다음 클릭 때 연장 (표시 없이)
}, 60000);
/* ───────── 실제 Gmail 메일 불러오기 · 바뀐 내용 Gmail에 반영 ───────── */
const real = { on: false, token: null };
// Gmail 사용량 한도(사용자당 1분 15,000) 안에서 천천히: 뒤에서 받아 오기는 1초 100까지, 사용자가 누른 동작은 바로
const quota = { win: [] };
const unitsOf = (path, method) => /batchModify/.test(path) ? 50 : /^settings\/filters/.test(path) ? (method && method !== 'GET' ? 5 : 1) : /^labels/.test(path) ? 1 : 5;
async function takeQuota(units, bg) {
  if (!bg) quota.fg = (quota.fg || 0) + 1;
  try { for (;;) {
    if (bg && (quota.fg > 0 || quota.hold || Date.now() < (quota.cool || 0))) { await new Promise(z => setTimeout(z, 300)); continue; }
    const now = Date.now(); quota.win = quota.win.filter(x => now - x[0] < 1000);
    const used = quota.win.reduce((a, x) => a + x[1], 0), cap = bg ? 40 : 220;
    if (used + units <= cap) { quota.win.push([now, units]); return; }
    await new Promise(z => setTimeout(z, 120));
  } } finally { if (!bg) setTimeout(() => { quota.fg--; }, 600); }
}
async function gapi(path, opt, tries) {
  opt = opt || {}; tries = tries || 0;
  await takeQuota(unitsOf(path, opt.method), opt.bg);
  const r = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/' + path, { method: opt.method || 'GET', headers: Object.assign({ Authorization: 'Bearer ' + curTok() }, opt.body ? { 'Content-Type': 'application/json' } : {}), body: opt.body ? JSON.stringify(opt.body) : undefined });
  if (r.status === 401 && !opt.reauth) { await tokenAfter401(); return gapi(path, Object.assign({}, opt, { reauth: true }), tries); }
  if (r.status === 401) { real.expired = true; renderTop(); throw new Error('로그인이 만료됐어요. 위쪽 표시를 눌러 다시 연결해 주세요'); }
  if (r.status === 429) quota.cool = Date.now() + 30000;
  if ((r.status === 429 || r.status >= 500) && tries < 4) { await new Promise(z => setTimeout(z, 800 * 2 ** tries + Math.random() * 400)); return gapi(path, opt, tries + 1); }
  if (!r.ok) {
    let msg = 'Gmail ' + r.status, reason = '';
    try { const j = (await r.json()).error; msg += ': ' + j.message; reason = ((j.errors || [])[0] || {}).reason || j.status || ''; } catch (e) { /* */ }
    // 403 사용량 초과 → 잠깐 쉬었다 다시 (최대 약 1분)
    if (r.status === 403 && /quota|rate ?limit|RESOURCE_EXHAUSTED/i.test(msg + reason)) quota.cool = Date.now() + 30000;
    if (r.status === 403 && /quota|rate ?limit|RESOURCE_EXHAUSTED/i.test(msg + reason) && tries < 6) { real.prog = real.prog || ''; await new Promise(z => setTimeout(z, 4000 * (tries + 1))); return gapi(path, opt, tries + 1); }
    const err = new Error(msg); err.status = r.status; err.reason = reason; throw err;
  }
  return r.status === 204 ? {} : r.json().catch(() => ({}));
}
// 화면에서 바꾼 것을 Gmail에도 반영 (실패하면 알림)
function sync(label, job) { if (!real.on) return Promise.resolve(); return job().catch(e => { toast(`Gmail 반영 실패 (${label}): ${e.message}`); throw e; }); }
const gidsOf = ids => ids.map(id => (MAILS.find(m => m.id === id) || {}).gid).filter(Boolean);
// 읽음·이동은 JIN-mail 기록에만 (Gmail은 바꾸지 않음)
const syncLabels = (ids, add, remove) => { ids.forEach(id => { const m = MAILS.find(x => x.id === id); if (!m) return;
    const p = {}; if (add.includes('UNREAD')) p.u = 1; if (remove.includes('UNREAD')) p.u = 0; if (add.includes('INBOX')) p.i = 1; if (remove.includes('INBOX')) p.i = 0;
    const nb = add.find(x => x !== 'UNREAD' && x !== 'INBOX'); if (nb) p.b = nb; jSet(m, p); }); return Promise.resolve(); };
const labelPath = id => { const out = []; let b = boxById(id); while (b) { out.unshift(b.name); b = boxById(b.parent); } return out.join('/'); };
const FT_OF = { xls: 'XLS', xlsx: 'XLS', csv: 'XLS', ppt: 'PPT', pptx: 'PPT', pdf: 'PDF', doc: 'DOC', docx: 'DOC', hwp: 'DOC', hwpx: 'DOC', jpg: 'IMG', jpeg: 'IMG', png: 'IMG', gif: 'IMG', webp: 'IMG', bmp: 'IMG', zip: 'ZIP', '7z': 'ZIP', rar: 'ZIP' };
const b64bytes = s => { const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/')); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; };
const b64text = s => new TextDecoder().decode(b64bytes(s));
function parsePeople(str) {
  const out = []; if (!str) return out;
  const re = /(?:"?([^"<,]*?)"?\s*<([^>]+)>)|([^\s,<>"]+@[^\s,<>"]+)/g; let m;
  while ((m = re.exec(str))) { const email = (m[2] || m[3]).trim().toLowerCase(); const name = (m[1] || '').replace(/[\u200b-\u200f\u2060\ufeff]/g, '').trim().replace(/^'|'$/g, ''); out.push({ name: name || email.split('@')[0], email }); }
  return out;
}
const decodeEnt = t => { const d = document.createElement('textarea'); d.innerHTML = t || ''; return d.value; };
// full=true: 본문까지 / false: 목록용(머리글·첨부 목록·미리보기 한 줄)
function parseMsg(g, full) {
  const H = {}; (g.payload.headers || []).forEach(h => { H[h.name.toLowerCase()] = h.value; });
  let plain = '', html = ''; const parts = [];
  const walk = (p, parent) => {
    const ph = {}; (p.headers || []).forEach(h => { ph[h.name.toLowerCase()] = h.value; });
    if ((p.filename || (ph['content-id'] && /^image\//.test(p.mimeType))) && p.body && (p.body.attachmentId || p.body.data)) parts.push({ p, cid: (ph['content-id'] || '').replace(/[<>]/g, ''), disp: ph['content-disposition'] || '', related: parent === 'multipart/related' });
    else if (p.mimeType === 'text/plain' && p.body && p.body.data && !plain) plain = b64text(p.body.data);
    else if (p.mimeType === 'text/html' && p.body && p.body.data && !html) html = b64text(p.body.data);
    (p.parts || []).forEach(c => walk(c, p.mimeType));
  };
  walk(g.payload, '');
  // 본문 안에만 들어간 그림(서명 로고 등) = inline → 첨부 표시에서 뺌
  const att = parts.map(({ p, cid, disp, related }) => {
    if (!p.filename) p = Object.assign({}, p, { filename: 'image.' + ((p.mimeType.split('/')[1] || 'png').replace('jpeg', 'jpg')) });
    const ext = (p.filename.split('.').pop() || '').toLowerCase();
    const img = /^image\//.test(p.mimeType);
    const inline = full && html ? (!!cid && html.includes('cid:' + cid)) || (img && /^\s*inline/i.test(disp)) : img && (/^\s*inline/i.test(disp) || (!!cid && related));
    return [FT_OF[ext] || 'FILE', p.filename, fmtSize(p.body.size || 0), { id: p.body.attachmentId, data: p.body.data, size: p.body.size || 0, mime: p.mimeType, msg: g.id, cid, inline, bytes: p.body.size || 0 }];
  });
  if (!plain && html) plain = new DOMParser().parseFromString(html, 'text/html').body.innerText || '';
  const when = new Date(+g.internalDate);
  return { labels: g.labelIds || null, gid: g.id, threadId: g.threadId, msgId: H['message-id'] || '', refs: H['references'] || '', when: +when, from: parsePeople(H.from)[0] || { name: '(알 수 없음)', email: '' }, to: parsePeople(H.to), cc: parsePeople(H.cc),
    replyTo: parsePeople(H['reply-to'])[0] || null,
    subj: H.subject || '(제목 없음)', snippet: decodeEnt(g.snippet), body: full ? plain.replace(/\r/g, '').trim() : '', html: full ? html : '', att, full: !!full };
}
/* ───────── JIN-mail 자체 기록 (Gmail과 별개) ─────────
   메일마다 { b: 편지함, i: 받은편지함에 있음, u: 안 읽음, d: 삭제 } 를 JIN-mail이 따로 기억.
   처음 한 번은 그때의 Gmail 라벨 상태를 복사해 오고, 이후로는 Gmail을 따라가지도, 바꾸지도 않음.
   저장: 내 Google 드라이브의 숨은 앱 공간(jin-mail.json) + 이 PC 사본 */
const J = { data: null, fileId: null, t: null };
const DRIVE = 'https://www.googleapis.com/drive/v3', DRIVE_UP = 'https://www.googleapis.com/upload/drive/v3';
async function dfetch(url, opt, again) {
  opt = opt || {};
  const r = await fetch(url, Object.assign({}, opt, { headers: Object.assign({ Authorization: 'Bearer ' + curTok() }, opt.headers || {}) }));
  if (r.status === 401 && !again) { await tokenAfter401(); return dfetch(url, opt, true); }
  if (r.status === 401) { real.expired = true; renderTop(); throw new Error('로그인이 만료됐어요'); }
  if (!r.ok) { let msg = 'Drive ' + r.status; try { msg += ': ' + (await r.json()).error.message; } catch (e) { /* */ } const e = new Error(msg); e.status = r.status; throw e; }
  return r;
}
async function jLoad() {
  const local = store.get('jstate-' + ME.email, null);
  let remote = null;
  const l = await (await dfetch(`${DRIVE}/files?spaces=appDataFolder&fields=files(id,modifiedTime)&q=${encodeURIComponent("name='jin-mail.json'")}`)).json();
  if (l.files && l.files[0]) { J.fileId = l.files[0].id; remote = await (await dfetch(`${DRIVE}/files/${J.fileId}?alt=media`)).json(); }
  J.data = local && (!remote || (local.savedAt || 0) > (remote.savedAt || 0)) ? local : remote;
  if (J.data && J.data === local && remote) jSave();  // 이 PC 쪽이 더 최신이면 드라이브에 올림
  if (J.data) { J.data.m = J.data.m || {}; J.data.rules = J.data.rules || []; }
  return !!J.data;
}
function jSave() {
  if (!J.data) return; J.data.savedAt = Date.now();
  try { store.set('jstate-' + ME.email, J.data); } catch (e) { /* */ }
  clearTimeout(J.t); J.t = setTimeout(jUpload, 2000);
}
async function jUpload() {
  try {
    const body = JSON.stringify(J.data);
    if (J.fileId) await dfetch(`${DRIVE_UP}/files/${J.fileId}?uploadType=media`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body });
    else {
      const b = boundary(); const mp = `--${b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify({ name: 'jin-mail.json', parents: ['appDataFolder'] })}\r\n--${b}\r\nContent-Type: application/json\r\n\r\n${body}\r\n--${b}--`;
      J.fileId = (await (await dfetch(`${DRIVE_UP}/files?uploadType=multipart&fields=id`, { method: 'POST', headers: { 'Content-Type': `multipart/related; boundary=${b}` }, body: mp })).json()).id;
    }
  } catch (e) { toast('편지함 정보를 드라이브에 저장하지 못했어요 (이 PC에는 저장됨): ' + e.message); }
}
window.addEventListener('pagehide', () => { if (J.t) { clearTimeout(J.t); jUpload(); } });
function jSet(m, patch) {
  if (!real.on || !J.data || !m || !m.gid) return;
  const r = J.data.m[m.gid] || (J.data.m[m.gid] = { b: m.box || '', i: m.inbox ? 1 : 0, u: m.unread ? 1 : 0, d: m.deleted ? 1 : 0 });
  Object.assign(r, patch); jSave();
}
// 목록용 데이터 → 화면용 메일 (편지함·읽음·삭제는 JIN-mail 기록에서)
function toMail(meta, lab) {
  const when = new Date(meta.when), day = new Date(when); day.setHours(0, 0, 0, 0);
  const g = meta.gid, sent = lab.sent.has(g);
  const m = Object.assign({}, meta, { id: real.num(g), real: true, d: Math.max(0, Math.round((TODAY - day) / 86400000)), t: when.toTimeString().slice(0, 5), prev: [], draft: null, sent: sent ? 1 : 0 });
  if (isMe(m.from)) m.from = ME;
  let r = J.data && J.data.m[g];
  if (!r) {
    // 내가 보낸 메일은 받는사람에 내가 있어도(그룹 주소 포함) 받은 메일로 치지 않음 → 보낸편지함에만
    const mine = isMe(meta.from), isNew = !J.data || meta.when > J.data.initAt, received = !mine && (!sent || lab.inbox.has(g));
    let b = isNew ? '' : (lab.box.get(g) || ''), i = isNew ? (received ? 1 : 0) : (lab.inbox.has(g) ? 1 : 0);
    // 새로 들어온 메일엔 JIN-mail 자동 분류 규칙 적용
    if (isNew && received && J.data) { const rule = (J.data.rules || []).find(x => ruleHit(m, x)); if (rule) { b = rule.box; if (rule.skipInbox) i = 0; } }
    r = { b, i, u: !sent && lab.unread.has(g) ? 1 : 0, d: 0 };
    if (real.labReady && J.data) { J.data.m[g] = r; J.dirty = true; }
  }
  return Object.assign(m, { box: r.b || null, inbox: isMe(m.from) ? 0 : r.i, unread: isMe(m.from) ? 0 : r.u, deleted: r.d });
}
// 이 브라우저 안의 저장소(IndexedDB) — 한 번 받은 목록은 다음부터 다시 안 받음
function cacheDb() {
  if (real.db) return Promise.resolve(real.db);
  return new Promise(res => { try {
    const rq = indexedDB.open('jin-cache-' + ME.email, 2);
    rq.onupgradeneeded = () => { const d = rq.result; ['meta', 'text', 'full'].forEach(n => { if (!d.objectStoreNames.contains(n)) d.createObjectStore(n, { keyPath: 'gid' }); }); };
    rq.onsuccess = () => { real.db = rq.result; res(rq.result); }; rq.onerror = () => res(null);
  } catch (e) { res(null); } });
}
const idbAll = (db, store) => new Promise(res => { if (!db) return res([]); try { const r = db.transaction(store).objectStore(store).getAll(); r.onsuccess = () => res(r.result || []); r.onerror = () => res([]); } catch (e) { res([]); } });
const idbGet = (db, store, key) => new Promise(res => { if (!db) return res(null); try { const r = db.transaction(store).objectStore(store).get(key); r.onsuccess = () => res(r.result || null); r.onerror = () => res(null); } catch (e) { res(null); } });
const idbPut = (db, store, val) => { if (!db) return; try { db.transaction(store, 'readwrite').objectStore(store).put(val); } catch (e) { /* 저장 공간 부족 등은 무시 */ } };
const stripAttData = att => att.map(a => [a[0], a[1], a[2], Object.assign({}, a[3], { data: undefined })]);
// 본문을 PC에 저장 (검색용 글자는 따로 → 시작할 때 한꺼번에 불러와 전체 본문 검색)
function saveFull(m) {
  if (!real.db || !m.full) return;
  idbPut(real.db, 'text', { gid: m.gid, t: (m.body || '').slice(0, 20000) });
  idbPut(real.db, 'full', { gid: m.gid, threadId: m.threadId, msgId: m.msgId, refs: m.refs, body: m.body, html: (m.html || '').length < 600000 ? m.html : '', htmlReady: m.htmlReady && m.htmlReady.length < 3000000 ? m.htmlReady : null, att: stripAttData(m.att) });
  if (real.texts) real.texts.set(m.gid, (m.body || '').slice(0, 20000));
}
const cacheAll = db => new Promise(res => { if (!db) return res([]); try { const r = db.transaction('meta').objectStore('meta').getAll(); r.onsuccess = () => res(r.result || []); r.onerror = () => res([]); } catch (e) { res([]); } });
const cachePut = (db, list) => { if (!db || !list.length) return; try { const tx = db.transaction('meta', 'readwrite'); const os = tx.objectStore('meta'); list.forEach(x => os.put(Object.assign({}, x, { body: '', html: '', full: false, att: x.att.map(a => [a[0], a[1], a[2], Object.assign({}, a[3], { data: undefined })]) }))); } catch (e) { /* 저장 실패는 무시 */ } };
async function listIds(q, label) {
  const out = []; let tok = '';
  do { const r = await gapi(`messages?maxResults=500&q=${encodeURIComponent(q)}${label ? '&labelIds=' + label : ''}${tok ? '&pageToken=' + tok : ''}`, { bg: !!real.on }  /* 첫 화면 전에는 우선 처리 */); (r.messages || []).forEach(x => out.push(x.id)); tok = r.nextPageToken || ''; } while (tok);
  return out;
}
const META_FIELDS = 'id,threadId,labelIds,internalDate,snippet,payload(mimeType,headers,parts(mimeType,filename,headers,body(attachmentId,size),parts(mimeType,filename,headers,body(attachmentId,size),parts(mimeType,filename,headers,body(attachmentId,size),parts(mimeType,filename,headers,body(attachmentId,size))))))';
const DAYS = 92;  // 최근 3개월
// 최신 메일부터 화면에 먼저 보여 주고, 나머지는 뒤에서 차차 받아 옴
async function loadReal(interactive, token) {
  if (real.loading) return; real.loading = true; const gen = real.gen = (real.gen || 0) + 1;
  const prog = t => { real.prog = t; renderTop(); const bm = $('#bootMsg'); if (bm && t) bm.textContent = t; };
  try {
    if (!token && !interactive) { const sc = store.get('tok-scope', null); if (sc != null && !sc.includes('drive.appdata')) { tokCache.clear(); throw Object.assign(new Error('JIN-mail이 Gmail을 바꾸지 않도록 권한을 바꿨어요. 한 번만 다시 연결해 주세요'), { relogin: true }); } }
    real.token = token || await googleLogin(interactive); real.expired = false;
    prog('Gmail 연결 중…');
    const [prof, labs] = await Promise.all([gapi('profile'), gapi('labels')]);
    ME.email = prof.emailAddress.toLowerCase();
    // 내 이름: Gmail '보내는 사람' 설정의 이름 → 없으면 저장해 둔 이름 → 주소 앞부분 (보내는 메일의 From 이름에 쓰임)
    const cn = store.get('connected', null) || {};
    ME.name = (cn.email === prof.emailAddress && cn.name) || prof.emailAddress.split('@')[0];
    try { const sa = await gapi('settings/sendAs'); const pr = (sa.sendAs || []).find(x => x.isPrimary) || (sa.sendAs || [])[0]; if (pr && pr.displayName) { ME.name = pr.displayName; store.set('connected', Object.assign({}, cn, { email: prof.emailAddress, name: pr.displayName })); } } catch (e) { /* 못 읽으면 보낸 메일에서 찾음 */ }
    real.ids = real.ids || new Map(); real.num = g => { if (!real.ids.has(g)) real.ids.set(g, real.ids.size + 1); return real.ids.get(g); };
    // JIN-mail 편지함·분류 기록 (드라이브 숨은 앱 공간). 처음이면 지금의 Gmail 라벨 구조를 한 번만 복사
    prog('JIN-mail 편지함 불러오는 중…');
    const hasJ = await jLoad();
    const user = (labs.labels || []).filter(l => l.type === 'user').sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    const byName = new Map(user.map(l => [l.name, l.id]));
    if (!hasJ) {
      const hid = new Set(store.get('real-hidden', []));
      J.data = { v: 1, initAt: Date.now(), boxes: user.map(l => { const k = l.name.lastIndexOf('/'); return { id: l.id, name: k < 0 ? l.name : l.name.slice(k + 1), parent: k < 0 ? null : (byName.get(l.name.slice(0, k)) || null), hidden: hid.has(l.id) }; }), m: {}, rules: [] };
    }
    BOXES = J.data.boxes.map(b => Object.assign({}, b));
    real.labReady = false;
    const db = await cacheDb(); const cached = new Map((await cacheAll(db)).map(x => [x.gid, x]));
    real.texts = new Map((await idbAll(db, 'text')).map(x => [x.gid, x.t]));
    try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { /* */ }
    const metas = new Map(); const lab = { inbox: new Set(), sent: new Set(), unread: new Set(), box: new Map() };
    real.lab = lab;
    // 예전에 뒤에서 받아 둔 3개월 이전 메일 (라벨 정보 lb를 함께 저장해 둠)
    const labFrom = x => { if (!x.lb) return; const L = new Set(x.lb); if (L.has('INBOX')) lab.inbox.add(x.gid); if (L.has('SENT')) lab.sent.add(x.gid); if (L.has('UNREAD')) lab.unread.add(x.gid); const u = x.lb.find(id => /^Label_/.test(id)); if (u && !lab.box.has(x.gid)) lab.box.set(x.gid, u); };
    const oldCut = Date.now() - DAYS * 86400000;
    cached.forEach(x => { if (x.when < oldCut) { metas.set(x.gid, x); labFrom(x); } });
    const first = !real.on;
    const show = () => {
      const keepFull = new Map(MAILS.filter(m => m.real && m.full).map(m => [m.gid, m]));
      MAILS = [...metas.values()].map(x => { const k = keepFull.get(x.gid); return toMail(k ? Object.assign({}, x, { body: k.body, html: k.html, htmlReady: k.htmlReady, att: k.att, full: true }) : Object.assign({}, x, { body: real.texts.get(x.gid) || '' }), lab); }).sort((a, b) => b.when - a.when);
      applyReplyDrafts();
      if (first && !real.on) { real.on = true; st.folder = 'inbox'; st.open = null; st.picked.clear(); }
      if (J.dirty) { J.dirty = false; jSave(); }
      bootScreen('off'); renderNav(); renderList(); renderTop();
      if (st.open == null) { const f = visible()[0]; if (f) openMail(f.id); } else renderRead();
    };
    const fetchMetas = async (ids, label, withLabels) => {
      const need = ids.filter(g => !metas.has(g));
      need.forEach(g => { if (cached.has(g)) metas.set(g, cached.get(g)); });
      const todo = need.filter(g => !metas.has(g)); let i = 0, done = 0, buf = [];
      await Promise.all(Array.from({ length: 8 }, async () => {
        while (i < todo.length) {
          const g = todo[i++];
          try { const raw = await gapi(`messages/${g}?format=full&fields=${encodeURIComponent(META_FIELDS + (withLabels ? ',labelIds' : ''))}`, { bg: !!real.on }  /* 첫 화면 전에는 우선 처리 */); const x = parseMsg(raw, false); if (withLabels) { x.lb = raw.labelIds || []; labFrom(x); } metas.set(g, x); buf.push(x); } catch (e) { if (/로그인이 만료/.test(e.message)) throw e; /* 한 통 실패는 건너뜀 */ }
          done++;
          if (done % 50 === 0) { cachePut(db, buf); buf = []; prog(/옛날/.test(label) ? `옛날 메일 저장 중 · ${metas.size.toLocaleString()}통` : `${label} ${done}/${todo.length}`); if (Date.now() - (real.lastShow || 0) > 3000) { real.lastShow = Date.now(); show(); } }
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
      if (/newer_than:9/.test(q)) real.labReady = true;  // 3개월치 상태를 다 알았을 때부터 처음 본 메일을 기록
      const n = await fetchMetas(all, label);
      if (ME.name === ME.email.split('@')[0]) { const mine = snt.map(g => metas.get(g)).find(x => x && x.from && x.from.email && x.from.email.toLowerCase() === ME.email && x.from.name && x.from.name !== x.from.email); if (mine) { ME.name = mine.from.name; store.set('connected', Object.assign({}, store.get('connected', null) || {}, { name: ME.name })); } }
      show(); return [all.length, n];
    };
    await stage('newer_than:7d', '최근 메일 받는 중');
    // 편지함(라벨) 정보: 편지함마다 3개월치 번호만 (가벼움)
    prog('편지함 정리 중…');
    if (!hasJ || Object.keys(J.data.m).length === 0) { for (const l of user) { try { (await listIds(`newer_than:${DAYS}d`, l.id)).forEach(g => { if (!lab.box.has(g)) lab.box.set(g, l.id); }); } catch (e) { /* 건너뜀 */ } } }
    show();
    // 2단계: 나머지 3개월 — 뒤에서 차차
    const [total, fresh] = await stage(`newer_than:${DAYS}d`, '3개월치 메일 받는 중');
    prog('');
    toast(`${prof.emailAddress} · 최근 3개월 메일 ${total}통 준비 완료${fresh ? ` (새로 받은 ${fresh}통)` : ''}`);
    prefetchBodies();
    // 3단계: 3개월보다 옛날 메일 — 메모리 여유가 있을 때 조금씩 끌어와 이 PC에 저장
    const userIds = new Set(user.map(l => l.id));
    const addLab = x => { if (!x.labels) return; const L = x.labels; if (L.includes('INBOX')) lab.inbox.add(x.gid); if (L.includes('SENT')) lab.sent.add(x.gid); if (L.includes('UNREAD')) lab.unread.add(x.gid); if (!lab.box.has(x.gid)) { const b = L.find(id => userIds.has(id)); if (b) lab.box.set(x.gid, b); } };
    const cut = Date.now() - DAYS * 86400000;
    cached.forEach((x, g) => { if (!metas.has(g) && x.when < cut) { metas.set(g, x); addLab(x); } });
    if (metas.size) show();
    loadOlder(async () => {
      if (!real.on || real.expired) return 'stop';
      let oldest = Infinity; metas.forEach(x => { if (x.when < oldest) oldest = x.when; });
      if (!isFinite(oldest)) return 'stop';
      const r = await gapi(`messages?maxResults=200&q=${encodeURIComponent('before:' + Math.floor(oldest / 1000))}`, { bg: true });
      const ids = (r.messages || []).map(x => x.id).filter(g => !metas.has(g));
      if (!ids.length) return 'done';
      await fetchMetas(ids, '옛날 메일 받는 중');
      ids.forEach(g => { const x = metas.get(g); if (x) addLab(x); });
      real.lastShow = Date.now(); show(); prefetchBodies();
      return metas.size;
    });
  } catch (err) {
    if (/Drive 403/.test(err.message) && /insufficient|scope/i.test(err.message)) { tokCache.clear(); err.message = 'JIN-mail이 Gmail을 바꾸지 않도록 권한을 바꿨어요. 한 번만 다시 연결해 주세요'; }
    if (/accessNotConfigured|has not been used|is disabled/i.test(err.message)) err.message = 'Google 드라이브 연결 준비가 아직 안 됐어요 (관리자 설정 중). 잠시 후 다시 시도해 주세요';
    real.expired = !real.on; prog(''); renderTop(); if (!real.on && $('#boot')) bootScreen('login', err.relogin || /권한을 바꿨어요/.test(err.message) ? err.message : '메일을 불러오지 못했어요: ' + err.message); else toast('실제 메일을 불러오지 못했어요: ' + err.message); }
  finally { real.loading = false; }
}
// 메모리(램) 여유 확인: 기기 메모리 4GB 이상 + 이 탭이 쓰는 메모리가 한도의 절반 아래일 때만
function memRoomy() {
  if (navigator.deviceMemory && navigator.deviceMemory < 4) return false;
  const pm = performance.memory; if (pm && pm.jsHeapSizeLimit && pm.usedJSHeapSize / pm.jsHeapSizeLimit > 0.5) return false;
  return MAILS.length < 30000;
}
// 옛날 메일을 200통씩, 사이사이 쉬어 가며 (메일 쓰는 동안 느려지지 않게)
async function loadOlder(step) {
  if (real.oldering) return; real.oldering = true;
  const doneKey = 'older-done-' + ME.email;
  if (navigator.locks && !loadOlder.locked) { real.oldering = false; return navigator.locks.request('jin-bg-older-' + ME.email, () => { loadOlder.locked = true; return loadOlder(step); }); }
  try {
    while (!store.get(doneKey, false)) {
      await new Promise(z => setTimeout(z, 15000));
      while (real.prefetching || real.loading || !memRoomy() || document.querySelector('#read.composing')) await new Promise(z => setTimeout(z, 20000));
      let r; try { r = await step(); } catch (e) { if (/로그인이 만료/.test(e.message)) break; await new Promise(z => setTimeout(z, 60000)); continue; }
      if (r === 'stop') break;
      if (r === 'done') { store.set(doneKey, true); real.prog = ''; renderTop(); break; }
    }
  } finally { real.oldering = false; }
}
async function prefetchBodies() {
  if (real.prefetching || !real.db) return;
  if (navigator.locks && !prefetchBodies.locked) { real.prefetching = true; return navigator.locks.request('jin-bg-body-' + ME.email, () => { prefetchBodies.locked = true; real.prefetching = false; return prefetchBodies(); }).finally(() => { prefetchBodies.locked = false; }); }
  real.prefetching = true;
  try {
    const todo = MAILS.filter(m => m.real && !real.texts.has(m.gid)).sort((a, b) => b.when - a.when).map(m => m.gid);
    let i = 0, done = 0;
    await Promise.all(Array.from({ length: 3 }, async () => {
      while (i < todo.length) {
        if (!memRoomy()) return;
        const g = todo[i++];
        try {
          const x = parseMsg(await gapi(`messages/${g}?format=full`, { bg: true }), true);
          const tmp = { gid: g, body: x.body, html: x.html, att: x.att, full: true }; saveFull(tmp);
          const m = MAILS.find(y => y.gid === g); if (m && !m.full) m.body = x.body;
        } catch (e) { if (/로그인이 만료/.test(e.message)) return; }
        done++; if (done % 25 === 0 || done === todo.length) { real.prog = done < todo.length ? `본문 저장 중 ${done}/${todo.length}` : ''; renderTop(); }
      }
    }));
  } finally { real.prefetching = false; real.prog = ''; renderTop(); }
}
// 메일을 열 때 본문 전체 받기
async function fetchFull(m) {
  if (!m || !m.real || m.full || m._loading) return;
  m._loading = true;
  try {
    const c = await idbGet(real.db, 'full', m.gid);
    if (c && (c.html || c.body)) Object.assign(m, { body: c.body, html: c.html, htmlReady: c.htmlReady || null, att: c.att, full: true }, c.msgId ? { threadId: c.threadId, msgId: c.msgId, refs: c.refs } : {});
    else { const x = parseMsg(await gapi(`messages/${m.gid}?format=full`), true); Object.assign(m, { body: x.body, html: x.html, att: x.att, full: true, threadId: x.threadId, msgId: x.msgId, refs: x.refs }); saveFull(m); }
  }
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
  m.htmlReady = h; if (m.real) saveFull(m);
  return h;
}

// 첨부 누르기 = 크롬 일반 다운로드 (다운로드 폴더에 저장, 크롬 우상단 다운로드 아이콘에 표시)
function openRealAtt(m, a) { downloadAtt(m, a); }
// 첨부 → 내 드라이브 'JIN-mail 첨부' 폴더에 저장 (드라이브 권한은 JIN-mail이 만든 파일만 다루는 drive.file)
async function driveFolder() {
  const k = 'drive-folder-' + ME.email, id = store.get(k, null);
  if (id) { try { const f = await (await dfetch(`${DRIVE}/files/${id}?fields=id,trashed`)).json(); if (!f.trashed) return id; } catch (e) { if (e.status !== 404) throw e; } }
  const l = await (await dfetch(`${DRIVE}/files?fields=files(id)&q=${encodeURIComponent("name='JIN-mail 첨부' and mimeType='application/vnd.google-apps.folder' and trashed=false")}`)).json();
  let fid = l.files && l.files[0] && l.files[0].id;
  if (!fid) fid = (await (await dfetch(`${DRIVE}/files?fields=id`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'JIN-mail 첨부', mimeType: 'application/vnd.google-apps.folder' }) })).json()).id;
  store.set(k, fid); return fid;
}
async function saveAttToDrive(m, i, btn) {
  if (!m) return; const a = m.att[i];
  if (!m.real) { toast(`'${a[1]}' 드라이브에 추가했어요 (예시 화면이라 실제로 올리지는 않아요)`); return; }
  if (APROG.has(m.id + ':' + i + ':drv')) return;
  const sk = 'drive-saved', saved = store.get(sk, {}), key = m.gid + ':' + a[1];
  const openLink = url => () => window.open(url, '_blank');
  if (saved[key]) { window.open(saved[key], '_blank'); return; }  // 이미 올린 첨부 → 드라이브에서 열기
  // 드라이브 권한이 아직 없으면 지금(클릭한 김에) 한 번 더 허락받기
  const sc = store.get('tok-scope', '') || '';
  if (!sc.includes('drive.file')) { try { real.token = await googleLogin(true); } catch (e) { toast('드라이브 권한을 받지 못했어요: ' + e.message); return; } }
  setAProg(m, i, 'drv', 0);
  try {
    const [blob, fid] = await Promise.all([attBlob(m, a, f => setAProg(m, i, 'drv', f == null ? null : f * 0.5)), driveFolder()]);
    const b = boundary(), meta = { name: a[1], parents: [fid], mimeType: blob.type || 'application/octet-stream', description: `JIN-mail · ${m.from.name || m.from.email} · ${m.subj}` };
    const body = new Blob([`--${b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(meta)}\r\n--${b}\r\nContent-Type: ${meta.mimeType}\r\n\r\n`, blob, `\r\n--${b}--`]);
    const f = await xhrUpload(`${DRIVE_UP}/files?uploadType=multipart&fields=id,webViewLink`, `multipart/related; boundary=${b}`, body, x => setAProg(m, i, 'drv', 0.5 + x * 0.5));
    const url = f.webViewLink || `https://drive.google.com/file/d/${f.id}/view`;
    saved[key] = url; store.set(sk, saved);
    toast(`'${a[1]}' 내 드라이브 > JIN-mail 첨부 폴더에 추가했어요`, openLink(url), '열기');
  } catch (e) { toast('드라이브에 올리지 못했어요: ' + e.message); }
  finally { setAProg(m, i, 'drv', false); }
}
// 올리는 진행률을 알 수 있게 XHR로 업로드
function xhrUpload(url, ctype, body, onProg) {
  return new Promise((res, rej) => {
    const x = new XMLHttpRequest(); x.open('POST', url); x.setRequestHeader('Authorization', 'Bearer ' + curTok()); x.setRequestHeader('Content-Type', ctype);
    x.upload.onprogress = e => { if (e.lengthComputable) onProg(e.loaded / e.total); };
    x.onload = () => {
      if (x.status === 401) { tokenAfter401(); return rej(new Error('로그인을 연장하는 중이에요. 잠시 뒤 다시 눌러 주세요')); }
      if (x.status < 200 || x.status >= 300) { let msg = 'Drive ' + x.status; try { msg += ': ' + JSON.parse(x.responseText).error.message; } catch (e) { /* */ } return rej(new Error(msg)); }
      try { res(JSON.parse(x.responseText)); } catch (e) { res({}); }
    };
    x.onerror = () => rej(new Error('네트워크 오류')); x.send(body);
  });
}
// 첨부 진행 상황 (도넛 게이지) — key: 메일:번호:종류(dl/drv)
const APROG = new Map();
const donut = f => f == null ? `<svg class="donut spin" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" class="dbg"/><circle cx="10" cy="10" r="7" class="dfg" stroke-dasharray="11 44"/></svg>`
  : `<svg class="donut" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" class="dbg"/><circle cx="10" cy="10" r="7" class="dfg" stroke-dasharray="${(Math.max(0.04, Math.min(1, f)) * 43.98).toFixed(1)} 44" transform="rotate(-90 10 10)"/></svg>`;
function attBtns(m, i, n) {
  const k = m.id + ':' + i, saved = m.real && (store.get('drive-saved', {}))[m.gid + ':' + n];
  const pd = APROG.get(k + ':dl'), pv = APROG.get(k + ':drv');
  return `<button class="attbtn attdl${pd !== undefined ? ' busy' : ''}" data-dl="${i}" title="내 PC에 다운로드">${pd !== undefined ? donut(pd) : ico('dl', 15)}</button>`
    + `<button class="attbtn attdrv${pv !== undefined ? ' busy' : ''}${saved ? ' done' : ''}" data-drv="${i}" title="${saved ? '드라이브에 추가됨 · 누르면 드라이브에서 열기' : '내 드라이브에 추가'}">${pv !== undefined ? donut(pv) : ico('drive', 15)}</button>`;
}
function setAProg(m, i, kind, f) {
  const key = m.id + ':' + i + ':' + kind;
  if (f === false) APROG.delete(key); else APROG.set(key, f);
  if (st.open !== m.id) return;
  const btn = $(`#view [data-${kind}="${i}"]`); if (!btn) return;
  const w = document.createElement('span'); w.innerHTML = attBtns(m, i, m.att[i][1]);
  btn.replaceWith(w.querySelector(`[data-${kind}]`));
}
// '176 KB' → 바이트 (진행률 계산용 대략값)
const sizeOf = a => (a[3] && a[3].size) || (m => m ? +m[1] * ({ B: 1, KB: 1024, MB: 1048576 }[m[2]]) : 0)(/([\d.]+)\s*(B|KB|MB)/.exec(a[2] || ''));
async function attBlob(m, a, onProg) {
  const meta = a[3]; let data = meta.data;
  if (!data) {
    if (!onProg) data = (await gapi(`messages/${m.gid || meta.msg}/attachments/${meta.id}`)).data;
    else {
      await takeQuota(5, false);
      const r = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.gid || meta.msg}/attachments/${meta.id}`, { headers: { Authorization: 'Bearer ' + curTok() } });
      if (r.status === 401) { await tokenAfter401(); return attBlob(m, a, onProg); }
      if (!r.ok || !r.body) data = (await gapi(`messages/${m.gid || meta.msg}/attachments/${meta.id}`)).data;
      else {
        const total = sizeOf(a) * 4 / 3 + 200, rd = r.body.getReader(), chunks = []; let got = 0;
        for (;;) { const { done, value } = await rd.read(); if (done) break; chunks.push(value); got += value.length; onProg(total > 300 ? Math.min(0.98, got / total) : null); }
        data = JSON.parse(new TextDecoder().decode(await new Blob(chunks).arrayBuffer())).data;
      }
    }
  }
  onProg && onProg(1);
  return new Blob([b64bytes(data)], { type: meta.mime || 'application/octet-stream' });
}
async function downloadAtt(m, a) {
  const i = m.att.indexOf(a);
  if (APROG.has(m.id + ':' + i + ':dl')) return;
  setAProg(m, i, 'dl', 0);
  try {
    const blob = await attBlob(m, a, f => setAProg(m, i, 'dl', f));
    const url = URL.createObjectURL(blob), ln = document.createElement('a'); ln.href = url; ln.download = a[1]; document.body.append(ln); ln.click(); ln.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    toast(`'${a[1]}' 다운로드 폴더에 받았어요`);
  } catch (e) { toast('내려받지 못했어요: ' + e.message); }
  finally { setAProg(m, i, 'dl', false); }
}
// 로딩·다시 로그인 화면 (예시 메일이 잠깐 보였다 바뀌는 것 방지)
function bootScreen(mode, msg) {
  let el = $('#boot');
  if (mode === 'off') { if (el && !el.classList.contains('out')) { el.classList.add('out'); setTimeout(() => el.remove(), 420); } return; }
  if (el && el.classList.contains('out')) { el.remove(); el = null; }
  if (!el) { el = document.createElement('div'); el.id = 'boot'; document.body.append(el); }
  const c = store.get('connected', null) || {};
  el.innerHTML = `<div class="bootbox">${mode === 'loading' ? '' : `<div class="logo">${ico('env', 44)}</div>`}<h2>JIN-mail</h2>${mode === 'loading'
    ? `<div class="envani"><svg viewBox="0 0 140 124" width="140" height="124" aria-hidden="true">
      <ellipse class="eshadow" cx="70" cy="114" rx="44" ry="5" fill="#d7dbe2"/>
      <g class="ebody">
        <path class="bf" d="M20 61Q20 52 29 52H111Q120 52 120 61L77 93Q70 97.5 63 93Z" fill="#dfe3e9" stroke="#5f6368" stroke-width="3.2" stroke-linejoin="round"/>
        <rect x="20" y="52" width="100" height="52" rx="8" fill="#e9ecf0" stroke="#5f6368" stroke-width="3.2"/>
        <clipPath id="envclip"><rect x="-40" y="-200" width="220" height="301"/></clipPath><g clip-path="url(#envclip)"><g class="letter"><rect x="37" y="40" width="66" height="56" rx="5" fill="#fff" stroke="#5f6368" stroke-width="3"/>
          <path class="ln l1" d="M47 53h46" stroke="#5f6368" stroke-width="3.2" stroke-linecap="round"/>
          <path class="ln l2" d="M47 63h46" stroke="#5f6368" stroke-width="3.2" stroke-linecap="round"/>
          <path class="ln l3" d="M47 73h28" stroke="#5f6368" stroke-width="3.2" stroke-linecap="round"/></g></g>
        <path d="M20 58L64 87Q70 90.5 76 87L120 58V96Q120 104 112 104H28Q20 104 20 96Z" fill="#f6f7f9" stroke="#5f6368" stroke-width="3.2" stroke-linejoin="round"/>
        <path d="M25 100L55 88M115 100L85 88" stroke="#5f6368" stroke-width="2.2" stroke-linecap="round"/>
        <path class="ff" d="M20 61Q20 52 29 52H111Q120 52 120 61L77 93Q70 97.5 63 93Z" fill="#e4e7ec" stroke="#5f6368" stroke-width="3.2" stroke-linejoin="round"/>
      </g></svg></div><p id="bootMsg">${esc(msg || 'Gmail에서 메일을 불러오는 중…')}</p>`
    : `<p>${esc(msg || (c.email ? c.email + ' 로그인이 만료됐어요' : 'Gmail 계정 연결이 필요해요'))}</p><button class="btn pri gbtn" id="bootGo">${ico('env', 18)} Gmail 다시 연결</button><button class="later" id="bootSample">예시 메일로 둘러보기</button>`}</div>`;
  const go = $('#bootGo', el); if (go) go.onclick = () => { bootScreen('loading'); loadReal(true); };
  const sm = $('#bootSample', el); if (sm) sm.onclick = () => { store.set('skip-connect', true); location.hash = ''; MAILS = SAMPLE_MAILS.slice(); BOXES = store.get('sample-boxes', DEFAULT_BOXES); real.expired = false; bootScreen('off'); renderTop(); renderNav(); renderList(); const f = visible()[0]; if (f) openMail(f.id); };
}
function openWelcome(force) {
  if (!force && (store.get('connected', null) || store.get('skip-connect', false))) return;
  const bg = document.createElement('div'); bg.className = 'modal-bg';
  bg.innerHTML = `<div class="modal welcome"><div class="logo">${ico('env', 48)}</div><h2>JIN-mail</h2><p>쓰던 Gmail 계정을 연결하면 바로 시작할 수 있어요.</p>
    <div class="steps"><div><span class="st" id="s1">1</span>Gmail 계정으로 로그인 (메일 읽기·정리 권한)</div><div><span class="st" id="s2">2</span>라벨을 편지함으로, 서명을 풋터로 가져오기</div><div><span class="st" id="s3">3</span>시작</div></div>
    <button class="btn pri gbtn" id="gConn">${ico('env', 18)} Gmail 계정 연결하기</button><div class="res" id="gRes"></div><button class="later" id="gLater">나중에 할게요 (예시 메일로 둘러보기)</button></div>`;
  document.body.append(bg);
  $('#gLater', bg).addEventListener('click', () => { store.set('skip-connect', true); bg.remove(); MAILS = SAMPLE_MAILS.slice(); BOXES = store.get('sample-boxes', DEFAULT_BOXES); renderNav(); renderList(); const f = visible()[0]; if (f) openMail(f.id); else renderRead(); });
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

/* ───────── 끌어서 놓기: 메일 → 편지함, 편지함 순서·위치 ───────── */
let drag = null;
function navDrop(e, el, doIt) {
  const id = el.dataset.box;
  if (drag.kind === 'mail') { if (el.dataset.sys === 'trash') return doIt ? trashMails(drag.ids) : 'in'; if (!id) return null; return doIt ? moveTo(drag.ids, id) : 'in'; }
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
  $('#fClear').addEventListener('click', () => { Object.assign(st.f, { from: null, to: null, att: { k: 'any', types: [] }, readf: 'all' }); renderTop(); renderList(); });
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
    if (e.target.closest('#addBox')) { const nb = { id: 'b' + Date.now(), name: '새 편지함', parent: null }; BOXES.push(nb); saveAll(); renderNav(); renameBox(nb.id); return; }
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
  rows.addEventListener('scroll', () => { if (rows.scrollTop + rows.clientHeight > rows.scrollHeight - 400 && visible().length > (st.limit || 200)) { st.limit = (st.limit || 200) + 200; const t = rows.scrollTop; renderList(); rows.scrollTop = t; } }, { passive: true });
  rows.addEventListener('click', e => {
    const cb = e.target.closest('[data-conv]'); if (cb) { e.stopPropagation(); openConv(+cb.dataset.conv); return; }
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
    const b = e.target.closest('[data-b]'); if (b && b.dataset.b === 'convclose') { closeConv(); return; } if (b && !b.disabled) bulk(b.dataset.b, b);
  });
  // 읽기
  $('#view').addEventListener('click', e => {
    const dlb = e.target.closest('[data-dl]'); if (dlb) { const m = MAILS.find(x => x.id === st.open); if (m) previewAtt(m, +dlb.dataset.dl); return; }
    const drv = e.target.closest('[data-drv]'); if (drv) { saveAttToDrive(MAILS.find(x => x.id === st.open), +drv.dataset.drv, drv); return; }
    const att = e.target.closest('.att[data-ai]'); if (att) { previewAtt(MAILS.find(x => x.id === st.open), +att.dataset.ai); return; }
    const b = e.target.closest('[data-act]'); if (!b) return;
    const act = b.dataset.act, m = MAILS.find(x => x.id === st.open);
    if (act === 'attmore') { st.attFull = st.attFull || new Set(); const bar = b.closest('.attbar'); const on = !bar.classList.contains('full'); bar.classList.toggle('full', on); on ? st.attFull.add(st.open) : st.attFull.delete(st.open); b.textContent = on ? '접기' : '펼치기'; return; }
    if (act === 'popview') { popView(st.open); return; }
    if (act === 'ppl') { const k = st.open + ':' + b.dataset.k; st.pplOpen = st.pplOpen === k ? null : k; renderRead(true); return; }
    if (act === 'attfull') { const bar = b.closest('.attbar'); const on = !bar.classList.contains('full'); bar.classList.toggle('full', on); st.attFull = on ? st.open : null; b.textContent = on ? '접기' : '펼치기'; return; }
    if (act === 'deldraft') { deleteDraft(m); return; }
    if (act === 'restore') { restoreMails([m.id]); return; }
    if (act === 'more') { menuAt(b, [{ html: ico('move', 16) + ' 다른 편지함으로 이동', act: () => setTimeout(() => moveMenu(b, [st.open])) }, { html: ico('read2', 16) + ' 안 읽음으로 표시', act: () => { m.unread = 1; renderNav(); renderList(); syncLabels([m.id], ['UNREAD'], [], '안 읽음'); } }, { html: ico('trash', 16) + ' 삭제', act: () => trashMails([m.id]) }]); return; }
    openCompose(act, document.body.classList.contains('popmode') ? { inline: true } : {});
  });
  // 작성
  fmtToolbar();
  $('#popBtn').innerHTML = ico('pop', 16) + ' 새 창';
  $('#closeC').innerHTML = ico('close', 16) + ' 닫기';
  $('#discard').innerHTML = ico('trash', 19);
  $('#send').addEventListener('click', async () => {
    const b = $('#send'); if (b.disabled) return; b.disabled = true;
    try {
      // 답장 연결 정보가 없으면(저장본에서 연 경우) 잠깐 받아 옴
      const o = MAILS.find(x => x.id === cs.mailId);
      if (o && o.real && !o.msgId && /reply|all|draft/.test(cs.kind)) { try { const g = await gapi(`messages/${o.gid}?format=metadata&metadataHeaders=Message-ID&metadataHeaders=References`); const H = {}; (g.payload.headers || []).forEach(h => { H[h.name.toLowerCase()] = h.value; }); Object.assign(o, { threadId: g.threadId, msgId: H['message-id'] || '', refs: H['references'] || '' }); } catch (e) { /* 연결 없이 새 대화로 */ } }
      await sendMail();
    } finally { b.disabled = false; }
  });
  $('#closeC').addEventListener('click', closeCompose);
  $('#discard').addEventListener('click', discardCompose);
  $('#popBtn').addEventListener('click', () => { flushCompose(); if (!popCompose(draftNow())) return; $('#read').classList.remove('composing'); renderRead(); });
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
    if (e.target.closest('#fColor')) { e.preventDefault(); paletteMenu($('#fColor'), PALETTE, null, c => { const run = () => { document.execCommand('styleWithCSS', false, true); document.execCommand('foreColor', false, c || '#000000'); }; if (!cellsDo(run)) { restoreSel(); run(); } $('#fColor .sw').style.background = c || '#000'; dirty(); }, '자동 (검정)'); return; }
    if (e.target.closest('#fHi')) { e.preventDefault(); paletteMenu($('#fHi'), PALETTE, null, c => { const run = () => { document.execCommand('styleWithCSS', false, true); document.execCommand('hiliteColor', false, c || 'transparent'); }; if (!cellsDo(run)) { restoreSel(); run(); } $('#fHi .sw').style.background = c || 'transparent'; dirty(); }, '색 없음'); }
  });
  $('#fFont').addEventListener('change', e => { const run = () => { document.execCommand('styleWithCSS', false, true); document.execCommand('fontName', false, e.target.value); }; if (!cellsDo(run)) { restoreSel(); run(); } dirty(); });
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
    // 탐색기에서 복사한 파일(그림이 아닌 것)을 붙여넣으면 첨부로
    const docs = [...cd.files].filter(f => !f.type.startsWith('image/'));
    if (docs.length && !hasText) { e.preventDefault(); addFiles(docs); return; }
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
  // 서식 복사/붙여넣기 (워드·아웃룩처럼): Ctrl+Shift+C → 커서 자리 글자 모양 복사, Ctrl+Shift+V → 선택한 글자에 입힘
  body.addEventListener('keydown', e => {
    if (!(e.ctrlKey || e.metaKey) || !e.shiftKey || e.altKey) return;
    if (e.code === 'KeyC') { e.preventDefault(); e.stopPropagation(); copyFormat(); }
    else if (e.code === 'KeyV' && fmtClip) { e.preventDefault(); e.stopPropagation(); pasteFormat(); }
  }, true);
  body.addEventListener('mousedown', e => { if (e.target.tagName === 'IMG' && !e.target.closest('.quote')) { e.preventDefault(); selectImg(e.target); } });
  document.addEventListener('mousedown', e => { if (selImg && e.target !== selImg && !e.target.closest('#imgsel')) { selImg = null; posImgSel(); } }, true);
  document.addEventListener('scroll', posImgSel, true);
  window.addEventListener('resize', posImgSel);
  body.addEventListener('input', () => { dirty(); runTypo(); });
  body.addEventListener('compositionend', runTypo);
  body.addEventListener('keyup', () => { runTypo(); syncFmt(); });
  body.addEventListener('mouseup', () => { syncFmt(); typoAtCaret(); });
  body.addEventListener('blur', () => setTimeout(() => { if ((!document.activeElement || !$('#cbody').contains(document.activeElement)) && !$('.modal.ask') && !$('.menu')) { const t = $('#tbar'); if (t && !t.matches(':hover')) t.remove(); $$('#cbody .tdsel').forEach(x => x.classList.remove('tdsel')); TS.cells = []; TS.multi = false; } }, 200));
  body.addEventListener('focus', () => setTimeout(tableBar));
  body.addEventListener('mouseup', () => setTimeout(tableBar));
  $('#subj').addEventListener('input', dirty);
  setupRcpt($('#toBox')); setupRcpt($('#ccBox')); setupRcpt($('#bccBox'));
  $('#bccTog').addEventListener('click', () => { showBcc(true); $('#bccBox input').focus(); });
  // 제목에서 Tab → 본문으로 (서식 막대를 거치지 않게)
  $('#subj').addEventListener('keydown', e => { if ((e.key === 'Tab' || (e.key === 'Enter' && !e.ctrlKey && !e.metaKey)) && !e.shiftKey && !e.isComposing) { e.preventDefault(); const mk = $('#gpCaret'); if (mk) caretAt(mk); else $('#cbody').focus(); } });
  document.addEventListener('mousedown', e => { if (!e.target.closest('.typo')) $$('.typo').forEach(x => x.remove()); });
  // 단축키: j/k 다음·이전, a 전체답장, f 전달, c 새 메일, / 검색, Esc 작성 닫기 (답장 r은 Ctrl+R 새로고침과 헷갈려서 없앰)
  // 작성 중 단축키: Ctrl+Enter 보내기(5초 안에 취소 가능), Ctrl+S 임시저장 (브라우저 '페이지 저장' 창 대신)
  document.addEventListener('keydown', e => {
    if (!$('#read').classList.contains('composing') || !(e.ctrlKey || e.metaKey) || e.altKey || e.isComposing) return;
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.stopPropagation(); $('#send').click(); }
    else if ((e.key === 's' || e.key === 'S') && !e.shiftKey) { e.preventDefault(); e.stopPropagation(); cs.saving = true; saveDraft(); toast('임시저장했어요'); }
  }, true);
  document.addEventListener('keydown', e => {
    if (e.target.closest('input, textarea, select, [contenteditable="true"]')) { if (e.key === 'Escape' && $('#read').classList.contains('composing') && !$('.menu')) closeCompose(); return; }
    if ($('.modal-bg')) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;  // Ctrl+R 새로고침 등 브라우저 단축키는 그대로
    const list = visible(); const i = list.findIndex(m => m.id === st.open);
    if (e.key === 'j' && list[i + 1]) openMail(list[i + 1].id);
    else if (e.key === 'k' && i > 0) openMail(list[i - 1].id);
    else if (st.open && /^[af]$/.test(e.key)) { e.preventDefault(); openCompose({ a: 'all', f: 'fwd' }[e.key], document.body.classList.contains('popmode') ? { inline: true } : {}); }
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
  // 연결된 계정이면 실제 보내기 모드 (예전엔 예시 화면으로 처리돼 보내지지 않던 문제)
  const c = store.get('connected', null);
  if (c && c.email && tokCache.get()) { real.on = true; real.token = tokCache.get(); ME.email = c.email.toLowerCase(); if (c.name) ME.name = c.name; real.num = real.num || (g => g); }
  let pd = null; try { pd = window.opener && window.opener.__jinPop; if (pd) window.opener.__jinPop = null; } catch (e) { pd = null; }
  loadDraft(pd || store.get('pop-draft', null) || buildDraft('new'));
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
  if (IS_EXT || tokCache.get()) { bootScreen('loading'); loadReal(false); }
  else { real.expired = true; renderTop(); bootScreen('login'); }
} else if (!store.get('skip-connect', false)) {
  MAILS = []; BOXES = []; renderNav(); renderList(); renderRead();
  openWelcome(false);
} else {
  renderList();
  const first = visible()[0]; if (first) openMail(first.id); else renderRead();
}
// 새 버전이 올라오면 알아서 적용 (홈페이지 캐시 때문에 옛 화면이 10분쯤 남는 것 방지). 메일을 쓰는 중이면 묻기
(function verCheck() {
  if (IS_EXT || location.protocol !== 'https:') return;
  const cur = ([...document.scripts].map(s => /mail-c\.js\?v=(\d+)/.exec(s.src)).find(Boolean) || [])[1];
  if (!cur) return;
  const check = async () => {
    try {
      const v = ((await (await fetch(location.pathname + '?vchk=' + Date.now(), { cache: 'no-store' })).text()).match(/mail-c\.js\?v=(\d+)/) || [])[1];
      if (!v || v === cur) return;
      const go = () => { flushCompose(); location.replace(location.pathname + '?v=' + v); };
      if ($('#read').classList.contains('composing') || cs.saving) toast('JIN-mail 새 버전이 있어요', go, '지금 적용');
      else go();
    } catch (e) { /* 다음에 다시 */ }
  };
  setTimeout(check, 4000); setInterval(check, 10 * 60000);
})();
