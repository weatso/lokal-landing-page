import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'LOKAL — Ekosistem Digital untuk UMKM',
    template: '%s | LOKAL',
  },
  description:
    'Ekosistem terintegrasi untuk mengotomatiskan operasional UMKM Anda. Zero-friction — saking sederhananya, staf baru bisa menguasai dalam 3 menit.',
  metadataBase: new URL('https://pakailokal.com'),
  openGraph: {
    siteName: 'LOKAL',
    locale: 'id_ID',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
