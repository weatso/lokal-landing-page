import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Instagram } from 'lucide-react'

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '6285111326098'

const internalLinks = [
  { label: 'LOKAL POS F&B',     href: '/pos-fnb' },
  { label: 'Jasa Landing Page', href: '/jasa-landing-page' },
]

const collabLinks = [
  { label: 'LOKAL x Iwash',          href: '/iwash' },
  { label: 'LOKAL x ValetIndonesia', href: '/valet-indonesia' },
  { label: 'LOKAL x BrosurHub',      href: '/brosurhub' },
  { label: 'WA Blast',               href: '/wa-blast' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0a2626] text-white">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Image
              src="/lokal.png"
              alt="LOKAL"
              width={120}
              height={32}
              className="h-10 w-auto object-contain shrink-0 brightness-0 invert"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              Ekosistem digital untuk mengotomatiskan operasional UMKM Anda.
              Zero-friction. Tanpa training panjang.
            </p>
            <p className="text-[#E8681A] font-semibold text-sm">#pakailokalaja</p>
          </div>

          {/* Internal Products */}
          <div>
            <h4 className="font-bold text-white mb-4">Layanan LOKAL</h4>
            <ul className="flex flex-col gap-2">
              {internalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#E8681A] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collab Products */}
          <div>
            <h4 className="font-bold text-white mb-4">Produk Kolaborasi</h4>
            <ul className="flex flex-col gap-2">
              {collabLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-white/60 hover:text-[#E8681A] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Hubungi Kami</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-[#25D366] text-sm transition-colors duration-200"
                >
                  <Phone size={15} />
                  WhatsApp CS LOKAL
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/pakailokalaja?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-pink-400 text-sm transition-colors duration-200"
                >
                  <Instagram size={15} />
                  @pakailokalaja
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin size={15} className="shrink-0" />
                Semarang, Jawa Tengah
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-white/40 text-xs">
                Solusi enterprise?{' '}
                <a
                  href="https://weatso.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8681A] hover:underline"
                >
                  weatso.id
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} LOKAL by WEATSO. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">Khusus UMKM Indonesia 🇮🇩</p>
        </div>
      </div>
    </footer>
  )
}
