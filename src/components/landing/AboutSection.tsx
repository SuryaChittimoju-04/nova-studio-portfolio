import { useScrollReveal } from "@/hooks/useScrollReveal";

const AI_TOOLS = [
  "Gemini",
  "Flash",
  "Veo 3.1",
  "OpenArt",
  "Dremania.ai",
  "Midjourney",
  "Claude",
  "Higgsfield",
  "ChatGPT",
];

export function AboutSection() {
  const { ref, revealStyle } = useScrollReveal(100);

  return (
    <section
      ref={ref as any}
      style={revealStyle}
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.55 0.18 280 / 0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        {/* Label */}
        <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
          Who we are
        </span>

        {/* Heading */}
        <h2
          className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-foreground"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          Built by creators,{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, oklch(0.85 0.14 280), oklch(0.75 0.20 200))",
            }}
          >
            powered by AI
          </span>
        </h2>

        {/* Paragraph */}
        <p className="mt-7 text-base md:text-lg text-muted-foreground leading-relaxed">
          Nova Studio is a six-member collective of web developers, AI prompt
          artists, creative directors, and video editors united by one obsession —
          making brands look extraordinary. We're not a traditional agency; we're
          a fast-moving AI-native production team that ships cinematic content in
          days, not months. Right now we have hands-on expertise across the
          leading generative tools:{" "}
          <span className="text-foreground font-medium">
            {AI_TOOLS.join(", ")}
          </span>
          . As this space evolves, so do we — constantly experimenting, constantly
          pushing what's possible so your brand always looks ahead of the curve.
        </p>

        {/* Tool pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {AI_TOOLS.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-foreground"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
