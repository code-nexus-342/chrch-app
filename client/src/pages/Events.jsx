import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import apiService from '../services/api';
import Section from '../components/ui/Section';

function Events() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/assets/img/hero-carousel/hero-carousel-1.jpg';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it's a relative path, prepend the API base URL
    const API_BASE_URL = import.meta.env.VITE_API_URL || 
      (window.location.hostname.includes('localhost') 
        ? 'http://localhost:5000' 
        : 'https://atgchapelmks-0dm8.onrender.com');
    
    return `${API_BASE_URL}${imagePath}`;
  };

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const events = await apiService.getEvents();
        setAllEvents(events);
        setFilteredEvents(events);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message || 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

    const handleEventsUpdate = () => {
      fetchEvents();
    };

    window.addEventListener('events-updated', handleEventsUpdate);
    return () => window.removeEventListener('events-updated', handleEventsUpdate);
  }, []);

  // Filter events based on selected filter
  useEffect(() => {
    if (selectedFilter === 'all') {
      setFilteredEvents(allEvents);
    } else {
      setFilteredEvents(allEvents.filter(event => event.type.toLowerCase() === selectedFilter));
    }
  }, [selectedFilter, allEvents]);

  const filters = [
    { label: 'All Events', value: 'all' },
    { label: 'Crusades', value: 'crusade' },
    { label: 'Conferences', value: 'conference' },
    { label: 'Fellowships', value: 'fellowship' },
    { label: 'Special Services', value: 'special service' },
    { label: 'Workshops', value: 'workshop' },
    { label: 'Prayer Meetings', value: 'prayer meeting' },
    { label: 'Youth Events', value: 'youth event' },
    { label: 'Community Outreach', value: 'community outreach' }
  ];

  const getEventTypeColor = (type) => {
    switch(type.toLowerCase()) {
      case 'crusade': return 'blue';
      case 'conference': return 'purple';
      case 'fellowship': return 'green';
      case 'special service': return 'amber';
      default: return 'gray';
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-indigo-900">
        <div className="absolute inset-0">
          <img 
            src="/assets/img/Atg-carousel-1.jpg" 
            alt="Events Hero" 
            className="w-full h-full object-cover opacity-30"
            onError={(e) => {e.target.src = '/assets/img/hero-bg.jpg'}}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">Upcoming Events</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto font-light leading-relaxed">
              Where Divinity Meets Humanity - Join Us in Worship, Fellowship, and Service
            </p>
          </motion.div>
        </div>
      </div>

      <Section className="-mt-20 relative z-20 pb-24">
        {/* Filters */}
        <motion.div 
          className="bg-white rounded-full shadow-xl p-2 md:p-4 max-w-4xl mx-auto flex flex-wrap justify-center gap-2 md:gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                selectedFilter === filter.value 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20 text-gray-500">
            <div className="animate-spin text-4xl mb-4">⏳</div>
            <h3 className="text-xl font-semibold">Loading events...</h3>
            <p>Please wait while we fetch the latest events</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20 text-red-500">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold">Unable to load events</h3>
            <p className="mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && filteredEvents.length > 0 && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredEvents.map((event) => {
                const color = getEventTypeColor(event.type);
                return (
                  <motion.div
                    layout
                    key={event.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={getImageUrl(event.images?.[0])} 
                        alt={event.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = '/assets/img/hero-carousel/hero-carousel-1.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {event.featured && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          ⭐ Featured
                        </div>
                      )}
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-${color}-100 text-${color}-800 mb-2`}>
                          {event.type}
                        </span>
                        <h3 className="text-xl font-bold text-white drop-shadow-md leading-tight">{event.title}</h3>
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      <div className="space-y-3 mb-6 flex-grow">
                        <div className="flex items-center text-gray-600 text-sm">
                          <span className="w-5 mr-3 text-center">📅</span> 
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <span className="w-5 mr-3 text-center">📍</span>
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <span className="w-5 mr-3 text-center">📞</span>
                          <span>{event.contact}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed pt-2 border-t border-gray-100 mt-2">
                          {event.description}
                        </p>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-gray-100 mt-auto">
                        <Link to={`/events/${event.id}`} className="flex-1 text-center py-2.5 rounded-xl font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition">
                          Details
                        </Link>
                        <a href={`tel:${event.contact}`} className="flex-1 text-center py-2.5 rounded-xl font-semibold bg-gray-50 text-gray-700 hover:bg-gray-100 transition">
                          Contact
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* No Events State */}
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="text-center py-20 text-gray-500 bg-white rounded-3xl shadow-sm max-w-2xl mx-auto">
            <div className="text-6xl mb-4 opacity-50">📅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No events found</h3>
            <p>Try selecting a different filter category</p>
          </div>
        )}
      </Section>
    </main>
  );
}

export default Events;
