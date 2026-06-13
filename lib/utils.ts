import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { tr, enUS } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  amount: number,
  locale: string = "tr",
  currency: string = "TRY"
): string {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(
  date: string | Date | null | undefined,
  formatStr: string = "d MMMM yyyy",
  locale: string = "tr"
): string {
  if (!date) return "—";
  const d = typeof date === "string" ? parseISO(date) : date;
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) return "—";
  return format(d, formatStr, { locale: locale === "tr" ? tr : enUS });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function calculateDays(
  pickupDate: string,
  returnDate: string
): number {
  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  const diff = end.getTime() - start.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getWhatsAppUrl(
  phone: string,
  message: string = ""
): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}${message ? `?text=${encoded}` : ""}`;
}
