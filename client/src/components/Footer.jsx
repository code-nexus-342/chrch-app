import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('⏳ Subscribing...');

    try {
      const response = await apiService.subscribeNewsletter(email);
      setMessage(response.message || '✅ Successfully subscribed!');
      setEmail('');
    } catch (error) {
      setMessage(error.message || '❌ Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="footer" className="footer dark-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <Link to="/" className="logo d-flex align-items-center">
              <span className="sitename">ATG Chapel</span>
            </Link>
            <div className="footer-contact pt-3">
              <p>Mwatu Wa Ngoma Rd</p>
              <p>Machakos, MKS KFA Building</p>
              <p className="mt-3"><strong>Phone:</strong> <span>+254 714 888 016</span></p>
              <p><strong>Email:</strong> <span>atgmksinfo@gmail.com</span></p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-youtube"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="/#about">About us</a></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><a href="/#Events">Events</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Impact</h4>
            <ul>
              <li><a href="#">Mentee Ministry</a></li>
              <li><a href="#">Community Outreach</a></li>
              <li><a href="#">Bible Studies</a></li>
              <li><a href="#">Motivation Chatbot</a></li>
              <li><a href="#">Visit Us</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>Our Newsletter</h4>
            <p>Subscribe to our newsletter and receive the latest news and Events!</p>
            <form onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                placeholder="Your email"
                disabled={isSubmitting}
              />
              <button type="submit" disabled={isSubmitting}>Subscribe</button>
            </form>
            {message && <div id="newsletter-message">{message}</div>}
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>© <span>Copyright</span> <strong className="px-1 sitename">2025</strong> <span>All Rights Reserved</span></p>
        <div className="credits">
          Designed by <a href="#">Mentee Ministers</a>
        </div>
      </div>

      {/* Scroll Top */}
      <ScrollTop />
    </footer>
  );
}

function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <a 
      href="#" 
      id="scroll-top" 
      className={`scroll-top d-flex align-items-center justify-content-center ${visible ? 'active' : ''}`}
      onClick={scrollToTop}
    >
      <i className="bi bi-arrow-up-short"></i>
    </a>
  );
}

export default Footer;
