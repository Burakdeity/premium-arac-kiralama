"use client";

import { Link } from "@/i18n/routing";
import { SafeImage } from "@/components/ui/SafeImage";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const t = useTranslations("blog");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-premium">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="heading-section mb-4 text-navy-900">{t("title")}</h2>
          <p className="mx-auto max-w-2xl text-gray-600">{t("subtitle")}</p>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="overflow-hidden rounded-2xl bg-white shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                  <div className="relative h-48 overflow-hidden">
                    <SafeImage
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute left-4 top-4">
                      <Badge variant="gold">{post.category}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3 text-sm text-gray-500">
                      <span>{formatDate(post.publishedAt, "d MMM yyyy", locale)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime} {t("readTime")}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-navy-900 group-hover:text-gold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center" delay={0.3}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-semibold text-gold hover:text-gold-600 transition-colors"
          >
            {tCommon("viewAll")}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
