// src/components/form/FormSelect.jsx
export default function FormSelect({
  label,
  name,
  register,
  options = [],
  required,
  error,
  onChangeCb, // optional: called with the full option object on change
}) {
  const { onChange, ...rest } = register(name, { required });

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-text">
        {label} {required && "*"}
      </label>

      <select
        {...rest}
        onChange={(e) => {
          onChange(e); // keep RHF in sync
          if (onChangeCb) {
            const selected = options.find(
              (o) => String(o.value) === e.target.value,
            );
            onChangeCb(selected || null);
          }
        }}
        className={`w-full border rounded-md px-3 py-2 bg-surface text-text
          ${error ? "border-red-500 ring-1 ring-red-400" : "border-border"}
        `}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}

