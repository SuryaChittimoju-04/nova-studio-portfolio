import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WA_LINK } from "@/lib/wa";
import { MessageCircle, Youtube, Mail, Phone, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const FORM_EMAIL = "suryachittimoju3@gmail.com";

export function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const { ref, revealStyle } = useScrollReveal();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: "New enquiry from Nova Studio website" }),
      });
      if (res.ok) {
        toast.success("Thanks — we'll reach out within 24 hours! 🎉");
        form.reset();
      } else {
        throw new Error("failed");
      }
    } catch {
      toast.error("Couldn't send right now — please WhatsApp us instead.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={ref as any} style={revealStyle} id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, oklch(0.65 0.20 230 / 0.18), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Contact</span>
          <h2 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight text-foreground" style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Ready to create your<br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, oklch(0.85 0.12 280), oklch(0.75 0.18 230))" }}>
              next AI video?
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground">Drop your brief and we'll get back to you within 24 hours.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={onSubmit} className="lg:col-span-3 rounded-3xl border border-white/10 bg-card/40 backdrop-blur-md p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input name="name" placeholder="Your name" required className="bg-background/60 border-white/10" />
              <Input name="phone" type="tel" placeholder="Phone / WhatsApp" className="bg-background/60 border-white/10" />
            </div>
            <Input name="email" type="email" placeholder="Email address" required className="bg-background/60 border-white/10" />
            <Input name="brand" placeholder="Brand / company name" className="bg-background/60 border-white/10" />
            <select name="service" className="w-full rounded-md border border-white/10 bg-background/60 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">Service you are interested in...</option>
              <option value="ai-video">AI Video Generation (Rs.5,000/video)</option>
              <option value="ai-video-major">AI Video — Major Rework (Rs.7,000/video)</option>
              <option value="whatsapp-chatbot">WhatsApp Business Chatbot</option>
              <option value="other">Other / Not sure yet</option>
            </select>
            <Textarea name="message" placeholder="Tell us about your project — what do you want to communicate?" rows={4} required className="bg-background/60 border-white/10 resize-none" />
            <Button size="lg" type="submit" disabled={submitting} className="w-full">
              {submitting ? "Sending..." : <span className="flex items-center gap-1">Send brief <ArrowRight className="ml-1 h-4 w-4" /></span>}
            </Button>
          </form>

          {/* Right column */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-green-500/20 bg-green-500/[0.06] p-5 transition-colors hover:bg-green-500/10">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/20 text-green-400">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Chat on WhatsApp</p>
                <p className="text-xs text-muted-foreground mt-0.5">Fastest response — typically within an hour</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col gap-3">
              <a href={`mailto:${FORM_EMAIL}`} className="group flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-primary">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{FORM_EMAIL}</p>
                  <p className="text-[11px] text-muted-foreground">Surya — AI Strategy & Growth</p>
                </div>
              </a>
              <div className="h-px bg-white/[0.06]" />
              <a href="mailto:prafuljhaa12@gmail.com" className="group flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-primary">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">prafuljhaa12@gmail.com</p>
                  <p className="text-[11px] text-muted-foreground">Praful — Creative Head & Branding</p>
                </div>
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col gap-3">
              <a href="tel:+918121048585" className="group flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-green-400">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">+91 81210 48585</p>
                  <p className="text-[11px] text-muted-foreground">Praful Kumar Jha</p>
                </div>
              </a>
              <div className="h-px bg-white/[0.06]" />
              <a href="tel:+916305779552" className="group flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-green-400">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">+91 63057 79552</p>
                  <p className="text-[11px] text-muted-foreground">Surya Chittimoju</p>
                </div>
              </a>
            </div>

            <a href="https://www.youtube.com/@Astravidyastudios" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <Youtube className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">@Astravidyastudios</p>
                <p className="text-xs text-muted-foreground mt-0.5">Watch our latest AI video productions</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">What happens next</p>
              <ol className="space-y-2">
                {["You send us your brief", "We review and reply within 24 hours", "We share a concept and timeline", "You approve — we start production"].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold" style={{ fontSize: 9 }}>{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
