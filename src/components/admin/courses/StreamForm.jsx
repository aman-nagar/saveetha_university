// src/components/admin/courses/StreamForm.jsx
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";

export default function StreamForm({
  courseList = [],
  selectedCourse,
  onCourseChange,
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
      courseId: selectedCourse,
      name: data.stream,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <FormSection title="Add Stream">
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
          error={errors.stream?.message}
        />
      </FormSection>

      <button
        type="submit"
        disabled={!selectedCourse}
        className={`px-6 py-2.5 rounded-md text-white ${
          selectedCourse
            ? "bg-primary"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Create Stream
      </button>
    </form>
  );
}