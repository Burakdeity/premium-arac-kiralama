"use client";

import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { VEHICLE_CATEGORIES } from "@/lib/constants";
import type { VehicleFilters } from "@/lib/types";

interface VehicleFiltersProps {
  filters: VehicleFilters;
  onChange: (filters: VehicleFilters) => void;
  onClear: () => void;
}

export function VehicleFiltersPanel({
  filters,
  onChange,
  onClear,
}: VehicleFiltersProps) {
  const t = useTranslations();

  const categoryOptions = [
    { value: "", label: t("common.all") },
    ...VEHICLE_CATEGORIES.map((c) => ({
      value: c.value,
      label: t(c.labelKey),
    })),
  ];

  const transmissionOptions = [
    { value: "", label: t("common.all") },
    { value: "automatic", label: t("vehicles.filters.automatic") },
    { value: "manual", label: t("vehicles.filters.manual") },
  ];

  const fuelOptions = [
    { value: "", label: t("common.all") },
    { value: "petrol", label: t("fuel.petrol") },
    { value: "diesel", label: t("fuel.diesel") },
    { value: "hybrid", label: t("fuel.hybrid") },
    { value: "electric", label: t("fuel.electric") },
  ];

  const sortOptions = [
    { value: "", label: t("vehicles.filters.sortBy") },
    { value: "price_asc", label: t("vehicles.sort.price_asc") },
    { value: "price_desc", label: t("vehicles.sort.price_desc") },
    { value: "rating", label: t("vehicles.sort.rating") },
    { value: "newest", label: t("vehicles.sort.newest") },
  ];

  const seatOptions = [
    { value: "", label: t("common.all") },
    { value: "4", label: "4+" },
    { value: "5", label: "5+" },
    { value: "7", label: "7+" },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-premium">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold text-navy-900">{t("common.filter")}</h3>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gold"
        >
          <X className="h-4 w-4" />
          {t("common.clear")}
        </button>
      </div>

      <div className="space-y-4">
        <Select
          label={t("vehicles.filters.category")}
          options={categoryOptions}
          value={filters.category || ""}
          onChange={(e) =>
            onChange({
              ...filters,
              category: e.target.value as VehicleFilters["category"],
            })
          }
        />
        <Select
          label={t("vehicles.filters.transmission")}
          options={transmissionOptions}
          value={filters.transmission || ""}
          onChange={(e) =>
            onChange({
              ...filters,
              transmission: e.target.value as VehicleFilters["transmission"],
            })
          }
        />
        <Select
          label={t("vehicles.filters.fuel")}
          options={fuelOptions}
          value={filters.fuel || ""}
          onChange={(e) => onChange({ ...filters, fuel: e.target.value })}
        />
        <Select
          label={t("vehicles.filters.seats")}
          options={seatOptions}
          value={filters.seats?.toString() || ""}
          onChange={(e) =>
            onChange({
              ...filters,
              seats: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
        />
        <Select
          label={t("vehicles.filters.sortBy")}
          options={sortOptions}
          value={filters.sort || ""}
          onChange={(e) =>
            onChange({
              ...filters,
              sort: e.target.value as VehicleFilters["sort"],
            })
          }
        />
      </div>
    </div>
  );
}
