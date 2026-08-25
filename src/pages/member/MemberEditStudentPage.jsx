import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaUserGraduate, FaArrowLeft, FaSpinner } from "react-icons/fa";
import { fetchStudentById, updateStudent } from "@/api/students/studentApi";
import StudentFormStepper from "@/components/admin/students/admission/StudentFormStepper";
import { useToast } from "@/context/ToastContext";

export default function MemberEditStudentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { show } = useToast();

  const [student, setStudent] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const listPath = "/member-dashboard/students";

  useEffect(() => {
    const load = async () => {
      try {
        setFetchLoading(true);
        const data = await fetchStudentById(id);
        setStudent(data);
      } catch (err) {
        console.error("Error loading student for edit:", err);
        setFetchError(err.message || "Failed to load student details");
        show("error", err.message || "Failed to load student details");
      } finally {
        setFetchLoading(false);
      }
    };
    if (id) load();
  }, [id, show]);

  const handleSubmit = async (formData) => {
    try {
      await updateStudent(id, formData, true);
      show("success", `Student ${student?.candidate_name || ""} updated successfully!`);
      setTimeout(() => navigate(listPath), 1200);
    } catch (err) {
      console.error("Failed to update student:", err);
      show("error", err.message || "Failed to update student");
      throw err;
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-muted">
        <FaSpinner className="animate-spin text-primary text-3xl" />
        <p className="text-sm font-medium">Fetching student records...</p>
      </div>
    );
  }

  if (fetchError || !student) {
    return (
      <div className="py-24 text-center text-muted max-w-md mx-auto space-y-4">
        <p className="text-base text-text font-medium">
          {fetchError || "Student not found."}
        </p>
        <Link
          to={listPath}
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Students Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-surface border border-border shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-primary/10 text-primary border border-primary/20">
              Member Portal • Edit Record
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-text flex items-center gap-2">
            <FaUserGraduate className="text-primary" />
            <span>Edit Student: {student.candidate_name}</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Enrollment Number:{" "}
            <span className="font-mono font-semibold text-text">
              {student.enrollment_no || "N/A"}
            </span>
          </p>
        </div>

        <button
          onClick={() => navigate(listPath)}
          className="inline-flex items-center justify-center gap-2 text-sm text-muted hover:text-text border border-border bg-bg/50 px-4 py-2 rounded-xl transition-all hover:bg-bg"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          <span>Back to List</span>
        </button>
      </div>

      {/* Reusable Multi-Step Student Form */}
      <StudentFormStepper
        mode="edit"
        student={student}
        onSubmit={handleSubmit}
        submitLabel="Update Student"
      />
    </div>
  );
}
