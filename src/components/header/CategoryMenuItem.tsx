'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { LanguagePreferenceContext } from '../../lib/language-context';
import type { Category } from './category-nav-types';
import { resolveCategoryNavPresentation } from './categoryNavPresentation';

const ArrowRightIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 shrink-0 opacity-60">
    <path d="M3 2L5 4L3 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Category row in the header dropdown with optional nested submenu (multi-column).
 */
export function CategoryMenuItem({
  category,
  onClose,
}: {
  category: Category;
  onClose: () => void;
}) {
  const lang = useContext(LanguagePreferenceContext);
  const searchParams = useSearchParams();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [submenuStyle, setSubmenuStyle] = useState<CSSProperties>({});
  const submenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submenuRef = useRef<HTMLDivElement>(null);
  const menuItemRef = useRef<HTMLDivElement>(null);
  const hasChildren = category.children && category.children.length > 0;
  const activeCategorySlug = searchParams.get('category');
  const isActive = activeCategorySlug === category.slug;
  const { title: displayTitle, Icon: CategoryIcon } = resolveCategoryNavPresentation(
    category.slug,
    category.title,
    lang
  );

  const handleMouseEnter = () => {
    if (hasChildren) {
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
        submenuTimeoutRef.current = null;
      }
      setShowSubmenu(true);
    }
  };

  const handleMouseLeave = () => {
    if (hasChildren) {
      submenuTimeoutRef.current = setTimeout(() => {
        setShowSubmenu(false);
      }, 150);
    }
  };

  useEffect(() => {
    return () => {
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (showSubmenu && submenuRef.current && menuItemRef.current) {
      const menuItem = menuItemRef.current;

      const productsDropdown = menuItem.closest('[data-marco-categories-dropdown]');
      if (productsDropdown) {
        const dropdownRect = productsDropdown.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        const leftPosition = dropdownRect.width;
        const topPosition = -12;
        const maxWidth = Math.min(600, viewportWidth - dropdownRect.right - 20);

        setSubmenuStyle({
          left: `${leftPosition}px`,
          top: `${topPosition}px`,
          maxWidth: `${maxWidth}px`,
        });
      }
    }
  }, [showSubmenu]);

  const organizeIntoColumns = (items: Category[], columnsCount: number = 4) => {
    if (items.length === 0) return [];

    const optimalColumns = Math.min(columnsCount, Math.ceil(items.length / 8));
    const itemsPerColumn = Math.ceil(items.length / optimalColumns);
    const columns: Category[][] = [];

    for (let i = 0; i < optimalColumns; i++) {
      const start = i * itemsPerColumn;
      const end = start + itemsPerColumn;
      const column = items.slice(start, end);
      if (column.length > 0) {
        columns.push(column);
      }
    }

    return columns;
  };

  const subcategoryColumns = hasChildren ? organizeIntoColumns(category.children, 4) : [];

  return (
    <div
      ref={menuItemRef}
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/products?category=${category.slug}`}
        className={`flex max-w-full items-center rounded-[35px] px-2 py-1.5 text-left text-base leading-[22px] tracking-[0.01em] transition-colors duration-150 ${
          isActive
            ? 'bg-marco-yellow font-bold text-marco-black'
            : 'text-[#5d7285] hover:bg-white/60'
        }`}
        onClick={onClose}
      >
        <span className="flex size-[52px] shrink-0 items-center justify-center p-1.5">
          <CategoryIcon
            className={`size-[28px] shrink-0 ${isActive ? 'text-marco-black' : 'text-marco-black/85'}`}
            strokeWidth={1.35}
            aria-hidden
          />
        </span>
        <span className="min-w-0 flex-1 pr-1">{displayTitle}</span>
        {hasChildren && <ArrowRightIcon />}
      </Link>
      {hasChildren && showSubmenu && (
        <div
          ref={submenuRef}
          className="absolute top-0 z-[60]"
          style={submenuStyle}
          onMouseEnter={() => {
            if (submenuTimeoutRef.current) {
              clearTimeout(submenuTimeoutRef.current);
              submenuTimeoutRef.current = null;
            }
            setShowSubmenu(true);
          }}
          onMouseLeave={() => {
            submenuTimeoutRef.current = setTimeout(() => {
              setShowSubmenu(false);
            }, 150);
          }}
        >
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200/80 p-6 min-w-[500px]">
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: `repeat(${subcategoryColumns.length}, minmax(150px, 1fr))` }}
            >
              {subcategoryColumns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-col">
                  <div className="mb-4 pb-2 border-b border-gray-200">
                    <Link
                      href={`/products?category=${category.slug}`}
                      className="text-sm font-bold text-gray-900 hover:text-gray-700 uppercase tracking-wide"
                      onClick={onClose}
                    >
                      {displayTitle}
                    </Link>
                  </div>
                  <div className="space-y-2.5">
                    {column.map((subCategory) => (
                      <Link
                        key={subCategory.id}
                        href={`/products?category=${subCategory.slug}`}
                        className="block text-sm text-gray-700 hover:text-gray-900 transition-colors duration-150 py-1"
                        onClick={onClose}
                      >
                        {subCategory.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
