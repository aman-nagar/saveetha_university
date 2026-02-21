// src/components/admin/courses/CourseForm.jsx
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";

export default function CourseForm({
  facultyList = [],
  selectedFaculty,
  onFacultyChange,
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm = async (data) => {
    await onSubmit({
      facultyId: selectedFaculty,
      name: data.course,
      duration: Number(data.duration),
      durationType: data.duration_type,
    });

    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <FormSection title="Add Course">
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
          error={errors.course?.message}
        />

        <FormInput
          label="Duration"
          name="duration"
          type="number"
          register={register}
          required="Enter duration"
          error={errors.duration?.message}
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
          <option value="Semester">Semester</option>
        </select>

        {errors.duration_type && (
          <p className="text-sm text-red-500">{errors.duration_type.message}</p>
        )}
      </FormSection>

      <button
        type="submit"
        disabled={!selectedFaculty}
        className={`px-6 py-2.5 rounded-md text-white ${
          selectedFaculty ? "bg-primary" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Create Course
      </button>
    </form>
  );
}
