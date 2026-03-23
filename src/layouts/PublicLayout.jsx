import { Outlet } from "react-router-dom";
import { usePublicContent } from "../hooks/usePublicContent";
import Header from "../components/public/header/Header";
import PublicFooter from "../components/public/PublicFooter";
import LoadingFallback from "../components/ui/LoadingFallback";

export default function PublicLayout() {
  const { header, loading } = usePublicContent();

  // Show loading skeleton while fetching
  if (loading) {
    return <LoadingFallback variant="public" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      {/* Header - Global for all pages */}
      {header && <Header headerConfig={header} />}

      {/* Page Content - Each page renders here via Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer - Global for all pages */}
      <PublicFooter />

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
