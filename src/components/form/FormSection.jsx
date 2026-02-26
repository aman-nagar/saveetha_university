// src/components/form/FormSection.jsx
import { FiLayers } from "react-icons/fi";

export default function FormSection({ title, children, icon: Icon = FiLayers }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        <h2 className="text-base sm:text-lg font-heading font-semibold text-text">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {children}
      </div>
    </div>
  );
}