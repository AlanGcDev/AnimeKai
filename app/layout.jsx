// components/Layout.js

import Script from 'next/script';
import "../public/css/animekai-main.css";
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import News from '@/components/News';
import NewsList from '@/components/NewsList';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9071856855843903"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <link rel="shortcut icon" href="image/animekai-favicong.png?v=1.0" type="image/x-icon" />
      </head>
      <body>
        <Nav></Nav>

        <div className="content">
          
          {children}
        </div>
        <Footer></Footer>
      </body>
    </html>
  );
}