import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const DecoyPage = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => navigate("/surprise"), 800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-muted-foreground/20"
          initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
          animate={{
            y: [null, Math.random() * -200, Math.random() * 200],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      <AnimatePresence>
        {!clicked && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md"
          >
            <motion.div
              className="text-6xl mb-6"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚠️
            </motion.div>

            <h1 className="text-2xl font-body font-semibold text-foreground mb-4">
              Important System Notice
            </h1>

            <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
              Your device has been selected for a mandatory security verification.
              Please tap the button below to complete the process.
            </p>

            <p className="text-muted-foreground/60 text-xs mb-8">
              Ref: #BD-2025-SPECIAL | Priority: High
            </p>

            <motion.button
              onClick={handleClick}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-body font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Verify Now →
            </motion.button>

            <p className="text-muted-foreground/40 text-[10px] mt-6">
              © 2025 Totally Real Security Corp. All rights reserved.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {clicked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          className="text-6xl"
        >
          💖
        </motion.div>
      )}
    </div>
  );
};

export default DecoyPage;
