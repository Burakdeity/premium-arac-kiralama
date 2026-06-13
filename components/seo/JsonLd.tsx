import { CONTACT } from "@/lib/constants";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: "RK Rent A Car",
    description:
      "Konforunuz, bizim yolculuğumuz. Güvenilir premium araç kiralama hizmeti.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://rkrentacar.com",
    telephone: CONTACT.phone.replace(/\s/g, ""),
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address,
      addressLocality: "Adapazarı",
      addressRegion: "Sakarya",
      postalCode: "54100",
      addressCountry: "TR",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "₺₺₺",
    image: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo-light.png`,
  };
}

export function productSchema(vehicle: {
  name: string;
  description: string;
  image: string;
  dailyPrice: number;
  brand: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    description: vehicle.description,
    image: vehicle.image,
    brand: {
      "@type": "Brand",
      name: vehicle.brand,
    },
    offers: {
      "@type": "Offer",
      price: vehicle.dailyPrice,
      priceCurrency: "TRY",
      availability: "https://schema.org/InStock",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/araclar/${vehicle.slug}`,
    },
  };
}

export function faqSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
