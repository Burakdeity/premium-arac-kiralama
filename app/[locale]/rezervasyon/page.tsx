import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ReservationForm } from "@/components/reservation/ReservationForm";
import { getVehicles } from "@/lib/api";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ReservationPhoneCTA } from "@/components/reservation/ReservationPhoneCTA";

interface ReservationPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({ params }: ReservationPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reservation" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

function ReservationFormWrapper({
  vehicleId,
  pickupDate,
  returnDate,
  location,
  vehicles,
}: {
  vehicleId?: number;
  pickupDate?: string;
  returnDate?: string;
  location?: string;
  vehicles: Awaited<ReturnType<typeof getVehicles>>;
}) {
  return (
    <ReservationForm
      vehicles={vehicles}
      preselectedVehicleId={vehicleId}
      preselectedPickupDate={pickupDate}
      preselectedReturnDate={returnDate}
      preselectedLocation={location}
    />
  );
}

export default async function ReservationPage({
  params,
  searchParams,
}: ReservationPageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "reservation" });

  const vehicles = await getVehicles();

  const vehicleId = sp.vehicle ? parseInt(sp.vehicle) : undefined;

  return (
    <div className="section-padding">
      <div className="container-premium">
        <AnimatedSection className="mb-8">
          <h1 className="heading-section mb-4 text-navy-900">{t("title")}</h1>
          <p className="max-w-2xl text-gray-600">{t("subtitle")}</p>
        </AnimatedSection>

        <div className="mb-8 max-w-3xl">
          <ReservationPhoneCTA />
        </div>

        <Suspense fallback={<div>Yükleniyor...</div>}>
          <ReservationFormWrapper
            vehicleId={vehicleId}
            pickupDate={sp.pickupDate}
            returnDate={sp.returnDate}
            location={sp.location}
            vehicles={vehicles}
          />
        </Suspense>
      </div>
    </div>
  );
}
