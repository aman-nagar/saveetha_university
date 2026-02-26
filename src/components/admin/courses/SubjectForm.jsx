// src/components/admin/courses/SubjectForm.jsx
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
        subject: initialData.subject_name || initialData.name || "",
      });
      onStreamChange(initialData.stream_id);
    } else {
      reset({ subject: "" });
    }
  }, [initialData, reset, onStreamChange]);

  const submitForm = async (data) => {
    await onSubmit({
      streamId: selectedStream,
      name: data.subject,
    });
    if (mode === "create") reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <FormSection title={mode === "edit" ? "Edit Subject" : "Add Subject"}>
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

        <FormInput
          label="Subject Name"
          name="subject"
          register={register}
          required="Subject name is required"
        />
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