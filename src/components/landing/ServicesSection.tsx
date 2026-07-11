import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Film, MessageSquare, ArrowRight, Check } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import charPoseServices from "@/assets/char-pose-services.png";

const workflowSteps = [
  { icon: "📋", label: "Brief & Script Writing",  desc: "We map your brand story & plan every scene" },
  { icon: "🎬", label: "AI Video Generation",     desc: "Cinematic footage created with AI tools" },
  { icon: "🎞",  label: "Professional Editing",   desc: "Clips cut, timed & polished to perfection" },
  { icon: "🎵", label: "Voiceover & Music",       desc: "Professional VO + background score added" },
  { icon: "✨", label: "Motion & Graphics",        desc: "Text overlays, transitions & visual effects" },
  { icon: "📦", label: "Final Delivery",          desc: "Landscape & Reel/Vertical formats, export-ready" },
];

function VideoWorkflow() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % workflowSteps.length), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative mb-8">
      {workflowSteps.map((step, i) => {
        const isActive = i === active;
        const isDone   = i < active;
        const isLast   = i === workflowSteps.length - 1;
        return (
          <div key={i} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="relative flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-500"
                style={{ width: 24, height: 24, zIndex: 1,
                  background: isActive ? "oklch(0.65 0.22 280)" : isDone ? "oklch(0.50 0.16 280 / 0.9)" : "oklch(0.22 0.02 230)",
                  border: isActive ? "2px solid oklch(0.78 0.22 280)" : isDone ? "2px solid oklch(0.55 0.18 280 / 0.6)" : "2px solid oklch(0.30 0.04 230)",
                  boxShadow: isActive ? "0 0 14px 4px oklch(0.65 0.22 280 / 0.55)" : "none" }}
              >
                {isDone ? <Check className="h-3 w-3 text-white" strokeWidth={3} /> : isActive ? <span className="block rounded-full" style={{ width: 8, height: 8, background: "white" }} /> : null}
              </div>
              {!isLast && <div className="w-px transition-all duration-700" style={{ height: 32, background: isDone ? "linear-gradient(to bottom, oklch(0.55 0.18 280 / 0.8), oklch(0.55 0.18 280 / 0.4))" : "oklch(0.28 0.03 230)" }} />}
            </div>
            <div className="pb-2 transition-all duration-500" style={{ opacity: isActive ? 1 : isDone ? 0.55 : 0.25, marginTop: 2 }}>
              <div className="flex items-center gap-2">
                <span className="text-sm leading-none">{step.icon}</span>
                <span className="text-sm font-semibold leading-none" style={{ color: isActive ? "oklch(0.90 0.05 280)" : undefined }}>{step.label}</span>
              </div>
              <div className="overflow-hidden" style={{ maxHeight: isActive ? 32 : 0, opacity: isActive ? 1 : 0, marginTop: isActive ? 4 : 0, transition: "all 0.4s" }}>
                <p className="text-xs text-primary/70 leading-snug">{step.desc}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const chatbotBullets = [
  "Instant reply to customer queries",
  "Lead capture & qualification",
  "Appointment booking automation",
  "Product catalogue & order updates",
  "Custom flows built for your business",
];

const specialties = [
  { label: "AI Avatar Influencer Videos", icon: "🎭" },
  { label: "Cinematic Commercial Ads",    icon: "🎬" },
  { label: "3D Animated Videos",          icon: "🧊" },
  { label: "Real Estate Commercials",     icon: "🏠" },
  { label: "Education Videos",            icon: "📚" },
  { label: "Business Promotions",         icon: "📣" },
];

export function ServicesSection() {
  const { ref, revealStyle } = useScrollReveal();
  return (
    <section ref={ref as any} style={revealStyle} id="services" className="relative pt-16 pb-12 md:pt-20 md:pb-16">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.55 0.22 280 / 0.08), transparent 70%)" }} />
      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header: text left, character right — tightly coupled, no gap */}
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Services</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-foreground" style={{ letterSpacing: "-0.03em" }}>
              What we do for you
            </h2>
            <p className="mt-4 text-muted-foreground">Two focused services. Both built to grow your business.</p>
          </div>

          {/* Character beside the heading */}
          <div className="relative flex-shrink-0 flex items-end justify-end -mb-8" style={{ width: "clamp(130px, 18vw, 240px)" }}>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-6 rounded-full blur-2xl pointer-events-none" style={{ background: "oklch(0.55 0.20 280 / 0.30)" }} />
            <img
              src={charPoseServices}
              alt=""
              className="relative z-10 object-contain object-bottom select-none"
              style={{
                height: "clamp(130px, 18vw, 240px)",
                width: "100%",
                mixBlendMode: "screen",
                filter: "drop-shadow(0 8px 16px oklch(0.65 0.22 280 / 0.18))",
              }}
              draggable={false}
            />
          </div>
        </div>

        {/* Two service cards — no character inside */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">

          {/* Card 1: AI Video */}
          <div className="group relative rounded-3xl border border-white/10 bg-card/40 backdrop-blur-md p-8 md:p-10 flex flex-col transition-colors hover:bg-white/[0.04]">
            <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 0%, oklch(0.65 0.20 280 / 0.09), transparent 60%)" }} />
            <div className="relative flex-1">
              <div className="flex items-start justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-primary">
                  <Film className="h-6 w-6" />
                </div>
                <span className="rounded-full border px-3 py-1 text-xs font-medium bg-primary/20 text-primary border-primary/30">Core Service</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-1">End-to-End AI Video Generation</h3>
              <p className="text-sm text-muted-foreground mb-6">From brief to final cut — here is how we deliver your video:</p>
              <VideoWorkflow />
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200 active:scale-[0.98]">
              Start a project <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="group relative rounded-3xl border border-white/10 bg-card/40 backdrop-blur-md p-8 md:p-10 flex flex-col transition-colors hover:bg-white/[0.04]">
            <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 0%, oklch(0.55 0.20 160 / 0.07), transparent 60%)" }} />
            <div className="relative flex-1">
              <div className="flex items-start justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-green-400">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <span className="rounded-full border px-3 py-1 text-xs font-medium bg-green-500/10 text-green-400 border-green-500/20">Powered by AlaChat</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">WhatsApp Business Chatbot</h3>
              <p className="text-sm text-muted-foreground mb-6">Automate your customer conversations 24/7 — never miss a lead. Flat ₹500/month, live in under 15 minutes.</p>
              <ul className="space-y-2.5 mb-8">
                {chatbotBullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/alachat" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium border border-white/10 text-foreground hover:bg-white/[0.04] hover:border-white/20 transition-all duration-200 active:scale-[0.98]">
              Explore AlaChat <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Specialties */}
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-6 text-center">We specialize in</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {specialties.map(({ label, icon }) => (
              <div key={label} className="group relative rounded-2xl p-px transition-all duration-300 hover:scale-[1.03]" style={{ background: "linear-gradient(135deg, oklch(0.65 0.22 280 / 0.5), oklch(0.55 0.22 200 / 0.3) 50%, oklch(0.65 0.22 280 / 0.15))" }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, oklch(0.65 0.22 280 / 0.18), transparent 70%)" }} />
                <div className="relative flex flex-col items-center justify-center gap-2 rounded-2xl px-3 py-4 text-center h-full" style={{ background: "oklch(0.165 0.018 230)" }}>
                  <span className="text-2xl leading-none">{icon}</span>
                  <span className="text-xs font-medium text-foreground/80 leading-snug">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
