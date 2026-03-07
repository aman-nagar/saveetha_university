// src/components/admin/courses/FacultyForm.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";
import Button from "../../ui/Button";

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
    <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
      <FormSection
        title={mode === "edit" ? "Edit Faculty" : "Add Faculty"}
        columns={2}
      >
        {/* Course Type select */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-text">
            Select Course Type <span className="text-danger">*</span>
          </label>
          <select
            value={selectedCourseType}
            onChange={(e) => onCourseChange(e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 sm:py-2.5 bg-surface text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200 hover:border-muted/50"
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

      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="submit">
          {mode === "edit" ? "Update Faculty" : "Create Faculty"}
        </Button>

        {mode === "edit" && (
          <Button
            onClick={onCancel}
            
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
