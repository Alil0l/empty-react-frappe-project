import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../contexts/UserContext';
import { HiUser, HiMail, HiPhone, HiIdentification, HiCalendar, HiRefresh } from 'react-icons/hi';
import SpinWheel from '../components/SpinWheel/SpinWheel';

export default function Dashboard() {
  const { t } = useTranslation();
  const { currUser } = useUserContext();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: t('dashboard.profile', 'Profile Details'), icon: HiUser },
    { id: 'spin', label: t('dashboard.spinWheel', 'Spin Wheel'), icon: HiRefresh },
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-resk-light/10 via-white to-resk-light/10 dark:from-resk-darkest dark:via-resk-dark dark:to-resk-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-2">
            {t('dashboard.title', 'Dashboard')}
          </h1>
          <p className="text-resk-secondary dark:text-resk-light font-['Inter']">
            {t('dashboard.welcome', 'Welcome back! Manage your profile and spin the wheel.')}
          </p>
        </motion.div> */}

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex space-x-1 rtl:space-x-reverse border-b border-resk-light/30 dark:border-resk-secondary/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 text-sm font-medium font-['Inter'] transition-all duration-200
                    ${
                      isActive
                        ? 'text-resk-primary dark:text-resk-secondary border-b-2 border-resk-primary dark:border-resk-secondary'
                        : 'text-resk-secondary dark:text-resk-light hover:text-resk-primary dark:hover:text-resk-secondary'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              variants={containerVariants}
            >
              <div className="bg-white dark:bg-resk-primary rounded-xl shadow-lg p-6 sm:p-8 border border-resk-light/20 dark:border-resk-secondary/30">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-resk-dark dark:text-white font-['Poppins']">
                    {t('dashboard.profileDetails', 'Profile Details')}
                  </h2>
                </div>

                {currUser ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-resk-secondary dark:text-resk-light">
                        <HiUser className="w-5 h-5" />
                        <label className="text-sm font-medium font-['Inter']">
                          {t('dashboard.fullName', 'Full Name')}
                        </label>
                      </div>
                      <p className="text-lg font-semibold text-resk-dark dark:text-white font-['Inter']">
                        {currUser.full_name || currUser.name || t('dashboard.notProvided', 'Not provided')}
                      </p>
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-resk-secondary dark:text-resk-light">
                        <HiMail className="w-5 h-5" />
                        <label className="text-sm font-medium font-['Inter']">
                          {t('dashboard.email', 'Email')}
                        </label>
                      </div>
                      <p className="text-lg font-semibold text-resk-dark dark:text-white font-['Inter']">
                        {currUser.email || t('dashboard.notProvided', 'Not provided')}
                      </p>
                    </motion.div>

                    {/* Phone */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-resk-secondary dark:text-resk-light">
                        <HiPhone className="w-5 h-5" />
                        <label className="text-sm font-medium font-['Inter']">
                          {t('dashboard.phone', 'Phone Number')}
                        </label>
                      </div>
                      <p className="text-lg font-semibold text-resk-dark dark:text-white font-['Inter']">
                        {currUser.mobile_no || currUser.phone || t('dashboard.notProvided', 'Not provided')}
                      </p>
                    </motion.div>

                    {/* Username */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-resk-secondary dark:text-resk-light">
                        <HiIdentification className="w-5 h-5" />
                        <label className="text-sm font-medium font-['Inter']">
                          {t('dashboard.username', 'Username')}
                        </label>
                      </div>
                      <p className="text-lg font-semibold text-resk-dark dark:text-white font-['Inter']">
                        {currUser.name || t('dashboard.notProvided', 'Not provided')}
                      </p>
                    </motion.div>

                    {/* User Type */}
                    {currUser.user_type && (
                      <motion.div variants={itemVariants} className="space-y-2">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-resk-secondary dark:text-resk-light">
                          <HiUser className="w-5 h-5" />
                          <label className="text-sm font-medium font-['Inter']">
                            {t('dashboard.userType', 'User Type')}
                          </label>
                        </div>
                        <p className="text-lg font-semibold text-resk-dark dark:text-white font-['Inter']">
                          {currUser.user_type}
                        </p>
                      </motion.div>
                    )}

                    {/* Creation Date */}
                    {currUser.creation && (
                      <motion.div variants={itemVariants} className="space-y-2">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-resk-secondary dark:text-resk-light">
                          <HiCalendar className="w-5 h-5" />
                          <label className="text-sm font-medium font-['Inter']">
                            {t('dashboard.memberSince', 'Member Since')}
                          </label>
                        </div>
                        <p className="text-lg font-semibold text-resk-dark dark:text-white font-['Inter']">
                          {new Date(currUser.creation).toLocaleDateString()}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-resk-secondary dark:text-resk-light font-['Inter']">
                      {t('dashboard.loadingProfile', 'Loading profile...')}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'spin' && (
            <motion.div
              key="spin"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white dark:bg-resk-primary rounded-xl shadow-lg p-6 sm:p-8 border border-resk-light/20 dark:border-resk-secondary/30">
                <h2 className="text-2xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-6">
                  {t('dashboard.spinWheel', 'Spin Wheel')}
                </h2>
                <SpinWheel 
                  percentages={{
                    10: 50,   // 50% chance to win 10 points
                    25: 30,   // 30% chance to win 25 points
                    50: 15,   // 15% chance to win 50 points
                    100: 5,   // 5% chance to win 100 points
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

