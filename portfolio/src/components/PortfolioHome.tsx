"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import TalkingPortfolio from "@/components/talking/TalkingPortfolio";
const PortfolioGame = dynamic(() => import("@/components/PortfolioGame"), { ssr: false });
const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });
export default function PortfolioHome() {
  const [gameOpen, setGameOpen] = useState(false);
  const [chatLoaded, setChatLoaded] = useState(false);
  return <>
    <TalkingPortfolio onOpenGame={() => setGameOpen(true)} onOpenChat={() => setChatLoaded(true)} chatLoaded={chatLoaded} />
    {gameOpen && <div data-lenis-prevent><PortfolioGame isOpen onClose={() => setGameOpen(false)} /></div>}
    {chatLoaded && <Chatbot initialOpen />}
  </>;
}
