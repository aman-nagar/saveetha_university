import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/ui/Toast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const show = useCallback((type, message, title) => {
    setToast({ type, message, title });
  }, []);

  const clear = useCallback(() => setToast(null), []);

  return (
    <ToastContext.Provider value={{ show, clear }}>
      {children}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          title={toast.title}
          onClose={clear}
        />
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};