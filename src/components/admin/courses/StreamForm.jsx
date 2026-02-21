// src/components/admin/courses/StreamForm.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";

export default function StreamForm({
  courseList = [],
  selectedCourse,
  onCourseChange,
  onSubmit,
  initialData = null,
  mode = "create",
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (initialData) {
      reset({
        stream: initialData.name,
      });
      onCourseChange(initialData.course_id);
    } else {
      reset({ stream: "" });
    }
  }, [initialData, reset, onCourseChange]);

  const submitForm = async (data) => {
    await onSubmit({
      courseId: selectedCourse,
      name: data.stream,
    });

    if (mode === "create") reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <FormSection
        title={mode === "edit" ? "Edit Stream" : "Add Stream"}
      >
        <select
          value={selectedCourse}
          onChange={(e) => onCourseChange(e.target.value)}
          className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text"
        >
          <option value="">Select Course</option>
          {courseList.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <FormInput
          label="Stream Name"
          name="stream"
          register={register}
          required="Enter stream name"
        />
      </FormSection>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-md text-white bg-primary"
        >
          {mode === "edit" ? "Update Stream" : "Create Stream"}
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