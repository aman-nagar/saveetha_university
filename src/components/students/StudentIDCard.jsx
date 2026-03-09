// src/components/students/StudentIDCard.jsx
import { useAuth } from "@/context/AuthContext";

const StudentIDCard = () => {
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
    photo,
    dob,
    course,
    stream,
    contact_number,
    email,
  } = studentData;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl">
        {/* ID Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Front of Card */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:shadow-3xl transition-shadow">
            <div className="relative h-96 bg-gradient-to-b from-blue-600 to-blue-800 p-6 text-white flex flex-col justify-between">
              {/* Header */}
              <div className="text-center border-b-2 border-white pb-4">
                <h2 className="text-2xl font-bold">STUDENT ID CARD</h2>
                <p className="text-sm opacity-90 mt-1">Government Institute</p>
              </div>

              {/* Student Photo */}
              <div className="flex justify-center">
                <div className="w-24 h-32 bg-white rounded-lg overflow-hidden border-4 border-white shadow-lg">
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

              {/* Student Details */}
              <div className="text-center space-y-1 text-sm">
                <p className="text-lg font-bold">{candidate_name}</p>
                <p className="text-xs">Enrollment: {enrollment_no}</p>
              </div>
            </div>

            {/* Card Details Section */}
            <div className="p-6 bg-gray-50 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold">
                    FATHER'S NAME
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {father_name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">
                    DATE OF BIRTH
                  </p>
                  <p className="text-sm font-medium text-gray-800">{dob}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold">COURSE</p>
                  <p className="text-sm font-medium text-gray-800">{course}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">STREAM</p>
                  <p className="text-sm font-medium text-gray-800">{stream}</p>
                </div>
              </div>

              <div className="flex gap-4 pt-2 border-t border-gray-300">
                <div>
                  <p className="text-xs text-gray-500 font-semibold">PHONE</p>
                  <p className="text-sm font-medium text-gray-800">
                    {contact_number}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">EMAIL</p>
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back of Card / Additional Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-3">
                Student Information
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-600 font-medium">
                    Full Name
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {candidate_name}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-600 font-medium">
                    Enrollment No.
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {enrollment_no}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-600 font-medium">
                    Father's Name
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {father_name}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-600 font-medium">
                    Course
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {course}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-600 font-medium">
                    Stream
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {stream}
                  </span>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={() => window.print()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg"
            >
              Print ID Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentIDCard;
