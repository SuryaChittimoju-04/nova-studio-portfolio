const stats = [
  { value: "100+", label: "Minutes of cinematic content delivered" },
  { value: "12+", label: "Industries served — from real estate to healthcare" },
  { value: "End-to-end", label: "Script, scene, sound, edit, delivery" },
  { value: "48h", label: "Average turnaround for signature reels" },
];

export function TrustSection() {
  return (
    <section className="relative py-20 md:py-24 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-6 md:p-8 text-center">
              <p className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                {s.value}
              </p>
              <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
