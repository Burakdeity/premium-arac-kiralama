"use client";

import { useTranslations } from "next-intl";
import {
  UserPlus,
  Baby,
  Navigation,
  Shield,
  Wifi,
  Plane,
  ShieldCheck,
  CreditCard,
  Fuel,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { ExtraService } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "user-plus": UserPlus,
  baby: Baby,
  navigation: Navigation,
  shield: Shield,
  "shield-check": ShieldCheck,
  wifi: Wifi,
  plane: Plane,
  "credit-card": CreditCard,
  fuel: Fuel,
  crown: Crown,
};

interface ExtraServicesProps {
  services: ExtraService[];
  selected: number[];
  onChange: (selected: number[]) => void;
  days: number;
  locale?: string;
}

export function ExtraServices({
  services,
  selected,
  onChange,
  days,
  locale = "tr",
}: ExtraServicesProps) {
  const t = useTranslations("reservation.extras");

  const toggle = (id: number) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold text-navy-900">{t("title")}</h3>
      <p className="mb-6 text-gray-600">{t("subtitle")}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => {
          const Icon = iconMap[service.icon] || Shield;
          const isSelected = selected.includes(service.id);
          const total = service.dailyPrice * days;

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => toggle(service.id)}
              className={cn(
                "flex items-start gap-4 rounded-xl border-2 p-4 text-left transition-all",
                isSelected
                  ? "border-gold bg-gold/5"
                  : "border-gray-100 hover:border-gray-200"
              )}
            >
              <div
                className={cn(
                  "rounded-lg p-2",
                  isSelected ? "bg-gold/20" : "bg-gray-100"
                )}
              >
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-navy-900">{service.name}</p>
                <p className="text-sm text-gray-500">{service.description}</p>
                <p className="mt-1 text-sm font-semibold text-gold">
                  {formatPrice(service.dailyPrice, locale)}/gün
                  {days > 1 && (
                    <span className="text-gray-500 font-normal">
                      {" "}
                      ({formatPrice(total, locale)} toplam)
                    </span>
                  )}
                </p>
              </div>
              <div
                className={cn(
                  "h-5 w-5 shrink-0 rounded-full border-2",
                  isSelected
                    ? "border-gold bg-gold"
                    : "border-gray-300"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
