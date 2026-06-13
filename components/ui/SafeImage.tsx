"use client";

import { useState, useEffect } from "react";
import Image, { type ImageProps } from "next/image";
import { FALLBACK_IMAGE } from "@/lib/placeholders";

type SafeImageProps = ImageProps & {
  fallbackSrc?: string;
};

export function SafeImage({
  src,
  fallbackSrc = FALLBACK_IMAGE,
  alt,
  onError,
  ...props
}: SafeImageProps) {
  const resolved = src || fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(resolved);

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={(e) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
        onError?.(e);
      }}
    />
  );
}