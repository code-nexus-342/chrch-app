function HeroSection() {
  return (
    <section id="hero" className="divine-hero">
      {/* Audio toggle for ambient worship music */}
      <button className="audio-toggle" aria-label="Enable ambient worship music">
        <i className="bi bi-volume-up"></i>
      </button>
      
      <div className="divine-hero__content">
        <h1 className="divine-hero__title divine-glow">ATG Chapel Machakos</h1>
        <p className="scripture animated-scripture" data-reference="Psalm 46:10">
          Be still, and know that I am God; I will be exalted among the nations.
        </p>
        <p className="divine-hero__subtitle">Where Divinity Meets Humanity</p>
        <div className="divine-hero__cta">
          <a href="#this-week" className="btn-divine">Join Our Journey <i className="bi bi-arrow-down-short"></i></a>
          <a href="#livestream" className="btn-divine ms-3">Watch Live <i className="bi bi-broadcast"></i></a>
        </div>
      </div>
      
      {/* Background video overlay with fallback image */}
      <div className="divine-hero__background">
        <img src="/assets/img/hero-carousel/Atg-carousel-1.jpg" alt="Worship at ATG Chapel" className="divine-hero__bg-image" />
      </div>
    </section>
  );
}

export default HeroSection;
