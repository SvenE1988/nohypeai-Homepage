
import { useState, useEffect, useRef } from "react";

interface DeferredLoadingOptions {
  delay?: number;
  priority?: boolean;
  onLoad?: () => void;
}

/**
 * Hook to manage deferred content loading for better performance
 * - For high priority content, loads immediately
 * - For lower priority content, defers loading until after main content
 */
export function useDeferredLoading({
  delay = 200,
  priority = false,
  onLoad
}: DeferredLoadingOptions = {}) {
  const [isLoaded, setIsLoaded] = useState(priority);
  const onLoadCalled = useRef(false);

  useEffect(() => {
    if (priority) {
      setIsLoaded(true);
      if (onLoad && !onLoadCalled.current) {
        onLoad();
        onLoadCalled.current = true;
      }
      return;
    }

    // For non-priority content, defer loading
    const timer = setTimeout(() => {
      if (document.readyState === "complete") {
        setIsLoaded(true);
        if (onLoad && !onLoadCalled.current) {
          onLoad();
          onLoadCalled.current = true;
        }
      } else {
        // If document not fully loaded, wait for it
        const handleLoad = () => {
          setIsLoaded(true);
          if (onLoad && !onLoadCalled.current) {
            onLoad();
            onLoadCalled.current = true;
          }
        };
        window.addEventListener("load", handleLoad, { passive: true });
        return () => window.removeEventListener("load", handleLoad);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, priority, onLoad]);

  return isLoaded;
}

export default useDeferredLoading;
