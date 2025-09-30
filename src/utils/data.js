import { getAssetPath } from './assets.js';

// List of startup slugs - update this when adding new startups
const STARTUP_SLUGS = [
  'acme-ai',
  'fintech-pro',
  'healthtech-solutions',
  'edtech-academy',
  'greentech-innovations',
  'blockchain-ventures'
];

export async function fetchStartups() {
  try {
    const startups = [];

    // Fetch each startup file individually
    for (const slug of STARTUP_SLUGS) {
      try {
        const response = await fetch(getAssetPath(`/data/startups/${slug}.json`));
        if (!response.ok) {
          // eslint-disable-next-line no-console
          console.warn(`Failed to fetch startup ${slug}: ${response.status}`);
          continue;
        }
        const startup = await response.json();
        startups.push(startup);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`Error fetching startup ${slug}:`, error);
        continue;
      }
    }

    return startups;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching startups:', error);
    throw error;
  }
}

export function filterStartups(startups, filters) {
  if (!startups || !Array.isArray(startups)) {
    return [];
  }

  return startups.filter(startup => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesName = Object.values(startup.name || {}).some(name =>
        name.toLowerCase().includes(searchTerm)
      );
      const matchesDescription = Object.values(startup.description || {}).some(desc =>
        desc.toLowerCase().includes(searchTerm)
      );
      const matchesShortDescription = Object.values(startup.shortDescription || {}).some(desc =>
        desc.toLowerCase().includes(searchTerm)
      );

      if (!matchesName && !matchesDescription && !matchesShortDescription) {
        return false;
      }
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      const categories = Object.values(startup.category || {});
      if (!categories.some(cat => cat.toLowerCase() === filters.category.toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}

export function sortStartups(startups, sortBy, sortOrder = 'asc') {
  if (!startups || !Array.isArray(startups)) {
    return [];
  }

  const sortedStartups = [...startups].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'name':
        aValue = a.name?.en || '';
        bValue = b.name?.en || '';
        break;
      case 'founded':
        aValue = parseInt(a.founded) || 0;
        bValue = parseInt(b.founded) || 0;
        break;
      case 'category':
        aValue = a.category?.en || '';
        bValue = b.category?.en || '';
        break;
      case 'lastUpdated':
        aValue = new Date(a.lastUpdated || 0);
        bValue = new Date(b.lastUpdated || 0);
        break;
      default:
        return 0;
    }

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return sortedStartups;
}

export function getUniqueCategories(startups, language = 'en') {
  if (!startups || !Array.isArray(startups)) {
    return [];
  }

  const categories = new Set();

  startups.forEach(startup => {
    if (startup.category && startup.category[language]) {
      categories.add(startup.category[language]);
    }
  });

  return Array.from(categories).sort();
}

export function formatDate(dateString, locale = 'en-US') {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
}

export function formatNumber(number) {
  if (!number || typeof number !== 'string') return number;

  // Handle common number formats like "1M", "50K", etc.
  const numericValue = parseFloat(number.replace(/[^\d.]/g, ''));
  if (isNaN(numericValue)) return number;

  if (number.includes('M') || number.includes('million')) {
    return `${numericValue}M`;
  }
  if (number.includes('K') || number.includes('thousand')) {
    return `${numericValue}K`;
  }
  if (number.includes('B') || number.includes('billion')) {
    return `${numericValue}B`;
  }

  return number;
}

export function validateStartupData(startup) {
  const requiredFields = ['id', 'name', 'description', 'shortDescription'];

  for (const field of requiredFields) {
    if (!startup[field]) {
      return { isValid: false, error: `Missing required field: ${field}` };
    }

    if (typeof startup[field] === 'object') {
      if (!startup[field].en) {
        return { isValid: false, error: `Missing English translation for field: ${field}` };
      }
    }
  }

  return { isValid: true };
}