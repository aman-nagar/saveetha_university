import { Outlet } from "react-router-dom";
import { usePublicContent } from "../hooks/usePublicContent";
import Header from "../components/public/header/Header";
import PublicFooter from "../components/public/PublicFooter";
import AnnouncementBar from "../components/public/AnnouncementBar";
import LoadingFallback from "../components/ui/LoadingFallback";

export default function PublicLayout() {
  const { header, footer, announcements, loading, error } = usePublicContent();

  // Show loading skeleton while fetching
  if (loading) {
    return <LoadingFallback variant="public" />;
  }

  // Show error state if content failed to load
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-text mb-4">
            Unable to Load Website
          </h1>
          <p className="text-muted mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-lg text-white transition"
            style={{ background: "var(--color-primary)" }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      {/* Header - Global for all pages */}
      {header && <Header headerConfig={header} />}

      {/* Announcement Bar - Scrolling updates */}
      {/* {announcements?.length > 0 && <AnnouncementBar items={announcements} />} */}

      {/* Page Content - Each page renders here via Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer - Global for all pages */}
      {footer && <PublicFooter data={footer} />}

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}

/**
 * Back to Top Button Component
 * Floating button in bottom-right corner
 */
function BackToTop() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-8 right-8 p-4 rounded-full shadow-xl z-50 transition hover:scale-110 text-white font-bold text-xl"
      style={{
        background: "var(--color-primary)",
        color: "var(--color-accent)",
      }}
      title="Back to Top"
    >
      ↑
    </button>
  );
}
