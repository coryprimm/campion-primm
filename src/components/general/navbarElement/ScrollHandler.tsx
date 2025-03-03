// useScrollHandler.ts
import { useState, useEffect, useRef } from 'react';

const useScrollHandler = () => {
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollingTimeoutRef.current) {
                clearTimeout(scrollingTimeoutRef.current);
            }
            setIsScrolling(true);
            scrollingTimeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
            }, 150);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollingTimeoutRef.current)
                clearTimeout(scrollingTimeoutRef.current);
        };
    }, []);

    return isScrolling;
};

export default useScrollHandler;
