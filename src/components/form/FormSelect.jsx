export default function FormSelect({
  label,
  name,
  register,
  options = [],
  required,
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-text">
        {label} {required && "*"}
      </label>
      <select
        {...register(name, { required })}
        className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
