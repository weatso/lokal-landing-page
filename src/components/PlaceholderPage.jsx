import { Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Clock, Bell } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import SEO from '../components/SEO'

const WA_NUMBER = '6281234567890' // TODO: Ganti nomor WA

export default function PlaceholderPage({
  productName,
  tagline,
  description,
  icon: Icon,
  features = [],
  seoTitle,
  seoDescription,
  canonical,
  waMessage,
  accentColor = '#E8681A',
}) {
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    waMessage || `Halo LOKAL! Saya tertarik dengan ${productName}. Bisa info lebih lanjut?`
  )}`

  return (
    <>
      <SEO
        title={seoTitle || `${productName} | LOKAL`}
        description={seoDescription || description}
        canonical={canonical}
      />
      <Navbar />

      <main className="min-h-screen bg-[#FAFAFA] pt-24 pb-0">

        {/* Hero placeholder */}
        <section
          className="relative py-20 md:py-28 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #061c1c 0%, #0f3d3d 50%, #1A7A7A 100%)',
          }}
        >
          {/* Decorative blob */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ background: accentColor }}
          />

          <div className="section-container relative z-10 text-center">
            {/* Coming soon badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-sm font-semibold backdrop-blur-sm border"
              style={{
                background: 'rgba(232,104,26,0.15)',
                borderColor: 'rgba(232,104,26,0.3)',
                color: '#E8681A',
              }}
            >
              <Clock size={14} />
              Segera Hadir
            </div>

            {/* Icon */}
            <div
              className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
            >
              <Icon size={40} className="text-white" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              {productName}
            </h1>
            <p className="text-[#E8681A] font-semibold text-lg mb-6">{tagline}</p>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">{description}</p>
          </div>
        </section>

        {/* Features preview */}
        {features.length > 0 && (
          <section className="bg-white section-padding">
            <div className="section-container max-w-3xl">
              <div className="text-center mb-10">
                <div className="divider mx-auto mb-4" />
                <h2 className="section-title text-2xl">Yang Akan Tersedia</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 bg-[#FAFAFA] rounded-xl p-4 border border-[#1A7A7A]/10"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#1A7A7A]/10 flex items-center justify-center shrink-0">
                      <Bell size={16} className="text-[#1A7A7A]" />
                    </div>
                    <p className="text-sm text-[#333333] font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Early Interest CTA */}
        <section
          className="section-padding"
          style={{
            background: 'linear-gradient(135deg, #061c1c 0%, #0f3d3d 100%)',
          }}
        >
          <div className="section-container text-center max-w-xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Ingin Jadi yang{' '}
              <span style={{ color: '#E8681A' }}>Pertama Mencoba?</span>
            </h2>
            <p className="text-white/60 mb-8">
              Daftarkan minat Anda sekarang. Tim LOKAL akan menghubungi Anda langsung
              saat sistem ini siap diluncurkan — dan Anda mendapat akses prioritas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4"
              >
                <MessageCircle size={18} />
                Daftar Minat via WhatsApp
              </a>
              <Link to="/" className="btn-ghost text-white/60 hover:text-white">
                <ArrowLeft size={16} />
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
