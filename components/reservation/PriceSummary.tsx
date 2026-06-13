"use client";

import { useTranslations, useLocale } from "next-intl";
import { formatPrice } from "@/lib/utils";
import type { PriceBreakdown } from "@/lib/types";

interface PriceSummaryProps {
  breakdown: PriceBreakdown;
  extras?: { name: string; price: number }[];
}

export function PriceSummary({ breakdown, extras = [] }: PriceSummaryProps) {
  const t = useTranslations("reservation.summary");
  const locale = useLocale();

  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden sticky top-24">
      <div className="bg-navy-900 px-6 py-4">
        <h3 className="font-semibold text-white">{t("title")}</h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{t("dailyRate")}</span>
          <span className="font-medium">
            {formatPrice(breakdown.dailyRate, locale)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            {t("days")} ({breakdown.days})
          </span>
          <span className="font-medium">
            {formatPrice(breakdown.subtotal, locale)}
          </span>
        </div>

        {extras.length > 0 && (
          <div className="border-t border-gray-100 pt-4">
            <p className="mb-2 text-sm font-medium text-navy-900">
              {t("extras")}
            </p>
            {extras.map((extra) => (
              <div
                key={extra.name}
                className="flex justify-between text-sm text-gray-600"
              >
                <span>{extra.name}</span>
                <span>{formatPrice(extra.price, locale)}</span>
              </div>
            ))}
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-gray-600">{t("extras")}</span>
              <span className="font-medium">
                {formatPrice(breakdown.extrasTotal, locale)}
              </span>
            </div>
          </div>
        )}

        {breakdown.discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>{t("discount")}</span>
            <span>-{formatPrice(breakdown.discount, locale)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{t("tax")}</span>
          <span className="font-medium">
            {formatPrice(breakdown.tax, locale)}
          </span>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-navy-900">
              {t("total")}
            </span>
            <span className="text-2xl font-bold text-gold">
              {formatPrice(breakdown.total, locale)}
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">{t("estimateNote")}</p>
        </div>
      </div>
    </div>
  );
}
