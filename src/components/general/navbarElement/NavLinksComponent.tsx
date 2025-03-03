import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NavLinksComponentProps {
    navLinks: { href: string; text: string }[];
    isEqualsMenuOpen: boolean;
    closeMenu?: () => void; // Make this optional since GenericNavbarv2 doesn't provide it
}

const NavLinksComponent: React.FC<NavLinksComponentProps> = ({
    navLinks,
    isEqualsMenuOpen,
    closeMenu,
}) => (
    <div
        className={cn(
            isEqualsMenuOpen ? 'flex flex-col' : 'hidden',
            'md:flex',
            'items-center',
            isEqualsMenuOpen ? 'space-y-6' : 'space-x-2'
        )}
    >
        {navLinks.map((link, index) => (
            <Link
                key={index}
                href={link.href}
                onClick={() => closeMenu && closeMenu()} // Only call closeMenu if it exists
                className={cn(
                    'px-4 py-2 rounded-md tracking-widest',
                    'text-white',
                    'transition-all duration-200',
                    'hover:text-white hover:underline hover:underline-offset-8 text-xs font-thin',
                    isEqualsMenuOpen ? 'text-lg text-white' : ''
                )}
            >
                {link.text}
            </Link>
        ))}
    </div>
);

export default NavLinksComponent;
