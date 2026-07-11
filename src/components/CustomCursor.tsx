import { useEffect, useRef } from "react";

/**
 * Custom two-part cursor:
 *  • Small bright dot  — snaps to cursor exactly (no lag)
 *  • Larger ring       — lerp-follows with smooth lag
 * Expands on hover over interactive elements.
 * Only mounts on non-touch devices.
 */
export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const state   = useRef({ mx: 0, my: 0, rx: 0, ry: 0, hovering: false, visible: false });

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const s = state.current;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      s.mx = e.clientX;
      s.my = e.clientY;
      if (!s.visible) {
        s.visible = true;
        dotRef.current && (dotRef.current.style.opacity  = "1");
        ringRef.current && (ringRef.current.style.opacity = "1");
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      s.hovering = !!t.closest('a, button, [role="button"], input, textarea, select, label');
    };

    const onLeave = () => {
      s.visible = false;
      dotRef.current  && (dotRef.current.style.opacity  = "0");
      ringRef.current && (ringRef.current.style.opacity = "0");
    };

    const tick = () => {
      // Dot — instant
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${s.mx - 4}px, ${s.my - 4}px)`;
      }

      // Ring — lerp (0.1 = slow/dreamy, 0.18 = snappy)
      s.rx += (s.mx - s.rx) * 0.14;
      s.ry += (s.my - s.ry) * 0.14;

      const size = s.hovering ? 52 : 34;
      if (ringRef.current) {
        ringRef.current.style.transform  = `translate(${s.rx - size / 2}px, ${s.ry - size / 2}px)`;
        ringRef.current.style.width      = `${size}px`;
        ringRef.current.style.height     = `${size}px`;
        ringRef.current.style.background = s.hovering
          ? "oklch(0.65 0.22 280 / 0.12)"
          : "transparent";
      }

      rafId = requestAnimationFrame(tick);
    };

    // Hide native cursor
    document.documentElement.style.cursor = "none";
    document.addEventListener("mousemove",    onMove,  { passive: true });
    document.addEventListener("mouseover",    onOver,  { passive: true });
    document.addEventListener("mouseleave",   onLeave, { passive: true });

    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full opacity-0"
        style={{
          width: 8,
          height: 8,
          background: "oklch(0.75 0.22 280)",
          boxShadow: "0 0 10px 2px oklch(0.65 0.22 280 / 0.7)",
          willChange: "transform",
          transition: "opacity 0.2s",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full opacity-0"
        style={{
          width: 34,
          height: 34,
          border: "1.5px solid oklch(0.65 0.22 280 / 0.55)",
          willChange: "transform, width, height",
          transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease, opacity 0.2s",
        }}
      />
    </>
  );
}
