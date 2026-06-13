/** Güvenilir geçici görseller (picsum.photos) */
export function placeholderImage(
  seed: string | number,
  width = 800,
  height?: number
): string {
  const h = height ?? Math.round(width * 0.65);
  return `https://picsum.photos/seed/${encodeURIComponent(String(seed))}/${width}/${h}`;
}

/** Kampanya kartları için gerçek araç fotoğrafları (Unsplash) */
const CAMPAIGN_CAR_PHOTOS = [
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=480&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=480&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db8?w=800&h=480&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=480&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=480&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=480&fit=crop&auto=format&q=80",
] as const;

export const img = {
  car: (id: number, w = 800) => placeholderImage(`rk-car-${id}`, w),
  carExtra: (id: number, n: number, w = 1200) =>
    placeholderImage(`rk-car-${id}-g${n}`, w),
  blog: (id: number) => placeholderImage(`rk-blog-${id}`, 800, 520),
  campaign: (id: number) => placeholderImage(`rk-campaign-${id}`, 800, 480),
  campaignCar: (id: number) =>
    CAMPAIGN_CAR_PHOTOS[(id - 1) % CAMPAIGN_CAR_PHOTOS.length],
  delivery: (n: number) => placeholderImage(`rk-delivery-${n}`, 600, 450),
  interior: (id: number, n: number) =>
    placeholderImage(`rk-interior-${id}-${n}`, 800, 520),
  video: (n: number) => placeholderImage(`rk-video-${n}`, 400, 300),
  generic: (seed: string, w = 800) => placeholderImage(seed, w),
};

export const FALLBACK_IMAGE = placeholderImage("rk-fallback", 800, 520);

/** Eksik veya eski (unsplash vb.) URL'leri placeholder ile değiştirir */
export function ensureImage(url: string | undefined, fallback: string): string {
  if (!url?.trim()) return fallback;
  if (/unsplash\.com|placehold\.co|via\.placeholder/i.test(url)) return fallback;
  return url;
}
