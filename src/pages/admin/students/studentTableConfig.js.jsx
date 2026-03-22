// src/pages/admin/students/studentTableConfig.js.jsx
import { FaPen, FaTrash, FaEye, FaRecycle, FaFilePdf } from "react-icons/fa";

/* ─── Clickable status toggle badge ─── */
export function StatusToggle({ row, onToggle, disabled }) {
  const isActive = row.status === 1;

  return (
    <button
      onClick={() => !disabled && onToggle(row)}
      disabled={disabled}
      title={disabled ? "Access Denied" : "Click to toggle status"}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
        transition-colors ${
          disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        }
        ${
          isActive
            ? "bg-green-100 text-green-700 hover:bg-green-200"
            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
        }
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isActive ? "bg-green-500" : "bg-yellow-500"
        }`}
      />
      {isActive ? "Active" : "Inactive"}
    </button>
  );
}

/* ─── Columns ─── */
export const getStudentColumns = ({ mode, isAdmin, handleToggleStatus, courseMap = {} }) => [
  { key: "serial", label: "#", render: (_, i) => i + 1 },

  {
    key: "photo",
    label: "Photo",
    render: (row) =>
      row.photo_url ? (
        <img
          src={row.photo_url}
          alt="student"
          className="h-10 w-10 rounded-full object-cover ring-2 ring-border"
        />
      ) : (
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
          {row.candidate_name?.[0]?.toUpperCase() || "?"}
        </div>
      ),
  },

  { key: "enrollment_no", label: "Enrollment" },
  { key: "candidate_name", label: "Name" },
  {
    key: "course",
    label: "Course",
    render: (row) => {
      // If course is empty, show blank
      if (!row.course || row.course === "") {
        return <span className="text-muted text-xs">—</span>;
      }
      // If course name exists in map, show it
      if (courseMap[row.course]) {
        return courseMap[row.course];
      }
      // Otherwise show ID as fallback
      return (
        <span className="text-muted text-xs">
          {typeof row.course === "string" && !isNaN(row.course)
            ? `ID: ${row.course}`
            : "—"}
        </span>
      );
    },
  },
  { key: "contact_number", label: "Contact" },
  { key: "email", label: "Email" },

  {
    key: "status",
    label: "Status",
    render: (row) =>
      mode === "active" ? (
        <StatusToggle
          row={row}
          onToggle={handleToggleStatus}
          disabled={!isAdmin}
        />
      ) : (
        <span className="text-xs text-text-muted">—</span>
      ),
  },
];

/* ─── Actions ─── */
export const getStudentActions = ({
  mode,
  isAdmin,
  handleView,
  handleEdit,
  handleDownloadPdf,
  handleDelete,
  handleRestore,
}) => {
  if (mode === "active") {
    const actions = [
      {
        icon: <FaEye />,
        title: "View",
        className:
          "p-2 bg-primary text-white rounded hover:opacity-80 transition",
        onClick: handleView,
      },
      {
        icon: <FaPen />,
        title: "Edit",
        className:
          "p-2 bg-blue-600 text-white rounded hover:opacity-80 transition",
        onClick: handleEdit,
      },
      {
        icon: <FaFilePdf />,
        title: "Download PDF",
        className:
          "p-2 bg-orange-500 text-white rounded hover:opacity-80 transition",
        onClick: handleDownloadPdf,
      },
    ];

    if (isAdmin) {
      actions.push({
        icon: <FaTrash />,
        title: "Delete",
        className:
          "p-2 bg-red-600 text-white rounded hover:opacity-80 transition",
        onClick: handleDelete,
      });
    }

    return actions;
  }

  // Recycle mode
  return [
    {
      icon: <FaRecycle />,
      title: "Restore",
      className:
        "p-2 bg-green-600 text-white rounded hover:opacity-80 transition",
      onClick: handleRestore,
    },
    {
      icon: <FaTrash />,
      title: "Permanent Delete",
      className:
        "p-2 bg-red-800 text-white rounded hover:opacity-80 transition",
      onClick: handleDelete,
    },
  ];
};
