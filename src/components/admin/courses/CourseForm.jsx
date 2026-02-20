// src/components/admin/courses/CourseForm.jsx
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";
import Button from "../../ui/Button";

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
    await onSubmit(data.course);
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
          placeholder="e.g. B.Sc, B.Com..."
        />
      </FormSection>

      <Button type="submit" disabled={!selectedFaculty}>
        Create Course
      </Button>
    </form>
  );
}
