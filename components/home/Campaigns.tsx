"use client";

import { SafeImage } from "@/components/ui/SafeImage";
import { useTranslations, useLocale } from "next-intl";
import { Tag, ArrowRight, Percent } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { img } from "@/lib/placeholders";
import { Link } from "@/i18n/routing";
import type { Campaign } from "@/lib/types";

interface CampaignsProps {
  campaigns: Campaign[];
}

export function Campaigns({ campaigns }: CampaignsProps) {
  const t = useTranslations("campaigns");
  const locale = useLocale();

  return (
    <section className="section-padding bg-gradient-to-br from-navy-900 to-navy-800">
      <div className="container-premium">
        <AnimatedSection>
          <div className="mb-10 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1 text-sm text-gold">
              <Percent className="h-4 w-4" />
              {t("eyebrow")}
            </span>
            <h2 className="heading-section text-white">{t("title")}</h2>
            <p className="mx-auto mt-2 max-w-2xl text-gray-300">
              {t("subtitle")}
            </p>
          </div>
        </AnimatedSection>

        <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md md:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            {campaigns.map((campaign, i) => (
              <AnimatedSection key={campaign.id} delay={i * 0.1}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden">
                    <SafeImage
                      src={campaign.image}
                      fallbackSrc={img.campaignCar(campaign.id)}
                      alt={campaign.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4">
                      <Badge variant="gold" className="text-sm font-bold">
                        %{campaign.discount}
                      </Badge>
                    </div>
                    <h3 className="absolute bottom-4 left-4 right-4 text-lg font-semibold text-white">
                      {campaign.title}
                    </h3>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
                      {campaign.description}
                    </p>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
                      {campaign.code ? (
                        <span className="flex items-center gap-1 rounded-full bg-gold/10 px-3 py-1 font-mono text-sm text-navy-800">
                          <Tag className="h-3.5 w-3.5 shrink-0 text-gold" />
                          {campaign.code}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="text-gray-500">
                        {t("validUntil")}{" "}
                        {formatDate(campaign.validUntil, "d MMM yyyy", locale)}
                      </span>
                    </div>
                    <Link
                      href="/rezervasyon"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
                    >
                      {t("cta")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
