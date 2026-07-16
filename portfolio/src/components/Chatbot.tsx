"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Bhavin's AI Assistant. Ask me anything about his experience, projects, or skills!"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 380, h: 600 });
  const resizingRef = useRef(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle custom window resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingRef.current) return;
      
      // Calculate new dimensions based on mouse position (anchored at bottom-24 and right-24)
      const newWidth = Math.max(320, window.innerWidth - e.clientX - 24);
      const newHeight = Math.max(400, window.innerHeight - e.clientY - 24);
      
      setDimensions({ 
        w: Math.min(newWidth, window.innerWidth * 0.9), 
        h: Math.min(newHeight, window.innerHeight * 0.9) 
      });
    };
    
    const handleMouseUp = () => {
      resizingRef.current = false;
      document.body.style.userSelect = '';
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Show tooltip after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      // Add a placeholder assistant message that we will stream into
      const assistantMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { id: assistantMessageId, role: "assistant", content: "" }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        
        // Vercel AI SDK and our FastAPI backend format streams as `0:"text"` or similar.
        // Let's parse the chunks safely.
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith('data: 0:')) {
            try {
              // Extract the JSON string part after 'data: 0:'
              const textChunk = JSON.parse(trimmedLine.substring(8));
              assistantContent += textChunk;
              
              // Update the last message in state
              setMessages((prev) => {
                const newMessages = [...prev];
                const lastIndex = newMessages.length - 1;
                newMessages[lastIndex] = { ...newMessages[lastIndex], content: assistantContent };
                return newMessages;
              });
            } catch (e) {
              console.error("Error parsing stream chunk:", e);
            }
          } else if (trimmedLine.startsWith('data: 3:')) {
            console.error("Stream error:", trimmedLine);
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { 
        id: Date.now().toString(), 
        role: "assistant", 
        content: "Sorry, I encountered an error connecting to the backend. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
            className="chat-trigger fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors z-50 group"
          >
            <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Welcome Tooltip */}
      <AnimatePresence>
        {!isOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="chat-tooltip fixed bottom-24 right-6 bg-blue-600 text-white text-sm px-4 py-2 rounded-2xl rounded-br-sm shadow-xl z-50 flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
          >
            <span>👋 Chat with me to know more about Bhavin!</span>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setShowTooltip(false); 
              }} 
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ width: dimensions.w, height: dimensions.h }}
            className="chat-bg fixed bottom-6 right-6 flex flex-col bg-[#0f1629] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden"
          >
            {/* Custom Resize Handle (Top Left) */}
            <div 
              onMouseDown={(e) => { 
                e.preventDefault();
                resizingRef.current = true; 
                document.body.style.userSelect = 'none';
              }}
              className="absolute top-0 left-0 w-6 h-6 cursor-nwse-resize z-50 hover:bg-white/10 rounded-tl-2xl transition-colors flex items-start justify-start p-1.5"
            >
              <div className="w-2 h-2 rounded-full border-t border-l border-white/30" />
            </div>

            <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="chat-header flex items-center justify-between px-4 py-3 bg-[#0a101f]/80 backdrop-blur-md border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="chat-bot-icon w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="chat-title text-sm font-semibold text-white">Bhavin&apos;s Assistant</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
              <div className="flex flex-col space-y-4">
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 w-full ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                  >
                    <div className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center mt-1 ${
                      m.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'chat-bot-icon bg-slate-800 border border-white/10 text-blue-400'
                    }`}>
                      {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    
                    <div className={`rounded-2xl px-4 py-3 text-sm overflow-x-auto max-w-[85%] ${
                      m.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-sm' 
                        : 'chat-bot-bubble bg-slate-800/80 border border-white/10 text-slate-200 rounded-tl-sm shadow-inner'
                    }`}>
                      <div className={`chat-prose prose prose-sm max-w-none 
                        prose-p:leading-relaxed prose-p:mb-3 prose-li:my-1
                        [&_table]:border-collapse [&_table]:w-full [&_table]:my-4 [&_table]:border [&_table]:border-slate-500
                        [&_th]:border [&_th]:border-slate-500 [&_th]:bg-slate-700/80 [&_th]:p-3 [&_th]:text-left [&_th]:text-white
                        [&_td]:border [&_td]:border-slate-600 [&_td]:p-3
                        prose-strong:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300
                        ${m.role === 'user' ? 'prose-invert text-white' : 'prose-invert text-slate-200'}
                      `}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3 w-full"
                  >
                    <div className="chat-bot-icon w-7 h-7 shrink-0 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center mt-1 text-blue-400">
                      <Bot size={14} />
                    </div>
                    <div className="chat-bot-bubble bg-slate-800/50 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 shadow-sm">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="chat-footer p-3 bg-[#0a101f]/80 backdrop-blur-md border-t border-white/10">
              <form
                onSubmit={handleFormSubmit}
                className="chat-input-wrapper flex items-center gap-2 bg-white/5 border border-white/10 rounded-full pl-4 pr-1.5 py-1.5 focus-within:border-blue-500/50 focus-within:bg-white/10 transition-colors"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my projects..."
                  className="chat-input flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="chat-send-btn w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white disabled:opacity-50 disabled:bg-slate-700 transition-colors"
                >
                  {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} className="ml-0.5" />}
                </button>
              </form>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
