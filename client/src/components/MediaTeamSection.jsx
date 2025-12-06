import React from 'react';
import Section from './ui/Section';

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
  ];

  return (
    <Section id="team" background="light">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Media Team</h2>
        <p className="mt-2 text-indigo-600 font-medium">Where divinity meets Humanity!</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-indigo-50 shadow-inner">
               <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
            <h4 className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wide">{member.role}</h4>
            
            <div className="flex text-yellow-400 gap-1 mb-4 text-xs">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed italic relative px-2">
              <span className="text-3xl text-gray-200 absolute -top-4 -left-2">"</span>
              {member.description}
              <span className="text-3xl text-gray-200 absolute -bottom-8 -right-2">"</span>
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default MediaTeamSection;
