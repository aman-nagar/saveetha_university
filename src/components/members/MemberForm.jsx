import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../form/FormInput";
import Button from "../ui/Button";

export default function MemberForm({
  initialData = null,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const isEditMode = Boolean(initialData?.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      number: "",
      password: "",
    },
  });

  useEffect(() => {
    reset({
      name: initialData?.name || "",
      email: initialData?.email || "",
      number: initialData?.number || initialData?.mobile || "",
      password: "",
    });
  }, [initialData, reset]);

  const submitForm = (values) => {
    onSubmit({
      id: initialData?.id,
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      number: values.number.trim(),
      password: values.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      <FormInput
        label="Member Name"
        name="name"
        register={register}
        required="Member name is required"
        error={errors.name}
        placeholder="Enter member name"
      />

      <FormInput
        label="Email Address"
        name="email"
        register={register}
        required="Email is required"
        rules={{
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        }}
        error={errors.email}
        type="email"
        placeholder="member@example.com"
      />

      <FormInput
        label="Phone Number"
        name="number"
        register={register}
        required="Phone number is required"
        rules={{
          pattern: {
            value: /^[0-9]{10,15}$/,
            message: "Enter a valid phone number",
          },
        }}
        error={errors.number}
        placeholder="9876543210"
        inputMode="numeric"
      />

      <FormInput
        label={isEditMode ? "Password (Optional)" : "Password"}
        name="password"
        register={register}
        required={isEditMode ? false : "Password is required"}
        rules={{
          validate: (value) =>
            !value || value.length >= 6 || "Password must be at least 6 characters",
        }}
        error={errors.password}
        type="password"
        placeholder={
          isEditMode ? "Leave blank to keep current password" : "Enter password"
        }
      />

      {isEditMode && (
        <div className="rounded-lg border border-border bg-bg px-3 py-2 text-xs text-muted">
          Leave the password field empty if you do not want to change it.
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {isEditMode ? "Update Member" : "Create Member"}
        </Button>
      </div>
    </form>
  );
}
