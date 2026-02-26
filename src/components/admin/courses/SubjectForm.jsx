import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";

export default function SubjectForm({
  streamList = [],
  selectedStream,
  onStreamChange,
  onSubmit,
  initialData = null,
  mode = "create",
  onCancel,
}) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (initialData) {
      reset({
        subject_name: initialData.subject_name,
        subject_code: initialData.subject_code,
        short_name: initialData.short_name,
        max_theory_marks: initialData.max_theory_marks,
        max_practical_marks: initialData.max_practical_marks,
        duration: initialData.duration,
        duration_type: initialData.duration_type,
        status: initialData.status ?? 1,
      });
      onStreamChange(initialData.stream_id);
    } else {
      reset();
    }
  }, [initialData, reset, onStreamChange]);

  const submitForm = async (data) => {
    if (!selectedStream) return;

    await onSubmit({
      id: initialData?.id,
      stream_id: selectedStream,
      subject_name: data.subject_name,
      subject_code: data.subject_code,
      short_name: data.short_name,
      max_theory_marks: Number(data.max_theory_marks),
      max_practical_marks: Number(data.max_practical_marks),
      duration: Number(data.duration),
      duration_type: data.duration_type,
      status: Number(data.status),
    });

    if (mode === "create") reset();
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
            className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text"
          >
            <option value="">Select Stream</option>
            {streamList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <FormInput label="Subject Name" name="subject_name" register={register} required="Required" />
        <FormInput label="Subject Code" name="subject_code" register={register} />
        <FormInput label="Short Name" name="short_name" register={register} />
        <FormInput label="Max Theory Marks" name="max_theory_marks" type="number" register={register} />
        <FormInput label="Max Practical Marks" name="max_practical_marks" type="number" register={register} />
        <FormInput label="Duration" name="duration" type="number" register={register} />

        {/* Duration Type */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-text">
            Duration Type *
          </label>
          <select
            {...register("duration_type", { required: true })}
            className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text"
          >
            <option value="year">Year</option>
            <option value="month">Month</option>
            <option value="semester">Semester</option>
          </select>
        </div>

        {/* Status */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-text">Status</label>
          <select
            {...register("status")}
            className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text"
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>

      </FormSection>

      <div className="flex gap-3">
        <button type="submit" className="px-6 py-2.5 rounded-md text-white bg-primary">
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