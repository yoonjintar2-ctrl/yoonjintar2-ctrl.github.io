# 베리 알럿 운영 메모

- 알림 통로: 우리 중계(jipsa-relay workers.dev /n/, ntfy 호환) 토픽 두 개(주소를 아는 사람만 읽고 쓸 수 있음)
  - 알럿: `berry-3059012bcc6b7db9-a` — 예약 작업(평일 09·11·14시)과 맥 크롬의 요청 대기 스크립트가 발행, 블랙베리 앱이 실시간 수신
  - 요청: `berry-3059012bcc6b7db9-r` — 블랙베리 "종목 찾기"(S 키)가 발행, 맥 크롬 토스 탭의 `__berryWatch()`가 받아 바로 검색
- `scanner.js`: 토스(tossinvest.com) 탭에서 eval. `__berryScan({slot})` → `window.__ALERT`, `__berryPublish(alert, tags)`, `__berryWatch()`
- 보유 종목: `../a/5543763cc4-pos.json` (since = 매수 시각. 손절 터치는 그 이후 1분봉 저가로만 판정)
- 앱 소스·서명키: 맥 바탕화면 `블랙베리 갖고 놀기/berryalert/` (같은 키로 빌드해야 업데이트 설치 가능)
- 규칙: 「국내 우량주 박스권 순환매 v1.3」 3장(단기 스윙). 주문 기능 없음.
