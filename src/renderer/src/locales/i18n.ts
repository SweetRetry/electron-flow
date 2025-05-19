import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations from the new location
// Note: The path is now relative to src/renderer/src/locales/i18n.js
import enTranslation from './en/translation.json';
import zhTranslation from './zh/translation.json';

const resources = {
  en: {
    translation: enTranslation, // 'translation' is the default namespace
  },
  zh: {
    translation: zhTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources, // Use the imported resources
    fallbackLng: 'en',
    debug: true, // Set to false in production
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n; 