"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Lightbulb, LightbulbOff } from "lucide-react";

export default function ThemeToggle() {
  const [isLightMode, setIsLightMode] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Check initial preference
    if (document.documentElement.classList.contains('light-theme')) {
      setIsLightMode(true);
    }
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isLightMode;
    setIsLightMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }

    // Intense physical pendulum swing animation
    await controls.start({
      rotate: [0, -30, 25, -15, 10, -5, 0],
      transition: { duration: 2, ease: "easeInOut" }
    });
  };

  return (
    <motion.div
      className="fixed top-0 left-[50%] md:left-[7%] z-[100] flex flex-col items-center"
      animate={controls}
      style={{ transformOrigin: "top center" }}
    >
      {/* The wire */}
      <div className="w-[2px] h-32 md:h-48 bg-gradient-to-b from-slate-800 to-slate-500 shadow-sm" />

      {/* The bulb */}
      <button
        onClick={toggleTheme}
        className="relative -mt-1 p-3 rounded-full bg-[#1e293b] border-2 border-slate-600 shadow-2xl hover:bg-[#334155] transition-colors group cursor-pointer focus:outline-none"
        title="Toggle Light Mode"
      >
        {isLightMode ? (
          <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
        ) : (
          <LightbulbOff className="w-6 h-6 md:w-8 md:h-8 text-slate-400 group-hover:text-slate-300" />
        )}

        {/* Intense glow effect when on */}
        {isLightMode && (
          <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-xl -z-10" />
        )}
      </button>
    </motion.div>
  );
}
