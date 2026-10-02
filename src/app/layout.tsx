import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sristhi Saha | Frontend Developer & AI Engineer',
  description: 'Personal developer portfolio of Sristhi Saha — Frontend Developer at Orbital Webworks, crafting scalable Next.js platforms with GSAP, ScrollTrigger, Framer Motion, and autonomous Gemini AI systems.',
  keywords: [
    'Sristhi Saha',
    'Frontend Developer',
    'Next.js',
    'React',
    'GSAP',
    'ScrollTrigger',
    'Framer Motion',
    'Orbital Webworks',
    'Gemini AI',
    'Portfolio',
  ],
  authors: [{ name: 'Sristhi Saha', url: 'https://github.com/SristhiSaha' }],
  creator: 'Sristhi Saha',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sristhi.dev',
    title: 'Sristhi Saha | Frontend Developer & AI Engineer',
    description: 'Crafting high-performance Next.js interfaces, GSAP ScrollTrigger animations, and autonomous AI architectures.',
    siteName: 'Sristhi Saha Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sristhi Saha | Frontend Developer & AI Engineer',
    description: 'Crafting high-performance Next.js interfaces, GSAP ScrollTrigger animations, and autonomous AI architectures.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
