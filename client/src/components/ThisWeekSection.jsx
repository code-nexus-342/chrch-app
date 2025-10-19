import { Link } from 'react-router-dom';

function ThisWeekSection() {
  return (
    <section id="this-week" className="divine-section divine-section--light">
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-5">
          <span className="divine-gradient-text">JOIN US THIS WEEK</span>
          <h2 className="mt-2">Experience God's Presence</h2>
          <div className="scripture-of-the-day mt-3" data-reference="Romans 15:13">
            May the God of hope fill you with all joy and peace as you trust in him.
          </div>
        </div>

        <div className="row g-5">
          {/* Next Service Card */}
          <div className="col-lg-6" data-aos="fade-up">
            <div className="divine-card divine-light h-100">
              <div className="d-flex align-items-center mb-4">
                <div className="divine-shadow p-3 rounded-circle me-3">
                  <i className="bi bi-calendar-heart fs-3 divine-gradient-text"></i>
                </div>
                <h3 className="mb-0">Next Service</h3>
              </div>
              
              <div className="upcoming-service">
                <div className="d-flex justify-content-between mb-3">
                  <div className="date-time">
                    <h4 className="fs-5 mb-0">Sunday, October 20th</h4>
                    <p className="text-muted mb-0">9:30 AM - 12:00 PM</p>
                  </div>
                  <div className="countdown px-3 py-1 rounded">
                    <span id="service-countdown">3 Days</span>
                  </div>
                </div>
                
                <h5>The Power of Faith</h5>
                <p>Join Bishop Lazarus Musyoka for an inspiring message about overcoming life's obstacles through unwavering faith. Experience powerful worship and a welcoming community.</p>
                
                <div className="mt-4 d-flex flex-wrap gap-3">
                  <a href="#" className="btn-divine"><i className="bi bi-geo-alt me-1"></i> Directions</a>
                  <a href="#livestream" className="btn-divine"><i className="bi bi-broadcast me-1"></i> Watch Online</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Weekly Events Cards */}
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <div className="divine-card h-100">
              <div className="d-flex align-items-center mb-4">
                <div className="divine-shadow p-3 rounded-circle me-3">
                  <i className="bi bi-calendar-week fs-3 divine-gradient-text"></i>
                </div>
                <h3 className="mb-0">This Week's Events</h3>
              </div>
              
              <div className="events-list">
                {/* Tuesday Event */}
                <div className="event-item d-flex align-items-start mb-4">
                  <div className="event-date text-center me-3">
                    <span className="day fw-bold fs-4 d-block">22</span>
                    <span className="month text-uppercase">Oct</span>
                  </div>
                  <div className="event-details">
                    <h5 className="mb-1">Prayer & Intercession</h5>
                    <p className="text-muted mb-1"><i className="bi bi-clock me-1"></i> 6:00 PM - 8:00 PM</p>
                    <p className="mb-0">Join us for a powerful evening of prayer, worship, and spiritual renewal.</p>
                  </div>
                </div>
                
                {/* Wednesday Event */}
                <div className="event-item d-flex align-items-start mb-4">
                  <div className="event-date text-center me-3">
                    <span className="day fw-bold fs-4 d-block">23</span>
                    <span className="month text-uppercase">Oct</span>
                  </div>
                  <div className="event-details">
                    <h5 className="mb-1">Bible Study</h5>
                    <p className="text-muted mb-1"><i className="bi bi-clock me-1"></i> 5:30 PM - 7:00 PM</p>
                    <p className="mb-0">Deepen your understanding of Scripture through engaging teaching and discussion.</p>
                  </div>
                </div>
                
                {/* Friday Event */}
                <div className="event-item d-flex align-items-start">
                  <div className="event-date text-center me-3">
                    <span className="day fw-bold fs-4 d-block">25</span>
                    <span className="month text-uppercase">Oct</span>
                  </div>
                  <div className="event-details">
                    <h5 className="mb-1">Youth Fellowship</h5>
                    <p className="text-muted mb-1"><i className="bi bi-clock me-1"></i> 6:00 PM - 8:30 PM</p>
                    <p className="mb-0">A dynamic gathering for youth to connect, worship, and grow in faith together.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Link to="/events" className="btn-divine">View All Events <i className="bi bi-arrow-right ms-1"></i></Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="row g-4 mt-5" data-aos="fade-up" data-aos-delay="200">
          <div className="col-md-4">
            <Link to="/founders" className="card-glow p-4 rounded-3 h-100 d-block text-decoration-none">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-people-fill fs-1 divine-gradient-text"></i>
                </div>
                <div>
                  <h4 className="mb-1">Our Founders</h4>
                  <p className="mb-0">Meet Bishop Lazarus Musyoka and the leadership team behind ATG Chapel's vision.</p>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="col-md-4">
            <Link to="/services" className="card-glow p-4 rounded-3 h-100 d-block text-decoration-none">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-journal-bookmark-fill fs-1 divine-gradient-text"></i>
                </div>
                <div>
                  <h4 className="mb-1">Order of Services</h4>
                  <p className="mb-0">Experience our reverent and Spirit-filled worship services.</p>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="col-md-4">
            <a href="#" className="card-glow p-4 rounded-3 h-100 d-block text-decoration-none prayer-request-btn">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-heart-fill fs-1 divine-gradient-text"></i>
                </div>
                <div>
                  <h4 className="mb-1">Prayer Request</h4>
                  <p className="mb-0">Share your prayer needs with our caring prayer team.</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThisWeekSection;
