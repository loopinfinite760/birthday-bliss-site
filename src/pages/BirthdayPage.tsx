import { motion } from "framer-motion";

const FloatingHearts = () => (
  <>
    {[...Array(25)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-primary/30"
        style={{
          left: `${Math.random() * 100}%`,
          fontSize: `${14 + Math.random() * 24}px`,
        }}
        animate={{
          y: [window.innerHeight + 20, -40],
          x: [0, Math.random() * 80 - 40],
          rotate: [0, Math.random() * 360],
          opacity: [0, 0.6, 0.6, 0],
        }}
        transition={{
          duration: 6 + Math.random() * 6,
          repeat: Infinity,
          delay: Math.random() * 6,
          ease: "linear",
        }}
      >
        ♥
      </motion.div>
    ))}
  </>
);

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
  const mainPhoto = "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop";

  return (
    <div className="h-screen bg-background relative overflow-hidden">
      {/* Floating hearts background */}
      <FloatingHearts />

      {/* Confetti */}
      <Confetti />

      {/* Center content - upper layer */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <motion.h1
          className="font-display text-5xl md:text-8xl text-primary text-glow mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          Happy Birthday!
        </motion.h1>
        <motion.h2
          className="font-display text-5xl md:text-8xl text-primary text-glow mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          Sosamala
        </motion.h2>

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
          You make my world brighter just by being in it.
        </motion.p>
        <motion.p
          className="font-display text-2xl md:text-3xl text-accent text-glow-accent mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          I’m so lucky to have you, today and always.
        </motion.p>
        <motion.p
          className="font-display text-2xl md:text-3xl text-accent text-glow-accent mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          I love you forever 💖
        </motion.p>
      </div>
    </div>
  );
};

export default BirthdayPage;
