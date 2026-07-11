import { useState } from "react";
import { Play, ExternalLink, X } from "lucide-react";

import charangroup1 from "@/assets/portfolio/charangroup2_05.png";
import charangroup2 from "@/assets/portfolio/charangroup2_22.png";
import takshasila1 from "@/assets/portfolio/1-takshasila.png";
import takshasila2 from "@/assets/portfolio/2-takshasila.png";
import narayana from "@/assets/portfolio/narayana.png";
import swecha from "@/assets/portfolio/swecha.png";
import gym1 from "@/assets/portfolio/GYM.png";
import gym2 from "@/assets/portfolio/GYM2.png";
import gnJewellers from "@/assets/portfolio/GN_Jewellers.png";

type VideoType = "youtube" | "channel" | "drive";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  type: VideoType;
  videoId?: string;
  format: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Charan Group",
    subtitle: "Real Estate Commercial",
    category: "Real Estate",
    thumbnail: charangroup1,
    videoUrl: "https://youtu.be/G2yr86K5O7Q",
    type: "youtube",
    videoId: "G2yr86K5O7Q",
    format: "Landscape",
  },
  {
    id: 2,
    title: "Charan Group",
    subtitle: "Property Ad Film",
    category: "Real Estate",
    thumbnail: charangroup2,
    videoUrl: "https://youtu.be/jNVDjvVZDZM",
    type: "youtube",
    videoId: "jNVDjvVZDZM",
    format: "Landscape",
  },
  {
    id: 3,
    title: "Takshasila",
    subtitle: "3D Education Series",
    category: "Education",
    thumbnail: takshasila1,
    videoUrl: "https://www.youtube.com/@Astravidyastudios",
    type: "channel",
    format: "Reel",
  },
  {
    id: 4,
    title: "Takshasila",
    subtitle: "Animated Learning Content",
    category: "Education",
    thumbnail: takshasila2,
    videoUrl: "https://www.youtube.com/@Astravidyastudios",
    type: "channel",
    format: "Reel",
  },
  {
    id: 5,
    title: "Narayana",
    subtitle: "Education Promo Film",
    category: "Education",
    thumbnail: narayana,
    videoUrl: "https://www.youtube.com/@Astravidyastudios",
    type: "channel",
    format: "Landscape",
  },
  {
    id: 6,
    title: "Swecha",
    subtitle: "Tech Brand Video",
    category: "Tech & Edu",
    thumbnail: swecha,
    videoUrl: "https://drive.google.com/drive/folders/1Nl48Iab2NyKkIqGv8p8LJtYdbC3_IxVc",
    type: "drive",
    format: "Landscape",
  },
  {
    id: 7,
    title: "GYM Commercial",
    subtitle: "Fitness Brand Ad",
    category: "Fitness",
    thumbnail: gym1,
    videoUrl: "https://drive.google.com/drive/folders/1Nl48Iab2NyKkIqGv8p8LJtYdbC3_IxVc",
    type: "drive",
    format: "Reel",
  },
  {
    id: 8,
    title: "GYM Promo",
    subtitle: "Cinematic Fitness Ad",
    category: "Fitness",
    thumbnail: gym2,
    videoUrl: "https://drive.google.com/drive/folders/1Nl48Iab2NyKkIqGv8p8LJtYdbC3_IxVc",
    type: "drive",
    format: "Reel",
  },
  {
    id: 9,
    title: "GN Jewellers",
    subtitle: "Luxury Brand Film",
    category: "Jewellery",
    thumbnail: gnJewellers,
    videoUrl: "https://drive.google.com/drive/folders/1Nl48Iab2NyKkIqGv8p8LJtYdbC3_IxVc",
    type: "drive",
    format: "Landscape",
  },
];

const categories = ["All", "Real Estate", "Education", "Fitness", "Jewellery", "Tech & Edu"];

const categoryColors: Record<string, string> = {
  "Real Estate": "oklch(0.65 0.18 230 / 0.9)",
  "Education": "oklch(0.70 0.16 150 / 0.9)",
  "Fitness": "oklch(0.65 0.20 30 / 0.9)",
  "Jewellery": "oklch(0.75 0.14 60 / 0.9)",
  "Tech & Edu": "oklch(0.65 0.18 280 / 0.9)",
};

export function PortfolioSection() {
  const [active, setActive] = useState("All");
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  const handleCardClick = (project: Project) => {
    if (project.type === "youtube" && project.videoId) {
      setModalVideoId(project.videoId);
    } else {
      window.open(project.videoUrl, "_blank", "noopener noreferrer");
    }
  };

  return (
    <section id="portfolio" className="relative py-24 md:py-32">
      {/* subtle top gradient */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.55 0.22 280 / 0.4), transparent)" }}
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Our Work</span>
          <h2
            className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground"
            style={{ letterSpacing: "-0.03em" }}
          >
            Real brands. Real results.
          </h2>
          <p className="mt-4 text-muted-foreground">
            100+ minutes of AI-generated video delivered across industries.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 border ${
                active === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_14px_2px] shadow-primary/30"
                  : "border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <button
              key={project.id}
              onClick={() => handleCardClick(project)}
              className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-card/40 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Thumbnail */}
              <img
                src={project.thumbnail}
                alt={`${project.title} — ${project.subtitle}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                  {project.type === "youtube" ? (
                    <Play className="h-6 w-6 text-white fill-white ml-0.5" />
                  ) : (
                    <ExternalLink className="h-5 w-5 text-white" />
                  )}
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="text-xs text-white/60 mb-0.5">{project.subtitle}</p>
                    <p className="text-sm font-semibold text-white">{project.title}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium text-black"
                      style={{ background: categoryColors[project.category] || "#fff" }}
                    >
                      {project.category}
                    </span>
                    <span className="text-[10px] text-white/40">{project.format}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Drive CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://drive.google.com/drive/folders/1Nl48Iab2NyKkIqGv8p8LJtYdbC3_IxVc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground hover:border-white/20"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View full client portfolio on Drive
          </a>
        </div>
      </div>

      {/* YouTube Lightbox Modal */}
      {modalVideoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setModalVideoId(null)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${modalVideoId}?autoplay=1&rel=0`}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
            <button
              onClick={() => setModalVideoId(null)}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
              aria-label="Close video"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
