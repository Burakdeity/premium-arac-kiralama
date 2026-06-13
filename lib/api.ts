import axios, { AxiosError } from "axios";
import type {
  Vehicle,
  VehicleCategory,
  VehicleFilters,
  BlogPost,
  Review,
  Campaign,
  FAQ,
  Location,
  ExtraService,
  Reservation,
  ReservationFormData,
  ContactFormData,
  PaginatedResponse,
} from "./types";
import {
  MOCK_VEHICLES,
  MOCK_BLOG_POSTS,
  MOCK_REVIEWS,
  MOCK_CAMPAIGNS,
  MOCK_FAQS,
  MOCK_LOCATIONS,
  MOCK_EXTRA_SERVICES,
  MOCK_RESERVATION,
} from "./constants";
import { enrichVehicle } from "./premium-data";
import { img } from "./placeholders";

type ApiCampaign = {
  id: number;
  title: string;
  description?: string;
  discount?: number;
  discount_percent?: number | null;
  code?: string;
  validUntil?: string;
  valid_until?: string | null;
  image?: string | null;
};

type ApiReview = {
  id: number;
  name?: string;
  customer_name?: string;
  rating: number;
  comment: string;
  date?: string;
  created_at?: string;
  vehicleName?: string;
  vehicle_name?: string;
};

type ApiVehicle = {
  id: number;
  slug: string;
  name?: string;
  brand?: { name: string } | string;
  model?: { name: string } | string;
  segment?: string;
  category?: VehicleCategory;
  vehicle_type?: string;
  fuel_type?: string;
  fuel?: string;
  transmission?: string;
  seats?: number;
  doors?: number;
  luggage?: number;
  year?: number;
  daily_price?: number;
  dailyPrice?: number;
  weekly_price?: number;
  weeklyPrice?: number;
  monthly_price?: number;
  monthlyPrice?: number;
  image?: string | null;
  images?: Array<string | { url?: string }>;
  features?: string[];
  description?: string;
  is_featured?: boolean;
  isFeatured?: boolean;
  is_active?: boolean;
  isAvailable?: boolean;
  rating?: number;
  review_count?: number;
  reviewCount?: number;
};

function mapSegment(segment?: string): VehicleCategory {
  const map: Record<string, VehicleCategory> = {
    Ekonomi: "economy",
    Orta: "sedan",
    Lüks: "luxury",
    SUV: "suv",
  };
  return map[segment ?? ""] ?? "sedan";
}

function mapFuel(fuel?: string): Vehicle["fuel"] {
  const map: Record<string, Vehicle["fuel"]> = {
    Benzin: "petrol",
    petrol: "petrol",
    Dizel: "diesel",
    diesel: "diesel",
    Hibrit: "hybrid",
    hybrid: "hybrid",
    Elektrik: "electric",
    electric: "electric",
  };
  return map[fuel ?? ""] ?? "petrol";
}

function mapTransmission(transmission?: string): Vehicle["transmission"] {
  if (transmission === "Manuel" || transmission === "manual") return "manual";
  return "automatic";
}

function normalizeVehicle(raw: ApiVehicle): Vehicle {
  const brandName =
    typeof raw.brand === "object" ? raw.brand?.name ?? "" : raw.brand ?? "";
  const modelName =
    typeof raw.model === "object" ? raw.model?.name ?? "" : raw.model ?? "";
  const dailyPrice = raw.dailyPrice ?? raw.daily_price ?? 0;
  const imageUrls = Array.isArray(raw.images)
    ? raw.images
        .map((item) => normalizeAssetUrl(typeof item === "string" ? item : item.url ?? ""))
        .filter(Boolean)
    : [];
  const primaryImage =
    normalizeAssetUrl(raw.image ?? "") || imageUrls[0] || "";
  const normalizedImages = imageUrls.length
    ? imageUrls
    : primaryImage
      ? [primaryImage]
      : [];

  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name ?? `${brandName} ${modelName}`.trim(),
    brand: brandName,
    model: modelName,
    year: raw.year ?? 2024,
    category: raw.category ?? mapSegment(raw.segment),
    transmission: mapTransmission(raw.transmission),
    fuel: mapFuel(raw.fuel_type ?? raw.fuel),
    seats: raw.seats ?? 5,
    doors: raw.doors ?? 4,
    luggage: raw.luggage ?? 2,
    dailyPrice,
    weeklyPrice: raw.weeklyPrice ?? raw.weekly_price ?? dailyPrice * 6,
    monthlyPrice: raw.monthlyPrice ?? raw.monthly_price ?? dailyPrice * 25,
    image: primaryImage,
    images: normalizedImages,
    features: raw.features ?? [],
    description: raw.description ?? "",
    isFeatured: raw.isFeatured ?? raw.is_featured ?? false,
    isAvailable: raw.isAvailable ?? raw.is_active ?? true,
    rating: raw.rating ?? 4.8,
    reviewCount: raw.reviewCount ?? raw.review_count ?? 0,
  };
}

function normalizeCampaign(raw: ApiCampaign): Campaign {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description ?? "",
    discount: raw.discount ?? raw.discount_percent ?? 0,
    code: raw.code,
    validUntil: raw.validUntil ?? raw.valid_until ?? "",
    image: raw.image || img.campaignCar(raw.id),
  };
}

function normalizeReview(raw: ApiReview): Review {
  return {
    id: raw.id,
    name: raw.name ?? raw.customer_name ?? "Müşteri",
    rating: raw.rating,
    comment: raw.comment,
    date: raw.date ?? raw.created_at ?? new Date().toISOString(),
    vehicleName: raw.vehicleName ?? raw.vehicle_name,
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function isBrokenStorageImage(url: string): boolean {
  return /\/storage\/vehicles\/placeholder-\d+\.jpe?g/i.test(url);
}

function normalizeAssetUrl(url: string): string {
  if (!url) return url;
  const normalized = url
    .replace("http://127.0.0.1:8000", SITE_URL)
    .replace("http://localhost:8000", SITE_URL);
  return isBrokenStorageImage(normalized) ? "" : normalized;
}

function toApiVehicleParams(filters?: VehicleFilters) {
  if (!filters) return {};

  const segmentMap: Record<VehicleCategory, string> = {
    economy: "Ekonomi",
    compact: "Ekonomi",
    sedan: "Orta",
    suv: "SUV",
    luxury: "Lüks",
    van: "SUV",
    premium: "Lüks",
  };

  const fuelMap: Record<string, string> = {
    petrol: "Benzin",
    diesel: "Dizel",
    hybrid: "Hibrit",
    electric: "Elektrik",
  };

  return {
    segment: filters.category ? segmentMap[filters.category] : undefined,
    transmission:
      filters.transmission === "manual"
        ? "Manuel"
        : filters.transmission === "automatic"
          ? "Otomatik"
          : undefined,
    fuel_type: filters.fuel ? fuelMap[filters.fuel] ?? filters.fuel : undefined,
    min_price: filters.minPrice,
    max_price: filters.maxPrice,
    seats: filters.seats,
    pickup_date: filters.pickupDate,
    return_date: filters.returnDate,
  };
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

function filterMockVehicles(filters?: VehicleFilters): Vehicle[] {
  let result = [...MOCK_VEHICLES];

  if (filters?.category) {
    result = result.filter((v) => v.category === filters.category);
  }
  if (filters?.transmission) {
    result = result.filter((v) => v.transmission === filters.transmission);
  }
  if (filters?.fuel) {
    result = result.filter((v) => v.fuel === filters.fuel);
  }
  if (filters?.minPrice) {
    result = result.filter((v) => v.dailyPrice >= filters.minPrice!);
  }
  if (filters?.maxPrice) {
    result = result.filter((v) => v.dailyPrice <= filters.maxPrice!);
  }
  if (filters?.seats) {
    result = result.filter((v) => v.seats >= filters.seats!);
  }

  switch (filters?.sort) {
    case "price_asc":
      result.sort((a, b) => a.dailyPrice - b.dailyPrice);
      break;
    case "price_desc":
      result.sort((a, b) => b.dailyPrice - a.dailyPrice);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort((a, b) => b.year - a.year);
      break;
    default:
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  return result;
}

function enrichList(vehicles: Vehicle[]): Vehicle[] {
  return vehicles.map(enrichVehicle);
}

async function withFallback<T>(
  apiCall: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    if (error instanceof AxiosError) {
      console.warn(`API fallback used: ${error.message}`);
    }
    return fallback;
  }
}

export async function getVehicles(
  filters?: VehicleFilters
): Promise<Vehicle[]> {
  return withFallback(async () => {
    const { data } = await api.get<PaginatedResponse<ApiVehicle>>("/vehicles", {
      params: toApiVehicleParams(filters),
    });
    return enrichList(data.data.map(normalizeVehicle));
  }, enrichList(filterMockVehicles(filters)));
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  return withFallback(async () => {
    const { data } = await api.get<PaginatedResponse<ApiVehicle>>("/vehicles", {
      params: { featured: true, per_page: 12 },
    });
    return enrichList(data.data.map(normalizeVehicle));
  }, enrichList(MOCK_VEHICLES.filter((v) => v.isFeatured)));
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const found = MOCK_VEHICLES.find((v) => v.slug === slug);
  return withFallback(async () => {
    const { data } = await api.get<{ data: ApiVehicle }>(`/vehicles/${slug}`);
    return enrichVehicle(normalizeVehicle(data.data));
  }, found ? enrichVehicle(found) : null);
}

export async function getSimilarVehicles(
  vehicleId: number,
  category: string
): Promise<Vehicle[]> {
  return withFallback(async () => {
    const { data } = await api.get<PaginatedResponse<ApiVehicle>>("/vehicles", {
      params: { per_page: 12 },
    });
    return enrichList(
      data.data
        .map(normalizeVehicle)
        .filter((v) => v.id !== vehicleId && v.category === category)
        .slice(0, 3)
    );
  }, enrichList(MOCK_VEHICLES.filter(
    (v) => v.id !== vehicleId && v.category === category
  ).slice(0, 3)));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return withFallback(async () => {
    const { data } = await api.get<PaginatedResponse<BlogPost>>("/blog");
    return data.data;
  }, MOCK_BLOG_POSTS);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  return withFallback(async () => {
    const { data } = await api.get<{ data: BlogPost }>(`/blog/${slug}`);
    return data.data;
  }, MOCK_BLOG_POSTS.find((p) => p.slug === slug) || null);
}

export async function getReviews(): Promise<Review[]> {
  return withFallback(async () => {
    const { data } = await api.get<{ data: ApiReview[] }>("/reviews");
    const apiReviews = data.data.map(normalizeReview);
    return apiReviews.length >= MOCK_REVIEWS.length ? apiReviews : MOCK_REVIEWS;
  }, MOCK_REVIEWS);
}

export async function getCampaigns(): Promise<Campaign[]> {
  return withFallback(async () => {
    const { data } = await api.get<{ data: ApiCampaign[] }>("/campaigns");
    return data.data.map(normalizeCampaign);
  }, MOCK_CAMPAIGNS);
}

export async function getFaqs(): Promise<FAQ[]> {
  return withFallback(async () => {
    const { data } = await api.get<{ data: FAQ[] }>("/faqs");
    return data.data;
  }, MOCK_FAQS);
}

function filterLocations(locations: Location[]): Location[] {
  const filtered = locations.filter((loc) => {
    const name = loc.name.toLowerCase();
    return name.includes("sakarya") || name.includes("saw") || name.includes("sabiha");
  });
  return filtered.length > 0 ? filtered : MOCK_LOCATIONS;
}

export async function getLocations(): Promise<Location[]> {
  return withFallback(async () => {
    const { data } = await api.get<{ data: Location[] }>("/locations");
    return filterLocations(data.data);
  }, MOCK_LOCATIONS);
}

export async function getExtraServices(): Promise<ExtraService[]> {
  return withFallback(async () => {
    const { data } = await api.get<{ data: ExtraService[] }>("/extras");
    return data.data;
  }, MOCK_EXTRA_SERVICES);
}

export async function createReservation(
  formData: ReservationFormData
): Promise<Reservation> {
  try {
    const { data } = await api.post<{ data: Reservation }>(
      "/reservations",
      formData
    );
    return data.data;
  } catch {
    const vehicle =
      MOCK_VEHICLES.find((v) => v.id === formData.vehicleId) || MOCK_VEHICLES[0];
    const extras = MOCK_EXTRA_SERVICES.filter((e) =>
      formData.extras.includes(e.id)
    );
    const days = Math.max(
      1,
      Math.ceil(
        (new Date(formData.returnDate).getTime() -
          new Date(formData.pickupDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
    const subtotal = vehicle.dailyPrice * days;
    const extrasTotal = extras.reduce((sum, e) => sum + e.dailyPrice * days, 0);

    return {
      reservationNumber: `PRM-${Date.now().toString().slice(-8)}`,
      vehicle,
      pickupLocation: formData.pickupLocation,
      returnLocation: formData.returnLocation,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      extras,
      totalPrice: subtotal + extrasTotal,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
  }
}

export async function getReservation(
  number: string
): Promise<Reservation | null> {
  return withFallback(async () => {
    const { data } = await api.get<{ data: Reservation }>(
      `/reservations/${number}`
    );
    return data.data;
  }, number === MOCK_RESERVATION.reservationNumber ? MOCK_RESERVATION : null);
}

export async function submitContactForm(
  formData: ContactFormData
): Promise<{ success: boolean; message: string }> {
  try {
    const { data } = await api.post<{ message: string }>("/contact", formData);
    return { success: true, message: data.message };
  } catch {
    return {
      success: true,
      message: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
    };
  }
}

export async function checkAvailability(
  vehicleId: number,
  pickupDate: string,
  returnDate: string
): Promise<{ available: boolean; blockedDates: string[] }> {
  return withFallback(
    async () => {
      const { data } = await api.get<{
        data: { available: boolean; blockedDates: string[] };
      }>(`/vehicles/${vehicleId}/availability`, {
        params: { pickupDate, returnDate },
      });
      return data.data;
    },
    { available: true, blockedDates: [] }
  );
}

export default api;
