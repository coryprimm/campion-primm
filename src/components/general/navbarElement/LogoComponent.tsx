import React from 'react';
import Image from 'next/image'; // Import the Image component from Next.js

interface LogoComponentProps {
    logoSrc: string | StaticImageData;
    logoAlt?: string;
    logoWidth?: number;
    logoHeight?: number;
    isEqualsMenuOpen: boolean;
}

const LogoComponent: React.FC<LogoComponentProps> = ({
    logoSrc,
    logoAlt = 'Logo',
    logoWidth = '150px',
    logoHeight = '150px',
    isEqualsMenuOpen,
}) => (
    // Your component code
    <Image
        src={isEqualsMenuOpen ? '/reverse-logo.png' : logoSrc}
        alt={logoAlt}
        width={logoWidth}
        height={logoHeight}
        className="h-auto transition-transform duration-200 hover:scale-105"
        priority // Add the priority attribute here
    />
);

export default LogoComponent;
