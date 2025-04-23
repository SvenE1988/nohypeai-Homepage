
import React, { memo, useCallback } from "react";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { SocialLinks } from "@/components/navigation/SocialLinks";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { DesktopMenu } from "@/components/navigation/DesktopMenu";
import { useHeaderNavigation } from "@/hooks/useHeaderNavigation";

// Memoized component to prevent unnecessary re-renders
const NavHeader = memo(() => {
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

  // Memoize the navigation items with icons to prevent recreating on each render
  const navItemsWithIcons = React.useMemo(() => 
    navItems.map((item, index) => 
      index === 0 ? { ...item, icon: <Home className="w-4 h-4" /> } : item
    ), 
    [navItems]
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
});

// Set displayName for better debugging
NavHeader.displayName = 'NavHeader';

export default NavHeader;
