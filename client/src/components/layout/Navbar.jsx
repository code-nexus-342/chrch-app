import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import DonateModal from '../DonateModal';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [donateOpen, setDonateOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { 
            name: 'Home', 
            path: '/',
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        },
        { 
            name: 'About', 
            path: '/about',
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        },
        { 
            name: 'Events', 
            path: '/events',
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        },
        { 
            name: 'Community', 
            path: '/community',
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        },
        { 
            name: 'Contact', 
            path: '/contact',
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <React.Fragment>
            {/* DESKTOP NAVBAR (Top) */}
            <nav className={`hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-7xl ${
                scrolled ? 'top-4' : 'top-6'
            }`}>
                <div className="glass-panel rounded-full px-6 py-3 flex justify-between items-center shadow-2xl bg-white/80 dark:bg-dark-deep/80 backdrop-blur-xl border border-white/40">
                    <Link to="/" className="text-xl font-bold tracking-tight group flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-serif italic shadow-lg">A</span>
                        <span className="text-gradient bg-gradient-to-r from-primary to-primary-dark group-hover:from-secondary group-hover:to-primary transition-all duration-500 hidden sm:block">
                            ATG Chapel
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="flex items-center gap-1 bg-gray-100/50 rounded-full p-1 border border-white/50">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    isActive(link.path) 
                                        ? 'bg-white text-primary shadow-sm' 
                                        : 'text-dark hover:text-primary hover:bg-white/50'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            onClick={() => setDonateOpen(true)}
                            variant="gradient" 
                            size="sm" 
                            className="rounded-full px-6 shadow-glow-sm hover:shadow-glow-md"
                        >
                            Donate
                        </Button>
                    </div>
                </div>
            </nav>

            {/* MOBILE NAVBAR (Bottom Floating) */}
            <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
                <div className="glass-panel rounded-full px-6 py-4 flex justify-between items-center shadow-2xl bg-white/90 dark:bg-dark-deep/90 backdrop-blur-xl border border-white/40 animate-slide-up">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`flex flex-col items-center justify-center transition-all duration-300 relative group ${
                                isActive(link.path) 
                                    ? 'text-primary transform -translate-y-2' 
                                    : 'text-gray-400 hover:text-primary hover:-translate-y-1'
                            }`}
                        >
                            <span className={`p-2 rounded-full transition-all duration-300 ${
                                isActive(link.path) ? 'bg-primary/10 shadow-glow-sm' : ''
                            }`}>
                                {link.icon}
                            </span>
                             {/* Optional: Small dot for active state */}
                            {isActive(link.path) && (
                                <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary" />
                            )}
                        </Link>
                    ))}
                    {/* Mobile Donate Icon */}
                    <button
                        type="button"
                        onClick={() => setDonateOpen(true)}
                        aria-label="Donate"
                        className="flex flex-col items-center justify-center text-secondary hover:text-secondary-dark transition-all duration-300 hover:-translate-y-1"
                    >
                        <span className="p-2 bg-secondary/10 rounded-full shadow-glow-sm">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </span>
                    </button>
                </div>
            </nav>
            <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
        </React.Fragment>
    );
};

export default Navbar;
