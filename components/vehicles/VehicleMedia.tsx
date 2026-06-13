"use client";

import { useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { img } from "@/lib/placeholders";
import { Play } from "lucide-react";

export function VehicleVideo({ url, title }: { url: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="overflow-hidden rounded-2xl">
        <video src={url} controls autoPlay className="aspect-video w-full bg-black" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-navy-900"
    >
      <SafeImage
        src={img.car(99, 1200)}
        alt={title}
        fill
        className="object-cover opacity-70 transition group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-navy-900 shadow-lg transition group-hover:scale-110">
          <Play className="h-8 w-8 fill-current pl-1" />
        </span>
      </div>
      <span className="absolute bottom-4 left-4 text-sm font-medium text-white">
        Video Tanıtım
      </span>
    </button>
  );
}

export function VehicleInteriorGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-navy-900">İç Mekan</h3>
      <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-2xl">
        <SafeImage src={images[active]} alt={`${name} iç mekan`} fill className="object-cover" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${
              i === active ? "border-gold" : "border-transparent"
            }`}
          >
            <SafeImage src={img} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
