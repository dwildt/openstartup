import { useState } from 'react';
import StartupCard from '../../molecules/StartupCard';
import SearchBar from '../../molecules/SearchBar';
import Button from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import { useTranslation } from '../../../utils/i18n.jsx';
import { useLanguage } from '../../../hooks/useLanguage';
import { useFilteredStartups, useStartupCategories } from '../../../hooks/useStartups';
import './StartupGrid.css';

function StartupGrid({ startups, loading, error, className = '', ...props }) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const categories = useStartupCategories(startups, currentLanguage);
  const filteredStartups = useFilteredStartups(startups, filters);

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleCategoryChange = (e) => {
    setFilters(prev => ({ ...prev, category: e.target.value }));
  };

  const handleSortChange = (e) => {
    setFilters(prev => ({ ...prev, sortBy: e.target.value }));
  };

  const handleSortOrderToggle = () => {
    setFilters(prev => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  if (loading) {
    return (
      <div className={`startup-grid ${className}`} {...props}>
        <div className="startup-grid__loading">
          <Typography variant="body">{t('common.loading')}</Typography>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`startup-grid ${className}`} {...props}>
        <div className="startup-grid__error">
          <Typography variant="body" color="error">
            {t('common.error')}: {error}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={`startup-grid ${className}`} {...props}>
      <div className="startup-grid__filters">
        <SearchBar
          onSearch={handleSearch}
          placeholder={t('main.searchPlaceholder')}
          className="startup-grid__search"
        />

        <div className="startup-grid__filter-controls">
          <div className="startup-grid__filter-group">
            <label htmlFor="category-filter" className="startup-grid__filter-label">
              {t('common.category')}:
            </label>
            <select
              id="category-filter"
              value={filters.category}
              onChange={handleCategoryChange}
              className="startup-grid__filter-select"
            >
              <option value="all">{t('filters.allCategories')}</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="startup-grid__filter-group">
            <label htmlFor="sort-filter" className="startup-grid__filter-label">
              {t('filters.sortBy')}:
            </label>
            <select
              id="sort-filter"
              value={filters.sortBy}
              onChange={handleSortChange}
              className="startup-grid__filter-select"
            >
              <option value="name">{t('filters.sortName')}</option>
              <option value="founded">{t('common.founded')}</option>
              <option value="category">{t('common.category')}</option>
              <option value="lastUpdated">{t('filters.sortDate')}</option>
            </select>
          </div>

          <Button
            variant="outline"
            size="small"
            onClick={handleSortOrderToggle}
            className="startup-grid__sort-order"
          >
            {filters.sortOrder === 'asc' ? '↑' : '↓'}
            {filters.sortOrder === 'asc' ? t('filters.ascending') : t('filters.descending')}
          </Button>

          <Button
            variant="ghost"
            size="small"
            onClick={resetFilters}
            className="startup-grid__reset"
          >
            {t('common.reset')}
          </Button>
        </div>
      </div>

      <div className="startup-grid__results">
        <Typography variant="body" className="startup-grid__count">
          {t('main.showingResults', { count: filteredStartups.length })}
        </Typography>

        {filteredStartups.length === 0 ? (
          <div className="startup-grid__no-results">
            <Typography variant="body">{t('main.noResults')}</Typography>
          </div>
        ) : (
          <div className="startup-grid__grid">
            {filteredStartups.map(startup => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StartupGrid;