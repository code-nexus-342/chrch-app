import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Section from './ui/Section';
import apiService from '../services/api';

function EventsSection() {
  const [filter, setFilter] = useState('*');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Helper to get image URL (duplicated from Events.jsx - optimal to move to utils but checking inline for now)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/assets/img/hero-carousel/hero-carousel-1.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    const API_BASE_URL = import.meta.env.VITE_API_URL || 
      (window.location.hostname.includes('localhost') 
        ? 'http://localhost:5000' 
        : 'https://atgchapelmks-0dm8.onrender.com');
    return `${API_BASE_URL}${imagePath}`;
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Fetch all events then take latest 6
      const allEvents = await apiService.getEvents();
      // Sort by created_at or event_date if needed, assuming API returns sorted or we sort here
      // Let's assume API returns them, we just take top 6 for the home section
      setEvents(allEvents.slice(0, 6)); 
    } catch (error) {
      console.error('Failed to fetch events for section:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();

    // Listen for updates from Admin Dashboard
    const handleEventsUpdate = () => {
      fetchEvents();
    };

    window.addEventListener('events-updated', handleEventsUpdate);
    return () => window.removeEventListener('events-updated', handleEventsUpdate);
  }, []);

  const categories = [
    { id: '*', label: 'All' },
    { id: 'Youth Event', label: 'Youth' },
    { id: 'Fellowship', label: 'Fellowships' },
    { id: 'Conference', label: 'Conferences' },
    { id: 'Crusade', label: 'Crusades' },
    { id: 'Special Service', label: 'Special' },
    { id: 'Workshop', label: 'Workshops' },
    { id: 'Prayer Meeting', label: 'Prayer' },
    { id: 'Community Outreach', label: 'Outreach' }
  ];

  // Map API types to our filter IDs if needed, or just use the type string directly
  // The API events have a 'type' field.
  // We need to normalize types for filtering
  
  const filteredEvents = filter === '*' 
    ? events 
    : events.filter(event => event.type === filter);

  return (
    <Section id="events" background="light" className="relative py-24">
       <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">Upcoming Events</h2>
        <p className="text-lg text-primary font-medium tracking-wide">Where Divinity Meets Humanity!</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm ${
               filter === cat.id
               ? 'bg-primary text-white shadow-lg shadow-primary/30 transform -translate-y-1'
               : 'bg-white text-dark/70 hover:bg-white hover:text-primary hover:shadow-md'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12">
           <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-80">
                <img 
                  src={getImageUrl(event.images?.[0])} 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
                  alt={event.title} 
                  onError={(e) => { e.target.src = '/assets/img/hero-carousel/hero-carousel-1.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-dark-deep/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm">
                    {event.type}
                  </span>
                  <h4 className="text-white text-2xl font-bold mb-2">{event.title}</h4>
                  <div className="flex items-center justify-between mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <span className="text-sm text-gray-300">{event.date}</span>
                    <Link to={`/events`} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-glow-sm">
                       ➜
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="col-span-full text-center text-gray-500 py-8">
               No events found in this category.
             </div>
          )}
        </div>
      )}
    </Section>
  );
}

export default EventsSection;
