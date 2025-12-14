import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/config';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserContext } from '../../contexts/UserContext';
import { 
  HiSun, 
  HiMoon, 
  HiMenu, 
  HiX, 
  HiChevronDown,
  HiCheck,
  HiUser,
  HiLogin
} from 'react-icons/hi';
import { FaGraduationCap, FaGlobe } from 'react-icons/fa';

export default function Navbar() {
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { isLoggdedIn } = useUserContext();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  // Initialize document direction and language on mount
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

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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

  const navLinks = [
    { path: '/portal', label: t('nav.home', 'Home') },
    { path: '/portal/courses', label: t('nav.courses', 'Courses') },
    { path: '/portal/about', label: t('nav.about', 'About') },
    { path: '/portal/contact', label: t('nav.contact', 'Contact') },
  ];

  const isActiveLink = (path) => {
    if (path === '/portal') {
      return location.pathname === '/portal' || location.pathname === '/portal/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 start-0 end-0 z-50 bg-white/90 dark:bg-myprimary/95 backdrop-blur-xl border-b border-gray-200/30 dark:border-white/5 shadow-lg shadow-black/5`}
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/portal" className="flex items-center space-x-2 rtl:space-x-reverse group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="p-1.5 bg-gradient-to-br from-mysecondary to-[#00d4b8] rounded-lg shadow-md shadow-mysecondary/30"
            >
              <FaGraduationCap className="w-4 h-4 text-white" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex flex-col"
            >
              <span className="text-base md:text-lg font-bold font-['Poppins'] bg-gradient-to-r from-mysecondary to-[#00d4b8] bg-clip-text text-transparent">
                RESK Academy
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-['Inter'] -mt-0.5">
                {t('nav.tagline', 'Engineering Excellence')}
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-0.5 rtl:space-x-reverse">
            {navLinks.map((link) => {
              const active = isActiveLink(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ y: -1 }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-['Inter'] font-medium transition-all duration-200 ${
                      active
                        ? 'text-mysecondary dark:text-mysecondary bg-mysecondary/10 dark:bg-mysecondary/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-mysecondary dark:hover:text-mysecondary hover:bg-gray-100 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 start-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-mysecondary rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="relative p-1.5 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 hover:shadow-md transition-all duration-300 group"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDarkMode ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {isDarkMode ? (
                  <HiSun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <HiMoon className="w-4 h-4 text-blue-600" />
                )}
              </motion.div>
            </motion.button>

            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1.5 rtl:space-x-reverse px-2 py-1.5 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 hover:shadow-md transition-all duration-200 font-['Inter'] font-medium"
                aria-label="Change language"
              >
                <FaGlobe className="w-4 h-4" />
                <span className="text-xs font-medium">{languages.find(l => l.code === currentLanguage)?.code.toUpperCase()}</span>
                <HiChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full end-0 mt-1.5 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden backdrop-blur-xl"
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

            {/* Login/Dashboard Button */}
            {!isLoggdedIn ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block"
              >
                <Link
                  to="/portal/login"
                  className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 bg-gradient-to-r from-mysecondary to-[#00d4b8] text-white rounded-lg text-sm font-semibold font-['Inter'] hover:shadow-md hover:shadow-mysecondary/30 transition-all duration-200"
                >
                  <HiLogin className="w-4 h-4" />
                  <span>{t('nav.login', 'Login')}</span>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block"
              >
                <Link
                  to="/portal/dashboard"
                  className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 bg-gradient-to-r from-mysecondary to-[#00d4b8] text-white rounded-lg text-sm font-semibold font-['Inter'] hover:shadow-md hover:shadow-mysecondary/30 transition-all duration-200"
                >
                  <HiUser className="w-4 h-4" />
                  <span>{t('nav.dashboard', 'Dashboard')}</span>
                </Link>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 hover:shadow-md transition-all duration-200"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <HiX className="w-5 h-5" />
                ) : (
                  <HiMenu className="w-5 h-5" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-gray-200/30 dark:border-white/5 bg-white/95 dark:bg-myprimary/95 backdrop-blur-xl"
          >
            <div className="px-3 py-3 space-y-0.5">
              {navLinks.map((link, index) => {
                const active = isActiveLink(link.path);
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-3 py-2 rounded-lg text-sm font-['Inter'] font-medium transition-all duration-200 ${
                        active
                          ? 'bg-mysecondary/10 dark:bg-mysecondary/20 text-mysecondary dark:text-mysecondary'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-mysecondary dark:hover:text-mysecondary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pt-3 mt-3 border-t border-gray-200/30 dark:border-white/5">
                {!isLoggdedIn ? (
                  <Link
                    to="/portal/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-1.5 rtl:space-x-reverse w-full px-3 py-2 bg-gradient-to-r from-mysecondary to-[#00d4b8] text-white rounded-lg text-sm font-semibold font-['Inter'] hover:shadow-md hover:shadow-mysecondary/30 transition-all duration-200"
                  >
                    <HiLogin className="w-4 h-4" />
                    <span>{t('nav.login', 'Login')}</span>
                  </Link>
                ) : (
                  <Link
                    to="/portal/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-1.5 rtl:space-x-reverse w-full px-3 py-2 bg-gradient-to-r from-mysecondary to-[#00d4b8] text-white rounded-lg text-sm font-semibold font-['Inter'] hover:shadow-md hover:shadow-mysecondary/30 transition-all duration-200"
                  >
                    <HiUser className="w-4 h-4" />
                    <span>{t('nav.dashboard', 'Dashboard')}</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
