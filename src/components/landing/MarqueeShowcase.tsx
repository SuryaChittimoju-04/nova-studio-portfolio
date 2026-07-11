// Row 1: AI images     — scrolls LEFT,  hover to enlarge
// Row 2: YT videos     — scrolls RIGHT, click opens inline modal
// Row 3: Portfolio     — scrolls LEFT,  all videos inline modal (Drive file or YouTube)

import { useState } from "react";
import { X } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// ── AI Images ────────────────────────────────────────────────────────────────
import ai01 from "@/assets/ai-images/ai_01.png";
import ai02 from "@/assets/ai-images/ai_02.png";
import ai03 from "@/assets/ai-images/ai_03.png";
import ai04 from "@/assets/ai-images/ai_04.png";
import ai05 from "@/assets/ai-images/ai_05.png";
import ai06 from "@/assets/ai-images/ai_06.png";
import ai07 from "@/assets/ai-images/ai_07.png";
import ai08 from "@/assets/ai-images/ai_08.png";
import ai09 from "@/assets/ai-images/ai_09.png";
import gym1  from "@/assets/ai-images/gym_1.jpeg";
import gym2  from "@/assets/ai-images/gym_2.jpeg";
import gym3  from "@/assets/ai-images/gym_3.jpeg";
import gym4  from "@/assets/ai-images/gym_4.jpeg";
import gym5  from "@/assets/ai-images/gym_5.jpeg";
import gym6  from "@/assets/ai-images/gym_6.jpeg";
import gym7  from "@/assets/ai-images/gym_7.jpeg";
import gym8  from "@/assets/ai-images/gym_8.jpeg";
import gym9  from "@/assets/ai-images/gym_9.jpeg";
import gym10 from "@/assets/ai-images/gym_10.jpeg";
import gym11 from "@/assets/ai-images/gym_11.jpeg";
import gym12 from "@/assets/ai-images/gym_12.jpeg";
import gym13 from "@/assets/ai-images/gym_13.jpeg";
import gym14 from "@/assets/ai-images/gym_14.jpeg";

// ── Portfolio Thumbnails ──────────────────────────────────────────────────────
import takshasila1 from "@/assets/portfolio/1-takshasila.png";
import takshasila2 from "@/assets/portfolio/2-takshasila.png";
import swechaThumb from "@/assets/portfolio/swecha.png";
import charan1     from "@/assets/portfolio/charangroup2_05.png";
import charan2     from "@/assets/portfolio/charangroup2_22.png";
import narayana    from "@/assets/portfolio/narayana.png";
import gnJewellers from "@/assets/portfolio/GN_Jewellers.png";
import gymThumb1   from "@/assets/portfolio/GYM.png";
import gymThumb2   from "@/assets/portfolio/GYM2.png";

// ── Types ─────────────────────────────────────────────────────────────────────
interface VideoCard {
  thumbnail: string;
  title: string;
  label: string;
  // embedUrl → play inline modal; externalUrl → open new tab as fallback
  embedUrl?: string;
  externalUrl?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
// hqdefault (480×360) is ALWAYS available for every YouTube video
const ytThumb  = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const ytEmbed  = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
const driveEmbed = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

// ── Row 1 data ────────────────────────────────────────────────────────────────
const aiImages = [
  ai01, ai02, ai03, ai04, ai05, ai06, ai07, ai08, ai09,
  gym1, gym2, gym3, gym4, gym5, gym6, gym7, gym8, gym9,
  gym10, gym11, gym12, gym13, gym14,
];

// ── Row 2 data — Astravidya YouTube ──────────────────────────────────────────
const row2Videos: VideoCard[] = [
  { title: "The Little Panda and the Brave Rescue Quest",    label: "Astravidya", thumbnail: ytThumb("U2Wi9DTVTTg"), embedUrl: ytEmbed("U2Wi9DTVTTg") },
  { title: "Panda's Puzzle Quest — Think, Match & Solve!",   label: "Astravidya", thumbnail: ytThumb("zT0qzhpGE8w"), embedUrl: ytEmbed("zT0qzhpGE8w") },
  { title: "The Little Ninja Cat and the Mountain Dojo Trial", label: "Astravidya", thumbnail: ytThumb("IzA-aw0LH-o"), embedUrl: ytEmbed("IzA-aw0LH-o") },
  { title: "The Little Rabbit in the Storm — Survival Quest", label: "Astravidya", thumbnail: ytThumb("LGOLoUGJNJU"), embedUrl: ytEmbed("LGOLoUGJNJU") },
  { title: "The Little Rabbit and the Hidden Cave Quest",    label: "Astravidya", thumbnail: ytThumb("iKfknckknBs"), embedUrl: ytEmbed("iKfknckknBs") },
  { title: "Honesty Makes Our Neighborhood Better!",         label: "Astravidya", thumbnail: ytThumb("gzbif2GRJSc"), embedUrl: ytEmbed("gzbif2GRJSc") },
  { title: "Animals Around Us! Learn, Explore & Have Fun!",  label: "Astravidya", thumbnail: ytThumb("9RKFYGHLh-o"), embedUrl: ytEmbed("9RKFYGHLh-o") },
  { title: "Diwali Brings Light, Happiness & Togetherness!", label: "Astravidya", thumbnail: ytThumb("KV5cZPG4q0s"), embedUrl: ytEmbed("KV5cZPG4q0s") },
  { title: "The Little Dog and the Forgotten Treasure Quest", label: "Astravidya", thumbnail: ytThumb("rIJC9ZD4HIM"), embedUrl: ytEmbed("rIJC9ZD4HIM") },
];

// ── Row 3 data — Client portfolio ─────────────────────────────────────────────
const DRIVE_FOLDER = "https://drive.google.com/drive/folders/1Nl48Iab2NyKkIqGv8p8LJtYdbC3_IxVc";

const row3Videos: VideoCard[] = [
  {
    thumbnail: takshasila1, label: "Takshasila Academy",
    title: "Why Only IIT? Why Not CUET?",
    embedUrl: driveEmbed("1TnyMw8ccQg8nvIczaf-oIphwfzIRFtsP"),
  },
  {
    thumbnail: takshasila2, label: "Takshasila Academy",
    title: "Success Has Many Paths",
    embedUrl: driveEmbed("1rkllQO9l1CiogM780Sj1OTD7dV2ZuyvH"),
  },
  {
    thumbnail: swechaThumb, label: "Swecha Healthcare",
    title: "Allergy & Asthma Centre",
    embedUrl: driveEmbed("1RnIaQNLWjAsuSTaeFevcDwfprGyGYm2H"),
  },
  {
    thumbnail: charan1, label: "Charan Group",
    title: "Building Dreams, Building Futures",
    embedUrl: ytEmbed("G2yr86K5O7Q"),
  },
  {
    thumbnail: charan2, label: "Charan Group",
    title: "Shaping Visakhapatnam's Real Estate",
    embedUrl: ytEmbed("jNVDjvVZDZM"),
  },
  // Drive folder items — open in new tab (no specific file to embed)
  { thumbnail: narayana,    label: "Narayana",    title: "Education Promo",      externalUrl: DRIVE_FOLDER },
  { thumbnail: gnJewellers, label: "GN Jewellers", title: "Jewellery Brand Film", externalUrl: DRIVE_FOLDER },
  { thumbnail: gymThumb1,   label: "GYM",         title: "Fitness Brand Ad",     externalUrl: DRIVE_FOLDER },
  { thumbnail: gymThumb2,   label: "GYM",         title: "Cinematic Gym Promo",  externalUrl: DRIVE_FOLDER },
];

// Duplicate arrays for seamless infinite scroll
const aiLoop  = [...aiImages,   ...aiImages];
const r2Loop  = [...row2Videos, ...row2Videos, ...row2Videos];
const r3Loop  = [...row3Videos, ...row3Videos, ...row3Videos];

// ── Sub-components ────────────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg className="h-6 w-6 fill-white text-white ml-0.5" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

function VideoCardBtn({
  card,
  onPlay,
  wide = true,
}: {
  card: VideoCard;
  onPlay: (embedUrl: string) => void;
  wide?: boolean;
}) {
  const handleClick = () => {
    if (card.embedUrl) {
      onPlay(card.embedUrl);
    } else if (card.externalUrl) {
      window.open(card.externalUrl, "_blank", "noopener noreferrer");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`group/card flex-shrink-0 ${wide ? "w-72 md:w-80" : "w-52 md:w-60"} aspect-video rounded-2xl overflow-hidden border border-white/10 relative transition-all duration-300 ease-out hover:scale-105 hover:border-primary/40 hover:shadow-2xl focus:outline-none`}
    >
      <img
        src={card.thumbnail}
        alt={card.title}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/55 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/80 border border-primary/60 backdrop-blur-sm shadow-lg shadow-primary/30">
          <PlayIcon />
        </div>
      </div>
      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-3 py-3">
        <p className="text-[10px] text-primary/80 mb-0.5 font-medium text-left">{card.label}</p>
        <p className="text-xs text-white truncate font-medium text-left">{card.title}</p>
      </div>
      {/* Drive folder badge */}
      {!card.embedUrl && card.externalUrl && (
        <div className="absolute top-2 right-2 rounded-full bg-black/60 border border-white/20 px-2 py-0.5 text-[9px] text-white/50 backdrop-blur-sm">
          Drive ↗
        </div>
      )}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function MarqueeShowcase() {
  const [activeEmbed, setActiveEmbed] = useState<string | null>(null);
  const { ref, revealStyle } = useScrollReveal();

  return (
    <section ref={ref as any} style={revealStyle} className="relative py-20 overflow-hidden" id="portfolio">
      {/* Edge fades — use exact dark bg colour so it never shows as white */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{ background: "linear-gradient(to right, oklch(0.14 0.015 230), transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{ background: "linear-gradient(to left, oklch(0.14 0.015 230), transparent)" }} />

      {/* Heading */}
      <div className="mx-auto max-w-7xl px-6 mb-12 text-center">
        <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Our Work</span>
        <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground"
          style={{ letterSpacing: "-0.03em" }}>
          Real brands. Real results.
        </h2>
        <p className="mt-4 text-muted-foreground">
          100+ minutes of AI-generated content across industries.
        </p>
      </div>

      {/* ROW 1 — AI Images, scrolls LEFT */}
      <div className="mb-4">
        <div
          className="flex gap-3 w-max"
          style={{ animation: "marquee-left 55s linear infinite" }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
        >
          {aiLoop.map((src, i) => (
            <div key={i}
              className="flex-shrink-0 w-52 md:w-60 aspect-square rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 ease-out hover:scale-110 hover:shadow-2xl hover:border-white/30 cursor-default"
            >
              <img src={src} alt={`AI image ${(i % aiImages.length) + 1}`}
                className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* ROW 2 — Astravidya YouTube, scrolls RIGHT */}
      <div className="mb-4">
        <div
          className="flex gap-3 w-max"
          style={{ animation: "marquee-right 65s linear infinite" }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
        >
          {r2Loop.map((card, i) => (
            <VideoCardBtn key={i} card={card} onPlay={setActiveEmbed} />
          ))}
        </div>
      </div>

      {/* ROW 3 — Client portfolio, scrolls LEFT */}
      <div>
        <div
          className="flex gap-3 w-max"
          style={{ animation: "marquee-left 70s linear infinite" }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
        >
          {r3Loop.map((card, i) => (
            <VideoCardBtn key={i} card={card} onPlay={setActiveEmbed} />
          ))}
        </div>
      </div>

      {/* Inline modal player */}
      {activeEmbed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setActiveEmbed(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
            style={{ aspectRatio: "16/9" }}
            onClick={e => e.stopPropagation()}
          >
            <iframe
              src={activeEmbed}
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
            <button
              onClick={() => setActiveEmbed(null)}
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 border border-white/20 text-white hover:bg-black focus:outline-none"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="absolute bottom-5 text-xs text-white/30 select-none">
            Click outside to close
          </p>
        </div>
      )}
    </section>
  );
}
