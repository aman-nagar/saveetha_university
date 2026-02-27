// src/components/admin/courses/CourseForm.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";
import { FiAlertCircle } from "react-icons/fi";

export default function CourseForm({
  facultyList = [],
  selectedFaculty,
  onFacultyChange,
  onSubmit,
  initialData = null,
  mode = "create",
  onCancel,
}) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (initialData) {
      reset({
        course: initialData.name,
        duration: initialData.duration,
        duration_type: initialData.duration_type,
      });
      onFacultyChange(initialData.faculty_id);
    } else {
      reset({
        course: "",
        duration: "",
        duration_type: "",
      });
    }
  }, [initialData, reset, onFacultyChange]);

  const submitForm = async (data) => {
    await onSubmit({
      facultyId: selectedFaculty,
      name: data.course,
      duration: Number(data.duration),
      durationType: data.duration_type,
    });

    if (mode === "create") reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
      <FormSection title={mode === "edit" ? "Edit Course" : "Add Course"} columns={2}>
        {/* Faculty select */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-text">
            Select Faculty <span className="text-danger">*</span>
          </label>
          <select
            value={selectedFaculty}
            onChange={(e) => onFacultyChange(e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 sm:py-2.5 bg-surface text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200 hover:border-muted/50"
          >
            <option value="">Select Faculty</option>
            {facultyList.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        <FormInput
          label="Course Name"
          name="course"
          register={register}
          required="Enter course name"
        />

        <FormInput
          label="Duration"
          name="duration"
          type="number"
          register={register}
          required="Enter duration"
        />

        {/* Duration Type select */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-text">
            Duration Type <span className="text-danger">*</span>
          </label>
          <select
            {...register("duration_type", {
              required: "Select duration type",
            })}
            className="w-full border border-border rounded-lg px-3 py-2 sm:py-2.5 bg-surface text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200 hover:border-muted/50"
          >
            <option value="">Select Duration Type</option>
            <option value="Year">Year</option>
            <option value="Month">Month</option>
            <option value="Semester">Semester</option>
          </select>
        </div>
      </FormSection>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-white bg-primary hover:bg-primary/90 transition text-sm sm:text-base font-medium"
        >
          {mode === "edit" ? "Update Course" : "Create Course"}
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
