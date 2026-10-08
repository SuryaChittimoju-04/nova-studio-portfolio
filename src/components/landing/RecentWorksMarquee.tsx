import { Play } from "lucide-react";

const WORKS = [
  {
    label: "Industrial Showcase",
    category: "Real Estate",
    emoji: "🏠",
    href: "https://drive.google.com/file/d/1wN2DZL6ghCvvfb4pI4VWrfOb1R4D8h4x/view?usp=drive_link",
    accent: "#00C8B4",
    bg: "linear-gradient(135deg, rgba(0,200,180,0.12) 0%, rgba(0,150,140,0.06) 100%)",
  },
  {
    label: "Indian Oil Testimonial",
    category: "Corporate Film",
    emoji: "🏭",
    href: "https://drive.google.com/file/d/1vkuvriS-J3Q4fSnReQpZB9Nr7GpPz2wL/view?usp=drive_link",
    accent: "#818cf8",
    bg: "linear-gradient(135deg, rgba(129,140,248,0.12) 0%, rgba(99,102,241,0.06) 100%)",
  },
  {
    label: "Indian Oil × Dr.Marketo",
    category: "Brand Campaign",
    emoji: "⚡",
    href: "https://youtu.be/KeZToOaCfUw",
    accent: "#F59E0B",
    bg: "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(180,120,0,0.06) 100%)",
  },
  {
    label: "AI Avatar Campaign",
    category: "AI Video",
    emoji: "🎭",
    href: "https://www.behance.net/prafuljha12",
    accent: "#A855F7",
    bg: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(120,60,200,0.06) 100%)",
  },
  {
    label: "Motion Graphics Reel",
    category: "Motion Design",
    emoji: "✨",
    href: "https://www.behance.net/prafuljha12",
    accent: "#34d399",
    bg: "linear-gradient(135deg, rgba(52,211,153,0.12) 0%, rgba(20,160,100,0.06) 100%)",
  },
  {
    label: "Cinematic Brand Film",
    category: "Brand Film",
    emoji: "🎬",
    href: "https://youtu.be/KeZToOaCfUw",
    accent: "#fb7185",
    bg: "linear-gradient(135deg, rgba(251,113,133,0.12) 0%, rgba(200,60,80,0.06) 100%)",
  },
];

const ITEMS = [...WORKS, ...WORKS];

export function RecentWorksMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.07] py-8 bg-white/[0.01]">
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 36s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-box {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .marquee-box:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.45);
        }
      `}</style>

      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-background to-transparent" />

      {/* Section label */}
      <p className="text-center text-xl font-bold tracking-[0.15em] uppercase text-white/70 mb-6">
        Recent Works
      </p>

      <div className="marquee-track select-none">
        {ITEMS.map((item, i) => (
          <div key={i} className="mx-3 flex-shrink-0">
            <div
              className="marquee-box rounded-xl border border-white/[0.10] cursor-default flex flex-col justify-between"
              style={{
                width: 200,
                height: 130,
                background: item.bg,
                borderColor: `${item.accent}30`,
                padding: "18px 20px",
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <span className="text-2xl leading-none">{item.emoji}</span>
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ background: `${item.accent}20` }}
                >
                  <Play className="h-3 w-3" style={{ color: item.accent }} />
                </div>
              </div>

              {/* Bottom text */}
              <div>
                <p className="text-sm font-semibold text-white/90 leading-snug">{item.label}</p>
                <p
                  className="text-[11px] font-medium mt-1"
                  style={{ color: item.accent }}
                >
                  {item.category}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
