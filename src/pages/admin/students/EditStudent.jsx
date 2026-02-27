// src/pages/admin/students/EditStudent.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStudentById, updateStudent } from "../../../api/students/studentApi";
import StudentFormStepper from "../../../components/admin/students/admission/StudentFormStepper";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchStudentById(id);
        setStudent(data);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setFetchLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (formData) => {
    await updateStudent(id, formData, true);
    // Success toast is shown by the stepper; navigate after short delay
    setTimeout(() => navigate("/admin/students"), 1500);
  };

  if (fetchLoading) {
    return (
      <div className="py-24 flex flex-col items-center gap-3 text-text-muted">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm">Fetching student data...</p>
      </div>
    );
  }

  if (fetchError || !student) {
    return (
      <div className="py-24 text-center text-text-muted">
        <p className="mb-2">{fetchError || "Student not found."}</p>
        <button
          className="text-primary underline"
          onClick={() => navigate("/admin/students")}
        >
          ← Back to Students
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text">Edit Student</h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Enrollment:{" "}
            <span className="font-mono text-text">{student.enrollment_no}</span>
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/students")}
          className="w-full sm:w-auto text-center text-sm text-text-muted hover:text-primary border border-border px-4 py-2 rounded-md transition-colors"
        >
          ← Back to List
        </button>
      </div>

      <StudentFormStepper
        mode="edit"
        student={student}
        onSubmit={handleSubmit}
        submitLabel="Update Student"
      />
    </div>
  );
}
