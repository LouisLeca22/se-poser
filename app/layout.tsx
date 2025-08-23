import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { ClerkProvider } from "@clerk/nextjs"
import { frFR } from '@clerk/localizations'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Se poser',
  description: 'Sentez-vous chez vous, même loin de chez vous.',
  openGraph: {
    title: 'Se poser',
    description: 'Sentez-vous chez vous, même loin de chez vous.',
    url: 'https://se-poser.vercel.app',
    siteName: 'Se poser',
    images: [
      {
        url: 'https://se-poser.vercel.app/images/preview.png',
        width: 1200,
        height: 630,
        alt: 'Aperçu de Se poser',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Se poser',
    description: 'Sentez-vous chez vous, même loin de chez vous.',
    images: ['https://se-poser.vercel.app/images/preview.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang='fr' suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
