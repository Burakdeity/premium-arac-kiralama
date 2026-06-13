"use client";

import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { X, Phone, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CONTACT, SOCIAL_LINKS } from "@/lib/constants";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/", labelKey: "nav.home" },
  { href: "/araclar", labelKey: "nav.vehicles" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/hakkimizda", labelKey: "nav.about" },
  { href: "/iletisim", labelKey: "nav.contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations();
  const locale = useLocale();
  const switchLocale = locale === "tr" ? "en" : "tr";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-navy-900/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[10001] flex h-full w-full max-w-sm flex-col bg-white shadow-xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <Logo size="header" linkToHome={false} />
              <button
                onClick={onClose}
                className="rounded-lg p-2 hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="block border-b border-gray-50 py-4 text-lg font-medium text-navy-900 hover:text-gold"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>

            <div className="border-t border-gray-100 p-4 space-y-4">
              <div className="space-y-2 text-sm text-gray-600">
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT.phone}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  {CONTACT.email}
                </a>
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  {CONTACT.address}
                </p>
              </div>
              <Link href="/rezervasyon" onClick={onClose}>
                <Button variant="gold" className="w-full">
                  {t("common.bookNow")}
                </Button>
              </Link>
              <Link
                href="/"
                locale={switchLocale}
                onClick={onClose}
                className="block text-center text-sm text-gray-500 hover:text-gold"
              >
                {switchLocale.toUpperCase()}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
