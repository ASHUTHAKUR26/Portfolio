import { useEffect, useRef, useState } from "react";

/**
 * Thin wrapper over IntersectionObserver. Fires once by default so
 * scroll-reveal animations don't re-trigger every time a section
 * scrolls in and out of view.
 */
export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit & { once?: boolean } = {}
) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const { once = true, ...observerOptions } = options;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setIsInView(false);
      }
    }, { threshold: 0.15, ...observerOptions });

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, observerOptions]);

  return { ref, isInView };
}
