// src/components/admin/courses/SubjectForm.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";
import FormSelect from "../../form/FormSelect";

export default function SubjectForm({
  streamList = [],
  selectedStream,
  onStreamChange,
  onSubmit,
  initialData = null,
  mode = "create",
  onCancel,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      subject_name: "",
      subject_code: "",
      short_name: "",
      max_theory_marks: "",
      max_practical_marks: "",
      duration: "",
      duration_type: "",
      status: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        subject_name: initialData.subject_name || "",
        subject_code: initialData.subject_code || "",
        short_name: initialData.short_name || "",
        max_theory_marks: initialData.max_theory_marks || "",
        max_practical_marks: initialData.max_practical_marks || "",
        duration: initialData.duration || "",
        duration_type: initialData.duration_type || "",
        status: initialData.status === 1,
      });
      onStreamChange(initialData.stream_id);
    } else {
      reset({
        subject_name: "",
        subject_code: "",
        short_name: "",
        max_theory_marks: "",
        max_practical_marks: "",
        duration: "",
        duration_type: "",
        status: true,
      });
    }
  }, [initialData, reset, onStreamChange]);

  const submitForm = async (data) => {
    const payload = {
      stream_id: selectedStream,
      subject_name: data.subject_name,
      subject_code: data.subject_code,
      short_name: data.short_name,
      max_theory_marks: data.max_theory_marks
        ? Number(data.max_theory_marks)
        : 0,
      max_practical_marks: data.max_practical_marks
        ? Number(data.max_practical_marks)
        : 0,
      duration: data.duration ? Number(data.duration) : 0,
      duration_type: data.duration_type,
      status: data.status ? 1 : 0,
    };
    if (mode === "edit" && initialData) {
      payload.id = initialData.id;
    }
    await onSubmit(payload);
    if (mode === "create") reset();
  };

  const durationOptions = [
    { label: "Year", value: "Year" },
    { label: "Month", value: "Month" },
    { label: "Semester", value: "Semester" },
  ];

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <FormSection title={mode === "edit" ? "Edit Subject" : "Add Subject"}>
        <div className="space-y-1">
          <label className="text-sm font-medium text-text">
            Select Stream *
          </label>
          <select
            value={selectedStream || ""}
            onChange={(e) => onStreamChange(e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text focus:outline-none focus:ring-2 focus:ring-accent"
            required
          >
            <option value="">Select Stream</option>
            {streamList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <FormInput
          label="Subject Name"
          name="subject_name"
          register={register}
          required="Subject name is required"
        />

        <FormInput
          label="Subject Code"
          name="subject_code"
          register={register}
        />

        <FormInput label="Short Name" name="short_name" register={register} />

        <FormInput
          label="Max Theory Marks"
          name="max_theory_marks"
          type="number"
          register={register}
        />

        <FormInput
          label="Max Practical Marks"
          name="max_practical_marks"
          type="number"
          register={register}
        />

        <FormInput
          label="Duration"
          name="duration"
          type="number"
          register={register}
        />

        <FormSelect
          label="Duration Type"
          name="duration_type"
          register={register}
          options={durationOptions}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="status"
            {...register("status")}
            className="w-4 h-4 text-primary border-border rounded focus:ring-accent"
          />
          <label htmlFor="status" className="text-sm font-medium text-text">
            Active
          </label>
        </div>
      </FormSection>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-md text-white bg-primary hover:bg-primary/90 transition"
        >
          {mode === "edit" ? "Update Subject" : "Create Subject"}
        </button>
        {mode === "edit" && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-md border border-border"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
