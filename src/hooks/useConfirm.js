// src/hooks/useConfirm.js

import { useState } from "react";

export function useConfirm() {
  const [target, setTarget] = useState(null);

  const open = (item) => setTarget(item);
  const close = () => setTarget(null);

  return {
    target,
    isOpen: !!target,
    open,
    close,
  };
}