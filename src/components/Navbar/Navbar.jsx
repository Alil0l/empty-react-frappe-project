import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  HiLogin,
  HiLogout
} from 'react-icons/hi';
import { FaGlobe } from 'react-icons/fa';
import logoImage from '../../assets/LOGO.png';
import axios from 'axios';

export default function Navbar() {
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { isLoggdedIn, setIsLoggdedIn, setCurrUser } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
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
  const mobileMenuRef = useRef(null);
  const navRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Prevent scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        // Parse the negative scroll position (e.g., "-100px" -> 100)
        const scrollValue = Math.abs(parseInt(scrollY.replace('px', ''), 10));
        window.scrollTo(0, scrollValue);
      }
    }

    return () => {
      // Cleanup on unmount
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        const scrollValue = Math.abs(parseInt(scrollY.replace('px', ''), 10));
        window.scrollTo(0, scrollValue);
      }
    };
  }, [isMobileMenuOpen]);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the mobile menu and not on the mobile menu button
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        mobileMenuButtonRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !mobileMenuButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      // Use a slight delay to avoid immediate closure when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
  }, [isMobileMenuOpen]);

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

  const handleLogout = async () => {
    try {
      await axios.post('/api/method/logout', {}, {
        headers: {
          'X-Frappe-CSRF-Token': window.csrf_token
        }
      });
      setIsLoggdedIn(false);
      setCurrUser('');
      navigate('/portal/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear local state and redirect
      setIsLoggdedIn(false);
      setCurrUser('');
      navigate('/portal/login');
    }
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const navLinks = [
    { path: '/portal', label: t('nav.home', 'Home') },
    { path: '/portal/about', label: t('nav.about', 'About') },
    { path: '/portal/contact', label: t('nav.contact', 'Contact') },
  ];

  const isActiveLink = (path) => {
    if (path === '/portal') {
      return location.pathname === '/portal' || location.pathname === '/portal/';
    }
    return location.pathname.startsWith(path);
  };

  // Don't render navbar if user is not logged in
  if (!isLoggdedIn) {
    return null;
  }

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 start-0 end-0 z-50 bg-white/90 dark:bg-myprimary/95 backdrop-blur-xl border-b border-gray-200/30 dark:border-white/5 shadow-lg shadow-black/5`}
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/portal" className="max-h-14 overflow-hidden flex items-center space-x-2 rtl:space-x-reverse group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                !isDarkMode ? 'bg-resk-dark max-h-8 md:max-h-12 backdrop-blur-sm' : ''
              }`}
            >
              <img 
                src={logoImage} 
                alt={t('nav.logo', 'RESK Academy Logo')} 
                className="md:w-32 w-20 h-auto object-contain"
              />
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
                        : 'text-gray-700 dark:text-gray-300 hover:text-mysecondary dark:hover:text-resk-light hover:bg-gray-100 dark:hover:bg-resk-secondary/30'
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
              className="relative p-1.5 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-resk-secondary/40 dark:to-resk-secondary/60 text-gray-700 dark:text-gray-300 hover:shadow-md transition-all duration-300 group"
              aria-label={isDarkMode ? t('nav.switchToLight', 'Switch to light mode') : t('nav.switchToDark', 'Switch to dark mode')}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDarkMode ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {isDarkMode ? (
                  <HiSun className="w-4 h-4" />
                ) : (
                  <HiMoon className="w-4 h-4" />
                )}
              </motion.div>
            </motion.button>

            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1.5 rtl:space-x-reverse px-2 py-1.5 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-resk-secondary/40 dark:to-resk-secondary/60 text-gray-700 dark:text-gray-300 hover:shadow-md transition-all duration-200 font-['Inter'] font-medium"
                aria-label={t('nav.changeLanguage', 'Change language')}
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
                          className={`w-full px-3 py-2 text-start hover:bg-gray-50 dark:hover:bg-resk-secondary/40 transition-colors flex items-center space-x-2 rtl:space-x-reverse text-sm ${
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
                  className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 bg-gradient-to-r from-resk-primary to-resk-secondary text-white rounded-lg text-sm font-semibold font-['Inter'] hover:shadow-md hover:shadow-resk-secondary/30 transition-all duration-200"
                >
                  <HiLogin className="w-4 h-4" />
                  <span>{t('nav.login', 'Login')}</span>
                </Link>
              </motion.div>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:block"
                >
                  <Link
                    to="/portal/dashboard"
                    className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 bg-gradient-to-r from-resk-primary to-resk-secondary text-white rounded-lg text-sm font-semibold font-['Inter'] hover:shadow-md hover:shadow-resk-secondary/30 transition-all duration-200"
                  >
                    <HiUser className="w-4 h-4" />
                    <span>{t('nav.dashboard', 'Dashboard')}</span>
                  </Link>
                </motion.div>
                {/* Logout Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="hidden sm:flex items-center justify-center p-1.5 rounded-lg bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 text-red-600 dark:text-red-300 hover:shadow-md transition-all duration-200"
                  aria-label={t('nav.logout', 'Logout')}
                  title={t('nav.logout', 'Logout')}
                >
                  <HiLogout className="w-4 h-4" />
                </motion.button>
              </>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              ref={mobileMenuButtonRef}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-resk-secondary/40 dark:to-resk-secondary/60 text-gray-700 dark:text-gray-300 hover:shadow-md transition-all duration-200"
              aria-label={t('nav.toggleMenu', 'Toggle menu')}
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
            ref={mobileMenuRef}
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
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-resk-secondary/30 hover:text-mysecondary dark:hover:text-resk-light'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pt-3 mt-3 border-t border-gray-200/30 dark:border-white/5 space-y-2">
                {!isLoggdedIn ? (
                  <Link
                    to="/portal/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-1.5 rtl:space-x-reverse w-full px-3 py-2 bg-gradient-to-r from-resk-primary to-resk-secondary text-white rounded-lg text-sm font-semibold font-['Inter'] hover:shadow-md hover:shadow-resk-secondary/30 transition-all duration-200"
                  >
                    <HiLogin className="w-4 h-4" />
                    <span>{t('nav.login', 'Login')}</span>
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/portal/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center space-x-1.5 rtl:space-x-reverse w-full px-3 py-2 bg-gradient-to-r from-resk-primary to-resk-secondary text-white rounded-lg text-sm font-semibold font-['Inter'] hover:shadow-md hover:shadow-resk-secondary/30 transition-all duration-200"
                    >
                      <HiUser className="w-4 h-4" />
                      <span>{t('nav.dashboard', 'Dashboard')}</span>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center justify-center space-x-1.5 rtl:space-x-reverse w-full px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-semibold font-['Inter'] hover:shadow-md hover:shadow-red-500/30 transition-all duration-200"
                    >
                      <HiLogout className="w-4 h-4" />
                      <span>{t('nav.logout', 'Logout')}</span>
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
