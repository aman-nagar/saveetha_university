// src/components/table/DataTableLayout.jsx
export default function DataTableLayout({
  title,
  toolbar,
  children,
  pagination,
}) {
  return (
    <div className="w-full bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      {(title || toolbar) && (
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          {title && (
            <h2 className="text-base sm:text-lg font-semibold text-text shrink-0">
              {title}
            </h2>
          )}
          {toolbar && (
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap sm:justify-end w-full sm:w-auto">
              {toolbar}
            </div>
          )}
        </div>
      )}

      {/* Table Content */}
      <div>{children}</div>

      {/* Pagination */}
      {pagination && (
        <div className="border-t border-border px-3 sm:px-4 lg:px-6">
          {pagination}
        </div>
      )}
    </div>
  );
}
