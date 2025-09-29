import { Link } from 'react-router-dom';
import { useState } from 'react';
import Typography from '../../atoms/Typography';
import Button from '../../atoms/Button';
import { useLanguage } from '../../../hooks/useLanguage';
import { useTranslation } from '../../../utils/i18n.jsx';
import { formatDate } from '../../../utils/data';
import './StartupCard.css';

function StartupCard({ startup, className = '', ...props }) {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const [logoError, setLogoError] = useState(false);

  if (!startup) return null;

  const name = startup.name?.[currentLanguage] || startup.name?.en || '';
  const shortDescription = startup.shortDescription?.[currentLanguage] || startup.shortDescription?.en || '';
  const category = startup.category?.[currentLanguage] || startup.category?.en || '';
  const tags = startup.tags?.[currentLanguage] || startup.tags?.en || [];

  const handleLogoError = () => {
    setLogoError(true);
  };

  return (
    <article className={`startup-card ${className}`} {...props}>
      <div className="startup-card__header">
        {startup.logo && !logoError ? (
          <img
            src={startup.logo}
            alt={`${name} logo`}
            className="startup-card__logo"
            loading="lazy"
            onError={handleLogoError}
          />
        ) : (
          <img
            src="/images/default-logo.svg"
            alt={`${name} logo`}
            className="startup-card__logo"
            loading="lazy"
          />
        )}
        <div className="startup-card__title-section">
          <Typography variant="h3" className="startup-card__name">
            {name}
          </Typography>
          {category && (
            <Typography variant="caption" className="startup-card__category">
              {category}
            </Typography>
          )}
        </div>
      </div>

      <Typography variant="body" className="startup-card__description">
        {shortDescription}
      </Typography>

      <div className="startup-card__meta">
        <div className="startup-card__info">
          {startup.founded && (
            <span className="startup-card__founded">
              {t('common.founded')}: {startup.founded}
            </span>
          )}
          {startup.location && (
            <span className="startup-card__location">
              📍 {startup.location}
            </span>
          )}
          {startup.employees && (
            <span className="startup-card__employees">
              👥 {startup.employees}
            </span>
          )}
        </div>

        {tags.length > 0 && (
          <div className="startup-card__tags">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="startup-card__tag">
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="startup-card__tag startup-card__tag--more">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="startup-card__actions">
        <Link to={`/startup/${startup.id}`} className="startup-card__link">
          <Button variant="primary" size="small">
            {t('common.viewMore')}
          </Button>
        </Link>
        {startup.website && (
          <a
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className="startup-card__website"
          >
            <Button variant="outline" size="small">
              {t('common.website')}
            </Button>
          </a>
        )}
      </div>

      {startup.lastUpdated && (
        <Typography variant="caption" className="startup-card__updated">
          {t('startup.lastUpdated', { date: formatDate(startup.lastUpdated) })}
        </Typography>
      )}
    </article>
  );
}

export default StartupCard;