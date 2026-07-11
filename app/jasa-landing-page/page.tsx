import type { Metadata } from 'next'
import { Layout, PenTool, Smartphone, Globe, Zap, CheckCircle2, FileText, RefreshCw, MessageCircle, Video, ShieldCheck } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Landing Page | LOKAL Web Studio',
  description:
    'Jasa pembuatan landing page profesional, cepat, dan berorientasi pada konversi penjualan. Terima beres termasuk copywriting dan hosting.',
  alternates: { canonical: '/jasa-landing-page' },
}

const fmt = (p: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(p)

const WA = '6281234567890'

const features = [
  { Icon: PenTool,    bg: 'bg-indigo-100', color: 'text-indigo-600', title: 'Custom & Premium Design', desc: 'Desain dibuat khusus menyesuaikan identitas brand Anda, bukan sekadar menggunakan template pasaran yang kaku.' },
  { Icon: CheckCircle2, bg: 'bg-green-100', color: 'text-green-600', title: 'Copywriting Menjual',    desc: 'Struktur kata-kata disusun oleh tim copywriter kami dengan formula yang terbukti meningkatkan keinginan membeli.' },
  { Icon: Globe,      bg: 'bg-blue-100',   color: 'text-blue-600',   title: 'Gratis Domain & Hosting', desc: 'Terima beres. Harga sudah termasuk domain (.com / .id) dan cloud hosting super cepat selama 1 tahun penuh.' },
  { Icon: Zap,        bg: 'bg-orange-100', color: 'text-orange-600', title: 'SEO & Ads Ready',         desc: 'Struktur HTML bersih dan siap dipasangi Facebook Pixel, Google Analytics, maupun Tag Manager untuk iklan Anda.' },
]

import WebPricingCalculator from '@/components/WebPricingCalculator'

const CM = (
  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
    <path d="M1 3l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function JasaLandingPage() {
  const consultation = (paket = '') => {
    const paketText = paket ? ` mengenai paket ${paket}` : ''
    return `https://wa.me/${WA}?text=${encodeURIComponent(`Halo LOKAL, saya tertarik dengan Jasa Pembuatan Landing Page${paketText}. Mohon info selengkapnya.`)}`
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-[#333333] flex flex-col">
      <main className="flex-grow pt-24 pb-16">

        {/* Hero */}
        <section className="px-4 mb-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="mb-6 inline-block bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-produk/lokal-web.webp" alt="LOKAL Web Studio" className="h-8 object-contain" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
                Bikin Landing Page<br />
                <span className="text-indigo-600">Langsung Jualan.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Tidak perlu pusing mikirin coding, desain, atau copywriting. Serahkan pada ahlinya. Kami buatkan landing page yang dirancang khusus untuk mendatangkan lebih banyak pembeli.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#pricing" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/30 flex items-center justify-center">
                  Lihat Harga & Paket
                </a>
                <a href={consultation()} target="_blank" rel="noopener noreferrer" className="bg-white text-indigo-600 border-2 border-indigo-100 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition flex items-center justify-center">
                  Konsultasi Gratis
                </a>
              </div>
            </div>

            {/* Mockup */}
            <div className="relative">
              <div className="aspect-[4/3] bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 flex flex-col relative overflow-hidden transform rotate-1 hover:rotate-0 transition duration-500">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" /></div>
                  <div className="flex-1 bg-gray-50 rounded-md h-6 border border-gray-100 flex items-center px-2">
                    <div className="text-[10px] text-gray-400 font-mono">https://bisnismu.com</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="h-24 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 p-4 flex flex-col justify-center items-center text-center">
                    <div className="w-3/4 h-3 bg-indigo-200 rounded-full mb-2" />
                    <div className="w-1/2 h-2 bg-indigo-100 rounded-full mb-4" />
                    <div className="w-20 h-6 bg-indigo-600 rounded-md" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-16 bg-gray-50 rounded-xl border border-gray-100" />
                    <div className="h-16 bg-gray-50 rounded-xl border border-gray-100" />
                    <div className="h-16 bg-gray-50 rounded-xl border border-gray-100" />
                  </div>
                </div>
              </div>
              <div className="absolute -right-6 top-1/4 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 animate-[bounce_3s_infinite]">
                <div className="bg-green-100 text-green-600 p-1.5 rounded-lg"><Zap size={14} /></div>
                <div><div className="text-[10px] text-gray-400">Kecepatan</div><div className="text-xs font-bold">Fast Loading ⚡</div></div>
              </div>
              <div className="absolute -left-6 bottom-1/4 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 animate-[bounce_4s_infinite]">
                <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg"><Smartphone size={14} /></div>
                <div><div className="text-[10px] text-gray-400">Tampilan</div><div className="text-xs font-bold">Mobile Friendly 📱</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kenapa Memilih Jasa Kami?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Kami tidak sekadar mendesain web yang cantik, tapi web yang didesain secara spesifik untuk memancing konversi.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ Icon, bg, color, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center mb-6`}><Icon size={24} /></div>
                <h3 className="font-bold text-lg mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Calculator */}
        <section id="pricing">
          <WebPricingCalculator />
        </section>

        {/* SLA & Cara Kerja */}
        <section className="max-w-6xl mx-auto px-4 mt-24 mb-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">SLA & Ketentuan Layanan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Dengan menggunakan layanan LOKAL Web Studio, Anda menyetujui standar kerja berikut untuk memastikan kualitas dan kecepatan *delivery* project Anda.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4"><FileText size={20} /></div>
              <h3 className="font-bold text-gray-800 mb-2">Brief & Materi Klien</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Klien wajib memberikan materi (teks/info) yang jelas. Desain, layout, dan struktur visual adalah otoritas penuh tim LOKAL demi standar kualitas terbaik.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center mb-4"><RefreshCw size={20} /></div>
              <h3 className="font-bold text-gray-800 mb-2">Kebijakan Revisi</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Kami memberikan 1x revisi minor (ubah teks, warna, atau ganti foto). Kami tidak melayani perombakan ulang layout setelah desain pertama dikirim.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4"><MessageCircle size={20} /></div>
              <h3 className="font-bold text-gray-800 mb-2">Sistem Click-to-WA</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Seluruh web LOKAL murni menggunakan Click-to-WhatsApp (CTWA). Kami tidak menyediakan formulir database/Google Sheets untuk cegah spam.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center mb-4"><Video size={20} /></div>
              <h3 className="font-bold text-gray-800 mb-2">Video via YouTube</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Untuk menjaga kecepatan load web tetap di atas rata-rata, semua video wajib menggunakan sistem *embed* YouTube (bukan di-hosting langsung).</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm md:col-span-2 lg:col-span-2">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4"><ShieldCheck size={20} /></div>
              <h3 className="font-bold text-gray-800 mb-2">Bebas Pusing (Fully Maintained)</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Biaya tahunan sudah mencakup perpanjangan domain, hosting, dan keamanan SSL. Kami menjamin web Anda aktif 99.9% tanpa perlu Anda urus teknisnya sedikitpun.</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
