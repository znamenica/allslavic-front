import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const options = {
    fallbackLng: 'ru',
    supportedLngs: ['en', 'ru'],
    // load: 'languageOnly',
    // have a common namespace used around the full app
    ns: ['translation'],
    defaultNS: 'translation',
    // initImmediate: false,
    saveMissing: true,
    // useSuspense: false,
    debug: true,
    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ',',
        format: (value: string, format: string) => {
            if (format === 'uppercase') return value.toUpperCase();
            return value;
        },
    },
    useSuspense: process && !process.release,
};

// for browser use http backend to load translations and browser lng detector
if (process && !process.release) {
    i18n.use(Backend).use(initReactI18next).use(LanguageDetector);
}

// initialize if not already initialized
if (!i18n.isInitialized) {
    i18n.init(options as any);
}

export default i18n;