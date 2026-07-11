import { createFileRoute } from "@tanstack/react-router";
import { PostEditor } from "@/components/editor/PostEditor";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";

const editorSearchSchema = z.object({
  draft: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/editor")({
  validateSearch: zodValidator(editorSearchSchema),
  component: EditorPage,
  head: () => ({
    meta: [
      { title: "Post Editor — Nova Studio" },
      { name: "description", content: "Craft cinematic AI-powered posts and previews across every social platform inside the Nova Studio editor." },
      { property: "og:title", content: "Post Editor — Nova Studio" },
      { property: "og:description", content: "Craft cinematic AI-powered posts and previews across every social platform inside the Nova Studio editor." },
      { name: "twitter:title", content: "Post Editor — Nova Studio" },
      { name: "twitter:description", content: "Craft cinematic AI-powered posts and previews across every social platform inside the Nova Studio editor." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function EditorPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !user && !redirecting) {
      setRedirecting(true);
      navigate({ to: "/login" });
    }
  }, [user, loading, navigate, redirecting]);

  // Block ALL rendering until auth resolves or redirect completes
  if (loading || redirecting || (!loading && !user)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return <PostEditor />;
}
