'use client';

import { useEffect } from 'react';

interface InfoPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function InfoPanel({ isOpen, onClose }: InfoPanelProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
                // notify listeners that the info panel closed
                window.dispatchEvent(new CustomEvent('app:info-close'));
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="overlay show"
                onClick={() => {
                    // Simulate Escape key press so any escape handlers run,
                    // and dispatch the cursor-reset event.
                    const esc = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
                    document.dispatchEvent(esc);
                    window.dispatchEvent(new CustomEvent('app:info-close'));
                }}
            ></div>
            <div className="info-panel show">
                <div
                    className="close-btn"
                    onClick={() => {
                        // Simulate Escape key press instead of directly invoking onClose
                        const esc = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
                        document.dispatchEvent(esc);
                        // Ensure cursor listeners clear hover/aim
                        window.dispatchEvent(new CustomEvent('app:info-close'));
                    }}
                >
                    ×
                </div>
                <div className="info-line">NAME: FARHAN MOHAMMAD</div>
                <div className="info-line">ROLE: SOFTWARE ENGINEER</div>
                <div className="info-line">LOCATION: BANGALORE, INDIA</div>
                <div className="info-line">
                    EMAIL:
                    <a href="mailto:farhanmohammad.0125@gmail.com"> farhanmohammad.0125@gmail.com</a>
                </div>
                <div className="info-line">
                    PHONE: <a href="tel:+918125466625">+91 8125466625</a>
                </div>
                <div className="info-line">STATUS: BUILDING SOMETHING COOL</div>
                <div className="info-line">AVAILABLE: AVAILABLE FOR HIRE</div>
                <p className="tag">Designed from scratch by <u>Farhan Mohammad</u> :)</p>
            </div>
        </>
    );
}