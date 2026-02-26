// src/components/ui/ToastContainer.jsx
export default function ToastContainer({ children }) {
  return (
    <div className="fixed top-4 left-4 right-4 sm:top-5 sm:right-5 sm:left-auto z-50 flex flex-col gap-2 sm:gap-3 items-stretch sm:items-end">
      {children}
    </div>
  );
}
