// src/components/form/FormFileInput.jsx
import { useState } from "react";
import { FiFile, FiImage, FiX, FiUploadCloud } from "react-icons/fi";

export default function FormFileInput({
  label,
  name,
  register,
  accept = "image/*",
  required = false,
  error,
  existingUrl = null,
}) {
  const [preview, setPreview] = useState(existingUrl || null);
  const [isExisting, setIsExisting] = useState(!!existingUrl);
  const [fileName, setFileName] = useState("");

  const { onChange, ...rest } = register(name, {
    required: required ? "File is required" : false,
  });

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsExisting(false);
      setFileName(file.name);
      if (file.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview(null);
      }
    }
    onChange(e);
  };

  const clearFile = () => {
    setPreview(null);
    setFileName("");
    setIsExisting(false);
    // Reset input
    const input = document.querySelector(`input[name="${name}"]`);
    if (input) input.value = "";
  };

  const hasFile = preview || fileName;

  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="text-xs sm:text-sm font-medium text-text">
        {label} {required && <span className="text-danger">*</span>}
      </label>

      <div
        className={`
          relative flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg bg-surface transition-colors
          ${error ? "border-danger ring-1 ring-danger/30" : "border-border hover:border-muted/50"}
          ${hasFile ? "bg-bg/50" : ""}
        `}
      >
        {/* Preview or Icon */}
        <div className="shrink-0">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="h-10 w-10 sm:h-12 sm:w-12 object-cover rounded-lg border border-border"
              />
              {isExisting && (
                <span className="absolute -top-1 -right-1 bg-success text-white text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.5 rounded-full font-medium">
                  saved
                </span>
              )}
            </div>
          ) : fileName ? (
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <FiFile className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
          ) : (
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-muted/10 flex items-center justify-center border border-border">
              <FiUploadCloud className="w-5 h-5 sm:w-6 sm:h-6 text-muted" />
            </div>
          )}
        </div>

        {/* File Info or Input */}
        <div className="flex-1 min-w-0">
          {fileName ? (
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-text truncate block">
                {fileName}
              </span>
              <button
                type="button"
                onClick={clearFile}
                className="p-1 hover:bg-danger/10 rounded-full text-muted hover:text-danger transition-colors"
              >
                <FiX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="file"
                accept={accept}
                {...rest}
                onChange={handleChange}
                className="hidden"
              />
              <span className="text-xs sm:text-sm text-muted hover:text-primary transition-colors truncate">
                {existingUrl ? "Click to replace file" : "Click to upload file"}
              </span>
            </label>
          )}
        </div>

        {/* Hidden input for form registration when file is selected */}
        {!fileName && (
          <input
            type="file"
            accept={accept}
            {...rest}
            onChange={handleChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        )}
      </div>

      {isExisting && existingUrl && !fileName && (
        <p className="text-[10px] sm:text-xs text-muted flex items-center gap-1">
          <FiImage className="w-3 h-3" />
          Current file saved. Select new file to replace.
        </p>
      )}

      {error && (
        <p className="text-xs text-danger flex items-center gap-1">
          <FiX className="w-3 h-3" />
          {error.message}
        </p>
      )}
    </div>
  );
}
