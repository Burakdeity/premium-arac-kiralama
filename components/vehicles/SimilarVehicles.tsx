"use client";

import { useTranslations } from "next-intl";
import { VehicleCard } from "./VehicleCard";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import type { Vehicle } from "@/lib/types";

interface SimilarVehiclesProps {
  vehicles: Vehicle[];
}

export function SimilarVehicles({ vehicles }: SimilarVehiclesProps) {
  const t = useTranslations("vehicles");

  if (vehicles.length === 0) return null;

  return (
    <section className="mt-16">
      <AnimatedSection>
        <h2 className="heading-section mb-8 text-navy-900">{t("similar")}</h2>
      </AnimatedSection>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle, i) => (
          <AnimatedSection key={vehicle.id} delay={i * 0.1}>
            <VehicleCard vehicle={vehicle} />
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
