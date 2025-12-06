import OrderOfServices from '../components/OrderOfServices';
import Section from '../components/ui/Section';

function Services() {
  return (
    <main className="main bg-gray-50">
      {/* Header */}
      <div className="relative bg-gray-900 py-24 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Our Services</h1>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto font-light">
            Join us in worship, prayer, and the study of God's Word. There is a place for everyone.
          </p>
        </div>
      </div>

      <OrderOfServices />

      <Section className="bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Need spiritual guidance?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Our pastoral team is available to speak with you, pray with you, and guide you in your walk with Christ.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/#contact" className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 font-medium">
            Contact a Pastor
          </a>
        </div>
      </Section>
    </main>
  );
}

export default Services;
