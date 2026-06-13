"use client";

import { useTranslations } from "next-intl";
import { Phone, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

interface ReservationPhoneCTAProps {
  variant?: "compact" | "prominent";
  whatsappMessage?: string;
}

export function ReservationPhoneCTA({
  variant = "prominent",
  whatsappMessage,
}: ReservationPhoneCTAProps) {
  const t = useTranslations("reservation.phoneFlow");
  const tCommon = useTranslations("common");

  const message =
    whatsappMessage ||
    t("whatsappMessage");

  const whatsappUrl = getWhatsAppUrl(CONTACT.whatsapp, message);
  const telUrl = `tel:${CONTACT.phone.replace(/\s/g, "")}`;

  if (variant === "compact") {
    return (
      <div className="flex flex-col gap-2 sm:flex-row">
        <a
          href={telUrl}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-navy-900 px-4 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
        >
          <Phone className="h-4 w-4" />
          {tCommon("callUs")}
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a]"
        >
          <MessageCircle className="h-4 w-4" />
          {tCommon("whatsapp")}
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gold/30 bg-gold/5 p-5">
      <p className="mb-1 font-semibold text-navy-900">{t("title")}</p>
      <p className="mb-4 text-sm leading-relaxed text-gray-600">{t("description")}</p>
      <p className="mb-4 text-lg font-bold text-navy-900">{CONTACT.phone}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={telUrl}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          <Phone className="h-4 w-4" />
          {t("callNow")}
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a]"
        >
          <MessageCircle className="h-4 w-4" />
          {tCommon("whatsapp")}
        </a>
      </div>
    </div>
  );
}
