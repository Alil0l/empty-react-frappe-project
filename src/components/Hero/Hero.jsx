import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LOGO from '../../assets/LOGO.png';
import Image1 from '../../assets/092A0570.jpg';
import Image2 from '../../assets/092A0609.jpg';
import Image3 from '../../assets/20250225_202711.jpg';
import Image4 from '../../assets/J22222-6891 copy.jpg';
import Image5 from '../../assets/WhatsApp Image 2024-09-01 at 01.43.06_35e6752a.jpg';

export default function Hero() {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [clickedCardId, setClickedCardId] = useState(null);

  // Initial array of images - LOGO first, then others
  const initialImageStack = [
    {
      id: 1,
      image: LOGO,
      gradient: 'from-blue-500/40 to-purple-600/40',
      labelKey: 'logo',
    },
    {
      id: 2,
      image: Image1,
      gradient: 'from-green-500/40 to-teal-600/40',
      labelKey: 'image1',
    },
    {
      id: 3,
      image: Image2,
      gradient: 'from-orange-500/40 to-red-600/40',
      labelKey: 'image2',
    },
    {
      id: 4,
      image: Image3,
      gradient: 'from-pink-500/40 to-rose-600/40',
      labelKey: 'image3',
    },
    {
      id: 5,
      image: Image4,
      gradient: 'from-indigo-500/40 to-blue-600/40',
      labelKey: 'image4',
    },
    {
      id: 6,
      image: Image5,
      gradient: 'from-purple-500/40 to-pink-600/40',
      labelKey: 'image5',
    },
  ];

  const [imageStack, setImageStack] = useState(initialImageStack);

  // Handle card click - reorder stack to put clicked card first
  const handleCardClick = (cardId) => {
    setClickedCardId(cardId);
    setHoveredCardId(cardId);
    
    // Reorder the stack: move clicked card to first position
    const clickedCard = imageStack.find(card => card.id === cardId);
    const otherCards = imageStack.filter(card => card.id !== cardId);
    const newStack = [clickedCard, ...otherCards];
    setImageStack(newStack);
  };

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
    const isCardClicked = clickedCardId === cardId;
    
    // If a specific card is hovered or clicked, bring it to top
    if (isCardHovered || isCardClicked) {
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
      // If another card is hovered/clicked, keep this card in its position but slightly lower
      if (hoveredCardId !== null || clickedCardId !== null) {
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
    <section className="py-4 relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-resk-darkest via-resk-dark to-resk-primary">
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
                {t('hero.badge', 'RESK Academy')}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-['Poppins']"
            >
              {t('hero.headingPart1', 'Master')}{' '}
              <span className="bg-gradient-to-r from-resk-primary to-resk-secondary bg-clip-text text-transparent">
                {t('hero.headingPart2', 'Civil & Architecture')}
              </span>
              <br />
              {t('hero.headingPart3', 'Engineering')}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 font-['Inter'] leading-relaxed"
            >
              {t('hero.description', 'Transform your career with expert-led courses in Civil and Architecture Engineering. Learn from industry professionals and build the skills you need to excel.')}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start pt-4"
            >
              <Link to="/portal/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-mysecondary text-white rounded-lg font-semibold text-lg font-['Inter'] shadow-lg shadow-mysecondary/30 hover:shadow-mysecondary/50 transition-shadow"
                >
                  {t('hero.learnMore', 'Learn More')}
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { number: '500+', labelKey: 'students' },
                { number: '50+', labelKey: 'courses' },
                { number: '98%', labelKey: 'successRate' },
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
                    {t(`hero.stats.${stat.labelKey}`, stat.labelKey)}
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
              // Don't clear hover if a card is clicked
              if (!clickedCardId) {
                setHoveredCardId(null);
              }
            }}
          >
            <div 
              className="relative w-full max-w-md h-[400px]"
              style={{ perspective: '1000px' }}
            >
              {imageStack.map((card, index) => {
                const style = getCardStyle(index, imageStack.length, card.id);
                const isCardHovered = hoveredCardId === card.id;
                const isCardClicked = clickedCardId === card.id;
                const isCardActive = isCardHovered || isCardClicked;
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
                    onMouseLeave={() => {
                      // Don't clear hover if card is clicked
                      if (!isCardClicked) {
                        setHoveredCardId(null);
                      }
                    }}
                    onClick={() => handleCardClick(card.id)}
                  >
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                      <div className="w-full h-full relative">
                        {/* Image */}
                        <motion.img
                          src={card.image}
                          alt={t(`hero.cards.${card.labelKey}`, card.labelKey)}
                          className="w-full h-full object-cover"
                          animate={isCardActive ? { 
                            scale: [1, 1.1, 1]
                          } : isHovered ? {
                            scale: [1, 1.05, 1]
                          } : {
                            scale: 1
                          }}
                          transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                          }}
                        />
                        
                        {/* Overlay for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
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
