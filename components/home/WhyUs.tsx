"use client";

import { useTranslations } from "next-intl";
import {
  Car,
  Headphones,
  Plane,
  Shield,
  Calendar,
  BadgeCheck,
} from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeader } from "@/components/shared/SectionHeader";

const featureIcons = {
  premium: Car,
  support: Headphones,
  airport: Plane,
  insurance: Shield,
  flexible: Calendar,
  price: BadgeCheck,
};

const featureKeys = [
  "premium",
  "support",
  "airport",
  "insurance",
  "flexible",
  "price",
] as const;

export function WhyUs() {
  const t = useTranslations("whyUs");

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-premium">
        <AnimatedSection>
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </AnimatedSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map((key, i) => {
            const Icon = featureIcons[key];
            return (
              <AnimatedSection key={key} delay={i * 0.1}>
                <div className="group rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-gold/30 hover:shadow-premium">
                  <div className="mb-4 inline-flex rounded-xl bg-gold/10 p-3 transition-colors group-hover:bg-gold/20">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-navy-900">
                    {t(`features.${key}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`features.${key}.description`)}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
