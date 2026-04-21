'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Card } from '@shop/ui';
import { useAuth } from '../../../lib/auth/AuthContext';
import { apiClient, getApiOrErrorMessage } from '../../../lib/api-client';
import { useTranslation } from '../../../lib/i18n-client';
import { AdminSidebar } from '../components/AdminSidebar';
import type { HomeHeroBannerStorage } from '../../../lib/schemas/home-hero-banner.schema';

type HeroBannerFormState = {
  desktopImageUrl: string;
  mobileImageUrl: string;
};

function toNullableUrl(value: string): string | null {
  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
}

export default function HeroBannerPage() {
  const { t } = useTranslation();
  const { isLoggedIn, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname || '/supersudo/hero-banner';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [storage, setStorage] = useState<HomeHeroBannerStorage | null>(null);
  const [form, setForm] = useState<HeroBannerFormState>({
    desktopImageUrl: '',
    mobileImageUrl: '',
  });

  useEffect(() => {
    if (!isLoading && (!isLoggedIn || !isAdmin)) {
      router.push('/supersudo');
    }
  }, [isAdmin, isLoading, isLoggedIn, router]);

  useEffect(() => {
    if (!isLoading && isLoggedIn && isAdmin) {
      void fetchHeroBanner();
    }
  }, [isAdmin, isLoading, isLoggedIn]);

  async function fetchHeroBanner() {
    try {
      setLoading(true);
      const data = await apiClient.get<HomeHeroBannerStorage>('/api/v1/supersudo/home-hero');
      setStorage(data);
      setForm({
        desktopImageUrl: data.imageDesktopUrl ?? '',
        mobileImageUrl: data.imageMobileUrl ?? '',
      });
    } catch (error: unknown) {
      alert(t('admin.heroBanner.errorLoading').replace('{message}', getApiOrErrorMessage(error, 'Failed to load hero banner')));
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!storage) {
      return;
    }

    const payload: HomeHeroBannerStorage = {
      ...storage,
      imageDesktopUrl: toNullableUrl(form.desktopImageUrl),
      imageMobileUrl: toNullableUrl(form.mobileImageUrl),
    };

    try {
      setSaving(true);
      const saved = await apiClient.put<HomeHeroBannerStorage>('/api/v1/supersudo/home-hero', payload);
      setStorage(saved);
      setForm({
        desktopImageUrl: saved.imageDesktopUrl ?? '',
        mobileImageUrl: saved.imageMobileUrl ?? '',
      });
      alert(t('admin.heroBanner.savedSuccess'));
    } catch (error: unknown) {
      alert(t('admin.heroBanner.errorSaving').replace('{message}', getApiOrErrorMessage(error, 'Failed to save hero banner')));
    } finally {
      setSaving(false);
    }
  }

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('admin.common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <AdminSidebar currentPath={currentPath} router={router} t={t} />

          <div className="flex-1 min-w-0">
            <div className="mb-8">
              <button
                onClick={() => router.push('/supersudo')}
                className="text-gray-600 hover:text-gray-900 mb-4 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('admin.heroBanner.backToAdmin')}
              </button>
              <h1 className="text-3xl font-bold text-gray-900">{t('admin.heroBanner.title')}</h1>
              <p className="mt-2 text-gray-600">{t('admin.heroBanner.subtitle')}</p>
            </div>

            <Card className="p-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('admin.heroBanner.desktopImageUrl')}
                  </label>
                  <input
                    type="url"
                    value={form.desktopImageUrl}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        desktopImageUrl: event.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('admin.heroBanner.imageUrlPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('admin.heroBanner.mobileImageUrl')}
                  </label>
                  <input
                    type="url"
                    value={form.mobileImageUrl}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        mobileImageUrl: event.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('admin.heroBanner.imageUrlPlaceholder')}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('admin.heroBanner.previewTitle')}</h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">{t('admin.heroBanner.desktopPreview')}</p>
                  {form.desktopImageUrl.trim() ? (
                    <img
                      src={form.desktopImageUrl}
                      alt={t('admin.heroBanner.desktopPreview')}
                      className="w-full h-52 object-cover rounded-lg border border-gray-200"
                    />
                  ) : (
                    <div className="w-full h-52 rounded-lg border border-dashed border-gray-300 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                      {t('admin.heroBanner.noImageSelected')}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">{t('admin.heroBanner.mobilePreview')}</p>
                  {form.mobileImageUrl.trim() ? (
                    <img
                      src={form.mobileImageUrl}
                      alt={t('admin.heroBanner.mobilePreview')}
                      className="w-full h-52 object-cover rounded-lg border border-gray-200"
                    />
                  ) : (
                    <div className="w-full h-52 rounded-lg border border-dashed border-gray-300 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                      {t('admin.heroBanner.noImageSelected')}
                    </div>
                  )}
                </div>
              </div>
            </Card>

            <div className="flex gap-4">
              <Button variant="primary" onClick={handleSave} disabled={saving}>
                {saving ? t('admin.heroBanner.saving') : t('admin.heroBanner.save')}
              </Button>
              <Button variant="ghost" onClick={() => router.push('/supersudo')} disabled={saving}>
                {t('admin.heroBanner.cancel')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
