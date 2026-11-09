'use client';

import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  locale: string;
}

/** Compact pagination: prev / numbered window with ellipsis / next. */
const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange, locale }) => {
  if (totalPages <= 1) return null;
  const zh = locale === 'zh';

  const items: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
      if (items.length > 0 && items[items.length - 1] !== i - 1 && items[items.length - 1] !== '…') {
        items.push('…');
      }
      items.push(i);
    }
  }

  const baseBtn =
    'min-w-9 h-9 px-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center border';
  const navBtn = `${baseBtn} border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 disabled:hover:border-gray-300 disabled:hover:text-gray-700`;

  return (
    <nav className="flex flex-wrap items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={`${navBtn} px-3`}
        aria-label={zh ? '上一页' : 'Previous page'}
      >
        ← {zh ? '上一页' : 'Prev'}
      </button>
      {items.map((item, idx) =>
        item === '…' ? (
          <span key={`gap-${idx}`} className="min-w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item as number)}
            aria-current={item === page ? 'page' : undefined}
            className={`${baseBtn} ${
              item === page
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-blue-500 hover:text-blue-600'
            }`}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className={`${navBtn} px-3`}
        aria-label={zh ? '下一页' : 'Next page'}
      >
        {zh ? '下一页' : 'Next'} →
      </button>
      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
        {zh ? `第 ${page} / ${totalPages} 页` : `Page ${page} of ${totalPages}`}
      </span>
    </nav>
  );
};

export default Pagination;
