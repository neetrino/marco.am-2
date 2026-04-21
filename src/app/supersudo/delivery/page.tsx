'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../../lib/auth/AuthContext';
import { Card, Button } from '@shop/ui';
import { apiClient, getApiOrErrorMessage } from '../../../lib/api-client';
import { useTranslation } from '../../../lib/i18n-client';
import { AdminPageLayout } from '../components/AdminPageLayout';
import { logger } from "@/lib/utils/logger";

interface DeliveryLocation {
  id?: string;
  country: string;
  city: string;
  price: number;
}

interface DeliverySettings {
  locations: DeliveryLocation[];
}

export default function DeliveryPage() {
  const { t } = useTranslation();
  const { isLoggedIn, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<DeliveryLocation[]>([]);
  const [_editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn || !isAdmin) {
        router.push('/supersudo');
        return;
      }
    }
  }, [isLoggedIn, isAdmin, isLoading, router]);

  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      fetchDeliverySettings();
    }
  }, [isLoggedIn, isAdmin]);

  const fetchDeliverySettings = async () => {
    try {
      setLoading(true);
      logger.devLog('🚚 [ADMIN] Fetching delivery settings...');
      const data = await apiClient.get<DeliverySettings>('/api/v1/supersudo/delivery');
      setLocations(data.locations || []);
      logger.devLog('✅ [ADMIN] Delivery settings loaded:', data);
    } catch (err: unknown) {
      logger.error('Admin delivery settings fetch failed', { error: err });
      // Use defaults if error
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      logger.devLog('🚚 [ADMIN] Saving delivery settings...', { locations });
      await apiClient.put('/api/v1/supersudo/delivery', { locations });
      alert(t('admin.delivery.savedSuccess'));
      logger.devLog('✅ [ADMIN] Delivery settings saved');
      setEditingId(null);
      await fetchDeliverySettings();
    } catch (err: unknown) {
      logger.error('Admin delivery settings save failed', { error: err });
      const errorMessage = getApiOrErrorMessage(err, 'Failed to save delivery settings');
      alert(t('admin.delivery.errorSaving').replace('{message}', errorMessage));
    } finally {
      setSaving(false);
    }
  };

  const handleAddLocation = () => {
    setLocations([...locations, { country: '', city: '', price: 1000 }]);
    setEditingId(`new-${Date.now()}`);
  };

  const handleUpdateLocation = (index: number, field: keyof DeliveryLocation, value: string | number) => {
    const updated = [...locations];
    updated[index] = { ...updated[index], [field]: value };
    setLocations(updated);
  };

  const handleDeleteLocation = (index: number) => {
    if (confirm(t('admin.delivery.deleteLocation'))) {
      const updated = locations.filter((_, i) => i !== index);
      setLocations(updated);
    }
  };

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

  const currentPath = pathname || '/supersudo/delivery';

  return (
    <AdminPageLayout
      currentPath={currentPath}
      router={router}
      t={t}
      title={t('admin.delivery.title')}
      backLabel={t('admin.delivery.backToAdmin')}
      onBack={() => router.push('/supersudo')}
    >
            <Card className="admin-card mb-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{t('admin.delivery.deliveryPricesByLocation')}</h2>
                <Button
                  variant="primary"
                  onClick={handleAddLocation}
                  disabled={saving}
                >
                  {t('admin.delivery.addLocation')}
                </Button>
              </div>
              
              {locations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>{t('admin.delivery.noLocations')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {locations.map((location, index) => (
                    <div key={index} className="rounded-lg border border-gray-200 p-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('admin.delivery.country')}
                          </label>
                          <input
                            type="text"
                            value={location.country}
                            onChange={(e) => handleUpdateLocation(index, 'country', e.target.value)}
                            className="admin-field"
                            placeholder={t('admin.delivery.countryPlaceholder')}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('admin.delivery.city')}
                          </label>
                          <input
                            type="text"
                            value={location.city}
                            onChange={(e) => handleUpdateLocation(index, 'city', e.target.value)}
                            className="admin-field"
                            placeholder={t('admin.delivery.cityPlaceholder')}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('admin.delivery.price')}
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={location.price}
                              onChange={(e) => handleUpdateLocation(index, 'price', parseFloat(e.target.value) || 0)}
                            className="admin-field flex-1"
                            placeholder={t('admin.delivery.pricePlaceholder')}
                            min="0"
                            step="100"
                          />
                            <button
                              onClick={() => handleDeleteLocation(index)}
                              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                              disabled={saving}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={saving || locations.length === 0}
              >
                {saving ? t('admin.delivery.saving') : t('admin.delivery.saveSettings')}
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push('/supersudo')}
                disabled={saving}
              >
                {t('admin.delivery.cancel')}
              </Button>
            </div>
    </AdminPageLayout>
  );
}

