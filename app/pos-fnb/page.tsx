'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  CheckCircle2, ShieldCheck, Zap, Users, BarChart2,
  Package, Coffee, Clock, Printer, MessageSquare,
  Star, ChevronDown, ChevronUp, Cpu, Wifi, WifiOff,
  ArrowRight, Layers, Building2, UserCheck, PieChart,
  Heart, Tv2, Vibrate, HardDrive, Info
} from 'lucide-react'
import Link from 'next/link'
import PromoCodeInput from '@/components/PromoCodeInput'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Addon     { id: string; name: string; price: number; oneTime?: boolean }
interface PromoCode { id: string; code: string; discount: number; isActive: boolean }

interface PricingData {
  basePrices: { id: string; area: string; price: number }[]
  addons: Addon[]
  discount6m: number
  discount12m: number
  promoCodes: PromoCode[]
}

// ─── Default data (matches /api/pricing defaults) ────────────────────────────
const DEFAULT: PricingData = {
  basePrices: [
    { id: 'core', area: 'CORE ENGINE', price: 50000 },
  ],
  addons: [],
  discount6m: 10,
  discount12m: 20,
  promoCodes: [],
}

// ─── Static add-on catalogue (modular) ───────────────────────────────────────
const ADDON_CATALOGUE = [
  // Scale
  { id: 'extra-branch', category: 'Skala & Multi-Outlet', name: 'Tambah Cabang Ekstra', price: 0, dynamic: true, icon: Building2, color: 'text-purple-500 bg-purple-50', desc: 'Cabang baru otomatis mewarisi semua fitur yang sudah aktif di Cabang Utama.' },
  // F&B & Retail
  { id: 'meja-qr', category: 'Layanan F&B', name: 'Manajemen Meja & QR Menu', price: 50000, icon: Coffee, color: 'text-orange-500 bg-orange-50', desc: 'QR per meja, pengunjung lihat menu dari HP, pesanan masuk real-time ke kasir.' },
  { id: 'stok-premium', category: 'Layanan F&B', name: 'Stok Premium & Oversell Prevention', price: 35000, icon: Package, color: 'text-red-500 bg-red-50', desc: 'Tombol kasir otomatis dikunci jika stok 0. Indikator warna dan notifikasi restock.' },
  // Staff & Finance
  { id: 'payroll', category: 'Staf & Keuangan', name: 'Absensi & Payroll', price: 75000, icon: UserCheck, color: 'text-emerald-500 bg-emerald-50', desc: 'Pelacakan jam kerja, hitung gaji pokok + tunjangan, dan slip gaji digital.' },
  { id: 'keuangan', category: 'Staf & Keuangan', name: 'Dashboard Keuangan', price: 75000, icon: PieChart, color: 'text-blue-500 bg-blue-50', desc: 'Laporan Laba/Rugi riil, terpisah dari rekap omzet kotor harian.' },
  // Retention
  { id: 'crm', category: 'Retensi', name: 'CRM Pelanggan & Loyalty', price: 45000, icon: Heart, color: 'text-pink-500 bg-pink-50', desc: 'Profil pelanggan via WA, riwayat transaksi, poin loyalitas, dan diskon member.' },
  { id: 'pager-digital', category: 'Retensi', name: 'Digital Pager / Layar Antrean', price: 25000, icon: Tv2, color: 'text-cyan-500 bg-cyan-50', desc: 'Modul pemanggilan pesanan visual untuk Smart TV di area pick-up.' },
  // One-time
  { id: 'pager-fisik', category: 'One-Time', name: 'Integrasi Pager Fisik', price: 350000, oneTime: true, icon: Vibrate, color: 'text-gray-500 bg-gray-100', desc: 'Sambungkan sistem antrean ke perangkat pager fisik (bergetar/menyala). Mulai dari harga ini.' },
  { id: 'migrasi', category: 'One-Time', name: 'Jasa Migrasi & Setup Hardware', price: 500000, oneTime: true, icon: HardDrive, color: 'text-indigo-500 bg-indigo-50', desc: 'Tim kami pindahkan data menu & stok dari Excel/POS lama, termasuk setup printer.' },
]

const DURATION_OPTS = [
  { value: 1,  label: 'Bulanan',  badge: '' },
  { value: 6,  label: '6 Bulan',  badge: 'Hemat 10%' },
  { value: 12, label: '1 Tahun',  badge: 'Hemat 20%' },
]

const fmt = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)

const CORE_FEATURES = [
  { icon: WifiOff,       title: 'Kasir Offline-First',          desc: 'Tetap proses pesanan saat internet mati. Sinkronisasi otomatis saat online kembali.' },
  { icon: Printer,       title: 'Hybrid Receipt (Fisik & WA)',   desc: 'Cetak nota termal 58mm/80mm via Bluetooth, sekaligus kirim struk digital ke WA pelanggan.' },
  { icon: BarChart2,     title: 'Rekap Harian & Audit Transaksi', desc: 'Laporan pendapatan, total transaksi, kas masuk, dan kas keluar tercatat otomatis.' },
  { icon: ShieldCheck,   title: 'Security Log Anti-Maling',      desc: 'Setiap Void, hapus item, atau buka laci tanpa transaksi tercatat di log aktivitas dashboard.' },
  { icon: Users,         title: 'Akses Komunitas LOKAL (B2B)',   desc: 'Hak eksklusif owner bergabung di ekosistem bisnis LOKAL.' },
]

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '6285111326098'

export default function PosFnbPage() {
  const [pricing, setPricing]             = useState<PricingData>(DEFAULT)
  const [duration, setDuration]           = useState(12)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [appliedPromo, setAppliedPromo]   = useState('')
  const [openCategory, setOpenCategory]   = useState<string | null>('Layanan F&B')

  // Load from API
  useEffect(() => {
    fetch('/api/pricing')
      .then(r => r.json())
      .then(json => {
        const d = json?.data?.['pos-fnb']
        if (d) {
          if (!d.promoCodes) d.promoCodes = []
          if (d.discount6m  === undefined) d.discount6m  = 10
          if (d.discount12m === undefined) d.discount12m = 20
          setPricing(d)
        }
      })
      .catch(() => {})
  }, [])

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  // Billing calc
  const discountPct = duration === 6 ? (pricing.discount6m || 10) : duration === 12 ? (pricing.discount12m || 20) : 0
  const coreMonthly = pricing.basePrices[0]?.price ?? 50000

  const monthlyAddons = useMemo(() =>
    selectedAddons.reduce((sum, id) => {
      const a = ADDON_CATALOGUE.find(x => x.id === id)
      if (!a || a.oneTime) return sum
      return sum + a.price
    }, 0)
  , [selectedAddons])

  const oneTimeAddons = useMemo(() =>
    selectedAddons.reduce((sum, id) => {
      const a = ADDON_CATALOGUE.find(x => x.id === id)
      if (!a || !a.oneTime) return sum
      return sum + a.price
    }, 0)
  , [selectedAddons])

  // Extra branch = 75% of total monthly (core + recurring add-ons)
  const extraBranchCount = selectedAddons.includes('extra-branch') ? 1 : 0
  const baseMonthly = coreMonthly + monthlyAddons
  const extraBranchPrice = Math.round(baseMonthly * 0.75)
  const totalMonthly = baseMonthly + (extraBranchCount * extraBranchPrice)
  const discountedMonthly = Math.round(totalMonthly * (1 - discountPct / 100))
  const totalPeriod = discountedMonthly * duration
  const promoAmount = Math.round(totalPeriod * (promoDiscount / 100))
  const finalTotal = totalPeriod - promoAmount + oneTimeAddons

  const waMsg = encodeURIComponent(
    `Halo LOKAL! Saya tertarik dengan LOKAL POS F&B.\n\nPilihan saya:\n- Durasi: ${DURATION_OPTS.find(d => d.value === duration)?.label}\n- Add-ons: ${selectedAddons.length > 0 ? selectedAddons.map(id => ADDON_CATALOGUE.find(a => a.id === id)?.name).join(', ') : 'Tidak ada'}\n- Estimasi: ${fmt(finalTotal)}\n\nBoleh minta info lebih lanjut?`
  )

  // Group addons by category
  const categories = Array.from(new Set(ADDON_CATALOGUE.map(a => a.category)))

  return (
    <div className="min-h-screen font-sans bg-[#FAFAFA]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0d2d2d] via-[#0f3d3d] to-[#1A7A7A] text-white pt-28 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#E8681A]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#1A7A7A]/20 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#E8681A]/20 border border-[#E8681A]/40 text-[#E8681A] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
            <Cpu size={13} /> LOKAL POS F&B
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
            Sistem Kasir <span className="text-[#E8681A]">Tanpa Batas</span> untuk Resto & Kafe Anda
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Dari Rp 50.000/bulan. Ditagih tahunan. Pilih hanya fitur yang Anda butuhkan — bayar sesuai skala bisnis Anda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#pricing"
              className="bg-[#E8681A] hover:bg-[#c95914] text-white font-bold px-8 py-4 rounded-xl transition shadow-xl shadow-[#E8681A]/30 flex items-center gap-2"
            >
              Hitung Harga Saya <ArrowRight size={18} />
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo LOKAL, saya ingin konsultasi tentang POS F&B.')}`}
              target="_blank" rel="noopener noreferrer"
              className="border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition flex items-center gap-2"
            >
              <MessageSquare size={18} /> Konsultasi Gratis
            </a>
          </div>
        </div>
      </section>

      {/* ── CORE FEATURES ────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#1A7A7A]/10 text-[#1A7A7A] text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
              <Star size={13} /> Sudah Termasuk di Paket Core
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              Satu Paket, Lima Kekuatan Utama
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              CORE ENGINE Rp 50.000/bln sudah mencakup semua ini. Tidak ada biaya tersembunyi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#FAFAFA] rounded-2xl p-6 border border-[#1A7A7A]/10 hover:border-[#1A7A7A]/30 hover:shadow-md transition-all">
                <div className="w-11 h-11 bg-[#1A7A7A]/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#1A7A7A]" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
            {/* Bonus card */}
            <div className="bg-[#E8681A]/5 rounded-2xl p-6 border border-[#E8681A]/20 flex flex-col justify-center">
              <div className="w-11 h-11 bg-[#E8681A]/15 rounded-xl flex items-center justify-center mb-4">
                <Layers size={22} className="text-[#E8681A]" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Ekosistem Modular</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Tambah fitur kapan saja sesuai kebutuhan bisnis yang berkembang — tanpa ganti sistem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING CALCULATOR ───────────────────────────────────────────── */}
      <section id="pricing" className="py-20 px-4 bg-[#F0F7F7]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Bangun Paket Anda Sendiri</h2>
            <p className="text-gray-500">Bayar hanya untuk yang Anda butuhkan. Estimasi harga langsung di sini.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* ─ Left: configurator */}
            <div className="lg:col-span-3 space-y-6">

              {/* Duration */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Clock size={18} className="text-[#1A7A7A]" /> Durasi Berlangganan</h3>
                <div className="grid grid-cols-3 gap-3">
                  {DURATION_OPTS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setDuration(opt.value)}
                      className={`relative rounded-xl p-3 text-center border-2 transition-all ${
                        duration === opt.value
                          ? 'border-[#1A7A7A] bg-[#1A7A7A]/5 text-[#1A7A7A]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {opt.badge && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#E8681A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                          {opt.badge}
                        </span>
                      )}
                      <div className="font-bold text-sm">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Core (always selected) */}
              <div className="bg-white rounded-2xl border-2 border-[#1A7A7A] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1A7A7A]/10 rounded-xl flex items-center justify-center">
                      <Cpu size={20} className="text-[#1A7A7A]" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">CORE ENGINE</div>
                      <div className="text-xs text-gray-500">Wajib · 1 Cabang Utama termasuk</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#1A7A7A]">{fmt(coreMonthly)}<span className="text-xs text-gray-400 font-normal">/bln</span></div>
                    <div className="text-[10px] text-gray-400">{fmt(coreMonthly * 12)}/tahun</div>
                  </div>
                </div>
              </div>

              {/* Add-ons by category */}
              {categories.map(cat => {
                const items = ADDON_CATALOGUE.filter(a => a.category === cat)
                const isOpen = openCategory === cat
                return (
                  <div key={cat} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition"
                      onClick={() => setOpenCategory(isOpen ? null : cat)}
                    >
                      <span className="font-bold text-gray-800 text-sm">{cat}</span>
                      {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                    </button>
                    {isOpen && (
                      <div className="border-t border-gray-100 divide-y divide-gray-50">
                        {items.map(addon => {
                          const isSelected = selectedAddons.includes(addon.id)
                          const isExtraBranch = addon.id === 'extra-branch'
                          const displayPrice = isExtraBranch ? extraBranchPrice : addon.price
                          return (
                            <div
                              key={addon.id}
                              onClick={() => toggleAddon(addon.id)}
                              className={`flex items-start gap-4 p-4 cursor-pointer transition-colors ${isSelected ? 'bg-[#1A7A7A]/5' : 'hover:bg-gray-50'}`}
                            >
                              <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-[#1A7A7A] border-[#1A7A7A]' : 'border-gray-300'}`}>
                                {isSelected && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <span className="font-semibold text-sm text-gray-800">{addon.name}</span>
                                    {addon.oneTime && (
                                      <span className="ml-2 text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-bold">SEKALI BAYAR</span>
                                    )}
                                    {isExtraBranch && (
                                      <span className="ml-2 text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded font-bold">DINAMIS</span>
                                    )}
                                  </div>
                                  <div className="text-right shrink-0">
                                    <div className="font-bold text-sm text-[#1A7A7A]">
                                      {isExtraBranch && selectedAddons.length === 0
                                        ? <span className="text-gray-400 text-xs italic">Pilih add-on dulu</span>
                                        : <>{fmt(displayPrice)}<span className="text-xs text-gray-400 font-normal">{addon.oneTime ? '' : '/bln'}</span></>
                                      }
                                    </div>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{addon.desc}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* ─ Right: summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-br from-[#0d2d2d] to-[#1A7A7A] text-white p-5">
                  <div className="text-sm text-white/70 mb-1">Estimasi Total Anda</div>
                  <div className="text-3xl font-extrabold">{fmt(finalTotal)}</div>
                  {duration > 1 && <div className="text-xs text-white/60 mt-1">untuk {duration} bulan · hemat {discountPct}%</div>}
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">CORE ENGINE × {duration}bln</span>
                    <span className="font-semibold">{fmt(coreMonthly * duration)}</span>
                  </div>
                  {selectedAddons.filter(id => {
                    const a = ADDON_CATALOGUE.find(x => x.id === id); return a && !a.oneTime
                  }).map(id => {
                    const a = ADDON_CATALOGUE.find(x => x.id === id)!
                    const price = id === 'extra-branch' ? extraBranchPrice : a.price
                    return (
                      <div key={id} className="flex justify-between text-sm">
                        <span className="text-gray-500 truncate mr-2">{a.name} × {duration}bln</span>
                        <span className="font-semibold shrink-0">{fmt(price * duration)}</span>
                      </div>
                    )
                  })}
                  {oneTimeAddons > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Jasa/Perangkat (sekali)</span>
                      <span className="font-semibold">{fmt(oneTimeAddons)}</span>
                    </div>
                  )}
                  {discountPct > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span>Diskon {discountPct}%</span>
                      <span>-{fmt(Math.round((totalMonthly * duration) * discountPct / 100))}</span>
                    </div>
                  )}

                  {/* Promo */}
                  <div className="pt-2 border-t border-gray-100">
                    <PromoCodeInput
                      promoCodes={pricing.promoCodes}
                      onApply={(discount, code) => { setPromoDiscount(discount); setAppliedPromo(code) }}
                      onClear={() => { setPromoDiscount(0); setAppliedPromo('') }}
                    />
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span>Kode promo ({appliedPromo})</span>
                      <span>-{fmt(promoAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-extrabold text-lg pt-2 border-t-2 border-gray-100">
                    <span>Total</span>
                    <span className="text-[#1A7A7A]">{fmt(finalTotal)}</span>
                  </div>

                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
                    target="_blank" rel="noopener noreferrer"
                    className="block w-full text-center bg-[#E8681A] hover:bg-[#c95914] text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-[#E8681A]/25 mt-2"
                  >
                    Mulai Berlangganan
                  </a>

                  <p className="text-center text-xs text-gray-400 mt-2">
                    Harga bersifat estimasi. Tim kami akan konfirmasi sebelum penagihan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST / FAQ STRIP ────────────────────────────────────────────── */}
      <section className="bg-white py-14 px-4 border-t border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { icon: Zap, title: 'Setup dalam 1 Hari', desc: 'Tim LOKAL siapkan semuanya. Anda tinggal buka toko.' },
            { icon: Wifi, title: 'Tanpa Kontrak Panjang', desc: 'Berhenti kapan saja. Tidak ada penalti atau biaya tersembunyi.' },
            { icon: ShieldCheck, title: 'Data Anda, Milik Anda', desc: 'Semua data transaksi tersimpan aman dan bisa dieksport kapan saja.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#FAFAFA] border border-gray-100">
              <div className="w-12 h-12 bg-[#1A7A7A]/10 rounded-xl flex items-center justify-center">
                <Icon size={22} className="text-[#1A7A7A]" />
              </div>
              <h3 className="font-bold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0d2d2d] to-[#1A7A7A] py-20 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Mulai Gratis, Tanpa Risiko</h2>
          <p className="text-white/70 mb-8">Konsultasikan kebutuhan operasional Anda dengan tim LOKAL. Kami bantu pilihkan paket yang paling efisien untuk bisnis Anda.</p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo LOKAL! Saya ingin coba LOKAL POS F&B untuk bisnis saya.')}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#E8681A] hover:bg-[#c95914] text-white font-bold px-10 py-4 rounded-xl transition shadow-xl shadow-[#E8681A]/30"
          >
            <MessageSquare size={20} /> Hubungi Kami via WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
