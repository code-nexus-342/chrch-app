import { useEffect } from 'react';
import Section from '../components/ui/Section';

function Mission() {
  const missions = [
    {
      id: 1,
      title: 'Apostle Francis Musili Visit',
      minister: 'Apostle Francis Musili',
      date: 'August 2024',
      description: 'The air crackled with divine energy as Apostle Francis Musili graced our August 2024 crusade. Lives were transformed under his powerful ministry, a testament to his anointing. As Bishop Lazarus\'s spiritual father and ordainer, his presence resonated deeply, igniting a spiritual awakening.',
      image: '/assets/img/Mission/Musili.jpg',
      impact: ['Lives Transformed', 'Miracles & Healing', 'Spiritual Awakening', 'Community Revival'],
      color: 'indigo'
    },
    {
      id: 2,
      title: 'Apostle James Nganga Ministry',
      minister: 'Apostle James Nganga',
      date: 'September 2024',
      description: 'A transformative experience as Apostle James Nganga brought powerful messages of hope and deliverance to our congregation. His anointed ministry touched countless hearts, bringing breakthrough and restoration to many.',
      image: '/assets/img/Mission/Nganga-0.jpg',
      impact: ['Breakthrough Testimonies', 'Deliverance Ministry', 'Faith Restored', 'Prophetic Word'],
      color: 'purple'
    },
    {
      id: 3,
      title: 'Mavivye Crusade',
      minister: 'ATG Team',
      date: 'July 2024',
      description: 'Our outreach to Mavivye village was a powerful demonstration of God\'s love in action. The community gathered in overwhelming numbers as the gospel was preached with power. Many gave their lives to Christ.',
      image: '/assets/img/Mission/Bshp Lazarus.jpg',
      impact: ['Gospel Preached', 'New Believers', 'Community Impact', 'Church Planted'],
      color: 'green'
    },
    {
      id: 4,
      title: 'Youth Revival Conference',
      minister: 'Bishop Lazarus Musyoka',
      date: 'October 2024',
      description: 'An electrifying three-day youth conference that ignited a fire in the hearts of young people. Through powerful teachings, worship, and ministry, hundreds of youth encountered God in a fresh way.',
      image: '/assets/img/Mission/Mentee-ministry-1.jpg',
      impact: ['Youth Empowered', 'Callings Confirmed', 'Worship Experience', 'Life Commitments'],
      color: 'orange'
    }
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img 
            src="/assets/img/Mission/Atg-carousel-1.jpg" 
            alt="Mission" 
            className="w-full h-full object-cover opacity-50"
            onError={(e) => {e.target.src = '/assets/img/hero-bg.jpg'}} // Fallback
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 font-bold tracking-widest text-sm mb-6 backdrop-blur-sm">
            Reach. Teach. Transform.
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Where Lives Are Changed, Hope Is Found, and God's Kingdom Expands
          </p>
        </div>
      </div>

      {/* Mission Statement Cards */}
      <Section className="py-20 -mt-20 relative z-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision */}
          <div className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-indigo-500">
             <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-3xl mb-6">
               👁️
             </div>
             <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
             <p className="text-gray-600 leading-relaxed text-lg">
                To see every person encounter God's transforming love, establish thriving churches, 
                and raise up a generation of passionate believers who will impact the world for Christ.
             </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-green-500">
             <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-3xl mb-6">
               🎯
             </div>
             <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
             <p className="text-gray-600 leading-relaxed text-lg">
                To spread the Gospel of Jesus Christ through crusades, outreach programs, and transformative ministry, 
                bringing hope, healing, and salvation to communities near and far.
             </p>
          </div>
        </div>
      </Section>

      {/* Highlights */}
      <Section background="light" className="py-24">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-bold tracking-wider uppercase">Kingdom Impact</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">Recent Mission Activities</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {missions.map((mission) => (
             <div key={mission.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
               <div className="relative h-64 overflow-hidden">
                 <img 
                    src={mission.image} 
                    alt={mission.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    onError={(e) => {e.target.src = '/assets/img/hero-bg.jpg'}}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                 <div className="absolute bottom-4 left-4 text-white">
                   <p className="text-sm font-medium opacity-90 mb-1">{mission.date} • {mission.minister}</p>
                   <h3 className="text-xl font-bold">{mission.title}</h3>
                 </div>
               </div>
               
               <div className="p-8">
                 <p className="text-gray-600 mb-6 leading-relaxed">{mission.description}</p>
                 <div className="flex flex-wrap gap-2">
                   {mission.impact.map((tag, idx) => (
                     <span key={idx} className={`px-3 py-1 rounded-full text-xs font-bold uppercase bg-gray-100 text-gray-600`}>
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
             </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <div className="bg-indigo-600 py-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Partner With Us</h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Your support enables us to reach more souls.
        </p>
        <div className="flex justify-center gap-4">
           <a href="/#contact" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
             Support Mission
           </a>
        </div>
      </div>
    </main>
  );
}

export default Mission;
