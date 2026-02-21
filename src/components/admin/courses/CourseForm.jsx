import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";

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
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <FormSection title={mode === "edit" ? "Edit Course" : "Add Course"}>
        <select
          value={selectedFaculty}
          onChange={(e) => onFacultyChange(e.target.value)}
          className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text"
        >
          <option value="">Select Faculty</option>
          {facultyList.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>

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

        <select
          {...register("duration_type", {
            required: "Select duration type",
          })}
          className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text"
        >
          <option value="">Select Duration Type</option>
          <option value="Year">Year</option>
          <option value="Month">Month</option>
          <option value="years">years</option>
          <option value="months">months</option>
        </select>
      </FormSection>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-md text-white bg-primary"
        >
          {mode === "edit" ? "Update Course" : "Create Course"}
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
