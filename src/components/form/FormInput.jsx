export default function FormInput({
  label,
  name,
  register,
  required,
  type = "text",
  placeholder,
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
        className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </div>
  );
}
