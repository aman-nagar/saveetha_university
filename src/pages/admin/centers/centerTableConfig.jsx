// src/components/center/centerTableConfig.js
import { HiPencil, HiTrash } from "react-icons/hi";
import { FaToggleOn, FaToggleOff, FaSpinner } from "react-icons/fa";

/**
 * Center Table Columns
 */
export const getCenterColumns = ({ handleToggle, togglingId }) => [
  {
    key: "serial",
    label: "#",
    render: (_, i) => (
      <span className="text-muted text-xs sm:text-sm">{i + 1}</span>
    ),
  },
  {
    key: "photo",
    label: "Photo",
    render: (row) => (
      <div className="flex items-center justify-center">
        {row.owner_image_url ? (
          <img
            src={row.owner_image_url}
            alt={row.institute_owner_name}
            className="h-10 w-10 sm:h-12 sm:w-12 object-cover rounded-lg border border-border shadow-sm"
            onError={(e) => {
              e.target.src =
                "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(row.institute_owner_name);
            }}
          />
        ) : (
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-muted/10 flex items-center justify-center border border-dashed border-border">
            <span className="text-[10px] text-muted text-center leading-tight">
              No
              <br />
              Img
            </span>
          </div>
        )}
      </div>
    ),
  },
  {
    key: "institute_name",
    label: "Institute",
    render: (row) => (
      <div className="flex flex-col min-w-0">
        <span className="font-medium text-text text-sm sm:text-base truncate">
          {row.institute_name}
        </span>
        <span className="text-xs text-muted truncate hidden sm:block">
          {row.institute_full_address}
        </span>
        <span className="text-xs text-muted sm:hidden">
          {row.state}, {row.district}
        </span>
      </div>
    ),
  },
  {
    key: "institute_owner_name",
    label: "Owner",
    render: (row) => (
      <div className="flex flex-col">
        <span className="text-sm sm:text-base">{row.institute_owner_name}</span>
        <span className="text-[10px] sm:text-xs text-muted">
          DOB: {row.date_of_birth}
        </span>
      </div>
    ),
  },
  {
    key: "contact_number",
    label: "Contact",
    render: (row) => (
      <div className="flex flex-col text-xs sm:text-sm">
        <span className="truncate">{row.contact_number}</span>
        <span className="text-primary hover:underline truncate hidden sm:block text-xs">
          {row.email}
        </span>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <button
          onClick={() => handleToggle(row, "is_form_enabled")}
          disabled={togglingId === row.id}
          className="flex items-center gap-1.5 sm:gap-2 group"
        >
          {togglingId === row.id ? (
            <FaSpinner className="animate-spin text-primary w-4 h-4 sm:w-5 sm:h-5" />
          ) : row.is_form_enabled ? (
            <FaToggleOn className="w-5 h-5 sm:w-6 sm:h-6 text-success group-hover:text-success/80" />
          ) : (
            <FaToggleOff className="w-5 h-5 sm:w-6 sm:h-6 text-muted group-hover:text-muted/70" />
          )}
          <span className="text-xs sm:text-sm text-muted">
            Form {row.is_form_enabled ? "On" : "Off"}
          </span>
        </button>

        <button
          onClick={() => handleToggle(row, "is_active")}
          disabled={togglingId === row.id}
          className="flex items-center gap-1.5 sm:gap-2 group"
        >
          {togglingId === row.id ? (
            <FaSpinner className="animate-spin text-primary w-4 h-4 sm:w-5 sm:h-5" />
          ) : row.is_active ? (
            <FaToggleOn className="w-5 h-5 sm:w-6 sm:h-6 text-success group-hover:text-success/80" />
          ) : (
            <FaToggleOff className="w-5 h-5 sm:w-6 sm:h-6 text-danger group-hover:text-danger/70" />
          )}
          <span
            className={`text-xs sm:text-sm ${
              row.is_active ? "text-success" : "text-danger"
            }`}
          >
            {row.is_active ? "Active" : "Inactive"}
          </span>
        </button>
      </div>
    ),
  },
];

/**
 * Center Table Actions
 */
export const getCenterActions = ({ navigate, handleDelete }) => [
  {
    icon: <HiPencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    className:
      "p-1.5 sm:p-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors",
    title: "Edit Center",
    onClick: (row) => navigate(`/admin/centers/add?id=${row.id}`),
  },
  {
    icon: <HiTrash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    className:
      "p-1.5 sm:p-2 rounded-md bg-danger/10 text-danger hover:bg-danger/20 transition-colors",
    title: "Delete Center",
    onClick: handleDelete,
  },
];
