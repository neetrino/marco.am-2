'use client';

import type { ReactNode } from 'react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { AdminSidebar } from './AdminSidebar';

interface AdminPageLayoutProps {
  currentPath: string;
  router: AppRouterInstance;
  t: (key: string) => string;
  title: string;
  subtitle?: string;
  backLabel?: string;
  onBack?: () => void;
  headerActions?: ReactNode;
  children: ReactNode;
}

export function AdminPageLayout({
  currentPath,
  router,
  t,
  title,
  subtitle,
  backLabel,
  onBack,
  headerActions,
  children,
}: AdminPageLayoutProps) {
  return (
    <div className="admin-page">
      <div className="page-shell admin-shell">
        <div className="admin-header lg:ml-64">
          {backLabel ? (
            <button type="button" onClick={onBack} className="admin-back-link">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {backLabel}
            </button>
          ) : null}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="admin-title">{title}</h1>
              {subtitle ? <p className="admin-subtitle mt-1">{subtitle}</p> : null}
            </div>
            {headerActions}
          </div>
        </div>

        <div className="admin-layout">
          <AdminSidebar currentPath={currentPath} router={router} t={t} />
          <div className="admin-main">{children}</div>
        </div>
      </div>
    </div>
  );
}
