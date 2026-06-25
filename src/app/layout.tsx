import React from 'react';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AEC Group | Professional Packaging Film Supplier',
  description: 'Professional supplier of BOPP, BOPET, BOPS, CPP, POF films and tape products for packaging industry.',
  keywords: 'BOPP film, BOPET film, BOPS film, CPP film, POF film, packaging film, China manufacturer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.jpg" type="image/jpeg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
