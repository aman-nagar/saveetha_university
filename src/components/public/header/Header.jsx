import TopBar from "./TopBar";
import BrandingBar from "./BrandingBar";
import Navbar from "./Navbar";

export function Header({ headerConfig }) {
  return (
    <header>
      <TopBar data={headerConfig.topbar} />
      <BrandingBar data={headerConfig.branding} />
      <Navbar data={headerConfig.navigation} />
    </header>
  );
}
