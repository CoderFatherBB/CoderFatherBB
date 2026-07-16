import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import MouseSpotlight from "@/components/MouseSpotlight";
import ThemeToggle from "@/components/ThemeToggle";
import Chatbot from "@/components/Chatbot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bhavin Baldota | GenAI/ML Engineer & Researcher",
  description: "An interactive portfolio by Bhavin Baldota—Lead Software Engineer building production GenAI, RAG, multi-agent, and computer vision systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased selection:bg-blue-500/30 transition-colors duration-500">
        <MouseSpotlight />
        <ThemeToggle />
        <Chatbot />
        <div className="relative overflow-x-hidden w-full min-h-screen flex flex-col">
          <div className="bg-glow top-0 left-0" />
          <div className="bg-glow bottom-0 right-0" style={{ filter: "blur(120px)", opacity: 0.5 }} />
          <div className="relative z-10 w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
