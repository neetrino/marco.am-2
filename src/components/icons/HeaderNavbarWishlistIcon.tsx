interface HeaderNavbarWishlistIconProps {
  /**
   * Utility classes — use `text-*` for color (`currentColor`).
   * Figma MARCO `111:4288` — header row wishlist / likes outline.
   */
  className?: string;
}

const VIEWBOX_W = 22;
const VIEWBOX_H = 19;

/**
 * Navbar wishlist (likes) — outline heart matching header toolbar row (Figma Frame 9223).
 */
export function HeaderNavbarWishlistIcon({ className = '' }: HeaderNavbarWishlistIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M6.5 1C3.4625 1 1 3.43911 1 6.44777C1 11.8955 7.5 16.848 11 18C14.5 16.848 21 11.8955 21 6.44777C21 3.43911 18.5375 1 15.5 1C13.64 1 11.995 1.91473 11 3.31481C10.4928 2.59936 9.81897 2.01547 9.03568 1.61254C8.25238 1.20961 7.38263 0.999507 6.5 1Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
