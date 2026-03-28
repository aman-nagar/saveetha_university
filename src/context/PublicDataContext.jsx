// src/context/PublicDataContext.jsx
import { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../api/apiConfig";
import { publicMock } from "../data/header.mock";

export const PublicDataContext = createContext(null);

export function PublicDataProvider({ children }) {
  const [data, setData] = useState({
    // Mock/Static data (fallbacks) - use until API available
    header: publicMock.header || null,
    home: publicMock.home || null,
    footer: publicMock.footer || null,
    academics: publicMock.academics || null,
    galleryPage: null, // Will be populated from API
    announcements: publicMock.announcements || [],
    // API data (fetched dynamically)
    siteDetails: null,
    sliders: null,
    testimonials: null,
    // Add more as APIs become available
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllPublicData();
  }, []);

  const fetchAllPublicData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Define all public API endpoints
      const endpoints = {
        siteDetails: "/public/details.php",
        downloadForms: "/public/download-form.php",
        sliders: "/public/sliders.php",
        gallery: "/public/gallery.php",
        // Add more as they're available:
        // header: "/public/header.php",
        // footer: "/public/footer.php",
        // testimonials: "/public/testimonials.php",
      };

      // Fetch all endpoints in parallel
      const responses = await Promise.all(
        Object.entries(endpoints).map(([key, url]) =>
          fetch(`${BASE_URL}${url}`)
            .then((res) => {
              if (!res.ok) throw new Error(`Failed to fetch ${key}`);
              return res.json();
            })
            .then((json) => {
              // Extract data, handle both wrapped and unwrapped responses
              const responseData = json?.data ?? json;
              return [key, responseData];
            })
            .catch((err) => {
              console.warn(`⚠️ Failed to fetch ${key}:`, err.message);
              return [key, null]; // Return null on error, use static fallback
            }),
        ),
      );

      // Combine responses with existing fallback data
      const newData = Object.fromEntries(responses);

      // Transform sliders to match HeroSlider format (heading → subtitle)
      if (newData.sliders && Array.isArray(newData.sliders)) {
        newData.sliders = newData.sliders.map((slider) => ({
          id: slider.id,
          title: slider.title,
          subtitle: slider.heading,
          image: slider.image_url,
          bgColor: "bg-primary",
        }));
      }

      if (newData.gallery && Array.isArray(newData.gallery)) {
        // Map your API response to the format the GalleryPage expects
        console.log("✅ Gallery API data received:", newData.gallery);
        newData.galleryPage = {
          title: "Our Memories",
          albums: newData.gallery.map((item) => ({
            id: item.id,
            title: item.image_name || "Gallery Moment", // Fallback if name is empty
            image: item.full_image_url,
            date: item.created_at,
          })),
        };
        console.log("✅ Transformed galleryPage:", newData.galleryPage);
      }
      setData((prev) => ({
        ...prev,
        ...Object.fromEntries(
          Object.entries(newData).map(([key, value]) => [
            key,
            value ?? prev[key], // Use API data if available, else keep fallback
          ]),
        ),
      }));
    } catch (err) {
      console.error("❌ Error loading public data:", err);
      setError(err.message);
      // Data already has fallbacks, so app continues working
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refresh specific section or all data
   * Useful for manual refresh or when admin updates content
   */
  const refreshData = async (section = null) => {
    if (section) {
      console.log(`🔄 Refreshing ${section}...`);
      // Could implement selective refresh here if needed
    }
    await fetchAllPublicData();
  };

  const value = {
    data,
    loading,
    error,
    refreshData,
    content: data, // For backward compatibility with GalleryPage
    // Convenience accessors
    header: data.header,
    home: data.home,
    footer: data.footer,
    siteDetails: data.siteDetails,
    sliders: data.sliders,
    academics: data.academics,
    galleryPage: data.galleryPage,
    announcements: data.announcements,
  };

  return (
    <PublicDataContext.Provider value={value}>
      {children}
    </PublicDataContext.Provider>
  );
}
