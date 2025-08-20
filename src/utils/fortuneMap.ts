export type FortuneItem = {
  emoji: string;
  message: string;
  tone: 'positive' | 'neutral' | 'challenge';
};

export const FORTUNES: FortuneItem[] = [
  { emoji: '🍀', message: '작은 행운이 보이는 날. \n가벼운 시도가 좋은 결과로 이어질 수 있어요.', tone: 'positive' },
  { emoji: '🌟', message: '빛나는 기회가 눈앞에! 자신감을 갖고 한 걸음만 더.', tone: 'positive' },
  { emoji: '🔥', message: '열정 모드 ON! 망설였던 일을 시작하기 좋은 타이밍.', tone: 'positive' },
  { emoji: '🌊', message: '흐름을 믿고 유연하게. 조급함을 내려놓으면 편안해져요.', tone: 'neutral' },
  { emoji: '🌈', message: '비 온 뒤 무지개처럼, 작았던 불편이 정리되는 하루.', tone: 'neutral' },
  { emoji: '🧭', message: '방향 점검 데이. \n우선순위를 다시 배열해보면 길이 보여요.', tone: 'neutral' },
  { emoji: '🧩', message: '퍼즐 같은 일이 맞춰지는 중. \n한 조각만 더 집중!', tone: 'positive' },
  { emoji: '⚡️', message: '의사결정 피로 주의. \n잠깐 쉬어가도 괜찮아요.', tone: 'challenge' },
  { emoji: '🌪️', message: '돌발 변수 등장 가능. \n계획 B를 가볍게 준비해두면 마음이 편해요.', tone: 'challenge' },
  { emoji: '🧘', message: '내 페이스 유지가 핵심. \n루틴을 지키면 안정감이 생겨요.', tone: 'neutral' },
  { emoji: '🚀', message: '작은 런치! 가볍게 공개/공유해보면 응원이 따라와요.', tone: 'positive' },
  { emoji: '🎯', message: '한 가지 목표에 집중하면 성취감이 커져요.', tone: 'positive' }
];

export const getRandomFortune = (): FortuneItem => {
  const randomIndex = Math.floor(Math.random() * FORTUNES.length);
  return FORTUNES[randomIndex];
};
