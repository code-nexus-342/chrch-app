import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import HeroSection from '../components/HeroSection';
import ThisWeekSection from '../components/ThisWeekSection';
import AboutSection from '../components/AboutSection';
import MediaTeamSection from '../components/MediaTeamSection';
import EventsSection from '../components/EventsSection';
import ContactSection from '../components/ContactSection';
import PrayerRequestModal from '../components/PrayerRequestModal';
import { initVendorLibraries } from '../utils/helpers';

function Home() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // Load and initialize vendor scripts
    initVendorLibraries();

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <main className="main index-page">
      <HeroSection />
      <ThisWeekSection />
      <AboutSection />
      <MediaTeamSection />
      <EventsSection />
      <ContactSection />
      <PrayerRequestModal />
    </main>
  );
}

export default Home;
