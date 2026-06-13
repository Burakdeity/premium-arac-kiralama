"use client";

import { Link } from "@/i18n/routing";
import { SafeImage } from "@/components/ui/SafeImage";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Users, Fuel, Settings, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { img } from "@/lib/placeholders";
import type { Vehicle } from "@/lib/types";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
      <Card hover className="h-full">
        <Link href={`/araclar/${vehicle.slug}`}>
          <div className="relative h-48 overflow-hidden">
            <SafeImage
              src={vehicle.image}
              fallbackSrc={img.car(vehicle.id)}
              alt={vehicle.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            {vehicle.isFeatured && (
              <div className="absolute left-3 top-3">
                <Badge variant="gold">Premium</Badge>
              </div>
            )}
          </div>
        </Link>
        <div className="p-5">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-navy-900">{vehicle.name}</h3>
              <p className="text-sm text-gray-500">{vehicle.year}</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="font-medium">{vehicle.rating}</span>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              {t(`vehicles.filters.${vehicle.transmission}`)}
            </span>
            <span className="flex items-center gap-1">
              <Fuel className="h-4 w-4" />
              {t(`fuel.${vehicle.fuel}`)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {vehicle.seats}
            </span>
          </div>

          <div className="flex items-end justify-between border-t border-gray-100 pt-4">
            <div>
              <span className="text-2xl font-bold text-navy-900">
                {formatPrice(vehicle.dailyPrice, locale)}
              </span>
              <span className="text-sm text-gray-500">
                {t("common.perDay")}
              </span>
            </div>
            <Link href={`/araclar/${vehicle.slug}`}>
              <Button variant="outline" size="sm">
                {t("common.viewDetails")}
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
