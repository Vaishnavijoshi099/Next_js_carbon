import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';

i18n
  .use(LanguageDetector) // Language detection
  .use(initReactI18next) // React integration
  .init({
    fallbackLng: 'en', // Default language if none is found
    debug: true, // Enable debug mode
    resources: {
      en: {
        translation: en, // English translations
      },
      fr: {
        translation: fr, // French translations
      },
      es: {
        translation : es,
      }
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'], // How to detect the language
      caches: ['localStorage', 'cookie'], // Where to store detected language
    },
    react: {
      useSuspense: true, // Enable Suspense if needed
    },
  });

export default i18n;
