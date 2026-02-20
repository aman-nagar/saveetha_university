// src/components/admin/courses/CourseCategoryForm.jsx
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";

export default function CourseCategoryForm({ onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <FormSection title="Add New Course Category">
        <FormInput
          label="Category Name"
          name="category"
          register={register}
          required="Please enter a category name"
          placeholder="e.g. Under Graduate, Diploma, Certificate..."
          error={errors.category?.message}
        />
      </FormSection>

      <div>
        <button
          type="submit"
          disabled={loading || isSubmitting}
          className={`px-6 py-2.5 rounded-md text-white font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            loading || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90 focus:ring-primary/50"
          }`}
        >
          {loading || isSubmitting ? "Creating..." : "Create Category"}
        </button>
      </div>
    </form>
  );
}
