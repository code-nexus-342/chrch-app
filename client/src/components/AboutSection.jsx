function AboutSection() {
  return (
    <section id="about" className="divine-section divine-section--dark">
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="divine-gradient-text">OUR STORY</span>
          <h2 className="mt-2">About ATG Chapel Machakos</h2>
          <p className="scripture animated-scripture mx-auto mt-4" style={{ maxWidth: '600px' }} data-reference="Acts 2:42">
            They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer.
          </p>
        </div>

        <div className="row gy-5 align-items-center">
          <div className="col-lg-6 order-lg-2" data-aos="fade-left">
            <div className="position-relative">
              <img src="/assets/img/Atg-carousel-1.jpg" className="img-fluid rounded-3 shadow-lg" alt="ATG Chapel Community" data-parallax="0.2" />
            </div>
          </div>

          <div className="col-lg-6 order-lg-1" data-aos="fade-right">
            <div className="divine-border">
              <h3 className="mb-4">Where Divinity Meets Humanity</h3>
              <p className="lead">
                Welcome to ATG Chapel Machakos, a Christ-centered church dedicated to transforming lives through the power of the Gospel. Under the visionary leadership of Bishop Lazarus Musyoka and Reverend Eunice, we are a thriving family of believers committed to worship, discipleship, and community impact.
              </p>
            </div>
            
            <div className="mt-5">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="d-flex">
                    <div className="me-3 fs-5">
                      <i className="bi bi-heart-fill divine-gradient-text"></i>
                    </div>
                    <div>
                      <h4 className="h5">Deep Faith</h4>
                      <p>We foster a deep relationship with God through fervent prayer and dynamic worship experiences.</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="d-flex">
                    <div className="me-3 fs-5">
                      <i className="bi bi-book-fill divine-gradient-text"></i>
                    </div>
                    <div>
                      <h4 className="h5">Spiritual Growth</h4>
                      <p>We nurture believers through transformative biblical teachings and discipleship programs.</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="d-flex">
                    <div className="me-3 fs-5">
                      <i className="bi bi-people-fill divine-gradient-text"></i>
                    </div>
                    <div>
                      <h4 className="h5">Loving Community</h4>
                      <p>We create a welcoming family where everyone belongs and finds purpose.</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="d-flex">
                    <div className="me-3 fs-5">
                      <i className="bi bi-globe divine-gradient-text"></i>
                    </div>
                    <div>
                      <h4 className="h5">Community Impact</h4>
                      <p>We impact society through outreach, charitable works, and community development.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-5">
              <a href="#" className="btn-divine">Our Full Story <i className="bi bi-arrow-right ms-2"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
