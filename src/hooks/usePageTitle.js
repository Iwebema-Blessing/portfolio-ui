import { useEffect } from 'react';

/** Keeps the browser tab title in step with the page. */
export const usePageTitle = (title) => {
  useEffect(() => {
    if (!title) return undefined;
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
};
