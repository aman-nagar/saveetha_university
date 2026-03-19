/**
 * src/hooks/usePublicContent.js
 * SIMPLIFIED HOOK - Access public data from anywhere
 *
 * Usage:
 * const { data, loading, error } = usePublicContent();
 * const { header, siteDetails } = usePublicContent();
 */

import { useContext } from "react";
import { PublicDataContext } from "../context/PublicDataContext";

export function usePublicContent() {
  const context = useContext(PublicDataContext);

  if (!context) {
    throw new Error("usePublicContent must be used within PublicDataProvider");
  }

  return context;
}
