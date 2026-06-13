"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

function isHomePage(pathname: string) {
  return pathname === "/" || pathname === "/en";
}

export function MainWithOffset({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = isHomePage(pathname);

  return (
    <main className={cn("min-h-screen", !isHome && "pt-24 sm:pt-28 lg:pt-32")}>
      {children}
    </main>
  );
}
