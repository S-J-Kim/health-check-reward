import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FORTUNES } from '../utils/fortuneMap';
import type { FortuneItem } from '../utils/fortuneMap';

interface EmojiShufflerProps {
  onComplete: (result: FortuneItem) => void;
}

export const EmojiShuffler = ({ onComplete }: EmojiShufflerProps) => {
  const [currentEmoji, setCurrentEmoji] = useState<string>('');
  const [finalResult, setFinalResult] = useState<FortuneItem | null>(null);

  useEffect(() => {
    // Reduced motion 설정 확인
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // 애니메이션 없이 바로 결과 표시
      const result = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      setFinalResult(result);
      onComplete(result);
      return;
    }

    // 셔플 애니메이션 시작 (더 부드럽게)
    const shuffleDuration = 1800; // 1.8초로 연장
    const shuffleInterval = 120; // 120ms마다 변경 (더 부드럽게)
    let shuffleCount = 0;
    const maxShuffles = shuffleDuration / shuffleInterval;

    const shuffle = () => {
      if (shuffleCount >= maxShuffles) {
        // 최종 결과 결정
        const result = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
        setFinalResult(result);
        onComplete(result);
        return;
      }

      // 랜덤 이모지 표시
      const randomEmoji = FORTUNES[Math.floor(Math.random() * FORTUNES.length)].emoji;
      setCurrentEmoji(randomEmoji);
      shuffleCount++;

      setTimeout(shuffle, shuffleInterval);
    };

    shuffle();
  }, [onComplete]);

  if (finalResult) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-8xl md:text-9xl mb-6"
        >
          {finalResult.emoji}
        </motion.div>
        <div className="text-xl md:text-2xl text-white font-medium max-w-md mx-auto">
          {finalResult.message}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEmoji}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="text-8xl md:text-9xl mb-6"
        >
          {currentEmoji || '🎲'}
        </motion.div>
      </AnimatePresence>
      
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="text-lg text-white/80"
      >
        운세를 뽑는 중...
      </motion.div>
    </div>
  );
};
