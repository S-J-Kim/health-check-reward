# 이모지로 알아보는 오늘의 운세 — PRD (for Cursor/AIDE)

## 0. TL;DR
- 버튼 한 번 → 이모지 셔플 → 단 한 번의 오늘의 운세 공개 → 결과 이미지로 공유 🎉
- **로컬스토리지**로 1회 제한, **글래스모피즘 UI**, **폭죽 이펙트**, **외부 애니메이션 라이브러리 적극 활용**
- 기본 스택 제안: **React + Vite + TypeScript + TailwindCSS + Framer Motion + canvas-confetti + html2canvas**

---

## 1. 개요 (Overview)
- **제품명**: 이모지로 알아보는 오늘의 운세
- **목적**: 헬스체크 응답 구성원에게 감사/리워드 경험 제공 (재미, 가벼운 몰입, 공유성 강화)
- **플랫폼**: 웹(모바일 우선, 반응형)
- **핵심 컨셉**: 버튼 클릭 → 이모지 셔플 애니메이션 → 결과 이모지 + 메시지 노출(폭죽) → 이미지로 공유

### 1.1 목표 (Goals)
- **참여 유도**: 헬스체크 이후의 긍정적 경험 제공
- **바이럴성**: 공유 기능으로 조직 내 확산
- **낮은 진입장벽**: 계정/로그인/서버 의존도 없이 클라 사이드로 동작

### 1.2 비목표 (Non-goals)
- 점성 높은 사용자 계정/랭킹/히스토리 보관
- 개인 맞춤형 운세(데이터 기반) 고도화
- 서버 렌더 기반 OG 이미지 동적 생성(초기 스코프에서는 선택 사항)

---

## 2. 사용자 시나리오 (User Flow)
1. 사용자가 사이트 접속
2. “오늘의 운세 뽑기” 버튼 클릭
3. 이모지 셔플 애니메이션 진행
4. 랜덤 이모지 1개 선택 → 사전 매핑된 운세 메시지와 함께 노출
5. 결과 공개와 함께 폭죽 이펙트
6. “공유하기” 버튼으로 결과 이미지를 생성/공유

---

## 3. 요구사항 (Requirements)

### 3.1 기능 요구사항 (Functional)
1. **운세 뽑기 버튼 표시**: 첫 화면에 명확히 노출
2. **1회 제한**: 사용자는 **한 번만** 운세를 뽑을 수 있음  
   - 저장 방식: **LocalStorage** 이용 (`emojiFortune.drawn=true`, `emojiFortune.result={emoji,message,timestamp}`)
   - 새로고침/재방문 시에도 결과 그대로 재노출
3. **랜덤 셀렉션**: 균등 확률로 이모지 선택(초기 스코프에서는 가중치 미적용)
4. **이모지 셔플 애니메이션**: 버튼 클릭 후 셔플(가속 → 감속) 효과
5. **결과 공개 이펙트**: 폭죽(Confetti) 이펙트 발생
6. **공유 기능**: 결과 영역을 이미지(PNG)로 변환 후 공유  
   - 우선순위: **Web Share API**(`navigator.share`) → 불가 시 이미지 다운로드
7. **글래스모피즘 디자인**: 유리질감 카드, 블러 배경, 반투명 계열
8. **외부 라이브러리 허용**: 애니메이션/이펙트 목적의 라이브러리 사용 OK

### 3.2 비기능 요구사항 (Non-functional)
- **반응형**: 모바일 최적화, 데스크탑 대응
- **성능**: 60fps에 근접한 부드러운 애니메이션(중저가 폰에서도 무리 없음)
- **접근성**: `prefers-reduced-motion` 준수(애니메이션 최소화 옵션)
- **브랜딩**: 밝고 경쾌한 톤, 과하지 않은 효과
- **프라이버시**: 로컬스토리지 외 **서버/분석 로그에 결과 저장 없음**(기본 정책)

---

## 4. 기술 스택/의존성 (Tech)
- **React + TypeScript + Vite**
- **TailwindCSS**: 유틸리티 퍼스트 스타일링
- **Framer Motion**: 셔플 및 등장/퇴장 모션
- **canvas-confetti**: 폭죽 이펙트
- **html2canvas** 또는 **dom-to-image**: 결과 영역 캡처/이미지화
- **(옵션)** Satori/Vercel OG로 서버 사이드 OG 이미지 생성(후속 스코프)

> 참고 문서  
> - Web Share API (MDN): https://developer.mozilla.org/docs/Web/API/Navigator/share  
> - Framer Motion: https://www.framer.com/motion/  
> - canvas-confetti: https://www.npmjs.com/package/canvas-confetti  
> - html2canvas: https://html2canvas.hertzen.com/  
> - dom-to-image: https://github.com/tsayen/dom-to-image

---

## 5. UX/UI 명세 (Glassmorphism Tokens)
- **배경**: 그라디언트(예: `linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)`)
- **카드**: 반투명 `rgba(255,255,255,0.15)`, `backdrop-filter: blur(16px)`
- **테두리**: 1px solid `rgba(255,255,255,0.3)` + 라운드(20px 이상)
- **그림자**: soft shadow (`0 10px 30px rgba(0,0,0,0.15)`)
- **타이포**: 큰 제목(이모지 포함), 보조 텍스트는 대비 충분
- **버튼 상태**: hover/active/focus 명확히 구분, 탭 타겟 최소 44px

---

## 6. 애니메이션/이펙트 명세
- **셔플**: 1.2 ~ 1.8s, 초기 가속 → 중간 빠름 → 마지막 감속(EaseOut)  
  - 이모지 그리드/슬롯을 빠르게 순환하며 흐릿하게 보여주다 마지막에 포커싱
- **결과 공개**: 페이드-업 + 스케일 살짝(Pop) (0.4~0.6s)
- **폭죽**: 결과 노출 직후 1회, 화면 중앙과 양 사이드에서 날리는 패턴
- **Reduce Motion**: `prefers-reduced-motion`이면 셔플을 즉시 결과로 스킵, 폭죽 해제

---

## 7. 데이터 모델/스토리지
```ts
type FortuneItem = {
  emoji: string;
  message: string;
  tone?: 'positive' | 'neutral' | 'challenge';
};

type StoredResult = {
  emoji: string;
  message: string;
  drawnAt: string; // ISO
};

// LocalStorage Keys
// - 'emojiFortune.drawn' : 'true' | undefined
// - 'emojiFortune.result': StoredResult(JSON)
````

* 저장 시점: 결과 확정 직후
* 재방문 처리: `drawn===true`면 바로 결과 카드 렌더

---

## 8. 비즈니스 로직

* **랜덤**: `crypto.getRandomValues` 기반 난수로 인덱스 선택(가능 시), 폴백은 `Math.random`
* **1회 제한**: LocalStorage로 제어(초기 스펙은 기간 무제한)

  * (옵션) **모드 플래그**: `single-use`(기본) vs `daily`(날짜별 1회)

    * daily 모드시 `emojiFortune.lastDate=YYYY-MM-DD` 저장 후 당일만 허용

---

## 9. 공유 (Share) 설계

* **기본**: 결과 카드 DOM → `html2canvas` → PNG Blob →

  * **Web Share API** 가능 시 `navigator.share({ files: [file], text, title })`
  * 불가 시 **PNG 다운로드**(파일명 `fortune-YYYYMMDD.png`)
* **(옵션/후속)**: 공유 링크 미리보기(OG)

  * 서버/서버리스에서 이모지/문구를 파라미터로 받아 OG 이미지 생성
  * 초기 스코프에서는 링크 공유보다는 이미지 공유에 집중

---

## 10. 아키텍처 & 컴포넌트

* `<App>`: 라우팅/상태 게이트(이미 뽑음 vs 미뽑음)
* `<FortuneCard>`: 결과(이모지/메시지) 표시 + 공유 버튼
* `<DrawButton>`: CTA 버튼
* `<EmojiShuffler>`: 셔플 애니메이션 전용 뷰
* `<ConfettiController>`: 결과 시점에 confetti 트리거
* `storage.ts`: LocalStorage 래퍼(try/catch, JSON 직렬화)
* `fortuneMap.ts`: 이모지/메시지 매핑(별도 JSON/TS 모듈)

---

## 11. 텔레메트리 (선택)

* 이벤트: `click_draw`, `draw_completed`, `share_attempt`, `share_success`, `share_fallback_download`
* 속성: `emoji`, `tone`, `device`, `reducedMotion`
* (주의) 개인 데이터 비수집. 결과 자체를 서버로 전송하지 않음(기본 정책)

---

## 12. 접근성 & i18n

* 텍스트 대비 준수(AA 이상), 키보드 포커스 링 유지
* 버튼에 `aria-label` 제공
* 애니메이션 대체(문구 전환) 지원
* 다국어 확장 용이한 키-값 구조(초기: ko-KR 고정)

---

## 13. 성능/품질 기준

* 초기 로드 JS < 150KB(gzip) 목표
* 60fps 근접 애니메이션(저사양 폰에서 프레임 드랍 없도록)
* 캡처 이미지 생성 < 1.2s(중간급 디바이스 기준)
* Lighthouse 성능/접근성/베스트프랙티스/SEO 각각 90+ 목표(초기 배포 시)

---

## 14. 테스트 & 수용 기준 (Acceptance Criteria)

* [ ] 첫 진입 시 CTA 버튼 노출, 클릭 시 셔플 시작
* [ ] 셔플 후 결과 이모지 1개와 메시지 노출
* [ ] 결과 공개 시 confetti 1회 발생(기기 설정으로 reduce-motion이면 미발생)
* [ ] LocalStorage 저장 확인(새로고침해도 동일 결과 표시)
* [ ] 두 번째 시도 시 버튼 비활성/숨김 및 안내 문구 노출
* [ ] 공유 버튼 클릭 시 Web Share 지원 브라우저는 공유 시트 호출
* [ ] 미지원 브라우저는 PNG 파일 다운로드로 폴백
* [ ] 모바일/데스크탑 반응형 정상
* [ ] 접근성 탭 이동 및 포커스 표시 정상

---

## 15. 위험요소 & 대응

* **브라우저 호환성**: Web Share API 미지원 → 다운로드 폴백
* **성능**: 저사양 기기에서 캡처/이펙트 비용 → 캡처 영역 최소화, 레이어 단순화
* **과도한 모션**: 멀미/배터리 이슈 → `prefers-reduced-motion` 처리
* **1회 제한 우회**: 시크릿/다른 브라우저 → 초기 스코프에서는 허용(간단 리워드 성격)

---

## 16. 오픈 이슈 / 결정 필요 사항

1. **1회 제한 모드**: 영구 1회 vs “오늘만 1회” (기본: 영구 1회, 옵션: daily)
2. **초기 이모지/메시지 세트 규모**: 12\~24개 권장(톤 밸런스 포함)
3. **브랜드 요소**: 로고/컬러 가이드 확정 여부
4. **OG 이미지 동적 생성**: 1차 배포에 포함할지(기본 제외)

---

## 17. 작업 지시 (for Cursor/AIDE)

1. Vite + React + TS + Tailwind 초기화, Prettier/ESLint 설정
2. `fortuneMap.ts`에 샘플 매핑 추가(아래 부록 참조)
3. `storage.ts` 래퍼 구현(get/set/remove + try/catch)
4. `EmojiShuffler` 구현(Framer Motion 애니메이션 시퀀스)
5. 결과 확정 시 LocalStorage 저장 로직 + 게이트 처리
6. confetti 트리거 컴포넌트 연결(canvas-confetti)
7. 공유 기능 구현: Web Share → 다운로드 폴백(html2canvas)
8. Glassmorphism 토큰을 Tailwind 유틸로 구성
9. 접근성/Reduce Motion 대응
10. 간단한 E2E(Playwright)로 핵심 플로우 자동화(선택)

---

## 18. 부록 A — 샘플 이모지 매핑

```ts
export const FORTUNES: Array<{ emoji: string; message: string; tone: 'positive' | 'neutral' | 'challenge' }> = [
  { emoji: '🍀', message: '작은 행운이 보이는 날. 가벼운 시도가 좋은 결과로 이어질 수 있어요.', tone: 'positive' },
  { emoji: '🌟', message: '빛나는 기회가 눈앞에! 자신감을 갖고 한 걸음만 더.', tone: 'positive' },
  { emoji: '🔥', message: '열정 모드 ON! 망설였던 일을 시작하기 좋은 타이밍.', tone: 'positive' },
  { emoji: '🌊', message: '흐름을 믿고 유연하게. 조급함을 내려놓으면 편안해져요.', tone: 'neutral' },
  { emoji: '🌈', message: '비 온 뒤 무지개처럼, 작았던 불편이 정리되는 하루.', tone: 'neutral' },
  { emoji: '🧭', message: '방향 점검 데이. 우선순위를 다시 배열해보면 길이 보여요.', tone: 'neutral' },
  { emoji: '🧩', message: '퍼즐 같은 일이 맞춰지는 중. 한 조각만 더 집중!', tone: 'positive' },
  { emoji: '⚡️', message: '의사결정 피로 주의. 잠깐 쉬어가도 괜찮아요.', tone: 'challenge' },
  { emoji: '🌪️', message: '돌발 변수 등장 가능. 계획 B를 가볍게 준비해두면 마음이 편해요.', tone: 'challenge' },
  { emoji: '🧘', message: '내 페이스 유지가 핵심. 루틴을 지키면 안정감이 생겨요.', tone: 'neutral' },
  { emoji: '🚀', message: '작은 런치! 가볍게 공개/공유해보면 응원이 따라와요.', tone: 'positive' },
  { emoji: '🎯', message: '한 가지 목표에 집중하면 성취감이 커져요.', tone: 'positive' }
];
```

---

## 19. 부록 B — 스토리지 키/동작

* `emojiFortune.drawn`: `'true'` 저장(결과 확정 시)
* `emojiFortune.result`: `StoredResult` JSON 저장
* 초기 진입 시 `drawn===true`면 `result`를 읽어 카드 표시, 버튼/셔플 비노출

---

## 20. 부록 C — 이벤트 명세(선택)

* `click_draw` `{ ts }`
* `draw_completed` `{ ts, emoji, tone }`
* `share_attempt` `{ ts, method: 'web-share'|'download' }`
* `share_success` `{ ts, method }`
* `share_fallback_download` `{ ts }`

---

## 21. 확장 아이디어 (차후)

* **Daily 모드**: 날짜별 1회 제한, 연속 출석형 배지(로컬)
* **분위기 테마**: 날씨/시간대에 따른 배경 그라디언트 자동 변경
* **가중치 셔플**: 톤 밸런스 조절(예: 월요일은 positive 비중 ↑)
* **서버리스 OG 이미지**: 공유 링크 썸네일 자동 생성(Vercel Edge)
* **간단 토큰 게이트**: 헬스체크 응답자만 접근 가능한 캠페인 링크



### 더 보완하면 좋은 기획 포인트 (추천)
- **모드 플래그 결정**: 현재 스펙은 “영구 1회”. 향후 **Daily 모드**를 옵션으로 둬서 “오늘의 운세” 경험과 명확히 맞출지 결정.
- **톤 밸런싱**: 초기 이모지 세트에 긍/중립/도전 톤의 비율을 5:4:3 정도로 맞추면 체감 밸런스가 좋아요.
- **Reduced Motion UX**: 모션 최소화 모드에선 **셔플 스킵 + 페이드만**으로 접근성 만족.
- **공유 문구 템플릿**: ex) `오늘의 이모지 {emoji}: {message} #오늘의운세` 식으로 통일.
- **간단 브랜딩**: 로고/CI가 있다면 **파비콘/OG 이미지** 포함(초기엔 정적 OG로 시작).
- **폴백 전략 명확화**: Web Share 미지원 브라우저 목록 기준(데스크탑 크롬 등)엔 자동 다운로드로 일관.
- **보안/오남용 가이드**: 결과를 서버로 전송하지 않는 정책을 명문화(사내 정책 준수).

원하면, **Cursor 프롬프트용 “작업 명령 스크립트”**(셋업 → 컴포넌트 뼈대 → 스타일 토큰 → 애니메이션 시퀀스 → 공유 기능)까지 만들어 줄게.  