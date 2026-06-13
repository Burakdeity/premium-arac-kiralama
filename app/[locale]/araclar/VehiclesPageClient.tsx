"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getVehicles } from "@/lib/api";
import { VehicleFiltersPanel } from "@/components/vehicles/VehicleFilters";
import { VehicleGrid } from "@/components/vehicles/VehicleGrid";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import type { Vehicle, VehicleFilters } from "@/lib/types";

export default function VehiclesPageClient() {
  const t = useTranslations("vehicles");
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<VehicleFilters>({
    category: (searchParams.get("category") as VehicleFilters["category"]) || undefined,
    pickupDate: searchParams.get("pickupDate") || undefined,
    returnDate: searchParams.get("returnDate") || undefined,
    location: searchParams.get("location") || undefined,
  });

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    const data = await getVehicles(filters);
    setVehicles(data);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleClear = () => setFilters({});

  return (
    <div className="section-padding">
      <div className="container-premium">
        <AnimatedSection className="mb-12">
          <h1 className="heading-section mb-4 text-navy-900">{t("title")}</h1>
          <p className="max-w-2xl text-gray-600">{t("subtitle")}</p>
        </AnimatedSection>

        <div className="grid gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <VehicleFiltersPanel
                filters={filters}
                onChange={setFilters}
                onClear={handleClear}
              />
            </div>
          </aside>
          <div className="lg:col-span-3">
            {!loading && (
              <p className="mb-6 text-sm text-gray-500">
                {vehicles.length} {t("title").toLowerCase()}
              </p>
            )}
            <VehicleGrid vehicles={vehicles} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
