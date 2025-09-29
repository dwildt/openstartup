import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
import StartupGrid from '../../components/organisms/StartupGrid';
import Typography from '../../components/atoms/Typography';
import { useStartups } from '../../hooks/useStartups';
import { useTranslation } from '../../utils/i18n.jsx';
import './MainPage.css';

function MainPage() {
  const { startups, loading, error } = useStartups();
  const { t } = useTranslation();

  return (
    <div className="main-page">
      <Header />

      <main className="main-page__content">
        <div className="container">
          <section className="main-page__hero">
            <Typography variant="h1" align="center" className="main-page__title">
              {t('main.title')}
            </Typography>
            <Typography variant="subtitle" align="center" className="main-page__subtitle">
              {t('main.subtitle')}
            </Typography>
          </section>

          <section className="main-page__startups">
            <StartupGrid
              startups={startups}
              loading={loading}
              error={error}
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MainPage;