import { useEffect } from "react";

export const useAutoScrollDown = (ref: React.RefObject<HTMLDivElement>, scrollTarget?: HTMLElement) => {
  useEffect(() => {
    if (!ref.current) return;

    // Observer to scroll to bottom when main element is resized
    const observer = new ResizeObserver((entries) => {
      for (const _ of entries) {
        (scrollTarget || window).scrollTo({
          top: (scrollTarget || document.body).scrollHeight,
          behavior: 'smooth',
        });
      }
    });

    // Observe main element
    observer.observe(ref.current);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);
};
