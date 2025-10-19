import { Link } from 'react-router-dom';

function EventsSection() {
  const events = [
    { category: 'filter-app', title: 'Youth Event 1', image: '/assets/img/Events/Youth 1.jpg' },
    { category: 'filter-product', title: 'Fellowships 1', image: '/assets/img/Events/Fellowship.jpg' },
    { category: 'filter-branding', title: 'Conference 1', image: '/assets/img/Events/Confrence.jpg' },
    { category: 'filter-books', title: 'Crusade 1', image: '/assets/img/Events/Crusade.jpg' },
    { category: 'filter-app', title: 'Youth Event 2', image: '/assets/img/Events/Youth 2.jpg' },
    // { category: 'filter-product', title: 'Fellowships 2', image: '/assets/img/Events/product-2.jpg' },
  ];

  return (
    <section id="Events" className="portfolio section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Events</h2>
        <p>Where divinity Meets Humanity!</p>
      </div>

      <div className="container">
        <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
          <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
            <li data-filter="*" className="filter-active">All</li>
            <li data-filter=".filter-app">Youth Events</li>
            <li data-filter=".filter-product">Fellowships</li>
            <li data-filter=".filter-branding">Conferences</li>
            <li data-filter=".filter-books">Crusades</li>
          </ul>

          <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
            {events.map((event, index) => (
              <div key={index} className={`col-lg-4 col-md-6 portfolio-item isotope-item ${event.category}`}>
                <img src={event.image} className="img-fluid" alt={event.title} />
                <div className="portfolio-info">
                  <h4>{event.title}</h4>
                  <p>Event Described below</p>
                  <a href={event.image} title={event.title} data-gallery="portfolio-gallery" className="glightbox preview-link">
                    <i className="bi bi-zoom-in"></i>
                  </a>
                  <Link to="/events" title="More Details" className="details-link">
                    <i className="bi bi-link-45deg"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventsSection;
