'use client';

import { Card } from '@shop/ui';
import { useTranslation } from '../../../../lib/i18n-client';
import { formatDate } from '../utils';
import type { AnalyticsData } from '../types';

interface PeriodSelectorProps {
  period: string;
  startDate: string;
  endDate: string;
  analytics: AnalyticsData | null;
  onPeriodChange: (period: string) => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export function PeriodSelector({
  period,
  startDate,
  endDate,
  analytics,
  onPeriodChange,
  onStartDateChange,
  onEndDateChange,
}: PeriodSelectorProps) {
  const { t } = useTranslation();

  return (
    <Card className="admin-card mb-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{t('admin.analytics.timePeriod')}</h2>
        {analytics && (
          <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
            {formatDate(analytics.dateRange.start)} - {formatDate(analytics.dateRange.end)}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('admin.analytics.period')}
          </label>
          <select
            value={period}
            onChange={(e) => {
              onPeriodChange(e.target.value);
              if (e.target.value !== 'custom') {
                onStartDateChange('');
                onEndDateChange('');
              }
            }}
            className="admin-field"
          >
            <option value="day">{t('admin.analytics.today')}</option>
            <option value="week">{t('admin.analytics.last7Days')}</option>
            <option value="month">{t('admin.analytics.last30Days')}</option>
            <option value="year">{t('admin.analytics.lastYear')}</option>
            <option value="custom">{t('admin.analytics.customRange')}</option>
          </select>
        </div>
        {period === 'custom' && (
          <>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.analytics.startDate')}
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="admin-field"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.analytics.endDate')}
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
                className="admin-field"
              />
            </div>
          </>
        )}
      </div>
    </Card>
  );
}




