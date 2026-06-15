'use client'

import { useState, useEffect } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Store,
  Clock,
  ShieldCheck,
  Smartphone,
  Check
} from 'lucide-react'
import Image from 'next/image'
import PromoCodeInput from '@/components/PromoCodeInput'

// ── Types ──────────────────────────────────────────────────────
interface BasePrice { id: string; area: string; price: number }
interface Addon     { id: string; name: string; price: number }
interface PromoCode { id: string; code: string; discount: number; isActive: boolean }

interface PricingData {
  basePrices:  BasePrice[]
  addons:      Addon[]
  discount6m:  number
  discount12m: number
  promoCodes:  PromoCode[]
}

const DEFAULT: PricingData = {
  basePrices:  [
    { id: '1', area: 'Semarang (LOKAL Area)', price: 75000 },
    { id: '2', area: 'Belitung (LOKAL Area)', price: 75000 },
    { id: '3', area: 'Luar Daerah (Nasional)', price: 99000 },
  ],
  addons:      [
    { id: 'a1', name: 'Laporan Keuangan', price: 20000 },
    { id: 'a2', name: 'Sistem Penggajian (Payroll)', price: 15000 },
    { id: 'a3', name: 'Manajemen Meja', price: 15000 },
    { id: 'a4', name: 'Jasa Setting Hardware (Sekali Bayar)', price: 50000 },
    { id: 'a5', name: 'Tambahan Cabang', price: 50000 },
  ],
  discount6m:  10,
  discount12m: 20,
  promoCodes:  [{ id: 'p1', code: 'LOKALPOS', discount: 15, isActive: true }],
}

const fmt = (price: number) =>
  new Intl.NumberFormat('id-ID', {
    style:                 'currency',
    currency:              'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

const CHECKMARK = (
  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
    <path d="M1 3l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function PosFnbPage() {
  const [pricing, setPricing]           = useState<PricingData>(DEFAULT)
  const [selectedBase, setSelectedBase] = useState<string>(DEFAULT.basePrices[0].id)
  const [addons, setAddons]             = useState<string[]>([])
  const [promoDiscount, setPromoDiscount]       = useState(0)
  const [appliedPromo, setAppliedPromo]         = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('lokal_pricing_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<string, PricingData>
        if (parsed['pos-fnb']) {
          const d = parsed['pos-fnb']
          if (!d.promoCodes) d.promoCodes = DEFAULT.promoCodes
          if (d.discount6m  === undefined) d.discount6m  = 10
          if (d.discount12m === undefined) d.discount12m = 20
          setPricing(d)
          if (d.basePrices?.length) setSelectedBase(d.basePrices[0].id)
        }
      } catch { /* use defaults */ }
    }
  }, [])

  const toggleAddon = (id: string) =>
    setAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])

  const base       = pricing.basePrices.find(b => b.id === selectedBase) ?? pricing.basePrices[0] ?? { price: 0, area: '' }
  const addonTotal = addons.reduce((sum, id) => {
    const a = pricing.addons.find(x => x.id === id)
    return sum + (a?.price ?? 0)
  }, 0)
  const total = base.price + addonTotal

  const handleConsultation = (duration: number, totalPay: number) => {
    const addonNames = addons.map(id => pricing.addons.find(a => a.id === id)?.name).filter(Boolean).join(', ')
    const promoText  = appliedPromo ? `%0A*Kode Promo:* ${appliedPromo} (Diskon ${promoDiscount}%)` : ''
    const msg = `Halo LOKAL, saya tertarik berlangganan LOKAL POS F%26B.%0A%0A*Area:* ${base.area}%0A*Add-ons:* ${addonNames || 'Tidak ada'}%0A*Durasi:* ${duration} Bulan%0A*Total Pembayaran:* ${fmt(totalPay)}${promoText}.%0A%0AMohon panduannya.`
    window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank')
  }

  const packageFeatures = ['Kasir & Pencatatan Pesanan', 'Rekap Harian (Shift)', 'Dukungan Teknis LOKAL']
  const d6m  = pricing.discount6m  ?? 0
  const d12m = pricing.discount12m ?? 0
  const p1m  = total * (1 - promoDiscount / 100)
  const p6m  = total * (1 - d6m  / 100) * (1 - promoDiscount / 100)
  const p12m = total * (1 - d12m / 100) * (1 - promoDiscount / 100)

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-[#333333] flex flex-col selection:bg-[#E8681A] selection:text-white">
      <main className="flex-grow pt-24 pb-16">

        {/* Hero */}
        <section className="px-4 mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#1A7A7A]/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-left">
              <div className="mb-6 inline-block bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-produk/lokal-pos.webp" alt="LOKAL POS F&B" className="h-8 object-contain" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Tinggalkan Cara Lama.<br />
                <span className="text-[#1A7A7A]">Kelola Resto Lebih Modern.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Kunci laci kasir Anda dan pantau resto dari mana saja. Sistem kasir cerdas tanpa alat mahal, cukup pakai tablet atau HP android yang sudah ada. Staf baru bisa lancar pakai dalam 3 menit.
              </p>
              <a href="#pricing" className="bg-[#1A7A7A] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#135c5c] transition shadow-lg shadow-[#1A7A7A]/30 inline-flex items-center gap-2">
                Hitung Harga Paket <ArrowRight size={20} />
              </a>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="aspect-[4/3] bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 flex flex-col relative">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded text-xs font-bold text-gray-500">Kasir Utama</div>
                </div>
                <div className="flex gap-6 h-full">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-3 flex flex-col justify-between">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg mb-2" />
                        <div>
                          <div className="w-16 h-3 bg-gray-300 rounded mb-1" />
                          <div className="w-10 h-3 bg-[#E8681A]/50 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-1/3 bg-gray-50 rounded-xl border border-gray-100 p-4 flex flex-col">
                    <div className="font-bold text-sm mb-4">Order #1042</div>
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between text-xs"><span className="text-gray-500">Nasi Goreng</span><span className="font-semibold">25k</span></div>
                      <div className="flex justify-between text-xs"><span className="text-gray-500">Es Teh</span><span className="font-semibold">5k</span></div>
                    </div>
                    <div className="pt-3 border-t border-gray-200 mt-auto">
                      <div className="flex justify-between text-sm font-bold mb-3"><span>Total</span><span className="text-[#1A7A7A]">30k</span></div>
                      <div className="w-full py-2 bg-[#E8681A] rounded-lg text-white text-xs font-bold text-center">Bayar</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 top-1/4 bg-white p-3 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-[bounce_4s_infinite]">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg"><CheckCircle2 size={16} /></div>
                  <div>
                    <div className="text-xs text-gray-500">Pesanan Baru</div>
                    <div className="text-sm font-bold">Meja 04</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fitur Andalan Resto Modern</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Kami merancang sistem ini untuk menyelesaikan masalah klasik di bisnis kuliner. Tanpa ribet, langsung pakai.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Store,      color: '[#1A7A7A]', bg: '[#1A7A7A]/10', title: 'Pencatatan Instan',    desc: 'Mencegah pesanan terlewat saat jam ramai. Klik menu, otomatis masuk ke dapur.' },
              { Icon: Clock,      color: '[#E8681A]', bg: '[#E8681A]/10', title: 'Stok Real-time',       desc: 'Ketahui bahan baku yang hampir habis sebelum benar-benar kehabisan.' },
              { Icon: ShieldCheck,color: 'green-600', bg: 'green-100',    title: 'Anti-Fraud & Laporan', desc: 'Rekap otomatis tiap pergantian shift kasir. Mencegah selisih uang dan kecurangan.' },
              { Icon: Smartphone, color: 'blue-600',  bg: 'blue-100',     title: 'Zero Hardware Cost',  desc: 'Bisa pakai HP atau tablet Android yang sudah Anda miliki. Sambungkan ke printer bluetooth murah.' },
            ].map(({ Icon, color, bg, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">
                <div className={`w-12 h-12 bg-${bg} text-${color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-lg mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Calculator */}
        <section id="pricing" className="max-w-5xl mx-auto px-4 mb-24">
          <div className="text-center mb-10">
            <div className="inline-block bg-[#E8681A]/10 text-[#E8681A] px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4">KALKULATOR BIAYA</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sistem Fleksibel. Bayar Sesuai Kebutuhan.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">LOKAL POS F&B menggunakan model <strong>Basic + Add-ons</strong>. Pilih area Anda dan centang fitur ekstra yang Anda butuhkan.</p>
          </div>

          <div className="bg-[#1A7A7A] rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2">
              {/* Base price */}
              <div className="p-8 md:p-10 text-white flex flex-col border-b md:border-b-0 md:border-r border-white/10">
                <h3 className="font-bold text-xl mb-2">1. Pilih Area Anda</h3>
                <p className="text-white/70 text-sm mb-6">Pilih paket dasar sesuai lokasi operasional bisnis Anda.</p>
                <div className="space-y-3">
                  {pricing.basePrices.map(item => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedBase(item.id)}
                      className={`flex justify-between items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedBase === item.id ? 'bg-white text-[#1A7A7A] border-white shadow-lg scale-[1.02]' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedBase === item.id ? 'border-[#1A7A7A]' : 'border-white/50'}`}>
                          {selectedBase === item.id && <div className="w-2.5 h-2.5 rounded-full bg-[#1A7A7A]" />}
                        </div>
                        <span className="font-semibold">{item.area}</span>
                      </div>
                      <span className="font-bold text-lg">{fmt(item.price)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Addons */}
              <div className="bg-white p-8 md:p-10 flex flex-col">
                <h3 className="text-xl font-bold mb-2">2. Pilih Add-ons (Opsional)</h3>
                <p className="text-gray-500 text-sm mb-6">Centang fitur tambahan yang ingin diaktifkan.</p>
                <div className="space-y-3 mb-8 flex-1">
                  {pricing.addons.map(addon => (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all group ${
                        addons.includes(addon.id) ? 'bg-[#E8681A]/5 border-[#E8681A]' : 'bg-gray-50 border-transparent hover:border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors border ${
                          addons.includes(addon.id) ? 'bg-[#E8681A] border-[#E8681A] text-white' : 'bg-white border-gray-300 text-transparent'
                        }`}>
                          <Check size={14} strokeWidth={3} />
                        </div>
                        <span className={`font-semibold ${addons.includes(addon.id) ? 'text-[#E8681A]' : 'text-gray-700'}`}>{addon.name}</span>
                      </div>
                      <span className={`font-bold ${addons.includes(addon.id) ? 'text-[#E8681A]' : 'text-gray-900'}`}>+{fmt(addon.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Promo Code */}
          <div className="max-w-xl mx-auto mt-10 mb-4">
            <PromoCodeInput
              promoCodes={pricing.promoCodes}
              onApply={(discount, code) => { setPromoDiscount(discount); setAppliedPromo(code) }}
              onClear={() => { setPromoDiscount(0); setAppliedPromo('') }}
            />
          </div>

          {/* Package cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {/* 1 Month */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col relative">
              <h3 className="text-lg font-bold text-gray-800 mb-1">Paket 1 Bulan</h3>
              <p className="text-sm text-gray-500 mb-6">Cocok untuk mencoba sistem.</p>
              <div className="mb-8">
                {promoDiscount > 0 && <div className="text-sm text-gray-400 line-through mb-1">{fmt(total)}</div>}
                <div className={`text-3xl font-black ${promoDiscount > 0 ? 'text-green-600' : 'text-gray-900'}`}>{fmt(p1m)}</div>
                <div className="text-sm text-gray-500 mt-1">/ bulan</div>
              </div>
              <ul className="flex-1 space-y-3 mb-6">
                {packageFeatures.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <div className="w-4 h-4 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shrink-0 mt-0.5">{CHECKMARK}</div>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-gray-100 mt-auto">
                <div className="flex justify-between text-sm mb-4"><span className="text-gray-500">Total Bayar:</span><span className="font-bold">{fmt(p1m)}</span></div>
                <button onClick={() => handleConsultation(1, p1m)} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition">Pilih 1 Bulan</button>
              </div>
            </div>

            {/* 6 Months */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#1A7A7A] shadow-xl flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1A7A7A] text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider whitespace-nowrap">PILIHAN POPULER</div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Paket 6 Bulan</h3>
              <p className="text-sm text-gray-500 mb-6">Pilihan cerdas untuk kestabilan.</p>
              <div className="mb-8">
                {(d6m > 0 || promoDiscount > 0) && <div className="text-sm text-gray-400 line-through mb-1">{fmt(total)}</div>}
                <div className="text-3xl font-black text-[#1A7A7A]">{fmt(p6m)}</div>
                <div className="text-sm text-gray-500 mt-1">/ bulan</div>
              </div>
              <ul className="flex-1 space-y-3 mb-6">
                {packageFeatures.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <div className="w-4 h-4 rounded-full bg-[#1A7A7A]/10 text-[#1A7A7A] flex items-center justify-center shrink-0 mt-0.5">{CHECKMARK}</div>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-gray-100 mt-auto">
                <div className="flex justify-between text-sm mb-4"><span className="text-gray-500">Total Bayar:</span><span className="font-bold">{fmt(p6m * 6)}</span></div>
                <button onClick={() => handleConsultation(6, p6m * 6)} className="w-full bg-[#1A7A7A] text-white py-3 rounded-xl font-bold hover:bg-[#135c5c] transition shadow-lg shadow-[#1A7A7A]/30">Pilih 6 Bulan</button>
              </div>
            </div>

            {/* 12 Months */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#E8681A] text-white px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap">BEST VALUE</div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Paket 1 Tahun</h3>
              <p className="text-sm text-gray-500 mb-6">Investasi terbaik, bebas repot.</p>
              <div className="mb-8">
                {(d12m > 0 || promoDiscount > 0) && <div className="text-sm text-gray-400 line-through mb-1">{fmt(total)}</div>}
                <div className="text-3xl font-black text-gray-900">{fmt(p12m)}</div>
                <div className="text-sm text-gray-500 mt-1">/ bulan</div>
              </div>
              <ul className="flex-1 space-y-3 mb-6">
                {packageFeatures.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <div className="w-4 h-4 rounded-full bg-[#E8681A]/10 text-[#E8681A] flex items-center justify-center shrink-0 mt-0.5">{CHECKMARK}</div>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-gray-100 mt-auto">
                <div className="flex justify-between text-sm mb-4"><span className="text-gray-500">Total Bayar:</span><span className="font-bold">{fmt(p12m * 12)}</span></div>
                <button onClick={() => handleConsultation(12, p12m * 12)} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition">Pilih 1 Tahun</button>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Article */}
        <section className="max-w-4xl mx-auto px-4 mt-10 border-t border-gray-200 pt-16">
          <article className="prose prose-gray prose-a:text-[#1A7A7A] max-w-none">
            <h2 className="text-2xl font-bold mb-6">Mengapa Bisnis F&B Wajib Menggunakan Sistem POS Modern?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Dalam era digital saat ini, persaingan bisnis kuliner (Food and Beverage) semakin ketat. Mengandalkan metode pencatatan manual di buku kasir bukan lagi pilihan yang ideal.
            </p>
            <h3 className="text-xl font-bold mt-8 mb-4">Keuntungan Cloud POS untuk UMKM</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sistem kasir berbasis cloud, seperti <strong>LOKAL POS F&B</strong>, hadir sebagai solusi tepat guna untuk UMKM. Berbeda dengan mesin kasir tradisional, Cloud POS memungkinkan pemilik bisnis menggunakan perangkat yang sudah ada <em>(zero hardware cost)</em>.
            </p>
          </article>
        </section>

      </main>
    </div>
  )
}
