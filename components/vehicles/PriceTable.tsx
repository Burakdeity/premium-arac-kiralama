"use client";

import { useTranslations, useLocale } from "next-intl";
import { formatPrice } from "@/lib/utils";
import type { Vehicle } from "@/lib/types";

interface PriceTableProps {
  vehicle: Vehicle;
}

export function PriceTable({ vehicle }: PriceTableProps) {
  const t = useTranslations("vehicles.priceTable");
  const locale = useLocale();

  const prices = [
    { label: t("daily"), price: vehicle.dailyPrice, period: "/ gün" },
    { label: t("weekly"), price: vehicle.weeklyPrice, period: "/ hafta" },
    { label: t("monthly"), price: vehicle.monthlyPrice, period: "/ ay" },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
      <div className="bg-navy-900 px-6 py-4">
        <h3 className="font-semibold text-white">{t("title")}</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {prices.map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center justify-between px-6 py-4 ${
              i === 0 ? "bg-gold/5" : ""
            }`}
          >
            <div>
              <p className="font-medium text-navy-900">{item.label}</p>
              <p className="text-sm text-gray-500">{item.period}</p>
            </div>
            <p className="text-xl font-bold text-navy-900">
              {formatPrice(item.price, locale)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
