
import { useCallback, useEffect, useRef, useState } from "react";
import { Project } from "./types";
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

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start autoplay on mount
    startAutoplay();

    // Pause on pointer interaction only inside the projects section
    const root = document.querySelector("#projekte");
    if (root) {
      root.addEventListener("pointerdown", stopAutoplay);
      root.addEventListener("pointerup", startAutoplay);
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
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => {
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
