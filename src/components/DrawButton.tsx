import { motion } from 'framer-motion';

interface DrawButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const DrawButton = ({ onClick, disabled = false }: DrawButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className="glass-button px-8 py-4 text-lg md:text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="오늘의 운세 뽑기"
    >
      🎯 오늘의 운세 뽑기
    </motion.button>
  );
};
