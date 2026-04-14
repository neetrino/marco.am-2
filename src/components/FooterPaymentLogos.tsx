'use client';

import Image from 'next/image';

import { useTranslation } from '../lib/i18n-client';
import {
  FOOTER_PAYMENT_STRIP_HEIGHT_PX,
  FOOTER_PAYMENT_STRIP_SRC,
  FOOTER_PAYMENT_STRIP_WIDTH_PX,
} from './footer-payment-logos.constants';

/**
 * Payment marks — single raster from Figma (Visa, Mastercard, ArCa, Idram).
 */
export function FooterPaymentLogos() {
  const { t } = useTranslation();

  return (
    <div
      className="flex w-full max-w-44 justify-end sm:max-w-48"
      aria-label={t('common.footer.paymentMethods')}
    >
      <Image
        src={FOOTER_PAYMENT_STRIP_SRC}
        alt=""
        width={FOOTER_PAYMENT_STRIP_WIDTH_PX}
        height={FOOTER_PAYMENT_STRIP_HEIGHT_PX}
        className="h-auto w-full max-h-5 object-contain object-right sm:max-h-6"
        sizes="(max-width: 640px) 100vw, 192px"
      />
    </div>
  );
}
