import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import ThisWeekSection from '../components/ThisWeekSection';
import AboutSection from '../components/AboutSection';
import OrderOfServices from '../components/OrderOfServices';
import MediaTeamSection from '../components/MediaTeamSection';
import EventsSection from '../components/EventsSection';
import ContactSection from '../components/ContactSection';
import PrayerRequestModal from '../components/PrayerRequestModal';

function Home() {
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);

  return (
    <main className="main bg-white">
      <HeroSection onOpenPrayerModal={() => setIsPrayerModalOpen(true)} />
      <ThisWeekSection />
      <AboutSection />
      <OrderOfServices />
      <MediaTeamSection />
      <EventsSection />
      <ContactSection />
      
      {/* Floating Action Button for Prayer Request */}
      <button 
        onClick={() => setIsPrayerModalOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group flex items-center gap-2"
        aria-label="Request Prayer"
      >
        <span className="text-xl">🙏</span>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
          Request Prayer
        </span>
      </button>

      <PrayerRequestModal 
        isOpen={isPrayerModalOpen} 
        onClose={() => setIsPrayerModalOpen(false)} 
      />
    </main>
  );
}

export default Home;
