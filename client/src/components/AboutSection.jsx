import React from 'react';
import Section from './ui/Section';
import Button from './ui/Button';
import Card from './ui/Card';

function AboutSection() {
  return (
    <Section id="about" background="dark" className="relative overflow-hidden py-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-t from-secondary/5 to-transparent pointer-events-none" />

      <div className="text-center mb-20 relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-4 animate-fade-in">
          Our Story
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">About ATG Chapel Machakos</h2>
        <div className="mt-8 max-w-3xl mx-auto">
           <Card variant="glass" className="p-8 transform hover:scale-105 transition-transform duration-500">
            <p className="text-xl text-gray-200 italic font-serif leading-relaxed">
                "They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer."
            </p>
            <span className="block mt-4 text-sm text-primary-light font-bold tracking-wide uppercase">- Acts 2:42</span>
           </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Image Column */}
        <div className="order-2 lg:order-2 relative group perspective-1000">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:rotate-y-2">
             <img 
               src="/assets/img/Atg-carousel-1.jpg" 
               className="w-full h-[500px] object-cover" 
               alt="ATG Chapel Community" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/80 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Content Column */}
        <div className="order-1 lg:order-1 space-y-10">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6 border-l-4 border-primary pl-6 leading-tight">
                Where <span className="text-gradient bg-gradient-to-r from-primary to-secondary">Divinity</span> Meets Humanity
            </h3>
            <p className="text-light-muted leading-relaxed text-lg">
              Welcome to ATG Chapel Machakos, a Christ-centered church dedicated to transforming lives through the power of the Gospel. Under the visionary leadership of Bishop Lazarus Musyoka and Reverend Eunice, we are a thriving family of believers committed to worship, discipleship, and community impact.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Deep Faith', desc: 'Fostering deep relationship with God through fervent prayer.', icon: '🙏', color: 'bg-blue-500' },
              { title: 'Spiritual Growth', desc: 'Nurturing believers through biblical teaching.', icon: '🌱', color: 'bg-green-500' },
              { title: 'Loving Community', desc: 'A welcoming family where everyone belongs.', icon: '❤️', color: 'bg-red-500' },
              { title: 'Community Impact', desc: 'Impacting society through outreach and charity.', icon: '🌍', color: 'bg-purple-500' },
            ].map((item, index) => (
              <Card key={index} variant="dark" className="p-5 flex gap-4 items-start hover:bg-dark-lighter/80 border-transparent hover:border-primary/30 group">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-dark-deep border border-white/10 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-sm text-gray-400 leading-snug">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="pt-6">
            <Button variant="gradient" size="lg" className="shadow-lg hover:shadow-glow-md">
              Our Full Story 
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default AboutSection;
