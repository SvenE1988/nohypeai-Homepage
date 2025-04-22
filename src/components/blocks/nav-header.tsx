import React from "react";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { SocialLinks } from "@/components/navigation/SocialLinks";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { DesktopMenu } from "@/components/navigation/DesktopMenu";
import { useHeaderNavigation } from "@/hooks/useHeaderNavigation";

function NavHeader() {
  const {
    position,
    setPosition,
    isMobileMenuOpen, 
    setIsMobileMenuOpen,
    location,
    activeSection,
    navItems,
    handleNavigation
  } = useHeaderNavigation();

  // Add Home icon to the first item
  const navItemsWithIcons = navItems.map((item, index) => 
    index === 0 ? { ...item, icon: <Home className="w-4 h-4" /> } : item
  );

  return (
    <nav className="w-full">
      {/* Social media links - shown on all device sizes */}
      <div className="hidden sm:block">
        <SocialLinks />
      </div>
      <div className="block sm:hidden fixed top-0 left-0 right-0 z-40">
        <SocialLinks />
      </div>
      {/* Mobile navigation menu */}
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navItems={navItemsWithIcons}
        handleNavigation={handleNavigation}
      />
      {/* Desktop navigation menu */}
      <DesktopMenu
        navItems={navItemsWithIcons}
        position={position}
        setPosition={setPosition}
        activeSection={activeSection}
        location={location}
        handleNavigation={handleNavigation}
      />
    </nav>
  );
}

export default NavHeader;
