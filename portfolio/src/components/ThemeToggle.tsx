"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isLightMode;
    setIsLightMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-5 left-5 z-[90] flex h-11 w-11 items-center justify-center rounded-xl border border-blue-200/15 bg-[#07111f]/90 text-slate-300 shadow-2xl backdrop-blur-md transition-colors hover:text-white"
      aria-label={isLightMode ? "Use dark theme" : "Use light theme"}
    >
      {isLightMode ? (
        <Moon className="h-5 w-5 text-slate-700" />
      ) : (
        <Sun className="h-5 w-5 text-blue-200" />
      )}
    </motion.button>
  );
}
