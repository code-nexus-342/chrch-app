import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

/**
 * FloatingHub Component - Main navigation (replaces traditional navbar)
 */
function FloatingHub() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleHub = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      id: 'home',
      icon: '🏠',
      label: 'Home',
      action: 'navigate',
      target: '/',
      ariaLabel: 'Navigate to Home',
    },
    {
      id: 'community',
      icon: '🤝',
      label: 'Community',
      action: 'navigate',
      target: '/community',
      ariaLabel: 'Navigate to Community',
    },
    {
      id: 'programs',
      icon: '📚',
      label: 'Programs',
      action: 'navigate',
      target: '/programs',
      ariaLabel: 'Navigate to Programs',
    },
    {
      id: 'events',
      icon: '📅',
      label: 'Events',
      action: 'navigate',
      target: '/events',
      ariaLabel: 'Navigate to Events',
    },
    {
      id: 'mission',
      icon: '🕊️',
      label: 'Mission',
      action: 'navigate',
      target: '/mission',
      ariaLabel: 'Navigate to Mission',
    },
    {
      id: 'prayer',
      icon: '🙏',
      label: 'Prayer Request',
      action: 'modal',
      target: 'prayer',
      ariaLabel: 'Open Prayer Request',
    },
  ];

  const handleItemClick = (item) => {
    if (item.action === 'modal' && item.target === 'prayer') {
      const prayerBtn = document.querySelector('.prayer-request-btn');
      if (prayerBtn) {
        prayerBtn.click();
      }
    } else if (item.action === 'navigate') {
      navigate(item.target);
    }
    setIsOpen(false);
  };

  const containerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <>
      <style>{`
        .floating-hub-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          pointer-events: none;
        }

        .floating-hub-menu {
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: auto;
        }

        .floating-hub-menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border-radius: 50px;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          text-decoration: none;
          color: #333;
          pointer-events: auto;
        }

        .floating-hub-menu-item:hover {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
          transform: translateY(-2px);
          background: #f8f9fa;
        }

        .floating-hub-menu-item .icon {
          font-size: 24px;
          line-height: 1;
        }

        .floating-hub-menu-item .label {
          font-weight: 500;
          white-space: nowrap;
          font-size: 14px;
        }

        .floating-hub-main-btn {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          color: white;
          transition: all 0.3s ease;
          position: relative;
          pointer-events: auto;
        }

        .floating-hub-main-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
        }

        .floating-hub-main-btn.open {
          background: #333;
        }

        .floating-hub-main-btn svg {
          width: 32px;
          height: 32px;
        }

        .floating-hub-main-btn .guide-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 10px;
          font-weight: 600;
          gap: 2px;
        }

        .floating-hub-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          opacity: 0.3;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .floating-hub-container {
            bottom: 20px;
            right: 20px;
          }

          .floating-hub-main-btn {
            width: 56px;
            height: 56px;
          }

          .floating-hub-menu-item {
            padding: 10px 14px;
          }

          .floating-hub-menu-item .label {
            font-size: 13px;
          }
        }
      `}</style>

      <div className="floating-hub-container">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="floating-hub-menu"
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.action === 'navigate' ? (
                    <Link
                      to={item.target}
                      onClick={() => handleItemClick(item)}
                      className="floating-hub-menu-item"
                      aria-label={item.ariaLabel}
                    >
                      <span className="icon">{item.icon}</span>
                      <span className="label">{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleItemClick(item)}
                      className="floating-hub-menu-item"
                      aria-label={item.ariaLabel}
                    >
                      <span className="icon">{item.icon}</span>
                      <span className="label">{item.label}</span>
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main floating button */}
        <motion.button
          className={`floating-hub-main-btn ${isOpen ? 'open' : ''}`}
          onClick={toggleHub}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            rotate: isOpen ? 45 : 0,
          }}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <div className="guide-text">
              <svg
                style={{ width: '24px', height: '24px' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span>Menu</span>
            </div>
          )}
        </motion.button>

        {/* Pulsing effect when closed */}
        {!isOpen && (
          <motion.div
            className="floating-hub-pulse"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>
    </>
  );
}

export default FloatingHub;
