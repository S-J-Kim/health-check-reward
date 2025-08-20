import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiControllerProps {
  trigger: boolean;
  onComplete?: () => void;
}

export const ConfettiController = ({ trigger, onComplete }: ConfettiControllerProps) => {
  useEffect(() => {
    if (trigger) {
      // Reduced motion 설정 확인
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        onComplete?.();
        return;
      }

      // 폭죽 이펙트 실행 (0.5초로 단축)
      const duration = 500;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const confettiAnimation = () => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          onComplete?.();
          return;
        }

        // 화면 중앙과 양 사이드에서 폭죽 발사
        confetti({
          particleCount: 2,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: 0.1, y: 0.6 },
          colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3']
        });

        confetti({
          particleCount: 2,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: 0.9, y: 0.6 },
          colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3']
        });

        confetti({
          particleCount: 3,
          angle: 90,
          spread: 30,
          origin: { x: 0.5, y: 0.6 },
          colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3']
        });

        requestAnimationFrame(confettiAnimation);
      };

      confettiAnimation();
    }
  }, [trigger, onComplete]);

  return null;
};
