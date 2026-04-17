import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';

import type { HomeCustomerReviewsPublicItem } from '@/lib/services/home-customer-reviews.service';

export function ReviewThumb({ url }: { url: string }) {
  const isLocalPublic = url.startsWith('/');
  if (isLocalPublic) {
    return (
      <Image
        src={url}
        alt=""
        width={64}
        height={64}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    );
  }
  return (
    <img
      src={url}
      alt=""
      className="h-full w-full object-cover"
      loading="lazy"
      decoding="async"
    />
  );
}

export function StarRow({ rating }: { rating: number }) {
  const safe = Math.min(5, Math.max(1, Math.round(rating)));
  return (
    <div className="flex gap-0.5" aria-label={`${safe} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 shrink-0 ${
            i < safe
              ? 'fill-marco-yellow text-marco-yellow'
              : 'fill-transparent text-gray-300'
          }`}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </div>
  );
}

type CarouselChromeProps = {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function ReviewCarouselChrome({
  canPrev,
  canNext,
  onPrev,
  onNext,
}: CarouselChromeProps) {
  return (
    <>
      {canPrev ? (
        <button
          type="button"
          className="absolute top-1/2 left-0 z-10 hidden -translate-x-1 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-md md:flex"
          aria-label="Previous reviews"
          onClick={onPrev}
        >
          <ChevronLeft className="h-5 w-5 text-marco-black" />
        </button>
      ) : null}
      {canNext ? (
        <button
          type="button"
          className="absolute top-1/2 right-0 z-10 hidden translate-x-1 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-md md:flex"
          aria-label="Next reviews"
          onClick={onNext}
        >
          <ChevronRight className="h-5 w-5 text-marco-black" />
        </button>
      ) : null}
    </>
  );
}

type ReviewCardProps = { item: HomeCustomerReviewsPublicItem };

export function ReviewCard({ item }: ReviewCardProps) {
  return (
    <article
      className="w-[min(100%,22rem)] shrink-0 snap-start rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:w-[min(100%,24rem)]"
    >
      <StarRow rating={item.rating} />
      {item.authorName !== '' ? (
        <p className="mt-3 font-semibold text-marco-black text-sm">
          {item.authorName}
        </p>
      ) : null}
      <p className="mt-2 text-marco-black/80 text-sm leading-relaxed">
        {item.text}
      </p>
      {item.photoUrls.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {item.photoUrls.map((url, photoIndex) => (
            <li
              key={`${item.id}-photo-${photoIndex}`}
              className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100"
            >
              <ReviewThumb url={url} />
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
