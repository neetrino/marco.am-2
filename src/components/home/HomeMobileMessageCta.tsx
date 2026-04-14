'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useTranslation } from '../../lib/i18n-client';
import {
  HOME_MOBILE_MESSAGE_CTA_GLOW_ASSET_PX,
  HOME_MOBILE_MESSAGE_CTA_GLOW_INSET_PERCENT,
  HOME_MOBILE_MESSAGE_CTA_GLOW_SRC,
  HOME_MOBILE_MESSAGE_CTA_HREF,
  HOME_MOBILE_MESSAGE_CTA_ICON_PX,
  HOME_MOBILE_MESSAGE_CTA_ICON_SRC,
  HOME_MOBILE_MESSAGE_CTA_OUTER_PX,
} from './home-mobile-message-cta.constants';

const SECTION_CONTAINER_CLASS =
  'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

const LINK_FOCUS_CLASS =
  'rounded-full -translate-x-[4px] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marco-black';

/**
 * Mobile-only: yellow glowing circle + message icon (Figma 314:2498 / 314:2499), before special offers.
 */
export function HomeMobileMessageCta() {
  const { t } = useTranslation();

  return (
    <section className="relative z-0 md:hidden -translate-y-[15px] bg-white pb-4 pt-2">
      <div className={SECTION_CONTAINER_CLASS}>
        <div className="flex justify-end">
          <Link
            href={HOME_MOBILE_MESSAGE_CTA_HREF}
            className={LINK_FOCUS_CLASS}
            aria-label={t('home.promo_chat_aria')}
          >
            <span
              className="relative block shrink-0 overflow-visible"
              style={{
                width: HOME_MOBILE_MESSAGE_CTA_OUTER_PX,
                height: HOME_MOBILE_MESSAGE_CTA_OUTER_PX,
              }}
            >
              <span
                className="pointer-events-none absolute z-0"
                style={{
                  inset: `-${HOME_MOBILE_MESSAGE_CTA_GLOW_INSET_PERCENT}%`,
                }}
              >
                <Image
                  src={HOME_MOBILE_MESSAGE_CTA_GLOW_SRC}
                  alt=""
                  width={HOME_MOBILE_MESSAGE_CTA_GLOW_ASSET_PX}
                  height={HOME_MOBILE_MESSAGE_CTA_GLOW_ASSET_PX}
                  className="h-full w-full max-w-none object-contain"
                  unoptimized
                />
              </span>
              <span className="absolute inset-0 z-10 flex items-center justify-center">
                <Image
                  src={HOME_MOBILE_MESSAGE_CTA_ICON_SRC}
                  alt=""
                  width={HOME_MOBILE_MESSAGE_CTA_ICON_PX}
                  height={HOME_MOBILE_MESSAGE_CTA_ICON_PX}
                  style={{
                    width: HOME_MOBILE_MESSAGE_CTA_ICON_PX,
                    height: HOME_MOBILE_MESSAGE_CTA_ICON_PX,
                  }}
                  unoptimized
                />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
