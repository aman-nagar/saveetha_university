export const defaultSettings = {
  theme: "light",
  primaryColor: "#0b1f4b",
  sidebarMode: "pinned", // pinned | auto
  tableDensity: "normal", // normal | compact
};

export function loadSettings() {
  const stored = localStorage.getItem("adminSettings");
  return stored
    ? { ...defaultSettings, ...JSON.parse(stored) }
    : defaultSettings;
}

export function saveSettings(settings) {
  localStorage.setItem("adminSettings", JSON.stringify(settings));
}

export function applySettings(settings) {
  const root = document.documentElement;

  // Theme
  if (settings.theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  // Primary color
  root.style.setProperty("--color-primary", settings.primaryColor);

  // Table density
  root.setAttribute("data-density", settings.tableDensity);
}
