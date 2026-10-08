import { Button } from "@/components/ui/button";
import { ArrowRight, Play, MessageCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.currentTime >= 50) {
        video.currentTime = 0;
        video.play();
      }
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-20 pb-16">
      {/* ── Video background ── */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.80 }}
        >
          <source src="/videos/hero-bg.webm" type="video/webm" />
        </video>
        {/* Dark overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
        {/* Purple ambient tint */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 55% 55% at 20% 45%, oklch(0.55 0.22 280 / 0.22), transparent 65%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-5xl px-6 w-full">
        {/* Badge */}
        <div className="opacity-0 animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-md mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-live" />
          End-to-End AI Video Production
        </div>

        {/* Heading */}
        <h1
          className="opacity-0 animate-fade-up font-bold tracking-tight text-white mb-6"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
        >
          Your Brand Needs<br />
          <RotatingPhrase />
        </h1>

        {/* Subtext */}
        <p className="max-w-xl text-base text-white/60 opacity-0 animate-fade-up-delay md:text-lg mb-10" style={{ lineHeight: 1.7 }}>
          End-to-end AI production &mdash; script, visuals, voiceover &amp; music &mdash; delivered in days, not weeks. Starting at &#8377;12,000.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 opacity-0 animate-fade-up-delay mb-16">
          <Button size="lg" asChild>
            <Link to="/work">
              <Play className="mr-1 h-4 w-4" />
              View Our Work
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-white/20 bg-white/[0.06] backdrop-blur-md hover:bg-white/[0.12] text-white">
            <a href="#contact">
              Start a Project
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="ghost" asChild className="text-white/80 hover:text-white hover:bg-white/[0.08]">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-1 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-10 opacity-0 animate-fade-up-delay">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-white tabular-nums" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", lineHeight: 1, letterSpacing: "-0.04em" }}>
              <CountUp to={500} suffix="+" duration={1400} delay={1100} />
            </span>
            <span className="text-[10px] tracking-[0.14em] uppercase text-white/45">Mins Delivered</span>
          </div>
          <div className="h-10 w-px bg-white/15" />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-white tabular-nums" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", lineHeight: 1, letterSpacing: "-0.04em" }}>
              <CountUp to={50} suffix="+" duration={1100} delay={1200} />
            </span>
            <span className="text-[10px] tracking-[0.14em] uppercase text-white/45">Brands Served</span>
          </div>
          <div className="h-10 w-px bg-white/15" />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-white tabular-nums" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", lineHeight: 1, letterSpacing: "-0.04em" }}>
              &#8377;<CountUp to={12} suffix="k" duration={900} delay={1000} />
            </span>
            <span className="text-[10px] tracking-[0.14em] uppercase text-white/45">Starting Price</span>
          </div>
        </div>
      </div>
    </section>
  );
}
