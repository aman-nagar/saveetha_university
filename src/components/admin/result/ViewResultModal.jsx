import { useEffect, useState } from "react";
import Modal from "../../../components/ui/Modal";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { fetchResultById } from "../../../api/results/resultApi";

export default function ViewResultModal({
  isOpen,
  onClose,
  resultData,
  showToast,
}) {
  const [loading, setLoading] = useState(false);
  const [viewResult, setViewResult] = useState(null);

  // Load full result details when modal opens
  useEffect(() => {
    if (!isOpen) {
      setViewResult(null);
      return;
    }

    if (!resultData?.id) {
      setViewResult(resultData || null);
      return;
    }

    let isActive = true;

    const loadResultDetails = async () => {
      setLoading(true);
      setViewResult(null);

      try {
        const response = await fetchResultById(resultData.id);
        const fullRecord = response?.data || response;

        if (!isActive) return;

        if (fullRecord && typeof fullRecord === "object") {
          setViewResult({ ...resultData, ...fullRecord });
        } else {
          setViewResult(resultData);
        }
      } catch (err) {
        if (!isActive) return;

        setViewResult(resultData);
        showToast(
          "warning",
          "Could not load full details. Showing available information.",
        );
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadResultDetails();

    return () => {
      isActive = false;
    };
  }, [isOpen, resultData, showToast]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="View Result Details"
      size="large"
    >
      {loading ? (
        <div className="py-14 flex items-center justify-center gap-3 text-muted">
          <FaSpinner className="animate-spin" />
          <span>Loading result details...</span>
        </div>
      ) : !viewResult ? (
        <div className="py-12 text-center text-muted">
          <FaExclamationTriangle className="mx-auto mb-4" size={32} />
          <p>No result data available.</p>
        </div>
      ) : (
        <div className="p-8 space-y-6 bg-surface">
          {/* Student Information Section */}
          <div>
            <h3 className="text-lg font-bold text-text border-b border-border/50 pb-3 mb-4">
              Student Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-bg/40 p-4 rounded-lg border border-border/30">
                <label className="text-[10px] uppercase font-bold text-muted block mb-2">
                  Student Name
                </label>
                <p className="text-sm font-semibold text-text">
                  {viewResult.student_name || "N/A"}
                </p>
              </div>
              <div className="bg-bg/40 p-4 rounded-lg border border-border/30">
                <label className="text-[10px] uppercase font-bold text-muted block mb-2">
                  Enrollment Number
                </label>
                <p className="text-sm font-semibold text-text">
                  {viewResult.enrollment_no || "N/A"}
                </p>
              </div>
              <div className="bg-bg/40 p-4 rounded-lg border border-border/30">
                <label className="text-[10px] uppercase font-bold text-muted block mb-2">
                  Roll Number
                </label>
                <p className="text-sm font-semibold text-text">
                  {viewResult.roll_no || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div>
            <h3 className="text-lg font-bold text-text border-b border-border/50 pb-3 mb-4">
              Academic Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-bg/40 p-4 rounded-lg border border-border/30">
                <label className="text-[10px] uppercase font-bold text-muted block mb-2">
                  Course
                </label>
                <p className="text-sm font-semibold text-text">
                  {viewResult.course_name || viewResult.course || "N/A"}
                </p>
              </div>
              <div className="bg-bg/40 p-4 rounded-lg border border-border/30">
                <label className="text-[10px] uppercase font-bold text-muted block mb-2">
                  Stream
                </label>
                <p className="text-sm font-semibold text-accent">
                  {viewResult.stream_name || viewResult.stream || "N/A"}
                </p>
              </div>
              <div className="bg-bg/40 p-4 rounded-lg border border-border/30">
                <label className="text-[10px] uppercase font-bold text-muted block mb-2">
                  Faculty
                </label>
                <p className="text-sm font-semibold text-text">
                  {viewResult.faculty_name || viewResult.faculty || "N/A"}
                </p>
              </div>
              <div className="bg-bg/40 p-4 rounded-lg border border-border/30">
                <label className="text-[10px] uppercase font-bold text-muted block mb-2">
                  Duration Type
                </label>
                <p className="text-sm font-semibold text-text">
                  {viewResult.duration_type || "N/A"}
                </p>
              </div>
              <div className="bg-bg/40 p-4 rounded-lg border border-border/30">
                <label className="text-[10px] uppercase font-bold text-muted block mb-2">
                  Duration
                </label>
                <p className="text-sm font-semibold text-text">
                  {viewResult.duration || "N/A"}
                </p>
              </div>
              <div className="bg-bg/40 p-4 rounded-lg border border-border/30">
                <label className="text-[10px] uppercase font-bold text-muted block mb-2">
                  Session
                </label>
                <p className="text-sm font-semibold text-text">
                  {viewResult.session || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Result Details Section */}
          <div>
            <h3 className="text-lg font-bold text-text border-b border-border/50 pb-3 mb-4">
              Result Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg/40 p-4 rounded-lg border border-border/30">
                <label className="text-[10px] uppercase font-bold text-muted block mb-2">
                  Issue Date
                </label>
                <p className="text-sm font-semibold text-text">
                  {viewResult.issue_date || "N/A"}
                </p>
              </div>
              <div className="bg-bg/40 p-4 rounded-lg border border-border/30">
                <label className="text-[10px] uppercase font-bold text-muted block mb-2">
                  Total Subjects
                </label>
                <p className="text-sm font-semibold text-accent">
                  {(viewResult.subjects || []).length}
                </p>
              </div>
            </div>
          </div>

          {/* Marks Table Section */}
          {viewResult.subjects && viewResult.subjects.length > 0 ? (
            <div>
              <h3 className="text-lg font-bold text-text border-b border-border/50 pb-3 mb-4">
                Subject Marks
              </h3>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-bg/60 text-muted font-bold uppercase text-[10px]">
                    <tr>
                      <th className="px-6 py-4 text-left">Subject Name</th>
                      <th className="px-6 py-4 text-center">Theory</th>
                      <th className="px-6 py-4 text-center">Practical</th>
                      <th className="px-6 py-4 text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {viewResult.subjects.map((sub) => {
                      const theory = Number(sub.theory_marks || 0);
                      const practical = Number(sub.practical_marks || 0);
                      const total = theory + practical;

                      return (
                        <tr
                          key={sub.subject_id || sub.id}
                          className="hover:bg-bg/20 transition-colors"
                        >
                          <td className="px-6 py-4 font-semibold text-text">
                            {sub.subject_name}
                          </td>
                          <td className="px-6 py-4 text-center text-text">
                            {theory}
                          </td>
                          <td className="px-6 py-4 text-center text-text">
                            {practical}
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-accent">
                            {total}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-warning/10 border border-warning/20 text-warning px-6 py-4 rounded-lg flex items-center gap-3">
              <FaExclamationTriangle />
              <span>No subject marks found for this result.</span>
            </div>
          )}

          {/* Audit Information Section */}
          <div>
            <h3 className="text-lg font-bold text-text border-b border-border/50 pb-3 mb-4">
              Audit Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg/40 p-4 rounded-lg border border-border/30">
                <label className="text-[10px] uppercase font-bold text-muted block mb-2">
                  Created Date
                </label>
                <p className="text-sm font-semibold text-text">
                  {viewResult.created_at
                    ? new Date(viewResult.created_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="bg-bg/40 p-4 rounded-lg border border-border/30">
                <label className="text-[10px] uppercase font-bold text-muted block mb-2">
                  Last Modified
                </label>
                <p className="text-sm font-semibold text-text">
                  {viewResult.updated_at
                    ? new Date(viewResult.updated_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-6 border-t border-border">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
