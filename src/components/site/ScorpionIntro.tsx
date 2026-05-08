import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import scorpions from "@/assets/scorpions-intro.png";

export function ScorpionIntro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("sk_intro_played")) return;
    sessionStorage.setItem("sk_intro_played", "1");
    setShow(true);
    const t = setTimeout(() => setShow(false), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="scorpion-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden bg-[#f4efe7]"
        >
          {/* Left scorpion — left half of image */}
          <motion.div
            initial={{ x: "0%", opacity: 0 }}
            animate={{
              x: ["0%", "0%", "-60%"],
              opacity: [0, 1, 1, 0],
              rotate: [0, -3, 3, -2, 0],
            }}
            transition={{
              duration: 2.6,
              times: [0, 0.15, 0.7, 1],
              ease: "easeInOut",
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[55vh] w-1/2 overflow-hidden"
          >
            <img
              src={scorpions}
              alt=""
              aria-hidden
              className="absolute left-0 top-0 h-full w-[200%] object-cover object-left"
            />
          </motion.div>

          {/* Right scorpion — right half of image */}
          <motion.div
            initial={{ x: "0%", opacity: 0 }}
            animate={{
              x: ["0%", "0%", "60%"],
              opacity: [0, 1, 1, 0],
              rotate: [0, 3, -3, 2, 0],
            }}
            transition={{
              duration: 2.6,
              times: [0, 0.15, 0.7, 1],
              ease: "easeInOut",
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-[55vh] w-1/2 overflow-hidden"
          >
            <img
              src={scorpions}
              alt=""
              aria-hidden
              className="absolute right-0 top-0 h-full w-[200%] object-cover object-right"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
