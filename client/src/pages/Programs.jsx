import { useState } from 'react';
import Section from '../components/ui/Section';

function Programs() {
  const [activeProgram, setActiveProgram] = useState(0);

  const programs = [
    {
      id: 1,
      title: 'Sunday School',
      tagline: 'Nurturing Young Minds',
      description: 'Sunday School at ATG Chapel Machakos is a vibrant program that nurtures children\'s spiritual growth and creativity. Under the leadership of dedicated teachers, the Melody Dancing Club integrates Bible lessons with creative expression through dance.',
      features: ['Bible Lessons', 'Creative Dance', 'Character Building', 'Fellowship'],
      image: '/assets/img/Events/Youth%201.jpg',
      icon: 'bi-book',
      color: 'blue',
      schedule: 'Every Sunday, 9:00 AM - 10:30 AM'
    },
    {
      id: 2,
      title: 'Mentee Ministry',
      tagline: 'Empowering the Next Generation',
      description: 'The Mentee Ministry empowers youth to become ambassadors of the gospel. Under the guidance of Bishop Lazarus Musyoka, it equips them with leadership skills, biblical knowledge, and a deep sense of purpose through mentorship and discipleship.',
      features: ['Leadership Training', 'Biblical Studies', 'Mentorship', 'Service Projects'],
      image: '/assets/img/Mission/Mentee-ministry-1.jpg',
      icon: 'bi-people',
      color: 'purple',
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
      color: 'green',
      schedule: 'Ongoing - Contact for details'
    },
    {
      id: 4,
      title: 'Church Building',
      tagline: 'Building Our Future Together',
      description: 'The construction of our new church building represents a collective vision of growth and unity. Funded through weekly contributions during Sunday services, this project aims to create a larger and more accommodating space for worship.',
      features: ['Weekly Contributions', 'Volunteer Opportunities', 'Prayer Support', 'Community Engagement'],
      image: '/assets/img/Church.jpg',
      icon: 'bi-building',
      color: 'orange',
      schedule: 'Support anytime through donations'
    }
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img 
            src="/assets/img/hero-carousel/Atg-carousel-3.jpg" 
            alt="Programs" 
            className="w-full h-full object-cover opacity-50"
            onError={(e) => {e.target.src = '/assets/img/cta-bg.jpg'}}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/80 to-purple-800/80 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md mb-6 border border-white/30 text-sm font-bold tracking-widest">
            TRANSFORMING LIVES
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-xl">Our Programs</h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto font-light leading-relaxed">
            Equipping, Empowering, and Transforming Lives Through Faith and Action
          </p>
        </div>
      </div>

      {/* Programs Grid */}
      <Section className="py-24" background="light">
         <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Active Programs</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
             Discover our diverse range of programs designed to nurture faith, build community, and create lasting impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {programs.map((program) => (
             <div key={program.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
               {/* Image Header */}
               <div className="relative h-64 overflow-hidden">
                 <img 
                   src={program.image}
                   alt={program.title}
                   className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                   onError={(e) => {e.target.src = '/assets/img/cta-bg.jpg'}}
                 />
                 <div className={`absolute inset-0 bg-${program.color}-900/40 group-hover:bg-transparent transition-all duration-300`}></div>
                 <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg text-2xl">
                   {program.id === 1 && '📚'}
                   {program.id === 2 && '👥'}
                   {program.id === 3 && '❤️'}
                   {program.id === 4 && '🏗️'}
                 </div>
                 <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-gray-800">
                      {program.tagline}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2 drop-shadow-md">{program.title}</h3>
                 </div>
               </div>

               {/* Content */}
               <div className="p-8">
                 <p className="text-gray-600 mb-6 leading-relaxed">
                   {program.description}
                 </p>
                 
                 <div className="border-t border-gray-100 pt-6">
                   <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Key Features</h4>
                   <div className="flex flex-wrap gap-2 mb-6">
                      {program.features.map((feature, idx) => (
                        <span key={idx} className={`px-3 py-1 rounded-full text-xs font-bold bg-${program.color}-50 text-${program.color}-700`}>
                          ✓ {feature}
                        </span>
                      ))}
                   </div>
                   
                   <div className="flex items-center text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded-lg">
                      <span className="mr-2">🕒</span> {program.schedule}
                   </div>

                   <button className={`w-full py-3 rounded-xl font-bold text-white bg-${program.color}-600 hover:bg-${program.color}-700 transition shadow-lg`}>
                     Learn More
                   </button>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <div className="bg-indigo-900 py-16 text-white overflow-hidden relative">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
         <div className="container mx-auto px-6 relative z-10">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
             <div>
               <div className="text-4xl md:text-5xl font-bold text-indigo-400 mb-2">150+</div>
               <div className="text-indigo-200">Children Reached</div>
             </div>
             <div>
               <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">50+</div>
               <div className="text-indigo-200">Youth Mentored</div>
             </div>
             <div>
               <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">30+</div>
               <div className="text-indigo-200">Families Supported</div>
             </div>
             <div>
               <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">4</div>
               <div className="text-indigo-200">Active Programs</div>
             </div>
           </div>
         </div>
      </div>
    </main>
  );
}

export default Programs;
