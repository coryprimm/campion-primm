import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import LogoComponent from './LogoComponent';
import NavLinksComponent from './NavLinksComponent';
import EqualsIconComponent from './EqualsIconComponent';
import useScrollHandler from './ScrollHandler';
import useVisibilityHandler from './VisibilityHandler2';
import useResponsiveMenuHandler from './ResponsiveMenuHandler';
import Link from 'next/link';
import { StaticImageData } from 'next/image';

interface GenericNavbarProps {
    logoSrc: string | StaticImageData;
    logoAlt?: string;
    logoWidth?: number;
    logoHeight?: number;
    navLinks: { href: string; text: string }[];
}

const GenericNavbarv2: React.FC<GenericNavbarProps> = ({
    logoSrc,
    logoAlt = 'Logo',
    logoWidth = 100,
    logoHeight = 100,
    navLinks,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isEqualsMenuOpen, setIsEqualsMenuOpen] = useState(false);
    const isScrolling = useScrollHandler();
    const isVisible = useVisibilityHandler(
        isScrolling,
        isHovered,
        isEqualsMenuOpen
    );

    useResponsiveMenuHandler(isEqualsMenuOpen, setIsEqualsMenuOpen);

    const handleEqualsClick = () => {
        setIsEqualsMenuOpen(!isEqualsMenuOpen);
    };

    const closeMenu = () => {
        setIsEqualsMenuOpen(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            {/* Navbar */}
            <nav
                className={cn(
                    'fixed top-0 left-0 right-0 w-full z-[1000]',
                    'transition-all duration-300 ease-in-out transform',
                    'border-b-[1px] border-white ',
                    isVisible
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-full opacity-0',
                    isEqualsMenuOpen ? 'bg-black' : ''
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Navbar Content (Hidden when menu is open) */}
                <div
                    className={cn(
                        isEqualsMenuOpen ? 'hidden' : '',
                        // 'bg-[#f6f3f3] backdrop-blur-sm',
                        'bg-black backdrop-blur-sm',
                        'shadow-lg',
                        'transition-all duration-300',
                        // 'hover:bg-[#f6f3f3] hover:shadow-xl',
                        'hover:bg-black hover:shadow-xl',
                        'h-full flex items-center',
                        'h-[72px]',
                        'md:h-[144px]'
                    )}
                >
                    <div className="w-full px-4 py-3">
                        <div className="flex items-center justify-between">
                            <Link href={'/'}>
                                <LogoComponent
                                    logoSrc={logoSrc}
                                    logoAlt={logoAlt}
                                    logoWidth={logoWidth}
                                    logoHeight={logoHeight}
                                    isEqualsMenuOpen={isEqualsMenuOpen}
                                />
                            </Link>
                            <NavLinksComponent
                                navLinks={navLinks}
                                isEqualsMenuOpen={isEqualsMenuOpen}
                                closeMenu={closeMenu}
                            />
                            <EqualsIconComponent
                                isEqualsMenuOpen={isEqualsMenuOpen}
                                handleEqualsClick={handleEqualsClick}
                            />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Full-screen Overlay Menu */}
            {isEqualsMenuOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black z-[1100] flex flex-col items-center justify-center">
                    {/* Close Button (X Icon) */}
                    <div className="absolute top-4 right-4">
                        <EqualsIconComponent
                            isEqualsMenuOpen={isEqualsMenuOpen}
                            handleEqualsClick={handleEqualsClick}
                        />
                    </div>

                    {/* Centered Nav Links */}
                    <div className="flex flex-col items-center space-y-6 text-white text-sm">
                        <NavLinksComponent
                            navLinks={navLinks}
                            isEqualsMenuOpen={isEqualsMenuOpen}
                            closeMenu={closeMenu}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default GenericNavbarv2;
