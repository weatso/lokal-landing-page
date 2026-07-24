'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  ArrowRight, CheckCircle2, Store, Clock, ShieldCheck,
  Smartphone, Check, Gift, MapPin, Zap, Coffee, Package,
  UserCheck, PieChart, Heart, Tv2, Vibrate, HardDrive, Building2, MessageSquare,
  Plus, Minus, ChevronDown, ChevronUp, ShoppingCart, ChefHat, Scissors
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import PromoCodeInput from '@/components/PromoCodeInput'

// ─── Types ────────────────────────────────────────────────────────────────────
interface AreaPrice  { id: string; area: string; price: number }
interface PromoCode  { id: string; code: string; discount: number; isActive: boolean }

interface PricingData {
  basePrices:  AreaPrice[]
  addons:      any[]
  discount6m:  number
  discount12m: number
  promoCodes:  PromoCode[]
}

const DEFAULT: PricingData = {
  basePrices: [
    { id: 'semarang', area: 'Semarang (LOKAL Area)', price: 50000 },
    { id: 'belitung', area: 'Belitung (LOKAL Area)', price: 50000 },
    { id: 'nasional', area: 'Area Lain (Indonesia)', price: 65000 },
  ],
  addons: [], discount6m: 10, discount12m: 20, promoCodes: [],
}

// Modul kini diambil dari API (CMS)

// ─── Duration config ──────────────────────────────────────────────────────────
const DURATIONS = [
  { value: 1,  payMonths: 1,  label: 'Bulanan',  sublabel: 'Bayar per bulan',        bonus: 0, tag: '' },
  { value: 6,  payMonths: 5,  label: '6 Bulan',  sublabel: 'Bayar 5, aktif 6 bln',  bonus: 1, tag: 'Gratis 1 Bulan' },
  { value: 12, payMonths: 10, label: '1 Tahun',  sublabel: 'Bayar 10, aktif 12 bln', bonus: 2, tag: 'Gratis 2 Bulan' },
]

const CAT_ORDER = ['Karyawan & Laporan', 'Pelanggan Setia', 'Operasional', 'Cabang Ekstra', 'Sekali Bayar']

const fmt = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)

const WA = process.env.NEXT_PUBLIC_WA_NUMBER ?? '6285111326098'

// ─── Compact addon row (mobile) ───────────────────────────────────────────────
function AddonRow({
  addon, isSelected, onToggle,
  extraBranchCount, setExtraBranchCount, extraBranchPrice,
}: {
  addon: any
  isSelected: boolean
  onToggle: () => void
  extraBranchCount: number
  setExtraBranchCount: (fn: (c: number) => number) => void
  extraBranchPrice: number
}) {
  const isOneTime = addon.oneTime
  const isDynamic = addon.dynamic
  const Icon = (LucideIcons as any)[addon.iconName] || LucideIcons.Box

  if (isDynamic) {
    return (
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${extraBranchCount > 0 ? 'border-[#1A7A7A] bg-[#1A7A7A]/5' : 'border-gray-200'}`}>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${addon.iconBg}`}>
          <Icon size={16} className={addon.iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-gray-800 leading-snug truncate">{addon.name}</div>
          <div className="text-xs text-purple-600 font-bold">{fmt(extraBranchPrice)}<span className="font-normal text-gray-400">/cabang/bln</span></div>
        </div>
        <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-1 shrink-0">
          <button type="button" onClick={() => setExtraBranchCount(c => Math.max(0, c - 1))} disabled={extraBranchCount === 0} className="w-7 h-7 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center disabled:opacity-30"><Minus size={12} /></button>
          <span className="w-6 text-center font-extrabold text-sm text-gray-800">{extraBranchCount}</span>
          <button type="button" onClick={() => setExtraBranchCount(c => c + 1)} className="w-7 h-7 rounded bg-[#1A7A7A] hover:bg-[#135c5c] text-white font-bold flex items-center justify-center"><Plus size={12} /></button>
        </div>
      </div>
    )
  }

  return (
    <button onClick={onToggle} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${isSelected ? 'border-[#1A7A7A] bg-[#1A7A7A]/5' : 'border-gray-200 hover:border-gray-300'}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${addon.iconBg}`}>
        <Icon size={16} className={addon.iconColor} />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="font-semibold text-sm text-gray-800 leading-snug truncate">{addon.name}</div>
        <div className={`text-xs font-bold ${isSelected ? 'text-[#1A7A7A]' : 'text-gray-500'}`}>
          {fmt(addon.price)}<span className="font-normal text-gray-400">{isOneTime ? ' sekali bayar' : '/bln'}</span>
        </div>
      </div>
      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-[#1A7A7A] border-[#1A7A7A]' : 'border-gray-300 bg-white'}`}>
        {isSelected && <Check size={11} strokeWidth={3} className="text-white" />}
      </div>
    </button>
  )
}

export default function PosBeautyPage() {
  const [pricing, setPricing]             = useState<PricingData>(DEFAULT)
  const [selectedArea, setSelectedArea]   = useState<string>('')
  const [duration, setDuration]           = useState(12)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [extraBranchCount, setExtraBranchCount] = useState(0)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [appliedPromo, setAppliedPromo]   = useState('')
  const [openCats, setOpenCats]           = useState<string[]>(['Karyawan & Laporan'])  // accordion state

  useEffect(() => {
    fetch('/api/pricing')
      .then(r => r.json())
      .then(json => {
        const d = json?.data?.['pos-beauty']
        if (d) {
          if (!d.promoCodes) d.promoCodes = []
          setPricing({ ...DEFAULT, ...d })
          if (d.basePrices?.length) setSelectedArea(d.basePrices[0].id)
        } else {
          setSelectedArea(DEFAULT.basePrices[0].id)
        }
      })
      .catch(() => { setSelectedArea(DEFAULT.basePrices[0].id) })
  }, [])

  const toggleAddon = (id: string) =>
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const toggleCat = (cat: string) =>
    setOpenCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])

  const durCfg  = DURATIONS.find(d => d.value === duration)!
  const areaObj = pricing.basePrices.find(b => b.id === selectedArea) ?? pricing.basePrices[0]
  const corePrice = areaObj?.price ?? 50000

  const recurringAddons = useMemo(() =>
    selectedAddons.filter(id => { const a = pricing.addons.find(x => x.id === id); return a && !a.oneTime && !(a as any).dynamic })
  , [selectedAddons])

  const monthlyRecurring = useMemo(() =>
    recurringAddons.reduce((sum, id) => {
      const a = pricing.addons.find(x => x.id === id)!
      return sum + a.price
    }, 0)
  , [recurringAddons])

  const mainBranchMonthly  = corePrice + monthlyRecurring
  const extraBranchPrice   = Math.round(mainBranchMonthly * 0.75)
  const totalMonthly       = mainBranchMonthly + (extraBranchCount * extraBranchPrice)

  const oneTimeTotal = useMemo(() =>
    selectedAddons.reduce((sum, id) => {
      const a = pricing.addons.find(x => x.id === id)
      return a && (a as any).oneTime ? sum + a.price : sum
    }, 0)
  , [selectedAddons])

  const subtotal          = totalMonthly * durCfg.payMonths
  const promoAmt          = Math.round(subtotal * promoDiscount / 100)
  const finalTotal        = subtotal - promoAmt + oneTimeTotal

  const waMsg = encodeURIComponent(
    `Halo LOKAL! Saya tertarik dengan Lokal Beauty.\n\n📍 Area: ${areaObj?.area}\n⏱ Durasi: ${durCfg.label}${durCfg.bonus > 0 ? ` (Bayar ${durCfg.payMonths} bulan, gratis ${durCfg.bonus} bulan)` : ''}\n🔧 Add-ons: ${selectedAddons.length > 0 ? selectedAddons.map(id => pricing.addons.find(a => a.id === id)?.name).join(', ') : 'Tidak ada'}${extraBranchCount > 0 ? `\n🏢 Cabang Ekstra: ${extraBranchCount} cabang` : ''}\n💰 Estimasi Total: ${fmt(finalTotal)}\n\nBoleh minta info lebih lanjut?`
  )

  // ─── Summary Box (shared markup, used in sidebar & bottom sheet) ──────────
  function SummaryContent({ compact = false }: { compact?: boolean }) {
    return (
      <div className={compact ? '' : 'p-5 space-y-2.5'}>
        {!compact && (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 text-xs">{areaObj?.area ?? '—'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">CORE ENGINE × {durCfg.payMonths}bln</span>
              <span className="font-semibold">{fmt(corePrice * durCfg.payMonths)}</span>
            </div>
            {recurringAddons.map(id => {
              const a = pricing.addons.find(x => x.id === id)!
              return (
                <div key={id} className="flex justify-between text-sm">
                  <span className="text-gray-500 truncate mr-2">{a.name} × {durCfg.payMonths}bln</span>
                  <span className="font-semibold shrink-0">{fmt(a.price * durCfg.payMonths)}</span>
                </div>
              )
            })}
            {extraBranchCount > 0 && (
              <div className="flex justify-between text-sm text-purple-700 bg-purple-50 px-2.5 py-1.5 rounded-lg">
                <span className="truncate mr-2 font-medium">Cabang Ekstra ({extraBranchCount}x) × {durCfg.payMonths}bln</span>
                <span className="font-bold shrink-0">{fmt(extraBranchPrice * extraBranchCount * durCfg.payMonths)}</span>
              </div>
            )}
            {durCfg.bonus > 0 && (
              <div className="flex justify-between text-sm text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg font-medium">
                <span>Gratis Akses</span>
                <span>+{durCfg.bonus} Bulan</span>
              </div>
            )}
            {oneTimeTotal > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Jasa/Perangkat (sekali bayar)</span>
                <span className="font-semibold">{fmt(oneTimeTotal)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-gray-100">
              <PromoCodeInput
                promoCodes={pricing.promoCodes}
                onApply={(d, c) => { setPromoDiscount(d); setAppliedPromo(c) }}
                onClear={() => { setPromoDiscount(0); setAppliedPromo('') }}
              />
            </div>
            {promoDiscount > 0 && (
              <div className="flex justify-between text-sm text-emerald-600">
                <span>Kode promo ({appliedPromo})</span>
                <span>-{fmt(promoAmt)}</span>
              </div>
            )}
            <div className="flex justify-between font-extrabold text-lg pt-2 border-t-2 border-gray-100">
              <span>Total</span>
              <span className="text-[#1A7A7A]">{fmt(finalTotal)}</span>
            </div>
          </>
        )}
        <a
          href={`https://wa.me/${WA}?text=${waMsg}`}
          target="_blank" rel="noopener noreferrer"
          className={`block w-full text-center bg-[#E8681A] hover:bg-[#c95914] text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-[#E8681A]/25 ${compact ? '' : 'mt-2'}`}
        >
          Mulai Berlangganan
        </a>
        {!compact && <p className="text-center text-xs text-gray-400">Estimasi. Tim kami konfirmasi sebelum penagihan.</p>}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-[#333333] flex flex-col selection:bg-[#E8681A] selection:text-white">
      <main className="flex-grow pt-24 pb-28 lg:pb-16">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="px-4 mb-16 md:mb-20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#1A7A7A]/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
            <div className="text-center md:text-left">
              <div className="mb-6 inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-2 sm:pr-4 rounded-xl border border-gray-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-produk/lokal-pos.webp" alt="Lokal Beauty" className="h-8 object-contain" />
                <span className="hidden sm:block w-px h-6 bg-gray-200"></span>
                <span className="text-xs font-bold text-[#1A7A7A] uppercase tracking-wider px-2 sm:px-0 pb-1 sm:pb-0">Dirancang Khusus untuk Salon & Barbershop</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Tinggalkan Hitung Komisi Manual &<br />
                <span className="text-[#1A7A7A]">Jadikan Pelanggan Loyal.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Aplikasi kasir cerdas yang otomatis membagi komisi kapster/stylist setiap transaksi. Dilengkapi sistem member Poin VIP dan pencatatan riwayat kedatangan pelanggan. Fokus melayani, bukan pusing merekap Excel.
              </p>
              <a href="#pricing" className="bg-[#1A7A7A] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#135c5c] transition shadow-lg shadow-[#1A7A7A]/30 inline-flex items-center gap-2">
                🚀 Mulai dari Rp 50.000 / bulan <ArrowRight size={20} />
              </a>
            </div>

            {/* Illustration — hidden on very small screens */}
            <div className="relative hidden sm:block">
              <div className="aspect-[4/3] bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 flex flex-col relative">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded text-xs font-bold text-gray-500">Kasir Utama</div>
                </div>
                <div className="flex gap-4 h-full">
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">Pilih Kapster</div>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-full bg-pink-100 border-2 border-pink-400 flex items-center justify-center text-pink-600 font-bold text-xs">BU</div>
                      <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-200"></div>
                      <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-200"></div>
                    </div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mt-2">Layanan</div>
                    <div className="grid grid-cols-2 gap-2">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="bg-gray-50 rounded-lg border border-gray-100 p-2 text-center flex flex-col justify-center h-12">
                          <div className="w-3/4 h-2 bg-gray-300 rounded mx-auto mb-1.5" />
                          <div className="w-1/2 h-2 bg-pink-300/50 rounded mx-auto" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-1/3 bg-gray-50 rounded-xl border border-gray-100 p-4 flex flex-col">
                    <div className="font-bold text-sm mb-4">Transaksi #1882</div>
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between text-xs"><span className="text-gray-500">Haircut & Wash</span><span className="font-semibold">65k</span></div>
                      <div className="flex justify-between text-xs"><span className="text-gray-500 text-[10px]">Stylist: Budi</span></div>
                      <div className="flex justify-between text-xs"><span className="text-gray-500">Pomade</span><span className="font-semibold">85k</span></div>
                    </div>
                    <div className="pt-3 border-t border-gray-200 mt-auto">
                      <div className="flex justify-between text-sm font-bold mb-3"><span>Total</span><span className="text-[#1A7A7A]">150k</span></div>
                      <div className="w-full py-2 bg-[#E8681A] rounded-lg text-white text-xs font-bold text-center">Bayar</div>
                    </div>
                  </div>
                </div>
                <div className="absolute right-2 top-1/4 bg-white p-3 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-[bounce_4s_infinite]">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg"><CheckCircle2 size={16} /></div>
                  <div>
                    <div className="text-xs text-gray-500">Split Komisi Otomatis</div>
                    <div className="text-sm font-bold text-green-600">Budi +Rp15.000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 mb-16 md:mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Otomatisasi Operasional Salon & Barbershop Anda</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Berapa banyak waktu terbuang hanya untuk rekap harian? Atau pelanggan lupa pindah tempat? Selesaikan dengan Lokal Beauty.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Scissors,   color: 'text-[#1A7A7A]', bg: 'bg-[#1A7A7A]/10', title: 'Auto-Split Komisi',      desc: 'Sistem otomatis membagi persentase pendapatan layanan per staf. Rekap gaji bulanan selesai 1 detik.' },
              { Icon: Heart,      color: 'text-[#E8681A]', bg: 'bg-[#E8681A]/10', title: 'CRM & Loyalty Member',   desc: 'Catat nama, WA, riwayat potongan terakhir, dan berikan poin diskon untuk kedatangan berikutnya.' },
              { Icon: MessageSquare,color:'text-green-600', bg: 'bg-green-100',    title: 'Struk Digital WA',       desc: 'Hemat operasional kertas! Kirim bukti bayar langsung ke WA pelanggan cukup dengan satu klik.' },
              { Icon: Smartphone, color: 'text-blue-600',  bg: 'bg-blue-100',     title: 'Zero Hardware Cost',      desc: 'Bisa pakai HP atau tablet Android yang sudah Anda miliki. Bebas repot, langsung jalan.' },
            ].map(({ Icon, color, bg, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">
                <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-lg mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING CALCULATOR ───────────────────────────────────────────── */}
        <section id="pricing" className="max-w-5xl mx-auto px-4 mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sistem Fleksibel. Bayar Sesuai Kebutuhan.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Lokal Beauty menggunakan model <strong>Basic + Add-ons</strong>. Pilih area Anda dan centang fitur ekstra yang Anda butuhkan.</p>
          </div>

          <div className="relative">
            {/* COMING SOON OVERLAY */}
            <div className="absolute inset-[-20px] z-50 flex items-center justify-center backdrop-blur-[4px] bg-white/40 rounded-3xl">
               <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 text-center max-w-md relative z-10 animate-[fadeIn_0.5s_ease-out]">
                 <div className="w-16 h-16 bg-[#E8681A]/10 text-[#E8681A] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock size={32} />
                 </div>
                 <h3 className="text-2xl font-bold mb-2">Segera Hadir!</h3>
                 <p className="text-gray-600">Kalkulator dan pemesanan untuk Lokal Beauty sedang dipersiapkan. Hubungi kami untuk jadi yang pertama mencoba.</p>
                 <a href={`https://wa.me/${WA}?text=${waMsg}`} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full justify-center">Kabari Saya Saat Rilis</a>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 select-none pointer-events-none blur-[2px] opacity-60">

            {/* ─ Left: 3-step configurator ─────────────────────────────── */}
            <div className="lg:col-span-3 space-y-4">

              {/* STEP 1: Area */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2 text-sm">
                  <span className="w-6 h-6 rounded-full bg-[#1A7A7A] text-white text-xs flex items-center justify-center font-black shrink-0">1</span>
                  <MapPin size={15} className="text-[#1A7A7A] shrink-0" />
                  Pilih Area Operasional
                </h3>
                <p className="text-xs text-gray-400 mb-4 ml-8">Harga berbeda per area layanan LOKAL</p>
                {/* Mobile: segmented pills | Desktop: radio rows */}
                <div className="flex flex-col gap-2.5">
                  {pricing.basePrices.map(area => (
                    <label
                      key={area.id}
                      className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedArea === area.id
                          ? 'border-[#1A7A7A] bg-[#1A7A7A]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          selectedArea === area.id ? 'border-[#1A7A7A] bg-[#1A7A7A]' : 'border-gray-300'
                        }`}>
                          {selectedArea === area.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <input type="radio" className="sr-only" checked={selectedArea === area.id} onChange={() => setSelectedArea(area.id)} />
                        <span className={`font-semibold text-sm ${selectedArea === area.id ? 'text-[#1A7A7A]' : 'text-gray-700'}`}>{area.area}</span>
                      </div>
                      <span className={`font-extrabold text-sm shrink-0 ${selectedArea === area.id ? 'text-[#1A7A7A]' : 'text-gray-600'}`}>
                        {fmt(area.price)}<span className="text-xs font-normal text-gray-400">/bln</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* STEP 2: Duration */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2 text-sm">
                  <span className="w-6 h-6 rounded-full bg-[#1A7A7A] text-white text-xs flex items-center justify-center font-black shrink-0">2</span>
                  <Clock size={15} className="text-[#1A7A7A] shrink-0" />
                  Durasi Berlangganan
                </h3>
                <p className="text-xs text-gray-400 mb-4 ml-8">Langganan lebih lama = bonus bulan gratis</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {DURATIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setDuration(opt.value)}
                      className={`relative rounded-xl py-3 px-2 text-center border-2 transition-all ${
                        duration === opt.value
                          ? 'border-[#1A7A7A] bg-[#1A7A7A]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {opt.tag && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#E8681A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                          {opt.tag}
                        </span>
                      )}
                      <div className={`font-bold text-sm ${duration === opt.value ? 'text-[#1A7A7A]' : 'text-gray-700'}`}>{opt.label}</div>
                      {opt.bonus > 0 && (
                        <div className="flex items-center justify-center gap-0.5 mt-1">
                          <Gift size={10} className="text-[#E8681A]" />
                          <span className="text-[9px] text-[#E8681A] font-bold">+{opt.bonus} bln gratis</span>
                        </div>
                      )}
                      <div className="text-[9px] text-gray-400 mt-0.5 leading-tight">{opt.sublabel}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 3: Add-ons — accordion by category */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-5 pb-3">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 rounded-full bg-[#1A7A7A] text-white text-xs flex items-center justify-center font-black shrink-0">3</span>
                    <Zap size={15} className="text-[#1A7A7A] shrink-0" />
                    Tambah Modul
                    <span className="text-xs text-gray-400 font-normal">(Opsional)</span>
                  </h3>
                </div>

                {CAT_ORDER.map((cat, catIdx) => {
                  const items     = pricing.addons.filter((a: any) => a.cat === cat)
                  const isOneTime = cat === 'Sekali Bayar'
                  const isOpen    = openCats.includes(cat)
                  // count selected in this category
                  const selCount  = items.filter(a =>
                    a.id === 'extra-branch'
                      ? extraBranchCount > 0
                      : selectedAddons.includes(a.id)
                  ).length

                  return (
                    <div key={cat} className={catIdx > 0 ? 'border-t border-gray-100' : ''}>
                      {/* Category header — always visible, tap to expand */}
                      <button
                        onClick={() => toggleCat(cat)}
                        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${isOneTime ? 'bg-gray-100 text-gray-500' : 'bg-[#1A7A7A]/10 text-[#1A7A7A]'}`}>
                            {cat}
                          </span>
                          {selCount > 0 && (
                            <span className="w-5 h-5 bg-[#E8681A] text-white text-[10px] font-black rounded-full flex items-center justify-center">
                              {selCount}
                            </span>
                          )}
                        </div>
                        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                          <ChevronDown size={16} className="text-gray-400" />
                        </div>
                      </button>

                      {/* Category items */}
                      {isOpen && (
                        <div className="px-4 pb-4 space-y-2.5">
                          {items.map((addon: any) => (
                            <AddonRow
                              key={addon.id}
                              addon={addon}
                              isSelected={selectedAddons.includes(addon.id)}
                              onToggle={() => toggleAddon(addon.id)}
                              extraBranchCount={extraBranchCount}
                              setExtraBranchCount={setExtraBranchCount}
                              extraBranchPrice={extraBranchPrice}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ─ Right: Summary sidebar (desktop only) ─────────────────── */}
            <div className="lg:col-span-2 hidden lg:block">
              <div className="lg:sticky lg:top-24 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-[#0d2d2d] to-[#1A7A7A] text-white p-5">
                  <div className="text-sm text-white/70 mb-1">Estimasi Total Anda</div>
                  <div className="text-3xl font-extrabold">{fmt(finalTotal)}</div>
                  {durCfg.bonus > 0 ? (
                    <div className="flex items-center gap-1.5 mt-2 bg-[#E8681A]/20 text-[#E8681A] text-xs font-bold px-3 py-1.5 rounded-full w-fit">
                      <Gift size={12} /> Aktif {duration} bulan (Hanya bayar {durCfg.payMonths} bulan!)
                    </div>
                  ) : (
                    <div className="text-xs text-white/60 mt-1">untuk {duration} bulan</div>
                  )}
                </div>
                <SummaryContent />
              </div>
            </div>
          </div>
        </div>
        </section>

      </main>

      {/* ── MOBILE FLOATING BOTTOM BAR ──────────────────────────────────────── */}
      {/* Always visible on mobile — solves the "total hilang" problem */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-[#1A7A7A]/20 shadow-2xl">
        <div className="px-4 py-3">
          {/* Top row: total & breakdown */}
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <div className="text-xs text-gray-500">Estimasi Total</div>
              <div className="text-xl font-extrabold text-[#1A7A7A] leading-tight">{fmt(finalTotal)}</div>
              {durCfg.bonus > 0 && (
                <div className="flex items-center gap-1 mt-0.5">
                  <Gift size={10} className="text-[#E8681A]" />
                  <span className="text-[10px] text-[#E8681A] font-bold">Aktif {duration}bln · Bayar {durCfg.payMonths}bln</span>
                </div>
              )}
            </div>
            {/* Mini breakdown badge */}
            <div className="text-right text-xs text-gray-400 space-y-0.5">
              <div className="font-semibold text-gray-600">{durCfg.label} · {areaObj?.area?.split(' ')[0] ?? '—'}</div>
              {selectedAddons.length > 0 && (
                <div className="flex items-center gap-1 justify-end">
                  <ShoppingCart size={11} className="text-[#1A7A7A]" />
                  <span className="text-[#1A7A7A] font-bold">{selectedAddons.length + (extraBranchCount > 0 ? 1 : 0)} modul aktif</span>
                </div>
              )}
            </div>
          </div>
          {/* CTA button */}
          <a
            href={`https://wa.me/${WA}?text=${waMsg}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#E8681A] hover:bg-[#c95914] text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-[#E8681A]/30 text-sm"
          >
            <MessageSquare size={16} />
            Mulai Berlangganan via WhatsApp
          </a>
        </div>
        {/* Safe area spacer for notch phones */}
        <div className="h-safe-bottom bg-white" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>
  )
}
