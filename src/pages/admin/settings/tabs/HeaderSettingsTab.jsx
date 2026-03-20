// src/pages/admin/settings/tabs/HeaderSettingsTab.jsx
import { useState, useEffect } from "react";
import FormSection from "@/components/form/FormSection";
import FormInput from "@/components/form/FormInput";
import FormTextarea from "@/components/form/FormTextarea";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import {
  fetchHeaderSettings,
  updateHeaderSettings,
} from "@/api/settings/settingAPI";
import { useToast } from "@/context/ToastContext";

export default function HeaderSettingsTab({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const { show } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await fetchHeaderSettings();
      const finalData = res?.data || res;
      setInitialData(finalData);
      reset(finalData);
    } catch (err) {
      show("error", "Failed to load header settings");
    }
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      await updateHeaderSettings(data);
      onSuccess?.();
      show("success", "Header settings updated");
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
      <FormSection title="Header Configuration" columns={2}>
        <FormInput
          label="Header Title"
          name="header_title"
          register={register}
          placeholder="Enter header title"
        />
        <FormInput
          label="Tagline"
          name="tagline"
          register={register}
          placeholder="Enter tagline"
        />
        <div className="sm:col-span-2">
          <FormTextarea
            label="Header Description"
            name="header_description"
            register={register}
            placeholder="Enter header description"
          />
        </div>
      </FormSection>

      <Button
        type="submit"
        disabled={loading}
        className="bg-primary text-white"
      >
        {loading ? "Saving..." : "Update Header"}
      </Button>
    </form>
  );
}
