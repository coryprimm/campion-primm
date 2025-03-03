// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head />
            <body>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
            (function() {
              document.documentElement.classList.add('font-loading');
              if (document.fonts) {
                Promise.all([
                  document.fonts.load('1px Montserrat'),
                  document.fonts.load('1px "Libre Baskerville"')
                ]).then(() => {
                  document.documentElement.classList.remove('font-loading');
                  document.documentElement.classList.add('fonts-loaded');
                });
              } else {
                document.documentElement.classList.remove('font-loading');
                document.documentElement.classList.add('fonts-loaded');
              }
            })();
          `,
                    }}
                />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
