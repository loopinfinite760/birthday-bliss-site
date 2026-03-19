import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundMusic from "@/components/BackgroundMusic";

const CANDLE_COLORS = ["#FF6B8A", "#FFB74D", "#FF8A65", "#F06292", "#BA68C8"];

const Candle = ({ index, lit, onClick }: { index: number; lit: boolean; onClick: () => void }) => (
  <motion.div
    className="flex flex-col items-center cursor-pointer"
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.3 + index * 0.15 }}
  >
    {/* Flame */}
    <AnimatePresence>
      {lit && (
        <motion.div
          className="relative mb-1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-3 h-5 rounded-full"
            style={{
              background: "radial-gradient(ellipse at bottom, #FFD54F 0%, #FF9800 40%, #FF5722 70%, transparent 100%)",
              boxShadow: "0 0 12px #FFD54F, 0 0 25px #FF9800",
            }}
            animate={{
              scaleY: [1, 1.15, 0.95, 1.1, 1],
              scaleX: [1, 0.9, 1.05, 0.95, 1],
              rotate: [0, -3, 2, -1, 0],
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-2.5 rounded-full"
            style={{ background: "radial-gradient(ellipse at bottom, #FFF9C4, #FFD54F 60%, transparent)" }}
            animate={{ scaleY: [1, 1.2, 0.9, 1], opacity: [0.9, 1, 0.8, 0.9] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>

    {/* Wick */}
    <div className="w-[2px] h-2 bg-muted-foreground/60 rounded-full" />

    {/* Candle body */}
    <div
      className="w-4 h-16 rounded-sm"
      style={{
        background: `linear-gradient(180deg, ${CANDLE_COLORS[index]} 0%, ${CANDLE_COLORS[index]}99 100%)`,
        boxShadow: lit ? `0 0 15px ${CANDLE_COLORS[index]}66` : "none",
      }}
    />
  </motion.div>
);

const Sparkle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute text-accent"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${8 + Math.random() * 16}px`,
    }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180],
    }}
    transition={{ duration: 2, repeat: Infinity, delay }}
  >
    ✦
  </motion.div>
);

const SurprisePage = () => {
  const navigate = useNavigate();
  const [candles, setCandles] = useState([false, false, false, false, false]);
  const [allLit, setAllLit] = useState(false);
  const [swinging, setSwinging] = useState(false);

  const toggleCandle = (index: number) => {
    setCandles((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  useEffect(() => {
    setAllLit(candles.every(Boolean));
  }, [candles]);

  const handleBlow = () => {
    setSwinging(true);
    // Blow out candles one by one
    candles.forEach((_, i) => {
      setTimeout(() => {
        setCandles((prev) => {
          const next = [...prev];
          next[i] = false;
          return next;
        });
      }, 200 + i * 150);
    });
    setTimeout(() => navigate("/birthday"), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-6">
      <BackgroundMusic src="/birthday-song.mp3" />
      {/* Background sparkles */}
      {[...Array(20)].map((_, i) => (
        <Sparkle key={i} delay={i * 0.3} />
      ))}

      {/* Floating hearts background */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-primary/20"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 20}px`,
          }}
          animate={{
            y: [window.innerHeight, -50],
            x: [0, Math.random() * 60 - 30],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          ♥
        </motion.div>
      ))}

      <motion.h1
        className="font-display text-5xl md:text-7xl text-primary text-glow mb-2"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Make a Wish!
      </motion.h1>

      <motion.p
        className="text-muted-foreground font-body text-sm mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Tap the candles to light them up 🕯️
      </motion.p>

      {/* Cake area */}
      <motion.div
        className="relative"
        animate={swinging ? { rotate: [0, 8, -6, 4, -2, 0] } : {}}
        transition={{ duration: 1 }}
      >
        {/* Candles row */}
        <div className="flex gap-6 md:gap-8 justify-center mb-4 relative z-10">
          {candles.map((lit, i) => (
            <Candle key={i} index={i} lit={lit} onClick={() => toggleCandle(i)} />
          ))}
        </div>

        {/* Cake */}
        <motion.div
          className="w-64 h-20 md:w-80 md:h-24 rounded-xl relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(340 60% 70%) 0%, hsl(340 50% 55%) 50%, hsl(340 40% 45%) 100%)",
            boxShadow: "0 8px 30px hsl(340 80% 60% / 0.3)",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          {/* Frosting */}
          <div
            className="absolute top-0 left-0 right-0 h-6"
            style={{
              background: "linear-gradient(180deg, hsl(30 80% 85%) 0%, hsl(30 60% 75%) 100%)",
              borderRadius: "0 0 50% 50% / 0 0 100% 100%",
            }}
          />
          {/* Decoration dots */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0 ? "hsl(30 80% 70%)" : "hsl(0 0% 100%)",
                bottom: "8px",
                left: `${10 + i * 12}%`,
              }}
            />
          ))}
        </motion.div>

        {/* Cake base */}
        <div
          className="w-72 h-4 md:w-88 md:h-5 mx-auto rounded-b-xl"
          style={{ background: "linear-gradient(180deg, hsl(30 30% 40%), hsl(30 20% 30%))" }}
        />
      </motion.div>

      {/* Blow button */}
      <AnimatePresence>
        {allLit && (
          <motion.button
            onClick={handleBlow}
            className="mt-10 bg-accent text-accent-foreground px-8 py-3 rounded-full font-display text-xl tracking-wide"
            style={{ boxShadow: "var(--glow-accent)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            🌬️ Blow the Candles!
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SurprisePage;
