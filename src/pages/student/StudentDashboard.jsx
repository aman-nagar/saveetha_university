// src/pages/student/StudentDashboard.jsx

// src/pages/student/StudentDashboard.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSignOutAlt,
  FaUserEdit,
  FaClipboardList,
} from "react-icons/fa";

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            Welcome, {user.name}
          </h1>
          <p className="text-muted">Enrollment No: {user.enrollment_no}</p>
          <p className="text-muted text-sm mt-1">
            Status: {user.status === 1 ? "Active" : "Inactive"}
          </p>
        </div>

        {/* Personal Details */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaUser className="text-primary" /> Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted font-medium">Father's Name</p>
              <p>{user.father_name}</p>
            </div>
            <div>
              <p className="text-muted font-medium">Mother's Name</p>
              <p>{user.mother_name}</p>
            </div>
            <div>
              <p className="text-muted font-medium">Date of Birth</p>
              <p>{user.dob}</p>
            </div>
            <div>
              <p className="text-muted font-medium">Gender</p>
              <p>{user.gender}</p>
            </div>
            <div>
              <p className="text-muted font-medium">Category</p>
              <p>{user.category.toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaPhone className="text-primary" /> Contact Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted font-medium">Phone</p>
              <p>{user.contact_number}</p>
            </div>
            <div>
              <p className="text-muted font-medium">Email</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" /> Address
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted font-medium">Country</p>
              <p>{user.country}</p>
            </div>
            <div>
              <p className="text-muted font-medium">State</p>
              <p>{user.state}</p>
            </div>
            <div>
              <p className="text-muted font-medium">City</p>
              <p>{user.city}</p>
            </div>
            <div>
              <p className="text-muted font-medium">Pincode</p>
              <p>{user.pincode}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-muted font-medium">Full Address</p>
              <p>{user.address}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <button className="bg-primary text-white px-4 py-3 rounded-md font-medium hover:bg-primary/90 transition flex items-center justify-center gap-2">
              <FaClipboardList /> View Grades
            </button>
            <button className="bg-accent text-primary px-4 py-3 rounded-md font-medium hover:bg-accent/90 transition flex items-center justify-center gap-2">
              <FaUserEdit /> Update Profile
            </button>
            <button
              onClick={logout}
              className="bg-danger text-white px-4 py-3 rounded-md font-medium hover:bg-danger/90 transition flex items-center justify-center gap-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
