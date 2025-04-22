
import React, { memo } from "react";
import { SocialLinks } from "@/components/navigation/SocialLinks";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { DesktopMenu } from "@/components/navigation/DesktopMenu";
import { useHeaderNavigation } from "@/hooks/useHeaderNavigation";
import { Link } from "react-router-dom";

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
    handleNavigation,
    handleLogoClick,
  } = useHeaderNavigation();

  // Remove any icons (such as Home) from navItems since the logo stands alone
  const pureNavItems = React.useMemo(() => 
    navItems.map((item) => ({ ...item, icon: undefined })), 
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
      {/* Always show logo, not inside navigation items */}
      <div className="fixed z-50 left-1/2 top-2 sm:top-4 -translate-x-1/2 flex items-center justify-center pointer-events-none select-none mb-2">
        <Link to="/" onClick={handleLogoClick} className="pointer-events-auto outline-none border-none bg-transparent p-0 m-0">
          <img 
            src="/lovable-uploads/4ffd568e-264d-468e-9e61-0e0df2de32c0.png" 
            alt="nohype Logo" 
            className="h-9 sm:h-11 w-auto"
            style={{ aspectRatio: "4.19/1", display: "block", objectFit: "contain" }}
            draggable={false}
          />
        </Link>
      </div>
      {/* Mobile navigation menu */}
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navItems={pureNavItems}
        handleNavigation={handleNavigation}
      />
      {/* Desktop navigation menu */}
      <DesktopMenu
        navItems={pureNavItems}
        position={position}
        setPosition={setPosition}
        activeSection={activeSection}
        location={location}
        handleNavigation={handleNavigation}
      />
    </nav>
  );
});

NavHeader.displayName = 'NavHeader';

export default NavHeader;
