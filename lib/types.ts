export interface Vehicle {
  id: number;
  slug: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: VehicleCategory;
  transmission: "automatic" | "manual";
  fuel: "petrol" | "diesel" | "hybrid" | "electric";
  seats: number;
  doors: number;
  luggage: number;
  dailyPrice: number;
  weeklyPrice: number;
  monthlyPrice: number;
  image: string;
  images: string[];
  interiorImages?: string[];
  videoUrl?: string;
  features: string[];
  description: string;
  isFeatured: boolean;
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  rentalCount30Days?: number;
  viewersToday?: number;
  unitsLeft?: number;
  isHighDemand?: boolean;
  fuelConsumption?: number;
  priceHistory?: { date: string; price: number }[];
}

export type VehicleCategory =
  | "economy"
  | "compact"
  | "sedan"
  | "suv"
  | "luxury"
  | "van"
  | "premium";

export interface VehicleFilters {
  category?: VehicleCategory;
  transmission?: "automatic" | "manual";
  fuel?: string;
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
  pickupDate?: string;
  returnDate?: string;
  location?: string;
  sort?: "price_asc" | "price_desc" | "rating" | "newest";
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  category: string;
  readTime: number;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  vehicleName?: string;
}

export interface Campaign {
  id: number;
  title: string;
  description: string;
  discount: number;
  code?: string;
  validUntil: string;
  image: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  isAirport: boolean;
}

export interface ExtraService {
  id: number;
  name: string;
  description: string;
  dailyPrice: number;
  icon: string;
  category?: "insurance" | "comfort" | "tech" | "delivery" | "fuel";
}

export interface Reservation {
  id?: number;
  reservationNumber: string;
  vehicle: Vehicle;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  extras: ExtraService[];
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

export interface ReservationFormData {
  vehicleId: number;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerIdNumber?: string;
  driverLicense?: string;
  extras: number[];
  notes?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: {
    total: number;
    page: number;
    perPage: number;
    lastPage: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    lastPage: number;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface PriceBreakdown {
  dailyRate: number;
  days: number;
  subtotal: number;
  extrasTotal: number;
  discount: number;
  tax: number;
  total: number;
}
