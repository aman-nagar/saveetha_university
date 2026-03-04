import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
} from "react-icons/fa";

export default function CreateResult() {
  const { toast, show, clear } = useToast();
  const { register, handleSubmit, setValue, watch, reset } = useForm();

  const flow = useAcademicFlow(setValue);
  const [history, setHistory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDuration = watch("selectedDuration");
  const enrollmentNo = watch("enrollmentNo");
  const rollNo = watch("rollNo"); // Watch the fetched roll number

  // ✅ Updated useEffect to handle both Subjects and Roll Number Auto-fetch
 useEffect(() => {
  if (selectedDuration && flow.studentId) {
    flow.loadSubjectsForPart(selectedDuration);
    flow.syncRollNoFromAdmitCard(selectedDuration);
  }
}, [selectedDuration, flow.studentId]); // Ensure studentId is a dependency

  const isDuplicate = history.some(
    (h) =>
      h.enrollment_no === enrollmentNo &&
      String(h.duration) === String(selectedDuration),
  );

  const onSubmit = async (formData) => {
    if (!enrollmentNo) return show("error", "Please select a student first.");
    if (!selectedDuration)
      return show("error", "Please select a Year/Semester.");
    if (rollNo === "Not Generated")
      return show(
        "error",
        "Cannot create result: Admit card not found for this Semester.",
      );
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
        roll_number: rollNo, // Send the fetched roll number
        marks: flow.subjects.map((sub) => ({
          subject_id: sub.id,
          obtained_marks: formData.marks?.[sub.id]?.obtained || 0,
        })),
      };

      console.log("Final Payload:", payload);
      // await createResultApi(payload); // Your actual API call here
      show("success", "Result created successfully!");
      reset();
      flow.setSearchTerm("");
    } catch (err) {
      show("error", err.message || "Failed to save result.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-6 space-y-6">
      {toast && <Toast {...toast} onClose={clear} />}
      <h1 className="text-2xl font-bold">Create Result</h1>

      <div className="bg-surface border border-border rounded-xl p-8 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
              <label className="text-sm font-semibold mb-2 block flex items-center gap-1 text-text-muted">
                Roll No.{" "}
                {rollNo && rollNo !== "Not Generated" && (
                  <FaCheckCircle className="text-green-500 text-xs" />
                )}
              </label>
              <div className="relative">
                <input
                  {...register("rollNo")}
                  className={`w-full border rounded-lg px-3 py-2 outline-none ${rollNo === "Not Generated" ? "border-danger text-danger bg-danger/5" : "border-border bg-bg/50 text-text-muted"}`}
                  readOnly
                  placeholder={
                    flow.isFetchingRoll
                      ? "Fetching..."
                      : "Auto-filled from Admit Card"
                  }
                />
                {flow.isFetchingRoll && (
                  <FaSpinner className="absolute right-3 top-3 animate-spin text-accent" />
                )}
              </div>
            </div>

            <FormInput
              label="Course"
              name="course"
              register={register}
              readOnly
            />
          </div>

          <hr className="border-border" />

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
        columns={[
          { key: "enrollment_no", label: "Enrollment" },
          { key: "candidate_name", label: "Student" },
          { key: "duration", label: "Year/Sem" },
        ]}
        data={history}
      />
    </div>
  );
}
