/** Settings row key — JSON payload validated by `home-customer-reviews.schema`. */
export const HOME_CUSTOMER_REVIEWS_SETTINGS_KEY = "homeCustomerReviews" as const;

/** Stored document version — bump when breaking shape changes. */
export const HOME_CUSTOMER_REVIEWS_STORAGE_VERSION = 1 as const;

/** Max testimonials stored per document (admin). */
export const HOME_CUSTOMER_REVIEWS_MAX_ITEMS = 24 as const;

/** Max optional photo URLs per testimonial. */
export const HOME_CUSTOMER_REVIEWS_MAX_PHOTOS_PER_ITEM = 6 as const;
