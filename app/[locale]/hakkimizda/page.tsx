import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import {
  Car,
  Shield,
  Users,
  Award,
  MapPin,
  Plane,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FAQ } from "@/components/home/FAQ";
import { LocationMap } from "@/components/shared/LocationMap";
import { getFaqs } from "@/lib/api";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";
import { CONTACT, SITE_NAME } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const faqs = await getFaqs();

  const stats = [
    { value: "12", label: t("stats.vehicles") },
    { value: "2", label: t("stats.locations") },
    { value: "5+", label: t("stats.experience") },
    { value: "7/24", label: t("stats.support") },
  ];

  const highlights = [
    { key: "shop", icon: MapPin },
    { key: "airport", icon: Plane },
    { key: "fleet", icon: Car },
    { key: "support", icon: Clock },
  ] as const;

  const values = [
    { key: "quality", icon: Award },
    { key: "trust", icon: Shield },
    { key: "local", icon: MapPin },
    { key: "service", icon: Users },
  ] as const;

  const whatsappUrl = getWhatsAppUrl(
    CONTACT.whatsapp,
    t("cta.whatsappMessage")
  );
  const mapsUrl = `https://www.google.com/maps?q=${CONTACT.lat},${CONTACT.lng}`;

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* Hero */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white section-padding pb-12">
        <div className="container-premium">
          <AnimatedSection className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              {SITE_NAME}
            </p>
            <h1 className="heading-display mb-4 text-navy-900">{t("title")}</h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
              {t("subtitle")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-premium"
                >
                  <p className="text-2xl font-bold text-gold md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-padding">
        <div className="container-premium">
          {/* Story + Mission / Vision */}
          <div className="mb-20 grid gap-12 lg:grid-cols-2">
            <AnimatedSection>
              <div className="h-full rounded-2xl bg-navy-900 p-8 text-white lg:p-12">
                <h2 className="mb-4 text-2xl font-bold text-gold">
                  {t("story.title")}
                </h2>
                <p className="leading-relaxed text-gray-300">
                  {t("story.content")}
                </p>
                <div className="mt-8 flex items-start gap-3 rounded-xl bg-navy-800 p-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm text-gray-400">{SITE_NAME}</p>
                    <p className="font-medium">{CONTACT.address}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="space-y-8">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-premium">
                  <h2 className="mb-3 text-xl font-bold text-navy-900">
                    {t("mission.title")}
                  </h2>
                  <p className="leading-relaxed text-gray-600">
                    {t("mission.content")}
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-premium">
                  <h2 className="mb-3 text-xl font-bold text-navy-900">
                    {t("vision.title")}
                  </h2>
                  <p className="leading-relaxed text-gray-600">
                    {t("vision.content")}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Highlights */}
          <AnimatedSection className="mb-20">
            <h2 className="heading-section mb-10 text-center text-navy-900">
              {t("highlights.title")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {highlights.map(({ key, icon: Icon }, i) => (
                <AnimatedSection key={key} delay={i * 0.08}>
                  <div className="flex h-full gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-premium">
                    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                      <Icon className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-navy-900">
                        {t(`highlights.${key}.title`)}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-600">
                        {t(`highlights.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Values */}
          <AnimatedSection className="mb-20">
            <h2 className="heading-section mb-10 text-center text-navy-900">
              {t("values.title")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map(({ key, icon: Icon }, i) => (
                <AnimatedSection key={key} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-premium">
                    <div className="mx-auto mb-4 inline-flex rounded-xl bg-gold/10 p-3">
                      <Icon className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="mb-2 font-semibold text-navy-900">
                      {t(`values.${key}`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {t(`values.${key}Desc`)}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Shop & Map */}
          <AnimatedSection className="mb-20">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-premium">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 lg:p-10">
                  <h2 className="mb-3 text-2xl font-bold text-navy-900">
                    {t("shop.title")}
                  </h2>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {t("shop.description")}
                  </p>
                  <ul className="mb-8 space-y-4 text-sm">
                    <li className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gold" />
                      <span>{CONTACT.address}</span>
                    </li>
                    <li>
                      <a
                        href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-3 transition-colors hover:text-gold"
                      >
                        <Phone className="h-5 w-5 text-gold" />
                        {CONTACT.phone}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="flex items-center gap-3 transition-colors hover:text-gold"
                      >
                        <MessageCircle className="h-5 w-5 text-gold" />
                        {CONTACT.email}
                      </a>
                    </li>
                  </ul>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
                  >
                    <MapPin className="h-4 w-4" />
                    {t("shop.directions")}
                  </a>
                </div>
                <div className="min-h-[320px] p-4 lg:p-6">
                  <LocationMap
                    address={CONTACT.address}
                    lat={CONTACT.lat}
                    lng={CONTACT.lng}
                    className="h-full min-h-[300px]"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection>
            <div className="rounded-2xl bg-navy-900 p-8 text-center text-white md:p-12">
              <h2 className="heading-section mb-3 text-white">{t("cta.title")}</h2>
              <p className="mx-auto mb-8 max-w-2xl text-gray-300">
                {t("cta.subtitle")}
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-8 py-3.5 font-semibold text-navy-900 transition-colors hover:bg-gold-400 sm:w-auto"
                >
                  <Phone className="h-5 w-5" />
                  {tCommon("callUs")}
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5" />
                  {tCommon("whatsapp")}
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <FAQ faqs={faqs} />
    </>
  );
}
