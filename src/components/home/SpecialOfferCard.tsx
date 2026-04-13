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
} from './home-special-offers.constants';
import { SpecialOfferActionsStack } from './SpecialOfferCardChrome';
import { SpecialOfferCardInfo } from './SpecialOfferCardInfo';
import { SpecialOfferCardMedia } from './SpecialOfferCardMedia';
import {
  SpecialOfferCardPricing,
  SpecialOfferCartFloatingButton,
} from './SpecialOfferCardPricing';
import { SpecialOfferCardStars } from './SpecialOfferCardStars';
import type { SpecialOfferProduct } from './special-offer-product.types';
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

  const cornerTranslate = `${SPECIAL_OFFERS_CARD_CORNER_MASK_TRANSLATE_PERCENT}%`;

  return (
    <article
      className="relative isolate flex min-w-0 max-w-full flex-col overflow-hidden rounded-[32px]"
      style={{
        backgroundColor: SPECIAL_OFFERS_CARD_BG,
        height: SPECIAL_OFFERS_CARD_HEIGHT_PX,
        maxWidth: SPECIAL_OFFERS_CARD_MAX_WIDTH_PX,
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

        <SpecialOfferCardMedia
          slug={product.slug}
          title={product.title}
          image={product.image}
          showPlaceholder={showPlaceholder}
          onImageError={onImageError}
        />

        <SpecialOfferCardInfo product={product} brandClass={brandClass} />

        <SpecialOfferCardStars />

        <SpecialOfferCardPricing
          price={product.price}
          oldPrice={oldPrice}
          currency={currency}
        />

        <SpecialOfferCartFloatingButton
          inStock={product.inStock}
          isAddingToCart={isAddingToCart}
          addToCartAria={t('common.ariaLabels.addToCart')}
          outOfStockAria={t('common.ariaLabels.outOfStock')}
          onAddToCart={handleCart}
        />
      </div>
    </article>
  );
}
