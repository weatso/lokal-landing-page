'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, ChevronDown, ChevronUp, Calculator } from 'lucide-react'

const DURATION_OPTIONS = [
  { value: 0.5, label: '6 Bulan',   badge: '' },
  { value: 1,   label: '1 Tahun',   badge: 'Rekomendasi' },
  { value: 2,   label: '2 Tahun',   badge: 'Lebih Hemat' },
  { value: 3,   label: '3 Tahun',   badge: 'Paling Murah' },
]

const DEFAULT_BASE_PACKAGES = [
  { id: 'landing-page', name: 'Landing Page 1 Halaman', prices: { '0.5': 1850000, '1': 2500000, '2': 4200000, '3': 5500000 }, desc: 'Website satu halaman yang fokus pada konversi produk tunggal atau promosi.' },
  { id: 'company-profile', name: 'Company Profile (Max 3 Hal)', prices: { '0.5': 2500000, '1': 3500000, '2': 5800000, '3': 7700000 }, desc: 'Menampilkan profil bisnis, visi, misi, dan layanan secara elegan.' },
  { id: 'katalog', name: 'Katalog Digital (Max 5 Hal)', prices: { '0.5': 3000000, '1': 4000000, '2': 6700000, '3': 8800000 }, desc: 'Katalog interaktif yang memanjakan mata, ideal untuk toko fisik.' },
]

const DEFAULT_ADDONS = [
  { id: 'gmaps', name: 'Integrasi Google My Business (Maps)', price: 250000, type: 'flat' },
  { id: 'seo', name: 'Setup SEO Foundation & Meta Pixel', price: 300000, type: 'flat' },
  { id: 'dashboard', name: 'Web Performance Dashboard', price: 750000, type: 'yearly' },
  { id: 'extra-pages', name: 'Tambahan Halaman (Per Halaman)', price: 250000, type: 'flat' },
]

const fmt = (p: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(p)

export default function WebPricingCalculator() {
  const [basePackages, setBasePackages] = useState(DEFAULT_BASE_PACKAGES)
  const [addons, setAddons] = useState(DEFAULT_ADDONS)
  
  const [duration, setDuration] = useState(1)
  const [baseId, setBaseId] = useState('landing-page')
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  
  const [isAddonOpen, setIsAddonOpen] = useState(true)
  const [extraPagesCount, setExtraPagesCount] = useState(1)

  useEffect(() => {
    fetch('/api/pricing')
      .then(r => r.json())
      .then(json => {
        const d = json?.data?.['jasa-landing-page']
        if (d) {
          if (d.basePrices && d.basePrices.length > 0) {
            setBasePackages(d.basePrices.map((b: any) => ({
              id: b.id, name: b.name || b.area, prices: b.prices || { '0.5': 0, '1': 0, '2': 0, '3': 0 }, desc: b.desc || ''
            })))
            setBaseId(d.basePrices[0].id)
          }
          if (d.addons) setAddons(d.addons)
        }
      })
      .catch(() => { /* fallback to defaults */ })
  }, [])

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  }

  // Calculate Prices
  const basePkg = basePackages.find(p => p.id === baseId) || basePackages[0]
  const basePriceCalc = basePkg.prices ? (basePkg.prices[duration.toString() as keyof typeof basePkg.prices] || 0) : 0
  
  // Visual Decoy Logic: Anggap harga 6 bulan adalah harga "Normal" per 6 bulan
  const decoyBasePrice = basePkg.prices ? (basePkg.prices['0.5'] || 0) : 0
  const decoyMonthlyRate = decoyBasePrice / 6
  const normalBasePriceCalc = duration > 0.5 ? (decoyMonthlyRate * (duration * 12)) : basePriceCalc
  const discountAmount = normalBasePriceCalc - basePriceCalc

  const activeAddons = addons.filter(a => selectedAddons.includes(a.id))
  const addonsPriceCalc = activeAddons.reduce((sum, a) => {
    let aPrice = a.price
    if (a.id === 'extra-pages') {
      aPrice = a.price * extraPagesCount
    }
    if (a.type === 'yearly') return sum + (aPrice * duration)
    return sum + aPrice
  }, 0)

  const total = basePriceCalc + addonsPriceCalc

  const monthlyEquivalent = total / (duration * 12)

  const handleCheckout = () => {
    const durLabel = DURATION_OPTIONS.find(d => d.value === duration)?.label
    const activeBase = basePackages.find(p => p.id === baseId)?.name
    const addonText = activeAddons.map(a => {
      if (a.id === 'extra-pages') return `- ${a.name} (${extraPagesCount}x)`
      return `- ${a.name}`
    }).join('%0A')
    const msg = `Halo LOKAL, saya tertarik membuat website.%0A%0A*Paket:* ${activeBase}%0A*Durasi:* ${durLabel}%0A*Add-ons:*%0A${addonText || '- Tidak ada'}%0A%0A*Total Estimasi:* ${fmt(total)}%0A%0AMohon panduannya untuk proses selanjutnya.`
    
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER ?? '6285111326098'}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section id="pricing" className="max-w-6xl mx-auto px-4 mb-24 pt-10 border-t border-gray-200">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Kalkulator Harga Transparan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Sesuaikan fitur dengan budget Anda. Semakin lama langganannya, semakin murah cicilan bulanannya.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-gray-800 mb-4">1. Pilih Tipe Website</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {basePackages.map(pkg => (
                <div
                  key={pkg.id}
                  onClick={() => setBaseId(pkg.id)}
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex flex-col justify-between ${baseId === pkg.id ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-gray-100 hover:border-indigo-200'}`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800 text-sm leading-tight pr-2">{pkg.name}</h4>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{pkg.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap bg-indigo-500">
                      {opt.badge}
                    </div>
                  )}
                  <h4 className={`font-bold ${duration === opt.value ? 'text-indigo-700' : 'text-gray-800'}`}>{opt.label}</h4>
                </div>
              ))}
            </div>
          </div>

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
                    className={`cursor-pointer flex flex-col justify-between p-4 rounded-xl border-2 transition-all ${selectedAddons.includes(addon.id) ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 hover:border-indigo-200'}`}
                  >
                    <div onClick={() => toggleAddon(addon.id)} className="flex items-start gap-3 h-full">
                      <div className={`mt-0.5 rounded-full flex-shrink-0 ${selectedAddons.includes(addon.id) ? 'text-indigo-600' : 'text-gray-300'}`}>
                        <CheckCircle2 size={24} className={selectedAddons.includes(addon.id) ? "fill-indigo-100" : ""} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 leading-tight mb-1">{addon.name}</h4>
                        <p className="text-sm text-gray-500 font-medium">{fmt(addon.price)} {addon.type === 'yearly' ? '/ Tahun' : '(Sekali Bayar)'}</p>
                      </div>
                    </div>
                    {addon.id === 'extra-pages' && selectedAddons.includes(addon.id) && (
                      <div className="mt-3 pl-9 flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-700">Jumlah:</span>
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                          <button onClick={(e) => { e.stopPropagation(); setExtraPagesCount(Math.max(1, extraPagesCount - 1)) }} className="px-3 py-1 hover:bg-gray-100 font-bold">-</button>
                          <span className="px-3 py-1 font-bold text-indigo-700">{extraPagesCount}</span>
                          <button onClick={(e) => { e.stopPropagation(); setExtraPagesCount(extraPagesCount + 1) }} className="px-3 py-1 hover:bg-gray-100 font-bold">+</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 sticky top-28">
          <div className="bg-[#0f2e2e] text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Calculator size={100} />
            </div>

            <h3 className="text-xl font-bold mb-6 text-white/90 relative z-10">Ringkasan Biaya</h3>
            
            <div className="space-y-4 mb-8 relative z-10 text-sm text-white/80">
              <div className="flex justify-between items-end">
                <span className="text-sm text-gray-300 font-medium">Harga Paket:</span>
                <div className="text-right">
                  {duration > 0.5 && discountAmount > 0 && (
                    <div className="text-xs text-red-400 line-through mb-1">{fmt(normalBasePriceCalc)}</div>
                  )}
                  <div className="text-2xl font-bold text-white tracking-tight">{fmt(basePriceCalc)}</div>
                </div>
              </div>
              
              {activeAddons.map(a => (
                <div key={a.id} className="flex justify-between items-center text-sm border-t border-white/10 pt-3">
                  <span className="w-3/5 truncate pr-2 text-indigo-300">+ {a.name} {a.id === 'extra-pages' ? `(${extraPagesCount}x)` : ''}</span>
                  <span className="font-semibold text-indigo-200">
                    {fmt(a.type === 'yearly' ? (a.price * duration) : (a.id === 'extra-pages' ? a.price * extraPagesCount : a.price))}
                  </span>
                </div>
              ))}

              <div className="border-t border-white/20 my-4" />

              <div className="flex justify-between font-bold">
                <span>Total Estimasi ({duration * 12} bulan)</span>
                <span>{fmt(total)}</span>
              </div>
              
              {duration > 0.5 && discountAmount > 0 && (
                <div className="flex justify-between items-center text-green-400 text-xs font-bold mt-3 bg-green-400/10 p-3 rounded-lg border border-green-400/20">
                  <span>✨ Anda Hemat</span>
                  <span className="text-sm">{fmt(discountAmount)}</span>
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
