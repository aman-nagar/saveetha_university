import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { useAcademicFlow } from "../../../hooks/useAcademicFlow";
import { useToast } from "../../../context/ToastContext";
import Button from "../../../components/ui/Button";
import Table from "../../../components/table/Table";
import Toast from "../../../components/ui/Toast";
import { downloadTranscript } from "../../../utils/pdfGenerator";
import {
  FaTrash,
  FaEdit,
  FaExclamationTriangle,
  FaSpinner,
  FaEye,
  FaDownload,
  FaTimes,
} from "react-icons/fa";
import { getTodayDate } from "../../../utils/formHelpers";
import FormSelect from "../../../components/form/FormSelect";
import FormInput from "../../../components/form/FormInput";
import {
  createResult,
  updateResult,
  deleteResult,
  fetchResults,
  fetchResultById,
} from "../../../api/results/resultApi";
import { fetchStudentById } from "../../../api/students/studentApi";
import { fetchCourses } from "../../../api/courses/courseApi";
import { fetchStreams } from "../../../api/courses/streamApi";
// Shared Components
import ResultFormHeader from "../../../components/admin/result/ResultFormHeader";
import MarksEntryTable from "../../../components/admin/result/MarksEntryTable";
import ViewResultModal from "../../../components/admin/result/ViewResultModal";

export default function CreateResultPage() {
  const { toast, show, clear } = useToast();

  // Mode Management
  const [mode, setMode] = useState("create"); // "create" or "edit"
  const [editingId, setEditingId] = useState(null);

  // History & View States
  const [history, setHistory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [selectedResultForView, setSelectedResultForView] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { issue_date: getTodayDate() },
  });

  // Academic Flow Hook
  const flow = useAcademicFlow(setValue);
  const selectedDuration = watch("selectedDuration");
  const enrollmentNo = watch("enrollmentNo");
  const rollNo = watch("rollNo");

  // Sync Logic: Load subjects and roll number when duration/student changes
  useEffect(() => {
    if (selectedDuration && flow.studentId) {
      flow.loadSubjectsForPart(selectedDuration);
      flow.syncRollNoFromAdmitCard(selectedDuration);
    }
  }, [
    selectedDuration,
    flow.studentId,
    flow.loadSubjectsForPart,
    flow.syncRollNoFromAdmitCard,
  ]);

  // Fetch History
  const loadHistory = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const response = await fetchResults();
      const records = response.records || response.data || response;
      console.log(records);
      setHistory(Array.isArray(records) ? records : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleEditInitiate = async (record) => {
    setMode("edit");
    setEditingId(record.id);

    try {
      // 1. Fetch full result details
      const res = await fetchResultById(record.id);
      const data = res?.data || res;

      // 2. Fetch Student data (contains IDs for course, stream, etc.)
      const studentRes = await fetchStudentById(data.student_id);
      const studentData = studentRes.data || studentRes;

      // 3. Get the stream ID directly from studentData (it's stored as ID)
      const targetStreamId = Number(studentData.stream);

      // 4. Setup Academic Flow
      await flow.selectStudent(studentData);

      // ✅ Small timeout to ensure durationOptions state updates
      await new Promise((resolve) => setTimeout(resolve, 100));

      // 5. Fetch Subjects (Passing the stream ID)
      const currentSubjects = await flow.loadSubjectsForPart(
        data.duration,
        targetStreamId,
      );

      // 6. Map Marks (Safe numeric conversion)
      const marksMap = {};
      (data.subjects || []).forEach((savedSub) => {
        const match = currentSubjects.find(
          (s) =>
            s.subject_name.toLowerCase() ===
            savedSub.subject_name.toLowerCase(),
        );

        const subId = match?.id || savedSub.subject_id;
        if (subId) {
          marksMap[subId] = {
            theory: Number(savedSub.theory_marks) || 0,
            practical: Number(savedSub.practical_marks) || 0,
          };
        }
      });

      // 7. FINAL RESET: Use resolved flow names (not raw IDs)
      reset({
        enrollmentNo: data.enrollment_no,
        selectedDuration: String(data.duration),
        course: flow.courseName || "",
        stream: flow.streamName || "",
        rollNo: data.roll_no || "",
        session: data.session,
        issue_date: data.issue_date,
        marks: marksMap,
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
      show("success", "Edit mode activated");
    } catch (err) {
      console.error("Edit Init Error:", err);
      show("error", "Failed to load record details");
    }
  };

  const cancelEdit = () => {
    setMode("create");
    setEditingId(null);
    reset({ issue_date: getTodayDate(), session: "", selectedDuration: "" });
    flow.setSearchTerm("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this result permanently?")) return;
    try {
      await deleteResult(id);
      show("success", "Result deleted");
      loadHistory();
    } catch (err) {
      show("error", err.message);
    }
  };

  const onSubmit = async (formData) => {
    if (!enrollmentNo) return show("error", "Please select a student first.");
    if (rollNo === "Not Generated")
      return show("error", "Admit card required.");

    setIsSubmitting(true);
    try {
      const payload = {
        enrollment_no: enrollmentNo,
        student_id: flow.studentId,
        course_id: flow.courseId,
        stream_id: flow.streamId,
        roll_no: rollNo,
        duration: Number(selectedDuration),
        duration_type: flow.courseType,
        session: formData.session,
        issue_date: formData.issue_date,
        subjects: flow.subjects.map((sub) => ({
          subject_id: sub.id,
          subject_name: sub.subject_name,
          theory_marks: Number(formData.marks?.[sub.id]?.theory || 0),
          practical_marks: Number(formData.marks?.[sub.id]?.practical || 0),
          total_marks:
            Number(formData.marks?.[sub.id]?.theory || 0) +
            Number(formData.marks?.[sub.id]?.practical || 0),
        })),
      };

      if (mode === "edit") {
        await updateResult(editingId, payload);
        show("success", "Result updated successfully!");
      } else {
        await createResult(payload);
        show("success", "Result created successfully!");
      }

      cancelEdit();
      loadHistory();
    } catch (err) {
      show("error", err.message || "Action failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = async (row) => {
    try {
      const res = await fetchResultById(row.id);
      const result = res.data || res;

      // Fetch student details
      const studentRes = await fetchStudentById(result.student_id);
      const student = studentRes.data || studentRes;

      // Resolve course and stream names by IDs
      let courseName = student.course;
      let streamName = student.stream;

      try {
        // Fetch course by ID
        if (student.faculty && student.course) {
          const cId = Number(student.course);
          const fId = Number(student.faculty);
          const cList = await fetchCourses(fId);
          const cMatch = cList.find((c) => c.id === cId);
          if (cMatch) courseName = cMatch.name;
        }

        // Fetch stream by ID
        if (student.stream && courseName) {
          const cId = Number(student.course);
          const sId = Number(student.stream);
          const sList = await fetchStreams(cId);
          const sMatch = sList.find((s) => s.id === sId);
          if (sMatch) streamName = sMatch.name;
        }
      } catch (err) {
        console.warn("Failed to resolve course/stream names, using IDs:", err);
      }

      downloadTranscript({
        ...result,
        student_name: student.candidate_name,
        course_name: courseName,
        stream_name: streamName,
      });
      show("success", "PDF Generated");
    } catch (err) {
      show("error", "Failed to generate PDF");
    }
  };

  return (
    <div className="w-full space-y-6">
      {toast && <Toast {...toast} onClose={clear} />}

      {/* Unified Form */}
      <div className="bg-surface border border-border rounded-xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-text">
            {mode === "edit" ? "Update Result" : "Create New Result"}
          </h2>
          {mode === "edit" && (
            <button
              onClick={cancelEdit}
              className="text-danger flex items-center gap-2 text-sm font-bold"
            >
              <FaTimes /> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <ResultFormHeader flow={flow} register={register} rollNo={rollNo} />

          <hr className="border-border" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormSelect
              label={`Duration (${flow.courseType || "Part"})`}
              name="selectedDuration"
              register={register}
              options={flow.durationOptions}
            />
            <FormInput
              label="Session"
              name="session"
              register={register}
              placeholder="e.g., 2024-25"
              required
            />
            <FormInput
              label="Issue Date"
              name="issue_date"
              type="date"
              register={register}
            />
          </div>

          {rollNo === "Not Generated" && (
            <div className="bg-danger/10 border border-danger/20 text-danger px-6 py-4 rounded-lg flex items-center gap-3">
              <FaExclamationTriangle />
              <span>Admit Card missing for this student.</span>
            </div>
          )}

          {selectedDuration && flow.subjects.length > 0 && (
            <MarksEntryTable
              subjects={flow.subjects}
              register={register}
              errors={errors}
            />
          )}

          <div className="flex justify-end pt-4 gap-4">
            {mode === "edit" && (
              <Button variant="secondary" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={isSubmitting || rollNo === "Not Generated"}
            >
              {isSubmitting ? (
                <FaSpinner className="animate-spin" />
              ) : mode === "edit" ? (
                "Update Result"
              ) : (
                "Save Result"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* History Table */}
      <Table
        title="Recent Records History"
        data={history}
        loading={loadingHistory}
        columns={[
          { key: "enrollment_no", label: "Enrollment" },
          { key: "roll_no", label: "Roll No." },
          { key: "session", label: "Session" },
          {
            key: "actions",
            label: "Actions",
            render: (row) => (
              <div className="flex gap-3">
                <button
                  onClick={() => handleEditInitiate(row)}
                  className="text-accent cursor-pointer hover:scale-110 transition-transform"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => {
                    setSelectedResultForView(row);
                    setIsViewModalOpen(true);
                  }}
                  className="text-blue-500 cursor-pointer hover:scale-110 transition-transform"
                >
                  <FaEye size={16} />
                </button>
                <button
                  onClick={() => handleDownload(row)}
                  className="text-green-600 hover:scale-110 transition-transform"
                  title="Download PDF"
                >
                  <FaDownload size={16} />
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="text-danger cursor-pointer hover:scale-110 transition-transform"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            ),
          },
        ]}
      />

      {/* View Modal */}
      <ViewResultModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        resultData={selectedResultForView}
        showToast={show}
      />
    </div>
  );
}
