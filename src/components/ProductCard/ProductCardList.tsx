'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { MouseEvent } from 'react';
import { Heart } from 'lucide-react';
import { formatPrice } from '../../lib/currency';
import { useTranslation } from '../../lib/i18n-client';
import { CompareIcon } from '../icons/CompareIcon';
import { CartIcon } from '../icons/CartIcon';
import { ProductColors } from './ProductColors';
import type { CurrencyCode } from '../../lib/currency';
import type { ProductLabel } from '../ProductLabels';
import { SPECIAL_OFFERS_UNIFIED_NATURE_IMAGE_SRC } from '../home/home-special-offers.constants';

interface ProductCardListProps {
  product: {
    id: string;
    slug: string;
    title: string;
    price: number;
    image: string | null;
    inStock: boolean;
    brand: { id: string; name: string } | null;
    labels?: ProductLabel[];
    compareAtPrice?: number | null;
    originalPrice?: number | null;
    discountPercent?: number | null;
    colors?: Array<{ value: string; imageUrl?: string | null; colors?: string[] | null }>;
  };
  currency: CurrencyCode;
  isInWishlist: boolean;
  isInCompare: boolean;
  isAddingToCart: boolean;
  imageError: boolean;
  onImageError: () => void;
  onWishlistToggle: (e: MouseEvent) => void;
  onCompareToggle: (e: MouseEvent) => void;
  onAddToCart: (e: MouseEvent) => void;
}

/**
 * List view layout for ProductCard
 */
export function ProductCardList({
  product,
  currency,
  isInWishlist,
  isInCompare,
  isAddingToCart,
  imageError,
  onImageError,
  onWishlistToggle,
  onCompareToggle,
  onAddToCart,
}: ProductCardListProps) {
  const { t } = useTranslation();
  const displayImageSrc = SPECIAL_OFFERS_UNIFIED_NATURE_IMAGE_SRC;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:bg-gray-50 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-4 sm:px-6 py-4">
        {/* Product Image */}
        <Link
          href={`/products/${product.slug}`}
          className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden self-start sm:self-center"
        >
          {!imageError ? (
            <Image
              src={displayImageSrc}
              alt={product.title}
              fill
              className="object-cover object-center"
              sizes="80px"
              unoptimized
              onError={onImageError}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </Link>

        {/* Product Info */}
        <div className="flex-1 min-w-0 w-full sm:w-auto">
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
              {product.title}
            </h3>
            <p className="text-base sm:text-lg text-gray-500 mt-1">
              {product.brand?.name || t('common.defaults.category')}
            </p>
          </Link>
          {/* Available Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <ProductColors colors={product.colors} maxVisible={6} />
            </div>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          {/* Price */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-lg sm:text-xl font-semibold text-marco-black">
                {formatPrice(product.price || 0, currency)}
              </span>
              {product.discountPercent && product.discountPercent > 0 ? (
                <span className="text-xs sm:text-sm font-semibold text-marco-black">
                  -{product.discountPercent}%
                </span>
              ) : null}
            </div>
            {(product.originalPrice && product.originalPrice > product.price) || 
             (product.compareAtPrice && product.compareAtPrice > product.price) ? (
              <span className="text-base sm:text-lg text-gray-500 line-through mt-0.5">
                {formatPrice(
                  (product.originalPrice && product.originalPrice > product.price) 
                    ? product.originalPrice 
                    : (product.compareAtPrice || 0), 
                  currency
                )}
              </span>
            ) : null}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 md:gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={onWishlistToggle}
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-sm transition-opacity hover:opacity-90 md:size-10"
              title={isInWishlist ? t('common.messages.removedFromWishlist') : t('common.messages.addedToWishlist')}
              aria-label={isInWishlist ? t('common.ariaLabels.removeFromWishlist') : t('common.ariaLabels.addToWishlist')}
            >
              <Heart
                className={`h-4 w-4 ${
                  isInWishlist ? 'fill-red-500 text-red-500' : 'fill-none text-white'
                }`}
                strokeWidth={2}
              />
            </button>

            <button
              type="button"
              onClick={onCompareToggle}
              className={`flex size-9 shrink-0 items-center justify-center overflow-visible rounded-full p-0 shadow-sm transition-opacity hover:opacity-90 md:size-10 ${
                isInCompare ? 'ring-2 ring-marco-yellow/60 ring-offset-2 ring-offset-[#f6f6f6]' : ''
              }`}
              title={isInCompare ? t('common.messages.removedFromCompare') : t('common.messages.addedToCompare')}
              aria-label={isInCompare ? t('common.ariaLabels.removeFromCompare') : t('common.ariaLabels.addToCompare')}
            >
              <CompareIcon
                isActive={isInCompare}
                size={18}
                className={isInCompare ? 'text-marco-yellow' : '!text-white'}
              />
            </button>

            <button
              type="button"
              onClick={onAddToCart}
              disabled={!product.inStock || isAddingToCart}
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#ffca03] p-0 text-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#181111] disabled:cursor-not-allowed disabled:opacity-50 md:size-10"
              title={product.inStock ? t('common.buttons.addToCart') : t('common.stock.outOfStock')}
              aria-label={product.inStock ? t('common.buttons.addToCart') : t('common.stock.outOfStock')}
            >
              {isAddingToCart ? (
                <svg className="h-6 w-6 animate-spin text-[#181111]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <CartIcon size={18} className="h-[18px] w-[18px] text-[#181111] md:h-[20px] md:w-[20px]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
