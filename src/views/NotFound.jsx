import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-resk-darkest via-resk-dark to-resk-primary flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <div className="text-9xl md:text-[12rem] font-bold text-white/10 font-['Poppins'] mb-4">
            404
          </div>
          <div className="w-32 h-32 mx-auto bg-mysecondary/20 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-16 h-16 text-mysecondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Poppins']"
        >
          {t('notFound.title', 'Page Not Found')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-300 mb-8 font-['Inter']"
        >
          {t('notFound.message', "The page you're looking for doesn't exist or has been moved.")}
          <br />
          {t('notFound.submessage', "Let's get you back on track.")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/portal"
              className="inline-block px-8 py-4 bg-mysecondary text-white rounded-lg font-semibold text-lg font-['Inter'] shadow-lg shadow-mysecondary/30 hover:shadow-mysecondary/50 transition-shadow"
            >
              {t('notFound.goHome', 'Go to Home')}
            </Link>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-lg font-semibold text-lg font-['Inter'] hover:border-white/50 hover:bg-white/10 transition-all"
          >
            {t('notFound.goBack', 'Go Back')}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
