import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import './App.css';
import './styles/custom-pages.css';
import './styles/mobile-nav-fix.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header/Navbar removed - using FloatingHub only */}
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
        </Routes>
        <Footer />
        <FloatingHub />
      </div>
    </Router>
  );
}

export default App;
