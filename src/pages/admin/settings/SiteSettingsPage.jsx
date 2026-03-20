// src/pages/admin/settings/SiteSettingsPage.jsx
import { useState, useEffect } from "react";
import {
  updateSiteSettings,
  fetchSiteSettings,
} from "../../../api/settings/settingAPI";
import { useToast } from "../../../context/ToastContext";
import Toast from "../../../components/ui/Toast";
import SettingsSkeleton from "../../../components/ui/skeleton/SettingsSkeleton";
import SettingsForm from "../../../components/admin/settings/site-settings-forms/SettingsForm";

export default function SiteSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const { toast, show, clear } = useToast();

  const loadSettings = async () => {
    try {
      const res = await fetchSiteSettings();
      const finalData = res?.data || res;
      if (finalData) setInitialData(finalData);
    } catch (err) {
      show("error", "Failed to load site settings");
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await updateSiteSettings(formData);
      show("success", "Settings updated successfully");
      await loadSettings();
    } catch (err) {
      show("error", err.message || "Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full  transition-colors duration-300">
      {toast && <Toast {...toast} onClose={clear} />}

      <div className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
        {initialData ? (
          <SettingsForm
            onSubmit={handleSubmit}
            loading={loading}
            initialData={initialData}
          />
        ) : (
          <SettingsSkeleton />
        )}
      </div>
    </div>
  );
}
