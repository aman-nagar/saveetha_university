// src/components/form/FormFileInput.jsx
import { useState } from "react";

export default function FormFileInput({
  label,
  name,
  register,
  accept = "image/*",
  required = false,
}) {
  const [preview, setPreview] = useState(null);

  // Get the onChange and ref from register
  const { onChange, ...rest } = register(name, { required });

  const handlePreview = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    }
    // Crucial: Call the original React Hook Form onChange
    onChange(e);
  };

  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-text uppercase tracking-wider">
        {label} {required && "*"}
      </label>

      <div className="flex items-center gap-3 p-2 border border-border rounded-md bg-surface transition-sm focus-within:ring-1 focus-within:ring-primary">
        {/* Compact Thumbnail */}
        <div className="flex-shrink-0">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-10 w-10 object-cover rounded shadow-sm border border-border"
            />
          ) : (
            <></>
          )}
        </div>

        {/* Lean Input */}
        <input
          type="file"
          accept={accept}
          {...rest}
          onChange={handlePreview}
          className="pl-5 block w-full text-xs text-text 
            file:mr-3 file:py-1 file:px-3
            file:rounded file:border-0
            file:text-xs file:font-medium
            file:bg-primary file:text-white
            hover:file:bg-primary/90 cursor-pointer"
        />
      </div>
    </div>
  );
}
