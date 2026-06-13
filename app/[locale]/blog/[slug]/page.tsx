import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { SafeImage } from "@/components/ui/SafeImage";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Clock, ArrowLeft } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/api";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) return { title: "Yazı Bulunamadı" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <article className="section-padding">
      <div className="container-premium max-w-4xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("title")}
        </Link>

        <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl">
          <SafeImage
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4">
          <Badge variant="gold">{post.category}</Badge>
          <span className="text-sm text-gray-500">
            {formatDate(post.publishedAt, "d MMMM yyyy", locale)}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            {post.readTime} {t("readTime")}
          </span>
          <span className="text-sm text-gray-500">
            {t("author")}: {post.author}
          </span>
        </div>

        <h1 className="heading-section mb-8 text-navy-900">{post.title}</h1>

        <div
          className="prose prose-lg max-w-none prose-headings:text-navy-900 prose-a:text-gold"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-gray-100 pt-12">
            <h2 className="heading-section mb-8 text-navy-900">
              {t("relatedPosts")}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group"
                >
                  <div className="relative mb-3 aspect-video overflow-hidden rounded-xl">
                    <SafeImage
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-semibold text-navy-900 group-hover:text-gold">
                    {related.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
