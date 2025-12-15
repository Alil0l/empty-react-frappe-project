import { motion } from 'framer-motion';

export default function Spinner({ 
  size = 'md', 
  color = 'secondary',
  fullScreen = false,
  text = '',
  className = ''
}) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-[3px]',
    xl: 'w-16 h-16 border-[4px]',
  };

  const colorClasses = {
    primary: 'border-myprimary border-t-transparent',
    secondary: 'border-mysecondary border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent',
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
    },
  };

  const spinnerTransition = {
    duration: 1,
    repeat: Infinity,
    ease: 'linear',
  };

  const SpinnerElement = () => (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
        variants={spinnerVariants}
        animate="animate"
        transition={spinnerTransition}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-['Inter'] text-gray-600 dark:text-gray-300"
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-myprimary/90 backdrop-blur-sm">
        <SpinnerElement />
      </div>
    );
  }

  return <SpinnerElement />;
}
