// src/context/PublicContentContext.jsx
import { createContext, useState, useEffect } from "react";
import { fetchPublicContent } from "../services/publicApi";

/**
 * PublicContentContext
 * Global context for all public website content (header, footer, home sections, etc.)
 * Fetches once at app level and makes it available to all pages
 * Supports real-time updates for admin edits
 */
export const PublicContentContext = createContext(null);

export function PublicContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch content on mount
  useEffect(() => {
    loadPublicContent();
  }, []);

  const loadPublicContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPublicContent();
      setContent(data);
    } catch (err) {
      console.error("❌ Failed to load public content:", err);
      setError(err.message || "Failed to load website content");
      // Set fallback data so app doesn't break completely
      setContent({
        header: null,
        home: null,
        footer: null,
        announcements: [],
      });
    } finally {
      setLoading(false);
    }
  };

  // Allow manual refresh (useful for admin updates)
  const refreshContent = async () => {
    await loadPublicContent();
  };

  const value = {
    content,
    loading,
    error,
    refreshContent,
    // Convenience accessors
    header: content?.header,
    home: content?.home,
    footer: content?.footer,
    academics: content?.academics,
    galleryPage: content?.galleryPage,
    announcements: content?.announcements || [],
  };

  return (
    <PublicContentContext.Provider value={value}>
      {children}
    </PublicContentContext.Provider>
  );
}
