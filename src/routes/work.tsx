import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { X, Play, ArrowLeft } from "lucide-react";

// ── Asset imports ─────────────────────────────────────────────────────────────
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
import takshasila1 from "@/assets/portfolio/1-takshasila.png";
import takshasila2 from "@/assets/portfolio/2-takshasila.png";
import swechaThumb  from "@/assets/portfolio/swecha.png";
import charan1      from "@/assets/portfolio/charangroup2_05.png";
import charan2      from "@/assets/portfolio/charangroup2_22.png";
import narayana     from "@/assets/portfolio/narayana.png";
import gnJewellers  from "@/assets/portfolio/GN_Jewellers.png";
import gymThumb1    from "@/assets/portfolio/GYM.png";
import gymThumb2    from "@/assets/portfolio/GYM2.png";

export const Route = createFileRoute("/work")({ component: WorkPage });

// ── Types ─────────────────────────────────────────────────────────────────────
type FilterId = "all" | "image" | "educational" | "reel" | "branding";

interface WorkItem {
  id: string;
  categories: FilterId[];
  type: "image" | "video";
  thumbnail: string;
  title: string;
  label: string;
  embedUrl?: string;
  externalUrl?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const ytThumb    = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const ytEmbed    = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
const driveEmbed = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
const DRIVE_FOLDER = "https://drive.google.com/drive/folders/1Nl48Iab2NyKkIqGv8p8LJtYdbC3_IxVc";

// ── Work items ────────────────────────────────────────────────────────────────
const ALL_ITEMS: WorkItem[] = [
  // ── Educational videos (Astravidya) ───────────────────────────────────────
  {
    id: "edu1", categories: ["educational", "reel"], type: "video",
    thumbnail: ytThumb("U2Wi9DTVTTg"), title: "The Little Panda and the Brave Rescue Quest",
    label: "Astravidya", embedUrl: ytEmbed("U2Wi9DTVTTg"),
  },
  {
    id: "edu2", categories: ["educational"], type: "video",
    thumbnail: ytThumb("zT0qzhpGE8w"), title: "Panda's Puzzle Quest — Think, Match & Solve!",
    label: "Astravidya", embedUrl: ytEmbed("zT0qzhpGE8w"),
  },
  {
    id: "edu3", categories: ["educational", "reel"], type: "video",
    thumbnail: ytThumb("IzA-aw0LH-o"), title: "The Little Ninja Cat and the Mountain Dojo Trial",
    label: "Astravidya", embedUrl: ytEmbed("IzA-aw0LH-o"),
  },
  {
    id: "edu4", categories: ["educational"], type: "video",
    thumbnail: ytThumb("LGOLoUGJNJU"), title: "The Little Rabbit in the Storm — Survival Quest",
    label: "Astravidya", embedUrl: ytEmbed("LGOLoUGJNJU"),
  },
  {
    id: "edu5", categories: ["educational", "reel"], type: "video",
    thumbnail: ytThumb("iKfknckknBs"), title: "The Little Rabbit and the Hidden Cave Quest",
    label: "Astravidya", embedUrl: ytEmbed("iKfknckknBs"),
  },
  {
    id: "edu6", categories: ["educational"], type: "video",
    thumbnail: ytThumb("gzbif2GRJSc"), title: "Honesty Makes Our Neighborhood Better!",
    label: "Astravidya", embedUrl: ytEmbed("gzbif2GRJSc"),
  },
  {
    id: "edu7", categories: ["educational", "reel"], type: "video",
    thumbnail: ytThumb("9RKFYGHLh-o"), title: "Animals Around Us! Learn, Explore & Have Fun!",
    label: "Astravidya", embedUrl: ytEmbed("9RKFYGHLh-o"),
  },
  {
    id: "edu8", categories: ["educational"], type: "video",
    thumbnail: ytThumb("KV5cZPG4q0s"), title: "Diwali Brings Light, Happiness & Togetherness!",
    label: "Astravidya", embedUrl: ytEmbed("KV5cZPG4q0s"),
  },
  {
    id: "edu9", categories: ["educational"], type: "video",
    thumbnail: ytThumb("rIJC9ZD4HIM"), title: "The Little Dog and the Forgotten Treasure Quest",
    label: "Astravidya", embedUrl: ytEmbed("rIJC9ZD4HIM"),
  },

  // ── Branding / client videos ───────────────────────────────────────────────
  {
    id: "br1", categories: ["branding"], type: "video",
    thumbnail: takshasila1, title: "Why Only IIT? Why Not CUET?",
    label: "Takshasila Academy", embedUrl: driveEmbed("1TnyMw8ccQg8nvIczaf-oIphwfzIRFtsP"),
  },
  {
    id: "br2", categories: ["branding"], type: "video",
    thumbnail: takshasila2, title: "Success Has Many Paths",
    label: "Takshasila Academy", embedUrl: driveEmbed("1rkllQO9l1CiogM780Sj1OTD7dV2ZuyvH"),
  },
  {
    id: "br3", categories: ["branding"], type: "video",
    thumbnail: swechaThumb, title: "Allergy & Asthma Centre",
    label: "Swecha Healthcare", embedUrl: driveEmbed("1RnIaQNLWjAsuSTaeFevcDwfprGyGYm2H"),
  },
  {
    id: "br4", categories: ["branding", "reel"], type: "video",
    thumbnail: charan1, title: "Building Dreams, Building Futures",
    label: "Charan Group", embedUrl: ytEmbed("G2yr86K5O7Q"),
  },
  {
    id: "br5", categories: ["branding"], type: "video",
    thumbnail: charan2, title: "Shaping Visakhapatnam's Real Estate",
    label: "Charan Group", embedUrl: ytEmbed("jNVDjvVZDZM"),
  },
  {
    id: "br6", categories: ["branding", "reel"], type: "video",
    thumbnail: narayana, title: "Education Promo",
    label: "Narayana", externalUrl: DRIVE_FOLDER,
  },
  {
    id: "br7", categories: ["branding", "reel"], type: "video",
    thumbnail: gnJewellers, title: "Jewellery Brand Film",
    label: "GN Jewellers", externalUrl: DRIVE_FOLDER,
  },
  {
    id: "br8", categories: ["branding", "reel"], type: "video",
    thumbnail: gymThumb1, title: "Fitness Brand Ad",
    label: "GYM", externalUrl: DRIVE_FOLDER,
  },
  {
    id: "br9", categories: ["branding", "reel"], type: "video",
    thumbnail: gymThumb2, title: "Cinematic Gym Promo",
    label: "GYM", externalUrl: DRIVE_FOLDER,
  },

  // ── AI images ──────────────────────────────────────────────────────────────
  { id: "ai1", categories: ["image"], type: "image", thumbnail: ai01, title: "AI Product Visual", label: "Nova Studio" },
  { id: "ai2", categories: ["image"], type: "image", thumbnail: ai02, title: "AI Product Visual", label: "Nova Studio" },
  { id: "ai3", categories: ["image"], type: "image", thumbnail: ai03, title: "AI Product Visual", label: "Nova Studio" },
  { id: "ai4", categories: ["image"], type: "image", thumbnail: ai04, title: "AI Product Visual", label: "Nova Studio" },
  { id: "ai5", categories: ["image"], type: "image", thumbnail: ai05, title: "AI Product Visual", label: "Nova Studio" },
  { id: "ai6", categories: ["image"], type: "image", thumbnail: ai06, title: "AI Product Visual", label: "Nova Studio" },
  { id: "ai7", categories: ["image"], type: "image", thumbnail: ai07, title: "AI Product Visual", label: "Nova Studio" },
  { id: "ai8", categories: ["image"], type: "image", thumbnail: ai08, title: "AI Product Visual", label: "Nova Studio" },
  { id: "ai9", categories: ["image"], type: "image", thumbnail: ai09, title: "AI Product Visual", label: "Nova Studio" },

  // ── Gym photos ─────────────────────────────────────────────────────────────
  { id: "g1",  categories: ["image"], type: "image", thumbnail: gym1,  title: "Gym Photography", label: "Fitness Brand" },
  { id: "g2",  categories: ["image"], type: "image", thumbnail: gym2,  title: "Gym Photography", label: "Fitness Brand" },
  { id: "g3",  categories: ["image"], type: "image", thumbnail: gym3,  title: "Gym Photography", label: "Fitness Brand" },
  { id: "g4",  categories: ["image"], type: "image", thumbnail: gym4,  title: "Gym Photography", label: "Fitness Brand" },
  { id: "g5",  categories: ["image"], type: "image", thumbnail: gym5,  title: "Gym Photography", label: "Fitness Brand" },
  { id: "g6",  categories: ["image"], type: "image", thumbnail: gym6,  title: "Gym Photography", label: "Fitness Brand" },
  { id: "g7",  categories: ["image"], type: "image", thumbnail: gym7,  title: "Gym Photography", label: "Fitness Brand" },
  { id: "g8",  categories: ["image"], type: "image", thumbnail: gym8,  title: "Gym Photography", label: "Fitness Brand" },
  { id: "g9",  categories: ["image"], type: "image", thumbnail: gym9,  title: "Gym Photography", label: "Fitness Brand" },
  { id: "g10", categories: ["image"], type: "image", thumbnail: gym10, title: "Gym Photography", label: "Fitness Brand" },
  { id: "g11", categories: ["image"], type: "image", thumbnail: gym11, title: "Gym Photography", label: "Fitness Brand" },
  { id: "g12", categories: ["image"], type: "image", thumbnail: gym12, title: "Gym Photography", label: "Fitness Brand" },
  { id: "g13", categories: ["image"], type: "image", thumbnail: gym13, title: "Gym Photography", label: "Fitness Brand" },
  { id: "g14", categories: ["image"], type: "image", thumbnail: gym14, title: "Gym Photography", label: "Fitness Brand" },
];

// ── Filter config ─────────────────────────────────────────────────────────────
const FILTERS: { id: FilterId; label: string; emoji: string }[] = [
  { id: "all",         label: "All",                emoji: "✦" },
  { id: "image",       label: "Images",             emoji: "🖼" },
  { id: "educational", label: "Educational Videos", emoji: "🎓" },
  { id: "reel",        label: "Reels / Shorts",     emoji: "🎬" },
  { id: "branding",    label: "Branding",           emoji: "✦" },
];

// ── Card components ───────────────────────────────────────────────────────────
function ImageCard({ item, onClick }: { item: WorkItem; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03] cursor-zoom-in focus:outline-none"
      style={{ transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease" }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.5)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "";
        (e.currentTarget as HTMLElement).style.boxShadow = "";
        (e.currentTarget as HTMLElement).style.borderColor = "";
      }}
    >
      <img
        src={item.thumbnail}
        alt={item.title}
        loading="lazy"
        className="w-full h-auto block"
        style={{ display: "block" }}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
        <span
          className="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 text-xs font-medium tracking-widest uppercase text-white bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-4 py-2"
        >
          View
        </span>
      </div>
      {/* Label badge */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-3 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <p className="text-[10px] text-white/50 font-medium">{item.label}</p>
      </div>
    </button>
  );
}

function VideoCard({ item, onPlay }: { item: WorkItem; onPlay: () => void }) {
  const handleClick = () => {
    if (item.embedUrl) { onPlay(); }
    else if (item.externalUrl) { window.open(item.externalUrl, "_blank", "noopener noreferrer"); }
  };

  return (
    <button
      onClick={handleClick}
      className="group relative w-full overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03] cursor-pointer focus:outline-none"
      style={{ transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease" }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.5)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "";
        (e.currentTarget as HTMLElement).style.boxShadow = "";
        (e.currentTarget as HTMLElement).style.borderColor = "";
      }}
    >
      <img
        src={item.thumbnail}
        alt={item.title}
        loading="lazy"
        className="w-full h-auto block"
      />
      {/* Dark overlay always present on video */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/55 transition-colors duration-300" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 border border-white/25 backdrop-blur-sm group-hover:bg-primary/80 group-hover:border-primary/60 group-hover:shadow-lg transition-all duration-300"
          style={{ boxShadow: "" }}
        >
          <Play className="h-5 w-5 fill-white text-white ml-0.5" />
        </div>
      </div>
      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-3 py-3">
        <p className="text-[10px] text-primary/80 mb-0.5 font-medium text-left">{item.label}</p>
        <p className="text-xs text-white truncate font-medium text-left">{item.title}</p>
      </div>
      {/* Drive badge */}
      {!item.embedUrl && item.externalUrl && (
        <div className="absolute top-2 right-2 rounded-full bg-black/60 border border-white/20 px-2 py-0.5 text-[9px] text-white/50 backdrop-blur-sm">
          Drive ↗
        </div>
      )}
    </button>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
function WorkPage() {
  const [filter, setFilter]         = useState<FilterId>("all");
  const [activeEmbed, setActiveEmbed] = useState<string | null>(null);
  const [lightbox, setLightbox]     = useState<WorkItem | null>(null);
  const [mounted, setMounted]       = useState(false);

  useEffect(() => {
    document.documentElement.style.background = "#09090b";
    document.body.style.background = "#09090b";
    document.documentElement.classList.add("dark");
    setMounted(true);
    return () => {
      document.documentElement.style.background = "";
      document.body.style.background = "";
    };
  }, []);

  // Close modals on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setActiveEmbed(null); setLightbox(null); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = filter === "all"
    ? ALL_ITEMS
    : ALL_ITEMS.filter(item => item.categories.includes(filter));

  const handleCardAction = useCallback((item: WorkItem) => {
    if (item.type === "image") { setLightbox(item); }
    else if (item.embedUrl)   { setActiveEmbed(item.embedUrl); }
    else if (item.externalUrl){ window.open(item.externalUrl, "_blank", "noopener noreferrer"); }
  }, []);

  return (
    <div className="dark min-h-screen text-white" style={{ background: "#09090b" }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        .work-grid {
          columns: 3 260px;
          column-gap: 10px;
        }
        .work-grid > * {
          break-inside: avoid;
          margin-bottom: 10px;
          display: block;
        }
        @media (max-width: 640px) {
          .work-grid { columns: 2 160px; column-gap: 6px; }
          .work-grid > * { margin-bottom: 6px; }
        }
        .filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s ease;
          white-space: nowrap;
          background: transparent;
          color: rgba(255,255,255,0.45);
          border-color: rgba(255,255,255,0.1);
        }
        .filter-pill:hover {
          color: rgba(255,255,255,0.85);
          border-color: rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.05);
        }
        .filter-pill.active {
          background: #ffffff;
          color: #09090b;
          border-color: #ffffff;
          font-weight: 600;
        }
        .grid-item-enter {
          animation: fadeInUp 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
      `}</style>

      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 border-b border-white/[0.06]"
        style={{ background: "oklch(0.08 0.01 230 / 0.92)", backdropFilter: "blur(20px)" }}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between gap-4">
            {/* Back link */}
            <Link to="/" className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/80 transition-colors shrink-0">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Nova Studio</span>
            </Link>

            {/* Filter pills — horizontally scrollable */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1 justify-center">
              {FILTERS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`filter-pill${filter === f.id ? " active" : ""}`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Item count */}
            <span className="text-xs text-white/25 shrink-0 tabular-nums">
              {filtered.length}
            </span>
          </div>
        </div>
      </div>

      {/* ── Page heading ────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 pt-10 pb-6"
        style={{ animation: mounted ? "fadeInUp 0.5s ease both" : "none" }}>
        <p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: "#22c55e" }}>
          Our Work
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-white"
          style={{ letterSpacing: "-0.03em" }}>
          Real brands. Real results.
        </h1>
        <p className="mt-2 text-sm text-white/40">
          AI visuals, educational content & brand films — all under one roof.
        </p>
      </div>

      {/* ── Bento masonry grid ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 pb-20">
        <div className="work-grid">
          {filtered.map((item, idx) => (
            <div
              key={`${filter}-${item.id}`}
              className="grid-item-enter"
              style={{ animationDelay: `${Math.min(idx * 30, 300)}ms` }}
            >
              {item.type === "image" ? (
                <ImageCard item={item} onClick={() => handleCardAction(item)} />
              ) : (
                <VideoCard item={item} onPlay={() => handleCardAction(item)} />
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-4xl mb-4">🎨</p>
            <p className="text-white/40 text-sm">Nothing here yet — check back soon.</p>
          </div>
        )}
      </div>

      {/* ── Video modal ──────────────────────────────────────────────────────── */}
      {activeEmbed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)", animation: "scaleIn 0.2s ease both" }}
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
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
            <button
              onClick={() => setActiveEmbed(null)}
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 border border-white/20 text-white hover:bg-black transition-colors focus:outline-none"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="absolute bottom-5 text-xs text-white/25 select-none">
            Press Esc or click outside to close
          </p>
        </div>
      )}

      {/* ── Image lightbox ───────────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)", animation: "scaleIn 0.18s ease both" }}
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox.thumbnail}
            alt={lightbox.title}
            className="max-h-[90vh] max-w-[90vw] w-auto h-auto rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 border border-white/20 text-white hover:bg-black transition-colors focus:outline-none"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="absolute bottom-5 text-xs text-white/25 select-none">
            Press Esc or click outside to close
          </p>
        </div>
      )}
    </div>
  );
}
