'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface Snowflake {
    id: number;
    left: number;
    animationDuration: number;
    animationDelay: number;
    size: number;
    opacity: number;
}

export default function Snowflakes() {
    const { theme, mounted } = useTheme();
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

    useEffect(() => {
        if (!mounted || theme !== 'christmas') {
            // eslint-disable-next-line
            setSnowflakes([]);
            return;
        }

        // Create 40 snowflakes (reduced from 50 for better performance)
        const flakes: Snowflake[] = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDuration: 6 + Math.random() * 4, // 6-10 seconds
            animationDelay: Math.random() * 5,
            size: 4 + Math.random() * 5, // 4-10px
            opacity: 0.3 + Math.random() * 0.5, // 0.3-0.8
        }));

        setSnowflakes(flakes);
    }, [theme, mounted]);

    if (theme !== 'christmas' || snowflakes.length === 0) {
        return null;
    }

    return (
        <div className="snowflakes-container">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        left: `${flake.left}%`,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.animationDelay}s`,
                        opacity: flake.opacity,
                    }}
                >
                    ❄
                </div>
            ))}
        </div>
    );
}

