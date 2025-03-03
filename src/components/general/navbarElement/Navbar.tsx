import React, { useEffect, useState } from 'react';
import GenericNavbarv2 from './GenericNavbaralpha';

const Navbar = () => {
    const navLinks = [
        { href: '/vivmag', text: 'VIVMAG' },
        { href: '/bonappetit', text: 'BON APPÉTIT' },
        { href: '/naturalhealth', text: 'NATURAL HEALTH' },
        { href: '/contact', text: 'CONTACT' },
    ];

    const [logoSize, setLogoSize] = useState(30);

    useEffect(() => {
        const updateSize = () => {
            setLogoSize(window.innerWidth >= 768 ? 50 : 30);
        };

        updateSize(); // Set initial size
        window.addEventListener('resize', updateSize);

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 w-full z-[1000] bg-black">
            <GenericNavbarv2
                logoSrc="/white-logo.png"
                logoAlt="Logo"
                logoWidth={logoSize}
                logoHeight={logoSize}
                navLinks={navLinks}
            />
        </div>
    );
};

export default Navbar;
