import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import Modal from "../../../components/ui/Modal";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import Button from "../../../components/ui/Button";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { fetchResultById, updateResult } from "../../../api/results/resultApi";
import { useCourseRules } from "../../../hooks/useCourseRules";

const EMPTY_FORM_STATE = {
  session: "",
  issue_date: "",
  selectedDuration: "",
  marks: {},
};

const toDateInputValue = (dateValue) => {
  if (!dateValue) return "";

  const rawValue = String(dateValue);
  if (/^\d{4}-\d{2}-\d{2}/.test(rawValue)) {
    return rawValue.slice(0, 10);
  }

  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
};

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

  // Dynamic duration options (Year/Semester) based on selected result course
  const {
    durationOptions,
    getRulesByCourseName,
    loading: loadingRules,
    courseType,
  } = useCourseRules();

  const { register, handleSubmit, reset } = useForm();

  // 1. Load full result details when modal opens (history list can be partial)
  useEffect(() => {
    if (!isOpen) {
      setEditableResult(null);
      reset(EMPTY_FORM_STATE);
      return;
    }

    if (!resultData?.id) {
      setEditableResult(resultData || null);
      return;
    }

    let isActive = true;

    const loadResultDetails = async () => {
      setLoadingDetails(true);
      setEditableResult(null);

      try {
        const response = await fetchResultById(resultData.id);
        const fullRecord = response?.data || response;

        if (!isActive) return;

        if (fullRecord && typeof fullRecord === "object") {
          setEditableResult({ ...resultData, ...fullRecord });
        } else {
          setEditableResult(resultData);
        }
      } catch (err) {
        if (!isActive) return;

        setEditableResult(resultData);
        showToast(
          "warning",
          "Could not load full details. Editing available fields only.",
        );
      } finally {
        if (isActive) setLoadingDetails(false);
      }
    };

    loadResultDetails();

    return () => {
      isActive = false;
    };
  }, [isOpen, reset, resultData, showToast]);

  // 2. Load duration rules by course name
  useEffect(() => {
    if (!isOpen || !editableResult) return;

    const courseName = editableResult.course_name || editableResult.course;
    if (courseName) {
      getRulesByCourseName(courseName);
    }
  }, [isOpen, editableResult, getRulesByCourseName]);

  // 3. Sync form values from editable result data
  useEffect(() => {
    if (!isOpen || !editableResult) return;

    const formattedMarks = {};

    editableResult.subjects?.forEach((sub) => {
      const subjectId = sub.subject_id ?? sub.id;
      if (!subjectId) return;

      formattedMarks[subjectId] = {
        theory: sub.theory_marks ?? sub.theory ?? 0,
        practical: sub.practical_marks ?? sub.practical ?? 0,
      };
    });

    reset({
      session: editableResult.session || "",
      issue_date: toDateInputValue(editableResult.issue_date),
      selectedDuration: editableResult.duration
        ? String(editableResult.duration)
        : "",
      marks: formattedMarks,
    });
  }, [isOpen, editableResult, reset]);

  const durationSelectOptions = useMemo(() => {
    if (durationOptions.length > 0) return durationOptions;
    if (!editableResult?.duration) return [];

    const fallbackType = editableResult.duration_type || courseType || "Part";

    return [
      {
        value: String(editableResult.duration),
        label: `${fallbackType} ${editableResult.duration}`,
      },
    ];
  }, [durationOptions, editableResult, courseType]);

  const subjects = editableResult?.subjects || [];

  const onSubmit = async (formData) => {
    if (!editableResult?.id) {
      showToast("error", "Unable to identify result to update.");
      return;
    }

    if (!formData.selectedDuration) {
      showToast("error", "Please select a duration.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        student_id: editableResult.student_id,
        enrollment_no: editableResult.enrollment_no,
        roll_no: editableResult.roll_no,
        course_id: editableResult.course_id,
        stream_id: editableResult.stream_id,
        duration: Number(formData.selectedDuration),
        duration_type: courseType || editableResult.duration_type,
        session: formData.session,
        issue_date: formData.issue_date,
        subjects: subjects.map((sub) => {
          const subjectId = sub.subject_id ?? sub.id;
          const theory = Number(formData.marks?.[subjectId]?.theory || 0);
          const practical = Number(formData.marks?.[subjectId]?.practical || 0);

          return {
            subject_id: subjectId,
            subject_name: sub.subject_name,
            theory_marks: theory,
            practical_marks: practical,
            total_marks: theory + practical,
          };
        }),
      };

      await updateResult(editableResult.id, payload);
      showToast("success", "Result updated successfully");
      onUpdate();
      onClose();
    } catch (err) {
      showToast("error", err.message || "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Student Result" size="full">
      {loadingDetails ? (
        <div className="py-14 flex items-center justify-center gap-3 text-muted">
          <FaSpinner className="animate-spin" />
          <span>Loading result details...</span>
        </div>
      ) : !editableResult ? (
        <div className="py-12 text-center text-muted">
          No result selected for editing.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 space-y-8 bg-surface"
        >
          {/* READ-ONLY INFO SECTION */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-5 bg-bg/40 rounded-xl border border-border/50">
            <div>
              <label className="text-[10px] uppercase font-bold text-muted tracking-wider">
                Enrollment
              </label>
              <p className="text-sm font-bold text-text mt-1">
                {editableResult.enrollment_no}
              </p>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-muted tracking-wider">
                Roll No
              </label>
              <p className="text-sm font-bold text-text mt-1">
                {editableResult.roll_no}
              </p>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-muted tracking-wider">
                Course
              </label>
              <p className="text-sm font-bold text-text mt-1">
                {editableResult.course_name || "N/A"}
              </p>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-muted tracking-wider">
                Current Duration
              </label>
              <p className="text-sm font-bold text-accent mt-1">
                {editableResult.duration_type} {editableResult.duration}
              </p>
            </div>
          </div>

          {/* EDITABLE METADATA SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormSelect
              label={`Select Duration (${courseType || editableResult.duration_type || "Part"})`}
              name="selectedDuration"
              register={register}
              options={durationSelectOptions}
              disabled={loadingRules}
              required
              placeholder={loadingRules ? "Loading..." : "Select duration"}
            />
            <FormInput
              label="Session"
              name="session"
              register={register}
              required
              placeholder="e.g. 2024-25"
            />
            <FormInput
              label="Issue Date"
              name="issue_date"
              type="date"
              register={register}
              required
            />
          </div>

          {durationSelectOptions.length === 0 && (
            <div className="bg-danger/10 border border-danger/20 text-danger px-6 py-4 rounded-lg flex items-center gap-3">
              <FaExclamationTriangle />
              <span>
                Duration rules could not be loaded for this course. Current
                duration will be used.
              </span>
            </div>
          )}

          {/* MARKS EDITING TABLE */}
          {subjects.length > 0 ? (
            <div className="border border-border rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-bg/60 text-muted font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Subject Name</th>
                    <th className="px-6 py-4 text-center w-40">Theory Marks</th>
                    <th className="px-6 py-4 text-center w-40">
                      Practical Marks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {subjects.map((sub) => {
                    const subjectId = sub.subject_id ?? sub.id;

                    return (
                      <tr
                        key={subjectId}
                        className="hover:bg-bg/20 transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold text-text">
                          {sub.subject_name}
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            min="0"
                            {...register(`marks.${subjectId}.theory`)}
                            className="w-full p-2 border border-border rounded-lg text-center bg-bg focus:ring-2 focus:ring-primary/50 outline-none"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            min="0"
                            {...register(`marks.${subjectId}.practical`)}
                            className="w-full p-2 border border-border rounded-lg text-center bg-bg focus:ring-2 focus:ring-primary/50 outline-none"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-danger/10 border border-danger/20 text-danger px-6 py-4 rounded-lg flex items-center gap-3">
              <FaExclamationTriangle />
              <span>No subjects found for this result. Cannot update marks.</span>
            </div>
          )}

          {/* FOOTER ACTIONS */}
          <div className="flex justify-end gap-4 pt-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-2.5 border border-border rounded-lg hover:bg-bg transition-all font-medium"
            >
              Cancel
            </button>
            <Button
              type="submit"
              disabled={
                isSubmitting || loadingRules || loadingDetails || subjects.length === 0
              }
              className="px-10"
            >
              {isSubmitting ? (
                <FaSpinner className="animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
