import i18n from "i18next";               
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

/*
// In our components or hooks
import { useTranslation } from "react-i18next";

// ...

const { i18n } = useTranslation();

const activeLocale = i18n.resolvedLanguage; 
// => "en" when active locale is English

i18n.changeLanguage("ar");
// Active locale is now Arabic; components
// will re-render to reflect this.

We have two properties for accessing the active locale:
i18n.language is either the detected language
(if we’re using browser detection, more on that later)
or the one set directly via i18n.changeLanguage().
i18n.resolvedLanguage is the actual language used,
after resolving fallback, and the one that has 
a corresponding translation file.
*/

// Get saved language from localStorage before initialization
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const savedLang = localStorage.getItem('i18nextLng');
    // Validate saved language is one of our supported languages
    if (savedLang === 'en' || savedLang === 'ar') {
      return savedLang;
    }
  }
  return 'ar'; // Default to Arabic
};

const initialLanguage = getInitialLanguage();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar }
  },
  lng: initialLanguage,
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false
  }
});

// Set initial document direction
if (typeof window !== 'undefined') {
  document.documentElement.dir = initialLanguage === 'ar' ? 'rtl' : 'ltr';
  
  // Update direction when language changes
  i18n.on('languageChanged', (lng) => {
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('i18nextLng', lng);
  });
}

export default i18n;