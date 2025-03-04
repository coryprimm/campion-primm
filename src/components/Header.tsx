import React from 'react';
import { Montserrat, Libre_Baskerville } from 'next/font/google';
import Head from 'next/head';

// Configure the fonts with preload true
const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'block', // Forces the font to be displayed immediately
    preload: true,
    variable: '--font-montserrat',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    fallback: ['system-ui', 'arial'], // Fallback fonts that closely match Montserrat
});

const libreBaskerville = Libre_Baskerville({
    subsets: ['latin'],
    display: 'block', // Forces the font to be displayed immediately
    preload: true,
    variable: '--font-libre-baskerville',
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    fallback: ['Georgia', 'serif'], // Fallback fonts that closely match Libre Baskerville
});

const Header = () => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Campion: Publication Designer & Art Director</title>
                {/* Preload Adobe Fonts */}
                <link
                    rel="preload"
                    href="https://use.typekit.net/age6ozd.css"
                    as="style"
                />
                {/* Load Adobe Fonts */}
                <link
                    rel="stylesheet"
                    href="https://use.typekit.net/age6ozd.css"
                />
                <style>{`
          /* Force immediate font display */
          @font-face {
            font-display: block;
          }
          
          /* Hide content until fonts are loaded */
          .font-loading {
            opacity: 0;
          }
          
          .fonts-loaded {
            opacity: 1;
            transition: opacity 0.2s ease-in;
          }
        `}</style>
            </Head>
            <style jsx global>{`
                :root {
                    --font-montserrat: ${montserrat.style.fontFamily};
                    --font-libre-baskerville: ${libreBaskerville.style
                        .fontFamily};
                }
            `}</style>
        </>
    );
};
// Define the type for the props of RootLayout
interface RootLayoutProps {
    children: React.ReactNode;
}

// Usage in your _app.js or layout.js
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html
            lang="en"
            className={`${montserrat.variable} ${libreBaskerville.variable}`}
        >
            <body>
                <Header />
                <main className={`${montserrat.className}`}>{children}</main>
            </body>
        </html>
    );
};

export default Header;
