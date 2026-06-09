'use client';

import { useEffect } from 'react';

export default function ScanLines() {
    useEffect(() => {
        const scanLines = document.querySelector('.scan-lines');

        const interval = setInterval(() => {
            if (Math.random() > 0.85 && scanLines) {
                (scanLines as HTMLElement).style.opacity = '0.8';
                setTimeout(() => {
                    if (scanLines) {
                        (scanLines as HTMLElement).style.opacity = '1';
                    }
                }, 100);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="scan-lines landing-only"></div>
            <div className="grid landing-only"></div>
        </>
    );
}