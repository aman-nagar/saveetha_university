// src/pages/student/StudentDashboard.jsx
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const { studentData } = useAuth();

  if (!studentData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-surface rounded-2xl shadow-xl p-8 max-w-md text-center border border-border">
          <div className="text-5xl mb-4">🎓</div>
          <p className="text-text text-lg font-medium">
            No student data available
          </p>
        </div>
      </div>
    );
  }

  // Destructure direct names from the API response
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
    course_name, // Using direct name from JSON
    stream_name, // Using direct name from JSON
    status,
  } = studentData;

  return (
    <div className="max-w-7xl mx-auto space-y-5 pb-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-secondary rounded-2xl shadow-2xl overflow-hidden border border-accent/20">
        <div className="p-5 md:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="relative w-24 h-32 rounded-xl overflow-hidden border-[3px] border-white/80 shadow-lg bg-white/10">
              {photo ? (
                <img
                  src={photo}
                  alt={candidate_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-3xl">
                  👤
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <p className="text-white/70 text-[10px] font-semibold uppercase tracking-[0.2em]">
              Welcome Back
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1 truncate">
              {candidate_name}
            </h1>
            <p className="text-white/80 text-sm mt-1 font-medium">
              EN: {enrollment_no}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${status === 1 ? "bg-green-500/20 text-green-100 border-green-400/30" : "bg-red-500/20 text-red-100 border-red-400/30"}`}
              >
                {status === 1 ? "Active" : "Inactive"}
              </span>
              {/* DIRECT COURSE NAME */}
              <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                {course_name}
              </span>
              {/* DIRECT STREAM NAME */}
              <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                {stream_name}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex sm:flex-col gap-2 flex-shrink-0">
            <Link
              to="/student-dashboard/id-card"
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-xl transition-all text-sm border border-white/20 no-underline whitespace-nowrap"
            >
              <span>🪪</span>
              <span>ID Card</span>
            </Link>
            <Link
              to="/student-dashboard/admit-card"
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-xl transition-all text-sm border border-white/20 no-underline whitespace-nowrap"
            >
              <span>🎫</span>
              <span>Admit Card</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            icon: "📅",
            label: "Date of Birth",
            value: new Date(dob).toLocaleDateString(),
          },
          { icon: "⚧", label: "Gender", value: gender || "N/A" },
          {
            icon: "🏷️",
            label: "Category",
            value: category?.toUpperCase() || "N/A",
          },
          { icon: "📱", label: "Contact", value: contact_number },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-surface rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-lg mb-1">{stat.icon}</div>
            <p className="text-muted text-[10px] font-bold uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="text-text font-bold text-sm mt-1 truncate">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-surface rounded-2xl shadow-sm border border-border p-5">
          <h3 className="text-base font-bold text-text flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <span>👤</span> Personal & Family
          </h3>
          <div className="space-y-3">
            {[
              { label: "Full Name", value: candidate_name },
              { label: "Enrollment No", value: enrollment_no },
              { label: "Father's Name", value: father_name },
              { label: "Mother's Name", value: mother_name },
            ].map((field, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0"
              >
                <span className="text-muted text-[11px] font-semibold uppercase tracking-wide">
                  {field.label}
                </span>
                <span className="text-text font-semibold text-sm">
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-2xl shadow-sm border border-border p-5">
          <h3 className="text-base font-bold text-text flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <span>📍</span> Contact & Address
          </h3>
          <div className="space-y-3">
            {[
              { label: "Email", value: email },
              { label: "Phone", value: contact_number },
              { label: "Address", value: address },
              {
                label: "Location",
                value: `${city}, ${state}, ${country} - ${pincode}`,
              },
            ].map((field, i) => (
              <div
                key={i}
                className="flex justify-between items-start py-1.5 border-b border-gray-50 last:border-0"
              >
                <span className="text-muted text-[11px] font-semibold uppercase tracking-wide shrink-0">
                  {field.label}
                </span>
                <span className="text-text font-semibold text-sm text-right break-words max-w-[65%]">
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-5 border border-accent/20">
          <h3 className="text-base font-bold text-text flex items-center gap-2 mb-4 pb-3 border-b border-accent/20">
            <span>📚</span> Academics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface/60 rounded-xl p-4 border border-border/50">
              <p className="text-muted text-[10px] font-bold uppercase tracking-wider">
                Course
              </p>
              <p className="text-text font-bold mt-1">{course_name}</p>
            </div>
            <div className="bg-surface/60 rounded-xl p-4 border border-border/50">
              <p className="text-muted text-[10px] font-bold uppercase tracking-wider">
                Stream
              </p>
              <p className="text-text font-bold mt-1">{stream_name}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-5 border border-primary/20 flex flex-col justify-center">
          <div className="text-2xl mb-2">ℹ️</div>
          <p className="font-semibold text-text text-sm mb-1">Need Help?</p>
          <p className="text-muted text-xs leading-relaxed">
            Contact the administration office for assistance with records.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
