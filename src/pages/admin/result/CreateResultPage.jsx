import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAcademicFlow } from "../../../hooks/useAcademicFlow";
import { useToast } from "../../../hooks/useToast";
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
} from "react-icons/fa";

export default function CreateResult() {
  const { toast, show, clear } = useToast();
  const { register, handleSubmit, setValue, watch, reset } = useForm();

  const flow = useAcademicFlow(setValue);
  const [history, setHistory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDuration = watch("selectedDuration");
  const enrollmentNo = watch("enrollmentNo");

  // Load subjects when Part changes
  useEffect(() => {
    if (selectedDuration) {
      flow.loadSubjectsForPart(selectedDuration);
    }
  }, [selectedDuration, flow.loadSubjectsForPart]);

  const isDuplicate = history.some(
    (h) =>
      h.enrollment_no === enrollmentNo &&
      String(h.duration) === String(selectedDuration),
  );

  const onSubmit = async (formData) => {
    console.log("=== RESULT SUBMIT DEBUG ===");
    console.log("enrollmentNo:", enrollmentNo);
    console.log("studentId:", flow.studentId);
    console.log("selectedDuration:", selectedDuration);
    console.log("rollNo from form:", formData.rollNo);
    console.log("session:", formData.session);
    console.log("subjects:", flow.subjects);
    console.log("formData.marks:", formData.marks);
    if (!enrollmentNo) return show("error", "Please select a student first.");
    if (!selectedDuration)
      return show("error", "Please select a Year/Semester.");
    if (isDuplicate)
      return show("error", "Result already exists for this selection.");

    setIsSubmitting(true);
    try {
      const payload = {
        student_id: flow.studentId,
        duration: Number(selectedDuration),
        session: formData.session,
        serial_no: formData.serial_no,
        issue_date: formData.issue_date,
        marks: flow.subjects.map((sub) => ({
          subject_id: sub.id,
          obtained_marks: formData.marks?.[sub.id]?.obtained || 0,
        })),
      };

      // API Integration point
      console.log("Final Payload:", payload);
      show("success", "Result created successfully!");
      reset();
      flow.setSearchTerm("");
    } catch (err) {
      show("error", "Failed to save result.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-6 space-y-6 bg-bg text-text transition-colors duration-300">
      {toast && <Toast {...toast} onClose={clear} />}

      <h1 className="text-2xl font-bold">Create Result</h1>

      <div className="bg-surface border border-border rounded-xl p-8 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Student Identification */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <label className="text-sm font-semibold mb-2 block text-text-muted">
                Enrollment No.
              </label>
              <input
                value={flow.searchTerm}
                onChange={(e) => {
                  flow.setSearchTerm(e.target.value);
                  flow.setIsTyping(true);
                }}
                className="w-full border border-border rounded-lg px-3 py-2 bg-bg outline-none focus:ring-2 focus:ring-accent transition-all"
                placeholder="Search enrollment..."
              />
              {flow.showResults && (
                <div className="absolute z-50 w-full bg-surface border border-border rounded-lg shadow-xl mt-1 max-h-48 overflow-auto">
                  {flow.searchResults.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => flow.selectStudent(s)}
                      className="p-3 hover:bg-accent/10 cursor-pointer text-sm border-b border-border last:border-none flex justify-between"
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
              <label className="text-sm font-semibold mb-2 block flex items-center gap-1 text-text-muted">
                Roll No. <FaCheckCircle className="text-green-500 text-xs" />
              </label>
              <input
                {...register("rollNo")}
                className="w-full border border-border rounded-lg px-3 py-2 bg-bg/50 text-text-muted cursor-not-allowed"
                readOnly
              />
            </div>

            <FormInput
              label="Course"
              name="course"
              register={register}
              readOnly
            />
          </div>

          <hr className="border-border" />

          {/* Section 2: Result Metadata (Moved above Subject Table) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-text-muted block">
                Duration ({flow.courseType || "Part"})
              </label>
              <select
                {...register("selectedDuration")}
                className="w-full border border-border rounded-lg px-3 py-2 bg-bg text-sm outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">-- Select --</option>
                {flow.durationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <FormInput
              label="Serial No."
              name="serial_no"
              register={register}
              placeholder="Enter Serial No"
            />

            <FormInput
              label="Issue Date"
              name="issue_date"
              type="date"
              register={register}
            />

            <FormInput
              label="Session"
              name="session"
              register={register}
              placeholder="e.g., 2025-26"
            />
          </div>

          {isDuplicate && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-lg font-medium flex items-center gap-3 animate-in fade-in">
              <FaExclamationTriangle />
              Result already exists for this student in {selectedDuration}{" "}
              {flow.courseType}.
            </div>
          )}

          {/* Section 3: Subject Marks Table */}
          {selectedDuration && flow.subjects.length > 0 && (
            <div className="mt-8 border border-border rounded-lg overflow-hidden animate-in fade-in slide-in-from-top-2">
              <table className="w-full text-sm text-left">
                <thead className="bg-bg text-text-muted font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Subject Name</th>
                    <th className="px-6 py-4 w-48 text-center">
                      Marks Obtained
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {flow.subjects.map((sub) => (
                    <tr key={sub.id} className="bg-surface hover:bg-bg/40">
                      <td className="px-6 py-4 font-semibold uppercase">
                        {sub.subject_name}
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          placeholder="Marks"
                          {...register(`marks.${sub.id}.obtained`)}
                          className="w-full p-2 border border-border rounded bg-bg text-center focus:ring-2 focus:ring-accent outline-none font-bold"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || isDuplicate}
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

      {/* History Table remains at the bottom */}
      <Table
        title="Recent Records History"
        columns={[
          { key: "enrollment_no", label: "Enrollment" },
          { key: "candidate_name", label: "Student" },
          { key: "duration", label: "Year/Sem" },
          {
            key: "actions",
            label: "Action",
            render: (r) => (
              <div className="flex gap-2">
                <button className="p-2 bg-green-600/10 text-green-600 rounded hover:bg-green-600 hover:text-white transition-all">
                  <FaEye size={12} />
                </button>
                <button className="p-2 bg-red-600/10 text-red-600 rounded hover:bg-red-600 hover:text-white transition-all">
                  <FaTrash size={12} />
                </button>
              </div>
            ),
          },
        ]}
        data={history}
      />
    </div>
  );
}
