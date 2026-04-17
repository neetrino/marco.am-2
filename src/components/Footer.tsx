'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useTranslation } from '../lib/i18n-client';
import type { SiteFooterPublicPayload } from '../lib/services/site-footer.service';
import {
  FooterContactsBlock,
  FooterCopyright,
  FooterNavColumn,
} from './footer-marco-blocks';
import {
  FOOTER_BRAND_COLUMN_GAP_CLASS,
  FOOTER_BRAND_DESCRIPTION_OVERLAP_CLASS,
  FOOTER_BRAND_DESCRIPTION_TEXT_CLASS,
  FOOTER_BRAND_LOGO_BOX_CLASS,
  FOOTER_BRAND_LOGO_SHIFT_CLASS,
  FOOTER_COPYRIGHT_STRIP_MARGIN_TOP_CLASS,
  FOOTER_COPYRIGHT_STRIP_PADDING_TOP_CLASS,
  FOOTER_COPYRIGHT_STRIP_STACK_GAP_CLASS,
  FOOTER_MAIN_GRID_CLASS,
  FOOTER_MUTED_TEXT_CLASS,
  FOOTER_INNER_CONTAINER_CLASS,
  FOOTER_SURFACE_CLASS,
  FOOTER_GRID_COMPANY_SUPPORT_WRAPPER_CLASS,
  FOOTER_GRID_CONTACTS_WRAPPER_CLASS,
} from './footer.constants';
import { FooterLegalLinks } from './FooterLegalLinks';
import { FooterMapEmbed } from './FooterMapEmbed';
import { FooterPaymentLogos } from './FooterPaymentLogos';
import {
  FooterSocialLinks,
  type FooterSocialApiLink,
} from './FooterSocialLinks';

function toApiSocialLinks(
  payload: SiteFooterPublicPayload,
): readonly FooterSocialApiLink[] | undefined {
  if (payload.socialLinks.length === 0) {
    return undefined;
  }
  return payload.socialLinks.map((s) => ({
    platform: s.platform,
    href: s.href,
  }));
}

export type FooterProps = {
  initialFooter: SiteFooterPublicPayload;
};

/**
 * Site-wide footer — MARCO marketing layout; nav/contact/social/map/legal from CMS (`GET /api/v1/home/footer`).
 */
export function Footer({ initialFooter }: FooterProps) {
  const { t, lang } = useTranslation();
  const [data, setData] = useState<SiteFooterPublicPayload>(initialFooter);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch(
          `/api/v1/home/footer?locale=${encodeURIComponent(lang)}`,
        );
        if (!res.ok) {
          return;
        }
        const json = (await res.json()) as SiteFooterPublicPayload;
        if (!cancelled) {
          setData(json);
        }
      } catch {
        // Keep SSR payload
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const companyItems = data.companyLinks.map((l) => ({
    href: l.href,
    label: l.label,
  }));
  const supportItems = data.supportLinks.map((l) => ({
    href: l.href,
    label: l.label,
  }));
  const legalItems = data.legalLinks.map((l) => ({
    id: l.id,
    label: l.label,
    href: l.href,
  }));
  const apiSocial = toApiSocialLinks(data);

  return (
    <footer className={`${FOOTER_SURFACE_CLASS} border-t border-black/5`}>
      <div className={`${FOOTER_INNER_CONTAINER_CLASS} pb-10 pt-8`}>
        <div className={FOOTER_MAIN_GRID_CLASS}>
          <div
            className={`relative flex max-w-sm flex-col ${FOOTER_BRAND_COLUMN_GAP_CLASS}`}
          >
            <div className={`${FOOTER_BRAND_LOGO_BOX_CLASS} ${FOOTER_BRAND_LOGO_SHIFT_CLASS}`}>
              <Image
                src="/assets/brand/marco-group-logo.png"
                alt="MARCO GROUP"
                fill
                className="object-contain object-left-top"
                sizes="200px"
                priority={false}
              />
            </div>
            <p
              className={`${FOOTER_BRAND_DESCRIPTION_OVERLAP_CLASS} ${FOOTER_BRAND_DESCRIPTION_TEXT_CLASS} ${FOOTER_SURFACE_CLASS} ${FOOTER_MUTED_TEXT_CLASS}`}
            >
              {t('common.footer.marco.brandDescription')}
            </p>
          </div>

          <div className={FOOTER_GRID_COMPANY_SUPPORT_WRAPPER_CLASS}>
            <FooterNavColumn title={data.companyColumnTitle} items={companyItems} />
          </div>
          <div className={FOOTER_GRID_COMPANY_SUPPORT_WRAPPER_CLASS}>
            <FooterNavColumn title={data.supportColumnTitle} items={supportItems} />
          </div>
          <div className={FOOTER_GRID_CONTACTS_WRAPPER_CLASS}>
            <FooterContactsBlock
              heading={data.contactsColumnTitle}
              address={data.contact.address}
              phoneDisplay={data.contact.phoneDisplay}
              phoneTel={data.contact.phoneTel}
              email={data.contact.email}
            />
          </div>
        </div>

        {data.mapEmbed.enabled && data.mapEmbed.iframeSrc !== null ? (
          <FooterMapEmbed
            iframeSrc={data.mapEmbed.iframeSrc}
            title={t('common.footer.contactInfo')}
          />
        ) : null}

        <FooterLegalLinks
          items={legalItems}
          ariaLabel={t('common.footer.legal')}
        />

        <div
          className={`${FOOTER_COPYRIGHT_STRIP_MARGIN_TOP_CLASS} flex flex-col ${FOOTER_COPYRIGHT_STRIP_STACK_GAP_CLASS} border-t border-black/10 ${FOOTER_COPYRIGHT_STRIP_PADDING_TOP_CLASS} lg:flex-row lg:items-center lg:justify-between lg:gap-3 xl:gap-5`}
        >
          <div className="flex shrink-0 justify-center lg:justify-start">
            <FooterSocialLinks density="compact" apiLinks={apiSocial} />
          </div>
          <div className="scrollbar-hide flex min-w-0 flex-1 justify-center overflow-x-auto px-1 lg:overflow-visible">
            <FooterCopyright />
          </div>
          <div className="flex shrink-0 justify-center lg:justify-end">
            <FooterPaymentLogos compact />
          </div>
        </div>
      </div>
    </footer>
  );
}
