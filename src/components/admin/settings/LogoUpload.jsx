export default function LogoUpload({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>

      {value && (
        <img
          src={value}
          alt={label}
          className="h-16 mb-3 rounded border border-border"
        />
      )}

      <input type="file" name={name} onChange={onChange} className="text-sm" />
    </div>
  );
}
