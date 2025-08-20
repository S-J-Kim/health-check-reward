export type StoredResult = {
  emoji: string;
  message: string;
  drawnAt: string;
};

const STORAGE_KEYS = {
  DRAWN: 'emojiFortune.drawn',
  RESULT: 'emojiFortune.result',
} as const;

export const storage = {
  // 이미 운세를 뽑았는지 확인
  isDrawn: (): boolean => {
    try {
      return localStorage.getItem(STORAGE_KEYS.DRAWN) === 'true';
    } catch {
      return false;
    }
  },

  // 결과 저장
  saveResult: (result: StoredResult): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.DRAWN, 'true');
      localStorage.setItem(STORAGE_KEYS.RESULT, JSON.stringify(result));
    } catch (error) {
      console.error('Failed to save result:', error);
    }
  },

  // 저장된 결과 가져오기
  getResult: (): StoredResult | null => {
    try {
      const result = localStorage.getItem(STORAGE_KEYS.RESULT);
      return result ? JSON.parse(result) : null;
    } catch {
      return null;
    }
  },

  // 저장된 데이터 모두 삭제 (테스트용)
  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.DRAWN);
      localStorage.removeItem(STORAGE_KEYS.RESULT);
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }
};
