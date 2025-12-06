import { useState, useEffect } from 'react';
import Section from './ui/Section';
import Button from './ui/Button';

function OrderOfServices() {
  const [activeDay, setActiveDay] = useState('Sunday');

  const servicesData = {
    Sunday: [
      { name: '1st Service (Workers Service)', time: '4:00 AM – 6:00 AM', description: 'A dedicated service for church workers.', icon: '⚡', color: 'from-blue-400 to-indigo-500' },
      { name: '2nd Service (Youth Service)', time: '6:30 AM – 8:00 AM', description: 'A dynamic service for young people, featuring inspiring messages and engaging activities.', icon: '🎯', color: 'from-purple-400 to-pink-500' },
      { name: '3rd Service (Bible Study)', time: '8:30 AM – 10:00 AM', description: 'An in-depth study of God\'s Word, led by experienced teachers.', icon: '📖', color: 'from-blue-400 to-indigo-500' },
      { name: '4th Service (Main Service)', time: '11:00 AM – 2:00 PM', description: 'Main worship service featuring powerful preaching, inspiring music, and fellowship.', icon: '✨', color: 'from-amber-300 to-yellow-500' }
    ],
    Tuesday: [
      { name: 'Bible Study', time: '6:30 PM – 8:00 PM', description: 'A mid-week opportunity for deeper Bible study and discussion.', icon: '📚', color: 'from-blue-400 to-indigo-500' }
    ],
    Wednesday: [
      { name: 'Intercessory Prayer', time: '6:30 PM – 8:00 PM', description: 'A time for focused prayer and intercession for the church and the world.', icon: '🙏', color: 'from-purple-400 to-pink-500' },
      { name: 'Youth Kesha', time: '9:00 PM – 5:00 AM', description: 'An all-night prayer and worship event for young people.', icon: '🌙', color: 'from-blue-400 to-indigo-500' }
    ],
    Thursday: [
      { name: 'Ladies Fellowship', time: '5:00 PM – 7:00 PM', description: 'A special gathering for women to connect, grow, and support one another.', icon: '💐', color: 'from-pink-400 to-rose-500' }
    ],
    Friday: [
      { name: 'Kesha', time: '9:00 PM – 5:00 AM', description: 'An all-night prayer and worship event for the entire church.', icon: '⭐', color: 'from-amber-300 to-yellow-500' }
    ],
    'Monday – Friday': [
      { name: 'Lunch Hour Service', time: '12:00 PM – 2:00 PM', description: 'A daily service for worship and reflection during lunch hours.', icon: '☀️', color: 'from-amber-300 to-yellow-500' }
    ]
  };

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    if (servicesData[today]) {
      setActiveDay(today);
    }
  }, []);

  return (
    <Section id="services" background="white" className="bg-gradient-to-b from-white to-gray-50">
      <div className="text-center mb-12">
        <span className="text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          WORSHIP WITH US
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
          Order of Services
        </h2>
        <div className="mt-6 max-w-2xl mx-auto p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
          <p className="text-lg text-gray-700 italic font-serif">
            "Not giving up meeting together, as some are in the habit of doing, but encouraging one another"
          </p>
          <span className="block mt-2 text-sm text-gray-500 font-medium">- Hebrews 10:25</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {Object.keys(servicesData).map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm md:text-base ${
              activeDay === day
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData[activeDay].map((service, index) => (
          <div 
            key={index}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${service.color}`}></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl">{service.icon}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r ${service.color} text-white opacity-90`}>
                  {activeDay}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
              
              <div className="flex items-center text-gray-500 text-sm font-semibold mb-4 bg-gray-50 p-2 rounded-md inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {service.time}
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 bg-indigo-50 rounded-2xl p-8 max-w-4xl mx-auto">
        <p className="text-gray-800 text-lg font-medium mb-6">Can't make it in person? Join us online for live streaming services</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="primary" size="lg" href="https://www.youtube.com/@BishopLazarus" target="_blank">
            Watch Live
          </Button>
          <Button variant="outline" size="lg">
            Get Reminders
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default OrderOfServices;
