import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { SAKARYA_SEO_DISTRICTS } from "@/lib/premium-data";
import { getVehicles } from "@/lib/api";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return SAKARYA_SEO_DISTRICTS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const district = SAKARYA_SEO_DISTRICTS.find((d) => d.slug === slug);
  if (!district) return {};
  return {
    title: district.title,
    description: district.description,
    keywords: `${district.name} araç kiralama, rent a car ${district.name.toLowerCase()}, sakarya araç kiralama`,
  };
}

export default async function LocationSeoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const district = SAKARYA_SEO_DISTRICTS.find((d) => d.slug === slug);
  if (!district) notFound();

  const vehicles = await getVehicles();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AutoRental",
          name: `RK Rent A Car - ${district.name}`,
          description: district.description,
          url: `${siteUrl}/lokasyon/${district.slug}`,
          areaServed: district.name,
        }}
      />
      <div className="section-padding">
        <div className="container-premium">
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-gold">Ana Sayfa</Link>
            <span className="mx-2">/</span>
            <span>{district.title}</span>
          </nav>

          <div className="mb-12 max-w-3xl">
            <h1 className="heading-section mb-4 text-navy-900">{district.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{district.description}</p>
            <p className="mt-4 text-gray-600">
              {district.name} bölgesinde ekonomik, SUV ve premium segment araçlarımızla
              havalimanı teslimat, adrese teslim ve esnek iade seçenekleri sunuyoruz.
            </p>
            <Link href="/rezervasyon" className="mt-6 inline-block">
              <Button variant="gold">Hemen Rezervasyon Yap</Button>
            </Link>
          </div>

          <h2 className="mb-6 text-xl font-semibold text-navy-900">
            {district.name} İçin Önerilen Araçlar
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.slice(0, 6).map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-gray-50 p-6">
            <h3 className="mb-4 font-semibold text-navy-900">Diğer Bölgeler</h3>
            <div className="flex flex-wrap gap-2">
              {SAKARYA_SEO_DISTRICTS.filter((d) => d.slug !== slug).map((d) => (
                <Link
                  key={d.slug}
                  href={`/lokasyon/${d.slug}`}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm hover:border-gold hover:text-gold"
                >
                  {d.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
