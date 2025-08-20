import { useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import type { StoredResult } from '../utils/storage';
import { SharePreview } from './SharePreview';

interface FortuneCardProps {
  result: StoredResult;
}

export const FortuneCard = ({ result }: FortuneCardProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareError, setShareError] = useState<string>('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    setIsSharing(true);
    setShareError('');

    try {
      // 공유 전용 합성 레이아웃을 캡처
      const captureEl = document.getElementById('share-capture');
      if (!captureEl) {
        throw new Error('공유 캡처 요소를 찾을 수 없습니다.');
      }

      const canvas = await html2canvas(captureEl as HTMLElement, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => b && resolve(b), 'image/png');
      });

      const file = new File([blob], `fortune-${new Date().toISOString().split('T')[0]}.png`, {
        type: 'image/png'
      });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: '오늘의 운세',
          text: `오늘의 이모지 ${result.emoji}: ${result.message} #오늘의운세`,
          files: [file]
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fortune-${new Date().toISOString().split('T')[0]}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('공유 실패:', error);
      setShareError('공유에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <>
      {/* 공유 합성용 hidden 영역 */}
      <SharePreview result={result} />

      {/* 통합된 운세 카드 */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-card p-8 md:p-12 max-w-4xl mx-auto"
        id="fortune-result"
      >
        {/* 이모지 영역 - 부드러운 위아래 흔들림 효과 */}
        <div className="text-center mb-8">
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-8xl md:text-9xl mb-6"
          >
            {result.emoji}
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">오늘의 운세</h2>
          <p className="text-sm md:text-base text-white/80">{formatDate(result.drawnAt)}</p>
        </div>
        
        {/* 운세 메시지 영역 - 너비 확장 및 여백 증가 */}
        <div className="text-center mb-8">
          <p className="text-lg md:text-xl text-white leading-relaxed whitespace-pre-line break-words text-balance px-4 md:px-8 max-w-3xl mx-auto">
            {result.message}
          </p>
        </div>

        {/* 공유 버튼 */}
        <div className="text-center">
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="glass-button px-8 py-4 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="운세 결과 공유하기"
          >
            {isSharing ? '공유 중...' : '공유하기'}
          </button>
        
          {shareError && (
            <p className="text-red-300 text-sm mt-2">{shareError}</p>
          )}
        </div>
      </motion.div>
    </>
  );
};
