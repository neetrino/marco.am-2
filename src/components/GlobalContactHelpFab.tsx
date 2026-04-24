'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useTranslation } from '../lib/i18n-client';

const HELP_MESSAGE_ICON_SRC = '/assets/hero/hero-help-message-icon.svg';

/**
 * Fixed contact CTA (pill + chat icon) — viewport bottom-right on all pages, md+.
 */
export function GlobalContactHelpFab() {
  const { t } = useTranslation();

  return (
    <div
      className="fixed bottom-[38px] right-[28px] z-[60] hidden items-center gap-2.5 md:flex lg:bottom-[42px] lg:right-[32px] lg:gap-3"
      data-theme-static="true"
    >
      <div className="rounded-[68px] bg-white px-4 py-2 shadow-[0px_4px_24px_0px_rgba(150,150,150,0.28)] lg:px-5 lg:py-2.5">
        <p className="font-bold text-[13px] leading-5 text-[#181111] whitespace-nowrap lg:text-[14px]">
          {t('home.hero_help_cta')}
        </p>
      </div>
      <Link
        href="/contact"
        className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#FACC15] transition-transform hover:-translate-y-0.5 lg:h-[64px] lg:w-[64px]"
        aria-label={t('home.chat_fab_aria')}
      >
        <Image
          src={HELP_MESSAGE_ICON_SRC}
          alt=""
          width={30}
          height={30}
          className="h-[30px] w-[30px] object-contain lg:h-[32px] lg:w-[32px]"
          aria-hidden
        />
      </Link>
    </div>
  );
}
