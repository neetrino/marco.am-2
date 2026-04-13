'use client';

import type { MouseEvent } from 'react';
import { Heart } from 'lucide-react';

import { CompareIcon } from '../icons/CompareIcon';
import {
  SPECIAL_OFFERS_ACTIONS_STACK_OUTSET_RIGHT_PX,
  SPECIAL_OFFERS_ACTIONS_STACK_OUTSET_TOP_PX,
  SPECIAL_OFFERS_ACTIONS_STACK_RIGHT_FROM_CARD_OUTER_PX,
  SPECIAL_OFFERS_ACTIONS_STACK_SHIFT_LEFT_PX,
  SPECIAL_OFFERS_ACTIONS_STACK_TOP_FROM_CARD_OUTER_PX,
  SPECIAL_OFFERS_WARRANTY_BADGE_ACCENT,
  SPECIAL_OFFERS_WARRANTY_BADGE_BG,
  SPECIAL_OFFERS_WARRANTY_BADGE_MIN_HEIGHT_PX,
  SPECIAL_OFFERS_WARRANTY_BADGE_MIN_WIDTH_PX,
  SPECIAL_OFFERS_WARRANTY_BADGE_RADIUS_PX,
} from './home-special-offers.constants';

interface SpecialOfferWarrantyBadgeProps {
  line1: string;
  line2: string;
}

export function SpecialOfferWarrantyBadge({
  line1,
  line2,
}: SpecialOfferWarrantyBadgeProps) {
  return (
    <div
      className="absolute left-3 top-3 z-30 flex flex-col items-center justify-center px-2 py-1 text-center font-bold not-italic"
      style={{
        minWidth: SPECIAL_OFFERS_WARRANTY_BADGE_MIN_WIDTH_PX,
        minHeight: SPECIAL_OFFERS_WARRANTY_BADGE_MIN_HEIGHT_PX,
        borderRadius: SPECIAL_OFFERS_WARRANTY_BADGE_RADIUS_PX,
        backgroundColor: SPECIAL_OFFERS_WARRANTY_BADGE_BG,
      }}
    >
      <span
        className="whitespace-nowrap text-[14px] leading-[15px]"
        style={{ color: SPECIAL_OFFERS_WARRANTY_BADGE_ACCENT }}
      >
        {line1}
      </span>
      <span className="text-[11px] leading-[15px] text-white">{line2}</span>
    </div>
  );
}

interface SpecialOfferActionsStackProps {
  showDiscountPill: boolean;
  discountPercent: number | null | undefined;
  isInWishlist: boolean;
  isInCompare: boolean;
  wishlistAria: string;
  compareAria: string;
  onWishlist: (e: MouseEvent) => void;
  onCompare: (e: MouseEvent) => void;
}

export function SpecialOfferActionsStack({
  showDiscountPill,
  discountPercent,
  isInWishlist,
  isInCompare,
  wishlistAria,
  compareAria,
  onWishlist,
  onCompare,
}: SpecialOfferActionsStackProps) {
  return (
    <div
      className="absolute z-40 flex flex-col items-end gap-2"
      style={{
        top:
          SPECIAL_OFFERS_ACTIONS_STACK_TOP_FROM_CARD_OUTER_PX -
          SPECIAL_OFFERS_ACTIONS_STACK_OUTSET_TOP_PX,
        right:
          SPECIAL_OFFERS_ACTIONS_STACK_RIGHT_FROM_CARD_OUTER_PX -
          SPECIAL_OFFERS_ACTIONS_STACK_OUTSET_RIGHT_PX +
          SPECIAL_OFFERS_ACTIONS_STACK_SHIFT_LEFT_PX,
      }}
    >
      <button
        type="button"
        onClick={onWishlist}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-marco-black text-white shadow-sm transition-colors hover:bg-marco-text"
        aria-label={wishlistAria}
      >
        <Heart
          className={`h-4 w-4 ${
            isInWishlist
              ? 'fill-red-500 text-red-500'
              : 'fill-none text-white'
          }`}
          strokeWidth={2}
        />
      </button>
      <button
        type="button"
        onClick={onCompare}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-marco-black text-white shadow-sm transition-colors hover:bg-marco-text"
        aria-label={compareAria}
      >
        <CompareIcon isActive={isInCompare} size={16} className="!text-white" />
      </button>
      {showDiscountPill ? (
        <div className="rounded-full bg-marco-yellow px-2 py-1 text-[10px] font-bold text-white">
          -{discountPercent}%
        </div>
      ) : null}
    </div>
  );
}
