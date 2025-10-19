import { motion } from 'framer-motion';
import { Element } from 'react-scroll';
import PropTypes from 'prop-types';

/**
 * Section Component - Full-page scrollable section with animations
 * @param {string} name - Section identifier for scroll navigation
 * @param {string} title - Section title
 * @param {string} subtitle - Optional subtitle
 * @param {React.ReactNode} children - Section content
 * @param {string} background - Background style (gradient, image, etc.)
 * @param {string} backgroundImage - Optional background image URL
 * @param {boolean} darkText - Use dark text color
 */
function Section({ 
  name, 
  title, 
  subtitle, 
  children, 
  background = 'bg-gradient-to-b from-spiritual-light to-white',
  backgroundImage,
  darkText = true 
}) {
  const textColor = darkText ? 'text-gray-800' : 'text-white';
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <Element name={name} className="scroll-section">
      <motion.section
        className={`min-h-screen w-full flex items-center justify-center relative overflow-hidden ${background}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay for better text readability on images */}
        {backgroundImage && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        )}
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-spiritual-gold/40 rounded-full animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-20 w-3 h-3 bg-spiritual-blue/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-spiritual-purple/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-spiritual-gold/30 rounded-full animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={itemVariants}
          >
            {title && (
              <motion.h2 
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${textColor}`}
                variants={itemVariants}
                style={{
                  textShadow: backgroundImage ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                {title}
              </motion.h2>
            )}
            
            {subtitle && (
              <motion.p 
                className={`text-xl sm:text-2xl mb-12 ${textColor} opacity-90`}
                variants={itemVariants}
                style={{
                  textShadow: backgroundImage ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                {subtitle}
              </motion.p>
            )}
            
            <motion.div variants={itemVariants}>
              {children}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className={`w-6 h-10 border-2 ${darkText ? 'border-gray-800' : 'border-white'} rounded-full flex items-start justify-center p-2`}>
            <div className={`w-1 h-2 ${darkText ? 'bg-gray-800' : 'bg-white'} rounded-full`} />
          </div>
        </motion.div>
      </motion.section>
    </Element>
  );
}

Section.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  background: PropTypes.string,
  backgroundImage: PropTypes.string,
  darkText: PropTypes.bool,
};

export default Section;
