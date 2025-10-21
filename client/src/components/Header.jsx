import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import EventsAdmin from './EventsAdmin';

function Header() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const location = useLocation();
  const clickTimeoutRef = useRef(null);
  const clickCountRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav when route changes
  useEffect(() => {
    // Close mobile nav when route changes
    setMobileNavActive(false);
    setActiveDropdown(null);
    // Ensure body class is removed on navigation
    document.body.classList.remove('mobile-nav-active');
  }, [location]);

  // Ensure body class is cleaned up on unmount as well
  useEffect(() => {
    return () => {
      document.body.classList.remove('mobile-nav-active');
    };
  }, []);

  const toggleMobileNav = () => {
    setMobileNavActive((prev) => {
      const next = !prev;
      // Toggle body class so CSS selectors like `.mobile-nav-active .navmenu` apply
      document.body.classList.toggle('mobile-nav-active', next);
      if (!next) {
        setActiveDropdown(null);
      }
      return next;
    });
  };

  const closeMobileNav = () => {
    setMobileNavActive(false);
    setActiveDropdown(null);
    document.body.classList.remove('mobile-nav-active');
  };

  const toggleDropdown = (e, dropdownName) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  // Handle double-click on logo for admin access
  const handleLogoClick = () => {
    clickCountRef.current += 1;

    if (clickCountRef.current === 1) {
      clickTimeoutRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 500); // Reset after 500ms
    } else if (clickCountRef.current === 2) {
      clearTimeout(clickTimeoutRef.current);
      clickCountRef.current = 0;
      setShowAdminLogin(true);
    }
  };

  const handleAdminLogin = (email) => {
    setAdminEmail(email);
    setShowAdminLogin(false);
    setShowAdminDashboard(true);
  };

  const handleAdminClose = () => {
    setShowAdminDashboard(false);
    setAdminEmail('');
  };

  return (
    <>
      {/* Theme Toggle Button */}
      <ThemeToggle />
      
      <header 
        id="header" 
        className={`header d-flex align-items-center fixed-top glass ${scrolled ? 'scrolled' : ''}`}
      >
        <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <div 
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
            title="Double-click for admin access"
          >
            <Link to="/" className="logo d-flex align-items-center">
              <h1 className="sitename divine-gradient-text">ATG Chapel</h1>
            </Link>
          </div>

          <nav id="navmenu" className={`navmenu ${mobileNavActive ? 'mobile-nav-active' : ''}`}>
            <ul>
              <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMobileNav}>Home</Link></li>
              <li><a href="/#this-week" onClick={closeMobileNav}>This Week</a></li>
              <li><a href="/#about" onClick={closeMobileNav}>About Us</a></li>
              <li><Link to="/community" className={location.pathname === '/community' ? 'active' : ''} onClick={closeMobileNav}>Community</Link></li>
              <li><Link to="/programs" className={location.pathname === '/programs' ? 'active' : ''} onClick={closeMobileNav}>Programs</Link></li>
              <li><a href="/#team" onClick={closeMobileNav}>Media</a></li>
              <li><Link to="/mission" className={location.pathname === '/mission' ? 'active' : ''} onClick={closeMobileNav}>Mission</Link></li>
              <li><a href="/#Events" onClick={closeMobileNav}>Events</a></li>
              <li className={`dropdown ${activeDropdown === 'services' ? 'dropdown-active' : ''}`}>
                <a href="#" onClick={(e) => toggleDropdown(e, 'services')}>
                  <span>Services</span> <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul>
                  <li className={`dropdown ${activeDropdown === 'tools' ? 'dropdown-active' : ''}`}>
                    <a href="#" onClick={(e) => toggleDropdown(e, 'tools')}>
                      <span>Interactive Tools</span> <i className="bi bi-chevron-down toggle-dropdown"></i>
                    </a>
                    <ul>
                      <li><Link to="/bible" onClick={closeMobileNav}>Bible-Notebook</Link></li>
                      <li><a href="https://gemni-chatbot.lovable.app/chatbot" target="_blank" rel="noopener noreferrer" onClick={closeMobileNav}>Motivation-Chatbot</a></li>
                      <li><a href="https://gemni-chatbot.lovable.app/chatbot" target="_blank" rel="noopener noreferrer" onClick={closeMobileNav}>Schedule-Meeting</a></li>
                    </ul>
                  </li>
                  <li><a href="#" onClick={closeMobileNav}>Worship Songs</a></li>
                  <li><a href="#" className="prayer-request-btn" onClick={closeMobileNav}><i className="bi bi-heart"></i> Prayer Request</a></li>
                </ul>
              </li>
              <li><a href="/#contact" onClick={closeMobileNav}>Contact</a></li>
            </ul>
            <i 
              className={`mobile-nav-toggle d-xl-none bi ${mobileNavActive ? 'bi-x' : 'bi-list'}`}
              onClick={toggleMobileNav}
            ></i>
          </nav>
        </div>
      </header>

      {/* Admin Login Modal */}
      <AdminLogin 
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLogin={handleAdminLogin}
      />

      {/* Admin Dashboard Modal */}
      <EventsAdmin 
        isOpen={showAdminDashboard}
        onClose={handleAdminClose}
        adminEmail={adminEmail}
      />
    </>
  );
}

function ThemeToggle() {
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
    <button className="theme-toggle" aria-label="Toggle dark/light mode" onClick={toggleTheme}>
      <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'}`}></i>
    </button>
  );
}

export default Header;
