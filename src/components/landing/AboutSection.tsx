import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExternalLink } from "lucide-react";

const AI_TOOLS = [
  "Gemini", "Veo 3.1", "Flash", "OpenArt", "Dremania.ai",
  "Midjourney", "Claude", "Higgsfield", "ChatGPT",
];

const TEAM = [
  {
    initials: "PK",
    name: "Praful Kumar Jha",
    title: "Creative Head & Branding Specialist",
    experience: "11 Years",
    bio: "With over a decade at the intersection of Creative Direction and hands-on execution, Praful specialises in transforming complex business goals into compelling visual narratives. He leads end-to-end project lifecycles — from branding strategy to final-cut delivery — integrating AI-driven tools with traditional craftsmanship to produce future-proof content.",
    skills: ["Branding & Identity", "Motion Graphics", "Video Editing", "Graphic Design", "Creative Direction", "AI Visual Campaigns"],
    industries: ["Real Estate", "Education", "Corporate", "Healthcare", "IT & Tech", "FMCG"],
    tools: "Premiere Pro · After Effects · Illustrator · Photoshop · Canva",
    link: { label: "View Portfolio on Behance", href: "https://www.behance.net/prafuljha12" },
    accent: "#818cf8",
    gradFrom: "rgba(99,102,241,0.14)",
    borderHover: "rgba(129,140,248,0.45)",
  },
  {
    initials: "SC",
    name: "Surya Chittimoju",
    title: "Gen AI Strategist & Growth Lead",
    experience: "AI-Native",
    bio: "Surya bridges the gap between cutting-edge generative AI and real-world brand growth. He handles content strategy, AI pipeline architecture, and digital marketing — ensuring every Nova Studio production is not just visually stunning, but strategically built to perform and convert.",
    skills: ["Generative AI", "Content Strategy", "Digital Marketing", "Web Development", "AI Prompt Engineering", "Growth & Distribution"],
    industries: ["D2C Brands", "SaaS", "E-Commerce", "Creators", "Startups", "Agencies"],
    tools: "Gemini · Veo 3.1 · Midjourney · Claude · Higgsfield · ChatGPT",
    link: null,
    accent: "#34d399",
    gradFrom: "rgba(52,211,153,0.10)",
    borderHover: "rgba(52,211,153,0.45)",
  },
];

export function AboutSection() {
  const { ref, revealStyle } = useScrollReveal(100);

  return (
    <section ref={ref as any} style={revealStyle} id="about" className="relative py-24 md:py-32 overflow-hidden">
      <style>{`
        .about-card {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(16px);
        }
        .about-card:hover { transform: translateY(-4px); box-shadow: 0 24px 64px rgba(0,0,0,0.5); }
        .about-card-pk:hover { border-color: rgba(129,140,248,0.40); }
        .about-card-sc:hover { border-color: rgba(52,211,153,0.40); }
        .skill-tag {
          display: inline-flex;
          align-items: center;
          padding: 5px 12px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 500;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.60);
          cursor: default;
          transition: all 0.22s ease;
        }
        .skill-tag:hover {
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.95);
          transform: translateY(-1px);
        }
        .skill-tag-pk:hover { background: rgba(129,140,248,0.15); border-color: rgba(129,140,248,0.40); color: #c7d2fe; }
        .skill-tag-sc:hover { background: rgba(52,211,153,0.12); border-color: rgba(52,211,153,0.35); color: #6ee7b7; }
        .tool-pill { transition: all 0.22s ease; }
        .tool-pill:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.28); color: rgba(255,255,255,0.90); transform: scale(1.04); }
      `}</style>

      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 40%, oklch(0.55 0.18 280 / 0.08), transparent 70%)" }} />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">The Team</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-white" style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Two specialists,{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, oklch(0.85 0.14 280), oklch(0.75 0.20 200))" }}>
              one studio
            </span>
          </h2>
          <p className="mt-4 text-white/55 max-w-xl mx-auto text-base">
            Nova Studio is built on a simple formula — a decade of creative craft + the full power of generative AI.
          </p>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {TEAM.map((person, idx) => (
            <div
              key={person.name}
              className={`about-card about-card-${idx === 0 ? "pk" : "sc"} relative rounded-3xl p-8 md:p-10 flex flex-col gap-6 overflow-hidden`}
            >
              {/* Card glow */}
              <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: `radial-gradient(ellipse 80% 55% at 20% 0%, ${person.gradFrom}, transparent)` }} />

              {/* Avatar + name */}
              <div className="relative flex items-center gap-5">
                <div
                  className="flex-shrink-0 h-16 w-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${person.accent}cc, ${person.accent}66)`, boxShadow: `0 0 28px ${person.accent}55` }}
                >
                  {person.initials}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                  <p className="text-sm text-white/55 mt-0.5">{person.title}</p>
                  <span className="mt-1.5 inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ color: person.accent, background: `${person.accent}18`, border: `1px solid ${person.accent}40` }}>
                    {person.experience}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="relative text-sm text-white/70 leading-[1.75]">{person.bio}</p>

              {/* Skills */}
              <div className="relative">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35 mb-3">Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {person.skills.map((s) => (
                    <span key={s} className={`skill-tag skill-tag-${idx === 0 ? "pk" : "sc"}`}>{s}</span>
                  ))}
                </div>
              </div>

              {/* Industries */}
              <div className="relative">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35 mb-2">Industries</p>
                <p className="text-sm text-white/60">{person.industries.join(" · ")}</p>
              </div>

              {/* Tools */}
              <div className="relative">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35 mb-2">Tools</p>
                <p className="text-sm text-white/60">{person.tools}</p>
              </div>

              {/* Behance link */}
              {person.link && (
                <div className="relative mt-auto pt-4 border-t border-white/[0.07]">
                  <a href={person.link.href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                    style={{ color: person.accent }}
                  >
                    {person.link.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI Tools strip */}
        <div className="mt-16 text-center">
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-5">AI Arsenal</p>
          <div className="flex flex-wrap justify-center gap-2">
            {AI_TOOLS.map((tool) => (
              <span key={tool} className="tool-pill rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/55 cursor-default">
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
