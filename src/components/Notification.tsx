'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function Notification() {
    const { theme, mounted, setTheme } = useTheme();
    const [firstNotificationVisible, setFirstNotificationVisible] = useState(false);
    const [secondNotificationVisible, setSecondNotificationVisible] = useState(false);

    useEffect(() => {
        if (!mounted || theme !== 'christmas') {
            // eslint-disable-next-line
            setFirstNotificationVisible(false);
            setSecondNotificationVisible(false);
            return;
        }

        // Show first notification after 1 second delay
        const showTimer = setTimeout(() => {
            setFirstNotificationVisible(true);
        }, 1000);

        return () => {
            clearTimeout(showTimer);
        };
    }, [theme, mounted]);

    // Handle second notification auto-dismiss
    useEffect(() => {
        if (!secondNotificationVisible) return;

        const autoHideTimer = setTimeout(() => {
            setSecondNotificationVisible(false);
        }, 8000); // Auto-dismiss after 8 seconds

        return () => {
            clearTimeout(autoHideTimer);
        };
    }, [secondNotificationVisible]);

    const handleFirstClose = () => {
        setFirstNotificationVisible(false);
        // Show second notification after slide-out animation completes
        setTimeout(() => {
            setSecondNotificationVisible(true);
        }, 800); // Wait for slide-out animation (0.5s) plus buffer
    };

    const handleSwitchTheme = () => {
        setTheme('orange');
        setFirstNotificationVisible(false);
        setSecondNotificationVisible(false);
    };

    const handleSecondClose = () => {
        setSecondNotificationVisible(false);
    };

    if (theme !== 'christmas') {
        return null;
    }

    // Christmas tree emoji for notifications
    const treeEmoji = '🎄';

    const checkSvg = (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const closeSvg = (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );

    return (
        <>
            {/* First Notification - always render when Christmas theme, control visibility with class */}
            <div className={`custom-alert ${firstNotificationVisible ? 'show' : ''}`}>
                <div className="alert-icon">
                    {treeEmoji}
                </div>
                <div className="alert-content">
                    <div className="alert-title">Happy Holidays!</div>
                    <div className="alert-message">Enjoying this christmas theme I added?</div>
                </div>
                <div className="alert-actions">
                    <button
                        className="alert-check"
                        onClick={handleFirstClose}
                        aria-label="Keep theme and close notification"
                        title="Keep theme"
                    >
                        {checkSvg}
                    </button>
                    <button
                        className="alert-close"
                        onClick={handleSwitchTheme}
                        aria-label="Switch to orange theme"
                        title="Switch theme"
                    >
                        {closeSvg}
                    </button>
                </div>
            </div>

            {/* Second Notification - always render when Christmas theme, control visibility with class */}
            <div className={`custom-alert ${secondNotificationVisible ? 'show' : ''}`}>
                <div className="alert-icon">
                    {treeEmoji}
                </div>
                <div className="alert-content">
                    <div className="alert-title">There&apos;s more themes to explore</div>
                    <div className="alert-message">Click the glowy top-right button to change themes!</div>
                </div>
                <div className="alert-actions">
                    <button
                        className="alert-check"
                        onClick={handleSecondClose}
                        aria-label="Close notification"
                        title="Close"
                    >
                        {checkSvg}
                    </button>
                </div>
            </div>
        </>
    );
}

