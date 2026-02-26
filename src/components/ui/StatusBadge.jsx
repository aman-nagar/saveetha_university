// src/components/ui/StatusBadge.jsx
export default function StatusBadge({ status }) {
  const map = {
    0: {
      label: "Pending",
      style: "bg-warning/10 text-warning border-warning/20",
    },
    1: {
      label: "Active",
      style: "bg-success/10 text-success border-success/20",
    },
    2: {
      label: "Inactive",
      style: "bg-muted/10 text-muted border-muted/20",
    },
  };

  const current = map[status] || {
    label: "Unknown",
    style: "bg-muted/10 text-muted border-muted/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full border ${current.style}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${current.style.split(" ")[0].replace("/10", "")}`}
      />
      {current.label}
    </span>
  );
}
