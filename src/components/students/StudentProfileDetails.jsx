// src/components/students/StudentProfileDetails.jsx
import { useAuth } from "@/context/AuthContext";

const StudentProfileDetails = () => {
  const { studentData } = useAuth();

  if (!studentData) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        No student data available
      </div>
    );
  }

  const {
    enrollment_no,
    candidate_name,
    father_name,
    mother_name,
    dob,
    photo,
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
    status_updated_at,
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage and view your personal information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-b from-blue-600 to-blue-700 h-32"></div>

              {/* Profile Photo */}
              <div className="px-6 -mt-16 pb-6 text-center relative z-10">
                <div className="w-32 h-40 mx-auto mb-4 bg-white rounded-lg shadow-lg overflow-hidden border-4 border-white">
                  {photo ? (
                    <img
                      src={photo}
                      alt={candidate_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                      No Photo
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="px-6 pb-8 space-y-3 text-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {candidate_name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{enrollment_no}</p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Status</p>
                  {getStatusBadge(status)}
                </div>

                <div className="pt-4 border-t border-gray-200 text-sm">
                  <p className="text-gray-600">
                    Last Updated:{" "}
                    <span className="text-gray-800 font-medium">
                      {new Date(status_updated_at).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details - Main Content */}
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
                  <p className="text-gray-800 font-medium mt-1">
                    {candidate_name}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Enrollment Number
                  </label>
                  <p className="text-gray-800 font-medium mt-1">
                    {enrollment_no}
                  </p>
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
                  <label className="text-sm font-semibold text-gray-600">
                    Gender
                  </label>
                  <p className="text-gray-800 font-medium mt-1">{gender}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Category
                  </label>
                  <p className="text-gray-800 font-medium mt-1 uppercase">
                    {category}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Contact Number
                  </label>
                  <p className="text-gray-800 font-medium mt-1">
                    {contact_number}
                  </p>
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
                  <p className="text-gray-800 font-medium mt-1">
                    {father_name}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Mother's Name
                  </label>
                  <p className="text-gray-800 font-medium mt-1">
                    {mother_name}
                  </p>
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
                  <label className="text-sm font-semibold text-gray-600">
                    Email
                  </label>
                  <p className="text-gray-800 font-medium mt-1">{email}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Contact Number
                  </label>
                  <p className="text-gray-800 font-medium mt-1">
                    {contact_number}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-600">
                    Address
                  </label>
                  <p className="text-gray-800 font-medium mt-1">{address}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    City
                  </label>
                  <p className="text-gray-800 font-medium mt-1">{city}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    State
                  </label>
                  <p className="text-gray-800 font-medium mt-1">{state}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Country
                  </label>
                  <p className="text-gray-800 font-medium mt-1">{country}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Pincode
                  </label>
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
                  <label className="text-sm font-semibold text-gray-600">
                    Course
                  </label>
                  <p className="text-gray-800 font-medium mt-1">{course}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Stream
                  </label>
                  <p className="text-gray-800 font-medium mt-1">{stream}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileDetails;
