import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/config';
import { HiChevronDown, HiCheck } from 'react-icons/hi';
import { FaGlobe } from 'react-icons/fa';

export default function LanguageSwitcher({ className = '' }) {
  const { t } = useTranslation();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    try {
      return i18n.language || i18n.resolvedLanguage || 'ar';
    } catch {
      return 'ar';
    }
  });
  const langMenuRef = useRef(null);

  const isRTL = currentLanguage === 'ar';

  // Initialize language on mount
  useEffect(() => {
    try {
      const lang = i18n.language || i18n.resolvedLanguage || 'ar';
      setCurrentLanguage(lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    } catch (error) {
      console.error('Error initializing language:', error);
    }
  }, []);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLanguage(lng);
      document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    };

    try {
      i18n.on('languageChanged', handleLanguageChange);
    } catch (error) {
      console.error('Error setting up language listener:', error);
    }
    
    return () => {
      try {
        i18n.off('languageChanged', handleLanguageChange);
      } catch (error) {
        // Ignore cleanup errors
      }
    };
  }, []);

  // Handle click outside to close language menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleLanguage = async (lang) => {
    try {
      await i18n.changeLanguage(lang);
      setIsLangMenuOpen(false);
      setCurrentLanguage(lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  return (
    <div className={`relative ${className}`} ref={langMenuRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
        className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-200 font-['Inter'] font-medium shadow-lg"
        aria-label={t('nav.changeLanguage', 'Change language')}
      >
        <FaGlobe className="w-4 h-4" />
        <span className="text-sm font-medium">{languages.find(l => l.code === currentLanguage)?.code.toUpperCase()}</span>
        <HiChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isLangMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full end-0 mt-1.5 w-36 bg-white/95 dark:bg-gray-800 rounded-lg shadow-lg border border-white/30 dark:border-gray-700/50 overflow-hidden backdrop-blur-xl z-50"
          >
            {languages.map((lang) => {
              const isActive = currentLanguage === lang.code;
              return (
                <motion.button
                  key={lang.code}
                  whileHover={{ x: isRTL ? -4 : 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleLanguage(lang.code)}
                  className={`w-full px-3 py-2 text-start hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center space-x-2 rtl:space-x-reverse text-sm ${
                    isActive
                      ? 'bg-mysecondary/10 dark:bg-mysecondary/20 text-mysecondary dark:text-mysecondary'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="font-['Inter'] font-medium flex-1">{lang.name}</span>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <HiCheck className="w-4 h-4 text-mysecondary" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

