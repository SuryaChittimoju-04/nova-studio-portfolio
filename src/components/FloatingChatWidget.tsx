/**
 * FloatingChatWidget — appears on every page (mounted in __root.tsx)
 *
 * Two floating buttons, bottom-right:
 *   • Agent (purple) — opens inline Q&A chat that qualifies the lead
 *   • WhatsApp (green) — opens wa.me with pre-filled message
 */
import { useState, useEffect, useRef } from "react";
import { X, MessageSquare, Send, ChevronRight } from "lucide-react";
import { WA_LINK } from "@/lib/wa";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Step {
  id: string;
  question: string;
  sub?: string;
  type: "options" | "input" | "confirm";
  options?: { label: string; emoji: string; value: string }[];
  placeholder?: string;
}

// ── Conversation steps ────────────────────────────────────────────────────────
const STEPS: Step[] = [
  {
    id: "interest",
    question: "Hi! 👋 What can Nova Studio help you with?",
    type: "options",
    options: [
      { emoji: "🎬", label: "AI Videos & Brand Films",  value: "ai-videos"  },
      { emoji: "💬", label: "WhatsApp Chatbot (AlaChat)", value: "wa-bot"   },
      { emoji: "✨", label: "Both / Not sure yet",       value: "both"      },
    ],
  },
  {
    id: "detail",
    question: "Got it! Tell us a little about your brand:",
    sub: "What do you sell or offer?",
    type: "input",
    placeholder: "e.g. Fitness studio in Vizag, 50 members…",
  },
  {
    id: "name",
    question: "What's your name?",
    type: "input",
    placeholder: "Your name",
  },
  {
    id: "contact",
    question: "Best way to reach you?",
    sub: "WhatsApp number or email",
    type: "input",
    placeholder: "+91 XXXXX XXXXX or email@example.com",
  },
  {
    id: "confirm",
    question: "You're all set! 🎉",
    sub: "Our team will reach out on WhatsApp within a few hours. You can also chat with us right now.",
    type: "confirm",
  },
];

// ── WhatsApp SVG icon ─────────────────────────────────────────────────────────
function WaIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function FloatingChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [step, setStep]         = useState(0);
  const [answers, setAnswers]   = useState<Record<string, string>>({});
  const [input, setInput]       = useState("");
  const [show, setShow]         = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Delay mount to avoid flash on page load
  useEffect(() => { const t = setTimeout(() => setShow(true), 800); return () => clearTimeout(t); }, []);

  // Focus input when step changes to input type
  useEffect(() => {
    if (chatOpen && STEPS[step]?.type === "input") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [step, chatOpen]);

  const currentStep = STEPS[step];

  const handleOption = (value: string, label: string) => {
    setAnswers(a => ({ ...a, [currentStep.id]: label }));
    setStep(s => s + 1);
  };

  const handleInput = () => {
    if (!input.trim()) return;
    setAnswers(a => ({ ...a, [currentStep.id]: input.trim() }));
    setInput("");
    setStep(s => s + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleInput();
  };

  const resetChat = () => {
    setStep(0);
    setAnswers({});
    setInput("");
    setChatOpen(false);
  };

  // Build finalised WA message from answers
  const buildWaMessage = () => {
    const parts = [
      `Hi Nova Studio! 👋`,
      answers.interest  ? `Interest: ${answers.interest}` : "",
      answers.detail    ? `Brand: ${answers.detail}` : "",
      answers.name      ? `Name: ${answers.name}` : "",
      answers.contact   ? `Contact: ${answers.contact}` : "",
    ].filter(Boolean);
    return `https://wa.me/916305779552?text=${encodeURIComponent(parts.join("\n"))}`;
  };

  if (!show) return null;

  return (
    <>
      <style>{`
        @keyframes fabIn {
          from { opacity:0; transform:scale(0.6) translateY(16px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes chatSlideUp {
          from { opacity:0; transform:translateY(24px) scale(0.96); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes waPulse {
          0%,100% { box-shadow:0 0 0 0 rgba(34,197,94,0.55); }
          50%      { box-shadow:0 0 0 10px rgba(34,197,94,0); }
        }
        .fab-wa  { animation:fabIn 0.4s 0.85s cubic-bezier(0.34,1.56,0.64,1) both, waPulse 2.5s 2s ease-in-out infinite; }
        .fab-agent { animation:fabIn 0.4s 1.0s cubic-bezier(0.34,1.56,0.64,1) both; }
        .chat-panel { animation:chatSlideUp 0.25s ease both; }
        .step-opts button { transition:background 0.15s, border-color 0.15s, transform 0.15s; }
        .step-opts button:hover { transform:translateX(4px); }
      `}</style>

      {/* ── FAB container ─────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-5 z-[200] flex flex-col items-center gap-3">

        {/* Agent button */}
        <button
          onClick={() => { setChatOpen(v => !v); if (!chatOpen) { setStep(0); setAnswers({}); setInput(""); } }}
          title="Chat with us"
          className="fab-agent flex h-13 w-13 items-center justify-center rounded-full border border-purple-500/40 text-white focus:outline-none"
          style={{
            width: 52, height: 52,
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            boxShadow: "0 4px 20px rgba(124,58,237,0.5)",
          }}
        >
          {chatOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
        </button>

        {/* WhatsApp button */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          className="fab-wa flex items-center justify-center rounded-full text-white focus:outline-none"
          style={{
            width: 52, height: 52,
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            boxShadow: "0 4px 20px rgba(34,197,94,0.45)",
          }}
        >
          <WaIcon size={24} />
        </a>
      </div>

      {/* ── Chat panel ───────────────────────────────────────────────────── */}
      {chatOpen && (
        <div
          className="chat-panel fixed z-[199] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
          style={{
            bottom: 76, right: 20,
            width: "min(360px, calc(100vw - 32px))",
            maxHeight: "70vh",
            background: "oklch(0.10 0.015 260)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07]"
            style={{ background: "linear-gradient(135deg, #7c3aed22, #4f46e522)" }}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}>
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Nova Studio</p>
              <p className="text-[10px] text-green-400 flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                Online · replies fast
              </p>
            </div>
            <button onClick={resetChat} className="ml-auto text-white/40 hover:text-white/80 transition-colors focus:outline-none">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">

            {/* Question bubble */}
            <div className="flex gap-2">
              <div className="h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-xs"
                style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}>
                <MessageSquare className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%]"
                style={{ background: "rgba(255,255,255,0.07)" }}>
                <p className="text-sm text-white leading-snug">{currentStep.question}</p>
                {currentStep.sub && (
                  <p className="mt-1 text-xs text-white/45">{currentStep.sub}</p>
                )}
              </div>
            </div>

            {/* Answer area */}
            {currentStep.type === "options" && (
              <div className="step-opts flex flex-col gap-2 pl-9">
                {currentStep.options!.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleOption(opt.value, opt.label)}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 px-3.5 py-2.5 text-sm text-white/80 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white text-left focus:outline-none"
                  >
                    <span className="text-base">{opt.emoji}</span>
                    {opt.label}
                    <ChevronRight className="h-3.5 w-3.5 ml-auto text-white/30" />
                  </button>
                ))}
              </div>
            )}

            {currentStep.type === "input" && (
              <div className="flex gap-2 items-center pl-9">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={currentStep.placeholder}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.09]"
                />
                <button
                  onClick={handleInput}
                  disabled={!input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white disabled:opacity-30 focus:outline-none transition-opacity"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            )}

            {currentStep.type === "confirm" && (
              <div className="pl-9 space-y-3">
                {answers.name && (
                  <p className="text-sm text-white/60">
                    Thank you, <span className="text-white font-medium">{answers.name}</span>! 🙌
                  </p>
                )}
                <a
                  href={buildWaMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none"
                  style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", boxShadow: "0 4px 16px rgba(34,197,94,0.35)" }}
                >
                  <WaIcon size={18} />
                  Chat Now on WhatsApp
                </a>
                <a
                  href={`mailto:hello@novastudio.ai?subject=Project%20Inquiry&body=${encodeURIComponent(
                    `Hi Nova Studio,\n\nInterest: ${answers.interest || ""}\nBrand: ${answers.detail || ""}\nName: ${answers.name || ""}\nContact: ${answers.contact || ""}`
                  )}`}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 hover:text-white hover:border-white/25 transition-colors focus:outline-none"
                >
                  ✉ Send via Email instead
                </a>
                <button onClick={resetChat} className="w-full text-center text-xs text-white/30 hover:text-white/50 transition-colors pt-1">
                  Start over
                </button>
              </div>
            )}
          </div>

          {/* Progress dots */}
          {currentStep.type !== "confirm" && (
            <div className="flex items-center justify-center gap-1.5 py-2.5 border-t border-white/[0.06]">
              {STEPS.filter(s => s.type !== "confirm").map((_, i) => (
                <div key={i} className="h-1 rounded-full transition-all duration-300"
                  style={{ width: i === step ? 20 : 6, background: i <= step ? "#7c3aed" : "rgba(255,255,255,0.12)" }} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
