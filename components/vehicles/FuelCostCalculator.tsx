"use client";

import { useState } from "react";
import { Fuel, Route } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";
import type { Vehicle } from "@/lib/types";

const FUEL_PRICES = { petrol: 42.5, diesel: 40.2, hybrid: 42.5, electric: 8.5 };

export function FuelCostCalculator({ vehicle }: { vehicle: Vehicle }) {
  const [km, setKm] = useState("500");
  const consumption = vehicle.fuelConsumption ?? 7;
  const fuelPrice = FUEL_PRICES[vehicle.fuel] ?? 42;
  const totalKm = parseInt(km, 10) || 0;
  const liters = vehicle.fuel === "electric" ? totalKm * 0.18 : (totalKm / 100) * consumption;
  const cost = liters * fuelPrice;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 font-semibold text-navy-900">
        <Fuel className="h-5 w-5 text-gold" />
        Yakıt Maliyeti Hesaplayıcı
      </h3>
      <Input
        label="Tahmini km"
        type="number"
        value={km}
        onChange={(e) => setKm(e.target.value)}
      />
      <div className="mt-4 space-y-2 rounded-xl bg-gray-50 p-4 text-sm">
        <p className="flex justify-between">
          <span className="text-gray-600">Tüketim</span>
          <span>{vehicle.fuel === "electric" ? "18 kWh/100km" : `${consumption} L/100km`}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-600">Yakıt birim fiyat</span>
          <span>{fuelPrice} ₺</span>
        </p>
        <p className="flex justify-between border-t border-gray-200 pt-2 font-semibold text-navy-900">
          <span className="flex items-center gap-1">
            <Route className="h-4 w-4" /> Tahmini maliyet
          </span>
          <span className="text-gold">{formatPrice(cost, "tr")}</span>
        </p>
      </div>
    </div>
  );
}
