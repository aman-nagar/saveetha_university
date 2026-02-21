// src/components/form/FormTextarea.jsx
export default function FormTextarea({
  label,
  name,
  register,
  required,
  placeholder,
  error,
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-text">
        {label} {required && "*"}
      </label>
      <textarea
        rows={3}
        placeholder={placeholder}
        {...register(name, { required })}
        className={`w-full border border-border rounded-md px-3 py-2 bg-surface text-text ${error ? "border-red-500 ring-1 ring-red-400" : "border-border"}`}
      />
    </div>
  );
}
