"use client";

import { useTranslations, useLocale } from "next-intl";
import { Star, Quote } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { formatDate } from "@/lib/utils";
import type { Review } from "@/lib/types";

interface ReviewsProps {
  reviews: Review[];
}

function ReviewCard({
  review,
  locale,
}: {
  review: Review;
  locale: string;
}) {
  return (
    <article className="relative h-full w-[min(100vw-2rem,340px)] shrink-0 rounded-2xl bg-white p-6 shadow-premium">
      <Quote className="absolute right-4 top-4 h-8 w-8 text-gold/20" />
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star
            key={j}
            className={`h-4 w-4 ${
              j < review.rating ? "fill-gold text-gold" : "text-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="mb-4 line-clamp-5 text-sm leading-relaxed text-gray-600">
        &ldquo;{review.comment}&rdquo;
      </p>
      <div className="border-t border-gray-100 pt-4">
        <p className="font-semibold text-navy-900">{review.name}</p>
        {review.vehicleName && (
          <p className="text-sm text-gray-500">{review.vehicleName}</p>
        )}
        <p className="text-xs text-gray-400">
          {formatDate(review.date, "d MMM yyyy", locale)}
        </p>
      </div>
    </article>
  );
}

function ReviewMarquee({
  reviews,
  locale,
  reverse = false,
}: {
  reviews: Review[];
  locale: string;
  reverse?: boolean;
}) {
  const loop = [...reviews, ...reviews];

  return (
    <div
      className={`flex w-max gap-6 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} hover:[animation-play-state:paused] motion-reduce:animate-none`}
    >
      {loop.map((review, i) => (
        <ReviewCard key={`${review.id}-${i}`} review={review} locale={locale} />
      ))}
    </div>
  );
}

export function Reviews({ reviews }: ReviewsProps) {
  const t = useTranslations("reviews");
  const locale = useLocale();

  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="container-premium">
        <AnimatedSection>
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </AnimatedSection>
      </div>

      <div className="reviews-marquee-mask">
        <ReviewMarquee reviews={reviews} locale={locale} />
      </div>
    </section>
  );
}
