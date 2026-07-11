import { Play } from "lucide-react";
import realestate from "@/assets/reel-realestate-1.jpg";
import product from "@/assets/reel-product-1.jpg";
import photoshoot from "@/assets/reel-photoshoot-1.jpg";
import influencer from "@/assets/reel-influencer-1.jpg";
import healthcare from "@/assets/reel-healthcare-1.jpg";
import threeD from "@/assets/reel-3d-1.jpg";
import auto from "@/assets/reel-auto-1.jpg";
import beauty from "@/assets/reel-beauty-1.jpg";
import edu from "@/assets/reel-edu-1.jpg";
import avatar from "@/assets/reel-avatar-1.jpg";
import food from "@/assets/reel-food-1.jpg";
import watch from "@/assets/reel-watch-1.jpg";

type Reel = { src: string; label: string; tag: string };

const rowA: Reel[] = [
  { src: realestate, label: "Aurelia Residences", tag: "Real Estate" },
  { src: product, label: "Noir Fragrance Drop", tag: "Product" },
  { src: avatar, label: "Avatar Influencer Spot", tag: "AI Avatar" },
  { src: beauty, label: "Glow Serum Campaign", tag: "Beauty" },
  { src: auto, label: "Apex Motors Reveal", tag: "Automotive" },
  { src: edu, label: "EdTech Explainer", tag: "Education" },
];

const rowB: Reel[] = [
  { src: photoshoot, label: "Lança Spring Collection", tag: "AI Photoshoot" },
  { src: healthcare, label: "Healthcare Awareness", tag: "Healthcare" },
  { src: threeD, label: "Neon Geometry", tag: "3D Animation" },
  { src: influencer, label: "Golden Hour Reel", tag: "Social Reels" },
  { src: watch, label: "Tokai Chronograph", tag: "Luxury" },
  { src: food, label: "Char & Smoke", tag: "F&B" },
];

const rowC: Reel[] = [
  { src: auto, label: "Midnight Drive", tag: "Commercial" },
  { src: influencer, label: "Persona Series", tag: "Avatar" },
  { src: realestate, label: "Skyline Estates", tag: "Real Estate" },
  { src: product, label: "Maison Noir", tag: "Product" },
  { src: threeD, label: "Brand Sting", tag: "Motion" },
  { src: photoshoot, label: "Pastel Editorial", tag: "Photoshoot" },
];

const rowD: Reel[] = [
  { src: beauty, label: "Liquid Glow", tag: "Beauty" },
  { src: edu, label: "Learn Lab", tag: "EdTech" },
  { src: food, label: "Hot Smash Burger", tag: "F&B" },
  { src: watch, label: "Heritage Gold", tag: "Luxury" },
  { src: avatar, label: "Cyber Voyager", tag: "AI Influencer" },
  { src: healthcare, label: "Care Stories", tag: "Healthcare" },
];

function Row({
  reels,
  animationClass,
}: {
  reels: Reel[];
  animationClass: string;
}) {
  const doubled = [...reels, ...reels];
  return (
    <div className="overflow-hidden">
      <div className={`flex w-max gap-4 md:gap-5 ${animationClass}`}>
        {doubled.map((reel, i) => (
          <div
            key={i}
            className="group relative flex-shrink-0 w-[180px] md:w-[220px] aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-card shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-[1.03]"
          >
            <img
              src={reel.src}
              alt={reel.label}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              width={576}
              height={1024}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 top-3 flex justify-between px-3">
              <span className="rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-md">
                {reel.tag}
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Play className="h-3 w-3 fill-white text-white" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="text-[13px] font-medium text-white">{reel.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReelShowcase() {
  return (
    <section id="portfolio" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
              Portfolio
            </span>
            <h2
              className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight text-foreground"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              Cinematic work,<br />
              <span className="text-muted-foreground">delivered weekly.</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            A living gallery of recent reels — commercials, product films, avatars,
            and brand stories produced end-to-end by our AI pipeline.
          </p>
        </div>
      </div>

      <div className="space-y-4 md:space-y-5">
        <Row reels={rowA} animationClass="animate-marquee-left" />
        <Row reels={rowB} animationClass="animate-marquee-right" />
        <Row reels={rowC} animationClass="animate-marquee-left-slow" />
        <Row reels={rowD} animationClass="animate-marquee-right-fast" />
      </div>

      {/* edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </section>
  );
}
