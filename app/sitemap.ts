import { MetadataRoute } from "next";
import { MOCK_VEHICLES, MOCK_BLOG_POSTS } from "@/lib/constants";
import { SAKARYA_SEO_DISTRICTS } from "@/lib/premium-data";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/araclar",
    "/rezervasyon",
    "/blog",
    "/hakkimizda",
    "/iletisim",
    "/kvkk",
    "/gizlilik",
  ];

  const locales = ["tr", "en"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const prefix = locale === "tr" ? "" : `/${locale}`;

    for (const page of staticPages) {
      entries.push({
        url: `${siteUrl}${prefix}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1 : 0.8,
      });
    }

    for (const vehicle of MOCK_VEHICLES) {
      entries.push({
        url: `${siteUrl}${prefix}/araclar/${vehicle.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    for (const post of MOCK_BLOG_POSTS) {
      entries.push({
        url: `${siteUrl}${prefix}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    for (const district of SAKARYA_SEO_DISTRICTS) {
      entries.push({
        url: `${siteUrl}${prefix}/lokasyon/${district.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }
  }

  return entries;
}
