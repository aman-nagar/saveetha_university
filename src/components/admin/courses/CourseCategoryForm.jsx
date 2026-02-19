// src/components/admin/courses/CourseCategoryForm.jsx
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";

export default function CourseCategoryForm({ onSubmit, loading }) {
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FormSection title="Add Category">
        <FormInput
          label="Course Category Title"
          name="category"
          register={register}
          required
          placeholder="Add category"
        />
      </FormSection>

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-6 py-2 rounded-md hover:opacity-90 transition mt-4"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
