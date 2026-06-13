"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { submitContactForm } from "@/lib/api";
import { CONTACT } from "@/lib/constants";
import { LocationMap } from "@/components/shared/LocationMap";

export function ContactSection() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const result = await submitContactForm(form);
      if (result.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-premium">
        <AnimatedSection>
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </AnimatedSection>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl bg-navy-900 p-8 text-white shadow-xl shadow-navy-900/25">
              <h3 className="mb-6 text-xl font-semibold text-gold">
                {t("info.title")}
              </h3>
              <div className="space-y-6">
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 transition-colors hover:text-gold"
                >
                  <div className="rounded-xl bg-navy-800 p-3">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{tCommon("phone")}</p>
                    <p className="font-medium">{CONTACT.phone}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-4 transition-colors hover:text-gold"
                >
                  <div className="rounded-xl bg-navy-800 p-3">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{tCommon("email")}</p>
                    <p className="font-medium">{CONTACT.email}</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-navy-800 p-3">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{tCommon("address")}</p>
                    <p className="font-medium">{CONTACT.address}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 rounded-xl bg-navy-800 p-4">
                <p className="text-sm text-gray-400">{t("info.hours")}</p>
                <p className="font-medium text-gold">{CONTACT.workingHours}</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="h-full w-full">
            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-xl shadow-gray-400/20 ring-1 ring-navy-900/10">
              <div className="h-1.5 bg-gold" />
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-6 pb-10 sm:p-8 sm:pb-12 [&_.input-premium]:border-gray-300 [&_.input-premium]:bg-gray-50"
              >
              <h3 className="mb-2 text-xl font-semibold text-navy-900">
                {t("form.title")}
              </h3>
              <p className="mb-4 text-sm text-gray-500">
                {t("subtitle")}
              </p>
              <Input
                label={tCommon("name")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label={tCommon("email")}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <Input
                  label={tCommon("phone")}
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
              <Input
                label={tCommon("subject")}
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />
              <div>
                <label className="mb-2 block text-sm font-medium text-navy-700">
                  {tCommon("message")}
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={4}
                  className="input-premium resize-none"
                />
              </div>
              {status === "success" && (
                <p className="text-green-600">{t("form.success")}</p>
              )}
              {status === "error" && (
                <p className="text-red-500">{t("form.error")}</p>
              )}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="gold"
                  isLoading={status === "loading"}
                  className="w-full sm:w-auto"
                >
                  <Send className="h-5 w-5" />
                  {tCommon("submit")}
                </Button>
              </div>
              </form>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.3} className="mt-12">
          <LocationMap
            address={CONTACT.address}
            lat={CONTACT.lat}
            lng={CONTACT.lng}
            className="h-[400px] w-full"
          />
        </AnimatedSection>
      </div>
    </section>
  );
}
