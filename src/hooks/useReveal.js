import { useEffect, useRef, useState } from 'react';

/** True once the element has been on screen. Used for the single entrance pass. */
export const useReveal = (options = { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }) => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || seen) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      });
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen]);

  return [ref, seen];
};
