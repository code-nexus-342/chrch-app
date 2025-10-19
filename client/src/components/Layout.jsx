import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import FloatingHub from './FloatingHub';
import PrayerRequestModal from './PrayerRequestModal';
import NavigationGuide from './NavigationGuide';
import PropTypes from 'prop-types';

/**
 * Layout Component - Wrapper for pages with FloatingHub
 * @param {React.ReactNode} children - Page content
 */
function Layout({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="relative">
      {/* Theme Toggle Button - Fixed position */}
      <button 
        className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
        aria-label="Toggle dark/light mode" 
        onClick={toggleTheme}
      >
        <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'} text-xl text-gray-800`}></i>
      </button>

      {/* Main content */}
      <main className="relative">
        {children || <Outlet />}
      </main>

      {/* Floating Hub Navigation */}
      <FloatingHub />

      {/* Navigation Guide (first-time helper) */}
      <NavigationGuide />

      {/* Prayer Request Modal */}
      <PrayerRequestModal />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
