// src/pages/admin/settings/SiteSettingsPanel.jsx
import { useState } from "react";
import SettingsForm from "../../../components/admin/settings/SettingsForm";
import { updateSiteSettings } from "../../../api/settingsApi";

export default function SiteSettingsPanel() {
  const [form, setForm] = useState({
    college_name: "",
    short_name: "",
    email: "",
    phone: "",
    alternate_phone: "",
    address: "",
    logo: null,
    additional_logo: null,
    favicon: null,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== "") {
        formData.append(key, form[key]);
      }
    });

    const res = await updateSiteSettings(formData);

    setLoading(false);
    console.log("Response:", res);
    alert("Settings submitted successfully");

    setForm({
      college_name: "",
      short_name: "",
      email: "",
      phone: "",
      alternate_phone: "",
      address: "",
      logo: null,
      additional_logo: null,
      favicon: null,
    });
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-heading font-bold text-text mb-6">
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
