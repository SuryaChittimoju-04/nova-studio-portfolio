import { Calendar, Hash, Layout, TrendingUp, MessageSquare, Image as ImageIcon } from "lucide-react";

const items = [
  { icon: Calendar, label: "Content planning", value: "30-day calendars" },
  { icon: Hash, label: "Reel strategy", value: "Hook → CTA frameworks" },
  { icon: MessageSquare, label: "Captions & copy", value: "Brand-tuned voice" },
  { icon: ImageIcon, label: "Thumbnails", value: "Click-tested designs" },
  { icon: Layout, label: "Posting creatives", value: "Carousel & static" },
  { icon: TrendingUp, label: "Campaign visuals", value: "Launch-ready assets" },
];

export function SocialSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.55 0.22 280 / 0.10), transparent 60%)",
      }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Social Media Management</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground" style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            We don't just create content —<br /><span className="text-muted-foreground">we build brand presence.</span>
          </h2>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Dashboard mock */}
          <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <div className="ml-4 flex-1 rounded-md border border-white/10 bg-background/40 px-3 py-1 text-xs text-muted-foreground">
                novastudio.app/dashboard
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
              {items.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-card/40 p-6 transition-colors hover:bg-white/[0.03]">
                  <Icon className="h-5 w-5 text-primary" />
                  <p className="mt-4 text-sm text-muted-foreground">{label}</p>
                  <p className="mt-1 text-base font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
