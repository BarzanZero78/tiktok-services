// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ksTranslation from './ks.json';
import kbTranslation from './kb.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      sorani: { translation: ksTranslation },
      badini: { translation: kbTranslation },
    },
    fallbackLng: 'sorani',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
