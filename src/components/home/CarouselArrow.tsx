'use client';

/**
 * Round carousel control — matches Figma NEWS / SPECIAL OFFERS header arrows.
 */
export function CarouselArrow({
  direction,
  disabled,
  onClick,
  label,
}: {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  const isPrev = direction === 'prev';
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#374151] transition-colors hover:border-[#ffca03] hover:text-[#181111] disabled:cursor-not-allowed disabled:opacity-40"
    >
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        {isPrev ? (
          <path d="M6 1L1 6l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M2 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}
