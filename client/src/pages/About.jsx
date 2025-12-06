import React from 'react';
import Section from '../components/ui/Section';

function About() {
  return (
    <main className="bg-white">
      {/* Hero Header */}
      <div className="relative bg-gray-900 py-32 text-center overflow-hidden">
         {/* Abstract geometric background */}
        <div className="absolute inset-0 bg-gray-900">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500 via-gray-900 to-black"></div>
        </div>
        
        <div className="relative z-10 px-6">
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-2 block">Who We Are</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About ATG Chapel</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            A Christ-centered community dedicated to transforming lives through the power of the Gospel.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <Section className="py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                ATG Chapel Machakos began with a divine vision to reach the lost and empower believers in the region. 
                Founded on the principles of Acts 2:42, our church has grown from a small fellowship into a thriving 
                family of believers who are passionate about God and His Kingdom.
              </p>
              <p>
                Over the years, we have seen God's hand at work—transforming lives, restoring families, and using 
                our ministry to impact the community through outreach, discipleship, and charitable works.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-100 rounded-xl transform rotate-3"></div>
            <img 
              src="/assets/img/Atg-carousel-1.jpg" 
              alt="Church History" 
              className="relative rounded-lg shadow-xl w-full object-cover h-[400px]" 
            />
          </div>
        </div>
      </Section>

      {/* Leadership / Founders Teaser */}
      <Section background="light" className="py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Leadership</h2>
          <p className="text-lg text-gray-600 mb-10">
            We are led by a dedicated team of pastors and ministers who serve with humility and passion.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Founders Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600 text-3xl">
                ✝
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">The Founders</h3>
              <p className="text-gray-500 text-sm mb-4">Learn about the visionaries who started it all.</p>
              <a href="/founders" className="text-indigo-600 font-medium hover:text-indigo-700">Read More →</a>
            </div>

             {/* Team Card */}
             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 text-3xl">
                👥
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Team</h3>
              <p className="text-gray-500 text-sm mb-4">Meet the media, worship, and leadership teams.</p>
              <a href="/community" className="text-purple-600 font-medium hover:text-purple-700">View Team →</a>
            </div>

             {/* Mission Card */}
             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 text-3xl">
                🌍
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-500 text-sm mb-4">Discover our vision for the future.</p>
              <a href="/mission" className="text-blue-600 font-medium hover:text-blue-700">Explore Mission →</a>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}

export default About;
