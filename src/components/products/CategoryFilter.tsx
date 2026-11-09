'use client';

import React from 'react';
import type { CategoryGroup, FamilyGroup } from './productUtils';
import { getFamilyLabel } from './productUtils';

interface CategoryFilterProps {
  families: FamilyGroup[];
  activeFamily: string;
  onFamilyChange: (family: string) => void;
  /** Merged category groups to show as chips (already scoped to the active family, or top groups when All). */
  categoryGroups: CategoryGroup[];
  /** Whether the chips are the full list for the family (true) or a top-groups preview (false). */
  chipsComplete: boolean;
  activeCategoryKey: string | null;
  onCategoryChange: (key: string | null) => void;
  locale: string;
}

/**
 * Two-level filter: series (family) pills on top, merged category chips below.
 * Categories sharing a display name (case / plural variants) are merged into
 * one chip; the chip still matches every underlying category id.
 */
const CategoryFilter: React.FC<CategoryFilterProps> = ({
  families,
  activeFamily,
  onFamilyChange,
  categoryGroups,
  chipsComplete,
  activeCategoryKey,
  onCategoryChange,
  locale,
}) => {
  const zh = locale === 'zh';
  const pill =
    'px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap';
  const chip =
    'px-3 py-1.5 rounded-lg text-sm transition-colors text-left';

  return (
    <div className="space-y-4">
      {/* Series / family pills */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onFamilyChange('')}
          className={`${pill} ${
            !activeFamily
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {zh ? '全部系列' : 'All Series'}
        </button>
        {families.map((f) => (
          <button
            key={f.name}
            type="button"
            onClick={() => onFamilyChange(f.name)}
            className={`${pill} ${
              activeFamily === f.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {getFamilyLabel(f.name, locale)}
            <span className={`ml-1.5 text-xs ${activeFamily === f.name ? 'text-blue-100' : 'text-gray-400'}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Category chips for the active scope */}
      {categoryGroups.length > 0 && (
        <div>
          <div className="flex flex-wrap gap-2">
            {categoryGroups.map((g) => {
              const active = activeCategoryKey === g.key;
              const label = locale === 'zh' ? g.labelZh : g.labelEn;
              return (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => onCategoryChange(active ? null : g.key)}
                  className={`${chip} ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  title={g.ids.length > 1 ? g.ids.join(', ') : undefined}
                >
                  {label}
                  <span className={`ml-1.5 text-xs ${active ? 'text-blue-100' : 'text-gray-400'}`}>{g.count}</span>
                </button>
              );
            })}
          </div>
          {!chipsComplete && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              {zh
                ? '显示的是产品最多的分类；选择一个系列查看该系列的全部分类。'
                : 'Showing the largest categories; pick a series above to see all of its categories.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
