import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';
import AdminLogin from './AdminLogin';
import EventsAdmin from './EventsAdmin';

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('⏳ Subscribing...');

    try {
      const response = await apiService.subscribeNewsletter(email);
      setMessage(response.message || '✅ Successfully subscribed!');
      setEmail('');
    } catch (error) {
      console.error(error); // Log error for debugging
      setMessage(error.message || '❌ Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="footer" className="bg-dark-deep text-light-muted py-20 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Column */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold text-white tracking-tight inline-block">
               <span className="text-gradient bg-gradient-to-r from-primary to-secondary">ATG Chapel</span>
            </Link>
            <div className="space-y-3 text-sm">
              <p>Mwatu Wa Ngoma Rd</p>
              <p>Machakos, MKS KFA Building</p>
              <p className="mt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <strong className="text-white">Phone:</strong> +254 714 888 016
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <strong className="text-white">Email:</strong> atgmksinfo@gmail.com
              </p>
            </div>
            <div className="flex gap-4 pt-2">
              {[
                {
                  name: 'TikTok',
                  url: 'https://www.tiktok.com/@bishop_lazarusmusyoka',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  ),
                  color: 'hover:bg-[#E60023] hover:text-white' // Using Pinterest color as proxy or specific hex: #ff0050 for tiktok actually
                },
                {
                  name: 'YouTube',
                  url: 'https://www.youtube.com/@BishopLazarus',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ),
                  color: 'hover:bg-[#FF0000] hover:text-white'
                },
                {
                  name: 'Facebook',
                  url: 'https://www.facebook.com/lazarus.musyoka.2025',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.791 1.657-2.791 3.568v1.655h2.763l-.382 3.666h-2.381v7.925a12.015 12.015 0 0 0 7.749-11.328 12.022 12.022 0 0 0-11.895-11.895A11.968 11.968 0 0 0 0 12.16 12.022 12.022 0 0 0 9.101 23.691z"/>
                    </svg>
                  ),
                  color: 'hover:bg-[#1877F2] hover:text-white'
                }
              ].map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  className={`h-10 w-10 rounded-full bg-dark-lighter border border-white/5 flex items-center justify-center transition-all duration-300 hover:shadow-glow-sm hover:-translate-y-1 ${social.color}`}
                  aria-label={social.name}
                >
                   {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Useful Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Community', path: '/community' },
                { label: 'Programs', path: '/programs' },
                { label: 'Events', path: '/events' }
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.path} className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Impact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Our Impact</h4>
            <ul className="space-y-3 text-sm">
                {[
                  { label: 'Our Mission', path: '/mission' },
                  { label: 'Bible Studies', path: '/bible' },
                  { label: 'Services', path: '/services' },
                  { label: 'Founders', path: '/founders' },
                  { label: 'Visit Us', path: '/contact' }
                ].map(item => (
                <li key={item.label}>
                  <Link to={item.path} className="hover:text-secondary transition-colors flex items-center gap-2 group">
                     <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-secondary transition-colors"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Our Newsletter</h4>
            <p className="text-sm text-gray-400 mb-6">Subscribe to our newsletter and receive the latest news and events!</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  name="email" 
                  value={email}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEmail(val);
                    if (val.toLowerCase() === 'event') {
                      setShowAdminLogin(true);
                      setEmail(''); // Clear the secret code
                    }
                  }}
                  required 
                  placeholder="Your email address"
                  disabled={isSubmitting}
                  className="w-full px-5 py-3 bg-dark-lighter border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-500 outline-none transition-all shadow-inner"
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="absolute right-1.5 top-1.5 bg-primary hover:bg-primary-dark text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-glow-sm hover:shadow-glow-md disabled:opacity-50"
                >
                  Join
                </button>
              </div>
            </form>
            {message && <div className="mt-3 text-sm font-medium animate-fade-in text-success">{message}</div>}
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© <strong className="text-white px-1">2025</strong> <span className="text-gradient bg-gradient-to-r from-primary to-secondary font-bold">ATG Chapel</span>. All Rights Reserved.</p>
          <div className="">
            Designed by <a href="#" className="text-primary hover:text-secondary transition-colors font-medium">Mentee Ministers</a>
          </div>
        </div>
      </div>

      {/* Scroll Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary text-white shadow-glow-md transition-all duration-500 z-50 hover:bg-primary-dark hover:-translate-y-1 ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* Admin Login Modal */}
      <AdminLogin 
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLogin={(email) => {
          setAdminEmail(email);
          setShowAdminLogin(false);
          setShowAdminDashboard(true);
        }}
      />

      {/* Admin Dashboard Modal */}
      <EventsAdmin 
        isOpen={showAdminDashboard}
        onClose={() => {
          setShowAdminDashboard(false);
          setAdminEmail('');
        }}
        adminEmail={adminEmail}
      />
    </footer>
  );
}

export default Footer;
