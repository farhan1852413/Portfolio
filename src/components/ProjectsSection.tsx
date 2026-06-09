'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';

type ProjectCategory = 'all' | 'client' | 'personal' | 'ui/ux' | 'design';

type Project = {
    id: number;
    title: string;
    description: string | React.ReactNode;
    tech: string[];
    category: ProjectCategory;
    showInAll?: boolean;
    screenshot?: string;
    githubUrl?: string;
    demoUrl?: string;
    youtubeUrl?: string;
    instagramUrl?: string;
    tiktokUrl?: string;
    chromeUrl?: string;
    year?: string;
    clientOrder?: number;
};
const projects: Project[] = [
    {
        id: 12,
        title: 'Home Manager',
        description: 'HomeManager is a full-stack smart home management application built using React.js, Node.js, Express.js, and MongoDB. It provides users with a centralized platform to manage rooms, control smart devices, and securely handle user accounts through JWT authentication. The application also integrates weather and news services to enhance the smart home experience with real-time information.',
        tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Full-Stack'],
        category: 'personal' as ProjectCategory,
        screenshot: '/images/homemanagar.webp',
        demoUrl: 'https://home-manager-pi.vercel.app/',
        githubUrl: 'https://github.com/farhan1852413/HomeManager',
        year: 'NEWW! (2026)',
    },
    {
        id: 8,
        title: 'JobTrackr',
        description: 'A smart job application tracker that syncs directly with your Gmail to keep all your applications in one place. Built with Next.js and MongoDB, it automatically pulls your latest emails and organizes them in a clean, responsive dashboard so you can apply with clarity and confidence.',
        tech: ['Next.js', 'React', 'TypeScript', 'MongoDB', 'OAuth', 'Nodemailer', 'UI/UX', 'JWT', 'TailwindCSS'],
        category: 'personal' as ProjectCategory,
        screenshot: '/images/jobtrackr.webp',
        githubUrl: 'https://github.com/XabisoMemani/JobTrackr-Showcase',
        demoUrl: 'https://jobtrackr-xabiso.vercel.app/',
        year: 'NEW! (2026)',
    },
    {
        id: 9,
        title: 'IntelliSave Chrome Extension',
        description:
            'An intelligent Chrome extension I built to automatically sort your downloaded files into organized folders. I started this in 2024 to solve my own messy Downloads folder problem, and decided to publish it for others to enjoy! It runs quietly in the background, keeping your files perfectly categorized by type and source. Download it on Chrome Web Store and clear your messy downloads folder!',
        tech: ['Chrome Extension', 'JavaScript', 'Manifest V3', 'Automation'],
        category: 'personal' as ProjectCategory,
        screenshot: '/images/intellisave.webp',
        demoUrl: 'https://xabisomemani.github.io/IntelliSave/index.html',
        chromeUrl: 'https://chromewebstore.google.com/detail/intellisave/knemlapnohmfinjfondkjhdnoahfafko',
        year: '2024',
    },
    {
        id: 2,
        title: 'Find My Uni',
        description: 'A full-stack web application designed to help South African students find the perfect university program. Simply input your marks to automatically calculate your APS score and discover matching courses. Features user authentication and a smooth, animated UI!',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'WCF', '.NET Framework', 'C#', 'SQL Server'],
        category: 'personal' as ProjectCategory,
        screenshot: '/images/findmyuni.webp',
        githubUrl: 'https://github.com/XabisoMemani/FindMyUni',
        demoUrl: 'https://findmyuni-xabiso.vercel.app',
        year: '2024',
    },
    {
        id: 10,
        title: 'Bear Group',
        description:
            'Designed and built a website for Bear Group, a South African company that provides strategic oversight and shared resources across its subsidiaries in construction, earthworks & logistics, security protection, consulting, etc. Built as a clean, responsive site with clear service pages, a gallery, and direct contact details.',
        tech: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Radix UI', 'GSAP', 'Lenis'],
        category: 'client' as ProjectCategory,
        screenshot: '/images/beargroup.webp',
        demoUrl: 'https://beargroup.vercel.app/',
        year: '2026',
        clientOrder: 10,
    },
    {
        id: 13,
        title: 'lockedIn',
        description: 'A clone of LinkedIn built with HTML, CSS, and JavaScript. This project showcases responsive design and modern web development techniques.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        category: 'ui/ux' as ProjectCategory,
        screenshot: '/images/lockedin.webp',
        demoUrl: 'https://lockedinn-one.vercel.app/',
        year: '2026',
    },
    {
        id: 14,
        title: 'YouTube Clone',
        description: 'A clone of YouTube built with HTML, CSS, and JavaScript. Explore a responsive video platform interface with modern design principles and smooth interactions.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        category: 'ui/ux' as ProjectCategory,
        screenshot: '/images/youtubeclone.webp',
        demoUrl: 'https://you-tube-clone-liart-omega.vercel.app/',
        year: '2026',
    },
];

const filters: { label: string; value: ProjectCategory }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'Personal Projects', value: 'personal' },
    { label: 'UI/UX', value: 'ui/ux' },
    { label: 'Client Projects', value: 'client' },
];

export default function ProjectsSection() {
    const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
    const projectCardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
    const [cardAnimations, setCardAnimations] = useState<Map<number, { opacity: number; translateY: number; blur: number }>>(new Map());
    const [isMobile, setIsMobile] = useState(false);
    const [visibleCount, setVisibleCount] = useState(6);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') {
            // Return projects in the same order as declared in the `projects` array.
            // Use `showInAll` flag to hide specific items (like duplicates) from the All view.
            return projects.filter(project => project.showInAll !== false);
        }

        const filtered = projects.filter(project => project.category === activeFilter);

        if (activeFilter === 'client') {
            return filtered.sort((a, b) => (a.clientOrder || 99) - (b.clientOrder || 99));
        }

        return filtered;
    }, [activeFilter]);

    const baseVisibleCount = isMobile ? 4 : 6;
    const visibleProjects = useMemo(() => filteredProjects.slice(0, visibleCount), [filteredProjects, visibleCount]);

    // Detect mobile vs desktop
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // Breakpoint for mobile. hardcoded but works well for this use case. Adjust if needed.
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Reset visible cards when filter changes or breakpoint changes
    useEffect(() => {
        // eslint-disable-next-line
        setVisibleCount(Math.min(baseVisibleCount, filteredProjects.length));
    }, [activeFilter, isMobile, filteredProjects.length, baseVisibleCount]);

    // Scroll animation effect for project cards
    useEffect(() => {
        // Access filteredProjects from closure
        const handleScroll = () => {
            const windowHeight = window.innerHeight;

            // ANIMATION PARAMETERS - Same values as ResumeSection
            const animationStart = windowHeight * 0.95; // When animation STARTS
            const animationEnd = windowHeight * 0.8; // When animation ENDS
            const translateDistance = 15; // Movement distance (in pixels)
            const animationRange = animationStart - animationEnd; // Range height
            const blurAmount = 10; // Maximum blur (in pixels)
            const blurEnd = windowHeight * 0.9; // When blur ENDS

            const newAnimations = new Map<number, { opacity: number; translateY: number; blur: number }>();

            // Get visible cards per row on desktop
            const getVisibleCardsPerRow = () => {
                if (isMobile) return 1; // Mobile: one card per row

                // Desktop: detect how many cards fit per row
                const firstCard = projectCardRefs.current.get(visibleProjects[0]?.id);
                if (!firstCard || visibleProjects.length === 0) return 3;

                const gridContainer = firstCard.parentElement;
                if (!gridContainer) return 3;

                const containerWidth = gridContainer.clientWidth;
                const cardWidth = firstCard.offsetWidth;
                const gap = 32; // 2rem gap
                const cardsPerRow = Math.floor((containerWidth + gap) / (cardWidth + gap));
                return Math.max(1, Math.min(cardsPerRow, visibleProjects.length));
            };

            const cardsPerRow = getVisibleCardsPerRow();
            const rowGroups: number[][] = [];

            // Group cards by rows
            for (let i = 0; i < visibleProjects.length; i += cardsPerRow) {
                rowGroups.push(visibleProjects.slice(i, i + cardsPerRow).map(p => p.id));
            }

            // Remove unused 'index' parameter
            visibleProjects.forEach((project) => {
                const cardElement = projectCardRefs.current.get(project.id);
                if (!cardElement) return;

                const rect = cardElement.getBoundingClientRect();
                const elementTop = rect.top;

                // On mobile: each card animates individually (staggered)
                // On desktop: cards in the same row animate together
                let progress = 0;
                if (elementTop <= animationStart && elementTop >= animationEnd) {
                    progress = Math.max(0, Math.min(1, (animationStart - elementTop) / animationRange));
                } else if (elementTop < animationEnd) {
                    progress = 1;
                }

                // On mobile: add stagger delay based on index
                // On desktop: use row-based timing (cards in same row have same progress)
                let adjustedProgress = progress;
                // Unified logic for both mobile and desktop
                // On mobile: cardsPerRow is 1, so each card is its own row
                // On desktop: cards calculate progress based on their row's position

                // Find which row this card belongs to
                const rowIndex = rowGroups.findIndex(row => row.includes(project.id));
                if (rowIndex >= 0) {
                    // Use the first card in the row to determine progress
                    const firstCardInRow = projectCardRefs.current.get(rowGroups[rowIndex][0]);
                    if (firstCardInRow) {
                        const rowRect = firstCardInRow.getBoundingClientRect();
                        const rowTop = rowRect.top;
                        if (rowTop <= animationStart && rowTop >= animationEnd) {
                            adjustedProgress = Math.max(0, Math.min(1, (animationStart - rowTop) / animationRange));
                        } else if (rowTop < animationEnd) {
                            adjustedProgress = 1;
                        }
                    }
                }

                // Ease out function
                const easedProgress = 1 - Math.pow(1 - adjustedProgress, 3);

                // Calculate blur progress separately
                const blurRange = animationStart - blurEnd;
                let blurProgress = 0;
                if (elementTop <= animationStart && elementTop >= blurEnd) {
                    blurProgress = Math.max(0, Math.min(1, (animationStart - elementTop) / blurRange));
                } else if (elementTop < blurEnd) {
                    blurProgress = 1;
                }

                const easedBlurProgress = 1 - Math.pow(1 - blurProgress, 3);
                const currentBlur = blurAmount * (1 - easedBlurProgress);

                newAnimations.set(project.id, {
                    opacity: easedProgress,
                    translateY: translateDistance * (1 - easedProgress),
                    blur: currentBlur
                });
            });

            // Only update if animations actually changed
            setCardAnimations(prev => {
                let hasChanged = false;
                if (prev.size !== newAnimations.size) {
                    hasChanged = true;
                } else {
                    for (const [id, anim] of newAnimations) {
                        const prevAnim = prev.get(id);
                        if (!prevAnim ||
                            Math.abs(prevAnim.opacity - anim.opacity) > 0.01 ||
                            Math.abs(prevAnim.translateY - anim.translateY) > 0.01 ||
                            Math.abs(prevAnim.blur - anim.blur) > 0.01) {
                            hasChanged = true;
                            break;
                        }
                    }
                }
                return hasChanged ? newAnimations : prev;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on mount

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [visibleProjects, isMobile]);

    return (
        <section id="projects" className="portfolio-section">
            <div className="section-content">
                <h2 className="section-title">PROJECTS</h2>

                {/* Filter Tabs */}
                <div className="project-filters">
                    {filters.map((filter, index) => (
                        <span key={filter.value}>
                            <button
                                className={`project-filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter.value)}
                            >
                                {filter.label}
                            </button>
                            {index < filters.length - 1 && <span className="project-filter-separator">|</span>}
                        </span>
                    ))}
                </div>

                <div className={`projects-grid ${visibleProjects.length === 1 ? 'projects-grid-single' : ''}`}>
                    {visibleProjects.map((project) => {
                        //can i remove this line?
                        const isDesignCategory = project.category === 'design';
                        const aspectRatioClass = 'project-image-video';

                        // Arrow icon SVG
                        const ArrowIcon = () => (
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="project-link-icon"
                            >
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        );

                        const animation = cardAnimations.get(project.id) || { opacity: 0, translateY: 15, blur: 10 };

                        return (
                            <div
                                key={project.id}
                                ref={(el) => {
                                    if (el) {
                                        projectCardRefs.current.set(project.id, el);
                                    } else {
                                        projectCardRefs.current.delete(project.id);
                                    }
                                }}
                                className={`project-card ${project.screenshot ? 'project-card-with-image' : ''}`}
                                style={{
                                    opacity: animation.opacity,
                                    transform: `translateY(${animation.translateY}px)`,
                                    filter: `blur(${animation.blur}px)`,
                                    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out'
                                }}
                            >
                                {/* Image Container */}
                                {project.screenshot && (
                                    <div className={`project-image-container ${aspectRatioClass}`}>
                                        <Image
                                            src={project.screenshot}
                                            alt={`${project.title} screenshot`}
                                            className="project-screenshot"
                                            width={800}
                                            height={600}
                                            loading="lazy"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="project-card-content">
                                    <div className="project-card-text">
                                        <h3 className="project-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span>{project.title}</span>
                                            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: '500', padding: '0.25rem 0.5rem', border: '1px solid #e5e5e5', borderRadius: '999px', color: '#1a1a1a', background: 'transparent' }}>{project.year || 'NEW!'}</span>
                                        </h3>
                                        <p className="project-description" style={{ textAlign: 'justify', marginTop: '1em' }}>
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Technologies */}
                                    <div className="project-tech" style={{ marginTop: '1rem' }}>
                                        {project.tech.map((tech, index) => (
                                            <span key={index} className="tech-tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="project-actions">
                                        {project.demoUrl && (
                                            <a
                                                href={project.demoUrl === '#' ? undefined : project.demoUrl}
                                                target={project.demoUrl === '#' ? undefined : '_blank'}
                                                rel={project.demoUrl === '#' ? undefined : 'noopener noreferrer'}
                                                className="project-link-btn project-link-btn-demo"
                                                onClick={project.demoUrl === '#' ? (e) => e.preventDefault() : undefined}
                                                style={project.demoUrl === '#' ? { cursor: 'not-allowed', opacity: 0.6, pointerEvents: 'none' } : {}}
                                            >
                                                <span style={{ textAlign: 'center', flex: 1 }}>Live</span>
                                                <ArrowIcon />
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl === '#' ? undefined : project.githubUrl}
                                                target={project.githubUrl === '#' ? undefined : '_blank'}
                                                rel={project.githubUrl === '#' ? undefined : 'noopener noreferrer'}
                                                className="project-link-btn project-link-btn-github"
                                                onClick={project.githubUrl === '#' ? (e) => e.preventDefault() : undefined}
                                                style={project.githubUrl === '#' ? { cursor: 'not-allowed', opacity: 0.6, pointerEvents: 'none' } : {}}
                                            >
                                                <span style={{ textAlign: 'center', flex: 1 }}>GitHub</span>
                                                <ArrowIcon />
                                            </a>
                                        )}
                                        {project.youtubeUrl && (
                                            <a
                                                href={project.youtubeUrl === '#' ? undefined : project.youtubeUrl}
                                                target={project.youtubeUrl === '#' ? undefined : '_blank'}
                                                rel={project.youtubeUrl === '#' ? undefined : 'noopener noreferrer'}
                                                className="project-link-btn project-link-btn-youtube"
                                                onClick={project.youtubeUrl === '#' ? (e) => e.preventDefault() : undefined}
                                                style={project.youtubeUrl === '#' ? { cursor: 'not-allowed', opacity: 0.6, pointerEvents: 'none' } : {}}
                                            >
                                                <span style={{ textAlign: 'center', flex: 1 }}>YouTube</span>
                                                <ArrowIcon />
                                            </a>
                                        )}
                                        {project.tiktokUrl && (
                                            <a
                                                href={project.tiktokUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link-btn project-link-btn-tiktok"
                                            >
                                                <span style={{ textAlign: 'center', flex: 1 }}>TikTok</span>
                                                <ArrowIcon />
                                            </a>
                                        )}
                                        {project.instagramUrl && (
                                            <a
                                                href={project.instagramUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link-btn project-link-btn-instagram"
                                            >
                                                <span style={{ textAlign: 'center', flex: 1 }}>Instagram</span>
                                                <ArrowIcon />
                                            </a>
                                        )}
                                        {project.chromeUrl && (
                                            <a
                                                href={project.chromeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link-btn project-link-btn-demo"
                                            >
                                                <span style={{ textAlign: 'center', flex: 1 }}>Chrome Store</span>
                                                <ArrowIcon />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {(filteredProjects.length > baseVisibleCount) && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            marginTop: isMobile ? '1rem' : '2rem',
                            marginBottom: isMobile ? '1rem' : undefined,
                        }}
                    >
                        {visibleCount < filteredProjects.length && (
                            <button
                                type="button"
                                onClick={() => setVisibleCount(filteredProjects.length)}
                                className="project-filter-btn active"
                                style={{ padding: '0.75rem 1.25rem', borderRadius: '999px' }}
                            >
                                See more
                            </button>
                        )}
                        {visibleCount > baseVisibleCount && (
                            <button
                                type="button"
                                onClick={() => setVisibleCount(Math.min(baseVisibleCount, filteredProjects.length))}
                                className="project-filter-btn"
                                style={{ padding: '0.75rem 1.25rem', borderRadius: '999px' }}
                            >
                                See less
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

