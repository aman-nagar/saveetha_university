// src/components/table/Table.jsx
export default function Table({
  title = "List",
  columns = [],
  data = [],
  actions = [],
  loading = false,
  emptyMessage = "No data found",
  toolbar = null, // optional slot: rendered in the table header bar
}) {
  const colSpan = columns.length + (actions.length > 0 ? 1 : 0);

  return (
    <div className="w-full bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
      {/* ── Header bar ── */}
      {(title || toolbar) && (
        <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4 flex-wrap">
          {title && (
            <h2 className="text-lg font-semibold text-text shrink-0">
              {title}
            </h2>
          )}
          {toolbar && (
            <div className="flex items-center gap-3 flex-wrap flex-1 justify-end">
              {toolbar}
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-bg text-muted">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 font-medium border-b border-border"
                >
                  {col.label}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-3 font-medium border-b border-border">
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
                    <td key={col.key} className="px-6 py-4 text-text">
                      {col.render
                        ? col.render(row, index)
                        : (row[col.key] ?? "—")}
                    </td>
                  ))}

                  {actions.length > 0 && (
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
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
