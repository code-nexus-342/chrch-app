import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

// Events data
const eventsData = [
  {
    id: 1,
    title: 'Mutituni Market Crusade',
    type: 'Crusade',
    date: '07-09 March, 2025',
    venue: 'Mutituni Market',
    host: 'ATG Chapel Mks',
    contact: '0714888066',
    images: [
      '/assets/img/Events/Crusade.jpg',
      '/assets/img/Events/Confrence.jpg',
      '/assets/img/Events/Fellowship.jpg'
    ],
    description: 'Join us for a powerful three-day crusade at Mutituni Market. Experience transformative worship, anointed preaching, and miraculous testimonies as we bring the gospel to our community.',
    featured: true,
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Youth Conference 2025',
    type: 'Conference',
    date: '15 March, 2025',
    venue: 'ATG Chapel Hall',
    host: 'ATG Youth Ministry',
    contact: '0714888066',
    images: [
      '/assets/img/Events/Youth 2.jpg',
      '/assets/img/Events/Youth 1.jpg'
    ],
    description: 'A dynamic youth conference featuring inspiring speakers, worship sessions, and interactive workshops designed to empower the next generation of faith leaders.',
    featured: true,
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Monthly Fellowship',
    type: 'Fellowship',
    date: 'Every Last Saturday',
    venue: 'Various Locations',
    host: 'ATG Chapel Mks',
    contact: '0714888066',
    images: [
      '/assets/img/Events/Fellowship.jpg'
    ],
    description: 'Monthly fellowship gatherings bringing together believers for worship, teaching, and community building. A time to strengthen bonds and grow together in faith.',
    featured: false,
    status: 'recurring'
  },
  {
    id: 4,
    title: 'Easter Celebration',
    type: 'Special Service',
    date: '20 April, 2025',
    venue: 'ATG Chapel Main Sanctuary',
    host: 'ATG Chapel Mks',
    contact: '0714888066',
    images: [
      // '/assets/img/hero-carousel/hero-carousel-1.jpg'
    ],
    description: 'Celebrate the resurrection of Jesus Christ with us! Join our Easter service featuring special music, drama presentations, and a powerful message of hope.',
    featured: true,
    status: 'upcoming'
  }
];

function Events() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  useEffect(() => {
    if (selectedFilter === 'all') {
      setFilteredEvents(eventsData);
    } else {
      setFilteredEvents(eventsData.filter(event => event.type.toLowerCase() === selectedFilter));
    }
  }, [selectedFilter]);

  const filters = [
    { label: 'All Events', value: 'all' },
    { label: 'Crusades', value: 'crusade' },
    { label: 'Conferences', value: 'conference' },
    { label: 'Fellowship', value: 'fellowship' },
    { label: 'Special Services', value: 'special service' }
  ];

  return (
    <>
      <style>{`
        .events-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .events-hero {
          position: relative;
          height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
          overflow: hidden;
        }

        .events-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/assets/img/Atg-carousel-1.jpg') center/cover;
          opacity: 0.2;
          z-index: 0;
        }

        .events-hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          padding: 2rem;
        }

        .events-hero h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .events-hero p {
          font-size: 1.3rem;
          opacity: 0.95;
        }

        .events-container {
          max-width: 1400px;
          margin: -80px auto 0;
          padding: 0 2rem 4rem;
          position: relative;
          z-index: 2;
        }

        .events-filters {
          background: white;
          border-radius: 50px;
          padding: 1rem 2rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .filter-btn {
          padding: 0.7rem 1.5rem;
          border: none;
          border-radius: 30px;
          background: transparent;
          color: #666;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .filter-btn:hover {
          background: #f0f0f0;
          color: #333;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .event-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
        }

        .event-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
        }

        .event-card.featured::before {
          content: '⭐ Featured';
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .event-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .event-card:hover .event-image {
          transform: scale(1.05);
        }

        .event-content {
          padding: 1.5rem;
        }

        .event-type {
          display: inline-block;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .event-type.crusade {
          background: #e3f2fd;
          color: #1976d2;
        }

        .event-type.conference {
          background: #f3e5f5;
          color: #7b1fa2;
        }

        .event-type.fellowship {
          background: #e8f5e9;
          color: #388e3c;
        }

        .event-type.special-service {
          background: #fff3e0;
          color: #f57c00;
        }

        .event-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .event-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin: 1rem 0;
          color: #666;
          font-size: 0.95rem;
        }

        .event-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .event-meta-item i {
          color: #667eea;
          font-size: 1.1rem;
        }

        .event-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .event-footer {
          display: flex;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }

        .btn-primary {
          flex: 1;
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          text-align: center;
        }

        .btn-primary:hover {
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
          transform: translateY(-2px);
          color: white;
        }

        .btn-secondary {
          flex: 1;
          padding: 0.8rem 1.5rem;
          border: 2px solid #667eea;
          border-radius: 30px;
          background: transparent;
          color: #667eea;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          text-align: center;
        }

        .btn-secondary:hover {
          background: #667eea;
          color: white;
        }

        .no-events {
          text-align: center;
          padding: 4rem 2rem;
          color: #666;
        }

        .no-events i {
          font-size: 4rem;
          color: #ddd;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .events-hero h1 {
            font-size: 2.5rem;
          }

          .events-hero p {
            font-size: 1.1rem;
          }

          .events-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .events-filters {
            border-radius: 15px;
            padding: 1rem;
          }

          .filter-btn {
            padding: 0.6rem 1.2rem;
            font-size: 0.9rem;
          }

          .events-container {
            margin-top: -60px;
            padding: 0 1rem 2rem;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <main className="main events-page">
        {/* Hero Section */}
        <div className="events-hero">
          <motion.div 
            className="events-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Upcoming Events</h1>
            <p>Where Divinity Meets Humanity - Join Us in Worship, Fellowship, and Service</p>
          </motion.div>
        </div>

        {/* Events Container */}
        <div className="events-container">
          {/* Filters */}
          <motion.div 
            className="events-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                className={`filter-btn ${selectedFilter === filter.value ? 'active' : ''}`}
                onClick={() => setSelectedFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="events-grid">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className={`event-card ${event.featured ? 'featured' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <img 
                    src={event.images[0]} 
                    alt={event.title} 
                    className="event-image"
                    onError={(e) => {
                      e.target.src = '/assets/img/hero-carousel/hero-carousel-1.jpg';
                    }}
                  />
                  <div className="event-content">
                    <span className={`event-type ${event.type.toLowerCase().replace(' ', '-')}`}>
                      {event.type}
                    </span>
                    <h3 className="event-title">{event.title}</h3>
                    <div className="event-meta">
                      <div className="event-meta-item">
                        <i className="bi bi-calendar-event"></i>
                        <span>{event.date}</span>
                      </div>
                      <div className="event-meta-item">
                        <i className="bi bi-geo-alt"></i>
                        <span>{event.venue}</span>
                      </div>
                      <div className="event-meta-item">
                        <i className="bi bi-telephone"></i>
                        <span>{event.contact}</span>
                      </div>
                    </div>
                    <p className="event-description">
                      {event.description}
                    </p>
                    <div className="event-footer">
                      <Link to={`/events/${event.id}`} className="btn-primary">
                        View Details
                      </Link>
                      <a href={`tel:${event.contact}`} className="btn-secondary">
                        Contact
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="no-events">
              <i className="bi bi-calendar-x"></i>
              <h3>No events found</h3>
              <p>Try selecting a different filter</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Events;
