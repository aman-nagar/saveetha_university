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
      className="bg-surface border border-border rounded-xl p-6 space-y-8"
    >
      <FormSection title="Basic Information">
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

        <div className="md:col-span-2">
          <FormTextarea
            label="Address"
            name="address"
            register={register}
            placeholder="Address"
          />
        </div>
      </FormSection>

      <FormSection title="Branding">
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
        className="bg-primary text-white px-6 py-2 rounded-md hover:opacity-90 transition"
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
