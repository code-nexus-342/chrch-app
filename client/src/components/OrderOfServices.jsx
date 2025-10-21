import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function OrderOfServices() {
  const [activeDay, setActiveDay] = useState('Sunday');

  const servicesData = {
    Sunday: [
      { name: '1st Service (Workers Service)', time: '4:00 AM – 6:00 AM', description: 'A dedicated service for church workers.', icon: '⚡', color: 'spiritual-blue' },
      { name: '2nd Service (Youth Service)', time: '6:30 AM – 8:00 AM', description: 'A dynamic service for young people, featuring inspiring messages and engaging activities.', icon: '🎯', color: 'spiritual-purple' },
      { name: '3rd Service (Bible Study)', time: '8:30 AM – 10:00 AM', description: 'An in-depth study of God\'s Word, led by experienced teachers.', icon: '📖', color: 'spiritual-blue' },
      { name: '4th Service (Main Service)', time: '11:00 AM – 2:00 PM', description: 'Main worship service featuring powerful preaching, inspiring music, and fellowship.', icon: '✨', color: 'spiritual-gold' }
    ],
    Tuesday: [
      { name: 'Bible Study', time: '6:30 PM – 8:00 PM', description: 'A mid-week opportunity for deeper Bible study and discussion.', icon: '📚', color: 'spiritual-blue' }
    ],
    Wednesday: [
      { name: 'Intercessory Prayer', time: '6:30 PM – 8:00 PM', description: 'A time for focused prayer and intercession for the church and the world.', icon: '🙏', color: 'spiritual-purple' },
      { name: 'Youth Kesha', time: '9:00 PM – 5:00 AM', description: 'An all-night prayer and worship event for young people.', icon: '🌙', color: 'spiritual-blue' }
    ],
    Thursday: [
      { name: 'Ladies Fellowship', time: '5:00 PM – 7:00 PM', description: 'A special gathering for women to connect, grow, and support one another.', icon: '💐', color: 'spiritual-purple' }
    ],
    Friday: [
      { name: 'Kesha', time: '9:00 PM – 5:00 AM', description: 'An all-night prayer and worship event for the entire church.', icon: '⭐', color: 'spiritual-gold' }
    ],
    'Monday – Friday': [
      { name: 'Lunch Hour Service', time: '12:00 PM – 2:00 PM', description: 'A daily service for worship and reflection during lunch hours.', icon: '☀️', color: 'spiritual-gold' }
    ]
  };

  const days = Object.keys(servicesData);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    if (servicesData[today]) {
      setActiveDay(today);
    }
  }, []);

  return (
    <section id="services" className="divine-section bg-gradient-to-b from-spiritual-light via-white to-blue-50 py-16">
      <div className="container">
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="divine-gradient-text text-lg font-semibold">WORSHIP WITH US</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-gray-800">
            🕊️ Order of Services
          </h2>
          <p className="scripture animated-scripture mx-auto mt-4 max-w-2xl" data-reference="Hebrews 10:25">
            Not giving up meeting together, as some are in the habit of doing, but encouraging one another
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up" data-aos-delay="100">
          {days.map((day) => (
            <motion.button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeDay === day
                  ? 'bg-gradient-to-r from-spiritual-blue to-spiritual-purple text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {day}
            </motion.button>
          ))}
        </div>

        <div className="row g-4">
          {servicesData[activeDay].map((service, index) => (
            <motion.div
              key={index}
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="divine-border h-100 p-4 bg-white rounded-3 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <motion.div className="text-6xl" whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
                    {service.icon}
                  </motion.div>
                  <span className={`badge bg-gradient-to-r from-${service.color} to-spiritual-purple text-white px-3 py-2 rounded-pill`}>
                    {activeDay}
                  </span>
                </div>
                <h3 className="h4 mb-3 text-gray-800 font-bold">{service.name}</h3>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-clock me-2 divine-gradient-text"></i>
                  <span className={`text-${service.color} font-semibold`}>{service.time}</span>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <div className={`h-1 w-100 bg-gradient-to-r from-${service.color} to-spiritual-purple rounded mt-auto`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <p className="text-gray-600 text-lg mb-4">Can't make it in person? Join us online for live streaming services</p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a href="#" className="btn-divine">
              <i className="bi bi-play-circle me-2"></i>
              Watch Live
            </a>
            <a href="#contact" className="btn btn-outline-primary rounded-pill px-5 py-3">
              <i className="bi bi-bell me-2"></i>
              Get Reminders
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default OrderOfServices;
