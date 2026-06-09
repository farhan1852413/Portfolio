'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SocialLinks from '@/components/SocialLinks';
import { triggerCVDownload } from '@/utils/cv-tracker';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ContactSection() {
    const contactTextRef = useRef<HTMLParagraphElement>(null);
    const helloLanguages = ['Hello', 'Sawubona', 'Molo', 'Dumela', 'Thobela', 'Xeweni', 'Ndaa', 'Lotjani', 'Hallo', 'Awe', 'Hola', 'Bonjour', 'Ciao', 'Jambo', 'Sannu', '你好', 'こんにちは', 'नमस्ते', 'Здравствуйте', 'السلام عليكم', '👋'];
    const helloLanguageNames = ['in English', 'in Zulu', 'in Xhosa', 'in Sesotho', 'in Sepedi', 'in Xitsonga', 'in Tshivenda', 'in Siswati', 'in German', 'in Slang', 'in Spanish', 'in French', 'in Italian', 'in Swahili', 'in Hausa', 'in Chinese', 'in Japanese', 'in Hindi', 'in Russian', 'in Arabic', 'Emoji'];
    const [currentHelloIndex, setCurrentHelloIndex] = useState(0);

    // Both text and links animate together based on the text's scroll position
    const [contactTextAnimation] = useScrollAnimation([contactTextRef], {
        animationStartOffset: 0.98,
        animationEndOffset: 0.8,
        blurAmount: 10,
        blurEndOffset: 0.9,
    });
    const contactLinksAnimation = contactTextAnimation;

    // Rotate "hello" languages every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHelloIndex((prevIndex) => (prevIndex + 1) % helloLanguages.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [helloLanguages.length]);

    return (
        <>
            <section id="contact" className="portfolio-section">
                <div className="section-content">
                    <h2 className="section-title">CONTACT</h2>
                    <div className="contact-content">
                        <div className="contact-info">
                            <p
                                ref={contactTextRef}
                                className="contact-text"
                                style={{
                                    opacity: contactTextAnimation.opacity,
                                    transform: `translateY(${contactTextAnimation.translateY}px)`,
                                    filter: `blur(${contactTextAnimation.blur}px)`,
                                    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out'
                                }}
                            >
                                Feel free to reach out if you&apos;d like to work together or just want to say{' '}
                                <span
                                    title={`Hello ${helloLanguageNames[currentHelloIndex]}`}
                                    style={{
                                        cursor: 'help',
                                        textDecoration: 'underline',
                                        textDecorationStyle: 'dotted',
                                        textUnderlineOffset: '3px'
                                    }}
                                >
                                    {helloLanguages[currentHelloIndex].toLowerCase()}
                                </span>
                                !
                            </p>
                            <SocialLinks
                                compact={false}
                                className="contact-links"
                                style={{
                                    opacity: contactLinksAnimation.opacity,
                                    transform: `translateY(${contactLinksAnimation.translateY}px)`,
                                    filter: `blur(${contactLinksAnimation.blur}px)`,
                                    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out'
                                }}
                            />
                            <p className="contact-text" style={{ marginTop: '2rem', fontSize: '1.5rem' }}>
                                The <strong style={{ color: 'var(--nokia-screen)', fontWeight: 700 }}>EXPERT</strong> in everything was once a <strong style={{ color: 'var(--nokia-screen)', fontWeight: 700 }}>BEGINNER</strong>
                            </p>
                            <Link 
                                href="/cv-download" 
                                scroll={false} 
                                className="download-cv-link download-cv-link-orange" 
                                style={{ marginTop: '1.5rem' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    triggerCVDownload();
                                }}
                            >
                                Download CV
                            </Link>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Image
                                        src="/images/farru2.png"
                                        alt="Logo"
                                        width={60}
                                        height={60}
                                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                                        unoptimized
                                    />
                                    <div className="tag" style={{ fontSize: '1.125rem', opacity: 1 }}>
                                        © farhaawnnn9 — All rights reserved
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
