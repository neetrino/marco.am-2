'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';

import { useTranslation } from '../lib/i18n-client';
import {
  FOOTER_HEADING_TEXT_CLASS,
  FOOTER_MUTED_TEXT_CLASS,
  FOOTER_NAV_COLUMN_HEADING_LEADING_CLASS,
  FOOTER_NAV_COLUMN_HEADING_LIST_GAP_CLASS,
  FOOTER_NAV_COLUMN_HEADING_TRACK_CLASS,
  FOOTER_NAV_COLUMN_LINK_LEADING_CLASS,
  FOOTER_NAV_COLUMN_LINK_WORD_SPACING_CLASS,
  FOOTER_NAV_COLUMN_LIST_ITEM_GAP_CLASS,
  NEETRINO_STUDIO_HREF,
} from './footer.constants';
import {
  FOOTER_CONTACT_MAIL_ICON_CLASS,
  FOOTER_CONTACT_MAIL_ICON_SRC,
  FOOTER_CONTACT_PHONE_ICON_CLASS,
  FOOTER_CONTACT_PHONE_ICON_SRC,
} from './footer-social.constants';

const FOOTER_LINK_CLASS = `${FOOTER_MUTED_TEXT_CLASS} text-xs transition-colors hover:text-marco-black`;
const FOOTER_NAV_COLUMN_LINK_CLASS = `${FOOTER_LINK_CLASS} ${FOOTER_NAV_COLUMN_LINK_WORD_SPACING_CLASS} ${FOOTER_NAV_COLUMN_LINK_LEADING_CLASS}`;

export type FooterNavItem = { readonly href: string; readonly label: string };

export function FooterNavColumn({
  title,
  items,
}: {
  title: string;
  items: readonly FooterNavItem[];
}) {
  return (
    <div
      className={`inline-flex max-w-full flex-col ${FOOTER_NAV_COLUMN_HEADING_LIST_GAP_CLASS}`}
    >
      <p
        className={`text-xs font-bold uppercase ${FOOTER_NAV_COLUMN_HEADING_LEADING_CLASS} ${FOOTER_NAV_COLUMN_HEADING_TRACK_CLASS} ${FOOTER_HEADING_TEXT_CLASS}`}
      >
        {title}
      </p>
      <ul className={`flex flex-col ${FOOTER_NAV_COLUMN_LIST_ITEM_GAP_CLASS}`}>
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link href={item.href} className={FOOTER_NAV_COLUMN_LINK_CLASS}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function buildTelHref(phoneTel: string): string {
  const digits = phoneTel.replace(/\s/g, '');
  return `tel:${digits}`;
}

export function FooterContactsBlock({
  heading,
  address,
  phoneDisplay,
  phoneTel,
  email,
}: {
  heading: string;
  address: string;
  phoneDisplay: string;
  phoneTel: string;
  email: string;
}) {
  const telHref = buildTelHref(phoneTel);

  return (
    <div className="inline-flex max-w-full flex-col gap-4">
      <p
        className={`text-xs font-bold uppercase tracking-[0.05em] ${FOOTER_HEADING_TEXT_CLASS}`}
      >
        {heading}
      </p>
      <div className="flex items-start gap-3">
        <MapPin
          className="mt-0 h-4 w-4 shrink-0 -translate-x-px translate-y-[4px] self-start text-marco-yellow"
          strokeWidth={2}
          aria-hidden
        />
        <p
          className={`text-xs leading-relaxed whitespace-pre-line ${FOOTER_MUTED_TEXT_CLASS}`}
        >
          {address}
        </p>
      </div>
      <div className="flex items-start gap-3">
        <img
          src={FOOTER_CONTACT_PHONE_ICON_SRC}
          alt=""
          width={18}
          height={15}
          className={FOOTER_CONTACT_PHONE_ICON_CLASS}
          aria-hidden
        />
        <a
          href={telHref}
          className="text-xs font-bold text-marco-black transition-colors hover:underline"
        >
          {phoneDisplay}
        </a>
      </div>
      <div className="flex items-start gap-3">
        <img
          src={FOOTER_CONTACT_MAIL_ICON_SRC}
          alt=""
          width={20}
          height={14}
          className={FOOTER_CONTACT_MAIL_ICON_CLASS}
          aria-hidden
        />
        <a
          href={`mailto:${email}`}
          className={`text-xs transition-colors hover:text-marco-black ${FOOTER_MUTED_TEXT_CLASS}`}
        >
          {email}
        </a>
      </div>
    </div>
  );
}

export function FooterCopyright() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <p className="inline-block text-center text-[9px] leading-tight text-marco-black sm:text-[10px] md:text-[11px] lg:text-xs whitespace-nowrap">
      <span>
        {t('common.footer.marco.copyrightBefore').replace('{year}', String(year))}
      </span>
      <a
        href={NEETRINO_STUDIO_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-marco-black no-underline hover:opacity-80"
      >
        {t('common.footer.marco.creditStudio')}
      </a>
      <span>{t('common.footer.marco.copyrightAfter')}</span>
    </p>
  );
}
