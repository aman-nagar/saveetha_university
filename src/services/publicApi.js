import { fetchHeader } from "../api/public/headerApi";
import { fetchHome } from "../api/public/homeApi";
import { fetchFooter } from "../api/public/footerApi";
import { publicMock } from "../data/header.mock";

/**
 * Fetch all public content at once
 * Called once by PublicContentContext at app startup
 * Returns combined data for header, home, footer, and announcements
 */
export async function fetchPublicContent() {
  try {
    // Fetch all content in parallel for better performance
    const [header, home, footer] = await Promise.all([
      fetchHeader(),
      fetchHome(),
      fetchFooter(),
    ]);

    return {
      header,
      home,
      footer,
      announcements: publicMock.announcements,
    };
  } catch (err) {
    console.error("❌ Error fetching public content:", err);
    // Return mock data as fallback to prevent complete app failure
    return publicMock;
  }
}

/**
 * Refresh specific content section
 * Useful for admin updates without full page refresh
 * @param {string} section - Section to refresh: 'header', 'home', 'footer', etc.
 */
export async function refreshContentSection(section) {
  const sectionFetchers = {
    header: () => fetchHeader(),
    home: () => fetchHome(),
    footer: () => fetchFooter(),
  };

  if (!sectionFetchers[section]) {
    throw new Error(`Unknown section: ${section}`);
  }

  return await sectionFetchers[section]();
}
