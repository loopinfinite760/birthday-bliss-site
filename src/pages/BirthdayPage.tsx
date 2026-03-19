import { motion } from "framer-motion";

// Placeholder photos - replace these with real photos of her!
const PHOTOS = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=300&h=300&fit=crop",
];

const ScrollRow = ({ direction, speed = 30 }: { direction: "left" | "right"; speed?: number }) => {
  const photos = [...PHOTOS, ...PHOTOS]; // duplicate for seamless loop

  return (
    <div className="overflow-hidden w-full py-2">
      <motion.div
        className="flex gap-3"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {photos.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden border-2 border-primary/20"
            style={{ boxShadow: "0 4px 20px hsl(340 80% 60% / 0.15)" }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Confetti = () => (
  <>
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: ["hsl(340,80%,60%)", "hsl(30,80%,55%)", "hsl(280,70%,60%)", "hsl(180,60%,50%)", "hsl(50,90%,60%)"][i % 5],
          left: `${Math.random() * 100}%`,
        }}
        initial={{ y: -20, opacity: 1 }}
        animate={{
          y: [null, window.innerHeight + 20],
          x: [0, Math.random() * 100 - 50],
          rotate: [0, Math.random() * 720],
          opacity: [1, 1, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 3,
        }}
      />
    ))}
  </>
);

const BirthdayPage = () => {
  // Replace this with her actual photo
  const mainPhoto = "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      <Confetti />

      {/* Top scrolling row */}
      <div className="absolute top-8 left-0 right-0">
        <ScrollRow direction="left" speed={25} />
      </div>

      {/* Middle row */}
      <div className="absolute top-44 md:top-48 left-0 right-0">
        <ScrollRow direction="right" speed={35} />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          className="font-display text-5xl md:text-8xl text-primary text-glow mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          Happy Birthday!
        </motion.h1>

        <motion.div
          className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary"
          style={{ boxShadow: "0 0 40px hsl(340 80% 60% / 0.4), 0 0 80px hsl(340 80% 60% / 0.2)" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        >
          <img src={mainPhoto} alt="Birthday Girl" className="w-full h-full object-cover" />
        </motion.div>

        <motion.p
          className="font-display text-2xl md:text-3xl text-accent text-glow-accent mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          You're amazing! 💖
        </motion.p>
      </div>

      {/* Bottom scrolling row */}
      <div className="absolute bottom-8 left-0 right-0">
        <ScrollRow direction="left" speed={30} />
      </div>
    </div>
  );
};

export default BirthdayPage;
