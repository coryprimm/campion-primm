// useVisibilityHandler.ts
import { useState, useEffect, useRef } from 'react';

const VisibilityHandler = (
    isScrolling: boolean,
    isHovered: boolean,
    isMenuOpen: boolean
) => {
    const [isVisible, setIsVisible] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // When scrolling occurs, always make navbar visible
    useEffect(() => {
        if (isScrolling) {
            setIsVisible(true);
        }
    }, [isScrolling]);

    useEffect(() => {
        // Always keep visible if menu is open or user is at the top
        if (isMenuOpen || window.scrollY === 0 || isHovered) {
            setIsVisible(true);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            return;
        }

        const handleIdleTimeout = () => {
            if (
                window.scrollY > 0 &&
                !isHovered &&
                !isScrolling &&
                !isMenuOpen
            ) {
                setIsVisible(false);
            }
        };

        // Clear existing timeout when dependencies change
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout
        timeoutRef.current = setTimeout(handleIdleTimeout, 2000);

        // Event listeners to reset timeout
        const resetIdleTimer = () => {
            setIsVisible(true);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(handleIdleTimeout, 2000);
        };

        window.addEventListener('mousemove', resetIdleTimer);
        window.addEventListener('keydown', resetIdleTimer);
        window.addEventListener('touchstart', resetIdleTimer);

        return () => {
            window.removeEventListener('mousemove', resetIdleTimer);
            window.removeEventListener('keydown', resetIdleTimer);
            window.removeEventListener('touchstart', resetIdleTimer);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isScrolling, isHovered, isMenuOpen]);

    return isVisible;
};

export default VisibilityHandler;
