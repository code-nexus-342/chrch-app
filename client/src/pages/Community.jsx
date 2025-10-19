import { useEffect } from 'react';
import AOS from 'aos';

function Community() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const communityGroups = [
    {
      id: 1,
      title: 'Bishop & Reverend',
      subtitle: 'Visionary Leadership',
      description: 'Bishop Lazarus Musyoka and Reverend Eunice are the visionary leaders of ATG Chapel Machakos. Their unwavering commitment to the church has fostered spiritual growth, unity, and community engagement. With decades of experience in ministry, they provide profound spiritual guidance, nurture leadership among the youth, and spearhead impactful initiatives.',
      image: '/assets/img/Bishop.jpg',
      icon: 'bi-award',
      color: 'purple'
    },
    {
      id: 2,
      title: 'Pastors & Deacons',
      subtitle: 'Spiritual Shepherds',
      description: 'At ATG Chapel Machakos, Pastors and Deacons work collaboratively to strengthen the spiritual and communal life of the church. Pastors provide spiritual leadership, counseling, and support, while Deacons handle practical tasks such as serving communion, providing pastoral care, and organizing church events.',
      image: '/assets/img/Church.jpg',
      icon: 'bi-people',
      color: 'blue'
    },
    {
      id: 3,
      title: 'Elders & Committee',
      subtitle: 'Wise Governance',
      description: 'Elders at ATG Chapel Machakos provide spiritual leadership, oversee welfare programs, participate in decision-making, and support the pastoral team. The Church Committee manages logistical and administrative aspects, organizing events, worship services, and community outreach programs.',
      image: '/assets/img/testimonials/testimonials-4.jpg',
      icon: 'bi-shield-check',
      color: 'green'
    },
    {
      id: 4,
      title: 'Praise & Worship',
      subtitle: 'Musical Ministry',
      description: 'The Praise and Worship Team is the heartbeat of our spiritual atmosphere. This dedicated group of singers and instrumentalists leads the congregation in heartfelt worship, creating an environment where members can connect deeply with God. Their passion for worship and commitment to excellence inspire meaningful praise.',
      image: '/assets/img/testimonials/testimonials-2.jpg',
      icon: 'bi-music-note-beamed',
      color: 'orange'
    }
  ];

  return (
    <main className="main">
      {/* Hero Section */}
      <section className="community-hero" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9)), url(/assets/img/hero-carousel/Atg-carousel-1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container position-relative z-3" data-aos="fade-up">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <h1 className="display-3 fw-bold text-white mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.3)'}}>
                Our Community
              </h1>
              <p className="lead text-white mb-5" style={{fontSize: '1.4rem', textShadow: '1px 1px 4px rgba(0,0,0,0.3)'}}>
                Where Divinity Meets Humanity - United in Faith, Purpose, and Love
              </p>
              <div className="scripture-quote p-4 rounded-4" style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                <i className="bi bi-quote fs-1 text-white opacity-75"></i>
                <p className="text-white fst-italic mb-2" style={{fontSize: '1.1rem'}}>
                  "For where two or three gather in my name, there am I with them."
                </p>
                <span className="text-white opacity-75">— Matthew 18:20</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to top, var(--background-color), transparent)'
        }}></div>
      </section>

      {/* Leadership Intro Section */}
      <section className="py-5" style={{background: 'var(--background-color)'}}>
        <div className="container">
          <div className="row justify-content-center text-center mb-5" data-aos="fade-up">
            <div className="col-lg-8">
              <span className="badge bg-gradient px-3 py-2 mb-3" style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                fontSize: '0.9rem',
                letterSpacing: '1px'
              }}>
                LEADERSHIP STRUCTURE
              </span>
              <h2 className="display-5 fw-bold mb-4">Building Together</h2>
              <p className="lead text-muted">
                Our community is built on strong foundations of faith, leadership, and service. 
                Each group plays a vital role in nurturing our congregation and spreading God's love.
              </p>
            </div>
          </div>

          {/* Community Groups */}
          <div className="row g-4">
            {communityGroups.map((group, index) => (
              <div key={group.id} className="col-lg-6" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden" style={{
                  transition: 'all 0.4s ease',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
                }}>
                  <div className="row g-0">
                    <div className="col-md-5">
                      <div className="position-relative h-100">
                        <img src={group.image} alt={group.title} className="w-100 h-100 object-fit-cover" />
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(135deg, ${
                            group.color === 'purple' ? 'rgba(99, 102, 241, 0.7)' :
                            group.color === 'blue' ? 'rgba(59, 130, 246, 0.7)' :
                            group.color === 'green' ? 'rgba(34, 197, 94, 0.7)' :
                            'rgba(249, 115, 22, 0.7)'
                          }, transparent)`
                        }}></div>
                        <div className="position-absolute top-0 start-0 m-3">
                          <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{
                            width: '60px',
                            height: '60px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                          }}>
                            <i className={`${group.icon} fs-3`} style={{
                              background: `linear-gradient(135deg, ${
                                group.color === 'purple' ? '#6366f1, #a855f7' :
                                group.color === 'blue' ? '#3b82f6, #06b6d4' :
                                group.color === 'green' ? '#22c55e, #10b981' :
                                '#f97316, #eab308'
                              })`,
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent'
                            }}></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="card-body p-4">
                        <span className="badge mb-2" style={{
                          background: `linear-gradient(135deg, ${
                            group.color === 'purple' ? '#6366f1, #a855f7' :
                            group.color === 'blue' ? '#3b82f6, #06b6d4' :
                            group.color === 'green' ? '#22c55e, #10b981' :
                            '#f97316, #eab308'
                          })`,
                          fontSize: '0.75rem',
                          letterSpacing: '0.5px'
                        }}>
                          {group.subtitle}
                        </span>
                        <h3 className="card-title fw-bold mb-3">{group.title}</h3>
                        <p className="card-text text-muted mb-4" style={{fontSize: '0.95rem', lineHeight: '1.7'}}>
                          {group.description}
                        </p>
                        <a href="#" className="btn btn-link p-0 text-decoration-none fw-semibold" style={{
                          color: group.color === 'purple' ? '#6366f1' :
                                 group.color === 'blue' ? '#3b82f6' :
                                 group.color === 'green' ? '#22c55e' : '#f97316'
                        }}>
                          Learn More <i className="bi bi-arrow-right ms-2"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="py-5" style={{
        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
          <div style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            width: '100%',
            height: '100%'
          }}></div>
        </div>
        <div className="container position-relative" data-aos="zoom-in">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold text-white mb-4">Join Our Community</h2>
              <p className="lead text-white mb-5 opacity-90">
                Experience the warmth of fellowship, grow in faith, and make a difference in our community. 
                Everyone is welcome at ATG Chapel Machakos.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a href="/#contact" className="btn btn-light btn-lg px-5 rounded-pill shadow-lg">
                  <i className="bi bi-telephone me-2"></i> Contact Us
                </a>
                <a href="/#this-week" className="btn btn-outline-light btn-lg px-5 rounded-pill">
                  <i className="bi bi-calendar-event me-2"></i> Visit This Week
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Community;
