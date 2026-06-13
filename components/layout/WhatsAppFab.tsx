"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { CONTACT } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export function WhatsAppFab() {
  const t = useTranslations("common");

  return (
    <a
      href={getWhatsAppUrl(CONTACT.whatsapp, t("whatsappFabMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp")}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:bg-[#20bd5a] hover:shadow-xl sm:h-auto sm:w-auto sm:gap-2 sm:px-5 sm:py-3"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden text-sm font-medium sm:inline">{t("whatsapp")}</span>
    </a>
  );
}
