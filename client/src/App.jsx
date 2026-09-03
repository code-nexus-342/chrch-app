import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/layout/Navbar';
import Footer from './components/Footer';
import FloatingHub from './components/FloatingHub';
import Home from './pages/Home';
import About from './pages/About';
import Community from './pages/Community';
import Programs from './pages/Programs';
import Mission from './pages/Mission';
import Bible from './pages/Bible';
import Events from './pages/Events';
import EventsDetails from './pages/EventsDetails';
import Founders from './pages/Founders';
import Services from './pages/Services';
import Contact from './pages/Contact';
import DonationCallback from './pages/DonationCallback';
import './App.css';
import './styles/custom-pages.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/bible" element={<Bible />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventsDetails />} />
          <Route path="/founders" element={<Founders />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donation/callback" element={<DonationCallback />} />
        </Routes>
        <Footer />
        {/* FloatingHub kept as secondary nav or removed if redundant. Keeping for now as requested by user's initial codebase style but Navbar is primary. */}
        {/* <FloatingHub /> */}
      </div>
    </Router>
  );
}

export default App;
