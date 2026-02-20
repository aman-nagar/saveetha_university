// src/pages/admin/settings/SiteSettingsPanel.jsx
import { useState } from "react";
import SettingsForm from "../../../components/admin/settings/SettingsForm";
import { updateSiteSettings } from "../../../api/settingAPI";

export default function SiteSettingsPanel() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    const res = await updateSiteSettings(formData);
    setLoading(false);

    console.log("Response:", res);
    alert("Settings submitted successfully");
  };

  return (
    <div className="w-full">
      <SettingsForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
