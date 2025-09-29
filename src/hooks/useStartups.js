import { useState, useEffect, useMemo } from 'react';
import { fetchStartups, filterStartups, sortStartups, getUniqueCategories } from '../utils/data';

export function useStartups() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStartups = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchStartups();
        setStartups(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStartups();
  }, []);

  return { startups, loading, error, refetch: () => window.location.reload() };
}

export function useFilteredStartups(startups, filters = {}) {
  return useMemo(() => {
    let filtered = filterStartups(startups, filters);

    if (filters.sortBy) {
      filtered = sortStartups(filtered, filters.sortBy, filters.sortOrder);
    }

    return filtered;
  }, [startups, filters]);
}

export function useStartupCategories(startups, language = 'en') {
  return useMemo(() => {
    return getUniqueCategories(startups, language);
  }, [startups, language]);
}

export function useStartupById(startups, id) {
  return useMemo(() => {
    return startups.find(startup => startup.id === id);
  }, [startups, id]);
}

export function useRelatedStartups(startups, currentStartup, limit = 3) {
  return useMemo(() => {
    if (!currentStartup || !startups.length) return [];

    const currentCategory = currentStartup.category?.en;
    const currentTags = currentStartup.tags?.en || [];

    const related = startups
      .filter(startup => startup.id !== currentStartup.id)
      .map(startup => {
        let score = 0;

        // Score by category match
        if (startup.category?.en === currentCategory) {
          score += 10;
        }

        // Score by tag matches
        const startupTags = startup.tags?.en || [];
        const commonTags = startupTags.filter(tag => currentTags.includes(tag));
        score += commonTags.length * 2;

        return { ...startup, relevanceScore: score };
      })
      .filter(startup => startup.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);

    return related;
  }, [startups, currentStartup, limit]);
}