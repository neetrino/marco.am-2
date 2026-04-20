'use client';

type FooterMapEmbedProps = {
  readonly iframeSrc: string;
  readonly title: string;
};

/**
 * Responsive map embed — `iframeSrc` is validated server-side (allowed hosts only).
 */
export function FooterMapEmbed({ iframeSrc, title }: FooterMapEmbedProps) {
  return (
    <div className="mt-8 w-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      <iframe
        title={title}
        src={iframeSrc}
        className="aspect-[21/9] w-full min-h-[200px] border-0 md:min-h-[240px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
