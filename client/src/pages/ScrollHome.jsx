import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import Layout from '../components/Layout';
import SpiritualBackgroundEffects from '../components/SpiritualBackgroundEffects';

/**
 * ScrollHome Component - New narrative scroll-driven home page
 */
function ScrollHome() {
  useEffect(() => {
    // Add scroll snap CSS to body
    document.body.style.scrollSnapType = 'y proximity';
    
    return () => {
      document.body.style.scrollSnapType = '';
    };
  }, []);

  return (
    <Layout>
      <div className="scroll-container">
        <style>{`
          .scroll-section {
            scroll-snap-align: start;
            scroll-snap-stop: normal;
          }
        `}</style>

        {/* Welcome Section */}
        <Section
          name="welcome"
          title="Welcome Home"
          subtitle="Where faith meets family, and every heart finds peace"
          background="bg-gradient-to-br from-spiritual-light via-blue-50 to-purple-50"
        >
          <SpiritualBackgroundEffects variant="particles" />
          <div className="space-y-6">
            <motion.p
              className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Step into a sanctuary of love, hope, and divine purpose. 
              At ATG Chapel, we gather as one family, united in faith and service.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button className="px-8 py-4 bg-gradient-to-r from-spiritual-blue to-spiritual-purple text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                Join Us This Sunday
              </button>
            </motion.div>
          </div>
        </Section>

        {/* Our Vision Section */}
        <Section
          name="vision"
          title="Our Vision"
          subtitle="Building a community rooted in Christ's love"
          background="bg-gradient-to-br from-white to-spiritual-light"
          backgroundImage="/assets/img/hero-carousel/hero-carousel-1.jpg"
          darkText={false}
        >
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {[
              {
                icon: '💫',
                title: 'Worship',
                description: 'Experience transformative worship that lifts your spirit',
              },
              {
                icon: '🤝',
                title: 'Fellowship',
                description: 'Connect with a loving community that feels like home',
              },
              {
                icon: '📖',
                title: 'Growth',
                description: 'Grow deeper in your faith through God\'s Word',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: false }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Community Section */}
        <Section
          name="community"
          title="Join Our Community"
          subtitle="Where every person is valued and every story matters"
          background="bg-gradient-to-br from-purple-50 via-spiritual-light to-white"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Our church is more than a building—it's a family of believers walking 
              together in faith, supporting one another through life's journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/community">
                <button className="px-6 py-3 bg-spiritual-purple text-white rounded-full font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                  Meet Our Community
                </button>
              </Link>
              <Link to="/programs">
                <button className="px-6 py-3 border-2 border-spiritual-purple text-spiritual-purple rounded-full font-semibold hover:bg-spiritual-purple hover:text-white transition-all">
                  Explore Programs
                </button>
              </Link>
            </div>
          </div>
        </Section>

        {/* Sermons Section */}
        <Section
          name="sermons"
          title="Messages That Transform"
          subtitle="Encounter God's Word in powerful, relevant ways"
          background="bg-gradient-to-br from-spiritual-light to-blue-50"
        >
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'Sunday Services',
                time: 'Every Sunday 10:00 AM',
                description: 'Join us for inspiring worship and biblical teaching',
              },
              {
                title: 'Watch Online',
                time: 'Available 24/7',
                description: 'Catch up on past sermons anytime, anywhere',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: false }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-spiritual-blue font-semibold mb-3">{item.time}</p>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Events Section */}
        <Section
          name="events"
          title="Upcoming Events"
          subtitle="Connect, grow, and serve together"
          background="bg-gradient-to-br from-white via-purple-50 to-spiritual-light"
        >
          <div className="space-y-6 max-w-3xl mx-auto">
            <p className="text-lg text-gray-700">
              From community outreach to youth gatherings, there's always something 
              happening at ATG Chapel. Join us and be part of something meaningful.
            </p>
            <Link to="/events">
              <button className="px-8 py-4 bg-gradient-to-r from-spiritual-gold to-yellow-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                View All Events
              </button>
            </Link>
          </div>
        </Section>

        {/* Give Section */}
        <Section
          name="give"
          title="Give with Gratitude"
          subtitle="Your generosity changes lives and spreads hope"
          background="bg-gradient-to-br from-spiritual-light to-white"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              "Each of you should give what you have decided in your heart to give, 
              not reluctantly or under compulsion, for God loves a cheerful giver." 
              <span className="block mt-2 text-spiritual-purple font-semibold">— 2 Corinthians 9:7</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-spiritual-gold text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                Give Online
              </button>
              <button className="px-8 py-4 border-2 border-spiritual-gold text-spiritual-gold rounded-full font-semibold hover:bg-spiritual-gold hover:text-white transition-all">
                Learn More
              </button>
            </div>
          </div>
        </Section>

        {/* Contact Section */}
        <Section
          name="contact"
          title="Get in Touch"
          subtitle="We'd love to hear from you"
          background="bg-gradient-to-br from-blue-50 via-spiritual-light to-purple-50"
        >
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '📍',
                  title: 'Visit Us',
                  info: 'Sunday Services at 10:00 AM',
                },
                {
                  icon: '📧',
                  title: 'Email Us',
                  info: 'info@atgchapel.org',
                },
                {
                  icon: '📞',
                  title: 'Call Us',
                  info: '(555) 123-4567',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: false }}
                >
                  <div className="text-5xl mb-3">{item.icon}</div>
                  <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.info}</p>
                </motion.div>
              ))}
            </div>
            <button className="px-8 py-4 bg-gradient-to-r from-spiritual-blue to-spiritual-purple text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              Send Us a Message
            </button>
          </div>
        </Section>
      </div>
    </Layout>
  );
}

export default ScrollHome;
