import { filterStartups, sortStartups, getUniqueCategories, formatDate, formatNumber, validateStartupData } from './data';

describe('Data utilities', () => {
  const mockStartups = [
    {
      id: '1',
      name: { en: 'Startup A', pt: 'Startup A PT' },
      description: { en: 'Description A', pt: 'Descrição A' },
      shortDescription: { en: 'Short A', pt: 'Curta A' },
      category: { en: 'Technology', pt: 'Tecnologia' },
      tags: { en: ['AI', 'Tech'], pt: ['IA', 'Tech'] },
      founded: '2022',
      lastUpdated: '2024-01-01T00:00:00.000Z'
    },
    {
      id: '2',
      name: { en: 'Startup B', pt: 'Startup B PT' },
      description: { en: 'Description B', pt: 'Descrição B' },
      shortDescription: { en: 'Short B', pt: 'Curta B' },
      category: { en: 'Finance', pt: 'Finanças' },
      tags: { en: ['FinTech', 'Banking'], pt: ['FinTech', 'Banco'] },
      founded: '2021',
      lastUpdated: '2024-01-02T00:00:00.000Z'
    }
  ];

  describe('filterStartups', () => {
    test('filters by search term', () => {
      const result = filterStartups(mockStartups, { search: 'Startup A' });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    test('filters by category', () => {
      const result = filterStartups(mockStartups, { category: 'Technology' });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    test('returns empty array for invalid input', () => {
      expect(filterStartups(null, {})).toEqual([]);
      expect(filterStartups(undefined, {})).toEqual([]);
    });
  });

  describe('sortStartups', () => {
    test('sorts by name ascending', () => {
      const result = sortStartups(mockStartups, 'name', 'asc');
      expect(result[0].name.en).toBe('Startup A');
    });

    test('sorts by founded year descending', () => {
      const result = sortStartups(mockStartups, 'founded', 'desc');
      expect(result[0].founded).toBe('2022');
    });

    test('handles invalid input', () => {
      expect(sortStartups(null, 'name')).toEqual([]);
    });
  });

  describe('getUniqueCategories', () => {
    test('returns unique categories', () => {
      const result = getUniqueCategories(mockStartups, 'en');
      expect(result).toEqual(['Finance', 'Technology']);
    });

    test('handles different languages', () => {
      const result = getUniqueCategories(mockStartups, 'pt');
      expect(result).toEqual(['Finanças', 'Tecnologia']);
    });
  });

  describe('formatDate', () => {
    test('formats valid date', () => {
      const result = formatDate('2024-01-15T00:00:00.000Z');
      expect(result).toContain('2024');
    });

    test('handles invalid date', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate(null)).toBe('');
    });
  });

  describe('formatNumber', () => {
    test('formats numbers with M', () => {
      expect(formatNumber('5M')).toBe('5M');
      expect(formatNumber('5 million')).toBe('5M');
    });

    test('returns original for non-numeric strings', () => {
      expect(formatNumber('invalid')).toBe('invalid');
    });
  });

  describe('validateStartupData', () => {
    test('validates complete startup data', () => {
      const result = validateStartupData(mockStartups[0]);
      expect(result.isValid).toBe(true);
    });

    test('invalidates incomplete data', () => {
      const result = validateStartupData({ id: '1' });
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('name');
    });
  });
});