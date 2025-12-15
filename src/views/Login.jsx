import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiEye, HiEyeOff, HiUser, HiLockClosed } from 'react-icons/hi';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';
import LOGO from '../assets/LOGO.png';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';
import { useFrappeAuth } from 'frappe-react-sdk';
export default function Login() {
  const { login } = useFrappeAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsLoggdedIn, setCurrUser } = useUserContext();
  const [formData, setFormData] = useState({
    usr: '',
    pwd: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Allow administrator login without email validation
    if (formData.usr.toLowerCase() === 'administrator'.toLowerCase()) {
      if (!formData.pwd) {
        newErrors.pwd = t('auth.passwordRequired', 'Password is required');
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    
    if (!formData.usr.trim()) {
      newErrors.usr = t('auth.emailRequired', 'Email is required');
    } else if (!/\S+@\S+\.\S+/.test(formData.usr)) {
      newErrors.usr = t('auth.invalidEmail', 'Please enter a valid email');
    }
    
    if (!formData.pwd) {
      newErrors.pwd = t('auth.passwordRequired', 'Password is required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await login({
        username: formData.usr,
        password: formData.pwd,
      });

      // Response structure: {"message":"Logged In","home_page":"/app/resk-app","full_name":"Administrator"}
      if (response?.message === 'Logged In') {
        setIsLoggdedIn(true);
        // Fetch user data
        try {
          const userRes = await axios.get('/api/method/frappe.auth.get_logged_user', {
            headers: { 'X-Frappe-CSRF-Token': window.csrf_token }
          });
          // Response structure: {"message":"Administrator"}
          if (userRes?.data?.message) {
            const userDataRes = await axios.get(`/api/resource/User/${userRes.data.message}`, {
              headers: { 'X-Frappe-CSRF-Token': window.csrf_token }
            });
            if (userDataRes?.data?.data) {
              setCurrUser(userDataRes.data.data);
            }
          }
        } catch (err) {
          // Log error for debugging but don't show to user
          console.error('Error fetching user data:', err);
          // User is still logged in, just couldn't fetch full profile
        }
        navigate('/portal/dashboard');
      } else {
        throw new Error(response?.message || t('auth.loginFailed', 'Login failed. Please try again.'));
      }
    } catch (error) {
      // Log error for debugging but don't show technical details to user
      console.error('Login error:', error);
      
      // Check if it's an authentication/credentials error
      const errorMessage = error?.message || '';
      const errorResponse = error?.response?.data || {};
      const isInvalidCredentials = 
        errorMessage.toLowerCase().includes('invalid login credentials') ||
        errorMessage.toLowerCase().includes('authentication error') ||
        errorResponse?.message?.toLowerCase().includes('invalid login credentials') ||
        errorResponse?.exception === 'frappe.exceptions.AuthenticationError' ||
        errorResponse?.exc_type === 'AuthenticationError';
      
      if (isInvalidCredentials) {
        setErrors({ 
          submit: t('auth.invalidCredentials', 'Invalid login credentials. Please check your email and password.')
        });
      } else {
        // Show generic user-friendly error message for other errors
        setErrors({ 
          submit: t('auth.errorOccurred', 'An error occurred. Please try again later.')
        });
      }
    } finally {
      setIsLoading(false);
    }
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0, 212, 184, 0.9) 0%, rgba(42, 45, 108, 0.95) 100%), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-resk-secondary/30 via-transparent to-resk-dark/40"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 end-4 z-20">
        <LanguageSwitcher />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 sm:space-y-8"
          >
            {/* Logo */}
            <motion.div variants={itemVariants} className="flex justify-center max-h-[140px]">
              <img 
                src={LOGO} 
                alt={t('nav.logo', 'RESK Academy Logo')} 
                className="w-48 sm:w-64 md:w-80 h-auto object-cover"
              />
            </motion.div>

            {/* Welcome Section */}
            <motion.div variants={itemVariants} className="space-y-2 text-center sm:text-start">
              <h1 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins']">
                {t('auth.welcomeBack', 'Welcome back!')}
              </h1>
              <p className="text-gray-200 sm:text-gray-300 font-['Inter'] text-sm sm:text-base">
                {t('auth.welcomeDescription', 'Simplify your workflow and boost your productivity with RESK Academy. Get started for free.')}
              </p>
            </motion.div>

            {/* Login Form */}
            <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Email Field */}
              <div>
                <div className="relative">
                  <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="usr"
                    value={formData.usr}
                    onChange={handleChange}
                    placeholder={t('auth.email', 'Email')}
                    className={`w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl border ${
                      errors.usr
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-white/30 focus:ring-mysecondary focus:border-mysecondary'
                    } bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all font-['Inter'] text-sm sm:text-base`}
                  />
                </div>
                {errors.usr && (
                  <p className="mt-1 text-sm text-red-200 font-['Inter']">{errors.usr}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="relative">
                  <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="pwd"
                    value={formData.pwd}
                    onChange={handleChange}
                    placeholder={t('auth.password', 'Password')}
                    className={`w-full pl-10 pr-12 py-3 sm:py-3.5 rounded-xl border ${
                      errors.pwd
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-white/30 focus:ring-mysecondary focus:border-mysecondary'
                    } bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all font-['Inter'] text-sm sm:text-base`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <HiEyeOff className="w-5 h-5" />
                    ) : (
                      <HiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.pwd && (
                  <p className="mt-1 text-sm text-red-200 font-['Inter']">{errors.pwd}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-mysecondary border-white/30 rounded focus:ring-mysecondary focus:ring-2 bg-white/50"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-white/90 font-['Inter']">
                    {t('auth.rememberMe', 'Remember me')}
                  </label>
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-3 rounded-lg bg-red-500/20 backdrop-blur-sm border border-red-300/50">
                  <p className="text-sm text-red-100 font-['Inter']">{errors.submit}</p>
                </div>
              )}

              {/* Login Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-resk-primary to-resk-secondary text-white rounded-xl font-semibold font-['Inter'] hover:shadow-lg hover:shadow-resk-secondary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isLoading ? t('auth.loggingIn', 'Logging in...') : t('auth.login', 'Login')}
              </motion.button>
            </motion.form>

            {/* Signup Link */}
            <motion.div variants={itemVariants} className="text-center pt-2">
              <p className="text-white/90 font-['Inter'] text-sm sm:text-base">
                {t('auth.notMember', 'Not a member?')}{' '}
                <Link
                  to="/portal/signup"
                  className="text-white font-semibold underline hover:text-mysecondary transition-colors"
                >
                  {t('auth.registerNow', 'Register now')}
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
