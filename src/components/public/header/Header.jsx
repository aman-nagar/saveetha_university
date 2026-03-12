import TopBar from "./TopBar";
import BrandingBar from "./BrandingBar";
import Navbar from "./Navbar";

/**
 * Header Component - Data-Driven
 * Renders complete header: topbar, branding, navigation
 * @param {Object} headerConfig - Header configuration from API/mock
 */
export default function Header({ headerConfig }) {
  if (!headerConfig) return null;

  return (
    <header>
      <TopBar data={headerConfig.topbar} />
      <BrandingBar data={headerConfig.branding} />
      <Navbar items={headerConfig.navigation} />
    </header>
  );
}
