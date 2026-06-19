'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { triggerCVDownload } from '@/utils/cv-tracker';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ResumeSection() {
    const educationRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const certificationsRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    const [educationAnimation, experienceAnimation, certificationsAnimation, skillsAnimation] = useScrollAnimation([
        educationRef, experienceRef, certificationsRef, skillsRef
    ]);

    return (
        <section id="resume" className="portfolio-section">
            <div className="section-content">
                <div className="resume-header">
                    <h2 className="section-title">RESUME</h2>
                    <div className="experience-badge">7+ Years Coding Experience</div>
                </div>
                <div className="resume-grid">
                    <div className="resume-left">
                        <div
                            ref={educationRef}
                            className="resume-section-group"
                            style={{
                                opacity: educationAnimation.opacity,
                                transform: `translateY(${educationAnimation.translateY}px)`,
                                filter: `blur(${educationAnimation.blur}px)`,
                                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out'
                            }}
                        >
                            <h3 className="resume-group-title">EDUCATION</h3>
                            <div className="timeline">
                                <div className="timeline-item">
                                    <div className="timeline-divider"></div>
                                    <div className="timeline-left-part">
                                        <div className="timeline-year">2023 - 2027</div>
                                    </div>
                                    <div className="timeline-right-part">
                                        <h4 className="timeline-title">Bachelor of Technology in Computer Science Engineering</h4>
                                        <p className="timeline-institution">BMS College of Engineering, Bangalore</p>
                                        <p className="timeline-description">
                                            Ranked <strong>COMEDK 600</strong>. Majoring in Computer Science with coursework in Algorithms and Data Structures, Object Orientation, Full Stack Web Development, Databases, Computer Networks, IT Management, Calculus, Linear Algebra, Applied Mathematics and more.
                                        </p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-divider"></div>
                                    <div className="timeline-left-part">
                                        <div className="timeline-year">2020 - 2023</div>
                                    </div>
                                    <div className="timeline-right-part">
                                        <h4 className="timeline-title">Narayana Institutions</h4>
                                        <p className="timeline-institution">Engineering Entrance Preparation</p>
                                        <p className="timeline-description">
                                            Completed JEE Advanced preparation with a final rank of <strong>17,000</strong> and achieved <strong>98 percentile</strong> on JEE Main. Focused studies in mathematics, physics, and chemistry for competitive engineering entrance exams.
                                        </p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-divider"></div>
                                    <div className="timeline-left-part">
                                        <div className="timeline-year">2016 - 2020</div>
                                    </div>
                                    <div className="timeline-right-part">
                                        <h4 className="timeline-title">Sainik School [Your School Name]</h4>
                                        <p className="timeline-institution">Secondary School Education</p>
                                        <div className="timeline-description">
                                            <div className="achievement-badge">🏐 Captain — Volleyball Team</div>
                                            <div className="achievement-badge">🏆 Debate Champion</div>
                                            <div className="achievement-badge">🎤 Elocution Champion</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            ref={experienceRef}
                            className="resume-section-group"
                            style={{
                                opacity: experienceAnimation.opacity,
                                transform: `translateY(${experienceAnimation.translateY}px)`,
                                filter: `blur(${experienceAnimation.blur}px)`,
                                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out'
                            }}
                        >
                            <h3 className="resume-group-title">EXPERIENCE</h3>
                            <div className="experience-list">
                                <div className="experience-entry">
                                    <div className="experience-employer-row">
                                        <div className="experience-employer">
                                            Rotaract Club of BMSCE
                                            <span className="experience-address"> – Bangalore, India</span>
                                        </div>
                                        <div className="experience-duration">June 2025 – December 2025</div>
                                    </div>
                                    <div className="experience-job-title">Club Service Director</div>
                                    <p className="experience-description">
                                        Directed and managed community service initiatives, overseeing end-to-end club operations across a 7-month tenure. Planned and executed impactful service projects, driving member participation and strengthening community outreach.
                                    </p>
                                    <div className="experience-achievement">
                                        <strong>Achievement:</strong> Fostered team collaboration and leadership within the club, contributing to a culture of social responsibility and civic engagement.
                                    </div>
                                </div>

                                <div className="experience-entry">
                                    <div className="experience-employer-row">
                                        <div className="experience-employer">
                                            Utsav'25 — BMSCE
                                            <span className="experience-address"> – Bangalore, India</span>
                                        </div>
                                        <div className="experience-duration">May 2025</div>
                                    </div>
                                    <div className="experience-job-title">Event Coordinator, Deathscape</div>
                                    <p className="experience-description">
                                        Led the setup of an interactive escape-room environment using lasers and sensor-based systems. Programmed C code for sensor-controlled colour transitions, enabling real-time dynamic user interaction.
                                    </p>
                                    <div className="experience-achievement">
                                        <strong>Achievement:</strong> Coordinated logistics and team efforts on the ground to ensure seamless event execution and an engaging visitor experience.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="resume-right">
                        <div
                            ref={certificationsRef}
                            className="resume-section-group"
                            style={{
                                opacity: certificationsAnimation.opacity,
                                transform: `translateY(${certificationsAnimation.translateY}px)`,
                                filter: `blur(${certificationsAnimation.blur}px)`,
                                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out'
                            }}
                        >
                            <h3 className="resume-group-title">CERTIFICATIONS</h3>
                            <div className="certifications-list">
                                <div className="certification-item">
                                    <div className="certification-header">
                                        <h4 className="certification-title">
                                            • Responsive Web Design
                                        </h4>
                                    </div>
                                    <p className="certification-institution">freeCodeCamp</p>
                                    <p className="certification-date">Obtained: January 2025</p>
                                    <p className="certification-skills">Skills: HTML, CSS, Js, Web Accessibility</p>
                                </div>
                                <div className="certification-item">
                                    <div className="certification-header">
                                        <h4 className="certification-title">
                                            • Prompt Design in Vertex AI
                                        </h4>
                                    </div>
                                    <p className="certification-institution">Google</p>
                                    <p className="certification-date">Obtained: October 2024</p>
                                    <p className="certification-skills">Skills: Generative AI, Prompt Engineering, Vertex AI</p>
                                </div>
                                <div className="certification-item">
                                    <div className="certification-header">
                                        <h4 className="certification-title">
                                            • Call Centre Training
                                        </h4>
                                    </div>
                                    <p className="certification-institution">Skills Excel Training Institute</p>
                                    <p className="certification-date">Obtained: January 2024</p>
                                    <p className="certification-skills">Skills: Customer Service, Telesales Scripting, Telephone Etiquette</p>
                                </div>
                            </div>
                        </div>
                        <div
                            ref={skillsRef}
                            className="resume-section-group"
                            style={{
                                opacity: skillsAnimation.opacity,
                                transform: `translateY(${skillsAnimation.translateY}px)`,
                                filter: `blur(${skillsAnimation.blur}px)`,
                                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out'
                            }}
                        >
                            <h3 className="resume-group-title">SKILLS</h3>
                            <div className="skill-item">
                                <div className="skill-header">
                                    <span className="skill-name"><strong>Programming Languages:</strong> C#, C++, Java, SQL</span>
                                    <span className="skill-percentage">90%</span>
                                </div>
                                <div className="skill-bar">
                                    <div className="skill-bar-fill" style={{ width: '90%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header">
                                    <span className="skill-name"><strong>Web Technologies:</strong> HTML, CSS, JavaScript, TypeScript</span>
                                    <span className="skill-percentage">100%</span>
                                </div>
                                <div className="skill-bar">
                                    <div className="skill-bar-fill" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header">
                                    <span className="skill-name"><strong>Frameworks:</strong> ASP.NET Web Forms, ASP.NET API, Next.js</span>
                                    <span className="skill-percentage">90%</span>
                                </div>
                                <div className="skill-bar">
                                    <div className="skill-bar-fill" style={{ width: '90%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header">
                                    <span className="skill-name"><strong>Mobile Development:</strong> React Native with Expo</span>
                                    <span className="skill-percentage">95%</span>
                                </div>
                                <div className="skill-bar">
                                    <div className="skill-bar-fill" style={{ width: '95%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header">
                                    <span className="skill-name"><strong>Design Tools:</strong> Adobe Photoshop, Illustrator, Figma</span>
                                    <span className="skill-percentage">85%</span>
                                </div>
                                <div className="skill-bar">
                                    <div className="skill-bar-fill" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header">
                                    <span className="skill-name"><strong>Team Collaboration:</strong> Git, Github, Trello, Agile workflows, Strong Communicator & Team Player</span>
                                    <span className="skill-percentage">95%</span>
                                </div>
                                <div className="skill-bar">
                                    <div className="skill-bar-fill" style={{ width: '95%' }}></div>
                                </div>
                            </div>
                            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                                <Link 
                                    href="/cv-download" 
                                    scroll={false} 
                                    className="download-cv-link download-cv-link-orange"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        triggerCVDownload();
                                    }}
                                >
                                    Download CV
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

