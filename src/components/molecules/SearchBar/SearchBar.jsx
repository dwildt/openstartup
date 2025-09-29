import { useState } from 'react';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import { useTranslation } from '../../../utils/i18n.jsx';
import './SearchBar.css';

function SearchBar({ onSearch, placeholder, className = '', ...props }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form className={`search-bar ${className}`} onSubmit={handleSubmit} {...props}>
      <div className="search-bar__input-group">
        <Input
          type="text"
          placeholder={placeholder || t('common.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar__input"
        />
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="small"
            onClick={handleClear}
            className="search-bar__clear"
            aria-label={t('common.reset')}
          >
            ✕
          </Button>
        )}
      </div>
      <Button type="submit" className="search-bar__submit">
        {t('common.search')}
      </Button>
    </form>
  );
}

export default SearchBar;