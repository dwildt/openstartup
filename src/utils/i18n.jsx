import { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from '../translations/en.json';
import ptTranslations from '../translations/pt.json';
import esTranslations from '../translations/es.json';

const LANGUAGES = {
  en: { name: 'English', code: 'en' },
  pt: { name: 'Português', code: 'pt' },
  es: { name: 'Español', code: 'es' },
};

const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'openstartup-language';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    pt: { translation: ptTranslations },
    es: { translation: esTranslations },
  },
  lng: localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(
    () => localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE
  );

  const changeLanguage = (languageCode) => {
    if (LANGUAGES[languageCode]) {
      setCurrentLanguage(languageCode);
      i18n.changeLanguage(languageCode);
      localStorage.setItem(STORAGE_KEY, languageCode);
    }
  };

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const value = {
    currentLanguage,
    changeLanguage,
    languages: LANGUAGES,
    t: i18n.t.bind(i18n),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useTranslation() {
  const { t } = useLanguage();
  return { t };
}