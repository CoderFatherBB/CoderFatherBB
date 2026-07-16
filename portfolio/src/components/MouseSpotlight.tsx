"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseSpotlight() {
  const pointerX = useMotionValue(-800);
  const pointerY = useMotionValue(-800);
  const mouseX = useSpring(pointerX, { damping: 30, stiffness: 180, mass: 0.5 });
  const mouseY = useSpring(pointerY, { damping: 30, stiffness: 180, mass: 0.5 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [pointerX, pointerY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute h-[520px] w-[520px] rounded-full bg-emerald-400/10 blur-[110px] mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
