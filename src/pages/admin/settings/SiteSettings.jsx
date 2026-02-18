import { useEffect, useState } from "react";
import SettingsForm from "../../../components/admin/settings/SettingsForm";
import {
  fetchSiteSettings,
  updateSiteSettings,
} from "../../../api/settingsApi";

export default function SiteSettings() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await fetchSiteSettings();
      setForm(data);
    }
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key] !== null) {
        formData.append(key, form[key]);
      }
    });

    await updateSiteSettings(formData);
    setLoading(false);
    alert("Settings updated successfully");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-heading font-bold text-primary mb-6">
        Site Settings
      </h1>

      <SettingsForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
