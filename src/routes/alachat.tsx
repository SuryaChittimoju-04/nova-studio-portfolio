import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  MessageSquare, CalendarCheck, Send, Inbox, Users, BarChart3,
  ArrowRight, Check, Zap, Clock, Wallet, FileText, Star, Phone,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WA_LINK } from "@/lib/wa";

const SITE_URL = "https://draft-dream-deck.lovable.app";

export const Route = createFileRoute("/alachat")({
  component: WhatsAppChatbotPage,
  head: () => ({
    meta: [
      { title: "WhatsApp Chatbot Service — Nova Studio" },
      { name: "description", content: "Custom WhatsApp chatbots for small and medium businesses. 24/7 automated replies, appointment booking, bulk broadcast and monthly reports — live in minutes." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/alachat` }],
  }),
});

// ─── Canvas particle-network hero background ────────────────────────────────
function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const COUNT = 110;

    type P = { x:number; y:number; vx:number; vy:number; r:number; green:boolean; phase:number };
    let pts: P[] = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * Math.min(window.devicePixelRatio, 2);
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 2);
      ctx.scale(Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2));
    };

    const init = () => {
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      pts = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.6 + 0.6,
        green: Math.random() > 0.32,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    let t = 0;
    const draw = () => {
      animId = requestAnimationFrame(draw);
      t += 0.008;
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // Update positions
      for (const p of pts) {
        p.x += p.vx + Math.sin(t + p.phase) * 0.12;
        p.y += p.vy + Math.cos(t + p.phase) * 0.09;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      }

      // Connections
      const DIST = 145;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) {
            const a = (1 - d / DIST) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,197,94,${a})`;
            ctx.lineWidth   = 0.6;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      // Dots
      for (const p of pts) {
        const pulse = 0.55 + 0.25 * Math.sin(t * 1.4 + p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.green
          ? `rgba(34,197,94,${pulse})`
          : `rgba(200,220,255,${pulse * 0.55})`;
        ctx.fill();
      }

      // Rotating ring (decorative)
      const cx = W * 0.78, cy = H * 0.42, rad = Math.min(W, H) * 0.22;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.18);
      ctx.beginPath();
      ctx.arc(0, 0, rad, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(34,197,94,0.055)";
      ctx.lineWidth   = 1;
      ctx.setLineDash([6, 18]);
      ctx.stroke();
      ctx.setLineDash([]);
      // inner ring
      ctx.beginPath();
      ctx.arc(0, 0, rad * 0.62, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(34,197,94,0.04)";
      ctx.lineWidth   = 0.8;
      ctx.stroke();
      ctx.restore();
    };

    resize();
    init();
    draw();

    const onResize = () => { resize(); init(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

// ─── Animated counter ────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  const [on, setOn]   = useState(false);
  const ref           = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!on) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p    = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [on, target, duration]);

  return { val, ref };
}

// ─── 3-D tilt card ───────────────────────────────────────────────────────────
function TiltCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: CSSProperties }) {
  const card = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = card.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - 0.5;
    const y  = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-6px) scale(1.01)`;
    el.style.transition = "transform 0.08s ease";
    el.style.borderColor = "rgba(34,197,94,0.28)";
    el.style.boxShadow   = "0 16px 48px rgba(34,197,94,0.10), 0 2px 16px rgba(0,0,0,0.35)";
  };
  const onLeave = () => {
    const el = card.current;
    if (!el) return;
    el.style.transform   = "";
    el.style.transition  = "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease, border-color 0.5s ease";
    el.style.borderColor = "";
    el.style.boxShadow   = "";
  };

  return (
    <div
      ref={card}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
}

// ─── Section wrapper ─────────────────────────────────────────────────────────
function Section({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, revealStyle } = useScrollReveal(delay);
  return <section ref={ref as any} style={revealStyle} className={className}>{children}</section>;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const steps = [
  { num: "01", title: "Share Your Requirements", desc: "Tell us about your business — what you sell, how customers contact you, and what you want the bot to do. A quick call or message is enough.", note: "No tech jargon. Just a conversation." },
  { num: "02", title: "We Build Your Custom Bot", desc: "We design and configure your complete WhatsApp flow — menus, replies, booking flows, broadcast templates. Simple setups take as little as 5 minutes.", note: "Every bot is unique to your business." },
  { num: "03", title: "You Go Live on WhatsApp", desc: "Your bot connects to your WhatsApp Business number and starts handling conversations immediately — 24/7, even when you're offline.", note: "Weekly & monthly reports delivered to you." },
];

const features = [
  { icon: MessageSquare, title: "24/7 WhatsApp Chatbot",    desc: "Instant automated replies on your own number — unlimited conversations, no coding.",   pts: ["Tap-to-navigate button menus", "Auto greeting & farewell", "Human agent takeover"] },
  { icon: CalendarCheck, title: "Appointment Booking",      desc: "Full scheduling for clinics, salons, gyms — no separate app or form needed.",           pts: ["Live slot availability", "Cancel & reschedule", "Configurable hours & buffers"] },
  { icon: Send,          title: "Bulk Broadcast",            desc: "Reach all customers at once with offers, reminders, updates — in multiple languages.",   pts: ["Schedule campaigns in advance", "Per-recipient delivery tracking", "Hindi, Telugu, Tamil & more"] },
  { icon: Inbox,         title: "Customer Inbox",            desc: "Every conversation in one dashboard — full history, search, instant handoff.",           pts: ["Search by number or keyword", "Timestamped history", "Reply from platform"] },
  { icon: Users,         title: "Contacts & CRM",            desc: "Every customer who messages you is saved and ready to tag, note, and export.",           pts: ["Tag: VIP / Follow-Up / Interested", "Private notes per contact", "Export CSV anytime"] },
  { icon: BarChart3,     title: "Analytics + Reports",       desc: "Weekly and monthly interaction reports — conversations, drop-offs, peak hours.",         pts: ["Total conversations & unique users", "Most-clicked menu items", "90-day daily trend"] },
];

const additionalServices = [
  { category: "Customer Acquisition & Sales", items: [
    { n: "Lead Capture Bot",           d: "Bot collects name, requirement and location — a ready lead with zero manual effort." },
    { n: "Product Catalog on WhatsApp",d: "Customers browse your catalog inside WhatsApp — no website needed." },
    { n: "Payment Link via Bot",       d: "Bot sends a UPI or Razorpay link; customer pays without leaving WhatsApp." },
    { n: "Abandoned Follow-up",        d: "Auto-messages customers who didn't complete a booking or order." },
  ]},
  { category: "Customer Retention & Loyalty", items: [
    { n: "Drip Campaigns",             d: "Planned message sequences over multiple days, running automatically." },
    { n: "Re-engagement Campaigns",    d: "Auto-messages inactive customers after 30 or 60 days." },
    { n: "Loyalty & Referral Bot",     d: "Track repeat visits, reward loyal customers, generate referral links." },
    { n: "Birthday / Anniversary",     d: "Personalised wishes + offer sent automatically on the right date." },
  ]},
  { category: "Money & Payments", items: [
    { n: "Invoice via WhatsApp",       d: "Generate and send invoice right after a purchase — no email needed." },
    { n: "EMI Reminder Bot",           d: "Auto-message customers with pending payments, reducing follow-up calls." },
    { n: "Payment Receipt",            d: "Customers get instant confirmation the moment they pay." },
    { n: "EMI Calculator Bot",         d: "Customer types an amount → bot replies with full EMI breakup." },
  ]},
  { category: "Staff & Internal Operations", items: [
    { n: "Multi-Agent Team Inbox",     d: "Multiple staff handle different customers simultaneously with smart routing." },
    { n: "Attendance via WhatsApp",    d: "Staff mark attendance by messaging the bot — owner sees daily log." },
    { n: "Daily Sales Report",         d: "Automated evening summary: orders, revenue, conversations." },
    { n: "Employee Onboarding",        d: "Documents and welcome messages sent automatically to new hires." },
  ]},
  { category: "After-Sales & Retention", items: [
    { n: "Service Due Reminder",       d: "Auto-reminds customer when their next service is due." },
    { n: "Warranty Registration",      d: "Customer sends photo or serial number → warranty registered instantly." },
    { n: "Return / Replacement Bot",   d: "Customer raises a request, gets a ticket number, tracks resolution." },
    { n: "Subscription Renewal",       d: "Auto-message before plan or membership expires — reduces churn." },
  ]},
  { category: "Feedback & Support", items: [
    { n: "Feedback & Rating Bot",      d: "Automatically asks for a rating after every service or purchase." },
    { n: "Support Ticket Bot",         d: "Customer raises complaint, gets ticket number, notified on resolution." },
    { n: "WhatsApp QR Code",           d: "Print QR on menu card or shop board — customers scan and bot starts." },
  ]},
  { category: "Education & Coaching", items: [
    { n: "Daily Quiz Bot",             d: "Sends multiple-choice questions every morning and auto-scores replies." },
    { n: "Fee Reminder to Parents",    d: "Auto-sends payment reminder before due date — no manual calling." },
    { n: "Assignment Submission",      d: "Students submit work by messaging the bot; teachers notified." },
    { n: "Schedule Broadcast",         d: "Instantly notifies all students of timing changes or new batches." },
  ]},
  { category: "Healthcare", items: [
    { n: "Medicine Refill Reminder",   d: "Reminds patients when prescription is about to end." },
    { n: "Lab Report Delivery",        d: "Sends test results to patient's WhatsApp — no clinic visit needed." },
    { n: "Vaccination Reminder",       d: "Auto-reminds patients about upcoming doses." },
    { n: "Doctor Availability",        d: "Patients instantly know if the doctor is available today." },
  ]},
  { category: "Events & Registrations", items: [
    { n: "Event Registration Bot",     d: "Customers register by chatting — name, email, payment collected." },
    { n: "Ticket / QR Code Delivery",  d: "Attendees receive digital pass directly on WhatsApp." },
    { n: "Pre-Event Reminder",         d: "Auto-messages attendees 1 day and 1 hour before the event." },
    { n: "Post-Event Feedback",        d: "Auto-sends feedback survey once the event ends." },
  ]},
  { category: "Marketing & Content", items: [
    { n: "Daily Tip Broadcast",        d: "Keeps your brand visible with daily tip or quote — no ad spend." },
    { n: "Newsletter via WhatsApp",    d: "Weekly or monthly updates with better open rates than email." },
    { n: "Tutorial Video Delivery",    d: "Bot sends the relevant how-to video the moment a customer asks." },
    { n: "Click-to-WhatsApp Ads",      d: "Facebook / Instagram ads open directly into your bot — fully automated." },
  ]},
];

const industries = [
  { name: "Restaurant / Cloud Kitchen",   time: "8–10 min",   detail: "Menu, order flow, daily special broadcast" },
  { name: "Clinic / Hospital",            time: "12–15 min",  detail: "Appointments, lab reports, refill reminders" },
  { name: "Salon / Spa",                  time: "10–12 min",  detail: "Booking, offers, birthday auto-messages" },
  { name: "Gym / Fitness Center",         time: "10–12 min",  detail: "Membership plans, class booking, renewals" },
  { name: "Coaching / Tutoring Center",   time: "10–12 min",  detail: "Enrollment, fee reminders, quizzes" },
  { name: "Real Estate Agent",            time: "10–12 min",  detail: "Property search, site visits, EMI calculator" },
  { name: "Retail / E-commerce",          time: "10–12 min",  detail: "Catalog, orders, order tracking" },
  { name: "Pharmacy",                     time: "8–10 min",   detail: "Prescription upload, refill reminders" },
  { name: "Delivery / Logistics",         time: "8–10 min",   detail: "Order tracking, complaint tickets" },
  { name: "Events & Entertainment",       time: "10–12 min",  detail: "Registration, ticketing, reminders" },
  { name: "HR / Recruitment",             time: "10–12 min",  detail: "Job applications, interview scheduling" },
];

const whyUs = [
  { icon: Zap,         label: "Fastest Setup Ever",       desc: "Simple flows go live in as little as 5 minutes" },
  { icon: FileText,    label: "Weekly & Monthly Reports", desc: "Full interaction reports delivered automatically" },
  { icon: Clock,       label: "24/7 Replies",             desc: "Never miss a customer message again" },
  { icon: Wallet,      label: "Custom Pricing",           desc: "Pay only for what your business needs" },
  { icon: Star,        label: "Built for Indian SMBs",    desc: "Designed for small and medium businesses" },
  { icon: Check,       label: "Your WA Number",           desc: "Use your existing Business number — nothing changes" },
];

// ─── Page ────────────────────────────────────────────────────────────────────
function WhatsAppChatbotPage() {
  // Ensure the html/body stay dark for this page
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlBg = html.style.background;
    const prevBodyBg = body.style.background;
    html.style.background = "#09090b";
    body.style.background = "#09090b";
    html.classList.add("dark");
    return () => {
      html.style.background = prevHtmlBg;
      body.style.background = prevBodyBg;
    };
  }, []);

  const statA = useCounter(5);
  const statB = useCounter(24);
  const statC = useCounter(500);
  const statD = useCounter(15);

  return (
    <div className="dark min-h-screen bg-background text-foreground overflow-x-hidden">
      <style>{`
        :root { --green: #22c55e; --green-dim: rgba(34,197,94,0.12); }

        @keyframes floatUp  { from { opacity:0; transform:translateY(32px) } to { opacity:1; transform:none } }
        @keyframes fadeIn   { from { opacity:0 } to { opacity:1 } }
        @keyframes ringPulse {
          0%   { transform:scale(1);   opacity:.6 }
          100% { transform:scale(2.2); opacity:0  }
        }
        @keyframes waBtnPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,.55) }
          60%     { box-shadow: 0 0 0 14px rgba(34,197,94,0) }
        }
        @keyframes gradLine {
          0%   { background-position:0% 50% }
          100% { background-position:200% 50% }
        }
        @keyframes spin { to { transform:rotate(360deg) } }

        .g-text {
          background: linear-gradient(135deg,#4ade80 0%,#22c55e 50%,#86efac 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glass-card {
          background: linear-gradient(135deg,rgba(255,255,255,.025) 0%,rgba(34,197,94,.015) 100%);
          border: 1px solid rgba(255,255,255,.07);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 1.5rem;
          transition: all .4s cubic-bezier(.16,1,.3,1);
        }
        .icon-glow {
          transition: all .3s ease;
        }
        .glass-card:hover .icon-glow {
          box-shadow: 0 0 24px rgba(34,197,94,.35);
          background: rgba(34,197,94,.18);
          border-color: rgba(34,197,94,.4);
          transform: scale(1.1);
        }
        .accordion-item:hover .accordion-trigger-text {
          color: #4ade80;
        }
        .industry-card {
          background: rgba(255,255,255,.02);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 1rem;
          transition: all .22s ease;
        }
        .industry-card:hover {
          border-color: rgba(34,197,94,.28);
          background: rgba(34,197,94,.04);
          transform: translateY(-3px);
          box-shadow: 0 6px 24px rgba(34,197,94,.07);
        }
        .why-card {
          background: rgba(255,255,255,.02);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 1.25rem;
          transition: all .25s ease;
        }
        .why-card:hover {
          border-color: rgba(34,197,94,.25);
          background: rgba(34,197,94,.05);
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(34,197,94,.07);
        }
        .why-card:hover .why-icon { transform: scale(1.18) rotate(-5deg); }
        .why-icon { transition: transform .25s ease; }
        .cta-btn {
          background: #22c55e;
          color: #000;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 32px rgba(34,197,94,.5);
        }
        .ghost-btn {
          border: 1px solid rgba(255,255,255,.12);
          transition: all .2s ease;
        }
        .ghost-btn:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,.05);
          border-color: rgba(255,255,255,.22);
        }
        .floating-wa {
          animation: waBtnPulse 2s infinite;
          transition: transform .2s ease;
        }
        .floating-wa:hover { transform: scale(1.1); }
        .step-num {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(135deg,rgba(34,197,94,.35),rgba(34,197,94,.08));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .pricing-card {
          background: linear-gradient(135deg,rgba(255,255,255,.025),rgba(34,197,94,.015));
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 1.75rem;
          transition: all .35s cubic-bezier(.16,1,.3,1);
        }
        .pricing-card:hover {
          border-color: rgba(34,197,94,.25);
          box-shadow: 0 20px 60px rgba(34,197,94,.08);
          transform: translateY(-5px);
        }
      `}</style>

      {/* ── Ambient background glows ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div style={{ position:"absolute", top:"-10%", left:"50%", transform:"translateX(-50%)", width:900, height:600, background:"radial-gradient(ellipse,rgba(34,197,94,.06) 0%,transparent 70%)", borderRadius:"50%" }} />
        <div style={{ position:"absolute", bottom:"20%", right:"-15%", width:600, height:600, background:"radial-gradient(ellipse,rgba(34,197,94,.04) 0%,transparent 70%)", borderRadius:"50%" }} />
        <div style={{ position:"absolute", top:"45%", left:"-10%", width:500, height:500, background:"radial-gradient(ellipse,rgba(96,165,250,.03) 0%,transparent 70%)", borderRadius:"50%" }} />
      </div>

      {/* ── HERO ── */}
      <div className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden" style={{ paddingTop:"5rem" }}>
        <ParticleHero />

        {/* overlay gradient so text is readable */}
        <div className="absolute inset-0 pointer-events-none" style={{ background:"linear-gradient(to bottom,rgba(9,9,18,.35) 0%,rgba(9,9,18,.1) 50%,rgba(9,9,18,.7) 100%)" }} />

        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-8 pb-20">
          <div style={{ animation:"fadeIn .5s ease" }}>
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-8">
              ← Back to Nova Studio
            </Link>
          </div>

          <div style={{ animation:"floatUp .7s .1s both" }}>
            <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium mb-6"
              style={{ background:"rgba(34,197,94,.1)", border:"1px solid rgba(34,197,94,.28)", color:"#4ade80" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              WhatsApp Chatbot Service · Nova Studio
            </span>
          </div>

          <h1 style={{ fontSize:"clamp(2.6rem,6vw,5rem)", fontWeight:700, letterSpacing:"-0.04em", lineHeight:1.04, animation:"floatUp .7s .18s both" }}>
            Your business,<br />
            running on <span className="g-text">WhatsApp&nbsp;— 24/7</span>
          </h1>

          <p className="mt-5 text-lg text-white/55 max-w-xl" style={{ animation:"floatUp .7s .28s both" }}>
            Custom bots built for SMBs — automated replies, appointment booking,
            bulk messaging and full customer inbox. We build it. You go live.
          </p>

          <div className="mt-8 flex flex-wrap gap-3" style={{ animation:"floatUp .7s .38s both" }}>
            <a href="#wa-contact" className="cta-btn inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold">
              Get Your Bot Built <ArrowRight className="h-4 w-4" />
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="ghost-btn inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white">
              <Phone className="h-4 w-4" /> Chat with Us
            </a>
          </div>

          {/* animated stat counters */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ animation:"floatUp .7s .5s both" }}>
            {[
              { ref: statA.ref, val: statA.val, suffix: " min",   label: "fastest setup" },
              { ref: statB.ref, val: statB.val, suffix: "/7",     label: "automated, always" },
              { ref: statC.ref, val: statC.val, suffix: "+",      label: "starting / month ₹" },
              { ref: statD.ref, val: statD.val, suffix: " min",   label: "average go-live time" },
            ].map(({ ref, val, suffix, label }) => (
              <div key={label} className="rounded-2xl p-4 text-center"
                style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", backdropFilter:"blur(12px)" }}>
                <div className="text-2xl font-bold g-text">
                  <span ref={ref as any}>{val}</span>{suffix}
                </div>
                <div className="mt-1 text-xs text-white/40">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24">

        {/* ── 3-STEP WORKFLOW ── */}
        <Section className="mt-20">
          <div className="text-center mb-12">
            <span className="text-[0.7rem] font-semibold tracking-[0.22em] uppercase text-green-400">How it works</span>
            <h2 className="mt-3 font-semibold" style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", letterSpacing:"-0.03em" }}>
              Three steps. That's it.
            </h2>
            <p className="mt-3 text-muted-foreground">From requirement to live WhatsApp bot — faster than you'd expect.</p>
          </div>

          {/* connecting animated line */}
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-[1px] z-0"
              style={{ background:"linear-gradient(90deg,transparent,rgba(34,197,94,.5) 30%,rgba(34,197,94,.5) 70%,transparent)" }} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {steps.map((s, i) => (
                <TiltCard key={s.num}
                  className="glass-card p-7 flex flex-col"
                  style={{ animationDelay: `${i * 100}ms` }}>
                  {/* circle badge */}
                  <div className="flex items-center justify-center h-12 w-12 rounded-full border mb-5 text-sm font-bold text-green-400"
                    style={{ borderColor:"rgba(34,197,94,.3)", background:"rgba(34,197,94,.08)" }}>
                    {s.num}
                  </div>
                  <h3 className="text-base font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground flex-1">{s.desc}</p>
                  <p className="mt-4 text-xs text-green-400/60 italic">{s.note}</p>
                </TiltCard>
              ))}
            </div>
          </div>
        </Section>

        {/* ── FEATURES ── */}
        <Section className="mt-24" delay={50}>
          <span className="text-[0.7rem] font-semibold tracking-[0.22em] uppercase text-green-400">What you get</span>
          <h2 className="mt-3 font-semibold" style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", letterSpacing:"-0.03em" }}>
            Everything your business needs on WhatsApp
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, pts }) => (
              <TiltCard key={title} className="glass-card p-6 flex flex-col">
                <div className="icon-glow flex h-12 w-12 items-center justify-center rounded-xl mb-4"
                  style={{ background:"rgba(34,197,94,.08)", border:"1px solid rgba(34,197,94,.2)", color:"#4ade80" }}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold mb-1.5">{title}</h3>
                <p className="text-xs text-muted-foreground mb-4 flex-1">{desc}</p>
                <ul className="space-y-1.5">
                  {pts.map(p => (
                    <li key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 shrink-0 text-green-400 mt-0.5" />{p}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </div>
        </Section>

        {/* ── ADDITIONAL SERVICES ── */}
        <Section className="mt-24" delay={50}>
          <span className="text-[0.7rem] font-semibold tracking-[0.22em] uppercase text-green-400">Additional automation</span>
          <h2 className="mt-3 font-semibold" style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", letterSpacing:"-0.03em" }}>
            Every stage of the customer journey
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl text-sm">
            Beyond the core chatbot, we configure ready-made automations specific to your business.
          </p>
          <div className="mt-8 rounded-3xl overflow-hidden" style={{ border:"1px solid rgba(255,255,255,.07)", background:"rgba(255,255,255,.015)", backdropFilter:"blur(16px)" }}>
            <Accordion type="single" collapsible className="w-full px-6 md:px-8">
              {additionalServices.map(g => (
                <AccordionItem key={g.category} value={g.category} className="border-white/[0.06]">
                  <AccordionTrigger className="text-sm text-foreground hover:text-green-400 transition-colors py-4">
                    {g.category}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
                      {g.items.map(item => (
                        <div key={item.n} className="rounded-xl p-3 transition-all duration-200"
                          style={{ background:"rgba(255,255,255,.02)", border:"1px solid rgba(255,255,255,.05)" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(34,197,94,.2)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(34,197,94,.03)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,.05)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,.02)"; }}>
                          <p className="text-xs font-semibold text-foreground">{item.n}</p>
                          <p className="text-xs text-muted-foreground mt-1">{item.d}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>

        {/* ── INDUSTRIES ── */}
        <Section className="mt-24" delay={50}>
          <span className="text-[0.7rem] font-semibold tracking-[0.22em] uppercase text-green-400">Who it's for</span>
          <h2 className="mt-3 font-semibold" style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", letterSpacing:"-0.03em" }}>
            Any business. Any sector. Minutes to go live.
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map(ind => (
              <div key={ind.name} className="industry-card p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-semibold">{ind.name}</h3>
                  <span className="shrink-0 text-[10px] font-semibold text-green-400 rounded-full px-2 py-0.5"
                    style={{ background:"rgba(34,197,94,.1)", border:"1px solid rgba(34,197,94,.2)", whiteSpace:"nowrap" }}>
                    {ind.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{ind.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── WHY US ── */}
        <Section className="mt-24" delay={50}>
          <p className="text-[0.7rem] font-semibold tracking-[0.22em] uppercase text-muted-foreground text-center mb-8">Why choose us</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {whyUs.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="why-card p-5 text-center flex flex-col items-center gap-2">
                <Icon className="why-icon h-5 w-5 text-green-400" />
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── PRICING ── */}
        <Section className="mt-24" delay={50}>
          <span className="text-[0.7rem] font-semibold tracking-[0.22em] uppercase text-green-400">Pricing</span>
          <h2 className="mt-3 font-semibold" style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", letterSpacing:"-0.03em" }}>
            Custom pricing based on your flow
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl text-sm">
            We price based on the complexity of the automation we build. Simple flows start from ₹500/month.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard */}
            <div className="pricing-card p-8 flex flex-col">
              <p className="text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground mb-3">Standard</p>
              <p className="text-4xl font-bold mb-1">₹500 – ₹1,500</p>
              <p className="text-sm text-muted-foreground mb-7">per month · based on flow complexity</p>
              <ul className="space-y-2.5 flex-1 mb-8">
                {["Custom chatbot flow built for you","24/7 automated WhatsApp replies","Customer inbox + human takeover","Bulk broadcast messaging","Contacts & CRM management","Weekly & monthly interaction reports","Pause or cancel anytime — no lock-in"].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-green-400 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
              <a href="#wa-contact" className="cta-btn inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
                Get a Quote <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            {/* Enterprise */}
            <div className="pricing-card p-8 flex flex-col" style={{ borderColor:"rgba(34,197,94,.15)", background:"linear-gradient(135deg,rgba(34,197,94,.04),rgba(34,197,94,.01))" }}>
              <p className="text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground mb-3">Advanced / Enterprise</p>
              <p className="text-4xl font-bold mb-1 g-text">Custom</p>
              <p className="text-sm text-muted-foreground mb-7">multi-agent · integrations · agency plans</p>
              <ul className="space-y-2.5 flex-1 mb-8">
                {["Multi-agent team inbox","CRM integrations (Zoho, HubSpot, Sheets)","E-commerce sync (Shopify, WooCommerce)","Click-to-WhatsApp ad automation","White-label for agencies and resellers","Dedicated onboarding & support","Monthly performance review call"].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-green-400 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
              <a href="#wa-contact" className="ghost-btn inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-foreground">
                Talk to us <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Section>

        {/* ── CONTACT ── */}
        <Section className="mt-24" delay={50}>
          <div id="wa-contact" className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center"
            style={{ background:"linear-gradient(135deg,rgba(20,40,30,.9),rgba(10,20,28,.95))", border:"1px solid rgba(34,197,94,.2)" }}>

            {/* radial glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse 60% 50% at 50% 0%,rgba(34,197,94,.1),transparent)" }} />

            {/* pulsing rings */}
            <div className="relative flex justify-center mb-6">
              {[1,2,3].map(i => (
                <span key={i} className="absolute rounded-full border border-green-400/20"
                  style={{ width:56+(i*22), height:56+(i*22), top:"50%", left:"50%", transform:"translate(-50%,-50%)",
                    animation:`ringPulse 2.5s ${i*0.55}s infinite ease-out` }} />
              ))}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl z-10"
                style={{ background:"rgba(34,197,94,.12)", border:"1px solid rgba(34,197,94,.35)" }}>
                <MessageSquare className="h-7 w-7 text-green-400" />
              </div>
            </div>

            <h3 className="relative text-2xl md:text-3xl font-semibold" style={{ letterSpacing:"-0.03em" }}>
              Ready to automate your WhatsApp?
            </h3>
            <p className="relative mt-3 text-sm text-muted-foreground max-w-md mx-auto">
              Share your requirements and we'll send a quote. For most setups, you'll be live in under 15 minutes.
            </p>

            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={WA_LINK}
                target="_blank" rel="noopener noreferrer"
                className="cta-btn inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold">
                <MessageSquare className="h-4 w-4" /> WhatsApp Us Now
              </a>
              <Link to="/" hash="contact"
                className="ghost-btn inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-foreground">
                Use contact form <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="relative mt-6 text-xs text-muted-foreground">
              Surya · +91 63057 79552 · We reply within a few hours
            </p>
          </div>
        </Section>

      </div>

    </div>
  );
}
