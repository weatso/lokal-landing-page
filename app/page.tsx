import type { Metadata } from 'next'
import {
  CheckCircle2, ArrowDown, ArrowRight, MessageCircle,
  Shield, ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'

export const metadata: Metadata = {
  title: 'LOKAL — Digitalisasi Bisnis UMKM Tanpa Bikin Pusing',
  description:
    'Ekosistem digital untuk mengotomatiskan operasional UMKM Anda. Zero-friction — staf baru bisa menguasai dalam 3 menit. Kasir F&B, Cuci Mobil, Valet, Brosur Digital.',
  alternates: { canonical: '/' },
}

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '6285111326098'

const products = [
  {
    logo: '/logo-produk/lokal-web.webp',
    title: 'LOKAL Web Studio',
    description:
      'Pembuatan website / landing page profesional, cepat, dan berorientasi pada konversi penjualan. Terima beres termasuk copywriting dan hosting.',
    ctaLabel: 'Bikin Website Sekarang',
    href: '/jasa-landing-page',
  },
  {
    logo: '/logo-produk/lokal-pos.webp',
    title: 'Lokal F&B',
    description:
      'Otomatiskan pencatatan pesanan, pantau ketersediaan stok, dan amankan laporan shift harian resto Anda dari mana saja secara real-time.',
    ctaLabel: 'Kunci Laci Kasir Saya',
    href: '/pos-fnb',
  },
  {
    logo: '/logo-produk/lokal-pos.webp',
    title: 'LOKAL Retail',
    preTitle: 'Segera Hadir!',
    description:
      'Sistem kasir cerdas terintegrasi barcode scanner dengan pengunci stok otomatis untuk minimarket, vape store, pet shop, dan retail modern.',
    ctaLabel: 'Lihat Sneak Peek',
    href: '/pos-retail',
    blurLogo: true,
  },
  {
    logo: '/logo-produk/lokal-pos.webp',
    title: 'LOKAL Beauty',
    preTitle: 'Segera Hadir!',
    description:
      'Otomatisasi manajemen salon dan barbershop dengan auto-split komisi kapster, sistem member Poin VIP, dan struk digital interaktif.',
    ctaLabel: 'Lihat Sneak Peek',
    href: '/pos-beauty',
    blurLogo: true,
  },
  {
    logo: '/logo-produk/i-wash.png',
    title: 'LOKAL x Iwash',
    description:
      'Lacak antrean kendaraan yang masuk dan biarkan sistem menghitung pembagian komisi karyawan Anda secara presisi setiap akhir shift.',
    ctaLabel: 'Atur Cuci Mobil',
    href: '/iwash',
    isCollab: true,
  },
  {
    logo: '/logo-produk/valet-indonesia.png',
    title: 'LOKAL x ValetIndonesia',
    description:
      'Tinggalkan tiket kertas. Berikan pengalaman premium dengan sistem serah-terima dan pelacakan karcis kendaraan digital via WhatsApp.',
    ctaLabel: 'Digitalisasi Valet',
    href: '/valet-indonesia',
    isCollab: true,
  },
  {
    logo: '/logo-produk/brosur-hub.jpg',
    title: 'LOKAL x BrosurHub',
    description:
      'Brosur digital interaktif. Bagikan profil, katalog menu, atau portofolio bisnis dengan QR code yang bisa di-scan kapan saja.',
    ctaLabel: 'Buat Profil Digital',
    href: '/brosurhub',
    cover: true,
    isCollab: true,
  },
  {
    logo: '/logo-produk/wa-blast.webp',
    title: <>LOKAL x BrosurHub <span className="text-[#E8681A]">(WhatsApp Blast)</span></>,
    description:
      'Kirim promosi ke ribuan kontak database Anda dalam hitungan jam. Aman dari banned, bebas pilih segmen area, lengkap dengan laporan pengiriman.',
    ctaLabel: 'Kirim Blast Promo',
    href: '/wa-blast',
    isCollab: true,
  },
]

const problems = [
  { label: 'Pencatatan harian masih manual menggunakan kertas' },
  { label: 'Rekapitulasi omzet yang lambat dan rawan selisih' },
  { label: 'Kesulitan melacak antrean atau progres operasional' },
  { label: 'Perhitungan bagi hasil / komisi karyawan yang rumit' },
]

const consultationMsg = encodeURIComponent(
  'Halo tim LOKAL, saya ingin konsultasi mengenai sistem yang cocok untuk operasional usaha saya.'
)

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #061c1c 0%, #0f3d3d 45%, #1A7A7A 100%)' }}
      >
        <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: '#E8681A' }} />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: '#2fa8a7' }} />

        <div className="section-container relative z-10 pt-28 pb-16 text-center max-w-5xl w-full">
          <div className="inline-block bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-8 text-sm backdrop-blur-sm text-white/90 tracking-wide">
            #pakai<span className="text-[#E8681A]">lokal</span>aja
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Digitalisasi Bisnis<br />
            <span style={{ color: '#E8681A' }}>Tanpa Bikin</span>{' '}
            Pusing Kepala.
          </h1>

          <p className="max-w-2xl mx-auto text-white/75 text-base md:text-xl leading-relaxed mb-10 px-2">
            Ekosistem terintegrasi untuk mengotomatiskan operasional UMKM Anda.
            Kami membangun sistem ini dengan prinsip{' '}
            <span className="text-white font-semibold">zero-friction</span> — saking
            sederhananya, staf lapangan baru tanpa pengalaman teknologi apa pun bisa
            langsung menguasainya{' '}
            <span className="text-[#E8681A] font-semibold">di bawah 3 menit</span>.
          </p>

          <div className="max-w-3xl mx-auto bg-black/20 border border-[#E8681A]/30 rounded-2xl p-4 md:p-6 mb-8 backdrop-blur-sm text-left flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-[#E8681A]/20 flex items-center justify-center mt-0.5">
              <Shield size={20} className="text-[#E8681A]" />
            </div>
            <div>
              <p className="font-bold text-[#E8681A] text-sm uppercase tracking-widest mb-1">
                Penting — Khusus UMKM
              </p>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                LOKAL dirancang khusus demi kelincahan operasional UMKM. Jika Anda adalah korporasi besar skala enterprise, sistem ini tidak akan cocok untuk Anda.{' '}
                <a href="https://weatso.id" target="_blank" rel="noopener noreferrer" className="text-[#E8681A] hover:underline font-semibold whitespace-nowrap">
                  Ke WEATSO <ExternalLink size={14} className="inline pb-0.5" />
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
            <a href="#routing" className="btn-primary text-base px-8 py-4 w-full sm:w-auto justify-center">
              Pilih Solusi Bisnis Anda
              <ArrowDown size={18} className="animate-bounce" />
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${consultationMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white font-semibold transition-colors duration-200 border border-white/20 hover:border-white/50 rounded-xl px-8 py-4 backdrop-blur-sm w-full sm:w-auto"
            >
              <MessageCircle size={18} />
              Konsultasi via WA
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs animate-bounce">
          <ArrowDown size={18} />
        </div>
      </section>

      {/* ═══ CORE PROBLEM ═══ */}
      <section id="masalah" className="bg-white section-padding">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="divider mb-6" />
              <h2 className="section-title mb-4">
                Berhenti Pusing Mengurus Operasional Manual.{' '}
                <span className="text-[#E8681A]">Biarkan Sistem yang Bekerja.</span>
              </h2>
              <p className="section-subtitle text-[#333333]/70">
                Bisnis terhambat bukan karena kurang pembeli, tapi karena{' '}
                <strong>operasional yang berantakan</strong>. LOKAL mengotomatiskan tugas-tugas
                administratif tersebut, sehingga Anda dan tim bisa kembali fokus melayani
                pelanggan dan mengembangkan skala bisnis.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {problems.map((p) => (
                <div key={p.label} className="flex items-center gap-4 bg-[#FAFAFA] rounded-2xl p-5 border border-[#1A7A7A]/10 hover:border-[#1A7A7A]/30 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#E8681A]/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} className="text-[#E8681A]" />
                  </div>
                  <p className="text-sm font-medium text-[#333333] leading-snug">{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section id="routing" className="bg-[#FAFAFA] section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="divider mx-auto mb-6" />
            <h2 className="section-title mb-4">Pilih Jalur Penyelamatan Anda:</h2>
            <p className="text-[#333333]/60 max-w-xl mx-auto">
              Setiap produk LOKAL dibangun khusus untuk satu jenis bisnis. Pilih yang sesuai
              dengan operasional Anda.
            </p>
          </div>

          <div className="flex flex-col gap-6 max-w-4xl mx-auto mb-16">
            {products.filter(p => !p.isCollab).map((product) => (
              <ProductCard key={product.href} {...product} />
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A7A7A]">🤝 Produk Kolaborasi Resmi</h2>
            <p className="text-[#333333]/60 max-w-xl mx-auto">
              Kami juga bermitra dengan vendor spesialis untuk menyediakan ekosistem terintegrasi bagi operasional spesifik Anda.
            </p>
          </div>

          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {products.filter(p => p.isCollab).map((product) => (
              <ProductCard key={product.href} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section
        id="kontak"
        className="section-padding"
        style={{ background: 'linear-gradient(135deg, #061c1c 0%, #0f3d3d 50%, #1A7A7A 100%)' }}
      >
        <div className="section-container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Belum Menemukan Solusi yang{' '}
              <span style={{ color: '#E8681A' }}>Pas?</span>
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
              Setiap UMKM memiliki alur kerja yang unik. Ceritakan kendala operasional Anda
              kepada tim kami, dan mari kita cari solusinya bersama.
            </p>

            <a
              href={`https://wa.me/${WA_NUMBER}?text=${consultationMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4 mx-auto"
            >
              <MessageCircle size={20} />
              Konsultasi via WhatsApp
              <ArrowRight size={18} />
            </a>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/50 text-sm">
              {['✓ 100% Gratis Konsultasi', '✓ Pendekatan personal sesuai bisnis', '✓ Tanpa komitmen apapun'].map(
                (item) => <span key={item}>{item}</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
