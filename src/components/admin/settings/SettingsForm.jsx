import LogoUpload from "./LogoUpload";

export default function SettingsForm({ form, setForm, onSubmit, loading }) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-surface border border-border rounded-xl p-6 space-y-8"
    >
      {/* Basic Info */}
      <div>
        <h2 className="text-lg font-heading font-semibold mb-4">
          Basic Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="college_name"
            value={form.college_name || ""}
            onChange={handleChange}
            placeholder="College Name"
            className="border border-border rounded-md px-3 py-2 bg-surface"
          />

          <input
            name="short_name"
            value={form.short_name || ""}
            onChange={handleChange}
            placeholder="Short Name"
            className="border border-border rounded-md px-3 py-2 bg-surface"
          />

          <input
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className="border border-border rounded-md px-3 py-2 bg-surface"
          />

          <input
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            placeholder="Phone"
            className="border border-border rounded-md px-3 py-2 bg-surface"
          />

          <input
            name="alternate_phone"
            value={form.alternate_phone || ""}
            onChange={handleChange}
            placeholder="Alternate Phone"
            className="border border-border rounded-md px-3 py-2 bg-surface"
          />

          <textarea
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            placeholder="Address"
            className="border border-border rounded-md px-3 py-2 bg-surface md:col-span-2"
            rows={3}
          />
        </div>
      </div>

      {/* Branding */}
      <div>
        <h2 className="text-lg font-heading font-semibold mb-4">Branding</h2>

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
        className="bg-primary text-white px-6 py-2 rounded-md"
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
