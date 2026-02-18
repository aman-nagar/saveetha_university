// src/components/form/FormSection.jsx
export default function FormSection({ title, children }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h2 className="text-lg font-heading font-semibold text-text mb-4">
        {title}
      </h2>
      <div className="grid md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}
