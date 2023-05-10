import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from './lang/ar.json';
import en from './lang/en.json';

export const resources = {
  en: {
    translation: {
      ...en,
    },
  },
  ar: {
    translation: {
      ...ar,
    },
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
