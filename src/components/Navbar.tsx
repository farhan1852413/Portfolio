'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const landingSection = document.querySelector('.landing-section');
            const aboutSection = document.getElementById('about');

            if (landingSection && aboutSection) {
                const landingBottom = landingSection.getBoundingClientRect().bottom;
                const aboutTop = aboutSection.getBoundingClientRect().top;
                // Show navbar when landing section is scrolled past (when about section is visible)
                setIsVisible(landingBottom <= 0 && aboutTop <= window.innerHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (isVisible) {
            document.body.classList.add('navbar-active');
        } else {
            document.body.classList.remove('navbar-active');
        }
        return () => {
            document.body.classList.remove('navbar-active');
        };
    }, [isVisible]);

    return (
        <>
            <div className={`navbar-blur-overlay ${isVisible ? 'navbar-blur-visible' : ''}`}></div>
            <nav className={`navbar ${isVisible ? 'navbar-visible' : ''}`}>
                <div className="navbar-content">
                    <div className="navbar-links">
                        <button onClick={() => scrollToSection('about')} className="nav-link">
                            ABOUT
                        </button>
                        <button onClick={() => scrollToSection('resume')} className="nav-link">
                            RESUME
                        </button>
                        <button onClick={() => scrollToSection('projects')} className="nav-link">
                            PROJECTS
                        </button>
                        <button onClick={() => scrollToSection('contact')} className="nav-link">
                            CONTACT
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}

