// src/components/public/header/Header.jsx
import TopBar from "./TopBar";
import BrandingBar from "./BrandingBar";
import Navbar from "./Navbar";

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
