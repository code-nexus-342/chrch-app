import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * NavigationGuide - Optional helper overlay to guide users
 * Shows keyboard shortcuts and navigation tips
 */
function NavigationGuide() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenGuide, setHasSeenGuide] = useState(
    localStorage.getItem('hasSeenNavGuide') === 'true'
  );

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenNavGuide', 'true');
    setHasSeenGuide(true);
  };

  // Auto-show on first visit
  useState(() => {
    if (!hasSeenGuide) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenGuide]);

  return (
    <>
      {/* Help button - always visible */}
      {!isVisible && (
        <motion.button
          className="fixed bottom-6 left-6 z-40 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
          onClick={() => setIsVisible(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Show navigation guide"
        >
          <span className="text-2xl">💡</span>
        </motion.button>
      )}

      {/* Guide overlay */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Navigation Guide 🕊️
                </h3>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                  aria-label="Close guide"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📜</span>
                  <div>
                    <h4 className="font-semibold mb-1">Scroll to Explore</h4>
                    <p className="text-sm">
                      Each section tells part of our story. Scroll naturally to move through sections.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">🧭</span>
                  <div>
                    <h4 className="font-semibold mb-1">Floating Guide Button</h4>
                    <p className="text-sm">
                      Click the "Guide" button (bottom-right) to jump to any section quickly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">⌨️</span>
                  <div>
                    <h4 className="font-semibold mb-1">Keyboard Navigation</h4>
                    <p className="text-sm">
                      Use <kbd className="px-2 py-1 bg-gray-100 rounded">Space</kbd> to scroll down,
                      or <kbd className="px-2 py-1 bg-gray-100 rounded">↑</kbd>{' '}
                      <kbd className="px-2 py-1 bg-gray-100 rounded">↓</kbd> arrow keys.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">🌓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Theme Toggle</h4>
                    <p className="text-sm">
                      Switch between light/dark mode using the button at top-right.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-spiritual-blue to-spiritual-purple text-white rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Got it, thanks! ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavigationGuide;
