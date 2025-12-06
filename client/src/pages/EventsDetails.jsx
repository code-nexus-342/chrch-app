import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import apiService from '../services/api';

function EventsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        const eventData = await apiService.getEvent(id);
        setEvent(eventData);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError(err.message || 'Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const nextImage = () => {
    if (event?.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
    }
  };

  const prevImage = () => {
    if (event?.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4 text-indigo-600">⏳</div>
          <h3 className="text-xl font-semibold text-gray-700">Loading event details...</h3>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-md mx-4">
          <div className="text-5xl mb-4 text-rose-500">⚠️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Event not found</h3>
          <p className="text-gray-600 mb-6">{error || 'The event you are looking for does not exist.'}</p>
          <Link to="/events" className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition font-medium">
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/events" className="inline-flex items-center gap-2 px-6 py-2 bg-white text-indigo-600 rounded-full font-semibold shadow-sm hover:shadow-md transition-all mb-8 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Events
        </Link>
        
        <motion.div 
          className="bg-white rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Event Image Gallery */}
          <div className="relative h-[400px] md:h-[500px] bg-gray-900 group">
            <AnimatePresence mode='wait'>
                <motion.img 
                  key={currentImageIndex}
                  src={getImageUrl(event.images?.[currentImageIndex])} 
                  alt={event.title}
                  className="w-full h-full object-cover opacity-90"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => {
                    e.target.src = '/assets/img/hero-carousel/hero-carousel-1.jpg';
                  }}
                />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
            
            {event.images?.length > 1 && (
              <>
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all shadow-lg" onClick={prevImage}>
                    ←
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all shadow-lg" onClick={nextImage}>
                    →
                  </button>
                </div>
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {event.images.map((_, index) => (
                    <button 
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 shadow-sm ${index === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
            
            {event.featured && (
               <div className="absolute top-6 right-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                 <span>⭐</span> Featured
               </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-0">
             {/* Content Side */}
             <div className="md:col-span-2 p-8 md:p-12">
               <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{event.title}</h1>
               
               <div className="prose prose-lg text-gray-600 mb-10">
                 <h3 className="text-xl font-bold text-gray-900 mb-4 block">About This Event</h3>
                 <p className="leading-relaxed whitespace-pre-line">{event.description}</p>
               </div>

               <div className="bg-indigo-50 rounded-2xl p-6 md:p-8 border border-indigo-100">
                 <h3 className="font-bold text-indigo-900 mb-6 text-lg">Event Details</h3>
                 <div className="grid sm:grid-cols-2 gap-6">
                    <div className="flex gap-4 items-start">
                       <span className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-xl shadow-sm text-indigo-600">📅</span>
                       <div>
                         <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Date</p>
                         <p className="font-semibold text-gray-900">{event.date}</p>
                       </div>
                    </div>
                    <div className="flex gap-4 items-start">
                       <span className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-xl shadow-sm text-indigo-600">📍</span>
                       <div>
                         <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Venue</p>
                         <p className="font-semibold text-gray-900">{event.venue}</p>
                       </div>
                    </div>
                     <div className="flex gap-4 items-start">
                       <span className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-xl shadow-sm text-indigo-600">👤</span>
                       <div>
                         <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Host</p>
                         <p className="font-semibold text-gray-900">{event.host}</p>
                       </div>
                    </div>
                    <div className="flex gap-4 items-start">
                       <span className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-xl shadow-sm text-indigo-600">🏷️</span>
                       <div>
                         <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Type</p>
                         <p className="font-semibold text-gray-900 capitalize">{event.type}</p>
                       </div>
                    </div>
                 </div>
               </div>
             </div>
             
             {/* Sidebar Side (on desktop) / Bottom actions (on mobile) */}
             <div className="bg-gray-50 p-8 md:p-12 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-center">
                <div className="text-center mb-8">
                  <span className="inline-block w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl mb-4 mx-auto">
                    👋
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">Interested?</h3>
                  <p className="text-gray-600 mt-2">Get in touch to learn more or RSVP.</p>
                </div>
                
                <div className="space-y-4">
                  <a href={`tel:${event.contact}`} className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-200/50 transition-all transform hover:-translate-y-1">
                    <span>📞</span> Call Us
                  </a>
                  <a href={`sms:${event.contact}`} className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-gray-50 text-indigo-600 border-2 border-indigo-600/10 rounded-xl font-bold text-lg transition-all">
                    <span>💬</span> Send SMS
                  </a>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default EventsDetails;
