import beauty from "@/assets/reel-beauty-1.jpg";
import product from "@/assets/reel-product-1.jpg";
import photoshoot from "@/assets/reel-photoshoot-1.jpg";
import watch from "@/assets/reel-watch-1.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function PhotoshootSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">AI Photoshoots</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground" style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              AI Product Photography <span className="text-muted-foreground">without expensive studios.</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Editorial-grade imagery for ecommerce, fashion, beauty, and lifestyle brands —
              produced in days, not weeks. Cinematic lighting, photoreal textures,
              every scene built around your product.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              {[
                "Unlimited backgrounds & lighting setups",
                "Photoreal models & lifestyle scenes",
                "Campaign-ready in 48–72 hours",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="h-1 w-6 bg-primary rounded-full" />
                  {f}
                </li>
              ))}
            </ul>
            <Button size="lg" className="mt-10" asChild>
              <a href="#contact">Request a shoot<ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-8">
              <img src={beauty} alt="Beauty product shoot" loading="lazy" className="w-full aspect-[3/4] object-cover rounded-2xl border border-white/10" />
              <img src={photoshoot} alt="Fashion shoot" loading="lazy" className="w-full aspect-[3/4] object-cover rounded-2xl border border-white/10" />
            </div>
            <div className="space-y-4">
              <img src={product} alt="Product shoot" loading="lazy" className="w-full aspect-[3/4] object-cover rounded-2xl border border-white/10" />
              <img src={watch} alt="Luxury product shoot" loading="lazy" className="w-full aspect-[3/4] object-cover rounded-2xl border border-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
