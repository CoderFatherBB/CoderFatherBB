"use client";

import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export default function MouseSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  
  // Use framer-motion spring for buttery smooth following
  const mouseX = useSpring(mousePosition.x, springConfig);
  const mouseY = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
    mouseX.set(mousePosition.x);
    mouseY.set(mousePosition.y);
  }, [mousePosition, mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      
      {/* Dynamic following glowing orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px] mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Spotlight reveal layer (everything else is slightly blurred and dimmed, mouse reveals clearly) */}
      <motion.div 
        className="absolute inset-0 backdrop-blur-[4px] bg-[#040b16]/30"
        style={{
          WebkitMaskImage: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`,
          maskImage: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`,
          transition: "mask-position 0.1s ease-out, -webkit-mask-position 0.1s ease-out"
        }}
      />
      
    </div>
  );
}
