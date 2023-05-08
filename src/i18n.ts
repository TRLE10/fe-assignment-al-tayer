import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation from './lang/en.json';

export const resources = {
  en: {
    translation,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
