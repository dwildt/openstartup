import Typography from '../../atoms/Typography';
import { useTranslation } from '../../../utils/i18n.jsx';
import './Footer.css';

function Footer({ className = '', ...props }) {
  const { t } = useTranslation();

  return (
    <footer className={`footer ${className}`} {...props}>
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <Typography variant="h6" className="footer__title">
              OpenStartup
            </Typography>
            <Typography variant="caption" className="footer__description">
              {t('footer.description')}
            </Typography>
          </div>

          <div className="footer__section">
            <Typography variant="h6" className="footer__title">
              {t('footer.openSource')}
            </Typography>
            <div className="footer__links">
              <a
                href="https://github.com/dwildt/openstartup"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <span className="footer__icon">📂</span>
                {t('footer.sourceCode')}
              </a>
              <a
                href="https://github.com/sponsors/dwildt"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <span className="footer__icon">💖</span>
                {t('footer.sponsor')}
              </a>
            </div>
          </div>

          <div className="footer__section">
            <Typography variant="h6" className="footer__title">
              {t('footer.builtWith')}
            </Typography>
            <div className="footer__links">
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <span className="footer__icon">🤖</span>
                Claude Code
              </a>
              <a
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <span className="footer__icon">⚛️</span>
                React
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;