import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-light pt-32 pb-20 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-dark"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get in <span className="text-gradient bg-gradient-to-r from-primary to-secondary">Touch</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-dark/70 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We'd love to hear from you. Whether you have a question about our services, 
            need prayer, or just want to say hello, we're here for you.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info Card */}
          <motion.div 
            className="bg-dark-deep text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/30 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -ml-16 -mb-16 group-hover:bg-secondary/30 transition-all duration-700"></div>

            <div className="relative z-10 space-y-12">
              <div>
                <h3 className="text-3xl font-bold mb-6">Contact Information</h3>
                <p className="text-light-muted text-lg">
                  Fill up the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group/item">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0 backdrop-blur-sm group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300 shadow-glass">
                    📞
                  </div>
                  <div>
                    <p className="text-primary-light text-sm font-bold uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-xl font-medium">+254 714 888 066</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group/item">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0 backdrop-blur-sm group-hover/item:bg-secondary group-hover/item:text-white transition-all duration-300 shadow-glass">
                    📧
                  </div>
                  <div>
                    <p className="text-secondary-light text-sm font-bold uppercase tracking-wider mb-1">Email</p>
                    <p className="text-xl font-medium">info@atgchapel.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group/item">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0 backdrop-blur-sm group-hover/item:bg-success group-hover/item:text-white transition-all duration-300 shadow-glass">
                    📍
                  </div>
                  <div>
                    <p className="text-success text-sm font-bold uppercase tracking-wider mb-1">Location</p>
                    <p className="text-xl font-medium">KFA BULDING</p>
                    <p className="text-light-muted">Opposit Equity Bank Machakos, Kenya</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-light-muted mb-6 font-medium">Follow us on social media</p>
                <div className="flex gap-4">
                  {[
                    {
                      name: 'TikTok',
                      url: 'https://www.tiktok.com/@bishop_lazarusmusyoka',
                      icon: (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                        </svg>
                      ),
                      color: 'hover:bg-[#E60023] hover:border-[#E60023] hover:text-white'
                    },
                    {
                      name: 'YouTube',
                      url: 'https://www.youtube.com/@BishopLazarus',
                      icon: (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      ),
                      color: 'hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white'
                    },
                    {
                      name: 'Facebook',
                      url: 'https://www.facebook.com/lazarus.musyoka.2025',
                      icon: (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.791 1.657-2.791 3.568v1.655h2.763l-.382 3.666h-2.381v7.925a12.015 12.015 0 0 0 7.749-11.328 12.022 12.022 0 0 0-11.895-11.895A11.968 11.968 0 0 0 0 12.16 12.022 12.022 0 0 0 9.101 23.691z"/>
                        </svg>
                      ),
                      color: 'hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white'
                    }
                  ].map((social) => (
                    <a 
                      key={social.name}
                      href={social.url} 
                      className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-glass ${social.color}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="glass-panel rounded-3xl p-8 md:p-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center text-4xl mx-auto mb-6 animate-pulse-glow">
                  ✓
                </div>
                <h3 className="text-3xl font-bold text-dark mb-4">Message Sent!</h3>
                <p className="text-dark/60 mb-8 max-w-sm mx-auto">Thank you for reaching out. We'll get back to you shortly.</p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  variant="primary"
                  size="lg"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark/80 ml-1">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full px-5 py-3.5 rounded-xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm placeholder-gray-400"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark/80 ml-1">Your Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      className="w-full px-5 py-3.5 rounded-xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm placeholder-gray-400"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark/80 ml-1">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    required
                    className="w-full px-5 py-3.5 rounded-xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm placeholder-gray-400"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark/80 ml-1">Message</label>
                  <textarea 
                    name="message"
                    required
                    rows="5"
                    className="w-full px-5 py-3.5 rounded-xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm placeholder-gray-400 resize-none"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  variant="gradient"
                  size="lg"
                  className="w-full"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span> Sending...
                    </span>
                  ) : 'Send Message'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}

export default Contact;
