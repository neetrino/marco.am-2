'use client';

import { useTranslation } from '../../../../../lib/i18n-client';
import type { ProductClass } from '@/lib/constants/product-class';

interface PublishingProps {
  featured: boolean;
  productClass: ProductClass;
  onFeaturedChange: (featured: boolean) => void;
  onProductClassChange: (productClass: ProductClass) => void;
}

export function Publishing({
  featured,
  productClass,
  onFeaturedChange,
  onProductClassChange,
}: PublishingProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="productClass" className="block text-sm font-medium text-gray-700">
          Product class
        </label>
        <select
          id="productClass"
          value={productClass}
          onChange={(event) => onProductClassChange(event.target.value as ProductClass)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="retail">Retail</option>
          <option value="wholesale">Wholesale</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => onFeaturedChange(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <span aria-hidden="true">⭐</span>
            {t('admin.products.add.markAsFeatured')}
          </span>
        </label>
      </div>
    </div>
  );
}


