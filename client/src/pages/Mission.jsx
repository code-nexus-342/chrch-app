import { useEffect } from 'react';
import AOS from 'aos';

function Mission() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const missions = [
    {
      id: 1,
      title: 'Apostle Francis Musili Visit',
      minister: 'Apostle Francis Musili',
      date: 'August 2024',
      description: 'The air crackled with divine energy as Apostle Francis Musili graced our August 2024 crusade. Lives were transformed under his powerful ministry, a testament to his anointing. As Bishop Lazarus\'s spiritual father and ordainer, his presence resonated deeply, igniting a spiritual awakening. Miracles unfolded, hearts were healed, and souls were drawn closer to Christ.',
      image: '/assets/img/Events/Crusade.jpg',
      impact: ['Lives Transformed', 'Miracles & Healing', 'Spiritual Awakening', 'Community Revival'],
      color: '#6366f1'
    },
    {
      id: 2,
      title: 'Apostle James Nganga Ministry',
      minister: 'Apostle James Nganga',
      date: 'September 2024',
      description: 'A transformative experience as Apostle James Nganga brought powerful messages of hope and deliverance to our congregation. His anointed ministry touched countless hearts, bringing breakthrough and restoration to many. The presence of God was tangible as miracles manifested and lives were forever changed.',
      image: '/assets/img/Events/branding-2.jpg',
      impact: ['Breakthrough Testimonies', 'Deliverance Ministry', 'Faith Restored', 'Prophetic Word'],
      color: '#a855f7'
    },
    {
      id: 3,
      title: 'Mavivye Crusade',
      minister: 'ATG Team',
      date: 'July 2024',
      description: 'Our outreach to Mavivye village was a powerful demonstration of God\'s love in action. The community gathered in overwhelming numbers as the gospel was preached with power. Many gave their lives to Christ, and the seeds of faith were planted in fertile ground. This crusade marked a significant expansion of our ministry reach.',
      image: '/assets/img/Events/books-2.jpg',
      impact: ['Gospel Preached', 'New Believers', 'Community Impact', 'Church Planted'],
      color: '#22c55e'
    },
    {
      id: 4,
      title: 'Youth Revival Conference',
      minister: 'Bishop Lazarus Musyoka',
      date: 'October 2024',
      description: 'An electrifying three-day youth conference that ignited a fire in the hearts of young people. Through powerful teachings, worship, and ministry, hundreds of youth encountered God in a fresh way. Many received their calling into ministry and committed to living radically for Christ.',
      image: '/assets/img/Events/Youth 2.jpg',
      impact: ['Youth Empowered', 'Callings Confirmed', 'Worship Experience', 'Life Commitments'],
      color: '#f97316'
    }
  ];

  const upcomingEvents = [
    {
      title: 'City-Wide Crusade',
      date: 'December 15-17, 2024',
      location: 'Machakos Stadium',
      icon: 'bi-megaphone'
    },
    {
      title: 'Leadership Summit',
      date: 'January 20, 2025',
      location: 'ATG Chapel',
      icon: 'bi-award'
    },
    {
      title: 'Outreach to Kyumbi',
      date: 'February 10, 2025',
      location: 'Kyumbi Village',
      icon: 'bi-globe'
    }
  ];

  return (
    <main className="main">
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.95), rgba(16, 185, 129, 0.95)), url(/assets/img/Mission/Atg-carousel-1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1), transparent 50%)'
        }}></div>
        <div className="container position-relative z-3" data-aos="fade-up">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <div className="mb-4">
                <span className="badge bg-white px-4 py-2 rounded-pill shadow-lg" style={{
                  color: '#22c55e',
                  fontSize: '1rem',
                  letterSpacing: '2px',
                  fontWeight: '600'
                }}>
                  <i className="bi bi-globe me-2"></i> REACHING THE WORLD
                </span>
              </div>
              <h1 className="display-1 fw-bold text-white mb-4" style={{
                textShadow: '4px 4px 12px rgba(0,0,0,0.4)',
                letterSpacing: '-1px'
              }}>
                Our Mission
              </h1>
              <p className="lead text-white mb-5" style={{
                fontSize: '1.6rem',
                textShadow: '2px 2px 6px rgba(0,0,0,0.3)',
                maxWidth: '800px',
                margin: '0 auto 2rem'
              }}>
                Where Lives Are Changed, Hope Is Found, and God's Kingdom Expands
              </p>
              <div className="scripture-box p-5 rounded-4 mx-auto" style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(15px)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                maxWidth: '750px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }}>
                <i className="bi bi-quote display-3 text-white opacity-50"></i>
                <p className="text-white fs-4 fst-italic my-3">
                  "Go into all the world and preach the gospel to all creation."
                </p>
                <span className="text-white opacity-75 fw-semibold">— Mark 16:15</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to top, var(--background-color), transparent)'
        }}></div>
      </section>

      {/* Mission Statement */}
      <section className="py-5" style={{background: 'var(--background-color)'}}>
        <div className="container">
          <div className="row justify-content-center" data-aos="fade-up">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <h2 className="display-4 fw-bold mb-4">Our Mission & Vision</h2>
                <p className="lead text-muted mb-5">
                  Transforming communities through the power of the Gospel, one life at a time
                </p>
              </div>
              <div className="row g-4">
                <div className="col-md-6" data-aos="fade-right">
                  <div className="card border-0 rounded-4 p-5 h-100" style={{
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    boxShadow: '0 20px 60px rgba(99, 102, 241, 0.3)'
                  }}>
                    <i className="bi bi-bullseye display-3 text-white mb-4"></i>
                    <h3 className="text-white fw-bold mb-3">Our Mission</h3>
                    <p className="text-white opacity-90 fs-5" style={{lineHeight: '1.8'}}>
                      To spread the Gospel of Jesus Christ through crusades, outreach programs, and transformative ministry, 
                      bringing hope, healing, and salvation to communities near and far.
                    </p>
                  </div>
                </div>
                <div className="col-md-6" data-aos="fade-left">
                  <div className="card border-0 rounded-4 p-5 h-100" style={{
                    background: 'linear-gradient(135deg, #22c55e, #10b981)',
                    boxShadow: '0 20px 60px rgba(34, 197, 94, 0.3)'
                  }}>
                    <i className="bi bi-eye display-3 text-white mb-4"></i>
                    <h3 className="text-white fw-bold mb-3">Our Vision</h3>
                    <p className="text-white opacity-90 fs-5" style={{lineHeight: '1.8'}}>
                      To see every person encounter God's transforming love, establish thriving churches, 
                      and raise up a generation of passionate believers who will impact the world for Christ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Highlights */}
      <section className="py-5" style={{
        background: 'linear-gradient(to bottom, #f8fafc, white)'
      }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="badge bg-gradient px-4 py-2 mb-3" style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              fontSize: '0.9rem',
              letterSpacing: '1px'
            }}>
              MISSION HIGHLIGHTS
            </span>
            <h2 className="display-5 fw-bold mb-3">Recent Mission Activities</h2>
            <p className="lead text-muted">God is moving powerfully through our ministry outreach</p>
          </div>

          <div className="row g-4">
            {missions.map((mission, index) => (
              <div key={mission.id} className="col-lg-6" data-aos="fade-up" data-aos-delay={index * 100}>
                <article className="card border-0 rounded-4 overflow-hidden shadow-lg h-100" style={{
                  transition: 'all 0.4s ease',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 25px 70px rgba(0,0,0,0.2)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
                }}>
                  {/* Image Section */}
                  <div className="position-relative" style={{height: '280px'}}>
                    <img src={mission.image} alt={mission.title} className="w-100 h-100 object-fit-cover" />
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(to bottom, transparent, ${mission.color}ee)`
                    }}></div>
                    <div className="position-absolute bottom-0 start-0 p-4 w-100">
                      <div className="d-flex align-items-center text-white mb-2">
                        <i className="bi bi-calendar3 me-2"></i>
                        <span>{mission.date}</span>
                        <span className="mx-2">•</span>
                        <i className="bi bi-person me-2"></i>
                        <span>{mission.minister}</span>
                      </div>
                      <h3 className="text-white fw-bold mb-0" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.5)'}}>
                        {mission.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="card-body p-4">
                    <p className="text-muted mb-4" style={{lineHeight: '1.8'}}>
                      {mission.description}
                    </p>

                    {/* Impact Tags */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3 text-uppercase" style={{fontSize: '0.85rem', letterSpacing: '1px'}}>
                        Impact Highlights
                      </h6>
                      <div className="d-flex flex-wrap gap-2">
                        {mission.impact.map((item, idx) => (
                          <span key={idx} className="badge px-3 py-2" style={{
                            background: `${mission.color}15`,
                            color: mission.color,
                            border: `1px solid ${mission.color}40`,
                            fontSize: '0.85rem'
                          }}>
                            <i className="bi bi-check2-circle me-1"></i> {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a href="#" className="btn btn-link p-0 text-decoration-none fw-bold" style={{color: mission.color}}>
                      Read Full Story <i className="bi bi-arrow-right ms-2"></i>
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-5" style={{
        background: 'linear-gradient(135deg, #1e293b, #334155)'
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center text-white mb-5" data-aos="fade-up">
                <h2 className="display-5 fw-bold mb-3">Upcoming Missions</h2>
                <p className="lead opacity-90">Join us in reaching more communities with the Gospel</p>
              </div>

              <div className="row g-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="col-md-4" data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="card border-0 rounded-4 h-100 p-4" style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease'
                    }} onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }} onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                      <div className="text-center">
                        <div className="bg-white bg-opacity-20 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{
                          width: '70px',
                          height: '70px'
                        }}>
                          <i className={`${event.icon} fs-2 text-white`}></i>
                        </div>
                        <h4 className="text-white fw-bold mb-3">{event.title}</h4>
                        <div className="text-white opacity-90 mb-2">
                          <i className="bi bi-calendar3 me-2"></i>
                          {event.date}
                        </div>
                        <div className="text-white opacity-90">
                          <i className="bi bi-geo-alt me-2"></i>
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Mission CTA */}
      <section className="py-5" style={{
        background: 'linear-gradient(135deg, #22c55e, #10b981)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
          <div style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            width: '100%',
            height: '100%'
          }}></div>
        </div>
        <div className="container position-relative" data-aos="zoom-in">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <i className="bi bi-heart-fill display-3 text-white mb-4"></i>
              <h2 className="display-5 fw-bold text-white mb-4">Partner With Us in Mission</h2>
              <p className="lead text-white mb-5 opacity-90" style={{fontSize: '1.3rem'}}>
                Your prayers, support, and partnership enable us to reach more communities with the life-changing message of Jesus Christ. 
                Together, we can make an eternal impact.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a href="/#contact" className="btn btn-light btn-lg px-5 py-3 rounded-pill shadow-lg">
                  <i className="bi bi-currency-dollar me-2"></i> Support Mission
                </a>
                <a href="#" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill">
                  <i className="bi bi-envelope me-2"></i> Get Updates
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Mission;
