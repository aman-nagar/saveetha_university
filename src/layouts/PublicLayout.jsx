import { Outlet } from "react-router-dom";
import { usePublicContent } from "../hooks/usePublicContent";

import PublicHeader from "../components/public/PublicHeader";
import PublicFooter from "../components/public/PublicFooter";
import AnnouncementBar from "../components/public/AnnouncementBar";
import Header from "../components/public/header/Header";


export default function PublicLayout() {
  const { header, footer, announcements, loading } = usePublicContent();

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Header data={header} />

      {announcements?.length > 0 && <AnnouncementBar items={announcements} />}

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <PublicFooter data={footer} />

      <BackToTop />
    </div>
  );
}

function BackToTop() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-8 right-8 p-4 rounded-full shadow-xl z-50 transition hover:scale-110"
      style={{
        background: "var(--color-primary)",
        color: "var(--color-accent)",
      }}
    >
      ↑
    </button>
  );
}
