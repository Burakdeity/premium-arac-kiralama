"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/lib/types";

interface FAQProps {
  faqs: FAQ[];
}

export function FAQ({ faqs }: FAQProps) {
  const t = useTranslations("faq");
  const [openId, setOpenId] = useState<number | null>(faqs[0]?.id ?? null);

  return (
    <section className="section-padding">
      <div className="container-premium">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="heading-section mb-4 text-navy-900">{t("title")}</h2>
          <p className="mx-auto max-w-2xl text-gray-600">{t("subtitle")}</p>
        </AnimatedSection>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, i) => (
            <AnimatedSection key={faq.id} delay={i * 0.05}>
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="pr-4 font-semibold text-navy-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-gold transition-transform duration-300",
                      openId === faq.id && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="border-t border-gray-100 px-6 pb-6 pt-4 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
