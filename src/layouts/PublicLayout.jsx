// src/layouts/PublicLayout.jsx
import AnnouncementBar from "../components/public/AnnouncementBar";
import PublicFooter from "../components/public/PublicFooter";
import PublicHeader from "../components/public/PublicHeader";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
      <BackToTop />
    </div>
  );
}

export function BackToTop() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-8 right-8 bg-primary text-accent p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 group border border-accent/20"
    >
      <span className="group-hover:-translate-y-1 block transition-transform">
        ↑
      </span>
    </button>
  );
}
