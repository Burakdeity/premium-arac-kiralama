"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { DatePicker, addDays } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/Button";
import { MOCK_LOCATIONS, SITE_NAME } from "@/lib/constants";
import { HERO_VIDEO_URL } from "@/lib/premium-data";
import { format } from "date-fns";

export function HeroSearchForm() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const router = useRouter();
  const [location, setLocation] = useState("Sakarya");
  const [pickupDate, setPickupDate] = useState(
    format(addDays(new Date(), 1), "yyyy-MM-dd")
  );
  const [returnDate, setReturnDate] = useState(
    format(addDays(new Date(), 4), "yyyy-MM-dd")
  );

  const locationOptions = MOCK_LOCATIONS.map((loc) => ({
    value: loc.name,
    label: loc.name,
  }));

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (pickupDate) params.set("pickupDate", pickupDate);
    if (returnDate) params.set("returnDate", returnDate);
    router.push(`/araclar?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-5xl rounded-2xl border border-white/15 bg-white p-5 shadow-2xl shadow-black/25 md:p-7"
    >
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.15em] text-navy-600 md:text-left">
        {t("searchLabel")}
      </p>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-1">
          <Select
            label={t("location")}
            options={locationOptions}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={t("location")}
          />
        </div>
        <DatePicker
          label={t("pickupDate")}
          value={pickupDate}
          onChange={setPickupDate}
          locale={locale}
          minDate={format(new Date(), "yyyy-MM-dd")}
        />
        <DatePicker
          label={t("returnDate")}
          value={returnDate}
          onChange={setReturnDate}
          locale={locale}
          minDate={pickupDate}
        />
        <div className="flex items-end">
          <Button
            variant="gold"
            className="w-full py-3.5 text-base"
            onClick={handleSearch}
          >
            <Search className="h-5 w-5" />
            {t("searchButton")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const t = useTranslations("hero");

  const stats = [
    { value: "12", label: t("stats.vehicles") },
    { value: "2", label: t("stats.locations") },
    { value: "850+", label: t("stats.customers") },
    { value: "5+", label: t("stats.years") },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/55 to-navy-950/95" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-28">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="section-eyebrow mb-4 text-gold">{SITE_NAME}</p>
          <h1 className="heading-display mb-5 max-w-4xl text-white">
            {t("title")}
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <HeroSearchForm />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-sm"
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/15">
            {stats.map((stat, i) => (
              <div key={i} className="text-center md:px-4">
                <div className="font-display text-2xl font-bold text-gold md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-gray-400 md:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500"
          aria-hidden
        >
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
