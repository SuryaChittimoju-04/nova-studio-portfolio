import { useScrollReveal } from "@/hooks/useScrollReveal";

export function FooterSection() {
  const { ref, revealStyle } = useScrollReveal();
  return (
    <footer ref={ref as any} style={revealStyle} className="border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_3px] shadow-primary/60" />
              <span className="text-sm font-semibold tracking-[0.18em] text-foreground">NOVA STUDIO</span>
            </div>
            <a
              href="tel:+916305779552"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors pl-4"
            >
              +91 63057 79552 · Surya
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nova Studio — AI Creative Production. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#portfolio" className="hover:text-foreground transition-colors">Portfolio</a>
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="https://www.youtube.com/@Astravidyastudios" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">YouTube</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
