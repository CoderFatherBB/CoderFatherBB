import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./talking.css";
import "./experiences.css";

const inter = localFont({ src: "../fonts/InterTight.woff2", variable: "--font-inter", display: "swap" });
const serif = localFont({ src: "../fonts/InstrumentSerif-Italic.woff2", variable: "--font-serif", display: "swap" });
const mono = localFont({ src: "../fonts/JetBrainsMono.woff2", variable: "--font-mono", display: "swap", preload: false });
export const metadata: Metadata = {
  metadataBase: new URL("https://bhavin-baldota-portfolio.vercel.app"),
  title: "Bhavin Baldota | AI Engineer & Researcher",
  description: "I research, develop, and deploy AI systems. Explore Bhavin Baldota's work in generative AI, intelligent agents, applied machine learning, and research.",
  openGraph: { title: "Bhavin Baldota | Research. Develop. Deploy.", description: "AI engineering, applied research, and production systems.", images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')==='dark'?'dark':'light'}catch{document.documentElement.dataset.theme='light'}`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="light" suppressHydrationWarning className={`${inter.variable} ${serif.variable} ${mono.variable}`}>
    <head><link rel="preload" as="image" href="/hero/poster.webp" fetchPriority="high" /></head>
    <body><script dangerouslySetInnerHTML={{ __html: themeScript }} /><a className="skip-link" href="#main-content">Skip to content</a>{children}</body>
  </html>;
}
