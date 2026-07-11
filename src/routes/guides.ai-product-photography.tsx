import { createFileRoute, Link } from "@tanstack/react-router";

const URL = "https://draft-dream-deck.lovable.app/guides/ai-product-photography";

export const Route = createFileRoute("/guides/ai-product-photography")({
  component: GuidePage,
  head: () => ({
    meta: [
      { title: "AI Product Photography: A How-To Guide — Nova Studio" },
      { name: "description", content: "Replace expensive studio shoots with AI product photography. Unlimited backgrounds and lighting setups, delivered in 48–72 hours." },
      { property: "og:title", content: "AI Product Photography: A How-To Guide" },
      { property: "og:description", content: "How e-commerce brands use AI to produce studio-grade product photography in 48–72 hours." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:title", content: "AI Product Photography: A How-To Guide" },
      { name: "twitter:description", content: "How e-commerce brands use AI to produce studio-grade product photography in 48–72 hours." },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "AI Product Photography: A How-To Guide",
        description: "Replace studio shoots with AI product photography in 48–72 hours.",
        step: [
          { "@type": "HowToStep", name: "Capture a clean reference", text: "Take a sharp, well-lit reference photo of your product on a neutral surface." },
          { "@type": "HowToStep", name: "Choose your scene", text: "Pick from unlimited AI-generated backgrounds and lighting setups." },
          { "@type": "HowToStep", name: "Generate variations", text: "Produce multiple angles, seasonal scenes, and lifestyle compositions in parallel." },
          { "@type": "HowToStep", name: "Review and ship", text: "Receive final cinematic-grade product imagery within 48–72 hours." },
        ],
      }),
    }],
  }),
});

function GuidePage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-6 py-24">
        <Link to="/" className="text-sm text-primary hover:underline">← Back to Nova Studio</Link>
        <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight" style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          AI Product Photography: A How-To Guide
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Studio shoots are slow and expensive. AI product photography gives e-commerce brands unlimited
          backgrounds, lighting setups, and seasonal scenes — delivered in 48–72 hours.
        </p>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Why AI replaces the studio</h2>
          <p className="text-muted-foreground">
            A traditional product shoot costs thousands and locks you to a single backdrop. With AI you
            generate dozens of cinematic compositions from a single reference image, then iterate without
            re-booking a set.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">The four-step workflow</h2>
          <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
            <li><strong className="text-foreground">Capture a clean reference.</strong> A sharp, well-lit photo of your product on a neutral surface.</li>
            <li><strong className="text-foreground">Choose your scene.</strong> Pick from unlimited AI backgrounds and lighting setups — studio, lifestyle, seasonal.</li>
            <li><strong className="text-foreground">Generate variations.</strong> Produce angles, hero shots, and campaign sets in parallel.</li>
            <li><strong className="text-foreground">Review and ship.</strong> Final cinematic imagery delivered in 48–72 hours.</li>
          </ol>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">When to use AI vs. a real shoot</h2>
          <p className="text-muted-foreground">
            Use AI when you need volume, speed, or seasonal refreshes. Use a real shoot when you need
            specific human models or hands-on demonstration footage. Most e-commerce catalogs are 90% AI today.
          </p>
        </section>

        <div className="mt-14 rounded-2xl border border-white/10 bg-card/40 backdrop-blur-md p-8">
          <h3 className="text-xl font-semibold">Want this for your brand?</h3>
          <p className="mt-2 text-muted-foreground">Nova Studio delivers AI product photography for e-commerce in 48–72 hours.</p>
          <Link to="/" hash="contact" className="mt-4 inline-block text-primary hover:underline">Start a project →</Link>
        </div>
      </article>
    </div>
  );
}
