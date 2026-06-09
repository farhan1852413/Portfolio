'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Cursor from '@/components/Cursor';
import ScanLines from '@/components/ScanLines';
import Snowflakes from '@/components/Snowflakes';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Navbar from '@/components/Navbar';
import ScrollIndicator from '@/components/ScrollIndicator';
import Notification from '@/components/Notification';
import { useTheme } from '@/hooks/useTheme';
import SocialLinks from '@/components/SocialLinks';

import AboutSection from '@/components/AboutSection';
import ResumeSection from '@/components/ResumeSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

// Lazy load InfoPanel - only loads when needed
const InfoPanel = dynamic(() => import('@/components/InfoPanel'), {
  ssr: false,
});



export default function Home() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [showLandingButtons, setShowLandingButtons] = useState(true);
  const [topSocialOpacity, setTopSocialOpacity] = useState(1);
  const { theme } = useTheme();

  useEffect(() => {
    // 1. Handle encoded hashes (like /%23projects) from the URL
    const pathname = window.location.pathname;
    if (pathname.includes('%23')) {
      const hashFromPath = pathname.split('%23')[1];
      if (hashFromPath) {
        // Replace encoded hash with a proper hash and update URL without reload
        window.history.replaceState(null, '', `/#${hashFromPath}`);

        // Dispatch hash change event manually to trigger LazySection check
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }
    }

    // 2. Initial scroll to hash if present
    const hash = window.location.hash;
    if (hash) {
      // Delay slightly to allow forced section loading to complete
      setTimeout(() => {
        const sectionId = hash.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }

    const handleScroll = () => {
      const landingSection = document.querySelector('.landing-section');
      const aboutSection = document.getElementById('about');

      if (landingSection && aboutSection) {
        const landingBottom = landingSection.getBoundingClientRect().bottom;
        const aboutTop = aboutSection.getBoundingClientRect().top;
        const shouldHide = landingBottom <= 0 && aboutTop <= window.innerHeight;
        setShowLandingButtons(!shouldHide);
      }

      setTopSocialOpacity(Math.max(0, 1 - window.scrollY / 180));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Cursor />
      <ScanLines />
      <Navbar />

      {/* Theme Switcher - only on landing (staggered on the element itself).
          I set a lower delay so the theme button appears before the info button.
          Tip: change the inline `--delay` value (milliseconds) on this element
          to move it earlier/later in the sequence. */}
      <div className={`theme-btn-wrapper staggered-btn ${!showLandingButtons ? 'hidden' : ''}`}
        style={{ '--delay': '450ms' } as React.CSSProperties}>
        <ThemeSwitcher />
      </div>

      {/* Info Button - only on landing (staggered).
          Tip: change `--delay` (ms) below to alter when this button appears. */}
      <div
        className={`info-btn staggered-btn ${!showLandingButtons ? 'hidden' : ''}`}
        style={{ '--delay': '650ms' } as React.CSSProperties}
        onClick={() => setIsInfoOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsInfoOpen(true);
          }
        }}
      >
        i
      </div>

      {/* Landing Section */}
      <section className="landing-section">
        <Snowflakes />
        <Notification />
        <div className="container">
          <div className="stagger-parent">
            <div className="stagger-item" style={{ '--delay': '0ms' } as React.CSSProperties}>
              <div className="stagger-inner">
                <div className="profile-container">
                  <Image
                    key={`profile-${theme}`}
                    src={theme === 'christmas' ? '/images/profile-picture-chrismas.jpg' : '/images/profile-picture.webp'}
                    alt="Farhan Mohammad"
                    width={800}
                    height={800}
                    className="profile-pic"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>
            <div className="stagger-item" style={{ '--delay': '200ms' } as React.CSSProperties}>
              <div className="stagger-inner">
                <h1 className="logo">FARHAN MOHAMMAD</h1>
              </div>
            </div>
            <div className="stagger-item" style={{ '--delay': '400ms' } as React.CSSProperties}>
              <div className="stagger-inner">
                <p className="subtitle">SOFTWARE ENGINEER</p>
              </div>
            </div>
            <div className="stagger-item" style={{ '--delay': '600ms' } as React.CSSProperties}>
              <div className="stagger-inner">
                <SocialLinks compact className="top-social-links" style={{ opacity: topSocialOpacity, transition: 'opacity 0.18s ease-out' }} />
              </div>
            </div>
            {/*
              Stagger delays are controlled via the inline CSS variable `--delay`.
              You can edit the millisecond values below to change the sequence/timing.
              Order here controls visual stacking: profile -> title -> subtitle.
            */}
          </div>

        </div>
        <ScrollIndicator />
      </section>

      {/* Portfolio Sections */}
      <AboutSection />
      <ResumeSection />
      <ProjectsSection />
      <ContactSection />

      {isInfoOpen && (
        <InfoPanel
          isOpen={isInfoOpen}
          onClose={() => setIsInfoOpen(false)}
        />
      )}
    </>
  );
}