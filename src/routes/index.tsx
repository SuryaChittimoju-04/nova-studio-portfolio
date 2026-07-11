import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { AnnouncementBanner } from "@/components/landing/AnnouncementBanner";
import { HeroSection } from "@/components/landing/HeroSection";
import { MarqueeShowcase } from "@/components/landing/MarqueeShowcase";
import { AboutSection } from "@/components/landing/AboutSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { FooterSection } from "@/components/landing/FooterSection";

const SITE_URL = "https://draft-dream-deck.lovable.app";
const BANNER_H = 36;

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Nova Studio — AI Video Production Studio" },
      { name: "description", content: "End-to-end AI video production for real estate, education, fitness, jewellery and more. Scripts, editing, voiceover & music — starting at Rs.5,000." },
      { property: "og:title", content: "Nova Studio — AI Video Production Studio" },
      { property: "og:description", content: "Cinematic AI videos for your brand — script to final cut, starting at Rs.5,000." },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", name: "Nova Studio", url: SITE_URL, description: "End-to-end AI video production studio." },
            { "@type": "Service", serviceType: "AI Video Production", provider: { "@type": "Organization", name: "Nova Studio", url: SITE_URL }, areaServed: "India", description: "AI-generated commercial videos for real estate, education, fitness, and more." },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {bannerVisible && (
        <AnnouncementBanner onDismiss={() => setBannerVisible(false)} />
      )}
      <Navbar bannerOffset={bannerVisible ? BANNER_H : 0} />
      <HeroSection />
      <MarqueeShowcase />
      <AboutSection />
      <ServicesSection />
      <PricingSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
