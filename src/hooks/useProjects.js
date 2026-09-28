import { useCallback, useEffect, useState } from 'react';
import { endpoints } from '@/lib/api';

/** Loads published projects for the public pages. */
export const useProjects = (params = {}) => {
  const [projects, setProjects] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const key = JSON.stringify(params);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await endpoints.publicProjects(JSON.parse(key));
      setProjects(response.data || []);
      setMeta(response.meta || null);
    } catch (problem) {
      setError(problem.message);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => {
    load();
  }, [load]);

  return { projects, meta, loading, error, reload: load };
};
