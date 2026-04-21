'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../../lib/auth/AuthContext';
import { Card, Button } from '@shop/ui';
import { apiClient, getApiOrErrorMessage } from '../../../lib/api-client';
import { useTranslation } from '../../../lib/i18n-client';
import { AdminPageLayout } from '../components/AdminPageLayout';
import { logger } from "@/lib/utils/logger";

interface Brand {
  id: string;
  name: string;
  slug: string;
}

function BrandsSection() {
  const { t } = useTranslation();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState({ name: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchBrands = useCallback(async () => {
    try {
      setLoading(true);
      logger.devLog('🏷️ [ADMIN] Fetching brands...');
      const response = await apiClient.get<{ data: Brand[] }>('/api/v1/supersudo/brands');
      setBrands(response.data || []);
      logger.devLog('✅ [ADMIN] Brands loaded:', response.data?.length || 0);
    } catch (err) {
      console.error('❌ [ADMIN] Error fetching brands:', err);
      setBrands([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleDeleteBrand = async (brandId: string, brandName: string) => {
    if (!confirm(t('admin.brands.deleteConfirm').replace('{name}', brandName))) {
      return;
    }

    try {
      logger.devLog(`🗑️ [ADMIN] Deleting brand: ${brandName} (${brandId})`);
      await apiClient.delete(`/api/v1/supersudo/brands/${brandId}`);
      logger.devLog('✅ [ADMIN] Brand deleted successfully');
      fetchBrands();
      alert(t('admin.brands.deletedSuccess'));
    } catch (err: unknown) {
      console.error('❌ [ADMIN] Error deleting brand:', err);
      const errorMessage = getApiOrErrorMessage(err, 'Unknown error occurred');
      alert(t('admin.brands.errorDeleting') + '\n\n' + errorMessage);
    }
  };

  const handleOpenAddModal = () => {
    setEditingBrand(null);
    setFormData({ name: '' });
    setShowModal(true);
  };

  const handleOpenEditModal = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({ name: brand.name });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBrand(null);
    setFormData({ name: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert(t('admin.brands.nameRequired'));
      return;
    }

    setSubmitting(true);
    try {
      if (editingBrand) {
        // Update existing brand
        logger.devLog('🔄 [ADMIN] Updating brand:', editingBrand.id);
        await apiClient.put(`/api/v1/supersudo/brands/${editingBrand.id}`, {
          name: formData.name.trim(),
        });
        logger.devLog('✅ [ADMIN] Brand updated successfully');
        alert(t('admin.brands.updatedSuccess'));
      } else {
        // Create new brand
        logger.devLog('➕ [ADMIN] Creating brand:', formData.name);
        await apiClient.post('/api/v1/supersudo/brands', {
          name: formData.name.trim(),
        });
        logger.devLog('✅ [ADMIN] Brand created successfully');
        alert(t('admin.brands.createdSuccess'));
      }
      
      fetchBrands();
      handleCloseModal();
    } catch (err: unknown) {
      console.error('❌ [ADMIN] Error saving brand:', err);
      const errorMessage = getApiOrErrorMessage(err, 'Unknown error occurred');
      alert(t('admin.brands.errorSaving') + '\n\n' + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">{t('admin.brands.loading')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{t('admin.brands.title')}</h2>
        <Button
          onClick={handleOpenAddModal}
          variant="primary"
          size="sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('admin.brands.addNew')}
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">{t('admin.brands.loading')}</p>
        </div>
      ) : brands.length === 0 ? (
        <p className="text-sm text-gray-500 py-2">{t('admin.brands.noBrands')}</p>
      ) : (
        <div className="max-h-96 space-y-2 overflow-y-auto">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors hover:bg-gray-100"
          >
            <div>
              <div className="text-sm font-medium text-gray-900">{brand.name}</div>
              <div className="text-xs text-gray-500">{brand.slug}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleOpenEditModal(brand)}
                className="text-gray-700 hover:bg-gray-200 hover:text-gray-900"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {t('admin.brands.edit')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteBrand(brand.id, brand.name)}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {t('admin.brands.delete')}
              </Button>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingBrand ? t('admin.brands.editBrand') : t('admin.brands.addNewBrand')}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="brand-name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.brands.brandName')}
                </label>
                <input
                  id="brand-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="admin-field"
                  placeholder={t('admin.brands.enterBrandName')}
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  disabled={submitting}
                >
                  {t('admin.brands.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={submitting}
                >
                  {submitting ? t('admin.brands.saving') : (editingBrand ? t('admin.brands.update') : t('admin.brands.create'))}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function BrandsPage() {
  const { t } = useTranslation();
  const { isLoggedIn, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname || '/supersudo/brands';

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn || !isAdmin) {
        router.push('/supersudo');
        return;
      }
    }
  }, [isLoggedIn, isAdmin, isLoading, router]);

  if (isLoading) {
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
    <AdminPageLayout
      currentPath={currentPath}
      router={router}
      t={t}
      title={t('admin.brands.title')}
      backLabel={t('admin.common.backToAdmin')}
      onBack={() => router.push('/supersudo')}
    >
      <Card className="admin-card">
        <BrandsSection />
      </Card>
    </AdminPageLayout>
  );
}

