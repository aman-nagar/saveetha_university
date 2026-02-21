// src/components/admin/courses/FacultyForm.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";

export default function FacultyForm({
  courseTypes = [],
  selectedCourseType,
  onCourseChange,
  onSubmit,
  initialData = null,
  mode = "create",
  onCancel,
}) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (initialData) {
      reset({
        faculty: initialData.name,
      });
      onCourseChange(initialData.course_type_id);
    } else {
      reset({ faculty: "" });
    }
  }, [initialData, reset, onCourseChange]);

  const submitForm = async (data) => {
    await onSubmit(data.faculty);
    if (mode === "create") reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <FormSection title={mode === "edit" ? "Edit Faculty" : "Add Faculty"}>
        {/* Wrapped select in space-y-1 with label for alignment consistency */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-text">
            Select Course Type *
          </label>
          <select
            value={selectedCourseType}
            onChange={(e) => onCourseChange(e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">Select Course Type</option>
            {courseTypes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <FormInput
          label="Faculty Name"
          name="faculty"
          register={register}
          required="Enter faculty name"
        />
      </FormSection>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-md text-white bg-primary"
        >
          {mode === "edit" ? "Update Faculty" : "Create Faculty"}
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
