
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationContextType {
  activeSection: string;
  navigateTo: (path: string, options?: { smooth?: boolean }) => void;
  navigateToSection: (sectionId: string) => void;
  resetScrollPosition: () => void;
  previousPath: string;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [previousPath, setPreviousPath] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  // Update previous path when location changes
  useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location.pathname]);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/') return;
      
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Reset scroll position
  const resetScrollPosition = useCallback(() => {
    window.scrollTo(0, 0);
      
    // Force layout recalculation
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }, []);

  // Navigate to a specific section
  const navigateToSection = useCallback((sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Delay scrolling to section until after navigation completes
      setTimeout(() => {
        const element = document.querySelector(`#${sectionId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(`#${sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.pathname, navigate]);

  // General navigation function
  const navigateTo = useCallback((path: string, options?: { smooth?: boolean }) => {
    const comingFromProposals = location.pathname === '/proposals';
    
    if (path.startsWith('#')) {
      // Handle section navigation
      const sectionId = path.substring(1);
      navigateToSection(sectionId);
    } else if (path === '/') {
      navigate('/');
      resetScrollPosition();
      
      // Special handling when coming from proposals page
      if (comingFromProposals) {
        setTimeout(() => {
          window.location.reload();
        }, 50);
      }
    } else {
      // Navigate to regular route
      navigate(path);
      
      // Reset scroll for regular route changes
      if (options?.smooth !== true) {
        resetScrollPosition();
      }
    }
  }, [location.pathname, navigate, navigateToSection, resetScrollPosition]);

  const value = {
    activeSection,
    navigateTo,
    navigateToSection,
    resetScrollPosition,
    previousPath
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
