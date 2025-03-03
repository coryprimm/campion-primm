// ResponsiveMenuHandler.ts
import { useEffect } from 'react';

const useResponsiveMenuHandler = (
    isMenuOpen: boolean,
    setIsMenuOpen: (isOpen: boolean) => void
) => {
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Initial check
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isMenuOpen, setIsMenuOpen]);

    // No need to return anything since we're just adding behavior to existing state
};

export default useResponsiveMenuHandler;
