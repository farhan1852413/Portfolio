'use client';

import { useState, useEffect, RefObject } from 'react';

interface ScrollAnimationOptions {
    animationStartOffset?: number; // e.g., 0.95 (95% down viewport)
    animationEndOffset?: number;   // e.g., 0.5 (50% down viewport)
    translateDistance?: number;    // e.g., 15 (pixels)
    blurAmount?: number;           // e.g., 10 (pixels)
    blurEndOffset?: number;        // e.g., 0.9
}

interface AnimationState {
    opacity: number;
    translateY: number;
    blur: number;
}

/**
 * A hook that calculates smooth, scroll-linked animations (opacity, translateY, blur)
 * for elements as they enter the viewport. Replaces repetitive scroll listeners.
 */
export function useScrollAnimation(
    refs: RefObject<HTMLElement | null>[],
    options: ScrollAnimationOptions = {}
): AnimationState[] {
    const {
        animationStartOffset = 0.95,
        animationEndOffset = 0.5,
        translateDistance = 15,
        blurAmount = 10,
        blurEndOffset = 0.9,
    } = options;

    const [animations, setAnimations] = useState<AnimationState[]>(
        refs.map(() => ({ opacity: 0, translateY: translateDistance, blur: blurAmount }))
    );

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const animationStart = windowHeight * animationStartOffset;
            const animationEnd = windowHeight * animationEndOffset;
            const animationRange = animationStart - animationEnd;
            const blurEnd = windowHeight * blurEndOffset;

            const newAnimations = refs.map((ref) => {
                if (!ref.current) return { opacity: 0, translateY: translateDistance, blur: blurAmount };

                const rect = ref.current.getBoundingClientRect();
                const elementTop = rect.top;

                // Opacity & TranslateY Progress
                let progress = 0;
                if (elementTop <= animationStart && elementTop >= animationEnd) {
                    progress = Math.max(0, Math.min(1, (animationStart - elementTop) / animationRange));
                } else if (elementTop < animationEnd) {
                    progress = 1;
                }
                const easedProgress = 1 - Math.pow(1 - progress, 3);

                // Blur Progress
                const blurRange = animationStart - blurEnd;
                let blurProgress = 0;
                if (elementTop <= animationStart && elementTop >= blurEnd) {
                    blurProgress = Math.max(0, Math.min(1, (animationStart - elementTop) / blurRange));
                } else if (elementTop < blurEnd) {
                    blurProgress = 1;
                }
                const easedBlurProgress = 1 - Math.pow(1 - blurProgress, 3);

                return {
                    opacity: easedProgress,
                    translateY: translateDistance * (1 - easedProgress),
                    blur: blurAmount * (1 - easedBlurProgress),
                };
            });

            // Only update state if values changed significantly (optimization)
            setAnimations((prev) => {
                const hasChanged = newAnimations.some((anim, i) => 
                    Math.abs(anim.opacity - prev[i].opacity) > 0.01 ||
                    Math.abs(anim.translateY - prev[i].translateY) > 0.5 ||
                    Math.abs(anim.blur - prev[i].blur) > 0.5
                );
                return hasChanged ? newAnimations : prev;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on mount

        return () => window.removeEventListener('scroll', handleScroll);
    }, [refs, animationStartOffset, animationEndOffset, translateDistance, blurAmount, blurEndOffset]);

    return animations;
}
