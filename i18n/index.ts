import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next)
.init({
    compatibilityJSON: 'v4',
    lng: Localization.getLocales()[0].languageCode ?? 'en',
    fallbackLng: 'en',
    resources: {
        en: {
            translation: en
        },
        es: {
            translation: es
        }
    },
    interpolation: {
        escapeValue: false
    }
})

export default i18n;