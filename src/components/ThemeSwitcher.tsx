'use client';

import { useTheme } from '@/hooks/useTheme';

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const cycleTheme = () => {
        const themes: Array<'dark' | 'wood' | 'orange' | 'christmas'> = ['orange', 'dark', 'wood', 'christmas'];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    const getThemeIcon = () => {
        switch (theme) {
            case 'dark': return '🦖';
            case 'wood': return '🪵';
            case 'orange': return '🟠';
            case 'christmas': return '🎄';
            default: return '🟠';
        }
    };

    return (
        <button
            className="theme-btn"
            onClick={cycleTheme}
            aria-label="Change theme"
        >
            {getThemeIcon()}
        </button>
    );
}