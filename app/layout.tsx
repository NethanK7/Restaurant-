import type { Metadata } from 'next'
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import ScrollProgress from '@/components/ui/ScrollProgress'
import PageTransition from '@/components/layout/PageTransition'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ZAFRAN — Where Two Civilizations Dine',
  description: 'Born from the ancient spice routes that once connected Mumbai to Muscat. ZAFRAN is not a restaurant — it is a rite of passage.',
  openGraph: {
    title: 'ZAFRAN — Where Two Civilizations Dine',
    description: 'Ultra-luxury Indian and Arabic fusion fine dining. Where the spice routes meet.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-obsidian text-ivory font-body antialiased">
        <SmoothScrollProvider>
          <ScrollProgress />
          <Navigation />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
