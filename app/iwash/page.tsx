'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, MessageCircle, ShieldCheck, Tag, MonitorSmartphone, Users, BarChart3, Package, Crown } from 'lucide-react'
import Image from 'next/image'
import PromoCodeInput from '@/components/PromoCodeInput'

interface PromoCode  { id: string; code: string; discount: number; isActive: boolean }
interface PricingData { basePrices: { id: string; area: string; price: number }[]; promoCodes: PromoCode[] }

const DEFAULT: PricingData = {
  basePrices:  [
    { id: '1', area: 'Starter',    price: 599000 },
    { id: '2', area: 'Pro',        price: 799000 },
    { id: '3', area: 'Enterprise', price: 999000 },
  ],
  promoCodes: [{ id: 'p1', code: 'IWASHLOKAL', discount: 20, isActive: true }],
}

const fmt = (p: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(p)

const PLANS = [
  { name: 'Starter',    price: 599000, perTx: 'Rp 3.000/transaksi', tagline: 'Untuk usaha kecil yang baru memulai',   popular: false, features: ['POS & Kasir', 'Manajemen Layanan', 'Laporan Dasar'] },
  { name: 'Pro',        price: 799000, perTx: 'Rp 2.000/transaksi', tagline: 'Untuk usaha yang berkembang dan membutuhkan fitur lebih lengkap', popular: true,  features: ['Semua fitur Starter', 'Notifikasi WhatsApp', 'Manajemen Karyawan & Komisi', 'Laporan Keuangan Lengkap'] },
  { name: 'Enterprise', price: 999000, perTx: 'Rp 1.000/transaksi', tagline: 'Untuk operasional besar dengan kebutuhan khusus',               popular: false, features: ['Semua fitur Pro', 'White Label', 'API Akses', 'Dukungan Prioritas'] },
]

const FEATURES = [
  { Icon: MonitorSmartphone, color: 'text-blue-600',   bg: 'bg-blue-100',   title: 'POS & Kasir Canggih',   desc: 'Catat transaksi dengan cepat, dukung pembayaran QRIS, cetak struk thermal, dan hitung kembalian otomatis.' },
  { Icon: MessageCircle,     color: 'text-green-600',  bg: 'bg-green-100',  title: 'Notifikasi WhatsApp',   desc: 'Kirim pesan otomatis ke pelanggan saat kendaraan diterima, diproses, dan selesai dikerjakan.' },
  { Icon: Users,             color: 'text-purple-600', bg: 'bg-purple-100', title: 'Manajemen Karyawan',    desc: 'Hitung komisi karyawan secara otomatis berdasarkan layanan yang dikerjakan. Mendukung absensi digital.' },
  { Icon: BarChart3,         color: 'text-orange-600', bg: 'bg-orange-100', title: 'Laporan Keuangan',      desc: 'Pantau omset harian, bulanan, laba rugi, dan arus kas secara real-time. Export data ke Excel/PDF.' },
  { Icon: Crown,             color: 'text-pink-600',   bg: 'bg-pink-100',   title: 'Membership Pelanggan', desc: 'Simpan data pelanggan, riwayat kunjungan, dan berikan benefit loyalti agar pelanggan lebih sering kembali.' },
  { Icon: Package,           color: 'text-teal-600',   bg: 'bg-teal-100',   title: 'Stok & Inventori',     desc: 'Kelola stok produk (shampoo, semir, parfum) dan pantau penjualan produk ritel Anda langsung di kasir.' },
]

export default function IwashPage() {
  const [pricing, setPricing]           = useState<PricingData>(DEFAULT)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [appliedPromo, setAppliedPromo]   = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('lokal_pricing_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<string, PricingData>
        if (parsed['iwash']) {
          const d = parsed['iwash']
          if (!d.promoCodes) d.promoCodes = DEFAULT.promoCodes
          setPricing(d)
        }
      } catch { /* use defaults */ }
    }
  }, [])

  const handleConsultation = (paket = '') => {
    const promoText = appliedPromo ? ` (Kode Promo: ${appliedPromo}, Diskon ${promoDiscount}%)` : ''
    const msg = `Halo LOKAL, saya tertarik dengan paket ${paket || 'sistem iWash'}${promoText}. Mohon info cara pendaftarannya.`
    window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-[#333333] flex flex-col selection:bg-[#E8681A] selection:text-white">
      <main className="flex-grow pt-24 pb-16">

        {/* Hero */}
        <section className="px-4 mb-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="flex items-center gap-4 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lokal.png" alt="LOKAL" className="h-6 object-contain" />
                <span className="text-gray-300 font-light text-2xl">×</span>
                <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo-produk/i-wash.png" alt="Iwash" className="h-8 object-contain" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Kelola Cuci Mobil<br />
                <span className="text-blue-600">Jadi Lebih Mudah.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Satu aplikasi untuk semua kebutuhan operasional bisnis cuci mobil dan detailing Anda. Pantau transaksi, komisi karyawan, dan laporan keuangan secara real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#pricing" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 flex items-center justify-center">Lihat Harga & Promo</a>
                <a href="https://iwash.id/#demo" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 border-2 border-blue-100 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition flex items-center justify-center">Masuk Live Demo</a>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="aspect-[4/3] bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-green-400" /></div>
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo-produk/i-wash.png" alt="iWash" className="h-4 object-contain" />
                    <div className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs font-bold">Live</div>
                  </div>
                </div>
                <div className="flex gap-3 flex-1 min-h-0">
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="text-xs font-bold text-gray-500 mb-1">Antrian Hari Ini</div>
                    {[
                      { plate: 'B 1234 XY', service: 'Cuci Salju',  status: 'Selesai', color: 'green' },
                      { plate: 'D 5678 AB', service: 'Premium Wax', status: 'Proses',  color: 'blue' },
                      { plate: 'F 9012 CD', service: 'Interior',    status: 'Antre',   color: 'yellow' },
                    ].map((item, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-2.5 border border-gray-100 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${item.color === 'green' ? 'bg-green-500' : item.color === 'blue' ? 'bg-blue-500' : 'bg-yellow-400'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-gray-800 truncate">{item.plate}</div>
                          <div className="text-[10px] text-gray-400 truncate">{item.service}</div>
                        </div>
                        <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${item.color === 'green' ? 'bg-green-100 text-green-700' : item.color === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status}</div>
                      </div>
                    ))}
                  </div>
                  <div className="w-28 flex flex-col gap-2">
                    <div className="bg-blue-600 rounded-xl p-2.5 text-white">
                      <div className="text-[9px] opacity-70 mb-0.5">Omset Hari Ini</div>
                      <div className="text-sm font-black">Rp 840k</div>
                      <div className="text-[9px] opacity-70 mt-1">↑ 12% vs kemarin</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 animate-[bounce_3s_infinite]">
                <div className="bg-green-100 text-green-600 p-1.5 rounded-lg"><MessageCircle size={14} /></div>
                <div><div className="text-[10px] text-gray-400">WA Terkirim</div><div className="text-xs font-bold">Kendaraan Siap ✓</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fitur Lengkap untuk Skala Bisnis Apapun</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Dari pencucian rumahan hingga workshop detailing profesional, iWash siap mendukung operasional Anda.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ Icon, color, bg, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center mb-6`}><Icon size={24} /></div>
                <h3 className="font-bold text-lg mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="max-w-6xl mx-auto px-4 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pilihan Paket iWash</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Harga berlangganan per bulan. Sudah termasuk semua update fitur dan support teknis.</p>
          </div>

          {pricing.promoCodes.length > 0 && (
            <div className="max-w-xl mx-auto mb-10">
              <PromoCodeInput
                promoCodes={pricing.promoCodes}
                onApply={(d, c) => { setPromoDiscount(d); setAppliedPromo(c) }}
                onClear={() => { setPromoDiscount(0); setAppliedPromo('') }}
              />
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map(pkg => {
              const finalPrice = pkg.price * (1 - promoDiscount / 100)
              return (
                <div key={pkg.name} className={`bg-white rounded-3xl p-8 border-2 shadow-sm flex flex-col transition relative ${pkg.popular ? 'border-blue-500 shadow-blue-500/20' : 'border-gray-100 hover:shadow-md'}`}>
                  {pkg.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-black px-4 py-1.5 rounded-full tracking-widest">POPULAR</div>}
                  <h3 className={`text-2xl font-black mb-1 ${pkg.popular ? 'text-blue-600' : 'text-gray-800'}`}>{pkg.name}</h3>
                  <p className="text-xs text-gray-400 mb-4">{pkg.tagline}</p>
                  <div className="my-5 pb-5 border-b border-gray-100">
                    {promoDiscount > 0 && <div className="text-sm text-gray-400 line-through mb-0.5">{fmt(pkg.price)}/bulan</div>}
                    <div className={`text-3xl font-black ${promoDiscount > 0 ? 'text-green-600' : pkg.popular ? 'text-blue-600' : 'text-gray-900'}`}>
                      {fmt(finalPrice)}<span className="text-base font-semibold text-gray-400">/bulan</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{pkg.perTx}</div>
                  </div>
                  <ul className="flex-1 space-y-2.5 mb-6">
                    {pkg.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${pkg.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                          <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleConsultation(`iWash ${pkg.name} — ${fmt(finalPrice)}/bulan`)}
                    className={`w-full py-3.5 rounded-xl font-bold transition ${pkg.popular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30' : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'}`}
                  >
                    Konsultasi Paket {pkg.name}
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        {/* Promo Bridge */}
        <section id="promo" className="max-w-4xl mx-auto px-4 mb-16">
          <div className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 text-white">
                <div className="inline-block bg-[#E8681A]/20 text-[#E8681A] px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 border border-[#E8681A]/30">PENAWARAN SPESIAL LOKAL</div>
                <h2 className="text-3xl font-bold mb-6">Mengapa Daftar via LOKAL?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Tag className="text-[#E8681A] shrink-0 mt-1" size={20} />
                    <div><h3 className="font-bold text-lg">Diskon Eksklusif</h3><p className="text-sm text-gray-400 mt-1">Dapatkan penawaran harga dan potongan kupon khusus yang tidak tersedia jika Anda mendaftar sendiri.</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="text-blue-400 shrink-0 mt-1" size={20} />
                    <div><h3 className="font-bold text-lg">Aftersales Prioritas</h3><p className="text-sm text-gray-400 mt-1">Tim LOKAL akan membantu Anda dari proses setup awal hingga training karyawan Anda secara langsung.</p></div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-80 flex flex-col gap-4">
                <button onClick={() => handleConsultation()} className="w-full bg-[#E8681A] hover:bg-[#c95914] text-white py-4 px-6 rounded-xl font-bold transition shadow-lg flex items-center justify-center gap-2">
                  <MessageCircle size={20} /> Konsultasi via WhatsApp
                </button>
                <a href="https://iwash.id/#demo" target="_blank" rel="noopener noreferrer" className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-4 px-6 rounded-xl font-bold transition flex items-center justify-center gap-2">
                  Coba Live Demo iWash <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
