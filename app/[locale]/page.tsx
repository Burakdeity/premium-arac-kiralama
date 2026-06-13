import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import {
  getFeaturedVehicles,
  getCampaigns,
  getReviews,
} from "@/lib/api";
import { HeroSection } from "@/components/home/HeroSection";
import { SocialProofBar } from "@/components/home/SocialProof";
import { FeaturedVehicles } from "@/components/home/FeaturedVehicles";
import { WhyUs } from "@/components/home/WhyUs";
import { Campaigns } from "@/components/home/Campaigns";
import { MidPageCTA } from "@/components/home/MidPageCTA";
import { Reviews } from "@/components/home/Reviews";
import { ContactSection } from "@/components/home/ContactSection";
import { AIVehicleRecommender } from "@/components/ai/AIAssistant";
import { PageIntroAnimation } from "@/components/shared/PageAnimations";
import { JsonLd, localBusinessSchema } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [vehicles, campaigns, reviews] = await Promise.all([
    getFeaturedVehicles(),
    getCampaigns(),
    getReviews(),
  ]);

  return (
    <PageIntroAnimation>
      <JsonLd data={localBusinessSchema()} />
      <HeroSection />
      <SocialProofBar />
      <FeaturedVehicles vehicles={vehicles} />
      <AIVehicleRecommender />
      <WhyUs />
      <Campaigns campaigns={campaigns} />
      <Reviews reviews={reviews} />
      <MidPageCTA />

      <ContactSection />
    </PageIntroAnimation>
  );
}
