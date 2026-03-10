import { useEffect, useState } from "react";
import Modal from "../../../components/ui/Modal";
import { FaSpinner, FaExclamationTriangle, FaDownload } from "react-icons/fa";
import { fetchResultById } from "../../../api/results/resultApi";
import { fetchStudentById } from "../../../api/students/studentApi"; // Added
import { downloadTranscript } from "../../../utils/pdfGenerator"; // Added

export default function ViewResultModal({
  isOpen,
  onClose,
  resultData,
  showToast,
}) {
  const [loading, setLoading] = useState(false);
  const [viewResult, setViewResult] = useState(null);

  useEffect(() => {
    if (!isOpen || !resultData?.id) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchResultById(resultData.id);
        const result = res?.data || res;

        // Fetch student details to get Course and Stream NAMES
        const studentRes = await fetchStudentById(result.student_id);
        const student = studentRes?.data || studentRes;

        setViewResult({
          ...result,
          student_name: student.name,
          course_name: student.course,
          stream_name: student.stream,
          faculty_name: student.faculty,
        });
      } catch (err) {
        showToast("error", "Failed to load complete details.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [isOpen, resultData]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Academic Record"
      size="large"
    >
      {loading ? (
        <div className="py-20 flex justify-center">
          <FaSpinner className="animate-spin" size={30} />
        </div>
      ) : (
        viewResult && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <Detail label="Student" value={viewResult.candidate_name} />
              <Detail label="Enrollment" value={viewResult.enrollment_no} />
              <Detail label="Course" value={viewResult.course_name} />
              <Detail label="Stream" value={viewResult.stream_name} />
              <Detail label="Roll No" value={viewResult.roll_no} />
              <Detail label="Session" value={viewResult.session} />
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white text-xs uppercase">
                  <th className="p-3 text-left">Subject</th>
                  <th className="p-3">Theory</th>
                  <th className="p-3">Practical</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 border">
                {viewResult.subjects.map((sub, i) => (
                  <tr key={i} className="text-sm">
                    <td className="p-3 font-medium">{sub.subject_name}</td>
                    <td className="p-3 text-center">{sub.theory_marks}</td>
                    <td className="p-3 text-center">{sub.practical_marks}</td>
                    <td className="p-3 text-center font-bold text-blue-600">
                      {Number(sub.theory_marks) + Number(sub.practical_marks)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => downloadTranscript(viewResult)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <FaDownload /> Download PDF
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )
      )}
    </Modal>
  );
}

const Detail = ({ label, value }) => (
  <div>
    <p className="text-[10px] uppercase font-bold text-slate-400">{label}</p>
    <p className="text-sm font-semibold text-slate-800">{value || "N/A"}</p>
  </div>
);
