import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { AppShell } from "@/components/layout/AppShell";
import { MainWithOffset } from "@/components/layout/MainWithOffset";
import { Footer } from "@/components/layout/Footer";
import { CompareBar } from "@/components/vehicles/VehicleCompare";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "tr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <AppShell
        overlays={
          <>
            <CompareBar />
            <WhatsAppFab />
          </>
        }
      >
        <MainWithOffset>{children}</MainWithOffset>
        <Footer />
      </AppShell>
    </NextIntlClientProvider>
  );
}
