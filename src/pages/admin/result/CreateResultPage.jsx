import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { useAcademicFlow } from "../../../hooks/useAcademicFlow";
import { useToast } from "../../../context/ToastContext";
import Button from "../../../components/ui/Button";
import Table from "../../../components/table/Table";
import Toast from "../../../components/ui/Toast";
import {
  FaTrash,
  FaEdit,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";
import { getTodayDate } from "../../../utils/formHelpers";
import FormSelect from "../../../components/form/FormSelect";
import FormInput from "../../../components/form/FormInput";
import {
  createResult,
  deleteResult,
  fetchResults,
} from "../../../api/results/resultApi";

// Split Components
import ResultFormHeader from "../../../components/admin/result/ResultFormHeader";
import MarksEntryTable from "../../../components/admin/result/MarksEntryTable";
import EditResultModal from "../../../components/admin/result/EditResultModal";

export default function CreateResultPage() {
  const { toast, show, clear } = useToast();

  // State Management
  const [history, setHistory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [selectedResultForEdit, setSelectedResultForEdit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { register, handleSubmit, setValue, watch, reset } = useForm({
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
  }, [selectedDuration, flow.studentId, flow]);

  // Fetch History
  const loadHistory = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const response = await fetchResults();
      const records = response.records || response.data || response;
      setHistory(Array.isArray(records) ? records : []);
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Handlers
  const handleEditClick = (record) => {
    setSelectedResultForEdit(record);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedResultForEdit(null);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this result permanently?",
      )
    )
      return;
    try {
      await deleteResult(id);
      show("success", "Result deleted successfully");
      loadHistory();
    } catch (err) {
      show("error", err.message || "Failed to delete record");
    }
  };

  const onSubmit = async (formData) => {
    // Basic Validation
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

      await createResult(payload);
      show("success", "Result created successfully!");

      // Reset Form
      reset({ issue_date: getTodayDate(), session: "", selectedDuration: "" });
      flow.setSearchTerm("");
      loadHistory();
    } catch (err) {
      show("error", err.message || "Failed to save result");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {toast && <Toast {...toast} onClose={clear} />}

      {/* Main Creation Form */}
      <div className="bg-surface border border-border rounded-xl p-8 shadow-sm">
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
              <span>
                Admit Card missing for this student. Please generate it first.
              </span>
            </div>
          )}

          {selectedDuration && flow.subjects.length > 0 && (
            <MarksEntryTable subjects={flow.subjects} register={register} />
          )}

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || rollNo === "Not Generated"}
            >
              {isSubmitting ? (
                <FaSpinner className="animate-spin" />
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
                  onClick={() => handleEditClick(row)}
                  className="text-accent cursor-pointer hover:scale-110 transition-transform"
                  title="Edit Result"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="text-danger cursor-pointer hover:scale-110 transition-transform"
                  title="Delete Result"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            ),
          },
        ]}
      />

      {/* Edit Modal (Popup) */}
      <EditResultModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        resultData={selectedResultForEdit}
        onUpdate={loadHistory}
        showToast={show}
      />
    </div>
  );
}
