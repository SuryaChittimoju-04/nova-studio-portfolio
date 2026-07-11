// This was a TanStack Start server route — not needed in static CSR mode.
// Kept as empty stub so the router plugin doesn't error on the filename.
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/api/enhance-post")({
  beforeLoad: () => { throw redirect({ to: "/" }); },
});
