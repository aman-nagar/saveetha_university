// src/components/admin/courses/FacultyForm.jsx
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";

export default function FacultyForm({
  courseTypes = [],
  selectedCourseType,
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
    await onSubmit(data.faculty);
    reset();
  };

  const options = courseTypes.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <FormSection title="Add Faculty">
        <select
          value={selectedCourseType}
          onChange={(e) => onCourseChange(e.target.value)}
          className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text"
        >
          <option value="">Select Course Type</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <FormInput
          label="Faculty Name"
          name="faculty"
          register={register}
          required="Enter faculty name"
          placeholder="e.g. Science, Commerce..."
        />
      </FormSection>

      <div>
        <button
          type="submit"
          disabled={!selectedCourseType}
          className={`px-6 py-2.5 rounded-md text-white ${
            selectedCourseType ? "bg-primary" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Create Faculty
        </button>
      </div>
    </form>
  );
}
