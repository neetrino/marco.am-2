'use client';

import { Button } from '@shop/ui';
import { useRouter } from 'next/navigation';
import { useTranslation } from '../../../../lib/i18n-client';

export function QuickInfoCard() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-marco-gray">
          <svg className="h-4 w-4 text-marco-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900">{t('admin.quickSettings.usefulInformation')}</h3>
          <p className="text-xs text-gray-500">{t('admin.quickSettings.aboutDiscounts')}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 text-marco-black">•</span>
          <p>{t('admin.quickSettings.discountApplies')}</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="mt-0.5 text-marco-black">•</span>
          <p>{t('admin.quickSettings.discountExample')}</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="mt-0.5 text-marco-black">•</span>
          <p>{t('admin.quickSettings.noDiscount')}</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="mt-0.5 text-marco-black">•</span>
          <p>{t('admin.quickSettings.changesApplied')}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/supersudo/settings')}
          className="w-full"
        >
          {t('admin.quickSettings.moreSettings')}
        </Button>
      </div>
    </div>
  );
}

