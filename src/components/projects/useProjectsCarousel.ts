
import { useCallback, useEffect, useRef, useState } from "react";
import { projectsData } from "./ProjectsData";

export function useProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<any>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay/visibility logic
  useEffect(() => {
    if (!api) return;

    const startAutoplay = () => {
      stopAutoplay();
      if (document.visibilityState === "visible") {
        autoplayIntervalRef.current = setInterval(() => {
          if (document.visibilityState === "visible") {
            api.scrollNext();
          }
        }, 5000);
      }
    };

    const stopAutoplay = () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startAutoplay();
      } else {
        stopAutoplay();
      }
    };

    // Use passive event listener for better performance
    document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });

    // Start autoplay on mount
    startAutoplay();

    // Pause on pointer interaction only inside the projects section
    const root = document.querySelector("#projekte");
    if (root) {
      root.addEventListener("pointerdown", stopAutoplay, { passive: true });
      root.addEventListener("pointerup", startAutoplay, { passive: true });
    }

    return () => {
      stopAutoplay();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (root) {
        root.removeEventListener("pointerdown", stopAutoplay);
        root.removeEventListener("pointerup", startAutoplay);
      }
    };
  }, [api]);

  // Track active slide with memoized callback
  useEffect(() => {
    if (!api) return;
    
    // Debounce the select event to avoid too many state updates
    let timeoutId: NodeJS.Timeout | null = null;
    
    const onSelect = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setActiveIndex(api.selectedScrollSnap());
      }, 10);
    };
    
    api.on("select", onSelect);
    onSelect();
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      api.off("select", onSelect);
    };
  }, [api]);

  // Instead of returning JSX, return the data needed to render indicators
  const getIndicatorProps = useCallback(
    (index: number) => {
      return {
        key: index,
        isActive: activeIndex === index,
        onClick: () => api?.scrollTo(index),
        ariaLabel: `Go to slide ${index + 1}`
      };
    },
    [activeIndex, api]
  );

  return {
    activeIndex,
    setApi,
    api,
    getIndicatorProps,
    indicatorsCount: projectsData.length
  };
}
