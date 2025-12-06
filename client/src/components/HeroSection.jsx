import React from 'react';
import Button from './ui/Button';

function HeroSection({ onOpenPrayerModal }) {
  return (
    <section id="hero" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-dark-deep">
      {/* Background Image with Premium Overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <img 
          src="/assets/img/hero-carousel/Atg-carousel-1.jpg" 
          alt="Worship at ATG Chapel" 
          className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-glow"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-deep/90 via-dark-deep/50 to-dark-deep pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 mix-blend-overlay pointer-events-none" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center max-w-5xl">
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in text-sm font-medium text-success tracking-wide">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Welcome to ATG Chapel Machakos
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight animate-slide-up leading-tight text-white drop-shadow-2xl">
          Where <span className="text-gradient bg-gradient-to-r from-primary via-blue-400 to-secondary relative">Divinity
            {/* Subtle glow behind text */}
            <span className="absolute inset-0 blur-2xl opacity-50 bg-primary -z-10"></span>
          </span> Meets <span className="text-white">Humanity</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl md:text-2xl mb-12 font-light text-gray-200 animate-slide-up animation-delay-200">
          "Be still, and know that I am God; I will be exalted among the nations." 
          <span className="block mt-3 text-base font-medium text-primary-light">- Psalm 46:10</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 animate-slide-up animation-delay-400">
          <Button variant="gradient" size="lg" onClick={() => document.getElementById('this-week').scrollIntoView({ behavior: 'smooth' })}>
            Join Our Journey
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Button>
          <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white w-full sm:w-auto" href="https://www.youtube.com/@BishopLazarus" target="_blank">
            Watch Live
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </Button>
        </div>
        
        <button 
          onClick={onOpenPrayerModal}
          className="mt-12 text-sm font-medium text-gray-400 hover:text-white transition-all hover:scale-105 flex items-center gap-2 animate-fade-in animation-delay-600 group"
        >
          <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
            🙏
          </span>
          Need Prayer? Click here to share your request
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
