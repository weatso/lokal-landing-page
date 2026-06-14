import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  CheckCircle2, 
  Store, 
  Clock, 
  ShieldCheck, 
  Smartphone,
  MessageCircle,
  Plus,
  Check
} from 'lucide-react'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import PromoCodeInput from '../components/PromoCodeInput'

export default function PosFnb() {
  const [pricingData, setPricingData] = useState({ basePrices: [], addons: [], discount6m: 10, discount12m: 20, promoCodes: [] })
  const [selectedBaseId, setSelectedBaseId] = useState(null)
  const [selectedAddonIds, setSelectedAddonIds] = useState([])
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [appliedPromoCode, setAppliedPromoCode] = useState('')

  useEffect(() => {
    // Fetch dynamic pricing from "CMS" (localStorage)
    const saved = localStorage.getItem('lokal_pricing_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed['pos-fnb']) {
          const data = parsed['pos-fnb']
          // Migrate old promo format
          if (!data.promoCodes && data.promo) {
            data.promoCodes = [{ id: 'p1', code: data.promo.code || '', discount: data.promo.discount12m || 0, isActive: data.promo.isActive ?? true }]
          }
          if (!data.promoCodes) data.promoCodes = []
          if (data.discount6m === undefined) data.discount6m = 10
          if (data.discount12m === undefined) data.discount12m = 20
          setPricingData(data)
          if (data.basePrices && data.basePrices.length > 0) {
            setSelectedBaseId(data.basePrices[0].id)
          }
        }
      } catch (e) {
        console.error('Failed to parse pricing data', e)
      }
    } else {
      // Fallback defaults if admin hasn't saved anything yet
      const defaultData = {
        basePrices: [
          { id: '1', area: 'Semarang (LOKAL Area)', price: 75000 },
          { id: '2', area: 'Belitung (LOKAL Area)', price: 75000 },
          { id: '3', area: 'Luar Daerah (Nasional)', price: 99000 },
        ],
        addons: [
          { id: 'a1', name: 'Manajemen Inventori Lanjut', price: 35000 },
          { id: 'a2', name: 'Ekstra Outlet', price: 50000 },
          { id: 'a3', name: 'Manajemen Karyawan Khusus', price: 25000 },
        ],
        discount6m: 10,
        discount12m: 20,
        promoCodes: [
          { id: 'p1', code: 'LOKALPOS', discount: 15, isActive: true }
        ]
      }
      setPricingData(defaultData)
      setSelectedBaseId(defaultData.basePrices[0].id)
    }
    
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const toggleAddon = (id) => {
    setSelectedAddonIds(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const selectedBase = pricingData.basePrices?.find(b => b.id === selectedBaseId) || pricingData.basePrices?.[0] || { price: 0, area: '' }
  const totalAddons = selectedAddonIds.reduce((sum, id) => {
    const addon = pricingData.addons?.find(a => a.id === id)
    return sum + (addon ? addon.price : 0)
  }, 0)
  
  const totalPrice = selectedBase.price + totalAddons

  const handleConsultation = (duration, totalPay) => {
    const addonNames = selectedAddonIds.map(id => pricingData.addons.find(a => a.id === id)?.name).join(', ')
    const promoText = appliedPromoCode ? `%0A*Kode Promo:* ${appliedPromoCode} (Diskon ${promoDiscount}%)` : ''
    const msg = `Halo LOKAL, saya tertarik berlangganan LOKAL POS F&B.%0A%0A*Area:* ${selectedBase.area}%0A*Add-ons:* ${addonNames || 'Tidak ada'}%0A*Durasi:* ${duration} Bulan%0A*Total Pembayaran:* ${formatPrice(totalPay)}${promoText}.%0A%0AMohon panduannya.`
    window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-[#333333] flex flex-col selection:bg-[#E8681A] selection:text-white">
      <SEO 
        title="Sistem Kasir POS F&B - LOKAL | Kelola Resto Makin Mudah" 
        description="Aplikasi kasir (POS) khusus F&B dari LOKAL. Pantau pesanan, kelola stok, dan cegah kebocoran dana dari mana saja hanya pakai HP atau Tablet Anda."
      />
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        
        {/* Hero Section */}
        <section className="px-4 mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#1A7A7A]/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-left">
              <div className="mb-6 inline-block bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                <img src="/logo-produk/lokal-pos.webp" alt="LOKAL POS F&B" className="h-8 object-contain" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Tinggalkan Cara Lama. <br/>
                <span className="text-[#1A7A7A]">Kelola Resto Lebih Modern.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Kunci laci kasir Anda dan pantau resto dari mana saja. Sistem kasir cerdas tanpa alat mahal, cukup pakai tablet atau HP android yang sudah ada. Staf baru bisa lancar pakai dalam 3 menit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#pricing" className="bg-[#1A7A7A] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#135c5c] transition shadow-lg shadow-[#1A7A7A]/30 flex items-center justify-center gap-2">
                  Hitung Harga Paket
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
            
            {/* Hero Illustration */}
            <div className="relative">
              <div className="aspect-[4/3] bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 flex flex-col relative">
                {/* Decorative UI elements representing POS */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded text-xs font-bold text-gray-500">
                    Kasir Utama
                  </div>
                </div>
                
                <div className="flex gap-6 h-full">
                  {/* Left: Menu Items */}
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
                  {/* Right: Order Summary */}
                  <div className="w-1/3 bg-gray-50 rounded-xl border border-gray-100 p-4 flex flex-col">
                    <div className="font-bold text-sm mb-4">Order #1042</div>
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Nasi Goreng</span>
                        <span className="font-semibold">25k</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Es Teh</span>
                        <span className="font-semibold">5k</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-200 mt-auto">
                      <div className="flex justify-between text-sm font-bold mb-3">
                        <span>Total</span>
                        <span className="text-[#1A7A7A]">30k</span>
                      </div>
                      <div className="w-full py-2 bg-[#E8681A] rounded-lg text-white text-xs font-bold text-center">
                        Bayar
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -right-4 top-1/4 bg-white p-3 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-[bounce_4s_infinite]">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Pesanan Baru</div>
                    <div className="text-sm font-bold">Meja 04</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-4 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fitur Andalan Resto Modern</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Kami merancang sistem ini untuk menyelesaikan masalah klasik di bisnis kuliner. Tanpa ribet, langsung pakai.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-[#1A7A7A]/10 text-[#1A7A7A] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Store size={24} />
              </div>
              <h3 className="font-bold text-lg mb-3">Pencatatan Instan</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mencegah pesanan terlewat saat jam ramai. Klik menu, otomatis masuk ke dapur.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-[#E8681A]/10 text-[#E8681A] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Clock size={24} />
              </div>
              <h3 className="font-bold text-lg mb-3">Stok Real-time</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ketahui bahan baku yang hampir habis sebelum benar-benar kehabisan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-lg mb-3">Anti-Fraud & Laporan</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Rekap otomatis tiap pergantian shift kasir. Mencegah selisih uang dan kecurangan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Smartphone size={24} />
              </div>
              <h3 className="font-bold text-lg mb-3">Zero Hardware Cost</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bisa pakai HP atau tablet Android yang sudah Anda miliki. Sambungkan ke printer bluetooth murah.
              </p>
            </div>
          </div>
        </section>

        {/* Kalkulator Pricing Section (Dynamic) */}
        <section id="pricing" className="max-w-5xl mx-auto px-4 mb-24">
          <div className="text-center mb-10">
            <div className="inline-block bg-[#E8681A]/10 text-[#E8681A] px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4">
              KALKULATOR BIAYA
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sistem Fleksibel. Bayar Sesuai Kebutuhan.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              LOKAL POS F&B menggunakan model <strong>Basic + Add-ons</strong>. Pilih area Anda dan centang fitur ekstra yang Anda butuhkan di bawah ini untuk melihat estimasi biaya.
            </p>
          </div>

          <div className="bg-[#1A7A7A] rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2">
              {/* Left: Base Price (Selectable) */}
              <div className="p-8 md:p-10 text-white flex flex-col border-b md:border-b-0 md:border-r border-white/10">
                <h3 className="font-bold text-xl mb-2 text-white">1. Pilih Area Anda</h3>
                <p className="text-white/70 text-sm mb-6">Pilih paket dasar sesuai lokasi operasional bisnis Anda.</p>

                <div className="space-y-3">
                  {pricingData.basePrices && pricingData.basePrices.length > 0 ? (
                    pricingData.basePrices.map(item => (
                      <div 
                        key={item.id} 
                        onClick={() => setSelectedBaseId(item.id)}
                        className={`flex justify-between items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedBaseId === item.id 
                            ? 'bg-white text-[#1A7A7A] border-white shadow-lg scale-[1.02]' 
                            : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedBaseId === item.id ? 'border-[#1A7A7A]' : 'border-white/50'}`}>
                            {selectedBaseId === item.id && <div className="w-2.5 h-2.5 rounded-full bg-[#1A7A7A]" />}
                          </div>
                          <span className="font-semibold">{item.area}</span>
                        </div>
                        <span className="font-bold text-lg">{formatPrice(item.price)}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-white/60 italic text-sm">Menunggu pembaruan harga...</div>
                  )}
                </div>
                <p className="text-xs text-white/60 mt-6">*Khusus area LOKAL, sudah termasuk gratis instalasi teknisi ke lokasi.</p>
              </div>

              {/* Right: Addons Calculator */}
              <div className="bg-white p-8 md:p-10 flex flex-col">
                <h3 className="text-xl font-bold mb-2">2. Pilih Add-ons (Opsional)</h3>
                <p className="text-gray-500 text-sm mb-6">Centang fitur tambahan yang ingin diaktifkan.</p>

                <div className="space-y-3 mb-8 flex-1">
                  {pricingData.addons && pricingData.addons.length > 0 ? (
                    pricingData.addons.map(addon => (
                      <div 
                        key={addon.id} 
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all group ${
                          selectedAddonIds.includes(addon.id)
                            ? 'bg-[#E8681A]/5 border-[#E8681A]'
                            : 'bg-gray-50 border-transparent hover:border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors border ${
                            selectedAddonIds.includes(addon.id)
                              ? 'bg-[#E8681A] border-[#E8681A] text-white'
                              : 'bg-white border-gray-300 text-transparent group-hover:border-gray-400'
                          }`}>
                            <Check size={14} strokeWidth={3} />
                          </div>
                          <span className={`font-semibold ${selectedAddonIds.includes(addon.id) ? 'text-[#E8681A]' : 'text-gray-700'}`}>{addon.name}</span>
                        </div>
                        <span className={`font-bold ${selectedAddonIds.includes(addon.id) ? 'text-[#E8681A]' : 'text-gray-900'}`}>+{formatPrice(addon.price)}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 italic text-sm text-center py-6 border-2 border-dashed rounded-xl">Belum ada add-ons tersedia.</div>
                  )}
                </div>

                {/* Total Calculator Footer Removed */}

              </div>
            </div>
          </div>

          {/* Promo Code Input — secret code input, above subscription cards */}
          <div className="max-w-xl mx-auto mt-10 mb-4">
            <PromoCodeInput
              promoCodes={pricingData.promoCodes || []}
              onApply={(discount, code) => { setPromoDiscount(discount); setAppliedPromoCode(code) }}
              onClear={() => { setPromoDiscount(0); setAppliedPromoCode('') }}
            />
          </div>

          {/* Subscription Packages Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            
            {(() => {
              // Compute prices incorporating both volume discount + promo code discount
              const d6m = pricingData.discount6m ?? 0
              const d12m = pricingData.discount12m ?? 0
              // Promo code stacks on top of volume discount
              const price1m = totalPrice * (1 - promoDiscount / 100)
              const price6m = totalPrice * (1 - d6m / 100) * (1 - promoDiscount / 100)
              const price12m = totalPrice * (1 - d12m / 100) * (1 - promoDiscount / 100)
              const totalBadge6m = d6m > 0 ? `HEMAT ${d6m}%${promoDiscount > 0 ? ` + ${promoDiscount}% ekstra` : ''}` : (promoDiscount > 0 ? `PROMO ${promoDiscount}%` : null)
              const totalBadge12m = d12m > 0 ? `HEMAT ${d12m}%${promoDiscount > 0 ? ` + ${promoDiscount}% ekstra` : ''}` : (promoDiscount > 0 ? `PROMO ${promoDiscount}%` : null)
              const showStrike = promoDiscount > 0 || d6m > 0 || d12m > 0

              return (
                <>
                  {/* 1 Bulan */}
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col relative">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Paket 1 Bulan</h3>
                    <p className="text-sm text-gray-500 mb-6">Cocok untuk mencoba sistem.</p>
                    <div className="mb-8">
                      {promoDiscount > 0 && (
                        <div className="text-sm text-gray-400 line-through mb-1">{formatPrice(totalPrice)}</div>
                      )}
                      <div className={`text-3xl font-black ${promoDiscount > 0 ? 'text-green-600' : 'text-gray-900'}`}>{formatPrice(price1m)}</div>
                      <div className="text-sm text-gray-500 mt-1">/ bulan</div>
                    </div>
                    <div className="flex-1"></div>
                    <div className="pt-6 border-t border-gray-100 mt-auto">
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-gray-500">Total Bayar:</span>
                        <span className="font-bold text-gray-900">{formatPrice(price1m)}</span>
                      </div>
                      <button onClick={() => handleConsultation(1, price1m)} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition">
                        Pilih 1 Bulan
                      </button>
                    </div>
                  </div>

                  {/* 6 Bulan */}
                  <div className="bg-white rounded-3xl p-8 border-2 border-[#1A7A7A] shadow-xl flex flex-col relative transform md:-translate-y-4">
                    {totalBadge6m && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1A7A7A] text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider whitespace-nowrap">
                        {totalBadge6m}
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Paket 6 Bulan</h3>
                    <p className="text-sm text-gray-500 mb-6">Pilihan cerdas untuk kestabilan.</p>
                    <div className="mb-8">
                      {(d6m > 0 || promoDiscount > 0) && (
                        <div className="text-sm text-gray-400 line-through mb-1">{formatPrice(totalPrice)}</div>
                      )}
                      <div className="text-3xl font-black text-[#1A7A7A]">{formatPrice(price6m)}</div>
                      <div className="text-sm text-gray-500 mt-1">/ bulan</div>
                    </div>
                    <div className="flex-1"></div>
                    <div className="pt-6 border-t border-gray-100 mt-auto">
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-gray-500">Total Bayar:</span>
                        <span className="font-bold text-gray-900">{formatPrice(price6m * 6)}</span>
                      </div>
                      <button onClick={() => handleConsultation(6, price6m * 6)} className="w-full bg-[#1A7A7A] text-white py-3 rounded-xl font-bold hover:bg-[#135c5c] transition shadow-lg shadow-[#1A7A7A]/30">
                        Pilih 6 Bulan
                      </button>
                    </div>
                  </div>

                  {/* 12 Bulan */}
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col relative">
                    {totalBadge12m && (
                      <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#E8681A] text-white px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap">
                        {totalBadge12m}
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Paket 1 Tahun</h3>
                    <p className="text-sm text-gray-500 mb-6">Investasi terbaik, bebas repot.</p>
                    <div className="mb-8">
                      {(d12m > 0 || promoDiscount > 0) && (
                        <div className="text-sm text-gray-400 line-through mb-1">{formatPrice(totalPrice)}</div>
                      )}
                      <div className="text-3xl font-black text-gray-900">{formatPrice(price12m)}</div>
                      <div className="text-sm text-gray-500 mt-1">/ bulan</div>
                    </div>
                    <div className="flex-1"></div>
                    <div className="pt-6 border-t border-gray-100 mt-auto">
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-gray-500">Total Bayar:</span>
                        <span className="font-bold text-gray-900">{formatPrice(price12m * 12)}</span>
                      </div>
                      <button onClick={() => handleConsultation(12, price12m * 12)} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition">
                        Pilih 1 Tahun
                      </button>
                    </div>
                  </div>
                </>
              )
            })()}

          </div>
        </section>

        {/* SEO Article Section */}
        <section className="max-w-4xl mx-auto px-4 mt-10 border-t border-gray-200 pt-16">
          <article className="prose prose-gray prose-a:text-[#1A7A7A] max-w-none">
            <h2 className="text-2xl font-bold mb-6">Mengapa Bisnis F&B Wajib Menggunakan Sistem POS Modern?</h2>
            
            <p className="text-gray-600 leading-relaxed mb-4">
              Dalam era digital saat ini, persaingan bisnis kuliner (Food and Beverage) semakin ketat. Mengandalkan metode pencatatan manual di buku kasir bukan lagi pilihan yang ideal. Seringkali, pencatatan manual memicu berbagai masalah operasional: mulai dari antrean pelanggan yang mengular karena proses pembayaran yang lambat, pesanan makanan yang sering terlewat atau salah catat, hingga laporan keuangan yang rawan selisih atau bahkan kecurangan (fraud).
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">Keuntungan Cloud POS untuk UMKM</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sistem kasir berbasis cloud, seperti <strong>LOKAL POS F&B</strong>, hadir sebagai solusi tepat guna untuk UMKM. Berbeda dengan mesin kasir tradisional yang besar dan memakan biaya investasi hingga belasan juta rupiah, Cloud POS memungkinkan pemilik bisnis menggunakan perangkat yang sudah ada (seperti smartphone atau tablet Android). Hal ini secara drastis menekan biaya awal <em>(zero hardware cost)</em>.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Selain itu, seluruh data penjualan, stok bahan baku, dan laporan shift karyawan tersimpan dengan aman di server cloud. Ini memberikan fleksibilitas luar biasa bagi pemilik restoran untuk memantau performa berbagai cabang secara <em>real-time</em>, kapan saja dan di mana saja, hanya melalui genggaman tangan.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">Fitur Esensial dalam Memilih Aplikasi Kasir</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-8">
              <li><strong>Manajemen Inventori:</strong> Mengurangi pemborosan bahan baku (food waste) dengan pengingat stok otomatis.</li>
              <li><strong>Manajemen Meja & Dine-in:</strong> Mencegah tumpang tindih pesanan di meja yang sama saat jam sibuk.</li>
              <li><strong>Laporan Analitik Komprehensif:</strong> Membantu mengidentifikasi menu paling laris (best seller) untuk menyusun strategi promo yang lebih akurat.</li>
              <li><strong>Akses Multi-Karyawan:</strong> Pembatasan hak akses antara kasir, pelayan, dan manajer/pemilik untuk menjaga keamanan data finansial.</li>
            </ul>

            <p className="text-gray-600 leading-relaxed">
              Dengan digitalisasi melalui aplikasi kasir yang handal dan transparan, bisnis F&B Anda siap untuk tidak hanya bertahan, tetapi juga berkembang dan melakukan ekspansi cabang dengan jauh lebih mudah. Tinggalkan cara lama, beralihlah ke LOKAL POS hari ini.
            </p>
          </article>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp phoneNumber="6281234567890" accountName="LOKAL Team" />
    </div>
  )
}
