'use client';

import {
  getSpecialOfferBrandTextClass,
  SPECIAL_OFFERS_CARD_BG,
  SPECIAL_OFFERS_CARD_CORNER_MASK_BG,
  SPECIAL_OFFERS_CARD_CORNER_MASK_SIZE_PX,
  SPECIAL_OFFERS_CARD_CORNER_MASK_TRANSLATE_PERCENT,
  SPECIAL_OFFERS_CARD_HEIGHT_PX,
  SPECIAL_OFFERS_CARD_MAX_WIDTH_PX,
  SPECIAL_OFFERS_CARD_PADDING_TOP_PX,
  SPECIAL_OFFERS_CARD_SHELL_RADIUS_PX,
  SPECIAL_OFFERS_PRICE_BLOCK_LIFT_FROM_BOTTOM_PX,
} from './home-special-offers.constants';
import {
  SpecialOfferActionsStack,
  SpecialOfferWarrantyBadge,
} from './SpecialOfferCardChrome';
import { SpecialOfferCardInfo } from './SpecialOfferCardInfo';
import { SpecialOfferCardMedia } from './SpecialOfferCardMedia';
import {
  SpecialOfferCardPricing,
  SpecialOfferCartFloatingButton,
} from './SpecialOfferCardPricing';
import { SpecialOfferCardStars } from './SpecialOfferCardStars';
import type { SpecialOfferProduct } from './special-offer-product.types';
import { duplicateSingleImageForDevGalleryTest } from './special-offer-dev-gallery';
import { useSpecialOfferCard } from './useSpecialOfferCard';

export type { SpecialOfferProduct };

interface SpecialOfferCardProps {
  product: SpecialOfferProduct;
}

/**
 * Figma «Special offers» product tile — warranty pill, side actions, yellow cart.
 */
export function SpecialOfferCard({ product }: SpecialOfferCardProps) {
  const {
    t,
    currency,
    isInWishlist,
    isInCompare,
    isAddingToCart,
    showDiscountPill,
    oldPrice,
    handleWishlist,
    handleCompare,
    handleCart,
    showPlaceholder,
    onImageError,
    wishlistAria,
    compareAria,
  } = useSpecialOfferCard(product);

  const brandClass = getSpecialOfferBrandTextClass(product.brand?.name);

  const galleryImages = duplicateSingleImageForDevGalleryTest(
    product.images && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [],
  );

  const cornerTranslate = `${SPECIAL_OFFERS_CARD_CORNER_MASK_TRANSLATE_PERCENT}%`;

  return (
    <div
      className="relative z-10 mx-auto min-w-0 w-full max-w-full hover:z-30 focus-within:z-30"
      style={{ maxWidth: SPECIAL_OFFERS_CARD_MAX_WIDTH_PX }}
    >
      <article
        className="relative flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden"
        style={{
          backgroundColor: SPECIAL_OFFERS_CARD_BG,
          height: SPECIAL_OFFERS_CARD_HEIGHT_PX,
          borderRadius: SPECIAL_OFFERS_CARD_SHELL_RADIUS_PX,
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 z-0 rounded-full"
          style={{
            width: SPECIAL_OFFERS_CARD_CORNER_MASK_SIZE_PX,
            height: SPECIAL_OFFERS_CARD_CORNER_MASK_SIZE_PX,
            backgroundColor: SPECIAL_OFFERS_CARD_CORNER_MASK_BG,
            transform: `translate(${cornerTranslate}, ${cornerTranslate})`,
          }}
        />
        <div
          className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-6"
          style={{ paddingTop: SPECIAL_OFFERS_CARD_PADDING_TOP_PX }}
        >
          <SpecialOfferWarrantyBadge
            line1={t('home.special_offers.warranty_line1')}
            line2={t('home.special_offers.warranty_line2')}
          />

          <SpecialOfferCardMedia
            slug={product.slug}
            title={product.title}
            images={galleryImages}
            showPlaceholder={showPlaceholder}
            onImageError={onImageError}
          />

          <div className="flex min-h-0 w-full flex-1 flex-col">
            <SpecialOfferCardInfo product={product} brandClass={brandClass} />

            <SpecialOfferCardStars reviewCount={product.reviewCount} />

            <div
              className="mt-auto w-full min-w-0"
              style={{
                marginBottom: SPECIAL_OFFERS_PRICE_BLOCK_LIFT_FROM_BOTTOM_PX,
              }}
            >
              <SpecialOfferCardPricing
                price={product.price}
                oldPrice={oldPrice}
                currency={currency}
              />
            </div>
          </div>

          <SpecialOfferCartFloatingButton
            inStock={product.inStock}
            isAddingToCart={isAddingToCart}
            addToCartAria={t('common.ariaLabels.addToCart')}
            outOfStockAria={t('common.ariaLabels.outOfStock')}
            onAddToCart={handleCart}
          />
        </div>
      </article>

      <SpecialOfferActionsStack
        showDiscountPill={showDiscountPill}
        discountPercent={product.discountPercent}
        isInWishlist={isInWishlist}
        isInCompare={isInCompare}
        wishlistAria={wishlistAria}
        compareAria={compareAria}
        onWishlist={handleWishlist}
        onCompare={handleCompare}
      />
    </div>
  );
}
