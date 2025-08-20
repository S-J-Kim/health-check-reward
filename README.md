# 🎭 이모지로 알아보는 오늘의 운세

헬스체크 응답 구성원을 위한 재미있는 운세 리워드 웹 애플리케이션입니다.

## ✨ 주요 기능

- **🎯 1회 운세 뽑기**: 버튼 클릭으로 오늘의 운세 확인
- **🎲 이모지 셔플**: 재미있는 애니메이션과 함께 결과 공개
- **🎉 폭죽 이펙트**: 결과 공개 시 축하 폭죽 애니메이션
- **📱 공유 기능**: Web Share API 또는 이미지 다운로드로 결과 공유
- **💾 로컬 저장**: 이미 뽑은 운세는 새로고침 후에도 유지
- **♿ 접근성**: Reduced Motion 설정 지원 및 키보드 네비게이션

## 🚀 기술 스택

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: TailwindCSS + Glassmorphism 디자인
- **Animation**: Framer Motion
- **Effects**: canvas-confetti (폭죽), html2canvas (이미지 캡처)
- **Storage**: LocalStorage

## 🎨 디자인 특징

- **글래스모피즘**: 반투명 유리질 카드와 블러 배경
- **반응형**: 모바일 우선, 데스크탑 대응
- **애니메이션**: 부드러운 전환과 인터랙션
- **색상**: 밝고 경쾌한 그라디언트 배경

## 📱 사용법

1. **운세 뽑기**: "오늘의 운세 뽑기" 버튼 클릭
2. **셔플 애니메이션**: 이모지가 셔플되며 결과 결정
3. **결과 확인**: 이모지와 운세 메시지 표시
4. **공유하기**: 결과를 이미지로 공유 또는 다운로드

## 🔧 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 미리보기
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── ConfettiController.tsx    # 폭죽 이펙트
│   ├── DrawButton.tsx            # 운세 뽑기 버튼
│   ├── EmojiShuffler.tsx         # 셔플 애니메이션
│   └── FortuneCard.tsx           # 결과 표시 및 공유
├── utils/              # 유틸리티 함수
│   ├── fortuneMap.ts   # 운세 데이터
│   └── storage.ts      # LocalStorage 래퍼
├── App.tsx             # 메인 앱 컴포넌트
└── main.tsx            # 앱 진입점
```

## 🎯 핵심 컴포넌트

- **App**: 전체 상태 관리 및 라우팅
- **EmojiShuffler**: 이모지 셔플 애니메이션
- **FortuneCard**: 결과 표시 및 공유 기능
- **ConfettiController**: 폭죽 이펙트 제어

## 🌟 향후 확장 계획

- **Daily 모드**: 날짜별 1회 제한 옵션
- **테마 시스템**: 시간대별 배경 변경
- **OG 이미지**: 서버리스 동적 썸네일 생성
- **다국어 지원**: i18n 확장

## 📄 라이선스

이 프로젝트는 내부 헬스체크 리워드 목적으로 제작되었습니다.

---

**즐거운 운세 확인하세요! 🍀✨**
