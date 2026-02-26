// src/components/table/TableSkeleton.jsx
export default function TableSkeleton({
  title = "Loading...",
  columns = 4,
  rows = 5,
  showActions = true,
  toolbar = false,
}) {
  const totalCols = showActions ? columns + 1 : columns;

  // Generate array for mapping
  const rowArray = Array.from({ length: rows }, (_, i) => i);
  const colArray = Array.from({ length: columns }, (_, i) => i);

  return (
    <div className="w-full bg-surface border border-border rounded-xl overflow-hidden shadow-sm animate-pulse">
      {/* ── Header bar skeleton ── */}
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        {/* Title skeleton */}
        <div className="h-5 sm:h-6 bg-muted/20 rounded w-32 sm:w-40" />

        {/* Toolbar skeleton */}
        {toolbar && (
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap sm:justify-end w-full sm:w-auto">
            <div className="h-8 sm:h-9 bg-muted/20 rounded-lg w-24 sm:w-32" />
            <div className="h-8 sm:h-9 bg-muted/20 rounded-lg w-20 sm:w-24" />
          </div>
        )}
      </div>

      {/* ── Mobile Card View Skeleton (visible only on small screens) ── */}
      <div className="block sm:hidden divide-y divide-border">
        {rowArray.map((index) => (
          <div key={index} className="p-3 space-y-3">
            {/* Card header: primary column + actions */}
            <div className="flex items-start justify-between gap-2">
              <div className="h-4 bg-muted/20 rounded w-3/4" />
              {showActions && (
                <div className="flex items-center gap-1 shrink-0">
                  <div className="w-7 h-7 bg-muted/20 rounded-md" />
                  <div className="w-7 h-7 bg-muted/20 rounded-md" />
                </div>
              )}
            </div>

            {/* Remaining columns as key-value pairs */}
            <div className="space-y-2">
              {colArray.slice(1).map((colIdx) => (
                <div key={colIdx} className="flex items-center justify-between">
                  <div className="h-3 bg-muted/20 rounded w-16" />
                  <div className="h-3 bg-muted/20 rounded w-20" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop Table View Skeleton (hidden on small screens) ── */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-bg">
            <tr>
              {colArray.map((index) => (
                <th
                  key={index}
                  className="px-3 lg:px-6 py-2.5 lg:py-3 border-b border-border"
                >
                  <div className="h-3.5 lg:h-4 bg-muted/20 rounded w-20 lg:w-24" />
                </th>
              ))}
              {showActions && (
                <th className="px-3 lg:px-6 py-2.5 lg:py-3 border-b border-border">
                  <div className="h-3.5 lg:h-4 bg-muted/20 rounded w-16" />
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {rowArray.map((rowIndex) => (
              <tr key={rowIndex} className="border-b border-border">
                {colArray.map((colIndex) => (
                  <td key={colIndex} className="px-3 lg:px-6 py-3 lg:py-4">
                    <div
                      className="h-3.5 lg:h-4 bg-muted/20 rounded"
                      style={{
                        width:
                          colIndex === 0
                            ? "60%"
                            : `${70 + Math.random() * 20}%`,
                      }}
                    />
                  </td>
                ))}
                {showActions && (
                  <td className="px-3 lg:px-6 py-3 lg:py-4">
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <div className="w-7 h-7 lg:w-8 lg:h-8 bg-muted/20 rounded-md" />
                      <div className="w-7 h-7 lg:w-8 lg:h-8 bg-muted/20 rounded-md" />
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
