import { Link } from 'react-router-dom';
import Typography from '../../atoms/Typography';
import Button from '../../atoms/Button';
import { useTheme } from '../../../hooks/useTheme';
import { useLanguage } from '../../../hooks/useLanguage';
import { useTranslation } from '../../../utils/i18n.jsx';
import './Header.css';

function Header({ className = '', ...props }) {
  const { toggleTheme, isDark } = useTheme();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <header className={`header ${className}`} {...props}>
      <div className="container">
        <div className="header__content">
          <Link to="/" className="header__logo">
            <Typography variant="h4" className="header__title">
              OpenStartup
            </Typography>
          </Link>

          <nav className="header__nav">
            <div className="header__controls">
              <div className="header__language-selector">
                <label htmlFor="language-select" className="sr-only">
                  {t('navigation.language')}
                </label>
                <select
                  id="language-select"
                  value={currentLanguage}
                  onChange={handleLanguageChange}
                  className="header__language-select"
                >
                  {Object.entries(languages).map(([code, lang]) => (
                    <option key={code} value={code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                variant="ghost"
                size="small"
                onClick={toggleTheme}
                className="header__theme-toggle"
                aria-label={isDark ? t('navigation.lightMode') : t('navigation.darkMode')}
              >
                {isDark ? '☀️' : '🌙'}
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;