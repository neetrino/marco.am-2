'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import {
  HERO_PROMO_CHAIR_IMAGE_SRC,
  HERO_PROMO_STACK_LAYER_BLUE,
  HERO_PROMO_STACK_LAYER_GRAY,
  HERO_PROMO_STACK_LAYER_WHITE,
} from '../hero.constants';
import {
  HERO_PROMO_CHAIR_HEIGHT_RATIO,
  HERO_PROMO_CHAIR_WIDTH_RATIO,
  HERO_PROMO_STACK_BLUE_STYLE,
  HERO_PROMO_STACK_CONTAINER_ASPECT_H,
  HERO_PROMO_STACK_CONTAINER_ASPECT_W,
  HERO_PROMO_STACK_GRAY_STYLE,
  HERO_PROMO_STACK_RADIUS_PX,
  HERO_PROMO_STACK_WHITE_STYLE,
} from './hero-promo-stack.constants';

type HomePromoStackedProductCardProps = {
  ariaLabel: string;
};

type StackLayerProps = {
  color: string;
  layerStyle: Pick<CSSProperties, 'top' | 'height'>;
  zIndex: number;
};

function StackLayer({ color, layerStyle, zIndex }: StackLayerProps) {
  const style: CSSProperties = {
    ...layerStyle,
    backgroundColor: color,
    borderRadius: HERO_PROMO_STACK_RADIUS_PX,
    zIndex,
  };
  return <div className="absolute left-0 right-0 overflow-hidden" style={style} />;
}

/** Figma 101:4019–101:4023 — stacked rectangles + chair */
export function HomePromoStackedProductCard({ ariaLabel }: HomePromoStackedProductCardProps) {
  const aspectStyle: CSSProperties = {
    aspectRatio: `${HERO_PROMO_STACK_CONTAINER_ASPECT_W} / ${HERO_PROMO_STACK_CONTAINER_ASPECT_H}`,
  };

  const chairWrapStyle: CSSProperties = {
    width: `${HERO_PROMO_CHAIR_WIDTH_RATIO * 100}%`,
    height: `${HERO_PROMO_CHAIR_HEIGHT_RATIO * 100}%`,
  };

  return (
    <Link
      href="/products"
      aria-label={ariaLabel}
      className="relative block w-[min(46vw,220px)] sm:w-[260px] md:w-[300px] lg:w-[340px]"
    >
      <div className="relative w-full overflow-visible" style={aspectStyle}>
        <StackLayer color={HERO_PROMO_STACK_LAYER_WHITE} layerStyle={HERO_PROMO_STACK_WHITE_STYLE} zIndex={0} />
        <StackLayer color={HERO_PROMO_STACK_LAYER_GRAY} layerStyle={HERO_PROMO_STACK_GRAY_STYLE} zIndex={1} />
        <StackLayer color={HERO_PROMO_STACK_LAYER_BLUE} layerStyle={HERO_PROMO_STACK_BLUE_STYLE} zIndex={2} />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-[3] -translate-x-1/2"
          style={chairWrapStyle}
        >
          <div className="relative h-full w-full">
            <Image
              src={HERO_PROMO_CHAIR_IMAGE_SRC}
              alt=""
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 640px) 46vw, 340px"
              priority
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
