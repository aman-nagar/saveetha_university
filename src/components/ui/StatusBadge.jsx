// src/components/ui/StatusBadge.jsx

export default function StatusBadge({ status }) {
  const map = {
    0: {
      label: "Pending",
      style: "bg-yellow-100 text-yellow-700",
    },
    1: {
      label: "Active",
      style: "bg-green-100 text-green-700",
    },
  };

  const current = map[status] || {
    label: "Unknown",
    style: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${current.style}`}
    >
      {current.label}
    </span>
  );
}
