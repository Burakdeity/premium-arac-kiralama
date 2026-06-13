import { img, ensureImage } from "./placeholders";

/** Hero arka plan videosu (public/videos/hero.mp4) */
export const HERO_VIDEO_URL = "/videos/hero.mp4";

export const SAKARYA_SEO_DISTRICTS = [
  {
    slug: "sakarya-arac-kiralama",
    name: "Sakarya",
    title: "Sakarya Araç Kiralama",
    description:
      "Sakarya'da güvenilir araç kiralama. Karakamış Cad. No:9, Tekeler Mah. merkez ofis, havalimanı teslimat ve 7/24 destek.",
  },
  {
    slug: "adapazari-arac-kiralama",
    name: "Adapazarı",
    title: "Adapazarı Araç Kiralama",
    description:
      "Adapazarı araç kiralama hizmeti. Şehir merkezi teslimat, ekonomik ve premium araç seçenekleri.",
  },
  {
    slug: "serdivan-arac-kiralama",
    name: "Serdivan",
    title: "Serdivan Araç Kiralama",
    description:
      "Serdivan bölgesinde hızlı araç kiralama. AVM ve otogar teslimat noktaları.",
  },
  {
    slug: "sapanca-arac-kiralama",
    name: "Sapanca",
    title: "Sapanca Araç Kiralama",
    description:
      "Sapanca gölü ve çevresi için SUV ve aile araçları. Hafta sonu kiralama kampanyaları.",
  },
  {
    slug: "karasu-arac-kiralama",
    name: "Karasu",
    title: "Karasu Araç Kiralama",
    description:
      "Karasu sahil ve yazlık bölgeler için araç kiralama. Esnek teslimat saatleri.",
  },
  {
    slug: "hendek-arac-kiralama",
    name: "Hendek",
    title: "Hendek Araç Kiralama",
    description:
      "Hendek sanayi ve şehir içi araç kiralama. Kurumsal filo çözümleri.",
  },
] as const;

export const MOCK_RECENT_BOOKINGS = [
  { name: "Ahmet Y.", vehicle: "Mercedes E-Class", city: "Sakarya", minutesAgo: 3 },
  { name: "Elif K.", vehicle: "BMW 5 Series", city: "Adapazarı", minutesAgo: 8 },
  { name: "Mehmet S.", vehicle: "Audi A6", city: "Serdivan", minutesAgo: 14 },
  { name: "Zeynep A.", vehicle: "Volvo XC90", city: "Sapanca", minutesAgo: 22 },
  { name: "Can D.", vehicle: "Toyota Corolla", city: "Karasu", minutesAgo: 31 },
];

function hasUploadedImage(url?: string) {
  if (!url?.includes("/storage/")) return false;
  if (/placeholder-\d+\.jpe?g/i.test(url)) return false;
  return true;
}

export function enrichVehicle(vehicle: import("./types").Vehicle): import("./types").Vehicle {
  const seed = vehicle.id;
  const uploaded = hasUploadedImage(vehicle.image);
  const image = uploaded ? vehicle.image : ensureImage(vehicle.image, img.car(seed));
  const images =
    vehicle.images?.length && vehicle.images.some(hasUploadedImage)
      ? vehicle.images
      : vehicle.images?.length
        ? vehicle.images.map((u, i) =>
            ensureImage(u, i === 0 ? img.car(seed, 1200) : img.carExtra(seed, i))
          )
        : [img.car(seed, 1200), img.carExtra(seed, 1), img.carExtra(seed, 2)];
  return {
    ...vehicle,
    image,
    images,
    interiorImages: vehicle.interiorImages ?? [
      img.interior(seed, 1),
      img.interior(seed, 2),
      img.interior(seed, 3),
    ],
    videoUrl: vehicle.videoUrl ?? "https://assets.mixkit.co/videos/preview/mixkit-driving-POV-shot-of-a-car-driving-on-a-road-40634-large.mp4",
    rentalCount30Days: vehicle.rentalCount30Days ?? 40 + seed * 11,
    viewersToday: vehicle.viewersToday ?? 8 + (seed % 12),
    unitsLeft: vehicle.unitsLeft ?? Math.max(1, 4 - (seed % 4)),
    isHighDemand: vehicle.isHighDemand ?? seed % 3 === 0,
    fuelConsumption: vehicle.fuelConsumption ?? (vehicle.fuel === "electric" ? 0 : 6.5 + seed * 0.3),
    priceHistory: vehicle.priceHistory ?? [
      { date: "Oca", price: vehicle.dailyPrice * 1.12 },
      { date: "Şub", price: vehicle.dailyPrice * 1.08 },
      { date: "Mar", price: vehicle.dailyPrice * 1.05 },
      { date: "Nis", price: vehicle.dailyPrice * 1.02 },
      { date: "May", price: vehicle.dailyPrice },
    ],
  };
}
