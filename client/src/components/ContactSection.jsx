function ContactSection() {
  return (
    <section id="contact" className="contact section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>
        <p>Where divinity meets Humanity!</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4" data-aos="fade-up" data-aos-delay="200">
          <div className="col-lg-4">
            <div className="info-item d-flex flex-column justify-content-center align-items-center">
              <i className="bi bi-geo-alt"></i>
              <h3>Address</h3>
              <p>Mwatu Wa Ngoma Rd, MKS KFA Building</p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="info-item d-flex flex-column justify-content-center align-items-center info-item-borders">
              <i className="bi bi-telephone"></i>
              <h3>Call Us</h3>
              <p>+254 714 888 016</p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="info-item d-flex flex-column justify-content-center align-items-center">
              <i className="bi bi-envelope"></i>
              <h3>Email Us</h3>
              <p>atgmksinfo@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
