"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { CONTACT, SOCIAL_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations();

  const quickLinks = [
    { href: "/araclar", label: t("nav.vehicles") },
    { href: "/rezervasyon", label: t("nav.reservation") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/hakkimizda", label: t("nav.about") },
    { href: "/iletisim", label: t("nav.contact") },
  ];

  const legalLinks = [
    { href: "/kvkk", label: t("nav.kvkk") },
    { href: "/gizlilik", label: t("nav.privacy") },
  ];

  return (
    <footer className="border-t-4 border-gold bg-navy-900 text-white">
      <div className="container-premium section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4">
              <Logo size="footer" variant="dark" linkToHome />
            </div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gold">
              {SITE_TAGLINE}
            </p>
            <p className="mb-6 text-sm text-gray-400 leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex gap-3">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-navy-800 p-2 transition-colors hover:bg-gold hover:text-navy-900"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-navy-800 p-2 transition-colors hover:bg-gold hover:text-navy-900"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-navy-800 p-2 transition-colors hover:bg-gold hover:text-navy-900"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-navy-800 p-2 transition-colors hover:bg-gold hover:text-navy-900"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gold">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gold">
              {t("footer.legal")}
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gold">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                {CONTACT.address}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="container-premium flex flex-col items-center justify-between gap-4 py-6 text-sm text-gray-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}.{" "}
            {t("footer.copyright")}
          </p>
          <p>{t("footer.madeIn")}</p>
        </div>
      </div>
    </footer>
  );
}
