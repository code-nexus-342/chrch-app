import { useEffect, useState } from 'react';
import AOS from 'aos';

function Programs() {
  const [activeProgram, setActiveProgram] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const programs = [
    {
      id: 1,
      title: 'Sunday School',
      tagline: 'Nurturing Young Minds',
      description: 'Sunday School at ATG Chapel Machakos is a vibrant program that nurtures children\'s spiritual growth and creativity. Under the leadership of dedicated teachers, the Melody Dancing Club integrates Bible lessons with creative expression through dance.',
      features: ['Bible Lessons', 'Creative Dance', 'Character Building', 'Fellowship'],
      image: '/assets/img/Events/Youth 1.jpg',
      icon: 'bi-book',
      color: '#3b82f6',
      schedule: 'Every Sunday, 9:00 AM - 10:30 AM'
    },
    {
      id: 2,
      title: 'Mentee Ministry',
      tagline: 'Empowering the Next Generation',
      description: 'The Mentee Ministry empowers youth to become ambassadors of the gospel. Under the guidance of Bishop Lazarus Musyoka, it equips them with leadership skills, biblical knowledge, and a deep sense of purpose through mentorship and discipleship.',
      features: ['Leadership Training', 'Biblical Studies', 'Mentorship', 'Service Projects'],
      image: '/assets/img/Events/Youth 2.jpg',
      icon: 'bi-people',
      color: '#a855f7',
      schedule: 'Fridays, 6:00 PM - 8:00 PM'
    },
    {
      id: 3,
      title: 'Support Programs',
      tagline: 'Compassion in Action',
      description: 'ATG Chapel is committed to supporting the less fortunate through various initiatives. This includes supporting children\'s education, visiting the Destiny Children\'s Home, and offering spiritual and material assistance to those in need.',
      features: ['Education Support', 'Children\'s Home Visits', 'Material Aid', 'Spiritual Care'],
      image: '/assets/img/Events/Fellowship.jpg',
      icon: 'bi-heart',
      color: '#22c55e',
      schedule: 'Ongoing - Contact for details'
    },
    {
      id: 4,
      title: 'Church Building',
      tagline: 'Building Our Future Together',
      description: 'The construction of our new church building represents a collective vision of growth and unity. Funded through weekly contributions during Sunday services, this project aims to create a larger and more accommodating space for worship.',
      features: ['Weekly Contributions', 'Volunteer Opportunities', 'Prayer Support', 'Community Engagement'],
      image: '/assets/img/hero-carousel/Atg-carousel-1.jpg',
      icon: 'bi-building',
      color: '#f97316',
      schedule: 'Support anytime through donations'
    }
  ];

  return (
    <main className="main">
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.95), rgba(59, 130, 246, 0.95)), url(/assets/img/Events/app-3.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}>
        <div className="container position-relative z-3" data-aos="fade-up">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <div className="mb-4">
                <span className="badge bg-white text-primary px-4 py-2 rounded-pill shadow" style={{fontSize: '1rem', letterSpacing: '1px'}}>
                  <i className="bi bi-star-fill me-2"></i> TRANSFORMING LIVES
                </span>
              </div>
              <h1 className="display-2 fw-bold text-white mb-4" style={{textShadow: '3px 3px 10px rgba(0,0,0,0.3)'}}>
                Our Programs
              </h1>
              <p className="lead text-white mb-5" style={{fontSize: '1.5rem', textShadow: '2px 2px 6px rgba(0,0,0,0.3)'}}>
                Equipping, Empowering, and Transforming Lives Through Faith and Action
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a href="#programs-grid" className="btn btn-light btn-lg px-5 py-3 rounded-pill shadow-lg">
                  <i className="bi bi-arrow-down-circle me-2"></i> Explore Programs
                </a>
                <a href="#get-involved" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill">
                  <i className="bi bi-hand-thumbs-up me-2"></i> Get Involved
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section id="programs-grid" className="py-5" style={{background: 'var(--background-color)'}}>
        <div className="container">
          {/* Section Header */}
          <div className="row justify-content-center text-center mb-5" data-aos="fade-up">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-4">Active Programs</h2>
              <p className="lead text-muted">
                Discover our diverse range of programs designed to nurture faith, build community, and create lasting impact.
              </p>
            </div>
          </div>

          {/* Programs Cards */}
          <div className="row g-4 mb-5">
            {programs.map((program, index) => (
              <div key={program.id} className="col-lg-6" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="card h-100 border-0 rounded-4 overflow-hidden shadow-lg" style={{
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 25px 70px rgba(0,0,0,0.2)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
                }}>
                  {/* Card Image with Overlay */}
                  <div className="position-relative" style={{height: '300px'}}>
                    <img src={program.image} alt={program.title} className="w-100 h-100 object-fit-cover" />
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(to bottom, ${program.color}00, ${program.color}dd)`
                    }}></div>
                    <div className="position-absolute top-0 end-0 m-3">
                      <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-lg" style={{
                        width: '70px',
                        height: '70px'
                      }}>
                        <i className={`${program.icon} fs-2`} style={{color: program.color}}></i>
                      </div>
                    </div>
                    <div className="position-absolute bottom-0 start-0 p-4">
                      <span className="badge bg-white text-dark px-3 py-2 shadow-sm mb-2">{program.tagline}</span>
                      <h3 className="text-white fw-bold mb-0" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.5)'}}>{program.title}</h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body p-4">
                    <div className="mb-4">
                      <p className="text-muted mb-3" style={{lineHeight: '1.8'}}>{program.description}</p>
                      <div className="d-flex align-items-center text-muted">
                        <i className="bi bi-clock me-2"></i>
                        <small>{program.schedule}</small>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">What We Offer:</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {program.features.map((feature, idx) => (
                          <span key={idx} className="badge px-3 py-2" style={{
                            background: `${program.color}15`,
                            color: program.color,
                            border: `1px solid ${program.color}30`
                          }}>
                            <i className="bi bi-check-circle me-1"></i> {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2">
                      <a href="#get-involved" className="btn flex-fill rounded-pill" style={{
                        background: program.color,
                        color: 'white',
                        border: 'none'
                      }}>
                        <i className="bi bi-box-arrow-in-right me-2"></i> Join Now
                      </a>
                      <a href="#" className="btn btn-outline-secondary flex-fill rounded-pill">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-5" style={{
        background: 'linear-gradient(135deg, #f8fafc, #e0e7ff)'
      }}>
        <div className="container">
          <div className="row text-center g-4" data-aos="fade-up">
            <div className="col-6 col-md-3">
              <div className="p-4">
                <div className="display-4 fw-bold mb-2" style={{
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>150+</div>
                <p className="text-muted mb-0">Children Reached</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-4">
                <div className="display-4 fw-bold mb-2" style={{
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>50+</div>
                <p className="text-muted mb-0">Youth Mentored</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-4">
                <div className="display-4 fw-bold mb-2" style={{
                  background: 'linear-gradient(135deg, #22c55e, #10b981)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>30+</div>
                <p className="text-muted mb-0">Families Supported</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-4">
                <div className="display-4 fw-bold mb-2" style={{
                  background: 'linear-gradient(135deg, #f97316, #eab308)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>4</div>
                <p className="text-muted mb-0">Active Programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section id="get-involved" className="py-5" style={{
        background: 'linear-gradient(135deg, #1e293b, #334155)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-5">
          <div style={{
            backgroundImage: 'linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white), linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white)',
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px',
            width: '100%',
            height: '100%'
          }}></div>
        </div>
        <div className="container position-relative" data-aos="zoom-in">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <i className="bi bi-hand-thumbs-up display-3 text-white mb-4"></i>
              <h2 className="display-5 fw-bold text-white mb-4">Ready to Make a Difference?</h2>
              <p className="lead text-white mb-5 opacity-90">
                Whether through volunteering, donations, or participation, your involvement makes a lasting impact. 
                Join us in transforming lives and building God's kingdom.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a href="/#contact" className="btn btn-light btn-lg px-5 py-3 rounded-pill shadow-lg">
                  <i className="bi bi-person-plus me-2"></i> Volunteer Today
                </a>
                <a href="#" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill">
                  <i className="bi bi-heart-fill me-2"></i> Support a Program
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Programs;
