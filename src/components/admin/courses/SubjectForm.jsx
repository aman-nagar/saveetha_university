// src/components/admin/courses/SubjectForm.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";
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
      reset();
    }
  }, [initialData, reset, onStreamChange]);

  // 2. Sync Duration Options when selectedStream changes
  useEffect(() => {
    const sync = async () => {
      const type = await getRulesByStreamId(selectedStream);
      if (type) setValue("duration_type", type);
    };
    sync();
  }, [selectedStream, getRulesByStreamId, setValue]);

  const submitForm = (data) => {
    if (!selectedStream) return;
    onSubmit({
      ...data,
      id: initialData?.id,
      stream_id: selectedStream,
      max_theory_marks: Number(data.max_theory_marks),
      max_practical_marks: Number(data.max_practical_marks),
      duration: Number(data.duration),
    });
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
      </FormSection>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="submit">
          {mode === "edit" ? "Update Subject" : "Create Subject"}
        </Button>

        {mode === "edit" && (
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
