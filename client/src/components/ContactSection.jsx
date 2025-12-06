import React from 'react';
import Section from './ui/Section';

function ContactSection() {
  return (
    <Section id="contact" background="light">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Contact</h2>
        <p className="mt-2 text-indigo-600 font-medium">Where divinity meets Humanity!</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        {/* Address */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
          <p className="text-gray-600">Mwatu Wa Ngoma Rd,<br/>MKS KFA Building</p>
        </div>

        {/* Phone */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 ring-2 ring-indigo-50 hover:-translate-y-1 transition-transform duration-300">
           <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg shadow-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
          <p className="text-gray-600 font-medium">+254 714 888 016</p>
        </div>

        {/* Email */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
           <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
          <p className="text-gray-600">atgmksinfo@gmail.com</p>
        </div>
      </div>

      <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">Send us a message</h3>
            <p className="opacity-90 mb-8">We'd love to hear from you. Fill out the form and we'll be in touch as soon as possible.</p>
            <ul className="space-y-4 text-sm">
               <li className="flex items-center gap-2"><span className="text-indigo-300">✓</span> Prayer Requests</li>
               <li className="flex items-center gap-2"><span className="text-indigo-300">✓</span> General Inquiries</li>
               <li className="flex items-center gap-2"><span className="text-indigo-300">✓</span> Membership Info</li>
            </ul>
          </div>
          <div className="p-8">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="How can we help?"></textarea>
              </div>
              <button type="button" className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default ContactSection;
