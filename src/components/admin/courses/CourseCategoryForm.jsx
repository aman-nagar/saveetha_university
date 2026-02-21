// src/components/admin/courses/CourseCategoryForm.jsx

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";

export default function CourseCategoryForm({
  onSubmit,
  loading,
  initialData = null,
  mode = "create",
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Hydrate form when editing
  useEffect(() => {
    if (initialData) {
      reset({
        category: initialData.name,
      });
    } else {
      reset({
        category: "",
      });
    }
  }, [initialData, reset]);

  const onFormSubmit = async (data) => {
    await onSubmit(data);
    if (mode === "create") {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <FormSection
        title={
          mode === "edit" ? "Edit Course Category" : "Add New Course Category"
        }
      >
        <FormInput
          label="Category Name"
          name="category"
          register={register}
          required="Please enter a category name"
          error={errors.category?.message}
        />
      </FormSection>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || isSubmitting}
          className="px-6 py-2.5 rounded-md text-white bg-primary hover:bg-primary/90 transition"
        >
          {mode === "edit" ? "Update Category" : "Create Category"}
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
