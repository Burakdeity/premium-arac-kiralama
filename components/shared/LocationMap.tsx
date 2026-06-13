"use client";

import { CONTACT } from "@/lib/constants";

interface LocationMapProps {
  lat?: number;
  lng?: number;
  address?: string;
  className?: string;
}

function buildMapEmbedUrl(lat: number, lng: number, apiKey?: string) {
  const coords = `${lat},${lng}`;

  if (apiKey) {
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${coords}&zoom=17`;
  }

  return `https://maps.google.com/maps?q=${coords}&hl=tr&z=17&output=embed`;
}

export function LocationMap({
  lat = CONTACT.lat,
  lng = CONTACT.lng,
  address = CONTACT.address,
  className = "",
}: LocationMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  const embedUrl = buildMapEmbedUrl(lat, lng, apiKey);
  const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className={className}>
      <p className="mb-3 text-center text-sm font-medium text-navy-700">{address}</p>
      <iframe
        title={`Harita - ${address}`}
        src={embedUrl}
        className="h-[400px] w-full rounded-2xl border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <p className="mt-3 text-center text-sm text-gray-500">
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold transition-colors hover:text-gold-600"
        >
          Google Haritalar&apos;da aç →
        </a>
      </p>
    </div>
  );
}
