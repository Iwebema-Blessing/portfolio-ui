import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { endpoints } from '@/lib/api';
import { siteFallback } from '@/data/site';

const SiteContext = createContext(null);

/** Holds the editable site copy so any page can read it without refetching. */
export const SiteProvider = ({ children }) => {
  const [settings, setSettings] = useState(siteFallback);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    endpoints
      .settings()
      .then((response) => {
        if (active && response?.data) {
          setSettings((current) => ({ ...current, ...response.data }));
        }
      })
      .catch(() => {
        /* the fallback copy is already on screen */
      })
      .finally(() => active && setLoaded(true));

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => ({ settings, setSettings, loaded }), [settings, loaded]);
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used inside SiteProvider');
  return context;
};
