// src/components/admin/settings/SettingsForm.jsx
import { useForm } from "react-hook-form";
import FormInput from "../../form/FormInput";
import FormTextarea from "../../form/FormTextarea";
import FormFileInput from "../../form/FormFileInput";
import FormSection from "../../form/FormSection";

export default function SettingsForm({ onSubmit, loading }) {
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key]) {
        if (data[key][0] instanceof File) {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }
    });

    await onSubmit(formData);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-6"
    >
      <FormSection title="Basic Information" columns={2}>
        <FormInput
          label="College Name"
          name="college_name"
          register={register}
          required
          placeholder="College Name"
        />

        <FormInput
          label="Short Name"
          name="short_name"
          register={register}
          placeholder="Short Name"
        />

        <FormInput
          label="Email"
          name="email"
          register={register}
          type="email"
          placeholder="Email"
        />

        <FormInput
          label="Phone"
          name="phone"
          register={register}
          placeholder="Phone"
        />

        <FormInput
          label="Alternate Phone"
          name="alternate_phone"
          register={register}
          placeholder="Alternate Phone"
        />

        {/* Address spans full width */}
        <div className="sm:col-span-2">
          <FormTextarea
            label="Address"
            name="address"
            register={register}
            placeholder="Address"
          />
        </div>
      </FormSection>

      <FormSection title="Branding" columns={2}>
        <FormFileInput label="Logo" name="logo" register={register} />

        <FormFileInput
          label="Additional Logo"
          name="additional_logo"
          register={register}
        />

        <FormFileInput label="Favicon" name="favicon" register={register} />
      </FormSection>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-lg text-sm sm:text-base font-medium hover:bg-primary/90 transition disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
