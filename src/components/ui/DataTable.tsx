import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from './IconButton';

export interface Column<T> {
  key: string;
  header: string;
  accessor?: (item: T) => React.ReactNode;
  isNumeric?: boolean;
  sortable?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 5,
  emptyMessage = 'No records available.',
  className
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortKey(null);
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }

      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();
      return sortDirection === 'asc'
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA);
    });
  }, [data, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  return (
    <div
      className={cn(
        'w-full rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] overflow-hidden flex flex-col',
        className
      )}
    >
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--ground)]">
              {columns.map((col) => {
                const isSorted = sortKey === col.key;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    style={{ width: col.width }}
                    className={cn(
                      'px-4 py-3 text-[13px] font-sans font-medium text-[var(--ink-muted)] select-none',
                      col.isNumeric && 'text-right'
                    )}
                  >
                    {col.sortable !== false ? (
                      <button
                        type="button"
                        onClick={() => handleSort(col.key)}
                        className={cn(
                          'inline-flex items-center gap-1.5 hover:text-[var(--ink)] transition-colors cursor-pointer',
                          col.isNumeric && 'justify-end w-full'
                        )}
                      >
                        <span>{col.header}</span>
                        {isSorted ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp size={13} className="text-[var(--accent)]" />
                          ) : (
                            <ArrowDown size={13} className="text-[var(--accent)]" />
                          )
                        ) : (
                          <ArrowUpDown size={12} className="opacity-40" />
                        )}
                      </button>
                    ) : (
                      <span>{col.header}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)] text-[13px] text-[var(--ink)]">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-[var(--ink-muted)] font-sans"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[var(--ground)]/50 transition-colors"
                >
                  {columns.map((col) => {
                    const content = col.accessor ? col.accessor(row) : row[col.key];
                    return (
                      <td
                        key={col.key}
                        className={cn(
                          'px-4 py-3',
                          col.isNumeric
                            ? 'font-mono tabular-nums text-right'
                            : 'font-sans'
                        )}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--border)] bg-[var(--ground)] text-[12px] font-sans text-[var(--ink-muted)]">
        <div>
          Showing{' '}
          <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
            {sortedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </span>{' '}
          to{' '}
          <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
            {Math.min(currentPage * pageSize, sortedData.length)}
          </span>{' '}
          of{' '}
          <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
            {sortedData.length}
          </span>{' '}
          entries
        </div>

        <div className="flex items-center gap-2">
          <IconButton
            icon={ChevronLeft}
            label="Previous page"
            size="sm"
            variant="ghost"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          />
          <span className="font-mono tabular-nums text-[12px]">
            {currentPage} / {totalPages}
          </span>
          <IconButton
            icon={ChevronRight}
            label="Next page"
            size="sm"
            variant="ghost"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          />
        </div>
      </div>
    </div>
  );
}
