import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Array of image placeholders - replace with actual image paths
  const imageStack = [
    {
      id: 1,
      gradient: 'from-blue-500/40 to-purple-600/40',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      label: 'Architecture',
    },
    {
      id: 2,
      gradient: 'from-green-500/40 to-teal-600/40',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      label: 'Civil Engineering',
    },
    {
      id: 3,
      gradient: 'from-orange-500/40 to-red-600/40',
      icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
      label: 'Design',
    },
    {
      id: 4,
      gradient: 'from-pink-500/40 to-rose-600/40',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      label: 'Construction',
    },
    {
      id: 5,
      gradient: 'from-indigo-500/40 to-blue-600/40',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      label: 'Planning',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  // Calculate card positions for deck shuffle effect
  const getCardStyle = (index, total, cardId) => {
    const offset = (index - (total - 1) / 2) * 15; // Horizontal offset
    const rotation = (index - (total - 1) / 2) * 8; // Rotation angle
    const yOffset = index * -3; // Vertical stacking offset
    const isCardHovered = hoveredCardId === cardId;
    
    // If a specific card is hovered, bring it to top
    if (isCardHovered) {
      return {
        x: offset,
        y: -40, // Lift it higher
        rotate: rotation,
        scale: 1.15, // Make it larger
        zIndex: 1000, // Highest z-index
      };
    }
    
    // If container is hovered but not this specific card
    if (isHovered) {
      // If another card is hovered, keep this card in its position but slightly lower
      if (hoveredCardId !== null) {
        return {
          x: offset,
          y: yOffset - 10,
          rotate: rotation,
          scale: 1.0,
          zIndex: total - index,
        };
      }
      // Normal shuffle when container is hovered
      return {
        x: offset,
        y: yOffset - 20,
        rotate: rotation,
        scale: 1.05,
        zIndex: total - index,
      };
    }
    
    // Default stacked position
    return {
      x: 0,
      y: yOffset,
      rotate: 0,
      scale: 1,
      zIndex: total - index,
    };
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-myprimary via-myprimary to-[#2a2d6c]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 start-20 w-72 h-72 bg-mysecondary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 end-20 w-96 h-96 bg-mysecondary/15 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content Section */}
          <motion.div className="text-center lg:text-start space-y-6" variants={itemVariants}>
            <motion.div
              variants={itemVariants}
              className="inline-block"
            >
              <span className="px-4 py-2 bg-mysecondary/20 text-mysecondary rounded-full text-sm font-semibold font-['Inter'] tracking-wide">
                RESK Academy
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-['Poppins']"
            >
              Master{' '}
              <span className="bg-gradient-to-r from-mysecondary to-[#00d4b8] bg-clip-text text-transparent">
                Civil & Architecture
              </span>
              <br />
              Engineering
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 font-['Inter'] leading-relaxed"
            >
              Transform your career with expert-led courses in Civil and Architecture Engineering. 
              Learn from industry professionals and build the skills you need to excel.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-mysecondary text-white rounded-lg font-semibold text-lg font-['Inter'] shadow-lg shadow-mysecondary/30 hover:shadow-mysecondary/50 transition-shadow"
              >
                Explore Courses
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-lg font-semibold text-lg font-['Inter'] hover:border-white/50 hover:bg-white/10 transition-all"
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { number: '500+', label: 'Students' },
                { number: '50+', label: 'Courses' },
                { number: '98%', label: 'Success Rate' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-mysecondary font-['Poppins']">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 font-['Inter'] mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Stack Section */}
          <motion.div
            className="relative h-[500px] flex items-center justify-center"
            variants={imageVariants}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setHoveredCardId(null);
            }}
          >
            <div 
              className="relative w-full max-w-md h-[400px]"
              style={{ perspective: '1000px' }}
            >
              {imageStack.map((card, index) => {
                const style = getCardStyle(index, imageStack.length, card.id);
                const isCardHovered = hoveredCardId === card.id;
                return (
                  <motion.div
                    key={card.id}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    initial={false}
                    animate={{
                      x: style.x,
                      y: style.y,
                      rotate: style.rotate,
                      scale: style.scale,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                      mass: 0.8,
                    }}
                    style={{
                      zIndex: style.zIndex,
                    }}
                    onMouseEnter={() => setHoveredCardId(card.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                  >
                    <div className={`w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-sm border border-white/10`}>
                      <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
                        {/* Card Content */}
                        <motion.div
                          className="w-24 h-24 mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                          animate={isCardHovered ? { 
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                          } : isHovered ? {
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                          } : {}}
                          transition={{
                            duration: 2,
                            repeat: (isCardHovered || isHovered) ? Infinity : 0,
                            ease: 'linear',
                          }}
                        >
                          <svg
                            className="w-12 h-12 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={card.icon}
                            />
                          </svg>
                        </motion.div>
                        <h3 className="text-white font-semibold text-lg font-['Inter'] mb-2">
                          {card.label}
                        </h3>
                        <p className="text-white/70 text-sm font-['Inter'] text-center">
                          Course {card.id}
                        </p>
                        
                        {/* Shine Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={isCardHovered ? { x: '200%' } : isHovered ? { x: '200%' } : { x: '-100%' }}
                          transition={{
                            duration: 1.5,
                            repeat: (isCardHovered || isHovered) ? Infinity : 0,
                            ease: 'linear',
                          }}
                          style={{
                            transform: `rotate(${style.rotate}deg)`,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-4 -end-4 w-24 h-24 bg-mysecondary/30 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute -bottom-4 -start-4 w-32 h-32 bg-mysecondary/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 start-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
