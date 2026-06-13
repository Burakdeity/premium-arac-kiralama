import { Link } from "@/i18n/routing";
import { SafeImage } from "@/components/ui/SafeImage";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Clock } from "lucide-react";
import { getBlogPosts } from "@/lib/api";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = await getBlogPosts();

  return (
    <div className="section-padding">
      <div className="container-premium">
        <AnimatedSection className="mb-12 text-center">
          <h1 className="heading-section mb-4 text-navy-900">{t("title")}</h1>
          <p className="mx-auto max-w-2xl text-gray-600">{t("subtitle")}</p>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="h-full overflow-hidden rounded-2xl bg-white shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                  <div className="relative h-52 overflow-hidden">
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
                      <span>
                        {formatDate(post.publishedAt, "d MMM yyyy", locale)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime} {t("readTime")}
                      </span>
                    </div>
                    <h2 className="mb-2 text-xl font-semibold text-navy-900 group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
