'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, ChevronDown, ChevronUp, Calculator } from 'lucide-react'

const DURATION_OPTIONS = [
  { value: 0.5, label: '6 Bulan',   discount: 0,  badge: '' },
  { value: 1,   label: '1 Tahun',   discount: 40, badge: 'HEMAT 40%' },
  { value: 2,   label: '2 Tahun',   discount: 50, badge: 'HEMAT 50%' },
  { value: 3,   label: '3 Tahun',   discount: 60, badge: 'Paling Murah' },
]

const DEFAULT_BASE_PACKAGES = [
  { id: 'landing-page', name: 'Landing Page 1 Halaman', pricePerYear: 3000000, desc: 'Cocok untuk 1 produk spesifik / promosi.' },
  { id: 'company-profile', name: 'Company Profile (Max 5 Halaman)', pricePerYear: 5000000, desc: 'Untuk profil perusahaan dan multi-produk.' },
  { id: 'ecommerce', name: 'Toko Online E-Commerce', pricePerYear: 8000000, desc: 'Katalog produk dengan sistem checkout keranjang.' },
  { id: 'custom', name: 'Custom Sesuai Keinginan', pricePerYear: 0, desc: 'Fitur khusus (Sistem Web, SaaS, dll).' },
]

const DEFAULT_ADDONS = [
  { id: 'seo', name: 'Setup SEO & Analytics', price: 300000, type: 'flat' },
  { id: 'copywriting', name: 'Full Custom Copywriting', price: 500000, type: 'flat' },
  { id: 'extra-pages', name: 'Tambahan 5 Halaman Ekstra', price: 250000, type: 'flat' },
]

const fmt = (p: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(p)

export default function WebPricingCalculator() {
  const [basePackages, setBasePackages] = useState(DEFAULT_BASE_PACKAGES)
  const [addons, setAddons] = useState(DEFAULT_ADDONS)
  
  const [duration, setDuration] = useState(1)
  const [baseId, setBaseId] = useState('landing-page')
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  
  const [isAddonOpen, setIsAddonOpen] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('lokal_pricing_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed['jasa-landing-page']) {
          const d = parsed['jasa-landing-page']
          if (d.basePrices && d.basePrices.length > 0) {
            setBasePackages(d.basePrices.map((b: any) => ({
              id: b.id, name: b.name || b.area, pricePerYear: b.price, desc: b.desc || ''
            })))
            setBaseId(d.basePrices[0].id)
          }
          if (d.addons) {
            setAddons(d.addons)
          }
        }
      } catch { /* ignore */ }
    }
  }, [])

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  }

  // Calculate Prices
  const basePkg = basePackages.find(p => p.id === baseId) || basePackages[0]
  const basePriceCalc = basePkg.pricePerYear * duration

  const activeAddons = addons.filter(a => selectedAddons.includes(a.id))
  const addonsPriceCalc = activeAddons.reduce((sum, a) => {
    if (a.type === 'yearly') return sum + (a.price * 12 * duration)
    return sum + a.price
  }, 0)

  const subtotal = basePriceCalc + addonsPriceCalc
  const activeDiscount = DURATION_OPTIONS.find(d => d.value === duration)?.discount || 0
  const discountAmount = subtotal * (activeDiscount / 100)
  const total = subtotal - discountAmount

  const monthlyEquivalent = total / (duration * 12)

  const handleCheckout = () => {
    const durLabel = DURATION_OPTIONS.find(d => d.value === duration)?.label
    const addonNames = activeAddons.length > 0 ? activeAddons.map(a => a.name).join(', ') : 'Tanpa Add-on'
    const msg = `Halo LOKAL, saya ingin memesan Website dengan rincian berikut:
- Tipe: *${basePkg.name}*
- Durasi: *${durLabel}*
- Add-ons: *${addonNames}*

Estimasi Total: *${fmt(total)}*

Mohon panduannya untuk proses selanjutnya.`
    
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER ?? '6281234567890'}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section id="pricing" className="max-w-6xl mx-auto px-4 mb-24 pt-10 border-t border-gray-200">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Kalkulator Harga Transparan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Sesuaikan fitur dengan budget Anda. Semakin lama langganannya, semakin murah cicilan bulanannya.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Form Options */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Base Package */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-gray-800 mb-4">1. Pilih Tipe Website</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {basePackages.map(pkg => (
                <div
                  key={pkg.id}
                  onClick={() => setBaseId(pkg.id)}
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex flex-col justify-between ${baseId === pkg.id ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-gray-100 hover:border-indigo-200'}`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800 text-sm leading-tight pr-2">{pkg.name}</h4>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${baseId === pkg.id ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                        {baseId === pkg.id && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{pkg.desc}</p>
                  </div>
                  <div className="text-xs font-bold text-indigo-700 bg-white/50 inline-block px-2 py-1 rounded">
                    {pkg.pricePerYear > 0 ? `${fmt(pkg.pricePerYear)}/thn` : 'Harga Menyesuaikan'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Duration */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-gray-800 mb-4">2. Pilih Durasi Hosting/Sistem</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {DURATION_OPTIONS.map(opt => (
                <div
                  key={opt.value}
                  onClick={() => setDuration(opt.value)}
                  className={`cursor-pointer rounded-xl p-4 text-center border-2 transition-all relative ${duration === opt.value ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-gray-100 hover:border-indigo-200'}`}
                >
                  {opt.badge && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ${opt.discount >= 50 ? 'bg-red-600 animate-pulse' : 'bg-red-500'}`}>
                      {opt.badge}
                    </div>
                  )}
                  <h4 className={`font-bold ${duration === opt.value ? 'text-indigo-700' : 'text-gray-800'}`}>{opt.label}</h4>
                  <div className="text-[10px] text-gray-500 mt-1">Sudah termasuk Maintenance</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Add-ons */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => setIsAddonOpen(!isAddonOpen)}
            >
              <div>
                <h3 className="font-bold text-xl text-gray-800 mb-1">3. Tambah Add-on (Opsional)</h3>
                <p className="text-xs text-gray-500">Sesuaikan ekstra fitur yang Anda perlukan.</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-full text-gray-500">
                {isAddonOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {isAddonOpen && (
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                {addons.map(addon => (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex items-start gap-3 ${selectedAddons.includes(addon.id) ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 hover:border-indigo-200'}`}
                  >
                    <div className={`mt-0.5 shrink-0 text-indigo-600 ${selectedAddons.includes(addon.id) ? 'opacity-100' : 'opacity-20'}`}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-1">{addon.name}</h4>
                      <p className="text-xs text-indigo-600 font-semibold">
                        +{fmt(addon.price)} {addon.type === 'yearly' ? '/bln' : '(sekali bayar)'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Receipt */}
        <div className="lg:col-span-1 sticky top-28">
          <div className="bg-[#0f2e2e] text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Calculator size={100} />
            </div>

            <h3 className="text-xl font-bold mb-6 text-white/90 relative z-10">Ringkasan Biaya</h3>
            
            <div className="space-y-4 mb-8 relative z-10 text-sm text-white/80">
              <div className="flex justify-between">
                <span className="w-3/5 truncate pr-2">{basePkg.name}</span>
                <span className="font-semibold text-white">{basePriceCalc > 0 ? fmt(basePriceCalc) : 'Konsultasi'}</span>
              </div>
              
              {activeAddons.map(a => (
                <div key={a.id} className="flex justify-between">
                  <span className="w-3/5 truncate pr-2 text-indigo-300">+ {a.name}</span>
                  <span className="font-semibold text-indigo-200">
                    {fmt(a.type === 'yearly' ? (a.price * 12 * duration) : a.price)}
                  </span>
                </div>
              ))}

              <div className="border-t border-white/20 my-4" />

              <div className="flex justify-between">
                <span>Subtotal ({duration * 12} bulan)</span>
                <span>{fmt(subtotal)}</span>
              </div>

              {activeDiscount > 0 && (
                <div className="flex justify-between text-green-400 font-bold">
                  <span>Diskon {activeDiscount}%</span>
                  <span>-{fmt(discountAmount)}</span>
                </div>
              )}
            </div>

            <div className="bg-black/20 rounded-2xl p-5 mb-8 border border-white/10 relative z-10 backdrop-blur-md">
              <div className="text-white/60 text-xs mb-1 font-semibold uppercase tracking-widest">Total Tagihan Awal</div>
              <div className="text-3xl font-black text-white mb-4">{fmt(total)}</div>
              
              <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                <span className="text-white/60 text-sm">Setara dengan:</span>
                <span className="text-lg font-bold text-green-400">{fmt(monthlyEquivalent)}<span className="text-xs text-white/60 font-normal">/bln</span></span>
              </div>
            </div>

            <button onClick={handleCheckout} className="w-full bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-400 transition transform hover:-translate-y-1 relative z-10">
              Pesan Sekarang
            </button>
            <p className="text-center text-xs text-white/40 mt-4 relative z-10">
              Tidak ada biaya tersembunyi.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
