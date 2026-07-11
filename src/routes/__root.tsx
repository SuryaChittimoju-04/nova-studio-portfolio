import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AuthProvider } from "@/hooks/useAuth";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingChatWidget } from "@/components/FloatingChatWidget";
import "@/styles.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AuthProvider>
      <CustomCursor />
      <Outlet />
      <FloatingChatWidget />
    </AuthProvider>
  );
}
