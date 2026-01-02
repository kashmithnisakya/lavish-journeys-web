import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonEn from './locales/en/common.json';
import homeEn from './locales/en/home.json';
import formsEn from './locales/en/forms.json';
import toursEn from './locales/en/tours.json';
import modalEn from './locales/en/modal.json';

import commonRu from './locales/ru/common.json';
import homeRu from './locales/ru/home.json';
import formsRu from './locales/ru/forms.json';
import toursRu from './locales/ru/tours.json';
import modalRu from './locales/ru/modal.json';

import commonHi from './locales/hi/common.json';
import homeHi from './locales/hi/home.json';
import formsHi from './locales/hi/forms.json';
import toursHi from './locales/hi/tours.json';
import modalHi from './locales/hi/modal.json';

// Initialize i18next
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    // Language resources
    resources: {
      en: {
        common: commonEn,
        home: homeEn,
        forms: formsEn,
        tours: toursEn,
        modal: modalEn,
      },
      ru: {
        common: commonRu,
        home: homeRu,
        forms: formsRu,
        tours: toursRu,
        modal: modalRu,
      },
      hi: {
        common: commonHi,
        home: homeHi,
        forms: formsHi,
        tours: toursHi,
        modal: modalHi,
      },
    },

    // Default language
    fallbackLng: 'en',

    // Supported languages
    supportedLngs: ['en', 'ru', 'hi'],

    // Default namespace
    defaultNS: 'common',

    // Language detection options
    detection: {
      // Order of language detection
      order: ['localStorage', 'navigator'],

      // Keys to lookup language from
      lookupLocalStorage: 'lavish-language',

      // Cache user language
      caches: ['localStorage'],
    },

    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // React options
    react: {
      useSuspense: true,
    },

    // Debug mode (disable in production)
    debug: false,
  });

export default i18n;
