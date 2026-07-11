import { Button } from "@/components/ui/button";
import { ArrowRight, Play, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import heroBg from "@/assets/hero-cinematic-bg.jpg";
import charPoseHero from "@/assets/char-pose-hero.png";
import { WA_LINK } from "@/lib/wa";

function CountUp({ to, suffix = "", duration = 1100, delay = 0 }: {
  to: number; suffix?: string; duration?: number; delay?: number;
}) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(to * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, to, duration]);
  return <>{val}{suffix}</>;
}

const rotatingPhrases = [
  "Real Estate Films",
  "Education Content",
  "Fitness Reels",
  "Jewellery Ads",
  "Healthcare Videos",
  "Cinematic AI Ads",
];

function RotatingPhrase() {
  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState<"in" | "out">("in");
  useEffect(() => {
    const id = setInterval(() => {
      setAnim("out");
      setTimeout(() => {
        setIndex((i) => (i + 1) % rotatingPhrases.length);
        setAnim("in");
      }, 350);
    }, 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      className="inline-block bg-clip-text text-transparent"
      style={{
        backgroundImage: "linear-gradient(135deg, oklch(0.88 0.14 280), oklch(0.78 0.20 200))",
        animation: anim === "in" ? "word-in 0.35s ease forwards" : "word-out 0.35s ease forwards",
      }}
    >
      {rotatingPhrases[index]}
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-14 pb-0 md:pt-16 md:pb-0">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 30%, oklch(0.55 0.22 280 / 0.25), transparent 70%), radial-gradient(ellipse 60% 50% at 70% 60%, oklch(0.65 0.20 230 / 0.20), transparent 70%)" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6 items-center">

          {/* Left: copy */}
          <div className="pb-16 lg:pb-0 pt-2 lg:pt-0 order-last lg:order-first">
            <div className="opacity-0 animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-live" />
              End-to-End AI Video Production
            </div>

            <h1
              className="mt-6 opacity-0 animate-fade-up font-semibold tracking-tight text-foreground"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.8rem)", lineHeight: 1.06, letterSpacing: "-0.04em" }}
            >
              Your Brand Needs<br />
              <RotatingPhrase />
            </h1>

            <p className="mt-5 max-w-lg text-base text-muted-foreground opacity-0 animate-fade-up-delay md:text-lg">
              End-to-end AI production &mdash; script, visuals, voiceover &amp; music &mdash; delivered in days, not weeks. Starting at &#8377;5,000.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 opacity-0 animate-fade-up-delay">
              <Button size="lg" asChild>
                <Link to="/work">
                  <Play className="mr-1 h-4 w-4" />
                  View Our Work
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/15 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06]">
                <a href="#contact">
                  Start a Project
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-1 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-8 opacity-0 animate-fade-up-delay">
              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-foreground tabular-nums" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                  <CountUp to={100} suffix="+" duration={1200} delay={1200} />
                </span>
                <span className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground">Mins Delivered</span>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-foreground tabular-nums" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                  <CountUp to={9} suffix="+" duration={1000} delay={1300} />
                </span>
                <span className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground">Brands Served</span>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-foreground tabular-nums" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                  &#8377;<CountUp to={5} suffix="k" duration={900} delay={1100} />
                </span>
                <span className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground">Starting Price</span>
              </div>
            </div>
          </div>

          {/* Right: character */}
          <div className="relative flex items-end justify-center lg:justify-end order-first lg:order-last -mb-4 lg:mb-0">
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-12 rounded-full blur-3xl pointer-events-none" style={{ background: "oklch(0.65 0.22 280 / 0.28)" }} />
            <img
              src={charPoseHero}
              alt=""
              className="relative z-10 object-contain object-bottom select-none"
              style={{
                height: "clamp(220px, 55vw, 560px)",
                maxWidth: "100%",
                filter: "drop-shadow(0 20px 40px oklch(0.65 0.22 280 / 0.25))",
                mixBlendMode: "screen",
              }}
              draggable={false}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
