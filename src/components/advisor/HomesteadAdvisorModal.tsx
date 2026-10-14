import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  RotateCcw, 
  Compass, 
  Droplets, 
  Sun, 
  Sprout, 
  FileText, 
  ChevronRight, 
  Loader2,
  HelpCircle
} from 'lucide-react';
import Markdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { fetchAdvisorWithFallback } from '@/lib/apiClient';

export interface AdvisorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const STORAGE_KEY = 'outpost_advisor_chat_history';

const SUGGESTED_QUESTIONS = [
  {
    icon: Compass,
    label: 'Best Districts for Water & Orchards',
    query: 'Which districts in Malawi offer the highest perennial spring water security and optimal soil for fruit orchards?'
  },
  {
    icon: Droplets,
    label: 'Solar Borehole Pump Sizing',
    query: 'How do I size a solar PV array and submersible pump for a 40-meter borehole in the Central Region plateau?'
  },
  {
    icon: Sprout,
    label: 'Soil Building in Heavy Red Clay',
    query: 'How do I improve heavy red Katondo clay loam for organic vegetable and legume production without synthetic fertilizers?'
  },
  {
    icon: FileText,
    label: 'Customary Land Acquisition',
    query: 'What are the legal steps under the Malawi Customary Land Act to acquire and register village land with the Village Land Committee?'
  }
];

export function HomesteadAdvisorModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<AdvisorMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'welcome',
        role: 'assistant',
        content: `### Welcome to the Outpost AI Sanctuary Advisor\n\nI am your specialized advisor for rural homesteading, off-grid self-reliance, and land stewardship across Malawi.\n\nAsk me about:\n- **Land Scouting**: Water tables, perennial streams, and soil types (Red Loam, Valley Clay, Alluvial) across Dedza, Mzimba, Mulanje, Zomba, etc.\n- **Off-Grid Engineering**: Sizing solar PV, LiFePO4 batteries, and gravity water pipes.\n- **Agronomy & Seasonal Cycles**: Crop timing for the Rainy Season, Cold Season, and Hot Dry Season.\n- **Customary Land Law**: Protocols with Traditional Chiefs and Village Land Committees.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (userQuery?: string) => {
    const textToSend = (userQuery || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: AdvisorMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let profileContext: Record<string, any> = {};
      try {
        const storedProfile = localStorage.getItem('outpost_user_profile');
        if (storedProfile) {
          const parsed = JSON.parse(storedProfile);
          profileContext = {
            district: parsed.district || 'Dedza',
            familySize: parsed.familyMembers || parsed.householdSize || '4',
            budget: parsed.budgetBand || 'Standard Off-Grid',
            waterSource: 'Gravity spring / Borehole',
            skills: parsed.homesteadGoal || 'Bio-intensive organic agriculture'
          };
        }
      } catch {
        // ignore
      }

      const conversationHistory = [...messages.slice(-6), userMessage].map(m => ({
        role: m.role,
        content: m.content
      }));

      const { reply } = await fetchAdvisorWithFallback({
        message: textToSend,
        messages: conversationHistory,
        history: messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
        context: profileContext
      });

      const assistantMessage: AdvisorMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Failed to get advice:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    const initial: AdvisorMessage[] = [
      {
        id: 'welcome',
        role: 'assistant',
        content: `### Chat Reset\n\nHow can I assist your country living sanctuary journey today? Choose a question below or ask anything about land, water, crops, or solar power in Malawi.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(initial);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl h-[90vh] max-h-[850px] bg-[#071A10] border border-amber-500/30 rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-slate-100 relative"
        >
          {/* Header Bar */}
          <div className="p-5 sm:p-6 border-b border-white/10 bg-[#05130B]/90 backdrop-blur-xl flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
                <Sparkles size={22} className="animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#FAF8F5]">Homestead Field Advisor</h3>
                  <span className="text-caption font-mono text-emerald-300">
                    · 28-District Telemetry
                  </span>
                </div>
                <p className="text-xs text-emerald-200/70 font-mono">Malawi Territorial & Country Living Counsel</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearHistory}
                title="Reset conversation"
                className="p-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-white/5 transition-all text-xs font-mono flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={15} />
                <span className="hidden sm:inline text-caption uppercase tracking-wider">Reset</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close Advisor (Esc)"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Quick Starter Chips */}
          <div className="px-5 py-3 bg-slate-950/60 border-b border-white/5 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
            <span className="text-caption font-mono uppercase tracking-wider text-slate-400 whitespace-nowrap mr-1">
              Quick Inquiries:
            </span>
            {SUGGESTED_QUESTIONS.map((q, idx) => {
              const Icon = q.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSend(q.query)}
                  disabled={isLoading}
                  className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-white/10 hover:border-amber-500/30 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Icon size={12} className="text-amber-400" />
                  <span>{q.label}</span>
                </button>
              );
            })}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 custom-scrollbar">
            {messages.map((m) => {
              const isAssistant = m.role === 'assistant';
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3.5 max-w-[90%] sm:max-w-[85%]",
                    isAssistant ? "mr-auto" : "ml-auto flex-row-reverse"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-sm",
                    isAssistant 
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" 
                      : "bg-emerald-800 text-emerald-100"
                  )}>
                    {isAssistant ? <Bot size={18} /> : <User size={18} />}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className={cn(
                      "p-4 sm:p-5 rounded-[1.75rem] text-sm leading-relaxed relative group shadow-md",
                      isAssistant 
                        ? "bg-slate-950/80 border border-amber-500/20 text-slate-200" 
                        : "bg-gradient-to-r from-emerald-800 to-emerald-700 text-white border border-emerald-600/40"
                    )}>
                      {isAssistant ? (
                        <div className="markdown-body space-y-3 prose prose-invert max-w-none text-xs sm:text-sm font-sans">
                          <Markdown>{m.content}</Markdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap font-sans text-xs sm:text-sm">{m.content}</p>
                      )}

                      {/* Assistant copy action */}
                      {isAssistant && m.id !== 'welcome' && (
                        <button
                          onClick={() => handleCopy(m.id, m.content)}
                          className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                          title="Copy response"
                        >
                          {copiedId === m.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                        </button>
                      )}
                    </div>
                    <span className={cn(
                      "text-caption font-mono text-slate-500 px-2",
                      !isAssistant && "text-right"
                    )}>
                      {m.timestamp}
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3.5 mr-auto max-w-[85%]"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Bot size={18} />
                </div>
                <div className="p-4 rounded-[1.75rem] bg-slate-950/80 border border-amber-500/20 flex items-center gap-2.5 text-xs text-amber-300 font-mono">
                  <Loader2 size={16} className="animate-spin text-amber-400" />
                  <span>Synthesizing territorial & homestead counsel...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Footer */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-[#05130B]/90 backdrop-blur-xl shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 bg-slate-950/90 border border-amber-500/30 rounded-2xl p-1.5 focus-within:border-amber-400 transition-all shadow-inner"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about water security, solar sizing, soils, or Malawi districts..."
                disabled={isLoading}
                className="flex-1 bg-transparent px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none font-sans"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-slate-950 font-mono font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer"
              >
                <span>Ask</span>
                <Send size={13} />
              </button>
            </form>
            <div className="flex items-center justify-between text-caption font-mono text-slate-500 px-2 mt-2">
              <span>Grounded in Malawi DCCMS data, FAO agro-zones & off-grid engineering principles.</span>
              <span className="hidden sm:inline">Press Enter to Send</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
