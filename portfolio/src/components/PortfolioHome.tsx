"use client";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { Bot, Gamepad2 } from "lucide-react";
import TalkingPortfolio from "@/components/talking/TalkingPortfolio";
const PortfolioGame = dynamic(() => import("@/components/PortfolioGame"), { ssr: false });
const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });
export default function PortfolioHome() {
  const [gameLoaded, setGameLoaded] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatLoaded, setChatLoaded] = useState(false);
  const closeChat = useCallback(() => setChatOpen(false), []);
  const closeGame = useCallback(() => setGameOpen(false), []);
  return <>
    <TalkingPortfolio experienceOpen={chatOpen || gameOpen} />
    <nav className="experience-dock" aria-label="Interactive portfolio experiences">
      <button className="experience-orb" aria-label="Ask my AI assistant" aria-expanded={chatOpen} onClick={() => { setGameOpen(false); setChatLoaded(true); setChatOpen(true); }}><Bot size={26} aria-hidden="true" /><span>Ask AI</span></button>
      <button className="experience-orb" aria-label="Enter my interactive AI lab" aria-expanded={gameOpen} onClick={() => { setChatOpen(false); setGameLoaded(true); setGameOpen(true); }}><Gamepad2 size={26} aria-hidden="true" /><span>Explore</span></button>
    </nav>
    {gameLoaded && <div data-lenis-prevent><PortfolioGame isOpen={gameOpen} onClose={closeGame} /></div>}
    {chatLoaded && <Chatbot isOpen={chatOpen} onClose={closeChat} />}
  </>;
}
