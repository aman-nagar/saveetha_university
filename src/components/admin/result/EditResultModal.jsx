import { useForm } from "react-hook-form";
import { useEffect, useState, useCallback } from "react";
import Modal from "../../../components/ui/Modal";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import Button from "../../../components/ui/Button";
import { FaSpinner, FaExclamationTriangle, FaDownload } from "react-icons/fa";

// APIs & Hooks
import { fetchResultById, updateResult } from "../../../api/results/resultApi";
import { fetchStudentById } from "../../../api/students/studentApi"; // ✅ To fix N/A bug
import { useCourseRules } from "../../../hooks/useCourseRules";
import { fetchAdmitCards } from "../../../api/students/admitCardApi";
import MarksEntryTable from "./MarksEntryTable"; // ✅ Reuse existing component
import { toDateInputValue } from "../../../utils/formHelpers";

export default function EditResultModal({
  isOpen,
  onClose,
  resultData,
  onUpdate,
  showToast,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [editableResult, setEditableResult] = useState(null);
  const [isFetchingRoll, setIsFetchingRoll] = useState(false);

  const {
    durationOptions,
    getRulesByCourseName,
    loading: loadingRules,
    courseType,
  } = useCourseRules();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const selectedDuration = watch("selectedDuration");

  // 1. Fetch Full Details & Resolve Student Names (Fixes N/A Bug)
  useEffect(() => {
    if (!isOpen || !resultData?.id) return;

    const loadFullData = async () => {
      setLoadingDetails(true);
      try {
        const res = await fetchResultById(resultData.id);
        const data = res?.data || res;

        // ✅ BUG FIX: If name/course is missing, fetch from student API
        if (data.student_id && (!data.student_name || !data.course_name)) {
          const studentRes = await fetchStudentById(data.student_id);
          const sData = studentRes.data || studentRes;
          data.student_name = sData.name;
          data.course_name = sData.course;
          data.stream_name = sData.stream;
        }
        setEditableResult(data);
      } catch (err) {
        showToast("error", "Failed to load result details");
      } finally {
        setLoadingDetails(false);
      }
    };

    loadFullData();
  }, [isOpen, resultData?.id]);

  // 2. Sync Form & Rules
  useEffect(() => {
    if (!editableResult) return;

    // Load duration options for the course
    getRulesByCourseName(editableResult.course_name || editableResult.course);

    // Map subject marks to react-hook-form structure
    const marks = {};
    editableResult.subjects?.forEach((sub) => {
      const id = sub.subject_id || sub.id;
      marks[id] = {
        theory: sub.theory_marks ?? 0,
        practical: sub.practical_marks ?? 0,
      };
    });

    reset({
      session: editableResult.session,
      issue_date: toDateInputValue(editableResult.issue_date),
      selectedDuration: String(editableResult.duration),
      marks,
    });
  }, [editableResult, reset, getRulesByCourseName]);

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        id: editableResult.id,
        duration: Number(formData.selectedDuration),
        duration_type: courseType || editableResult.duration_type,
        subjects: editableResult.subjects.map((sub) => {
          const id = sub.subject_id || sub.id;
          const t = Number(formData.marks[id]?.theory || 0);
          const p = Number(formData.marks[id]?.practical || 0);
          return {
            subject_id: id,
            subject_name: sub.subject_name,
            theory_marks: t,
            practical_marks: p,
            total_marks: t + p,
          };
        }),
      };

      await updateResult(editableResult.id, payload);
      showToast("success", "Result updated successfully");
      onUpdate();
      onClose();
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Student Result"
      size="full"
    >
      {loadingDetails ? (
        <div className="p-20 flex justify-center items-center gap-3">
          <FaSpinner className="animate-spin" /> Loading...
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
          {/* Info Header */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Student Name
              </label>
              <p className="font-bold text-slate-800">
                {editableResult?.student_name}
              </p>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Enrollment
              </label>
              <p className="font-bold text-slate-800">
                {editableResult?.enrollment_no}
              </p>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Course
              </label>
              <p className="font-bold text-slate-800">
                {editableResult?.course_name}
              </p>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Stream
              </label>
              <p className="font-bold text-blue-600">
                {editableResult?.stream_name}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormSelect
              label="Duration"
              name="selectedDuration"
              register={register}
              options={durationOptions}
            />
            <FormInput
              label="Session"
              name="session"
              register={register}
              required
            />
            <FormInput
              label="Issue Date"
              name="issue_date"
              type="date"
              register={register}
              required
            />
          </div>

          {/* Reused Table Component */}
          {editableResult?.subjects?.length > 0 ? (
            <MarksEntryTable
              subjects={editableResult.subjects}
              register={register}
              errors={errors}
            />
          ) : (
            <div className="p-10 text-center border-2 border-dashed rounded-2xl text-slate-400">
              No subjects found for this record.
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Update Result
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
