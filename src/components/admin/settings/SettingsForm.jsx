// src/components/admin/settings/SettingsForm.jsx
import LogoUpload from "./LogoUpload";

export default function SettingsForm({ form, setForm, onSubmit, loading }) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const inputClass =
    "border border-border rounded-md px-3 py-2 bg-surface text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40";

  return (
    <form
      onSubmit={onSubmit}
      className="bg-surface border border-border rounded-xl p-6 space-y-8"
    >
      {/* Basic Info */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-text mb-4">
          Basic Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="college_name"
            value={form.college_name || ""}
            onChange={handleChange}
            placeholder="College Name"
            className={inputClass}
          />

          <input
            name="short_name"
            value={form.short_name || ""}
            onChange={handleChange}
            placeholder="Short Name"
            className={inputClass}
          />

          <input
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className={inputClass}
          />

          <input
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            placeholder="Phone"
            className={inputClass}
          />

          <input
            name="alternate_phone"
            value={form.alternate_phone || ""}
            onChange={handleChange}
            placeholder="Alternate Phone"
            className={inputClass}
          />

          <textarea
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            placeholder="Address"
            className={`${inputClass} md:col-span-2`}
            rows={3}
          />
        </div>
      </div>

      {/* Branding */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-text mb-4">
          Branding
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <LogoUpload
            label="Logo"
            name="logo"
            value={form.logo}
            onChange={handleFile}
          />
          <LogoUpload
            label="Additional Logo"
            name="additional_logo"
            value={form.additional_logo}
            onChange={handleFile}
          />
          <LogoUpload
            label="Favicon"
            name="favicon"
            value={form.favicon}
            onChange={handleFile}
          />
        </div>
      </div>

      {/* Submit */}
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

/* Reusable input */
function Input({ name, value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="input"
    />
  );
}
