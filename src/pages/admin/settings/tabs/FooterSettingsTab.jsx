// src/pages/admin/settings/tabs/FooterSettingsTab.jsx
import { useState, useEffect } from "react";
import FormSection from "@/components/form/FormSection";
import FormInput from "@/components/form/FormInput";
import FormTextarea from "@/components/form/FormTextarea";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import {
  fetchFooterSettings,
  updateFooterSettings,
} from "@/api/settings/settingAPI";
import { useToast } from "@/context/ToastContext";

export default function FooterSettingsTab({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const { show } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await fetchFooterSettings();
      const finalData = res?.data || res;
      setInitialData(finalData);
      reset(finalData);
    } catch (err) {
      show("error", "Failed to load footer settings");
    }
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      await updateFooterSettings(data);
      onSuccess?.();
      show("success", "Footer settings updated");
    } catch (err) {
      show("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!initialData) {
    return (
      <div className="text-center py-20 text-muted animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <FormSection title="Footer Configuration" columns={2}>
        <FormInput
          label="Footer Title"
          name="footer_title"
          register={register}
          placeholder="Enter footer title"
        />
        <FormInput
          label="Copyright Text"
          name="copyright_text"
          register={register}
          placeholder="© 2024 Your Company"
        />
        <div className="sm:col-span-2">
          <FormTextarea
            label="Footer Description"
            name="footer_description"
            register={register}
            placeholder="Enter footer description"
          />
        </div>
      </FormSection>

      <FormSection title="Social Links" columns={2}>
        <FormInput
          label="Facebook URL"
          name="facebook_url"
          register={register}
          placeholder="https://facebook.com/..."
        />
        <FormInput
          label="Twitter URL"
          name="twitter_url"
          register={register}
          placeholder="https://twitter.com/..."
        />
        <FormInput
          label="LinkedIn URL"
          name="linkedin_url"
          register={register}
          placeholder="https://linkedin.com/..."
        />
        <FormInput
          label="Instagram URL"
          name="instagram_url"
          register={register}
          placeholder="https://instagram.com/..."
        />
      </FormSection>

      <Button
        type="submit"
        disabled={loading}
        className="bg-primary text-white"
      >
        {loading ? "Saving..." : "Update Footer"}
      </Button>
    </form>
  );
}
