// src/components/admin/courses/CourseCategoryForm.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";
import Button from "../../ui/Button";

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
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
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
          error={errors.category}
        />
      </FormSection>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="submit" disabled={loading || isSubmitting}>
          {mode === "edit" ? "Update Category" : "Create Category"}
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
