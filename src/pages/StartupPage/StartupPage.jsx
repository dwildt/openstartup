import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import StartupCard from '../../components/molecules/StartupCard';
import { useStartups, useStartupById, useRelatedStartups } from '../../hooks/useStartups';
import { useLanguage } from '../../hooks/useLanguage';
import { useTranslation } from '../../utils/i18n.jsx';
import { formatDate, formatNumber } from '../../utils/data';
import { getAssetPath } from '../../utils/assets';
import './StartupPage.css';

function StartupPage() {
  const { id } = useParams();
  const { startups, loading, error } = useStartups();
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const [logoError, setLogoError] = useState(false);

  const startup = useStartupById(startups, id);
  const relatedStartups = useRelatedStartups(startups, startup, 3);

  if (loading) {
    return (
      <div className="startup-page">
        <Header />
        <main className="startup-page__content">
          <div className="container">
            <div className="startup-page__loading">
              <Typography variant="body">{t('common.loading')}</Typography>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="startup-page">
        <Header />
        <main className="startup-page__content">
          <div className="container">
            <div className="startup-page__error">
              <Typography variant="body" color="error">
                {t('common.error')}: {error}
              </Typography>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="startup-page">
        <Header />
        <main className="startup-page__content">
          <div className="container">
            <div className="startup-page__not-found">
              <Typography variant="h2">{t('errors.startupNotFound')}</Typography>
              <Link to="/">
                <Button variant="primary">{t('common.backToList')}</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const name = startup.name?.[currentLanguage] || startup.name?.en || '';
  const description = startup.description?.[currentLanguage] || startup.description?.en || '';
  const category = startup.category?.[currentLanguage] || startup.category?.en || '';
  const tags = startup.tags?.[currentLanguage] || startup.tags?.en || [];

  const handleLogoError = () => {
    setLogoError(true);
  };

  return (
    <div className="startup-page">
      <Header />

      <main className="startup-page__content">
        <div className="container">
          <nav className="startup-page__nav">
            <Link to="/">
              <Button variant="outline" size="small">
                ← {t('common.backToList')}
              </Button>
            </Link>
          </nav>

          <article className="startup-page__article">
            <header className="startup-page__header">
              <div className="startup-page__title-section">
                {startup.logo && !logoError ? (
                  <img
                    src={getAssetPath(startup.logo)}
                    alt={`${name} logo`}
                    className="startup-page__logo"
                    onError={handleLogoError}
                  />
                ) : (
                  <img
                    src={getAssetPath('/images/default-logo.svg')}
                    alt={`${name} logo`}
                    className="startup-page__logo"
                  />
                )}
                <div>
                  <Typography variant="h1" className="startup-page__name">
                    {name}
                  </Typography>
                  {category && (
                    <Typography variant="subtitle" className="startup-page__category">
                      {category}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="startup-page__actions">
                {startup.website && (
                  <a
                    href={startup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary">
                      {t('common.website')} ↗
                    </Button>
                  </a>
                )}
              </div>
            </header>

            <section className="startup-page__description">
              <Typography variant="h3">{t('startup.description')}</Typography>
              <Typography variant="body">{description}</Typography>
            </section>

            <div className="startup-page__details">
              <section className="startup-page__info">
                <Typography variant="h3">{t('startup.metrics')}</Typography>
                <div className="startup-page__info-grid">
                  {startup.founded && (
                    <div className="startup-page__info-item">
                      <Typography variant="caption">{t('common.founded')}</Typography>
                      <Typography variant="body">{startup.founded}</Typography>
                    </div>
                  )}
                  {startup.location && (
                    <div className="startup-page__info-item">
                      <Typography variant="caption">{t('common.location')}</Typography>
                      <Typography variant="body">{startup.location}</Typography>
                    </div>
                  )}
                  {startup.employees && (
                    <div className="startup-page__info-item">
                      <Typography variant="caption">{t('common.employees')}</Typography>
                      <Typography variant="body">{startup.employees}</Typography>
                    </div>
                  )}
                  {startup.funding && (
                    <div className="startup-page__info-item">
                      <Typography variant="caption">{t('common.funding')}</Typography>
                      <Typography variant="body">{startup.funding}</Typography>
                    </div>
                  )}
                  {startup.metrics?.users && (
                    <div className="startup-page__info-item">
                      <Typography variant="caption">{t('startup.users')}</Typography>
                      <Typography variant="body">{formatNumber(startup.metrics.users)}</Typography>
                    </div>
                  )}
                  {startup.metrics?.revenue && (
                    <div className="startup-page__info-item">
                      <Typography variant="caption">{t('common.revenue')}</Typography>
                      <Typography variant="body">{startup.metrics.revenue}</Typography>
                    </div>
                  )}
                  {startup.metrics?.growth && (
                    <div className="startup-page__info-item">
                      <Typography variant="caption">{t('startup.growth')}</Typography>
                      <Typography variant="body">{startup.metrics.growth}</Typography>
                    </div>
                  )}
                </div>
              </section>

              {(startup.contact?.email || startup.contact?.phone || startup.socialMedia) && (
                <section className="startup-page__contact">
                  <Typography variant="h3">{t('startup.contact')}</Typography>
                  <div className="startup-page__contact-grid">
                    {startup.contact?.email && (
                      <a href={`mailto:${startup.contact.email}`} className="startup-page__contact-item">
                        <Typography variant="caption">{t('startup.email')}</Typography>
                        <Typography variant="body">{startup.contact.email}</Typography>
                      </a>
                    )}
                    {startup.contact?.phone && (
                      <a href={`tel:${startup.contact.phone}`} className="startup-page__contact-item">
                        <Typography variant="caption">{t('startup.phone')}</Typography>
                        <Typography variant="body">{startup.contact.phone}</Typography>
                      </a>
                    )}
                    {startup.socialMedia?.twitter && (
                      <a href={startup.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="startup-page__contact-item">
                        <Typography variant="caption">Twitter</Typography>
                        <Typography variant="body">@{startup.socialMedia.twitter.split('/').pop()}</Typography>
                      </a>
                    )}
                    {startup.socialMedia?.linkedin && (
                      <a href={startup.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="startup-page__contact-item">
                        <Typography variant="caption">LinkedIn</Typography>
                        <Typography variant="body">View Profile</Typography>
                      </a>
                    )}
                  </div>
                </section>
              )}
            </div>

            {tags.length > 0 && (
              <section className="startup-page__tags">
                <Typography variant="h4">{t('common.tags')}</Typography>
                <div className="startup-page__tag-list">
                  {tags.map((tag, index) => (
                    <span key={index} className="startup-page__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {startup.lastUpdated && (
              <footer className="startup-page__footer">
                <Typography variant="caption">
                  {t('startup.lastUpdated', { date: formatDate(startup.lastUpdated) })}
                </Typography>
              </footer>
            )}
          </article>

          {relatedStartups.length > 0 && (
            <section className="startup-page__related">
              <Typography variant="h2">{t('startup.relatedStartups')}</Typography>
              <div className="startup-page__related-grid">
                {relatedStartups.map(relatedStartup => (
                  <StartupCard key={relatedStartup.id} startup={relatedStartup} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default StartupPage;