// src/components/table/Table.jsx
export default function Table({
  title = "List",
  columns = [],
  data = [],
  actions = [],
  loading = false,
  emptyMessage = "No data found",
  toolbar = null,
}) {
  const colSpan = columns.length + (actions.length > 0 ? 1 : 0);

  return (
    <div className="w-full bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
      {/* ── Header bar ── */}
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

      {/* ── Mobile Card View (visible only on small screens) ── */}
      <div className="block sm:hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-10 text-muted italic text-sm">
            {emptyMessage}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {data.map((row, index) => (
              <div
                key={row.id ?? index}
                className="p-3 hover:bg-bg/50 transition-colors"
              >
                {/* Primary column as card header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="font-medium text-text text-sm">
                    {columns[0]?.render
                      ? columns[0].render(row, index)
                      : (row[columns[0]?.key] ?? "—")}
                  </div>
                  {actions.length > 0 && (
                    <div className="flex items-center gap-1 shrink-0">
                      {actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => action.onClick(row)}
                          className={`p-1.5 rounded-md transition-colors ${
                            action.className ||
                            "hover:bg-bg text-muted hover:text-primary"
                          }`}
                          title={action.title || "Action"}
                        >
                          <span className="w-4 h-4 block">{action.icon}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Remaining columns as key-value pairs */}
                <div className="space-y-1.5">
                  {columns.slice(1).map((col) => (
                    <div
                      key={col.key}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-muted">{col.label}:</span>
                      <span className="text-text font-medium">
                        {col.render
                          ? col.render(row, index)
                          : (row[col.key] ?? "—")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Desktop Table View (hidden on small screens) ── */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-bg text-muted">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 lg:px-6 py-2.5 lg:py-3 font-medium border-b border-border whitespace-nowrap text-xs lg:text-sm"
                >
                  {col.label}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-3 lg:px-6 py-2.5 lg:py-3 font-medium border-b border-border whitespace-nowrap text-xs lg:text-sm">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={colSpan} className="text-center py-10 text-muted">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={colSpan}
                  className="text-center py-10 text-muted italic"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.id ?? index}
                  className="border-b border-border hover:bg-bg/50 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-3 lg:px-6 py-3 lg:py-4 text-text text-xs lg:text-sm"
                    >
                      {col.render
                        ? col.render(row, index)
                        : (row[col.key] ?? "—")}
                    </td>
                  ))}

                  {actions.length > 0 && (
                    <td className="px-3 lg:px-6 py-3 lg:py-4">
                      <div className="flex items-center gap-1.5 lg:gap-2">
                        {actions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => action.onClick(row)}
                            className={action.className}
                            title={action.title || "Action"}
                          >
                            {action.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
