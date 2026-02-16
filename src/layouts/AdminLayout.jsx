// src/layouts/AdminLayout.jsx
// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import { AdminSidebar } from "../components/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-bg">
      {/* Sidebar - fixed full height */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}