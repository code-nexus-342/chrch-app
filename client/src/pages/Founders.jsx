import React from 'react';
import Section from '../components/ui/Section';

function Founders() {
  const founders = [
    {
      name: "Apostle Francis Musili",
      role: "Visionary & General Overseer",
      image: "/assets/img/founders/founder-1.png",
      bio: "The visionary founder and General Overseer of Around The Globe Deliverance Ministry. Apostle Francis Musili is a dynamic preacher, teacher, and prophet who has been instrumental in the spiritual revival of the region and beyond.",
      color: "indigo"
    },
    {
      name: "Bishop Lazarus Musyoka",
      role: "Presiding Bishop - ATG Chapel Machakos",
      image: "/assets/img/founders/founder-2.jpg",
      bio: "Bishop Lazarus Musyoka is a dynamic preacher and a loving shepherd. With a heart for the community and a desire to see believers grow in their faith, he leads ATG Chapel with wisdom and grace.",
      color: "purple"
    }
  ];

  return (
    <main className="bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 py-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Our Founders</h1>
        <p className="text-gray-400">The visionaries behind the ministry</p>
      </div>

      <Section className="py-16">
        <div className="max-w-5xl mx-auto space-y-24">
          {founders.map((founder, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              {/* Image */}
              <div className="w-full md:w-1/2 relative group">
                <div className={`absolute inset-0 bg-${founder.color}-500 rounded-2xl transform rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500`}></div>
                <div className="relative h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
                   {/* Placeholder graphic if image missing */}
                   <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                      {founder.image ? (
                        <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'; e.target.parentElement.classList.add('flex')}} />
                      ) : (
                        <span className="text-6xl">👤</span>
                      )}
                      {!founder.image && <span className="text-6xl">👤</span>}
                   </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <span className={`inline-block py-1 px-3 rounded-full bg-${founder.color}-100 text-${founder.color}-700 text-sm font-bold uppercase tracking-wider mb-4`}>
                  {founder.role}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{founder.name}</h2>
                <div className="w-20 h-1 bg-yellow-400 mb-6 mx-auto md:mx-0"></div>
                <p className="text-lg text-gray-600 leading-relaxed italic border-l-4 border-gray-200 pl-4 py-2">
                  "{founder.bio}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}

export default Founders;
