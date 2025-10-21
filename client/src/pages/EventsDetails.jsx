import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
      <main className="main">
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <i className="bi bi-hourglass-split" style={{ fontSize: '3rem', color: '#667eea' }}></i>
            <h3>Loading event details...</h3>
          </div>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="main">
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <i className="bi bi-exclamation-circle" style={{ fontSize: '3rem', color: '#f5576c' }}></i>
            <h3>Event not found</h3>
            <p>{error || 'The event you are looking for does not exist.'}</p>
            <Link to="/events" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
              Back to Events
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <style>{`
        .event-details-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 2rem 0;
        }

        .event-details-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.5rem;
          background: white;
          border: none;
          border-radius: 30px;
          color: #667eea;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          margin-bottom: 2rem;
        }

        .back-button:hover {
          transform: translateX(-5px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          color: #667eea;
        }

        .event-details-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }

        .event-details-header {
          position: relative;
          height: 500px;
          overflow: hidden;
        }

        .event-details-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-navigation {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 1rem;
        }

        .nav-arrow {
          background: rgba(255,255,255,0.9);
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.5rem;
          color: #667eea;
        }

        .nav-arrow:hover {
          background: white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transform: scale(1.1);
        }

        .image-indicators {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
        }

        .indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: white;
          width: 30px;
          border-radius: 5px;
        }

        .event-details-content {
          padding: 2.5rem;
        }

        .event-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.2rem;
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .event-badge.featured {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
        }

        .event-details-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 1.5rem;
        }

        .event-meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 15px;
        }

        .meta-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .meta-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .meta-content h4 {
          font-size: 0.85rem;
          color: #888;
          margin-bottom: 0.3rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .meta-content p {
          font-size: 1.1rem;
          color: #333;
          font-weight: 600;
          margin: 0;
        }

        .event-description-section {
          margin: 2rem 0;
        }

        .event-description-section h3 {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 1rem;
        }

        .event-description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #666;
        }

        .event-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          flex: 1;
          min-width: 200px;
          padding: 1rem 2rem;
          border: none;
          border-radius: 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1rem;
        }

        .btn-primary:hover {
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
          transform: translateY(-2px);
          color: white;
        }

        .btn-secondary {
          flex: 1;
          min-width: 200px;
          padding: 1rem 2rem;
          border: 2px solid #667eea;
          border-radius: 30px;
          background: transparent;
          color: #667eea;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1rem;
        }

        .btn-secondary:hover {
          background: #667eea;
          color: white;
        }

        @media (max-width: 768px) {
          .event-details-header {
            height: 300px;
          }

          .event-details-content {
            padding: 1.5rem;
          }

          .event-details-title {
            font-size: 1.8rem;
          }

          .event-meta-grid {
            grid-template-columns: 1fr;
            padding: 1.5rem;
          }

          .event-actions {
            flex-direction: column;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
          }
        }
      `}</style>

      <main className="main event-details-page">
        <div className="event-details-container">
          <Link to="/events" className="back-button">
            <i className="bi bi-arrow-left"></i>
            Back to Events
          </Link>

          <motion.div 
            className="event-details-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Event Image Gallery */}
            <div className="event-details-header">
              <img 
                src={getImageUrl(event.images?.[currentImageIndex])} 
                alt={event.title}
                className="event-details-image"
                onError={(e) => {
                  e.target.src = '/assets/img/hero-carousel/hero-carousel-1.jpg';
                }}
              />
              
              {event.images?.length > 1 && (
                <>
                  <div className="image-navigation">
                    <button className="nav-arrow" onClick={prevImage}>
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <button className="nav-arrow" onClick={nextImage}>
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                  
                  <div className="image-indicators">
                    {event.images.map((_, index) => (
                      <div 
                        key={index}
                        className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Event Content */}
            <div className="event-details-content">
              {event.featured && (
                <div className="event-badge featured">
                  <i className="bi bi-star-fill"></i>
                  Featured Event
                </div>
              )}

              <h1 className="event-details-title">{event.title}</h1>

              {/* Event Meta Information */}
              <div className="event-meta-grid">
                <div className="meta-item">
                  <div className="meta-icon">
                    <i className="bi bi-calendar-event"></i>
                  </div>
                  <div className="meta-content">
                    <h4>Date</h4>
                    <p>{event.date}</p>
                  </div>
                </div>

                <div className="meta-item">
                  <div className="meta-icon">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div className="meta-content">
                    <h4>Venue</h4>
                    <p>{event.venue}</p>
                  </div>
                </div>

                <div className="meta-item">
                  <div className="meta-icon">
                    <i className="bi bi-person"></i>
                  </div>
                  <div className="meta-content">
                    <h4>Host</h4>
                    <p>{event.host}</p>
                  </div>
                </div>

                <div className="meta-item">
                  <div className="meta-icon">
                    <i className="bi bi-tag"></i>
                  </div>
                  <div className="meta-content">
                    <h4>Event Type</h4>
                    <p>{event.type}</p>
                  </div>
                </div>
              </div>

              {/* Event Description */}
              <div className="event-description-section">
                <h3>About This Event</h3>
                <p className="event-description">{event.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="event-actions">
                <a href={`tel:${event.contact}`} className="btn-primary">
                  <i className="bi bi-telephone"></i>
                  Call {event.contact}
                </a>
                <a href={`sms:${event.contact}`} className="btn-secondary">
                  <i className="bi bi-chat-dots"></i>
                  Send SMS
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}

export default EventsDetails;
