"use client";

import { useTranslations } from "next-intl";
import { VehicleCard } from "./VehicleCard";
import type { Vehicle } from "@/lib/types";

interface VehicleGridProps {
  vehicles: Vehicle[];
  loading?: boolean;
}

export function VehicleGrid({ vehicles, loading }: VehicleGridProps) {
  const t = useTranslations("common");

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-80 animate-pulse rounded-2xl bg-gray-200"
          />
        ))}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
        <p className="text-lg text-gray-500">{t("noResults")}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
