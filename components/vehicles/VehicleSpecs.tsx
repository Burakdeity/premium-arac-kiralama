"use client";

import { useTranslations } from "next-intl";
import {
  Settings,
  Fuel,
  Users,
  DoorOpen,
  Luggage,
  Calendar,
  Check,
} from "lucide-react";
import type { Vehicle } from "@/lib/types";

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  const t = useTranslations();

  const specs = [
    {
      icon: Settings,
      label: t("vehicles.specs.transmission"),
      value: t(`vehicles.filters.${vehicle.transmission}`),
    },
    {
      icon: Fuel,
      label: t("vehicles.specs.fuel"),
      value: t(`fuel.${vehicle.fuel}`),
    },
    {
      icon: Users,
      label: t("vehicles.specs.seats"),
      value: `${vehicle.seats} Kişi`,
    },
    {
      icon: DoorOpen,
      label: t("vehicles.specs.doors"),
      value: `${vehicle.doors} Kapı`,
    },
    {
      icon: Luggage,
      label: t("vehicles.specs.luggage"),
      value: `${vehicle.luggage} Valiz`,
    },
    {
      icon: Calendar,
      label: t("vehicles.specs.year"),
      value: vehicle.year.toString(),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
          >
            <spec.icon className="h-5 w-5 text-gold" />
            <div>
              <p className="text-xs text-gray-500">{spec.label}</p>
              <p className="font-medium text-navy-900">{spec.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-navy-900">
          {t("vehicles.specs.features")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {vehicle.features.map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center gap-1 rounded-full bg-gold/10 px-3 py-1.5 text-sm text-navy-800"
            >
              <Check className="h-3.5 w-3.5 text-gold" />
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
