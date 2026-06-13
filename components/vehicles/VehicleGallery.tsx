"use client";

import { useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "@/components/ui/Modal";

interface VehicleGalleryProps {
  images: string[];
  name: string;
}

export function VehicleGallery({ images, name }: VehicleGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="space-y-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-full w-full"
            >
              <SafeImage
                src={images[current]}
                alt={`${name} - ${current + 1}`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-4 right-4 rounded-full bg-white/90 p-2 shadow-lg hover:bg-white"
            aria-label="Expand gallery"
          >
            <Expand className="h-5 w-5" />
          </button>
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  i === current
                    ? "border-gold"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <SafeImage src={img} alt={`${name} thumbnail ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        size="xl"
      >
        <div className="relative aspect-[16/10]">
          <SafeImage
            src={images[current]}
            alt={name}
            fill
            className="object-contain"
          />
        </div>
      </Modal>
    </>
  );
}
