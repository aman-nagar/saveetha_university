import { useForm } from "react-hook-form";
import { useEffect } from "react";
import FormInput from "../../form/FormInput";
import FormTextarea from "../../form/FormTextarea";
import FormFileInput from "../../form/FormFileInput";
import FormSection from "../../form/FormSection";
import Button from "../../ui/Button";

export default function SettingsForm({ onSubmit, loading, initialData }) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (initialData) {
      console.log("🔄 FORM RESET: Populating inputs with initialData...");
      reset(initialData);
    }
  }, [initialData, reset]);

  const submitHandler = async (data) => {
    console.log("📝 FORM DATA CAPTURED:", data);
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      // 1. Logic for File inputs
      if (["logo", "additional_logo", "favicon"].includes(key)) {
        if (data[key] && data[key][0] instanceof File) {
          console.log(`📎 ATTACHING FILE: ${key}`);
          formData.append(key, data[key][0]);
        }
      } else {
        // 2. Logic for text inputs (exclude null/undefined)
        const value = data[key] === null ? "" : data[key];
        formData.append(key, value);
      }
    });

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      {/* (All form inputs remain exactly as before) */}
      <FormSection title="Basic Information" columns={2}>
        <FormInput
          label="College Name"
          name="college_name"
          register={register}
          required
        />
        <FormInput label="Short Name" name="short_name" register={register} />
        <FormInput
          label="Email"
          name="email"
          register={register}
          type="email"
        />
        <FormInput label="Phone" name="phone" register={register} />
        <FormInput
          label="Alternate Phone"
          name="alternate_phone"
          register={register}
        />
        <div className="sm:col-span-2">
          <FormTextarea label="Address" name="address" register={register} />
        </div>
      </FormSection>

      <FormSection title="Branding" columns={2}>
        <FormFileInput
          label="Logo"
          name="logo"
          register={register}
          existingUrl={initialData?.logo}
        />
        <FormFileInput
          label="Additional Logo"
          name="additional_logo"
          register={register}
          existingUrl={initialData?.additional_logo}
        />
        <FormFileInput
          label="Favicon"
          name="favicon"
          register={register}
          existingUrl={initialData?.favicon}
        />
      </FormSection>

      <Button
        type="submit"
        disabled={loading}
        
      >
        {loading ? "Saving..." : "Update Settings"}
      </Button>
    </form>
  );
}
