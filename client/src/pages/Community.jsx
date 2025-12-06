import React from 'react';
import Section from '../components/ui/Section';

function Community() {
  const communityGroups = [
    {
      id: 1,
      title: 'Bishop & Reverend',
      subtitle: 'Visionary Leadership',
      description: 'Bishop Lazarus Musyoka and Reverend Eunice are the visionary leaders of ATG Chapel Machakos. Their unwavering commitment to the church has fostered spiritual growth, unity, and community engagement.',
      image: '/assets/img/Bishop.jpg',
      icon: 'bi-award',
      color: 'purple'
    },
    {
      id: 2,
      title: 'Pastors & Deacons',
      subtitle: 'Spiritual Shepherds',
      description: 'At ATG Chapel Machakos, Pastors and Deacons work collaboratively to strengthen the spiritual and communal life of the church. Pastors provide spiritual leadership, while Deacons handle practical tasks and care.',
      image: '/assets/img/hero-carousel/Atg-carousel-4.jpg',
      icon: 'bi-people',
      color: 'indigo'
    },
    {
      id: 3,
      title: 'Elders & Committee',
      subtitle: 'Wise Governance',
      description: 'Elders provide spiritual leadership, oversee welfare programs, and support the pastoral team. The Church Committee manages logistical and administrative aspects, organizing events and services.',
      image: '/assets/img/Church 1.jpg',
      icon: 'bi-shield-check',
      color: 'green'
    },
    {
      id: 4,
      title: 'Praise & Worship',
      subtitle: 'Musical Ministry',
      description: 'The Praise and Worship Team leads the congregation in heartfelt worship, creating an environment where members can connect deeply with God through music and song.',
      image: '/assets/img/Youth 1.jpg',
      icon: 'bi-music-note-beamed',
      color: 'amber'
    }
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img 
            src="/assets/img/hero-carousel/Atg-carousel-1.jpg" 
            alt="Community" 
            className="w-full h-full object-cover opacity-50"
            onError={(e) => {e.target.src = '/assets/img/hero-bg.jpg'}}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">Our Community</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto font-light">
            United in Faith, Purpose, and Love. Where Divinity Meets Humanity.
          </p>
          <div className="mt-8 inline-block bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl max-w-lg mx-auto">
            <p className="text-lg italic">"For where two or three gather in my name, there am I with them."</p>
            <span className="block mt-2 text-sm uppercase tracking-widest opacity-80">- Matthew 18:20</span>
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <Section className="py-24">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Leadership Structure</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">Building Together</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our community is built on strong foundations of faith, leadership, and service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {communityGroups.map((group) => (
            <div key={group.id} className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row h-full">
              <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                <img 
                  src={group.image} 
                  alt={group.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {e.target.src = '/assets/img/hero-bg.jpg'}}
                />
                <div className={`absolute inset-0 bg-${group.color}-600/20 group-hover:bg-transparent transition-colors duration-300`}></div>
              </div>
              <div className="p-8 md:w-3/5 flex flex-col justify-center">
                <span className={`text-xs font-bold uppercase tracking-wider text-${group.color}-600 mb-2`}>
                  {group.subtitle}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{group.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  {group.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto px-6">
          Experience the warmth of fellowship and make a difference.
        </p>
        <div className="flex justify-center gap-4">
           <a href="/#contact" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
             Contact Us
           </a>
        </div>
      </div>
    </main>
  );
}

export default Community;
