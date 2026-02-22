// src/components/admin/AdminHeader.jsx
import { useLocation, Link } from "react-router-dom";

const routeTitles = {
  "/admin": "Dashboard",
  "/admin/students": "Students",
  "/admin/students/add": "New Admission",
  "/admin/site-settings": "Site Settings",
};

export default function AdminHeader() {
  const location = useLocation();
  const path = location.pathname;

  // Split path into parts for breadcrumb
  const parts = path.split("/").filter(Boolean);

  let breadcrumb = [];
  let accumulatedPath = "";

  parts.forEach((part) => {
    accumulatedPath += `/${part}`;
    breadcrumb.push({
      label:
        routeTitles[accumulatedPath] ||
        part.charAt(0).toUpperCase() + part.slice(1),
      path: accumulatedPath,
    });
  });

  const pageTitle =
    routeTitles[path] ||
    breadcrumb[breadcrumb.length - 1]?.label ||
    "Admin Panel";

  return (
    <header className="bg-surface border-b border-border px-6 py-1">
      <div className="flex items-center justify-between">
        {/* Left: Breadcrumb + Title */}
        <div>
          {/* Breadcrumb */}
          <div className="text-sm text-muted mb-1">
            {breadcrumb.map((item, index) => (
              <span key={item.path}>
                {index !== 0 && " / "}
                <Link to={item.path} className="hover:text-primary transition">
                  {item.label}
                </Link>
              </span>
            ))}
          </div>

          {/* Page Title */}
          <h1 className="text-xl font-heading font-bold text-primary">
            {pageTitle}
          </h1>
        </div>

        {/* Right: User Info */}
        <div className="text-sm text-muted">
          Logged in as <span className="text-text font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}
