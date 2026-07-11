import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/hooks/useAuth";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingChatWidget } from "@/components/FloatingChatWidget";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nova Studio — AI Creative Production" },
      { name: "description", content: "Cinematic AI commercials, avatar videos, product films, reels, and brand content. End-to-end AI creative production studio." },
      { name: "author", content: "Nova Studio" },
      { property: "og:title", content: "Nova Studio — AI Creative Production" },
      { property: "og:description", content: "Cinematic AI commercials, avatar videos, product films, reels, and brand content. End-to-end AI creative production studio." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Nova Studio — AI Creative Production" },
      { name: "twitter:description", content: "Cinematic AI commercials, avatar videos, product films, reels, and brand content. End-to-end AI creative production studio." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Miranda+Sans:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <AuthProvider>
      <CustomCursor />
      <Outlet />
      <FloatingChatWidget />
    </AuthProvider>
  );
}
