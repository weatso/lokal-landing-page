import { useState, useEffect } from 'react'
import { ExternalLink, MessageCircle, ShieldCheck, Tag, Pointer, MessageSquarePlus, RefreshCcw, PenTool } from 'lucide-react'
import PromoCodeInput from '../components/PromoCodeInput'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingWhatsApp from '../components/FloatingWhatsApp'

export default function BrosurHub() {
  const defaultBrosurPricing = {
    title: 'LOKAL x BrosurHub',
    basePrices: [
      { id: '1', area: 'Basic (Per Tahun)', price: 59000 },
      { id: '2', area: 'Standard (Per Tahun)', price: 119000 },
      { id: '3', area: 'Premium (Per Tahun)', price: 169000 }
    ],
    promoCodes: [
      { id: 'p1', code: 'BROSURDIGITAL', discount: 20, isActive: true }
    ]
  }
  const [pricingData, setPricingData] = useState(defaultBrosurPricing)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [appliedPromoCode, setAppliedPromoCode] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Load pricing from CMS
    const saved = localStorage.getItem('lokal_pricing_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed['brosurhub']) {
          const data = parsed['brosurhub']
          if (!data.promoCodes) data.promoCodes = defaultBrosurPricing.promoCodes
          setPricingData(data)
        }
      } catch (e) {
        console.error('Failed to parse pricing', e)
      }
    }
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const handleConsultation = (paket = '') => {
    const paketText = paket ? `paket ${paket}` : 'jasa BrosurHub'
    const promoText = appliedPromoCode ? ` (Kode Promo: ${appliedPromoCode}, Diskon ${promoDiscount}%)` : ''
    const msg = `Halo LOKAL, saya tertarik membuat brosur digital dengan ${paketText}${promoText}. Mohon info selengkapnya.`
    window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-[#333333] flex flex-col selection:bg-[#E8681A] selection:text-white">
      <SEO 
        title="LOKAL x BrosurHub | Jasa Brosur Digital Interaktif" 
        description="Ubah brosur cetak Anda menjadi brosur digital interaktif. Dapatkan diskon eksklusif dan layanan prioritas hanya melalui LOKAL."
      />
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        
        {/* Hero Section */}
        <section className="px-4 mb-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-pink-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-left">
              <div className="flex items-center gap-4 mb-6">
                <img src="/lokal.png" alt="LOKAL" className="h-6 object-contain" />
                <span className="text-gray-300 font-light text-2xl">×</span>
                <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                  <img src="/logo-produk/brosur-hub.jpg" alt="BrosurHub" className="h-8 object-contain" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Brosur Kertas? <br/>
                <span className="text-pink-600">Udah Basi.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Masih cetak brosur 1.000 lembar tiap bulan? Stop dulu. Saatnya beralih ke brosur digital interaktif. Kamu isi form pesanan, tim kami yang buatkan sampai live!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#pricing" className="bg-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-pink-700 transition shadow-lg shadow-pink-600/30 flex items-center justify-center">
                  Lihat Harga Promo
                </a>
                <a 
                  href="https://brosurhub.com/live-demo.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-pink-600 border-2 border-pink-100 px-8 py-4 rounded-xl font-bold hover:bg-pink-50 transition flex items-center justify-center"
                >
                  Lihat Live Demo
                </a>
              </div>
            </div>
            
            {/* Hero Illustration — UI Mockup */}
            <div className="relative">
              <div className="aspect-[4/3] bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 flex flex-col relative overflow-hidden">
                {/* Window chrome */}
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1 border border-gray-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                    <div className="text-[10px] font-bold text-gray-500">brosurhub.id/promo</div>
                  </div>
                </div>

                <div className="flex gap-3 flex-1 min-h-0">
                  {/* Left: brochure preview */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="text-xs font-bold text-gray-500 mb-1">Editor Brosur Digital</div>
                    {/* Brosur canvas */}
                    <div className="flex-1 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-3 flex flex-col relative overflow-hidden">
                      {/* Hero image placeholder */}
                      <div className="bg-white/20 rounded-lg h-16 mb-2 flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-1 p-2 w-full">
                          <div className="bg-white/30 rounded aspect-square" />
                          <div className="bg-white/30 rounded aspect-square" />
                          <div className="bg-white/30 rounded aspect-square" />
                        </div>
                      </div>
                      {/* Text placeholders */}
                      <div className="w-3/4 h-2.5 bg-white/70 rounded mb-1.5" />
                      <div className="w-1/2 h-2 bg-white/50 rounded mb-3" />
                      {/* CTA button */}
                      <div className="bg-white rounded-lg py-1.5 px-3 self-start">
                        <div className="text-[8px] font-black text-pink-600">Pesan Sekarang →</div>
                      </div>
                      {/* Hotspot indicator */}
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/90 border-2 border-yellow-400 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      </div>
                    </div>
                    {/* Page thumbnails */}
                    <div className="flex gap-1.5">
                      {['bg-pink-200', 'bg-rose-200', 'bg-pink-100'].map((c, i) => (
                        <div key={i} className={`flex-1 ${c} rounded-lg h-8 border-2 ${i === 0 ? 'border-pink-500' : 'border-transparent'}`} />
                      ))}
                    </div>
                  </div>

                  {/* Right panel */}
                  <div className="w-28 flex flex-col gap-2">
                    {/* Analytics */}
                    <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                      <div className="text-[9px] font-bold text-gray-500 mb-1.5">Statistik Brosur</div>
                      <div className="space-y-1.5">
                        {[
                          { label: 'Dilihat', val: '1.2k', bar: 'w-full', color: 'bg-pink-500' },
                          { label: 'Diklik', val: '340', bar: 'w-3/4', color: 'bg-rose-400' },
                          { label: 'WA Masuk', val: '28', bar: 'w-1/3', color: 'bg-green-400' },
                        ].map((s, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-[8px] text-gray-500 mb-0.5">
                              <span>{s.label}</span><span className="font-bold">{s.val}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div className={`${s.bar} ${s.color} h-1 rounded-full`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Share options */}
                    <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                      <div className="text-[9px] font-bold text-gray-500 mb-1.5">Bagikan Via</div>
                      <div className="flex flex-col gap-1.5">
                        <div className="bg-green-500 rounded-lg px-2 py-1.5 flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                          <div className="text-[9px] text-white font-bold">WhatsApp</div>
                        </div>
                        <div className="bg-gray-200 rounded-lg px-2 py-1.5 flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 bg-gray-400 rounded" />
                          <div className="text-[9px] text-gray-600 font-bold">Salin Link</div>
                        </div>
                      </div>
                    </div>
                    {/* QR Code */}
                    <div className="bg-pink-50 rounded-xl p-2 border border-pink-100 text-center">
                      <div className="grid grid-cols-4 gap-0.5 w-12 mx-auto mb-1">
                        {Array(16).fill(0).map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-[2px] ${[0,1,4,5,6,9,10,14,15].includes(i) ? 'bg-pink-700' : 'bg-pink-100'}`} />
                        ))}
                      </div>
                      <div className="text-[9px] font-bold text-pink-600">QR Brosur</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-4 -bottom-4 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 animate-[bounce_4s_infinite]">
                <div className="bg-pink-100 text-pink-600 p-1.5 rounded-lg">
                  <Pointer size={14} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Interaktif</div>
                  <div className="text-xs font-bold">Klik &amp; Pesan 🎯</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-4 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Solusi Digital Masa Kini</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Dari warung makan sampai korporat, kami punya template dan fitur yang disesuaikan.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-6">
                <PenTool size={24} />
              </div>
              <h3 className="font-bold text-lg mb-3">Tim Kami yang Desain</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tanpa pusing desain. Ceritakan bisnismu di form, tim kami siap bantu dari awal sampai brosurmu siap sebar.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Pointer size={24} />
              </div>
              <h3 className="font-bold text-lg mb-3">Brosur Interaktif</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Masukkan tombol pesanan WhatsApp, link Google Maps, atau video langsung ke dalam brosur.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <RefreshCcw size={24} />
              </div>
              <h3 className="font-bold text-lg mb-3">Live & Mudah Direvisi</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Harga berubah? Typo? Ganti foto? Chat WhatsApp asisten kami, dan konten langsung terupdate tanpa repot.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <MessageSquarePlus size={24} />
              </div>
              <h3 className="font-bold text-lg mb-3">Fitur WhatsApp Blast</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Blast link brosurmu ke ribuan nomor WA pelanggan lama. Prospek langsung buka, baca, dan order.
              </p>
            </div>
          </div>
        </section>

        {/* WA Blast Section */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute left-0 bottom-0 w-48 h-48 bg-white/5 rounded-full -translate-x-1/3 translate-y-1/3" />
            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
              {/* Left content */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-sm font-bold mb-5">
                  <MessageSquarePlus size={16} />
                  Fitur WA Blast
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Jangkau Ribuan Pelanggan<br/>Cukup dari WhatsApp</h2>
                <p className="text-white/80 leading-relaxed mb-6">
                  Blast link brosur digital Anda ke ratusan hingga ribuan nomor WA pelanggan lama. Mereka langsung buka, baca, dan order — tanpa biaya iklan.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { icon: '📤', text: 'Kirim ke ratusan kontak sekaligus' },
                    { icon: '📊', text: 'Statistik buka & klik real-time' },
                    { icon: '🎯', text: 'Target pelanggan lama yang relevan' },
                    { icon: '⚡', text: 'Proses cepat, tanpa ribet' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-white/10 rounded-xl px-3 py-2.5">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-semibold">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right: mockup phone */}
              <div className="w-full md:w-72 shrink-0">
                <div className="bg-white rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <MessageSquarePlus size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-800">WA Blast Manager</div>
                      <div className="text-[10px] text-green-500">● Online</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: 'Total Kontak', val: '1.240', color: 'bg-blue-50 text-blue-700' },
                      { label: 'Terkirim', val: '1.204', color: 'bg-green-50 text-green-700' },
                      { label: 'Dibuka', val: '836', color: 'bg-yellow-50 text-yellow-700' },
                      { label: 'Klik Order', val: '112', color: 'bg-pink-50 text-pink-700' },
                    ].map((s, i) => (
                      <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg ${s.color}`}>
                        <span className="text-xs font-semibold">{s.label}</span>
                        <span className="text-sm font-black">{s.val}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleConsultation('Fitur WA Blast BrosurHub')}
                    className="w-full mt-3 bg-green-500 text-white text-sm font-bold py-2.5 rounded-xl hover:bg-green-600 transition"
                  >
                    Konsultasi WA Blast
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        {pricingData && pricingData.basePrices && pricingData.basePrices.length > 0 && (
          <section id="pricing" className="max-w-6xl mx-auto px-4 mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Pilih Paket Pembuatan Brosur</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Pilih paket yang paling pas untuk kebutuhan marketing bisnis Anda.</p>
            </div>

            {/* Promo Code Input */}
            <div className="max-w-xl mx-auto mb-8">
              <PromoCodeInput
                promoCodes={pricingData.promoCodes || []}
                onApply={(discount, code) => { setPromoDiscount(discount); setAppliedPromoCode(code) }}
                onClear={() => { setPromoDiscount(0); setAppliedPromoCode('') }}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {pricingData.basePrices.map((pkg, idx) => {
                const discountedPrice = pkg.price * (1 - promoDiscount / 100)
                const highlight = promoDiscount > 0 && idx === 0
                return (
                  <div key={pkg.id} className={`bg-white rounded-3xl p-8 border shadow-sm flex flex-col transition ${highlight ? 'border-green-500 shadow-green-500/20 md:-translate-y-2' : promoDiscount > 0 ? 'border-pink-100' : 'border-gray-100'}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{pkg.area}</h3>
                    <div className="mb-6">
                      {promoDiscount > 0 && (
                        <>
                          <div className="text-sm text-gray-400 line-through mb-1">{formatPrice(pkg.price)}</div>
                          <div className="text-xs text-green-600 font-bold mb-1">Diskon {promoDiscount}% terapkan</div>
                        </>
                      )}
                      <div className={`text-3xl font-black ${promoDiscount > 0 ? 'text-green-600' : 'text-pink-600'}`}>{formatPrice(discountedPrice)}</div>
                      <div className="text-sm text-gray-500 mt-1">/ tahun</div>
                    </div>
                    <div className="flex-1"></div>
                    <button
                      onClick={() => handleConsultation(`BrosurHub ${pkg.area} — ${formatPrice(pkg.price * (1 - promoDiscount / 100))}/tahun`)}
                      className={`w-full py-3 rounded-xl font-bold transition mt-6 ${promoDiscount > 0 ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-pink-50 text-pink-600 hover:bg-pink-100'}`}
                    >
                      Konsultasi Paket Ini
                    </button>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Promo Bridge Section */}
        <section id="promo" className="max-w-4xl mx-auto px-4 mb-16">
          <div className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
              
              <div className="flex-1 text-white">
                <div className="inline-block bg-[#E8681A]/20 text-[#E8681A] px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 border border-[#E8681A]/30">
                  PENAWARAN SPESIAL LOKAL
                </div>
                <h2 className="text-3xl font-bold mb-6">Mengapa Pesan via LOKAL?</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Tag className="text-[#E8681A] shrink-0 mt-1" size={20} />
                    <div>
                      <h3 className="font-bold text-lg">Diskon Eksklusif</h3>
                      <p className="text-sm text-gray-400 mt-1">Dapatkan penawaran harga dan bonus desain tambahan yang tidak ada di website utama BrosurHub.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="text-pink-400 shrink-0 mt-1" size={20} />
                    <div>
                      <h3 className="font-bold text-lg">Bantuan Materi Konten</h3>
                      <p className="text-sm text-gray-400 mt-1">Tim LOKAL siap mendampingi Anda menyusun copywriting dan materi gambar agar brosur digital Anda lebih menjual.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-80 flex flex-col gap-4">
                <button 
                  onClick={() => handleConsultation()}
                  className="w-full bg-[#E8681A] hover:bg-[#c95914] text-white py-4 px-6 rounded-xl font-bold transition shadow-lg shadow-[#E8681A]/30 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Konsultasi via WhatsApp
                </button>
                
                <div className="flex items-center gap-4 my-2 opacity-30">
                  <div className="h-px bg-white flex-1" />
                  <span className="text-xs font-bold text-white">ATAU</span>
                  <div className="h-px bg-white flex-1" />
                </div>

                <a 
                  href="https://brosurhub.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-4 px-6 rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  Pelajari BrosurHub Asli
                  <ExternalLink size={18} />
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp phoneNumber="6281234567890" accountName="LOKAL Team" />
    </div>
  )
}
