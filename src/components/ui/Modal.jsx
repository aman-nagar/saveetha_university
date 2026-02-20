// src/components/ui/Modal.jsx
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "max-w-lg",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div
        className={`
          relative bg-surface text-text rounded-xl shadow-lg
          w-full ${size} mx-4 border border-border
        `}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-heading font-semibold">{title}</h2>
          <button onClick={onClose} className="text-muted hover:text-text">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
