import { useState, useEffect } from "react";
import SettingsForm from "../../../components/admin/settings/SettingsForm";
import { updateSiteSettings, fetchSiteSettings } from "../../../api/settingsApi";
import { useToast } from "../../../hooks/useToast";
import Toast from "../../../components/ui/Toast";

export default function SiteSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const { toast, show, clear } = useToast();

  const loadSettings = async () => {
    try {
      console.log("📡 FETCHING: Requesting site settings...");
      const res = await fetchSiteSettings();
      console.log("📦 RECEIVE: Raw API Response:", res);
      
      // Check if data exists in the response structure
      if (res) {
        setInitialData(res);
        console.log("✅ SUCCESS: initialData state updated.");
      } else {
        console.warn("⚠️ EMPTY: API returned successfully but data was null/undefined.");
      }
    } catch (err) {
      console.error("❌ ERROR: Failed to load site settings:", err.message);
      show("error", "Failed to load site settings");
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    console.log("🚀 SUBMITTING: Sending FormData to backend...");
    
    // Debug: Inspect FormData content
    for (let [key, value] of formData.entries()) {
      console.log(`📤 PAYLOAD: ${key}:`, value instanceof File ? `File (${value.name})` : value);
    }

    try {
      const res = await updateSiteSettings(formData);
      console.log("✅ UPDATE SUCCESS:", res);
      show("success", "Settings updated successfully");
      await loadSettings(); 
    } catch (err) {
      console.error("❌ UPDATE ERROR:", err.message);
      show("error", err.message || "Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4">
      {toast && <Toast {...toast} onClose={clear} />}
      <h1 className="text-2xl font-bold mb-6 text-text">Site Settings</h1>
      
      {initialData ? (
        <SettingsForm 
          onSubmit={handleSubmit} 
          loading={loading} 
          initialData={initialData} 
        />
      ) : (
        <div className="py-20 text-center animate-pulse text-muted">
          Loading site configurations... (Check Console if stuck)
        </div>
      )}
    </div>
  );
}