import { Check, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const PLANS = [
  {
    id: "standard",
    name: "STANDARD",
    tagline: "Perfect for small projects & startups",
    price: "₹12,000",
    duration: "1 min",
    badge: null,
    accentColor: "#00C8B4",
    iconBg: "linear-gradient(135deg, #00C8B4, #0099A8)",
    icon: "✈",
    borderColor: "rgba(0,200,180,0.25)",
    glowColor: "rgba(0,200,180,0.08)",
    hoverGlow: "rgba(0,200,180,0.18)",
    hoverBorder: "rgba(0,200,180,0.55)",
    hoverShadow: "0 20px 60px rgba(0,200,180,0.20), 0 0 0 1px rgba(0,200,180,0.30)",
    btnStyle: "outline" as const,
    features: [
      "Script generation",
      "Scene generation & planning",
      "AI video generation",
      "Professional editing & color",
      "Voiceover (AI)",
      "Background music generation",
      "Text, graphics & visuals",
    ],
  },
  {
    id: "professional",
    name: "PROFESSIONAL",
    tagline: "For growing brands & businesses",
    price: "₹15,000",
    duration: "1 min",
    badge: null,
    accentColor: "#00D46A",
    iconBg: "linear-gradient(135deg, #00D46A, #00A852)",
    icon: "👑",
    borderColor: "rgba(0,212,106,0.25)",
    glowColor: "rgba(0,212,106,0.08)",
    hoverGlow: "rgba(0,212,106,0.16)",
    hoverBorder: "rgba(0,212,106,0.55)",
    hoverShadow: "0 20px 60px rgba(0,212,106,0.20), 0 0 0 1px rgba(0,212,106,0.30)",
    btnStyle: "outline" as const,
    features: [
      "Script generation",
      "Scene generation & planning",
      "AI video generation",
      "Professional editing & color",
      "Voiceover (AI)",
      "Background music generation",
      "Text, graphics & visuals",
      "1 additional concept option",
    ],
  },
  {
    id: "business",
    name: "BUSINESS",
    tagline: "For brands that need more impact",
    price: "₹20,000",
    duration: "1 min",
    badge: null,
    accentColor: "#A855F7",
    iconBg: "linear-gradient(135deg, #A855F7, #7C3AED)",
    icon: "⭐",
    borderColor: "rgba(168,85,247,0.25)",
    glowColor: "rgba(168,85,247,0.08)",
    hoverGlow: "rgba(168,85,247,0.16)",
    hoverBorder: "rgba(168,85,247,0.55)",
    hoverShadow: "0 20px 60px rgba(168,85,247,0.20), 0 0 0 1px rgba(168,85,247,0.30)",
    btnStyle: "outline" as const,
    features: [
      "Script generation",
      "Scene generation & planning",
      "AI video generation",
      "Professional editing & color",
      "Voiceover (AI)",
      "Background music generation",
      "Text, graphics & visuals",
      "2 concept options",
      "Custom branding elements",
    ],
  },
  {
    id: "premium",
    name: "PREMIUM",
    tagline: "For high-impact campaigns & full brand stories",
    price: "₹25,000",
    duration: "1 min",
    badge: "Most Popular",
    accentColor: "#F59E0B",
    iconBg: "linear-gradient(135deg, #F59E0B, #D97706)",
    icon: "💎",
    borderColor: "rgba(245,158,11,0.40)",
    glowColor: "rgba(245,158,11,0.10)",
    hoverGlow: "rgba(245,158,11,0.20)",
    hoverBorder: "rgba(245,158,11,0.70)",
    hoverShadow: "0 20px 60px rgba(245,158,11,0.25), 0 0 0 1px rgba(245,158,11,0.45)",
    btnStyle: "primary" as const,
    features: [
      "Script generation",
      "Scene generation & planning",
      "AI video generation",
      "Professional editing & color",
      "Voiceover (AI)",
      "Background music generation",
      "Text, graphics & visuals",
      "3 concept options",
      "Advanced visual effects & transitions",
      "Custom branding elements",
    ],
  },
];

export function PricingSection() {
  const { ref, revealStyle } = useScrollReveal();

  return (
    <section ref={ref as any} style={revealStyle} id="pricing" className="relative py-24 md:py-32">
      <style>{`
        .pricing-card {
          transition: transform 0.32s cubic-bezier(0.16,1,0.3,1), box-shadow 0.32s ease, border-color 0.32s ease, background 0.32s ease;
          will-change: transform;
        }
        .pricing-card:hover {
          transform: translateY(-6px) scale(1.018);
        }
        .pricing-card .pricing-cta {
          transition: all 0.22s ease;
        }
        .pricing-card:hover .pricing-cta {
          transform: scale(1.03);
        }
        .pricing-card .check-icon {
          transition: color 0.22s ease, transform 0.22s ease;
        }
        .pricing-card:hover .check-icon {
          transform: scale(1.15);
        }
        .pricing-card .feature-item {
          transition: color 0.22s ease;
        }
        .pricing-card:hover .feature-item { color: rgba(255,255,255,0.80); }
      `}</style>

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Pricing</span>
          <h2
            className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground"
            style={{ letterSpacing: "-0.03em" }}
          >
            Simple, transparent pricing.
          </h2>
          <p className="mt-4 text-muted-foreground">No retainers. No hidden fees. Pay per video.</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="pricing-card relative rounded-2xl flex flex-col overflow-hidden group"
              style={{
                border: `1px solid ${plan.borderColor}`,
                background: `linear-gradient(160deg, ${plan.glowColor} 0%, rgba(255,255,255,0.02) 100%)`,
                backdropFilter: "blur(12px)",
                "--hover-shadow": plan.hoverShadow,
                "--hover-border": plan.hoverBorder,
                "--hover-glow": plan.hoverGlow,
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = plan.hoverShadow;
                el.style.borderColor = plan.hoverBorder;
                el.style.background = `linear-gradient(160deg, ${plan.hoverGlow} 0%, rgba(255,255,255,0.03) 100%)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "";
                el.style.borderColor = plan.borderColor;
                el.style.background = `linear-gradient(160deg, ${plan.glowColor} 0%, rgba(255,255,255,0.02) 100%)`;
              }}
            >
              {/* Most Popular badge */}
              {plan.badge && (
                <div
                  className="absolute top-0 right-0 px-4 py-1.5 text-xs font-bold rounded-bl-xl rounded-tr-xl"
                  style={{
                    background: plan.iconBg,
                    color: "#000",
                    letterSpacing: "0.05em",
                  }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Inner top accent line */}
              <div className="absolute top-0 left-6 right-6 h-px transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${plan.accentColor}80, transparent)` }}
              />

              <div className="p-7 flex flex-col flex-1">
                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: plan.iconBg }}
                  >
                    {plan.icon}
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold tracking-[0.15em]"
                      style={{ color: plan.accentColor }}
                    >
                      {plan.name}
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5">{plan.tagline}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <span className="text-4xl font-bold text-white transition-colors duration-300 group-hover:text-white"
                    style={{ textShadow: "0 0 0 transparent" }}
                  >{plan.price}</span>
                  <span className="text-muted-foreground text-sm ml-1">/ video</span>
                </div>

                {/* Duration */}
                <p className="text-xs text-muted-foreground mb-6">
                  Duration: <span className="text-white font-medium">{plan.duration}</span>
                  &nbsp;&middot;&nbsp;Minor revisions included
                </p>

                {/* Divider */}
                <div
                  className="h-px mb-6 transition-all duration-300"
                  style={{ background: `linear-gradient(90deg, ${plan.accentColor}40, transparent)` }}
                />

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="feature-item flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check
                        className="check-icon h-4 w-4 shrink-0 mt-0.5"
                        style={{ color: plan.accentColor }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className="pricing-cta inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold active:scale-[0.97]"
                  style={
                    plan.btnStyle === "primary"
                      ? {
                          background: plan.iconBg,
                          color: "#000",
                        }
                      : {
                          border: `1px solid ${plan.borderColor}`,
                          color: plan.accentColor,
                          background: `${plan.glowColor}`,
                        }
                  }
                >
                  Start a project <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Not sure which fits?{" "}
          <a href="#contact" className="text-primary underline-offset-2 hover:underline">
            Drop us a message
          </a>{" "}
          and we'll guide you.
        </p>
      </div>
    </section>
  );
}
