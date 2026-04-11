import TableSkeleton from "../ui/skeleton/TableSkeleton";

export default function Table({
  columns = [],
  data = [],
  actions = [],
  loading = false,
  emptyMessage = "No data found",
  skeletonRows = 5,
  pageOffset = 0,
}) {
  if (loading) {
    return (
      <TableSkeleton
        columns={columns.length}
        rows={skeletonRows}
        showActions={actions.length > 0}
        actionCount={actions.length}
      />
    );
  }

  const colSpan = columns.length + (actions.length > 0 ? 1 : 0);

  return (
    <>
      {/* ===================== MOBILE VIEW ===================== */}
      <div className="block sm:hidden">
        {data.length === 0 ? (
          <div className="text-center py-10 text-muted italic text-sm">
            {emptyMessage}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {data.map((row, index) => {
              const adjustedIndex = pageOffset + index;
              // Safe fallback for mobile primary column
              const firstColKey = columns[0]?.accessor || columns[0]?.key;

              return (
                <div
                  key={row.id ?? index}
                  className="p-3 hover:bg-bg/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-medium text-text text-sm">
                      {columns[0]?.render
                        ? columns[0].render(row, adjustedIndex)
                        : (row[firstColKey] ?? "—")}
                    </div>

                    {actions.length > 0 && (
                      <div className="flex items-center gap-1 shrink-0">
                        {actions.map((action, idx) => (
                          <button
                            key={`action-mob-${idx}`}
                            onClick={() => action.onClick(row)}
                            className={action.className}
                            title={action.title}
                          >
                            {action.icon}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    {columns.slice(1).map((col, idx) => {
                      const colIdentifier =
                        col.accessor || col.key || `col-mob-${idx}`;
                      return (
                        <div
                          key={colIdentifier}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-muted">
                            {col.header || col.label}:
                          </span>
                          <span className="text-text font-medium">
                            {col.render
                              ? col.render(row, adjustedIndex)
                              : (row[col.accessor || col.key] ?? "—")}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ===================== DESKTOP VIEW ===================== */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-bg text-muted">
            <tr>
              {columns.map((col, idx) => {
                // Determine a unique key using accessor, key, or index fallback
                const colIdentifier =
                  col.accessor || col.key || `col-head-${idx}`;
                return (
                  <th
                    key={colIdentifier}
                    className="px-3 lg:px-6 py-2.5 lg:py-3 font-medium border-b border-border whitespace-nowrap text-xs lg:text-sm"
                  >
                    {col.header || col.label}
                  </th>
                );
              })}
              {actions.length > 0 && (
                <th className="px-3 lg:px-6 py-2.5 lg:py-3 font-medium border-b border-border text-center">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={colSpan}
                  className="text-center py-10 text-muted italic"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const adjustedIndex = pageOffset + index;

                return (
                  <tr
                    key={row.id ?? `row-${index}`}
                    className="border-b border-border hover:bg-bg/50 transition-colors"
                  >
                    {columns.map((col, idx) => {
                      const colIdentifier =
                        col.accessor || col.key || `col-cell-${idx}`;
                      return (
                        <td
                          key={colIdentifier}
                          className="px-3 lg:px-6 py-3 lg:py-4 text-text text-xs lg:text-sm"
                        >
                          {col.render
                            ? col.render(row, adjustedIndex)
                            : (row[col.accessor || col.key] ?? "—")}
                        </td>
                      );
                    })}

                    {actions.length > 0 && (
                      <td className="px-3 lg:px-6 py-3 lg:py-4">
                        <div className="flex items-center justify-center gap-2">
                          {actions.map((action, idx) => (
                            <button
                              key={`action-desk-${idx}`}
                              onClick={() => action.onClick(row)}
                              className={action.className}
                              title={action.title}
                            >
                              {action.icon}
                            </button>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
