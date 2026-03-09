// src/components/students/StudentAdmitCard.jsx
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAdmitCard } from "@/api/students/studentDashboardApi";
import LoadingFallback from "@/components/ui/LoadingFallback";

const StudentAdmitCard = () => {
  const { studentData } = useAuth();
  const [admitCardData, setAdmitCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmitCard = async () => {
      try {
        setLoading(true);
        const response = await getAdmitCard();
        if (response.success) {
          setAdmitCardData(response.data);
          setError(null);
        } else {
          setError(response.message || "Failed to fetch admit card");
        }
      } catch (err) {
        setError(err.message || "Error fetching admit card");
        console.error("Admit Card Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (studentData) {
      fetchAdmitCard();
    }
  }, [studentData]);

  if (loading) {
    return <LoadingFallback variant="minimal" title="Loading Admit Card..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!admitCardData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-gray-400 text-5xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Admit Card
          </h2>
          <p className="text-gray-600">
            Your admit card is not yet generated. Please contact the
            administration.
          </p>
        </div>
      </div>
    );
  }

  const {
    enrollment_no,
    candidate_name,
    father_name,
    contact_number,
    photo,
    roll_number,
    session,
    duration,
    duration_type,
    subjects = [],
  } = admitCardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Admit Card Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">ADMIT CARD</h1>
          <p className="text-gray-600">Session: {session}</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Card Header with Colors */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6">
            <div className="flex items-center gap-6">
              {/* Student Photo */}
              <div className="flex-shrink-0">
                <div className="w-28 h-36 bg-white rounded-lg overflow-hidden border-4 border-white shadow-lg">
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

              {/* Student Info */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{candidate_name}</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="opacity-90">Enrollment</p>
                    <p className="font-bold text-lg">{enrollment_no}</p>
                  </div>
                  <div>
                    <p className="opacity-90">Roll Number</p>
                    <p className="font-bold text-lg">{roll_number}</p>
                  </div>
                  <div>
                    <p className="opacity-90">Father's Name</p>
                    <p className="font-bold">{father_name}</p>
                  </div>
                  <div>
                    <p className="opacity-90">Contact</p>
                    <p className="font-bold">{contact_number}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-8">
            {/* Exam Details */}
            <div className="mb-8 pb-8 border-b-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Exam Details
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">SESSION</p>
                  <p className="text-lg font-bold text-gray-800">{session}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">
                    DURATION
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {duration} {duration_type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">
                    ENROLLMENT NO
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {enrollment_no}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">
                    ROLL NUMBER
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {roll_number}
                  </p>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Exam Schedule
              </h3>

              {subjects && subjects.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 border-b-2 border-gray-300">
                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                          Subject
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                          Code
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                          Exam Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-50 transition"
                        >
                          <td className="px-4 py-4 text-sm text-gray-800 font-medium">
                            {subject.subject_name}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {subject.subject_code}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {subject.exam_date}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {subject.start_time} - {subject.end_time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    No subjects assigned for this exam session.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-100 px-8 py-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Generated on:{" "}
              <span className="font-bold">
                {new Date().toLocaleDateString()}
              </span>
            </p>
            <button
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition-colors shadow-md"
            >
              Print Admit Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAdmitCard;
