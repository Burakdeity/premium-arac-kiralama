"use client";

import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import type { Vehicle } from "@/lib/types";

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
}

export function FeaturedVehicles({ vehicles }: FeaturedVehiclesProps) {
  const t = useTranslations("featured");
  const tCommon = useTranslations("common");

  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <AnimatedSection>
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.slice(0, 4).map((vehicle, i) => (
            <AnimatedSection key={vehicle.id} delay={i * 0.1}>
              <VehicleCard vehicle={vehicle} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center" delay={0.4}>
          <Link
            href="/araclar"
            className="inline-flex items-center gap-2 font-semibold text-gold hover:text-gold-600 transition-colors"
          >
            {tCommon("viewAll")}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
