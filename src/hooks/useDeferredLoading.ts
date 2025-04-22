
import { useState, useEffect } from "react";

interface DeferredLoadingOptions {
  delay?: number;
  priority?: boolean;
}

/**
 * Hook to manage deferred content loading for better performance
 * - For high priority content, loads immediately
 * - For lower priority content, defers loading until after main content
 */
export function useDeferredLoading({
  delay = 200,
  priority = false
}: DeferredLoadingOptions = {}) {
  const [isLoaded, setIsLoaded] = useState(priority);

  useEffect(() => {
    if (priority) {
      setIsLoaded(true);
      return;
    }

    // For non-priority content, defer loading
    const timer = setTimeout(() => {
      if (document.readyState === "complete") {
        setIsLoaded(true);
      } else {
        // If document not fully loaded, wait for it
        const handleLoad = () => setIsLoaded(true);
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, priority]);

  return isLoaded;
}

export default useDeferredLoading;
