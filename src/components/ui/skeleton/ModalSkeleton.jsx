// src/components/ui/ModalSkeleton.jsx
export default function ModalSkeleton({
  title = "Loading...",
  footer = true,
  size = "md",
  bodyLines = 4,
}) {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md sm:max-w-lg",
    lg: "max-w-lg sm:max-w-2xl",
    xl: "max-w-xl sm:max-w-4xl",
    full: "max-w-full sm:max-w-full sm:m-4",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal Skeleton */}
      <div
        className={`
          relative bg-surface rounded-t-xl sm:rounded-xl shadow-2xl
          w-full ${sizeClasses[size]} border border-border
          flex flex-col max-h-[85vh] sm:max-h-[90vh]
          animate-pulse
        `}
      >
        {/* Header Skeleton */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex justify-between items-center flex-shrink-0">
          <div className="h-5 sm:h-6 bg-muted/20 rounded w-32 sm:w-40" />
          <div className="w-8 h-8 bg-muted/20 rounded-lg" />
        </div>

        {/* Body Skeleton */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3 sm:space-y-4">
          {Array.from({ length: bodyLines }, (_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 sm:h-4 bg-muted/20 rounded w-20 sm:w-24" />
              <div className="h-9 sm:h-10 bg-muted/20 rounded-lg w-full" />
            </div>
          ))}
        </div>

        {/* Footer Skeleton */}
        {footer && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-border flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 flex-shrink-0">
            <div className="h-9 sm:h-10 bg-muted/20 rounded-lg w-full sm:w-24" />
            <div className="h-9 sm:h-10 bg-muted/20 rounded-lg w-full sm:w-24" />
          </div>
        )}
      </div>
    </div>
  );
}
