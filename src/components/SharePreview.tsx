import type { StoredResult } from '../utils/storage';

interface SharePreviewProps {
  result: StoredResult;
}

// 1080 x 1350 (인스타그램 권장 비율)로 캔버스 합성을 위해 렌더하는 컴포넌트
export const SharePreview = ({ result }: SharePreviewProps) => {
  return (
    <div
      id="share-capture"
      className="fixed -left-[2000px] -top-[2000px] z-[-1]"
      style={{ width: 1080, height: 1350 }}
    >
      <div
        className="w-full h-full relative overflow-hidden"
        style={{ width: 1080, height: 1350 }}
      >
        {/* 배경: 프리미엄 그라디언트 + 오로라 블러 */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_10%_10%,#22d3ee33,transparent),radial-gradient(900px_900px_at_90%_0%,#a78bfa33,transparent),linear-gradient(135deg,#0f172a_0%,#1e293b_15%,#0ea5e9_50%,#7c3aed_100%)]" />

        {/* 콘텐츠 영역 */}
        <div className="relative h-full flex items-center justify-center p-20">
          {/* 통합된 운세 카드 - 글래스모피즘 */}
          <div className="rounded-[50px] bg-white/15 backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-white/40 shadow-[0_20px_80px_rgba(0,0,0,0.4)] outline outline-1 outline-white/10">
            <div
              className="px-48 py-40 text-white text-center"
              style={{ width: 900 }}
            >
              {/* 이모지 영역 */}
              <div className="text-[200px] leading-none mb-16">
                {result.emoji}
              </div>
              <h2 className="text-[80px] font-extrabold tracking-tight mb-16">
                오늘의 운세
              </h2>
              <p className="text-[36px] opacity-80 mb-20">
                {new Date(result.drawnAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              {/* 운세 메시지 - 너비 확장 및 여백 증가 */}
              <p className="text-[48px] leading-tight whitespace-pre-line break-words mx-auto max-w-[900px] mb-20 px-8">
                {result.message}
              </p>

              {/* 하단 정보 */}
              <div className="text-[32px] opacity-80 mb-8">
                오늘의 이모지 {result.emoji}
              </div>
              <div className="text-[28px] opacity-70">
                #오늘의운세 #EmojiFortune
              </div>
            </div>
          </div>
        </div>

        {/* 워터마크 */}
        <div className="absolute bottom-16 left-0 right-0 text-center text-white/60 text-[28px]">
          Cloud Launch Center
         </div>
      </div>
    </div>
  );
};
