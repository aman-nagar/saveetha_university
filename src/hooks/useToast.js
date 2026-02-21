// src/hooks/useToast.js

import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);

  const show = (type, message) => {
    setToast({ type, message });
  };

  const clear = () => setToast(null);

  return {
    toast,
    show,
    clear,
  };
}