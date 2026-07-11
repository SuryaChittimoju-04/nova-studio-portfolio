import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services",  href: "#services" },
  { label: "AlaChat",   href: "/alachat" },
  { label: "Pricing",   href: "#pricing" },
  { label: "Contact",   href: "#contact" },
];

interface NavbarProps {
  bannerOffset?: number;
}

export function Navbar({ bannerOffset = 0 }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y    = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 60);
      setProgress(docH > 0 ? (y / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const navTop = bannerOffset + 2;

  return (
    <>
      <style>{`
        @keyframes pointRight {
          from { transform: translateX(0px); }
          to   { transform: translateX(6px); }
        }
        @keyframes ourWorkGlow {
          from { box-shadow: 0 0 8px rgba(59,130,246,0.40); }
          to   { box-shadow: 0 0 22px rgba(59,130,246,0.75), 0 0 48px rgba(59,130,246,0.25); }
        }
        .our-work-hand { display:inline-block; animation: pointRight 0.7s ease-in-out infinite alternate; font-size:15px; line-height:1; }
        .our-work-link {
          display:inline-flex; align-items:center;
          padding: 5px 14px; border-radius: 9999px;
          font-size: 13px; font-weight: 700; color: oklch(0.65 0.17 230);
          border: none;
          background: #ffffff;
          text-decoration: none; white-space: nowrap;
          animation: ourWorkGlow 2s ease-in-out infinite alternate;
          transition: background 0.2s, color 0.2s;
        }
        .our-work-link:hover { background: #f0f4ff; }
      `}</style>

      {/* Scroll progress bar */}
      <div className="fixed left-0 right-0 z-[60] h-[2px]" style={{ top: `${bannerOffset}px` }}>
        <div
          className="h-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(to right, oklch(0.65 0.22 280), oklch(0.72 0.20 200))",
            transition: "width 0.1s linear",
            boxShadow: progress > 0 ? "0 0 8px 1px oklch(0.65 0.22 280 / 0.6)" : "none",
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="fixed left-0 right-0 z-50" style={{ top: `${navTop}px` }}>
        <div
          className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={
            scrolled
              ? {
                  maxWidth: 820,
                  margin: "10px auto 0",
                  borderRadius: 9999,
                  border: "1px solid oklch(1 0 0 / 0.12)",
                  background: "oklch(0.10 0.015 230 / 0.90)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: "0 4px 32px oklch(0 0 0 / 0.4)",
                  padding: "0 20px",
                }
              : {
                  maxWidth: "none",
                  margin: 0,
                  borderRadius: 0,
                  border: "none",
                  background: "transparent",
                  padding: "0 24px",
                }
          }
        >
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-foreground">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_3px] shadow-primary/60" />
              <span className="text-sm font-semibold tracking-[0.18em]">NOVA STUDIO</span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
              {navLinks.map((l) =>
                l.href.startsWith("/") ? (
                  <Link key={l.href} to={l.href} onClick={() => setOpen(false)}
                    className="transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.href} href={l.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}
                    className="transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                )
              )}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2.5">
              <span className="our-work-hand">👉</span>
              <Link to="/work" className="our-work-link">Our Work</Link>
              <Button size="sm" asChild>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}>
                  Start project
                </a>
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-foreground transition-colors hover:bg-white/[0.08]"
              onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div
            className="md:hidden mx-4 mt-2 rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((l) =>
                l.href.startsWith("/") ? (
                  <Link key={l.href} to={l.href} onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground">
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.href} href={l.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground">
                    {l.label}
                  </a>
                )
              )}
              <div className="mt-2 pt-2 border-t border-white/10 flex flex-col gap-2">
                <Link to="/work" onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-green-400 transition-colors hover:bg-green-500/[0.08]">
                  👉 Our Work
                </Link>
                <a href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                  className="rounded-xl px-4 py-3 text-center text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                  Start Project
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
