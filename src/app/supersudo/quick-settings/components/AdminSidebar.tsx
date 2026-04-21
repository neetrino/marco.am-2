'use client';

import { useRouter } from 'next/navigation';
import { AdminMenuDrawer } from '../../../../components/AdminMenuDrawer';
import { getAdminMenuTABS } from '../../admin-menu.config';

interface AdminSidebarProps {
  currentPath: string;
  router: ReturnType<typeof useRouter>;
  t: ReturnType<typeof import('../../../../lib/i18n-client').useTranslation>['t'];
}

export function AdminSidebar({ currentPath, router, t }: AdminSidebarProps) {
  const adminTabs = getAdminMenuTABS(t);

  return (
    <>
      <div className="lg:hidden mb-6">
        <AdminMenuDrawer tabs={adminTabs} currentPath={currentPath} />
      </div>
      <aside className="hidden lg:block lg:w-64 flex-shrink-0">
        <nav className="fixed left-0 top-0 z-40 h-screen w-64 overflow-y-auto border-r border-marco-border bg-white/95 p-3 shadow-[0_8px_24px_rgba(16,16,16,0.06)] backdrop-blur-sm">
          <div className="mb-3 border-b border-marco-border pb-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-marco-text/70">Admin Panel</p>
          </div>
          <div className="space-y-1">
          {adminTabs.map((tab) => {
            const isActive = tab.path === '/'
              ? currentPath === '/'
              : currentPath === tab.path ||
                (tab.path === '/supersudo' && currentPath === '/supersudo') ||
                (tab.path !== '/supersudo' && currentPath.startsWith(tab.path));
            return (
              <button
                key={tab.id}
                onClick={() => {
                  router.push(tab.path);
                }}
                className={`group w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                  tab.isSubCategory ? 'pl-9' : ''
                } ${
                  isActive
                    ? 'bg-marco-yellow text-marco-black shadow-sm'
                    : 'text-marco-text hover:bg-marco-gray hover:text-marco-black'
                }`}
              >
                <span
                  className={`flex-shrink-0 transition-colors ${
                    isActive ? 'text-marco-black' : 'text-marco-text/70 group-hover:text-marco-black'
                  }`}
                >
                  {tab.icon}
                </span>
                <span className="text-left">{tab.label}</span>
              </button>
            );
          })}
          </div>
        </nav>
      </aside>
    </>
  );
}

