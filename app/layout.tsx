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
