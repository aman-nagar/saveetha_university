// src/components/admin/courses/SubjectForm.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";
import FormSelect from "../../form/FormSelect";
import { useCourseRules } from "../../../hooks/useCourseRules";
import Button from "../../ui/Button";

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
    setValue,
    formState: { errors },
  } = useForm();

  // Use the new hook
  const {
    durationOptions,
    courseType,
    loading: fetchingRules,
    getRulesByStreamId,
  } = useCourseRules();

  // 1. Hydrate Form
  useEffect(() => {
    if (initialData) {
      reset({ ...initialData });
      onStreamChange(initialData.stream_id);
    } else {
      // Set default values for create mode
      reset({
        status: "1", // Default to Active
      });
    }
  }, [initialData, reset, onStreamChange]);

  // 2. Sync Duration Options when selectedStream changes
  useEffect(() => {
    if (!selectedStream) return;

    const sync = async () => {
      try {
        const type = await getRulesByStreamId(selectedStream);
        if (type) {
          setValue("duration_type", type);
        }
      } catch (error) {
        console.error("Error fetching duration type:", error);
      }
    };
    sync();
  }, [selectedStream, getRulesByStreamId, setValue]);

  const submitForm = (data) => {
    if (!selectedStream) return;

    // Build clean payload with only required fields
    const payload = {
      stream_id: parseInt(selectedStream),
      subject_name: data.subject_name?.trim() || "",
      subject_code: data.subject_code?.trim() || "",
      short_name: data.short_name?.trim() || "",
      max_theory_marks: Number(data.max_theory_marks),
      max_practical_marks: Number(data.max_practical_marks),
      duration: Number(data.duration),
      duration_type: data.duration_type || "",
      status: Number(data.status || 0),
      is_deleted: 0,
    };

    // Only include id if editing
    if (initialData?.id) {
      payload.id = initialData.id;
    }

    onSubmit(payload);
    if (mode === "create") reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
      <FormSection
        title={mode === "edit" ? "Edit Subject" : "Add Subject"}
        columns={2}
      >
        {/* Stream select */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text">
            Select Stream *
          </label>
          <select
            value={selectedStream}
            onChange={(e) => onStreamChange(e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 bg-surface text-sm focus:ring-2 focus:ring-accent outline-none"
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
          required="Required"
          error={errors.subject_name}
        />
        <FormInput
          label="Subject Code"
          name="subject_code"
          register={register}
        />
        <FormInput label="Short Name" name="short_name" register={register} />
        <FormInput
          label="Max Theory"
          name="max_theory_marks"
          type="number"
          register={register}
        />
        <FormInput
          label="Max Practical"
          name="max_practical_marks"
          type="number"
          register={register}
        />

        {/* Dynamic Duration Select */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text">
            {fetchingRules ? "Syncing..." : `${courseType || "Duration"} *`}
          </label>
          <select
            {...register("duration", { required: "Please select duration" })}
            className={`w-full border rounded-lg px-3 py-2 bg-surface text-sm focus:ring-2 focus:ring-accent outline-none ${errors.duration ? "border-danger" : "border-border"}`}
          >
            <option value="">Select Part</option>
            {durationOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <input type="hidden" {...register("duration_type")} />

        {/* Hidden status field - always send status: 1 (Active) */}
        <input type="hidden" {...register("status")} value="1" />
      </FormSection>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-white bg-primary hover:bg-primary/90 transition text-sm sm:text-base font-medium shadow-sm"
        >
          {mode === "edit" ? "Update Subject" : "Create Subject"}
        </button>

        {mode === "edit" && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-border text-text hover:bg-bg transition text-sm sm:text-base"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
