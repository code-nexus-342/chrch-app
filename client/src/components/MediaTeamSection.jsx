function MediaTeamSection() {
  const teamMembers = [
    {
      name: 'Dan',
      role: 'Media & Team lead',
      image: '/assets/img/testimonials/testimonials-1.jpg',
      description: 'Creative web designer with a keen eye for detail, crafting visually appealing, user-friendly, and responsive websites across various platforms.'
    },
    {
      name: 'Faith',
      role: 'Digital Media',
      image: '/assets/img/testimonials/testimonials-2.jpg',
      description: 'Creative web designer with a keen eye for detail, crafting visually appealing, user-friendly, and responsive websites across various platforms.'
    },
    {
      name: 'Lawrence Musyoka',
      role: 'Full-Stack Developer',
      image: '/assets/img/testimonials/testimonials-3.jpg',
      description: 'A keen full-stack developer with an eye for new plans and ideas, always eager to explore the latest technologies and deliver robust solutions.'
    },
    {
      name: 'Enock Mumo',
      role: 'AI-Integrated Web Developer',
      image: '/assets/img/testimonials/testimonials-3.jpg',
      description: 'A skilled web developer who seamlessly integrated AI into websites, enhancing user interaction, personalization, smart automation features, real-time data processing, intelligent search, and adaptive design for improved user experience.'
    },
    {
      name: 'Peter Makau',
      role: 'Product Designer',
      image: '/assets/img/testimonials/testimonials-4.jpg',
      description: 'A thoughtful product designer who blends creativity with usability, ensuring every design is both beautiful and functional.'
    },
    {
      name: 'Victor Tumaini',
      role: 'Web Designer',
      image: '/assets/img/testimonials/testimonials-5.jpg',
      description: 'A creative web designer with a keen eye for detail, crafting visually appealing, user-friendly, and responsive websites across various platforms.'
    }
  ];

  return (
    <section id="team" className="testimonials section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Media Team</h2>
        <p>Where divinity meets Humanity!</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="swiper init-swiper">
          <script type="application/json" className="swiper-config">
            {JSON.stringify({
              loop: true,
              speed: 600,
              autoplay: {
                delay: 5000
              },
              slidesPerView: 'auto',
              pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
              }
            })}
          </script>
          <div className="swiper-wrapper">
            {teamMembers.map((member, index) => (
              <div key={index} className="swiper-slide">
                <div className="testimonial-item">
                  <img src={member.image} className="testimonial-img" alt={member.name} />
                  <h3>{member.name}</h3>
                  <h4>{member.role}</h4>
                  <div className="stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    <span>{member.description}</span>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
}

export default MediaTeamSection;
