import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Section from './ui/Section';
import Button from './ui/Button';
import PrayerRequestModal from './PrayerRequestModal';

function ThisWeekSection() {
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  return (
    <Section id="this-week" background="light">
      {/* Section Title */}
      <div className="text-center mb-12">
        <span className="text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          JOIN US THIS WEEK
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Experience God's Presence</h2>
        
        <div className="mt-4 p-4 bg-white rounded-lg shadow-sm inline-block max-w-2xl">
          <p className="text-lg text-gray-700 italic font-serif">
            "May the God of hope fill you with all joy and peace as you trust in him."
          </p>
          <span className="block mt-2 text-sm text-gray-500 font-medium">- Romans 15:13</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Next Service Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-indigo-50 rounded-full mr-4 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Next Service</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Sunday, October 20th</h4>
                  <p className="text-gray-500">9:30 AM - 12:00 PM</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase tracking-wide">
                  Upcoming
                </span>
              </div>
              
              <div>
                <h5 className="text-xl font-bold text-indigo-900 mb-2">The Power of Faith</h5>
                <p className="text-gray-600 leading-relaxed">
                  Join Bishop Lazarus Musyoka for an inspiring message about overcoming life's obstacles through unwavering faith. Experience powerful worship and a welcoming community.
                </p>
              </div>
              
              <div className="pt-4 flex gap-3">
                <Button variant="outline" size="sm">Directions</Button>
                <Button variant="primary" size="sm">Watch Online</Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Weekly Events Cards */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="p-8 h-full flex flex-col">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-purple-50 rounded-full mr-4 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">This Week's Events</h3>
            </div>
            
            <div className="flex-grow space-y-6">
              {[
                { day: '22', month: 'OCT', title: 'Prayer & Intercession', time: '6:00 PM - 8:00 PM', desc: 'Join us for a powerful evening of prayer.' },
                { day: '23', month: 'OCT', title: 'Bible Study', time: '5:30 PM - 7:00 PM', desc: 'Deepen your understanding of Scripture.' },
                { day: '25', month: 'OCT', title: 'Youth Fellowship', time: '6:00 PM - 8:30 PM', desc: 'A dynamic gathering for youth.' }
              ].map((event, index) => (
                <div key={index} className="flex gap-4 items-start group">
                  <div className="flex-shrink-0 w-16 text-center bg-gray-50 rounded-lg p-2 group-hover:bg-indigo-50 transition-colors">
                    <span className="block text-xl font-bold text-gray-900 group-hover:text-indigo-600">{event.day}</span>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">{event.month}</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{event.title}</h5>
                    <p className="text-xs font-semibold text-gray-500 mb-1">{event.time}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center pt-4 border-t border-gray-100">
              <Link to="/events" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
                View All Events 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {[
          { icon: 'people', title: 'Our Founders', desc: 'Meet Bishop Lazarus Musyoka and the team.', link: '/founders' },
          { icon: 'book', title: 'Order of Services', desc: 'Experience our reverent worship services.', link: '/services' },
          { icon: 'heart', title: 'Prayer Request', desc: 'Share your prayer needs with our team.', link: '/prayer-request', isAction: true }
        ].map((item, index) => (
          <Link 
            key={index} 
            to={item.link} 
            className="block group bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            onClick={item.isAction ? (e) => { e.preventDefault(); setIsPrayerModalOpen(true); } : undefined}
          >
            <div className="flex items-center mb-3">
              <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                {/* Simplified icons for brevity */}
                <span className="text-xl font-bold">➜</span> 
              </div>
              <h4 className="ml-4 text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
            </div>
            <p className="text-gray-600 pl-16">{item.desc}</p>
          </Link>
        ))}
      </div>
      
      <PrayerRequestModal 
        isOpen={isPrayerModalOpen} 
        onClose={() => setIsPrayerModalOpen(false)} 
      />
    </Section>
  );
}

export default ThisWeekSection;
