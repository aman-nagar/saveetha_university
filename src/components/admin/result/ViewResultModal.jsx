import { useEffect, useState } from "react";
import Modal from "../../../components/ui/Modal";
import { FaSpinner, FaExclamationTriangle, FaDownload } from "react-icons/fa";
import { fetchResultById } from "../../../api/results/resultApi";
import { fetchStudentById } from "../../../api/students/studentApi";
import {
  downloadTranscript,
  getTranscriptHtml,
} from "../../../utils/pdfGenerator";
import { fetchCourses } from "../../../api/courses/courseApi";
import { fetchStreams } from "../../../api/courses/streamApi";

export default function ViewResultModal({
  isOpen,
  onClose,
  resultData,
  showToast,
}) {
  const [loading, setLoading] = useState(false);
  const [viewResult, setViewResult] = useState(null);
  const [previewHtml, setPreviewHtml] = useState("");

  useEffect(() => {
    if (!isOpen || !resultData?.id) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchResultById(resultData.id);
        const result = res?.data || res;

        // Fetch student details
        const studentRes = await fetchStudentById(result.student_id);
        const student = studentRes?.data || studentRes;

        // Resolve names by IDs
        let courseName = null,
          streamName = null;

        // Fetch course by ID
        if (student.faculty && student.course) {
          const cId = Number(student.course);
          const fId = Number(student.faculty);
          const cList = await fetchCourses(fId);
          const cMatch = cList.find((c) => c.id === cId);
          courseName = cMatch?.name ?? null;
        }

        // Fetch stream by ID
        if (student.stream && courseName) {
          const cId = Number(student.course);
          const sId = Number(student.stream);
          const sList = await fetchStreams(cId);
          const sMatch = sList.find((s) => s.id === sId);
          streamName = sMatch?.name ?? null;
        }

        const fullResult = {
          ...result,
          student_name: student.candidate_name,
          course_name: courseName || student.course,
          stream_name: streamName || student.stream,
          faculty_name: student.faculty,
        };

        setViewResult(fullResult);
        setPreviewHtml(getTranscriptHtml(fullResult));
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
          <div className="p-0">
            <div
              className="overflow-auto border border-slate-200 rounded-xl bg-white"
              style={{
                maxHeight: "85vh",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{ minWidth: "210mm", display: "inline-block" }}
                dangerouslySetInnerHTML={{
                  __html:
                    previewHtml ||
                    "<div class='p-4'>Preparing preview...</div>",
                }}
              />
            </div>

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
