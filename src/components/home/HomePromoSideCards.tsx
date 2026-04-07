'use client';

import { HomePromoPromoCardOne } from './HomePromoPromoCardOne';
import { HomePromoPromoCardTwo } from './HomePromoPromoCardTwo';

type HomePromoSideCardsProps = {
  cardOnePill: string;
  cardTwoCta: string;
  discountLabel: string;
};

export function HomePromoSideCards({
  cardOnePill,
  cardTwoCta,
  discountLabel,
}: HomePromoSideCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <HomePromoPromoCardOne pillLabel={cardOnePill} />
      <HomePromoPromoCardTwo discountLabel={discountLabel} ctaLabel={cardTwoCta} />
    </div>
  );
}
