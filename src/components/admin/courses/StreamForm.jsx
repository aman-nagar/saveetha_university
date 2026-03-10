// src/components/admin/courses/StreamForm.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";
import Button from "../../ui/Button";

export default function StreamForm({
  courseList = [],
  selectedCourse,
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
    <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
      <FormSection
        title={mode === "edit" ? "Edit Stream" : "Add Stream"}
        columns={3}
      >
        {/* Course select */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-text">
            Select Course <span className="text-danger">*</span>
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => onCourseChange(e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 sm:py-2.5 bg-surface text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200 hover:border-muted/50"
          >
            <option value="">Select Course</option>
            {courseList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <FormInput
          label="Stream Name"
          name="stream"
          register={register}
          required="Enter stream name"
        />
        <FormInput
          type="number"
          label="Stream Fees"
          name="stream_fees"
          register={register}
          required="Enter Fees Amount"
        />
      </FormSection>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="submit">
          {mode === "edit" ? "Update Stream" : "Create Stream"}
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
