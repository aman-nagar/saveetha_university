// src/components/admin/settings/SettingsTable.jsx
import { FaPen, FaTrash } from "react-icons/fa";

/**
 * Reusable table component for displaying settings CRUD data
 * Used for: Testimonials, News, Sliders, etc.
 */
export default function SettingsTable({
  columns,
  data,
  loading,
  onEdit,
  onDelete,
  emptyMessage = "No items found",
  rowKey = "id",
}) {
  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-pulse text-muted">Loading...</div>
      </div>
    );
  }
  console.log(data);
  if (!data || data.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-border rounded-lg">
      <table className="w-full">
        <thead className="bg-surface border-b border-border">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-sm font-semibold text-text"
              >
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 text-left text-sm font-semibold text-text">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row[rowKey] || idx}
              className="border-b border-border hover:bg-surface/50 transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={`${row[rowKey]}-${col.key}`}
                  className="px-4 py-3 text-sm text-text"
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              <td className="px-4 py-3 text-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit?.(row)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs font-medium"
                  >
                    <FaPen className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete?.(row[rowKey])}
                    className="flex items-center gap-1 px-3 py-1.5 rounded bg-red-600/10 text-red-600 hover:bg-red-600/20 transition-colors text-xs font-medium"
                  >
                    <FaTrash className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
