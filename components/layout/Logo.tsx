"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

interface LogoProps {
  className?: string;
  size?: "header" | "footer" | "hero";
  showTagline?: boolean;
  linkToHome?: boolean;
  variant?: "light" | "dark";
}

const sizes = {
  header: {
    width: 280,
    height: 80,
    className:
      "h-[3.5rem] w-auto min-w-[160px] max-w-[240px] sm:h-[4rem] sm:max-w-[280px]",
  },
  footer: {
    width: 280,
    height: 80,
    className: "h-20 w-auto min-w-[180px] max-w-[280px]",
  },
  hero: {
    width: 320,
    height: 92,
    className: "h-24 w-auto min-w-[200px] max-w-[320px] sm:h-28",
  },
};

export function Logo({
  className,
  size = "header",
  showTagline = false,
  linkToHome = true,
  variant = "light",
}: LogoProps) {
  const { width, height, className: sizeClass } = sizes[size];
  const pngSrc = variant === "dark" ? "/logo-dark.png" : "/logo-light.png";
  const svgSrc = variant === "dark" ? "/logo-dark.svg" : "/logo-light.svg";
  const [src, setSrc] = useState(pngSrc);

  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src={src}
        alt={SITE_NAME}
        width={width}
        height={height}
        className={cn(sizeClass, "object-contain object-left")}
        priority
        unoptimized
        onError={() => {
          if (src !== svgSrc) setSrc(svgSrc);
        }}
      />
      {showTagline && (
        <div className="hidden min-w-0 xl:block">
          <p
            className={cn(
              "max-w-[200px] text-[10px] font-semibold uppercase leading-snug tracking-[0.15em]",
              variant === "dark" ? "text-gold/90" : "text-gray-500"
            )}
          >
            {SITE_TAGLINE}
          </p>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="inline-flex transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
