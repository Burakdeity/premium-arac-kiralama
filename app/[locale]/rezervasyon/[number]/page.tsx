import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { SafeImage } from "@/components/ui/SafeImage";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { CheckCircle } from "lucide-react";
import { getReservation } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { PrintButton } from "@/components/shared/PrintButton";
import { PdfDownloadButton } from "@/components/shared/PdfDownloadButton";
import { ReservationPhoneCTA } from "@/components/reservation/ReservationPhoneCTA";
import { formatPrice, formatDate } from "@/lib/utils";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; number: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reservation.confirm" });

  return {
    title: t("title"),
  };
}

export default async function ReservationConfirmPage({
  params,
}: {
  params: Promise<{ locale: string; number: string }>;
}) {
  const { locale, number } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "reservation.confirm" });
  const tRes = await getTranslations({ locale, namespace: "reservation.form" });
  const tSummary = await getTranslations({ locale, namespace: "reservation.summary" });
  const reservation = await getReservation(number);
  if (!reservation) notFound();

  return (
    <div className="section-padding">
      <div className="container-premium max-w-3xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="heading-section mb-2 text-navy-900">{t("title")}</h1>
          <p className="text-gray-600">{t("subtitle")}</p>
          <p className="mt-2 text-sm text-gold">{t("nextStep")}</p>
        </div>

        <div className="mb-6">
          <ReservationPhoneCTA />
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-premium">
          <div className="bg-navy-900 px-6 py-4 text-center">
            <p className="text-sm text-gray-400">{t("number")}</p>
            <p className="text-2xl font-bold text-gold">
              {reservation.reservationNumber}
            </p>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex gap-4">
              <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl">
                <SafeImage
                  src={reservation.vehicle.image}
                  alt={reservation.vehicle.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-navy-900">
                  {reservation.vehicle.name}
                </h2>
                <p className="text-gray-600">
                  {formatPrice(reservation.vehicle.dailyPrice, locale)}/gün
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 border-t border-gray-100 pt-6">
              <div>
                <p className="text-sm text-gray-500">{tRes("pickupLocation")}</p>
                <p className="font-medium">{reservation.pickupLocation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{tRes("returnLocation")}</p>
                <p className="font-medium">{reservation.returnLocation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{tRes("pickupDate")}</p>
                <p className="font-medium">
                  {formatDate(reservation.pickupDate, "d MMMM yyyy", locale)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{tRes("returnDate")}</p>
                <p className="font-medium">
                  {formatDate(reservation.returnDate, "d MMMM yyyy", locale)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{tRes("customerName")}</p>
                <p className="font-medium">{reservation.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{tRes("customerPhone")}</p>
                <p className="font-medium">{reservation.customerPhone}</p>
              </div>
            </div>

            {reservation.extras.length > 0 && (
              <div className="border-t border-gray-100 pt-6">
                <p className="mb-2 font-medium text-navy-900">Ek Hizmetler</p>
                <ul className="space-y-1 text-gray-600">
                  {reservation.extras.map((extra) => (
                    <li key={extra.id}>• {extra.name}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-gray-100 pt-6">
              <span className="text-lg font-semibold">{tSummary("total")}</span>
              <span className="text-2xl font-bold text-gold">
                {formatPrice(reservation.totalPrice, locale)}
              </span>
            </div>
            <p className="text-xs text-gray-500">{tSummary("estimateNote")}</p>          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <PrintButton label={t("print")} />
          <PdfDownloadButton
            reservationNumber={reservation.reservationNumber}
            label={t("pdf")}
          />
          <Link href="/">
            <Button variant="gold">{t("home")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
