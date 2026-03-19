// src/hooks/usePublicContent.js
import { useContext } from "react";
import { PublicDataContext } from "../context/PublicDataContext";

export function usePublicContent() {
  const context = useContext(PublicDataContext);

  if (!context) {
    throw new Error("usePublicContent must be used within PublicDataProvider");
  }

  return context;
}
