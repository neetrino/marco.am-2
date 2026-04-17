import Image from 'next/image';

export type HeroCarouselSlidesProps = {
  imageMobileUrl: string;
  imageDesktopUrl: string;
};

function isLocalPublicPath(src: string): boolean {
  return src.startsWith('/');
}

function HeroSlideBg({
  src,
  className,
  sizes,
}: {
  src: string;
  className: string;
  sizes: string;
}) {
  if (isLocalPublicPath(src)) {
    return (
      <Image
        src={src}
        alt=""
        fill
        className={className}
        priority
        sizes={sizes}
      />
    );
  }
  return (
    <img
      src={src}
      alt=""
      className={`absolute inset-0 h-full w-full ${className}`}
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  );
}

export function HeroCarouselSlides({
  imageMobileUrl,
  imageDesktopUrl,
}: HeroCarouselSlidesProps) {
  const sizes = '(max-width: 1280px) 100vw, min(100vw, 1280px)';
  return (
    <div className="relative box-border h-full min-h-[inherit] w-full min-w-0">
      <div className="absolute inset-0 box-border min-w-0 bg-marco-yellow">
        {/* Figma 314:2380 — mobile only */}
        <HeroSlideBg
          src={imageMobileUrl}
          className="object-cover object-top md:hidden"
          sizes={sizes}
        />
        {/* Desktop / tablet — vertical brick (or CMS URL) */}
        <HeroSlideBg
          src={imageDesktopUrl}
          className="hidden object-cover object-top md:block"
          sizes={sizes}
        />
      </div>
    </div>
  );
}
