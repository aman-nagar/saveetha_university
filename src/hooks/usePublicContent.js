// src / hooks / usePublicContent.js;
import { useContext } from "react";
import { PublicContentContext } from "../context/PublicContentContext";

/**
 * usePublicContent Hook
 * Access global public website content from anywhere
 * Returns: { content, loading, error, refreshContent, header, home, footer, announcements }
 *
 * Usage:
 * const { header, loading, error } = usePublicContent();
 * if (loading) return <Skeleton />;
 * if (error) return <ErrorState />;
 * return <Header data={header} />;
 */
export function usePublicContent() {
  const context = useContext(PublicContentContext);

  if (!context) {
    throw new Error(
      "usePublicContent must be used within PublicContentProvider",
    );
  }

  return context;
}
