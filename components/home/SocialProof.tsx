"use client";

import { useTranslations } from "next-intl";
import { Shield, Star, Users } from "lucide-react";

export function SocialProofBar() {
  const t = useTranslations("socialProof");

  const items = [
    {
      icon: Star,
      label: t("rating"),
    },
    {
      icon: Shield,
      label: t("insured"),
    },
    {
      icon: Users,
      label: t("customers"),
    },
  ];

  return (
    <div className="border-y border-gray-200/80 bg-white py-4">
      <div className="container-premium">
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          {items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-3 text-sm text-gray-600"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10">
                <Icon className="h-4 w-4 text-gold" />
              </span>
              <span className="font-medium text-navy-800">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
