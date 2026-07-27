'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, MessageCircle, ShieldCheck, Tag, SmartphoneNfc, Clock, LineChart, Camera } from 'lucide-react'
import Image from 'next/image'
import PromoCodeInput from '@/components/PromoCodeInput'

interface PromoCode  { id: string; code: string; discount: number; isActive: boolean }
interface PricingData { basePrices: { id: string; area: string; price: number }[]; promoCodes: PromoCode[] }

const DEFAULT: PricingData = {
  basePrices:  [
    { id: '1', area: 'Harga Standar', price: 999000 },
    { id: '2', area: 'Harga Promo',  price: 299000 },
  ],
  promoCodes: [{ id: 'p1', code: 'VALET2024', discount: 25, isActive: true }],
}

const fmt = (p: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(p)

const MONTHLY_PRICE = 999000
const MONTHLY_FEATURES = ['Valet & Parkir (tiket masuk, checkout, invoice)', 'Presensi staf & histori transaksi', 'Branding venue (nama, alamat, logo)', 'Laporan operasional + reprint + e-ticket']
const CUSTOM_FEATURES  = ['Harga spesial untuk 2+ lokasi (penawaran korporat)', 'Branding khusus + kebutuhan operasional venue', 'Proses berlangganan & pembayaran via WhatsApp resmi']

export default function ValetIndonesiaPage() {
  const [pricing, setPricing]           = useState<PricingData>(DEFAULT)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [appliedPromo, setAppliedPromo]   = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('lokal_pricing_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<string, PricingData>
        if (parsed['valet-indonesia']) {
          const d = parsed['valet-indonesia']
          if (!d.promoCodes) d.promoCodes = DEFAULT.promoCodes
          setPricing(d)
        }
      } catch { /* use defaults */ }
    }
  }, [])

  const handleConsultation = (paket = '') => {
    const promoText = appliedPromo ? ` (Kode Promo: ${appliedPromo}, Diskon ${promoDiscount}%)` : ''
    const msg = `Halo LOKAL, saya tertarik dengan ${paket || 'sistem Valet Indonesia'}${promoText}. Mohon info cara berlangganan dan pembayarannya.`
    window.open(`https://wa.me/6285111326098?text=${msg}`, '_blank')
  }

  const CHECKMARK = (
    <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  )

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-[#333333] flex flex-col selection:bg-[#E8681A] selection:text-white">
      <main className="flex-grow pt-24 pb-16">

        {/* Hero */}
        <section className="px-4 mb-16 md:mb-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-4 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lokal.png" alt="LOKAL" className="h-6 object-contain" />
                <span className="text-gray-300 font-light text-2xl">×</span>
                <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo-produk/valet-indonesia.png" alt="ValetIndonesia" className="h-8 object-contain" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Parkir & Valet Lebih Cepat<br />
                <span className="text-indigo-600">dengan AI.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Platform SaaS untuk operasional valet/parkir: alur kendaraan masuk-keluar, check-in dengan kamera AI, reprint invoice, laporan arus, hingga presensi staf.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#pricing" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/30 flex items-center justify-center">Lihat Harga & Promo</a>
                <a href="https://valetindonesia.com/demo/?demo_role=admin" target="_blank" rel="noopener noreferrer" className="bg-white text-indigo-600 border-2 border-indigo-100 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition flex items-center justify-center">
                  Coba Demo Live <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>

            {/* Illustration — hidden on very small screens */}
            <div className="relative hidden sm:block">
              <div className="aspect-[4/3] bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-green-400" /></div>
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo-produk/valet-indonesia.png" alt="Valet Indonesia" className="h-4 object-contain" />
                    <div className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded text-xs font-bold">AI Scan</div>
                  </div>
                </div>
                <div className="flex gap-3 flex-1 min-h-0">
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="text-xs font-bold text-gray-500 mb-1">Peta Parkir — Lantai 1</div>
                    <div className="grid grid-cols-3 gap-1.5 flex-1">
                      {[
                        { id: 'A1', occupied: true,  plate: 'B 1234' },
                        { id: 'A2', occupied: true,  plate: 'D 5678' },
                        { id: 'A3', occupied: false, plate: null     },
                        { id: 'B1', occupied: false, plate: null     },
                        { id: 'B2', occupied: true,  plate: 'F 9012' },
                        { id: 'B3', occupied: false, plate: null     },
                      ].map(slot => (
                        <div key={slot.id} className={`rounded-lg p-1.5 border text-center flex flex-col items-center justify-center ${slot.occupied ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200 border-dashed'}`}>
                          <div className="text-[9px] font-bold text-gray-400">{slot.id}</div>
                          {slot.occupied
                            ? <><div className="w-8 h-4 bg-indigo-400 rounded-sm mt-0.5 mb-0.5" /><div className="text-[8px] font-bold text-indigo-700 truncate w-full text-center">{slot.plate}</div></>
                            : <div className="text-[9px] text-gray-400 mt-1">Kosong</div>
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-28 flex flex-col gap-2">
                    <div className="bg-gray-900 rounded-xl p-2.5 flex flex-col items-center">
                      <div className="text-[9px] text-gray-400 mb-1">AI Kamera</div>
                      <div className="relative w-full bg-gray-800 rounded-lg h-12 flex items-center justify-center overflow-hidden">
                        <div className="border border-indigo-400 rounded w-14 h-6 flex items-center justify-center"><div className="text-[8px] text-indigo-300 font-mono">B 9876 ZZ</div></div>
                        <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      </div>
                    </div>
                    <div className="bg-indigo-600 rounded-xl p-2.5 text-white">
                      <div className="text-[9px] opacity-70">Kendaraan Aktif</div>
                      <div className="text-lg font-black">12</div>
                      <div className="text-[9px] opacity-70">4 slot tersisa</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute right-2 -bottom-4 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 animate-[bounce_3.5s_infinite]">
                <div className="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg"><SmartphoneNfc size={14} /></div>
                <div><div className="text-[10px] text-gray-400">Plat Terdeteksi</div><div className="text-xs font-bold">B 9876 ZZ ✓</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fitur Aplikasi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Siap dipakai untuk venue kecil sampai multi-shift dengan alur kendaraan masuk-keluar yang lancar.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Camera,        bg: 'bg-blue-100',   color: 'text-blue-600',   title: 'Scan Plat & Kendaraan AI',     desc: 'Ambil foto kendaraan/plat. Sistem bantu isi data tanpa ribet — jauh lebih cepat untuk operasional di lapangan.' },
              { Icon: MessageCircle, bg: 'bg-indigo-100', color: 'text-indigo-600', title: 'Tiket via WhatsApp',            desc: 'Tidak ada lagi tiket kertas yang hilang. Tiket valet digital otomatis terkirim ke WhatsApp pelanggan.', extra: true },
              { Icon: LineChart,     bg: 'bg-orange-100', color: 'text-orange-600', title: 'Laporan & Audit Aktivitas',     desc: 'Pantau jumlah kendaraan masuk, keluar, laporan arus kendaraan, tarif fleksibel, dan total pendapatan harian.' },
              { Icon: Clock,         bg: 'bg-green-100',  color: 'text-green-600',  title: 'Presensi & Pengambilan',       desc: 'Fitur presensi staf built-in, serta kemudahan pelanggan meminta kendaraan diambilkan secara online.' },
            ].map(({ Icon, bg, color, title, desc, extra }) => (
              <div key={title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center mb-6`}><Icon size={24} /></div>
                <h3 className="font-bold text-lg mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{desc}</p>
                {extra && (
                  <a href="https://valetindonesia.com/#contoh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo-600 font-bold text-sm hover:underline">
                    Contoh Ticket, Cetak & WhatsApp <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="max-w-5xl mx-auto px-4 mb-24">
          <div className="text-center mb-12">
            <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">Price List</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Paket Valet Indonesia</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Paket siap live untuk operasional valet dan parkir.</p>
          </div>

          {pricing.promoCodes.length > 0 && (
            <div className="max-w-xl mx-auto mb-10">
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 mb-4 text-center">
                <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">Kupon Promo Paket Bulanan</div>
                <div className="text-xs text-gray-500">Klik Terapkan untuk mengaktifkan harga promo.</div>
              </div>
              <PromoCodeInput
                promoCodes={pricing.promoCodes}
                onApply={(promo) => { setPromoDiscount(promo.discount); setAppliedPromo(promo.code) }}
                onClear={() => { setPromoDiscount(0); setAppliedPromo('') }}
              />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Monthly All-in */}
            <div className="bg-white rounded-3xl p-8 border-2 border-indigo-500 shadow-xl shadow-indigo-500/10 flex flex-col">
              <div className="text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full self-start mb-4">PAKET BULANAN</div>
              <h3 className="text-2xl font-black text-gray-900 mb-1">All-in</h3>
              <div className="my-5 pb-5 border-b border-gray-100">
                {promoDiscount > 0 && <div className="text-sm text-gray-400 line-through mb-0.5">{fmt(MONTHLY_PRICE)}/bulan</div>}
                <div className={`text-4xl font-black ${promoDiscount > 0 ? 'text-green-600' : 'text-indigo-600'}`}>
                  {fmt(MONTHLY_PRICE * (1 - promoDiscount / 100))}<span className="text-base font-semibold text-gray-400"> / bulan</span>
                </div>
                {promoDiscount > 0 && <div className="text-xs text-green-600 font-bold mt-1">Diskon {promoDiscount}% aktif ✓</div>}
              </div>
              <ul className="flex-1 space-y-3 mb-8">
                {MONTHLY_FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <div className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">{CHECKMARK}</div>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleConsultation(`Valet All-In — ${fmt(MONTHLY_PRICE * (1 - promoDiscount / 100))}/bulan`)} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/30">
                Konsultasi via WhatsApp
              </button>
            </div>

            {/* Custom */}
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 flex flex-col">
              <div className="text-xs font-black text-gray-400 bg-gray-800 border border-gray-700 px-3 py-1 rounded-full self-start mb-4">CUSTOM</div>
              <h3 className="text-2xl font-black text-white mb-1">Contact Us</h3>
              <p className="text-gray-400 text-sm mb-5">multi lokasi / kebutuhan khusus</p>
              <ul className="flex-1 space-y-3 mb-8">
                {CUSTOM_FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <div className="w-4 h-4 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center shrink-0 mt-0.5">{CHECKMARK}</div>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleConsultation('Custom / Multi Lokasi Valet Indonesia')} className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-4 rounded-xl font-bold transition">
                Konsultasi via WhatsApp
              </button>
            </div>
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
                  <div className="flex items-start gap-3"><Tag className="text-[#E8681A] shrink-0 mt-1" size={20} /><div><h3 className="font-bold text-lg">Diskon Eksklusif</h3><p className="text-sm text-gray-400 mt-1">Dapatkan penawaran harga dan potongan kupon khusus yang tidak tersedia jika Anda mendaftar sendiri.</p></div></div>
                  <div className="flex items-start gap-3"><ShieldCheck className="text-indigo-400 shrink-0 mt-1" size={20} /><div><h3 className="font-bold text-lg">Aftersales Prioritas</h3><p className="text-sm text-gray-400 mt-1">Bantuan dari proses setup awal hingga training staf valet Anda akan dibantu langsung oleh tim LOKAL.</p></div></div>
                </div>
              </div>
              <div className="w-full md:w-80 flex flex-col gap-4">
                <button onClick={() => handleConsultation()} className="w-full bg-[#E8681A] hover:bg-[#c95914] text-white py-4 px-6 rounded-xl font-bold transition shadow-lg shadow-[#E8681A]/30 flex items-center justify-center gap-2">
                  <MessageCircle size={20} /> Konsultasi via WhatsApp
                </button>
                <div className="flex items-center gap-4 my-2 opacity-30"><div className="h-px bg-white flex-1" /><span className="text-xs font-bold text-white">ATAU</span><div className="h-px bg-white flex-1" /></div>
                <a href="https://valetindonesia.com/" target="_blank" rel="noopener noreferrer" className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-4 px-6 rounded-xl font-bold transition flex items-center justify-center gap-2">
                  Pelajari Web Aslinya <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
