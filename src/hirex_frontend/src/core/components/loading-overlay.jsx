import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export function LoadingOverlay({
  isLoading = false,
  message = "Processing your request...",
  fullScreen = true,
  showSpinner = true,
  showBrain = true,
}) {
  // Prevent scrolling when overlay is active
  useEffect(() => {
    if (isLoading && fullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading, fullScreen]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`${
            fullScreen ? "fixed inset-0" : "absolute inset-0"
          } z-50 flex items-center justify-center overflow-hidden bg-black/80 backdrop-blur-md`}
          aria-live="polite"
          aria-busy={isLoading}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated Gradient Orbs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1 }}
              className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl"
            />

            {/* Scanning Lines */}
            <div className="absolute inset-0">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                    ease: "linear",
                  }}
                  className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
                  style={{ top: `${15 + i * 15}%` }}
                />
              ))}
            </div>

            {/* Data Points */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 5,
                    ease: "easeInOut",
                  }}
                  className={`absolute h-1 w-1 rounded-full ${
                    Math.random() > 0.5 ? "bg-cyan-400" : "bg-violet-400"
                  }`}
                />
              ))}
            </div>

            {/* Connection Lines */}
            <svg className="absolute h-full w-full opacity-30">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                  <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[...Array(8)].map((_, i) => {
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                const endX = Math.random() * 100;
                const endY = Math.random() * 100;

                return (
                  <motion.line
                    key={i}
                    x1={`${startX}%`}
                    y1={`${startY}%`}
                    x2={`${endX}%`}
                    y2={`${endY}%`}
                    stroke="url(#lineGrad)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 1, 1, 0],
                      opacity: [0, 0.5, 0.5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Central Loading Element */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-6 text-center">
            {showBrain && (
              <div className="relative">
                {/* Pulsing Circle */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/30 to-violet-500/30 blur-md"
                />

                {/* Orbiting Dots */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2"
                    style={{ transformOrigin: "center" }}
                  >
                    <motion.div
                      className={`absolute h-2 w-2 rounded-full ${
                        i === 0
                          ? "bg-cyan-400"
                          : i === 1
                          ? "bg-violet-400"
                          : "bg-white"
                      }`}
                      style={{
                        left: "50%",
                        top: i * 5,
                        transform: "translateX(-50%)",
                      }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {showSpinner && (
              <div className="relative h-12 w-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-violet-400"
                />
                <motion.div
                  animate={{ rotate: -180 }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute inset-2 rounded-full border-2 border-transparent border-t-violet-400 border-l-cyan-400"
                />
              </div>
            )}

            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-md px-4"
              >
                <p className="text-lg font-medium text-white">{message}</p>
                <motion.div
                  className="mt-2 flex justify-center space-x-1"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                      className="h-1.5 w-1.5 rounded-full bg-cyan-400"
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
