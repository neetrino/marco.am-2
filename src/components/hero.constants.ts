/**
 * Home hero — Figma MARCO (node 305:2146) primary asset.
 * Inset values are applied via `.hero-section-inset` in `globals.css`.
 */
export const HERO_PRIMARY_IMAGE_SRC = '/assets/hero/hero-figma-mask.png' as const;

const ADDITIONAL_HERO_IMAGES = [
  'https://images.pexels.com/photos/67102/pexels-photo-67102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/266688/pexels-photo-266688.jpeg',
  'https://images.pexels.com/photos/3217852/pexels-photo-3217852.jpeg',
] as const;

/** Ordered slides: Figma hero first, then stock photos. */
export const HERO_CAROUSEL_IMAGES: readonly string[] = [
  HERO_PRIMARY_IMAGE_SRC,
  ...ADDITIONAL_HERO_IMAGES,
];
