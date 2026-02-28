// src/components/table/TableSkeleton.jsx
export default function TableSkeleton({
  title = "",
  columns = 4,
  rows = 5,
  showActions = true,
  actionCount = 2,
  toolbar = false,
}) {
  const rowArray = Array.from({ length: rows }, (_, i) => i);
  const colArray = Array.from({ length: columns }, (_, i) => i);
  const actionArray = Array.from({ length: actionCount }, (_, i) => i);

  return (
    <div className="w-full bg-surface border border-border rounded-xl overflow-hidden shadow-sm animate-pulse">
      {/* ── Header bar skeleton ── */}
      {(title || toolbar) && (
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="h-5 bg-border/60 rounded w-32 sm:w-40" />
          {toolbar && (
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap sm:justify-end w-full sm:w-auto">
              <div className="h-8 bg-border/60 rounded-lg w-24 sm:w-32" />
              <div className="h-8 bg-border/60 rounded-lg w-20 sm:w-24" />
            </div>
          )}
        </div>
      )}

      {/* ── Mobile Card View Skeleton ── */}
      <div className="block sm:hidden divide-y divide-border">
        {rowArray.map((index) => (
          <div key={index} className="p-3 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="h-4 bg-border/60 rounded w-3/4" />
              {showActions && (
                <div className="flex items-center gap-1 shrink-0">
                  {actionArray.map((i) => (
                    <div key={i} className="w-7 h-7 bg-border/60 rounded-md" />
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              {colArray.slice(1, 4).map((colIdx) => (
                <div key={colIdx} className="flex items-center justify-between">
                  <div className="h-2.5 bg-border/40 rounded w-16" />
                  <div className="h-2.5 bg-border/60 rounded w-20" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop Table View Skeleton ── */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-bg">
            <tr>
              {colArray.map((index) => (
                <th
                  key={index}
                  className="px-3 lg:px-6 py-4 border-b border-border"
                >
                  <div className="h-3.5 bg-border/60 rounded w-20 lg:w-24" />
                </th>
              ))}
              {showActions && (
                <th className="px-3 lg:px-6 py-4 border-b border-border">
                  <div className="h-3.5 bg-border/60 rounded w-16 mx-auto" />
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rowArray.map((rowIndex) => (
              <tr key={rowIndex} className="border-b border-border">
                {colArray.map((colIndex) => (
                  <td key={colIndex} className="px-3 lg:px-6 py-4 lg:py-5">
                    <div
                      className="h-3 bg-border/50 rounded"
                      style={{
                        width:
                          colIndex === 0
                            ? "50%"
                            : `${60 + Math.random() * 30}%`,
                      }}
                    />
                  </td>
                ))}
                {showActions && (
                  <td className="px-3 lg:px-6 py-4 lg:py-5">
                    <div className="flex items-center justify-center gap-1.5 lg:gap-2">
                      {actionArray.map((i) => (
                        <div
                          key={i}
                          className="w-7 h-7 lg:w-8 lg:h-8 bg-border/60 rounded-md"
                        />
                      ))}
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
