// src/components/admin/courses/SubjectForm.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";

const DURATION_TYPES = [
  { value: "year", label: "Year" },
  { value: "semester", label: "Semester" },
  { value: "month", label: "Month" },
];

export default function SubjectForm({
  streamList = [],
  selectedStream,
  onStreamChange,
  onSubmit,
  initialData = null,
  mode = "create",
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: 1,
      is_deleted: 0,
    },
  });

  const watchStatus = watch("status");

  useEffect(() => {
    if (initialData) {
      reset({
        subject_name: initialData.subject_name || "",
        subject_code: initialData.subject_code || "",
        short_name: initialData.short_name || "",
        max_theory_marks: initialData.max_theory_marks || 0,
        max_practical_marks: initialData.max_practical_marks || 0,
        duration: initialData.duration || 0,
        duration_type: initialData.duration_type || "year",
        status: initialData.status ?? 1,
      });
      onStreamChange(initialData.stream_id);
    } else {
      reset({
        subject_name: "",
        subject_code: "",
        short_name: "",
        max_theory_marks: 0,
        max_practical_marks: 0,
        duration: 0,
        duration_type: "year",
        status: 1,
      });
    }
  }, [initialData, reset, onStreamChange]);

  const submitForm = async (data) => {
    const payload = {
      stream_id: selectedStream,
      ...data,
      max_theory_marks: Number(data.max_theory_marks),
      max_practical_marks: Number(data.max_practical_marks),
      duration: Number(data.duration),
    };

    await onSubmit(payload);
    if (mode === "create") {
      reset({
        subject_name: "",
        subject_code: "",
        short_name: "",
        max_theory_marks: 0,
        max_practical_marks: 0,
        duration: 0,
        duration_type: "year",
        status: 1,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <FormSection title={mode === "edit" ? "Edit Subject" : "Add Subject"}>
        {/* Stream Select */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-text">
            Select Stream *
          </label>
          <select
            value={selectedStream}
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

        {/* Subject Name */}
        <FormInput
          label="Subject Name *"
          name="subject_name"
          register={register}
          required="Subject name is required"
          error={errors.subject_name}
        />

        {/* Subject Code */}
        <FormInput
          label="Subject Code"
          name="subject_code"
          register={register}
        />

        {/* Short Name */}
        <FormInput
          label="Short Name"
          name="short_name"
          register={register}
        />

        {/* Theory & Practical Marks - Side by side */}
        <div className="grid grid-cols-2 gap-4">
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
        </div>

        {/* Duration & Type - Side by side */}
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Duration"
            name="duration"
            type="number"
            register={register}
          />
          <div className="space-y-1">
            <label className="text-sm font-medium text-text">
              Duration Type
            </label>
            <select
              {...register("duration_type")}
              className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {DURATION_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Toggle */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-text">Status</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => reset({ ...watch(), status: 1 })}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                watchStatus === 1
                  ? "bg-success text-white"
                  : "bg-bg border border-border text-muted"
              }`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => reset({ ...watch(), status: 0 })}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                watchStatus === 0
                  ? "bg-danger text-white"
                  : "bg-bg border border-border text-muted"
              }`}
            >
              Inactive
            </button>
          </div>
          <input type="hidden" {...register("status")} />
        </div>
      </FormSection>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!selectedStream}
          className="px-6 py-2.5 rounded-md text-white bg-primary hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mode === "edit" ? "Update Subject" : "Create Subject"}
        </button>
        {mode === "edit" && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-md border border-border hover:bg-bg transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}