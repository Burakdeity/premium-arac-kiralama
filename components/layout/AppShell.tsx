import type { ReactNode } from "react";
import { Header } from "./Header";

interface AppShellProps {
  children: ReactNode;
  overlays?: ReactNode;
}

/** Üst menü sayfa üstünde şeffaf katman — hero videosu arkadan görünür */
export function AppShell({ children, overlays }: AppShellProps) {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-x-0 top-0 z-50">
        <Header />
      </div>
      {children}
      {overlays}
    </div>
  );
}
