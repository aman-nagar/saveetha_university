// src/pages/admin/settings/tabs/CoreSettingsTab.jsx
import { useState, useEffect } from "react";
import SettingsForm from "@/components/admin/settings/site-settings-forms/SettingsForm";
import {
  fetchCoreSettings,
  updateCoreSettings,
} from "@/api/settings/settingAPI";
import { useToast } from "@/context/ToastContext";

export default function CoreSettingsTab({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const { show } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await fetchCoreSettings();
      const finalData = res?.data || res;
      setInitialData(finalData);
    } catch (err) {
      show("error", "Failed to load core settings");
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await updateCoreSettings(formData);
      onSuccess?.();
      await loadSettings();
    } catch (err) {
      show("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return initialData ? (
    <SettingsForm
      onSubmit={handleSubmit}
      loading={loading}
      initialData={initialData}
    />
  ) : (
    <div className="text-center py-20 text-muted animate-pulse">
      Loading core settings...
    </div>
  );
}
