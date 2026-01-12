import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Lio Roof Repairs | Professional Roofing Services UK',
  description: 'Expert roofing and roof repair services across the UK. Quality workmanship, reliable service, and competitive prices. Get a free quote today.',
  keywords: 'roof repairs, roofing services, UK roofers, roof maintenance, emergency roof repairs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
