import { ArrowRight, Phone } from 'lucide-react'
import SEO from '../components/SEO'

const WA_NUMBER = '6281234567890' // TODO: Ganti nomor WA

const links = [
  {
    id: 'pos-fnb',
    label: 'Aplikasi Kasir Kafe/Resto (LOKAL POS)',
    href: '/pos-fnb',
    emoji: '🍽️',
    isInternal: true,
  },
  {
    id: 'iwash',
    label: 'Sistem Manajemen Cuci Mobil (Iwash)',
    href: '/iwash',
    emoji: '🚗',
    isInternal: true,
  },
  {
    id: 'valet',
    label: 'Sistem Tiket Digital Valet (ValetIndonesia)',
    href: '/valet-indonesia',
    emoji: '🎫',
    isInternal: true,
  },
  {
    id: 'brosurhub',
    label: 'Kirim Brosur Digital & WA Blasting (BrosurHub)',
    href: '/brosurhub',
    emoji: '📢',
    isInternal: true,
  },
  {
    id: 'demo',
    label: '📞 Undang Tim LOKAL ke Warung Anda (Demo Gratis)',
    href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo LOKAL! Saya ingin mengundang tim untuk demo gratis di warung saya.')}`,
    emoji: '',
    isInternal: false,
    isHighlight: true,
  },
]

export default function Portal() {
  return (
    <>
      <SEO
        title="LOKAL — Link Hub | #pakailokalaja"
        description="Semua solusi LOKAL dalam satu halaman. Kasir F&B, Cuci Mobil, Rental, Valet, Brosur Digital untuk UMKM."
        canonical="/portal"
      />

      {/* Standalone — no Navbar or Footer */}
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center px-4 py-10">

        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <img
            src="/lokal.png"
            alt="LOKAL"
            className="w-36 mb-4"
            width="144"
            height="48"
          />
          <p className="text-[#1A7A7A] font-semibold text-base tracking-widest">#pakailokalaja</p>
          <p className="text-[#333333]/50 text-sm mt-1 text-center">
            Ekosistem digital untuk UMKM Indonesia
          </p>
        </div>

        {/* Link Buttons */}
        <div className="w-full max-w-sm flex flex-col gap-3">
          {links.map((link) => {
            const Tag = link.isInternal ? 'a' : 'a'
            return (
              <a
                key={link.id}
                href={link.isInternal ? link.href : link.href}
                {...(!link.isInternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className={`btn-portal ${
                  link.isHighlight
                    ? 'bg-[#E8681A] hover:bg-[#C7551A] shadow-lg shadow-orange-200'
                    : ''
                }`}
              >
                {link.emoji && <span className="text-xl">{link.emoji}</span>}
                <span className="text-center leading-snug">{link.label}</span>
                {!link.isHighlight && <ArrowRight size={16} className="shrink-0 ml-auto opacity-60" />}
              </a>
            )
          })}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-[#333333]/35 text-xs max-w-xs leading-relaxed">
          Khusus Solusi Korporasi Besar/Enterprise, silakan akses{' '}
          <a
            href="https://weatso.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1A7A7A] hover:underline"
          >
            weatso.id
          </a>
        </p>
      </div>
    </>
  )
}
