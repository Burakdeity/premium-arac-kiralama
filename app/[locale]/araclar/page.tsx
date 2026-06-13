import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import VehiclesPageClient from "./VehiclesPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "vehicles" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function VehiclesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<div className="section-padding container-premium">Yükleniyor...</div>}>
      <VehiclesPageClient />
    </Suspense>
  );
}
