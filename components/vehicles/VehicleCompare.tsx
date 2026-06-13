"use client";

import { useEffect, useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { Link } from "@/i18n/routing";
import { GitCompare, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MOCK_VEHICLES } from "@/lib/constants";
import { enrichVehicle } from "@/lib/premium-data";
import { img } from "@/lib/placeholders";
import { formatPrice } from "@/lib/utils";
import type { Vehicle } from "@/lib/types";

const STORAGE_KEY = "rk-compare";

export function useCompare() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setSlugs(JSON.parse(saved));
  }, []);

  const save = (next: string[]) => {
    setSlugs(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const toggle = (slug: string) => {
    if (slugs.includes(slug)) save(slugs.filter((s) => s !== slug));
    else if (slugs.length < 3) save([...slugs, slug]);
  };

  const clear = () => save([]);

  return { slugs, toggle, clear };
}

export function CompareButton({ slug }: { slug: string }) {
  const { slugs, toggle } = useCompare();
  const active = slugs.includes(slug);

  return (
    <Button
      variant={active ? "gold" : "outline"}
      size="sm"
      onClick={() => toggle(slug)}
      className="gap-2"
    >
      <GitCompare className="h-4 w-4" />
      {active ? "Karşılaştırmadan Çıkar" : "Karşılaştır"}
    </Button>
  );
}

export function CompareBar() {
  const { slugs, clear } = useCompare();
  if (slugs.length === 0) return null;

  const vehicles = slugs
    .map((s) => MOCK_VEHICLES.find((v) => v.slug === s))
    .filter(Boolean)
    .map((v) => enrichVehicle(v!));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white p-4 shadow-2xl">
      <div className="container-premium">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-semibold text-navy-900">
            Karşılaştırma ({vehicles.length}/3)
          </h4>
          <button type="button" onClick={clear} className="text-sm text-gray-500 hover:text-red-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {vehicles.map((v) => (
            <CompareCard key={v.slug} vehicle={v} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CompareCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-3">
      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
        <SafeImage
          src={vehicle.image}
          fallbackSrc={img.car(vehicle.id)}
          alt={vehicle.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{vehicle.name}</p>
        <p className="text-sm text-gold">{formatPrice(vehicle.dailyPrice, "tr")}/gün</p>
      </div>
      <Link href={`/araclar/${vehicle.slug}`}>
        <Button variant="outline" size="sm">Detay</Button>
      </Link>
    </div>
  );
}
