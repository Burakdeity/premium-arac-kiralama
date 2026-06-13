import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { getVehicleBySlug, getSimilarVehicles } from "@/lib/api";
import { VehicleGallery } from "@/components/vehicles/VehicleGallery";
import { VehicleSpecs } from "@/components/vehicles/VehicleSpecs";
import { PriceTable } from "@/components/vehicles/PriceTable";
import { AvailabilityCalendar } from "@/components/vehicles/AvailabilityCalendar";
import { SimilarVehicles } from "@/components/vehicles/SimilarVehicles";
import { VehicleInteriorGallery, VehicleVideo } from "@/components/vehicles/VehicleMedia";
import { FuelCostCalculator } from "@/components/vehicles/FuelCostCalculator";
import { CompareButton } from "@/components/vehicles/VehicleCompare";
import { PriceHistoryChart } from "@/components/conversion/UrgencyTools";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { JsonLd, productSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { formatPrice } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return { title: "Araç Bulunamadı" };
  return {
    title: vehicle.name,
    description: vehicle.description,
    openGraph: { images: [vehicle.image] },
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "vehicles" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const similar = await getSimilarVehicles(vehicle.id, vehicle.category);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return (
    <>
      <JsonLd data={productSchema(vehicle)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav("home"), url: siteUrl },
          { name: t("title"), url: `${siteUrl}/araclar` },
          { name: vehicle.name, url: `${siteUrl}/araclar/${vehicle.slug}` },
        ])}
      />

      <div className="section-padding pb-32">
        <div className="container-premium">
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-gold">{tNav("home")}</Link>
            <span className="mx-2">/</span>
            <Link href="/araclar" className="hover:text-gold">{t("title")}</Link>
            <span className="mx-2">/</span>
            <span className="text-navy-900">{vehicle.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <VehicleGallery images={vehicle.images} name={vehicle.name} />
              {vehicle.videoUrl && (
                <VehicleVideo url={vehicle.videoUrl} title={vehicle.name} />
              )}
              {vehicle.interiorImages && (
                <VehicleInteriorGallery images={vehicle.interiorImages} name={vehicle.name} />
              )}
            </div>

            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge variant="gold">{tCat(vehicle.category)}</Badge>
                {vehicle.isFeatured && <Badge variant="navy">Premium</Badge>}
              </div>
              <h1 className="heading-section mb-2 text-navy-900">{vehicle.name}</h1>

              <div className="mb-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-gold text-gold" />
                  <span className="font-semibold">{vehicle.rating}</span>
                  <span className="text-gray-500">
                    ({vehicle.reviewCount} {t("reviewCountLabel")})
                  </span>
                </div>
              </div>

              <p className="mb-6 text-gray-600 leading-relaxed">{vehicle.description}</p>

              <div className="mb-6 rounded-2xl bg-navy-900 p-6 text-white">
                <p className="text-sm text-gray-400">{tCommon("from")}</p>
                <p className="text-4xl font-bold text-gold">
                  {formatPrice(vehicle.dailyPrice, locale)}
                  <span className="text-lg font-normal text-gray-400">{tCommon("perDay")}</span>
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={`/rezervasyon?vehicle=${vehicle.id}`} className="flex-1">
                  <Button variant="gold" size="lg" className="w-full">{tCommon("bookNow")}</Button>
                </Link>
                <CompareButton slug={vehicle.slug} />
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <VehicleSpecs vehicle={vehicle} />
              {vehicle.priceHistory && (
                <PriceHistoryChart history={vehicle.priceHistory} currentPrice={vehicle.dailyPrice} />
              )}
            </div>
            <div className="space-y-6">
              <PriceTable vehicle={vehicle} />
              <FuelCostCalculator vehicle={vehicle} />
              <AvailabilityCalendar />
            </div>
          </div>

          <SimilarVehicles vehicles={similar} />
        </div>
      </div>
    </>
  );
}
