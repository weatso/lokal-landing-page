import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'LOKAL — Link Hub | #pakailokalaja',
  description: 'Semua solusi LOKAL dalam satu halaman. Kasir F&B, Cuci Mobil, Rental, Valet, Brosur Digital untuk UMKM.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/portal' },
}

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '6285111326098'

const links = [
  { id: 'pos-fnb',    label: 'Aplikasi Kasir Kafe/Resto (LOKAL POS)',       href: '/pos-fnb',           emoji: '🍽️', isInternal: true },
  { id: 'iwash',     label: 'Sistem Manajemen Cuci Mobil (Iwash)',           href: '/iwash',              emoji: '🚗', isInternal: true },
  { id: 'valet',     label: 'Sistem Tiket Digital Valet (ValetIndonesia)',   href: '/valet-indonesia',   emoji: '🎫', isInternal: true },
  { id: 'brosurhub', label: 'Kirim Brosur Digital & WA Blasting (BrosurHub)',href: '/brosurhub',         emoji: '📢', isInternal: true },
  {
    id: 'demo',
    label: '📞 Undang Tim LOKAL ke Warung Anda (Demo Gratis)',
    href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo LOKAL! Saya ingin mengundang tim untuk demo gratis di warung saya.')}`,
    emoji: '',
    isInternal: false,
    isHighlight: true,
  },
]

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center px-4 py-10 font-sans">
      {/* Header */}
      <div className="flex flex-col items-center mb-10">
        <Image src="/lokal.png" alt="LOKAL" width={144} height={48} className="w-36 mb-4" priority />
        <p className="text-[#1A7A7A] font-semibold text-base tracking-widest">#pakailokalaja</p>
        <p className="text-[#333333]/50 text-sm mt-1 text-center">Ekosistem digital untuk UMKM Indonesia</p>
      </div>

      {/* Links */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        {links.map(link => (
          link.isInternal ? (
            <Link
              key={link.id}
              href={link.href}
              className="btn-portal"
            >
              {link.emoji && <span className="text-xl">{link.emoji}</span>}
              <span className="text-center leading-snug">{link.label}</span>
              <ArrowRight size={16} className="shrink-0 ml-auto opacity-60" />
            </Link>
          ) : (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-portal ${'isHighlight' in link && link.isHighlight ? 'bg-[#E8681A] hover:bg-[#C7551A] shadow-lg shadow-orange-200' : ''}`}
            >
              <span className="text-center leading-snug">{link.label}</span>
            </a>
          )
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-10 text-center text-[#333333]/35 text-xs max-w-xs leading-relaxed">
        Khusus Solusi Korporasi Besar/Enterprise, silakan akses{' '}
        <a href="https://weatso.id" target="_blank" rel="noopener noreferrer" className="text-[#1A7A7A] hover:underline">
          weatso.id
        </a>
      </p>
    </div>
  )
}
