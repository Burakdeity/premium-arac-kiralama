"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { getWhatsAppUrl } from "@/lib/utils";
import { CONTACT } from "@/lib/constants";

export function WhatsAppButton() {
  const t = useTranslations("common");
  const whatsappUrl = getWhatsAppUrl(
    CONTACT.whatsapp,
    "Merhaba, araç kiralama hakkında bilgi almak istiyorum."
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
      aria-label={t("whatsapp")}
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden font-medium sm:inline">{t("whatsapp")}</span>
    </a>
  );
}
