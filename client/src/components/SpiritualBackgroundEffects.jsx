import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * SpiritualBackgroundEffects - Adds peaceful, spiritual visual effects
 * @param {string} variant - Effect variant: 'light-rays', 'clouds', 'particles'
 */
function SpiritualBackgroundEffects({ variant = 'light-rays' }) {
  if (variant === 'light-rays') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-24 bg-gradient-to-b from-transparent via-spiritual-gold to-transparent"
            style={{
              left: `${20 + i * 20}%`,
              transformOrigin: 'top',
            }}
            animate={{
              y: ['-100%', '100vh'],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.5,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'clouds') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/50 blur-xl"
            style={{
              width: `${150 + i * 50}px`,
              height: `${40 + i * 15}px`,
              top: `${20 + i * 25}%`,
            }}
            animate={{
              x: ['-100%', '100vw'],
            }}
            transition={{
              duration: 60 + i * 20,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 10,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'particles') {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 3 === 0 ? 'var(--spiritual-gold)' : 
                         i % 3 === 1 ? 'var(--spiritual-blue)' : 
                         'var(--spiritual-purple)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}

SpiritualBackgroundEffects.propTypes = {
  variant: PropTypes.oneOf(['light-rays', 'clouds', 'particles']),
};

export default SpiritualBackgroundEffects;
