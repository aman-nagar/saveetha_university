// src/pages/student/StudentDashboard.jsx
import { useAuth } from "@/context/AuthContext";

const StudentDashboard = () => {
  const { studentData } = useAuth();

  if (!studentData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <p className="text-gray-600 text-lg font-medium">No student data available</p>
        </div>
      </div>
    );
  }

  const {
    enrollment_no,
    candidate_name,
    father_name,
    mother_name,
    photo,
    dob,
    gender,
    category,
    contact_number,
    email,
    country,
    state,
    city,
    address,
    pincode,
    course,
    stream,
    status,
  } = studentData;

  const getStatusBadge = (status) => {
    if (status === 1) {
      return (
        <span className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
          Active
        </span>
      );
    }
    return (
      <span className="inline-block bg-red-100 text-red-800 px-4 py-1 rounded-full text-sm font-medium">
        Inactive
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-6">
          {photo ? (
            <img
              src={photo}
              alt={candidate_name}
              className="w-24 h-32 rounded-lg object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-24 h-32 rounded-lg bg-blue-400 flex items-center justify-center border-4 border-white">
              <span className="text-2xl">👤</span>
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold">Welcome, {candidate_name}!</h1>
            <p className="text-blue-100 mt-2 text-lg">{enrollment_no}</p>
            <p className="text-blue-100 mt-1">
              {course} • {stream}
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Full Name
                </label>
                <p className="text-gray-800 font-medium mt-1">{candidate_name}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Enrollment Number
                </label>
                <p className="text-gray-800 font-medium mt-1">{enrollment_no}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Date of Birth
                </label>
                <p className="text-gray-800 font-medium mt-1">
                  {new Date(dob).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Gender</label>
                <p className="text-gray-800 font-medium mt-1">{gender}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Category</label>
                <p className="text-gray-800 font-medium mt-1 uppercase">{category}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Contact Number
                </label>
                <p className="text-gray-800 font-medium mt-1">{contact_number}</p>
              </div>
            </div>
          </div>

          {/* Family Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
              Family Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Father's Name
                </label>
                <p className="text-gray-800 font-medium mt-1">{father_name}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Mother's Name
                </label>
                <p className="text-gray-800 font-medium mt-1">{mother_name}</p>
              </div>
            </div>
          </div>

          {/* Contact & Address Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
              Contact & Address
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-600">Email</label>
                <p className="text-gray-800 font-medium mt-1">{email}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Contact Number
                </label>
                <p className="text-gray-800 font-medium mt-1">{contact_number}</p>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-600">Address</label>
                <p className="text-gray-800 font-medium mt-1">{address}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">City</label>
                <p className="text-gray-800 font-medium mt-1">{city}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">State</label>
                <p className="text-gray-800 font-medium mt-1">{state}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Country</label>
                <p className="text-gray-800 font-medium mt-1">{country}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Pincode</label>
                <p className="text-gray-800 font-medium mt-1">{pincode}</p>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
              Academic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-600">Course</label>
                <p className="text-gray-800 font-medium mt-1">{course}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Stream</label>
                <p className="text-gray-800 font-medium mt-1">{stream}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Downloads */}
        <div className="lg:col-span-1">
          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 sticky top-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-3">
              Account Status
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <div className="mt-2">{getStatusBadge(status)}</div>
              </div>
            </div>
          </div>

          {/* Downloads Menu */}
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-48">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-3">
              Downloads
            </h3>

            <div className="space-y-3">
              <a
                href="/student-dashboard/id-card"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-lg font-bold text-center transition-all transform hover:scale-105"
              >
                <div className="text-2xl mb-2">🪪</div>
                <span>ID Card</span>
              </a>

              <a
                href="/student-dashboard/admit-card"
                className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-lg font-bold text-center transition-all transform hover:scale-105"
              >
                <div className="text-2xl mb-2">🎫</div>
                <span>Admit Card</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
