// src/pages/student/StudentDashboard.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaUserEdit,
  FaClipboardList,
  FaCamera,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-primary">
          <FaSpinner className="animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with Photo */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Photo Section */}
            <div className="relative">
              {user.photo && !imageError ? (
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-600 shadow-lg"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-4 border-blue-600 shadow-lg">
                  <FaUser className="text-blue-600 text-4xl" />
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-md">
                <FaCheckCircle size={16} />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {user.name}
              </h1>
              <p className="text-gray-600">
                Enrollment No: {user.enrollment_no}
              </p>
              <div
                className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: user.status === 1 ? "#d1fae5" : "#fee2e2",
                  color: user.status === 1 ? "#059669" : "#dc2626",
                }}
              >
                {user.status === 1 ? (
                  <>
                    <FaCheckCircle size={12} /> Active
                  </>
                ) : (
                  <>
                    <FaTimesCircle size={12} /> Inactive
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <FaUser className="text-blue-600" /> Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium text-xs mb-1">
                Father's Name
              </p>
              <p className="text-gray-800 font-medium">{user.father_name}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium text-xs mb-1">
                Mother's Name
              </p>
              <p className="text-gray-800 font-medium">{user.mother_name}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium text-xs mb-1">
                Date of Birth
              </p>
              <p className="text-gray-800 font-medium">{user.dob}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium text-xs mb-1">Gender</p>
              <p className="text-gray-800 font-medium">{user.gender}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium text-xs mb-1">Category</p>
              <p className="text-gray-800 font-medium">
                {user.category?.toUpperCase() || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <FaPhone className="text-blue-600" /> Contact Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium text-xs mb-1">Phone</p>
              <p className="text-gray-800 font-medium">{user.contact_number}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium text-xs mb-1">Email</p>
              <p className="text-gray-800 font-medium break-all">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <FaMapMarkerAlt className="text-blue-600" /> Address
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium text-xs mb-1">Country</p>
              <p className="text-gray-800 font-medium">{user.country}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium text-xs mb-1">State</p>
              <p className="text-gray-800 font-medium">{user.state}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium text-xs mb-1">City</p>
              <p className="text-gray-800 font-medium">{user.city}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium text-xs mb-1">Pincode</p>
              <p className="text-gray-800 font-medium">{user.pincode}</p>
            </div>
            <div className="sm:col-span-2 bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium text-xs mb-1">
                Full Address
              </p>
              <p className="text-gray-800 font-medium">{user.address}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-md">
              <FaClipboardList /> View Grades
            </button>
            <button className="bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-md">
              <FaUserEdit /> Update Profile
            </button>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loggingOut ? (
                <>
                  <FaSpinner className="animate-spin" /> Logging out...
                </>
              ) : (
                <>
                  <FaSignOutAlt /> Logout
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
