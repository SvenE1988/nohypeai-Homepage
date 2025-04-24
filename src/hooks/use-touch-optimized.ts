
import { useEffect, useState } from 'react';

export const useTouchOptimized = () => {
  const [hasTouchScreen, setHasTouchScreen] = useState(false);

  useEffect(() => {
    // Check if device has touch capabilities
    const checkTouchScreen = () => {
      setHasTouchScreen(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };

    checkTouchScreen();
    
    // Recheck on resize in case of device mode changes
    window.addEventListener('resize', checkTouchScreen);
    
    return () => {
      window.removeEventListener('resize', checkTouchScreen);
    };
  }, []);

  return {
    hasTouchScreen,
    // CSS classes for touch optimization
    touchClasses: hasTouchScreen ? 'touch-manipulation min-h-[44px] min-w-[44px]' : '',
    // Minimum touch target size (44x44px is recommended by WCAG)
    minTouchSize: 44
  };
};
