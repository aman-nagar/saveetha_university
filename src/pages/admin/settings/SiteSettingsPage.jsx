// src/pages/admin/settings/SiteSettingsPage.jsx
import { useState } from "react";
import { useToast } from "../../../context/ToastContext";
import Toast from "../../../components/ui/Toast";

// Tab imports
import CoreSettingsTab from "./tabs/CoreSettingsTab";
import TestimonialsTab from "./tabs/TestimonialsTab";
import NewsTab from "./tabs/NewsTab";
import SlidersTab from "./tabs/SlidersTab";
import HeaderSettingsTab from "./tabs/HeaderSettingsTab";
import FooterSettingsTab from "./tabs/FooterSettingsTab";
import DownloadFormsTab from "./tabs/DownloadFormsTab";

// Tab configuration
const SETTING_TABS = [
  { id: "core", label: "Core Settings", icon: "⚙️" },
  // { id: "header", label: "Header", icon: "🎯" },
  // { id: "footer", label: "Footer", icon: "📍" },
  // { id: "testimonials", label: "Testimonials", icon: "⭐" },
  // { id: "news", label: "News & Updates", icon: "📰" },
  { id: "sliders", label: "Sliders", icon: "🎨" },
  { id: "downloadForms", label: "Download Forms", icon: "📥" },
];

export default function SiteSettingsPage() {
  const [activeTab, setActiveTab] = useState("core");
  const { toast, show, clear } = useToast();

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full">
      {toast && <Toast {...toast} onClose={clear} />}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">Site Settings</h1>
        <p className="text-muted text-sm">
          Manage all site configurations, content, and branding
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-surface border border-border rounded-t-lg">
        <div className="flex gap-2 overflow-x-auto p-2">
          {SETTING_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-background text-text hover:bg-border"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-background border border-t-0 border-border rounded-b-lg p-6">
        {activeTab === "core" && (
          <CoreSettingsTab
            onSuccess={() => show("success", "Core settings updated")}
          />
        )}
        {activeTab === "header" && (
          <HeaderSettingsTab
            onSuccess={() => show("success", "Header updated")}
          />
        )}
        {activeTab === "footer" && (
          <FooterSettingsTab
            onSuccess={() => show("success", "Footer updated")}
          />
        )}
        {activeTab === "testimonials" && (
          <TestimonialsTab
            onSuccess={() => show("success", "Testimonial updated")}
            onError={(msg) => show("error", msg)}
          />
        )}
        {activeTab === "news" && (
          <NewsTab
            onSuccess={() => show("success", "News updated")}
            onError={(msg) => show("error", msg)}
          />
        )}
        {activeTab === "sliders" && (
          <SlidersTab
            onSuccess={() => show("success", "Slider updated")}
            onError={(msg) => show("error", msg)}
          />
        )}
        {activeTab === "downloadForms" && (
          <DownloadFormsTab
            onSuccess={() => show("success", "Form updated")}
            onError={(msg) => show("error", msg)}
          />
        )}
      </div>
    </div>
  );
}
