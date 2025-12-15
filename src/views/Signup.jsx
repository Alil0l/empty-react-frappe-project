import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiEye, HiEyeOff, HiUser, HiLockClosed, HiMail, HiPhone } from 'react-icons/hi';
import { signupService } from '../services/signup';
import OtpForm from '../components/OtpForm/OtpForm';
import LOGO from '../assets/LOGO.png';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const validatePhoneNumber = useCallback((phone) => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = t('auth.fullNameRequired', 'Full name is required');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('auth.emailRequired', 'Email is required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.invalidEmail', 'Please enter a valid email');
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('auth.phoneRequired', 'Phone number is required');
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = t('auth.invalidPhone', 'Please enter a valid phone number');
    }
    
    if (!formData.password) {
      newErrors.password = t('auth.passwordRequired', 'Password is required');
    } else if (formData.password.length < 8) {
      newErrors.password = t('auth.passwordMinLength', 'Password must be at least 8 characters');
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.passwordsDontMatch', 'Passwords don\'t match');
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = t('auth.agreeTermsRequired', 'You must agree to the terms');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t, validatePhoneNumber]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage({ type: '', text: '' });
    setErrors({});

    try {
      const response = await signupService.validateUserData({
        email: formData.email || '',
        phone: formData.phone || '',
        full_name: formData.fullName || '',
        password: formData.password || '',
      });

      if (response?.data?.message?.status === 'success') {
        setShowOtpForm(true);
      } else {
        throw new Error(
          response?.data?.message?.message ||
          t('auth.signupFailed', 'Signup failed. Please try again.')
        );
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message?.message ||
        error?.response?.data?.exc ||
        error?.message ||
        t('auth.validationFailed', 'Validation failed. Please try again.');

      setMessage({
        type: 'error',
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, t]);

  const handleBackToForm = useCallback(() => {
    setShowOtpForm(false);
    setMessage({ type: '', text: '' });
  }, []);

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

  if (showOtpForm) {
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
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-screen overflow-y-auto">
          <OtpForm
            email={formData.email || ''}
            phone={formData.phone || ''}
            fullName={formData.fullName || ''}
            password={formData.password || ''}
            onBack={handleBackToForm}
          />
        </div>
      </div>
    );
  }

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
          className="absolute inset-0 bg-gradient-to-br from-mysecondary/30 via-transparent to-[#2a2d6c]/40"
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
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-screen overflow-y-auto">
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
            className="space-y-5 sm:space-y-6"
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
                {t('auth.createAccount', 'Create Account')}
              </h1>
              <p className="text-gray-200 sm:text-gray-300 font-['Inter'] text-sm sm:text-base">
                {t('auth.signupDescription', 'Join RESK Academy and start your engineering journey today.')}
              </p>
            </motion.div>

            {/* Signup Form */}
            <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Full Name Field */}
              <div>
                <div className="relative">
                  <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t('auth.fullName', 'Full Name')}
                    className={`w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl border ${
                      errors.fullName
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-white/30 focus:ring-mysecondary focus:border-mysecondary'
                    } bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all font-['Inter'] text-sm sm:text-base`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-200 font-['Inter']">{errors.fullName}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <div className="relative">
                  <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('auth.email', 'Email')}
                    className={`w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl border ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-white/30 focus:ring-mysecondary focus:border-mysecondary'
                    } bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all font-['Inter'] text-sm sm:text-base`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-200 font-['Inter']">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <div className="relative">
                  <HiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('auth.phone', 'Phone Number')}
                    className={`w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl border ${
                      errors.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-white/30 focus:ring-mysecondary focus:border-mysecondary'
                    } bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all font-['Inter'] text-sm sm:text-base`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-200 font-['Inter']">{errors.phone}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="relative">
                  <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t('auth.password', 'Password')}
                    className={`w-full pl-10 pr-12 py-3 sm:py-3.5 rounded-xl border ${
                      errors.password
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
                {errors.password && (
                  <p className="mt-1 text-sm text-red-200 font-['Inter']">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <div className="relative">
                  <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder={t('auth.confirmPassword', 'Confirm Password')}
                    className={`w-full pl-10 pr-12 py-3 sm:py-3.5 rounded-xl border ${
                      errors.confirmPassword
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-white/30 focus:ring-mysecondary focus:border-mysecondary'
                    } bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all font-['Inter'] text-sm sm:text-base`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <HiEyeOff className="w-5 h-5" />
                    ) : (
                      <HiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-200 font-['Inter']">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div>
                <label className="flex items-start space-x-2 rtl:space-x-reverse cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-mysecondary border-white/30 rounded focus:ring-mysecondary bg-white/50"
                  />
                  <span className="text-sm text-white/90 font-['Inter']">
                    {t('auth.agreeTerms', 'I agree to the')}{' '}
                    <Link to="/portal/terms" className="text-white font-semibold underline hover:text-mysecondary transition-colors">
                      {t('auth.terms', 'Terms and Conditions')}
                    </Link>
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="mt-1 text-sm text-red-200 font-['Inter']">{errors.agreeTerms}</p>
                )}
              </div>

              {/* Submit Error */}
              {message.text && (
                <div className={`p-3 rounded-lg backdrop-blur-sm border ${
                  message.type === 'success'
                    ? 'bg-green-500/20 text-green-100 border-green-300/50'
                    : 'bg-red-500/20 text-red-100 border-red-300/50'
                }`}>
                  <p className="text-sm font-['Inter']">{message.text}</p>
                </div>
              )}

              {/* Signup Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-resk-primary to-resk-secondary text-white rounded-xl font-semibold font-['Inter'] hover:shadow-lg hover:shadow-resk-secondary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isLoading ? t('auth.creatingAccount', 'Creating account...') : t('auth.signup', 'Sign Up')}
              </motion.button>
            </motion.form>

            {/* Login Link */}
            <motion.div variants={itemVariants} className="text-center pt-2">
              <p className="text-white/90 font-['Inter'] text-sm sm:text-base">
                {t('auth.alreadyMember', 'Already a member?')}{' '}
                <Link
                  to="/portal/login"
                  className="text-white font-semibold underline hover:text-mysecondary transition-colors"
                >
                  {t('auth.login', 'Login')}
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
