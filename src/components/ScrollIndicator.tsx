'use client';

import { useState, useEffect } from 'react';

export default function ScrollIndicator() {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show arrow 10 seconds after page load
    const timer = setTimeout(() => {
      setShow(true);
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const landingSection = document.querySelector('.landing-section');
      const aboutSection = document.getElementById('about');
      
      if (landingSection && aboutSection) {
        const landingBottom = landingSection.getBoundingClientRect().bottom;
        const aboutTop = aboutSection.getBoundingClientRect().top;
        // Hide arrow when navbar should appear (when about section is visible)
        const shouldHide = landingBottom <= 0 && aboutTop <= window.innerHeight;
        setIsVisible(!shouldHide);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`scroll-indicator ${!isVisible ? 'hidden' : ''}`}
      aria-label="Scroll indicator"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

