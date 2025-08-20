import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DrawButton } from "./components/DrawButton";
import { EmojiShuffler } from "./components/EmojiShuffler";
import { FortuneCard } from "./components/FortuneCard";
import { ConfettiController } from "./components/ConfettiController";
import { storage } from "./utils/storage";
import type { FortuneItem } from "./utils/fortuneMap";
import type { StoredResult } from "./utils/storage";

type AppState = "initial" | "shuffling" | "result";

function App() {
  const [appState, setAppState] = useState<AppState>("initial");
  const [fortuneResult, setFortuneResult] = useState<StoredResult | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (storage.isDrawn()) {
      const savedResult = storage.getResult();
      if (savedResult) {
        setFortuneResult(savedResult);
        setAppState("result");
      }
    }
  }, []);

  const handleDrawClick = () => setAppState("shuffling");

  const handleShuffleComplete = (result: FortuneItem) => {
    const storedResult: StoredResult = {
      emoji: result.emoji,
      message: result.message,
      drawnAt: new Date().toISOString(),
    };
    storage.saveResult(storedResult);
    setFortuneResult(storedResult);
    setAppState("result");
    setShowConfetti(true);
  };

  const handleConfettiComplete = () => setShowConfetti(false);
  // const handleReset = () => { storage.clear(); setFortuneResult(null); setAppState('initial'); };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <ConfettiController
          trigger={showConfetti}
          onComplete={handleConfettiComplete}
        />
        <div className="w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 md:mb-6 tracking-tight text-balance">
              🎭 이모지로 알아보는 오늘의 운세
            </h1>
            <p className="text-base md:text-xl text-white/85 max-w-2xl mx-auto">
              버튼을 클릭하고 오늘의 운세를 확인해보세요
            </p>
          </motion.div>

          {appState === "initial" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <DrawButton onClick={handleDrawClick} />
            </motion.div>
          )}

          {appState === "shuffling" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card p-8 md:p-12"
            >
              <EmojiShuffler onComplete={handleShuffleComplete} />
            </motion.div>
          )}

          {appState === "result" && fortuneResult && (
            <div className="space-y-8 md:space-y-10">
              <FortuneCard result={fortuneResult} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                {/* <button onClick={handleReset} className="text-white/80 hover:text-white text-sm underline" aria-label="다시 시작하기">
                다시 시작하기
              </button> */}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
