import { X, GraduationCap } from "lucide-react";

interface Props {
  onDismiss: () => void;
}

export function AnnouncementBanner({ onDismiss }: Props) {
  return (
    <div
      className="relative z-[80] flex items-center justify-center gap-3 px-4 py-2 text-xs font-medium text-center"
      style={{
        background: "linear-gradient(90deg, #FF005B, #d4004d 50%, #FF005B)",
        borderBottom: "1px solid rgba(255,0,91,0.4)",
      }}
    >
      <GraduationCap className="h-3.5 w-3.5 shrink-0 text-white/80" />
      <span className="text-white/90">
        <span className="font-semibold text-white">100+ minutes</span> of AI video content generated — exclusively for the{" "}
        <span className="font-semibold text-white/90">Education sector</span>
      </span>
      <button
        onClick={onDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-white/50 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
