'use client';

import { useEffect, useState, useRef } from 'react';

export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // track mouse position using refs for better performance
    const mousePosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // force hide the default system cursor
        const hideSystemCursor = () => {
            if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                document.documentElement.style.cursor = 'none';
                document.body.style.cursor = 'none';
            }
        };

        hideSystemCursor();

        const onMouseMove = (e: MouseEvent) => {
            mousePosition.current = { x: e.clientX, y: e.clientY };

            if (!isVisible) setIsVisible(true);

            // check if an extension messed with the cursor
            if (document.body.style.cursor !== 'none' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                hideSystemCursor();
            }
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => {
            setIsVisible(true);
            hideSystemCursor();
        };

        const updateCursorPosition = () => {
            if (cursorRef.current) {
                const { x, y } = mousePosition.current;
                // hardware accelerated movement
                cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
            }
            if (dotRef.current) {
                const { x, y } = mousePosition.current;
                dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
            }
            requestAnimationFrame(updateCursorPosition);
        };

        const animationId = requestAnimationFrame(updateCursorPosition);


        const handleClick = (e: MouseEvent) => {
            if (!e.isTrusted) return; // Ignore programmatic clicks to avoid ghost pulses at (0,0)
            const clickEffect = document.createElement('div');
            clickEffect.className = 'cursor-click';

            clickEffect.style.left = e.clientX + 'px';
            clickEffect.style.top = e.clientY + 'px';
            document.body.appendChild(clickEffect);

            setTimeout(() => {
                clickEffect.remove();
            }, 600);

            setTimeout(() => {
                const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
                if (!isInteractiveElement(el)) {
                    setIsHovering(false);
                }
            }, 0);
        };

        // check if I am hovering over something clickable
        const isInteractiveElement = (element: HTMLElement | null): boolean => {
            if (!element) return false;

            const interactiveSelectors = [
                'a',
                'button',
                '.info-btn',
                '.close-btn',
                '.resume-interactive',
                '.social-link',
                '.theme-btn',
                '.certification-link',
                '.download-cv-link',
                '.project-link-btn',
                '.contact-link'
            ].join(', ');

            return element.matches(interactiveSelectors) ||
                !!element.closest(interactiveSelectors);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (isInteractiveElement(target)) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const relatedTarget = e.relatedTarget as HTMLElement;

            if (isInteractiveElement(target) && !isInteractiveElement(relatedTarget)) {
                setIsHovering(false);
            }
        };

        // hide cursor again when window gets focus
        const handleFocus = () => {
            hideSystemCursor();
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('click', handleClick);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);
        window.addEventListener('focus', handleFocus);

        // clear hover state when info panel closes
        const handleInfoClose = () => setIsHovering(false);
        window.addEventListener('app:info-close', handleInfoClose as EventListener);

        return () => {
            cancelAnimationFrame(animationId);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('app:info-close', handleInfoClose as EventListener);
        };
    }, [isVisible]);

    return (
        <>
            {/* Main cursor with mix-blend-mode */}
            <div
                ref={cursorRef}
                className="cursor"
                style={{
                    // Initial position off-screen or 0,0
                    left: 0,
                    top: 0,
                    opacity: isVisible ? 1 : 0,
                    // I remove the transition in CSS, and handle position entirely via transform here
                }}
            >
                <div className="cursor-default"></div>
            </div>

            {/* Separate red dot without mix-blend-mode */}
            <div
                ref={dotRef}
                className="cursor-dot-wrapper"
                style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 10001,
                    left: 0,
                    top: 0,
                    opacity: (isHovering && isVisible) ? 1 : 0,
                    display: (isHovering && isVisible) ? 'block' : 'none'
                }}
            >
                <div className="cursor-dot"></div>
            </div>
        </>
    );
}