import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 — Halaman Tidak Ditemukan | LOKAL"
        description="Halaman yang Anda cari tidak ditemukan. Kembali ke beranda LOKAL."
        canonical="/404"
      />
      <Navbar />

      <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center pt-20">
        <div className="section-container text-center py-20">
          {/* 404 visual */}
          <div
            className="text-[120px] md:text-[180px] font-extrabold leading-none mb-4 select-none"
            style={{
              background: 'linear-gradient(135deg, #1A7A7A, #E8681A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </div>

          <img
            src="/lokal.png"
            alt="LOKAL"
            className="w-28 mx-auto mb-6 opacity-40"
          />

          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A7A7A] mb-3">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-[#333333]/60 max-w-md mx-auto mb-8 leading-relaxed">
            Halaman yang Anda cari mungkin sudah dipindahkan atau tidak tersedia.
            Jangan khawatir — kembali ke beranda dan temukan solusi yang Anda butuhkan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-primary px-8 py-4">
              <Home size={18} />
              Kembali ke Beranda
            </Link>
            <Link to="/portal" className="btn-outline px-8 py-4">
              <Search size={18} />
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
