// src/components/form/FormInput.jsx
export default function FormInput({
  label,
  name,
  register,
  required,
  type = "text",
  placeholder,
  error,
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-text">
        {label} {required && "*"}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
        className={`w-full border rounded-md px-3 py-2 bg-surface text-text 
          focus:outline-none focus:ring-2 focus:ring-accent
          ${error ? "border-red-500 ring-1 ring-red-400" : "border-border"}
        `}
      />

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}
