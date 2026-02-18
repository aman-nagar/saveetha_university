// src/components/admin/settings/LogoUpload.jsx
export default function LogoUpload({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-text mb-2">
        {label}
      </label>

      <div className="border border-dashed border-border rounded-lg p-4 text-center bg-bg">
        {value ? (
          <img
            src={typeof value === "string" ? value : URL.createObjectURL(value)}
            alt={label}
            className="h-16 mx-auto mb-3 rounded"
          />
        ) : (
          <p className="text-muted text-sm">No image</p>
        )}

        <input
          type="file"
          name={name}
          onChange={onChange}
          className="text-sm text-text mt-2"
        />
      </div>
    </div>
  );
}
