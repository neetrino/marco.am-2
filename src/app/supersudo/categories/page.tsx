'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../../lib/auth/AuthContext';
import { Card, Button } from '@shop/ui';
import { useTranslation } from '../../../lib/i18n-client';
import { useCategories } from './hooks/useCategories';
import { useCategoryActions } from './hooks/useCategoryActions';
import { AdminPageLayout } from '../components/AdminPageLayout';
import { CategoriesList } from './components/CategoriesList';
import { AddCategoryModal } from './components/AddCategoryModal';
import { EditCategoryModal } from './components/EditCategoryModal';

export default function CategoriesPage() {
  const { t } = useTranslation();
  const { isLoggedIn, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname || '/supersudo/categories';
  const { categories, loading, fetchCategories } = useCategories();
  const {
    showAddModal,
    showEditModal,
    editingCategory,
    formData,
    saving,
    setShowAddModal,
    setShowEditModal,
    setFormData,
    handleAddCategory,
    handleEditCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    resetForm,
  } = useCategoryActions();

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
    <>
      <AdminPageLayout
        currentPath={currentPath}
        router={router}
        t={t}
        title={t('admin.categories.title')}
        backLabel={t('admin.categories.backToAdmin')}
        onBack={() => router.push('/supersudo')}
      >
        <Card className="admin-card">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900">{t('admin.categories.title')}</h2>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {t('admin.categories.addCategory')}
            </Button>
          </div>

          {loading ? (
            <div className="py-4 text-center">
              <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900" />
              <p className="text-sm text-gray-600">{t('admin.categories.loadingCategories')}</p>
            </div>
          ) : (
            <CategoriesList
              categories={categories}
              onEdit={handleEditCategory}
              onDelete={(categoryId, categoryTitle) =>
                handleDeleteCategory(categoryId, categoryTitle, fetchCategories)
              }
            />
          )}
        </Card>
      </AdminPageLayout>

      <AddCategoryModal
        isOpen={showAddModal}
        formData={formData}
        categories={categories}
        saving={saving}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        onFormDataChange={setFormData}
        onSubmit={() => handleAddCategory(fetchCategories)}
      />

      <EditCategoryModal
        isOpen={showEditModal}
        editingCategory={editingCategory}
        formData={formData}
        categories={categories}
        saving={saving}
        onClose={() => {
          setShowEditModal(false);
          resetForm();
        }}
        onFormDataChange={setFormData}
        onSubmit={() => handleUpdateCategory(fetchCategories)}
      />
    </>
  );
}
