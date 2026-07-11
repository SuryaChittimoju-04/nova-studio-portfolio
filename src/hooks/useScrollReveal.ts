import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/**
 * Attach `ref` to any section element.
 * `revealStyle` fades it in + slides it up once it enters the viewport.
 */
export function useScrollReveal(delay = 0) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Immediately reveal if already in (or near) viewport on mount —
    // handles anchor-link jumps and fast programmatic scrolls.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 300) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      // threshold:0 fires on first pixel; rootMargin pre-triggers 150px early
      { threshold: 0, rootMargin: "0px 0px 150px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const revealStyle: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(40px)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };

  return { ref, revealStyle };
}
