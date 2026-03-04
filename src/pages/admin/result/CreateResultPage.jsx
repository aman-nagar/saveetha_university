import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { useAcademicFlow } from "../../../hooks/useAcademicFlow";
import { useToast } from "../../../context/ToastContext";
import FormInput from "../../../components/form/FormInput";
import Button from "../../../components/ui/Button";
import Table from "../../../components/table/Table";
import Toast from "../../../components/ui/Toast";
import {
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaEdit,
} from "react-icons/fa";
import { getTodayDate } from "../../../utils/formHelpers";
import FormSelect from "../../../components/form/FormSelect";
import { createResult, deleteResult, fetchResults, updateResult } from "../../../api/results/resultApi";

export default function CreateResult() {
  const { toast, show, clear } = useToast();
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      issue_date: getTodayDate(),
    },
  });

  const flow = useAcademicFlow(setValue);
  const [history, setHistory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedDuration = watch("selectedDuration");
  const enrollmentNo = watch("enrollmentNo");
  const rollNo = watch("rollNo");
  const [loadingHistory, setLoadingHistory] = useState();
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (selectedDuration && flow.studentId) {
      flow.loadSubjectsForPart(selectedDuration);
      flow.syncRollNoFromAdmitCard(selectedDuration);
    }
  }, [selectedDuration, flow.studentId]);
  const loadHistory = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const response = await fetchResults();
      console.log(response);
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
  const isDuplicate = history.some(
    (h) =>
      h.enrollment_no === enrollmentNo &&
      String(h.duration) === String(selectedDuration),
  );

  const onSubmit = async (formData) => {
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

      if (editingId) {
        await updateResult(editingId, payload);
        show("success", "Result updated successfully!");
      } else {
        await createResult(payload);
        show("success", "Result created successfully!");
      }

      setEditingId(null);
      reset();
      flow.setSearchTerm("");
      loadHistory(); // Refresh the table
    } catch (err) {
      show("error", err.message || "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (record) => {
    setEditingId(record.id);

    // Fill search bar and trigger student select logic
    flow.setSearchTerm(record.enrollment_no);
    flow.selectStudent({
      id: record.student_id,
      enrollment_no: record.enrollment_no,
    });

    // Populate standard fields
    setValue("session", record.session);
    setValue("selectedDuration", String(record.duration));
    setValue("issue_date", record.issue_date);

    // Populate Marks (assuming record.subjects is returned by your API)
    if (record.subjects) {
      record.subjects.forEach((sub) => {
        setValue(`marks.${sub.subject_id}.theory`, sub.theory_marks);
        setValue(`marks.${sub.id}.practical`, sub.practical_marks);
      });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this result permanently?")) return;
    try {
      await deleteResult(id);
      show("success", "Result deleted");
      loadHistory();
    } catch (err) {
      show("error", "Delete failed");
    }
  };

  return (
    <div className="w-full space-y-6">
      {toast && <Toast {...toast} onClose={clear} />}
      <div className="bg-surface border border-border rounded-xl p-8 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <FormInput
                label="Enrollment No."
                name="enrollmentSearch"
                value={flow.searchTerm}
                placeholder="Search enrollment..."
                onChange={(e) => {
                  flow.setSearchTerm(e.target.value);
                  flow.setIsTyping(true);
                }}
              />

              {flow.showResults && flow.searchResults.length > 0 && (
                <div className="absolute z-50 w-full bg-surface border border-border rounded-lg shadow-xl mt-1 max-h-48 overflow-auto">
                  {flow.searchResults.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => flow.selectStudent(s)}
                      className="p-3 hover:bg-accent/10 cursor-pointer text-sm border-b border-border flex justify-between"
                    >
                      <span className="font-bold">{s.enrollment_no}</span>
                      <span className="text-text-muted">
                        {s.candidate_name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <div className="relative">
                <FormInput
                  label={
                    <>
                      Roll NO{" "}
                      {rollNo && rollNo !== "NOt Generated" && (
                        <FaCheckCircle className="text-green-500 text-xs" />
                      )}
                    </>
                  }
                  name="rollNo"
                  register={register}
                  readOnly
                  placeholder={
                    flow.isFetchingRoll
                      ? "Fetching..."
                      : "Auto-filled from Admit Card"
                  }
                  rightIcon={
                    flow.isFetchingRoll && (
                      <FaSpinner className="animate-spin text-accent" />
                    )
                  }
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <FormInput
                label="Course"
                name="course"
                register={register}
                readOnly
              />
              <FormInput
                label="Stream"
                name="stream"
                register={register}
                readOnly
              />
            </div>
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
              placeholder="e.g., 2025-26"
              required
            />
            <FormInput
              label="Issue Date"
              name="issue_date"
              type="date"
              register={register}
            />
            {/* <FormInput
              label="Serial No."
              name="serial_no"
              register={register}
              placeholder="Enter Serial No"
              required
            /> */}
          </div>

          {rollNo === "Not Generated" && (
            <div className="bg-danger/10 border border-danger/20 text-danger px-6 py-4 rounded-lg font-medium flex items-center gap-3">
              <FaExclamationTriangle />
              Admit Card not found for this student in {selectedDuration}{" "}
              {flow.courseType}. Please generate it first.
            </div>
          )}

          {selectedDuration && flow.subjects.length > 0 && (
            <div className="mt-8 border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-bg text-text-muted font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Subject Name</th>

                    <th className="px-6 py-4 w-40 text-center">Theory Marks</th>

                    <th className="px-6 py-4 w-40 text-center">
                      Practical Marks
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {flow.subjects.map((sub) => (
                    <tr key={sub.id} className="bg-surface hover:bg-bg/40">
                      <td className="px-6 py-4 font-semibold uppercase">
                        {sub.subject_name}
                      </td>

                      {/* THEORY MARKS */}
                      <td className="px-6 py-4">
                        <FormInput
                          label={`max ${sub.max_theory_marks}`}
                          type="number"
                          name={`marks.${sub.id}.theory`}
                          register={register}
                          min={0}
                          max={sub.max_theory_marks}
                          placeholder={sub.max_theory_marks}
                          required
                          rules={{
                            valueAsNumber: true,
                            onChange: (e) => {
                              const max = sub.max_theory_marks;
                              const v = Number(e.target.value);
                              if (v > max) e.target.value = max;
                            },
                          }}
                        />
                      </td>

                      {/* PRACTICAL MARKS */}
                      <td className="px-6 py-4">
                        <FormInput
                          label={`max ${sub.max_practical_marks}`}
                          type="number"
                          name={`marks.${sub.id}.practical`}
                          register={register}
                          min={0}
                          max={sub.max_practical_marks}
                          placeholder={sub.max_practical_marks}
                          required
                          rules={{
                            valueAsNumber: true,
                            onChange: (e) => {
                              const max = sub.max_practical_marks;
                              const v = Number(e.target.value);
                              if (v > max) e.target.value = max;
                            },
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={
                isSubmitting || isDuplicate || rollNo === "Not Generated"
              }
              className="px-10 py-3 text-lg font-bold"
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

   <Table
  title="Recent Records History"
  data={history}
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
            onClick={() => handleEdit(row)} 
            className="text-accent hover:opacity-70 transition"
          >
            <FaEdit size={16} title="Edit" />
          </button>
          <button 
            onClick={() => handleDelete(row.id)} 
            className="text-danger hover:opacity-70 transition"
          >
            <FaTrash size={16} title="Delete" />
          </button>
        </div>
      )
    }
  ]}
/>
    </div>
  );
}
