export default function AdminTable({
  columns = [],
  data = [],
  actions = [],
}) {
  return (
    <div className="bg-surface border border-border rounded-xl mt-6 overflow-hidden">
      {/* Table header */}
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-text">
          List
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-bg text-muted">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-4 py-3 border-b border-border"
                >
                  {col.label}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-4 py-3 border-b border-border text-left">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-6 text-muted"
                >
                  No data found
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border hover:bg-bg transition"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-text">
                      {row[col.key]}
                    </td>
                  ))}

                  {actions.length > 0 && (
                    <td className="px-4 py-3 flex gap-2">
                      {actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => action.onClick(row)}
                          className={action.className}
                        >
                          {action.icon}
                        </button>
                      ))}
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
