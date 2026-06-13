"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ArrowRight, Phone } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";

export function MidPageCTA() {
  const t = useTranslations("midPageCta");
  const tCommon = useTranslations("common");

  return (
    <section className="section-padding bg-navy-950">
      <div className="container-premium">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-900 to-navy-800 px-8 py-12 md:px-14 md:py-16">
            <div className="absolute -right-16 top-0 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />
            <div className="relative flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
              <SectionHeader
                eyebrow={t("badge")}
                title={t("title")}
                subtitle={t("subtitle")}
                align="left"
                theme="dark"
                className="mb-0 md:max-w-xl"
              />
              <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:min-w-[240px]">
                <Link href="/rezervasyon" className="w-full">
                  <Button variant="gold" size="lg" className="w-full">
                    {tCommon("bookNow")}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-gold/50 hover:text-gold"
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
