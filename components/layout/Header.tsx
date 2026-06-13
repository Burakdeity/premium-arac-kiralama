"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { Menu, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";
import { CONTACT } from "@/lib/constants";

const navLinks = [
  { href: "/", labelKey: "nav.home" },
  { href: "/araclar", labelKey: "nav.vehicles" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/hakkimizda", labelKey: "nav.about" },
  { href: "/iletisim", labelKey: "nav.contact" },
];

function isHomePage(pathname: string) {
  return pathname === "/" || pathname === "/en";
}

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = isHomePage(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const switchLocale = locale === "tr" ? "en" : "tr";

  return (
    <>
      <div className="hidden border-b border-white/10 bg-navy-900 py-2 text-sm text-white lg:block">
        <div className="container-premium flex items-center justify-between">
          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 transition-colors hover:text-gold"
          >
            <Phone className="h-4 w-4" />
            {CONTACT.phone}
          </a>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">{CONTACT.workingHours}</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 transition-colors hover:text-gold"
              >
                <Globe className="h-4 w-4" />
                {locale.toUpperCase()}
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full z-10 mt-1 rounded-lg bg-white py-1 shadow-lg">
                  <Link
                    href="/"
                    locale={switchLocale}
                    className="block px-4 py-2 text-navy-900 hover:bg-gray-50"
                    onClick={() => setLangOpen(false)}
                  >
                    {switchLocale.toUpperCase()}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "border-b backdrop-blur-md",
          isHome
            ? "border-white/10 bg-transparent"
            : "border-gray-200/40 bg-white/60 shadow-sm"
        )}
      >
        <div className="container-premium flex h-20 items-center justify-between sm:h-24">
          <Logo size="header" variant={isHome ? "dark" : "light"} />

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? isHome
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-gold",
                    isHome ? "text-white" : "text-navy-700",
                    active && "text-gold"
                  )}
                >
                  {t(link.labelKey)}
                  {active && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/rezervasyon" className="hidden sm:block">
              <Button variant="gold" size="sm">
                {t("common.bookNow")}
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={cn(
                "rounded-lg p-2 lg:hidden",
                isHome
                  ? "text-white hover:bg-white/10"
                  : "text-navy-900 hover:bg-gray-100"
              )}
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
