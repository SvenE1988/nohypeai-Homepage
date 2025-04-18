
import React from "react";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { SocialLinks } from "@/components/navigation/SocialLinks";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { DesktopMenu } from "@/components/navigation/DesktopMenu";
import { useHeaderNavigation } from "@/hooks/useHeaderNavigation";

// Main navigation header component
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
    <>
      {/* Social media links - shown on all device sizes */}
      <SocialLinks />
      
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
    </>
  );
}

export default NavHeader;
