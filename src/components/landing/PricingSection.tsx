import { Check, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import charPosePricing from "@/assets/char-pose-pricing.png";

const included = [
  "Script generation",
  "Scene generation & planning",
  "AI video generation",
  "Professional editing & color",
  "Voiceover",
  "Background music generation",
  "Text, graphics & visuals",
];

export function PricingSection() {
  const { ref, revealStyle } = useScrollReveal();
  return (
    <section ref={ref as any} style={revealStyle} id="pricing" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Pricing</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground" style={{ letterSpacing: "-0.03em" }}>
            Simple, transparent pricing.
          </h2>
          <p className="mt-4 text-muted-foreground">No retainers. No hidden fees. Pay per video.</p>
        </div>

        {/* Pricing cards + character side-by-side */}
        <div className="flex flex-col xl:flex-row items-stretch gap-6 max-w-5xl mx-auto">

          {/* Cards grid — below character on mobile, left side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 order-last xl:order-first">
            {/* Standard */}
            <div className="relative rounded-3xl border border-white/10 bg-card/40 backdrop-blur-md p-8 flex flex-col">
              <div className="mb-6">
                <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase mb-2">Standard</p>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold text-foreground">&#8377;5,000</span>
                  <span className="text-muted-foreground mb-1.5">/ video</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Duration: 1:00 &ndash; 1:35 min &middot; Minor revisions included</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-foreground transition-all hover:bg-white/[0.04] hover:border-white/20 active:scale-[0.98]">
                Start a project <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Major rework */}
            <div className="relative rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/[0.08] to-transparent p-8 flex flex-col">
              <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(circle at 60% 0%, oklch(0.65 0.20 230 / 0.12), transparent 60%)" }} />
              <div className="relative mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">Major Rework</p>
                  <span className="rounded-full bg-primary/20 border border-primary/30 px-2.5 py-0.5 text-xs font-medium text-primary">Complete overhaul</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold text-foreground">&#8377;7,000</span>
                  <span className="text-muted-foreground mb-1.5">/ video</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Full creative rework &mdash; new concept, new execution</p>
              </div>
              <ul className="relative space-y-3 flex-1 mb-8">
                {[...included, "Complete concept redesign", "New script & scenes from scratch"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="relative inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]">
                Talk to us <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Character — top on mobile/tablet, right side on desktop */}
          <div className="relative flex items-end justify-center xl:justify-end flex-shrink-0 order-first xl:order-last" style={{ minWidth: 0 }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-12 rounded-full blur-3xl pointer-events-none" style={{ background: "oklch(0.65 0.22 280 / 0.30)" }} />
            <img
              src={charPosePricing}
              alt=""
              className="relative z-10 object-contain object-bottom select-none drop-shadow-2xl"
              style={{ height: "clamp(180px, 28vw, 400px)", maxWidth: "100%", mixBlendMode: "screen", filter: "drop-shadow(0 16px 32px oklch(0.65 0.22 280 / 0.2))" }}
              draggable={false}
            />
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Not sure which fits? <a href="#contact" className="text-primary underline-offset-2 hover:underline">Drop us a message</a> and we'll guide you.
        </p>
      </div>
    </section>
  );
}
