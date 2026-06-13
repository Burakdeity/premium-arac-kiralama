"use client";

import { Flame, AlertTriangle, Clock } from "lucide-react";
import type { Vehicle } from "@/lib/types";

export function UrgencyBadges({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {vehicle.unitsLeft !== undefined && vehicle.unitsLeft <= 2 && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-600">
          <AlertTriangle className="h-3.5 w-3.5" />
          Son {vehicle.unitsLeft} araç kaldı
        </span>
      )}
      {vehicle.isHighDemand && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-700">
          <Flame className="h-3.5 w-3.5" />
          Bu hafta yoğun talep görüyor
        </span>
      )}
    </div>
  );
}

export function DiscountCountdown({ endDate }: { endDate: string }) {
  const end = new Date(endDate).getTime();
  if (!endDate || Number.isNaN(end)) return null;

  const now = Date.now();
  const diff = Math.max(0, end - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="rounded-xl border border-gold/30 bg-gold/5 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gold">
        <Clock className="h-4 w-4" />
        Kampanya bitimine kalan süre
      </div>
      <div className="flex gap-3 text-center">
        {[
          { v: days, l: "Gün" },
          { v: hours, l: "Saat" },
          { v: mins, l: "Dk" },
        ].map(({ v, l }) => (
          <div key={l} className="flex-1 rounded-lg bg-navy-900 py-2 text-white">
            <div className="text-xl font-bold">{String(v).padStart(2, "0")}</div>
            <div className="text-xs text-gray-400">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RentalStats({ count }: { count: number }) {
  return (
    <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
      Bu araç son <strong>30 günde {count} kez</strong> kiralandı
    </div>
  );
}

export function PriceHistoryChart({
  history,
  currentPrice,
}: {
  history: { date: string; price: number }[];
  currentPrice: number;
}) {
  const max = Math.max(...history.map((h) => h.price), currentPrice);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 font-semibold text-navy-900">Fiyat Geçmişi (6 Ay)</h3>
      <div className="flex h-32 items-end justify-between gap-2">
        {history.map((h) => (
          <div key={h.date} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t bg-gold/80 transition-all"
              style={{ height: `${(h.price / max) * 100}%`, minHeight: "8px" }}
            />
            <span className="text-xs text-gray-500">{h.date}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Güncel fiyat: <strong className="text-gold">{currentPrice.toLocaleString("tr-TR")} ₺</strong>/gün
      </p>
    </div>
  );
}
