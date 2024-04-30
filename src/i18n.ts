import { createI18n } from 'vue-i18n';
import fr from './locales/fr.json';
import en from './locales/en.json';

const i18n = createI18n({
  locale: window.localStorage.getItem('locale') || 'fr',
  fallbackLocale: 'fr',
  messages: {
    fr: fr,
    en: en
  },
  legacy: false
});

if (!window.localStorage.getItem('locale')) {
  window.localStorage.setItem('locale', 'fr');
}

export const changeLang = (lang: "fr" | "en") => {
  i18n.global.locale.value = lang;
  window.localStorage.setItem('locale', lang);
}

export default i18n;
