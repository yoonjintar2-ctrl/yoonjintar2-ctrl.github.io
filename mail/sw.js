// 지니메일 앱 서비스 워커: 화면 파일(글꼴·아이콘·버전 붙은 스크립트)을 이 PC에 저장해 두고 빠르게 열기
// 메일 내용·Gmail 요청은 다루지 않음 (다른 주소라 여기서 가로채지 않음)
const C = 'jin-app-v3';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  // 버전이 붙은 스크립트·글꼴·아이콘: 저장본 우선 (바뀌면 주소가 달라짐)
  if (/mail-c\.js\?v=|\/fonts\/|\/appicons\//.test(u.pathname + u.search)) {
    e.respondWith(caches.open(C).then(async c => { const hit = await c.match(e.request); if (hit) return hit; const r = await fetch(e.request); if (r.ok) c.put(e.request, r.clone()); return r; }));
    return;
  }
  // 첫 화면(HTML): 항상 새로 받되, 인터넷이 끊기면 저장본으로
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put('./', cp)); return r; }).catch(() => caches.match('./')));
  }
});
// 알림을 누르면 지니메일 창으로
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const d = e.notification.data || {}, id = d.id;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    // 메일 하나짜리 알림: 그 메일만 새 창(팝업)으로 열고, 큰 창에는 읽음 표시만 알려 줌
    if (d.url) { cs.forEach(w => w.postMessage({ type: 'jin-popped', id })); return self.clients.openWindow(d.url); }
    const w = cs[0]; if (w) { w.postMessage({ type: 'jin-open', id }); return w.focus(); }
    return self.clients.openWindow('./');
  }));
});
