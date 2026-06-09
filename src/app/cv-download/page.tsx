'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CVDownloadPage() {
    const router = useRouter();

    useEffect(() => {
        // Detect if this is being hit in a stealthy way (via iframe)
        const isStealth = window.location.search.includes('stealth=true');
        
        if (!isStealth) {
            // Only trigger a real download and back if navigated to directly from a link
            const link = document.createElement('a');
            link.href = `/documents/FarhanCV.pdf?cache-bust=${Date.now()}`;
            link.download = 'FarhanCV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Return to the previous page after a short delay
            const timer = setTimeout(() => {
                router.back();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [router]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: 'var(--font-inter)',
            color: '#888'
        }}>
            <p>Preparing your download...</p>
        </div>
    );
}
