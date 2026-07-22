'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, MessageCircle, ShieldCheck, Tag, Pointer, RefreshCcw, PenTool } from 'lucide-react'
import Image from 'next/image'
import PromoCodeInput from '@/components/PromoCodeInput'

interface PromoCode  { id: string; code: string; discount: number; isActive: boolean }
interface PricingData { basePrices: { id: string; area: string; price: number }[]; promoCodes: PromoCode[] }

const DEFAULT: PricingData = {
  basePrices:  [
    { id: '1', area: 'Basic (Per Tahun)',    price: 257000 },
    { id: '2', area: 'Standard (Per Tahun)', price: 735000 },
  ],
  promoCodes: [{ id: 'p1', code: 'BROSURDIGITAL', discount: 20, isActive: true }],
}

const fmt = (p: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(p)

const CM = <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>

export default function BrosurHubPage() {
  const [pricing, setPricing]           = useState<PricingData>(DEFAULT)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [appliedPromo, setAppliedPromo]   = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('lokal_pricing_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<string, PricingData>
        if (parsed['brosurhub']) {
          const d = parsed['brosurhub']
          if (!d.promoCodes) d.promoCodes = DEFAULT.promoCodes
          setPricing(d)
        }
      } catch { /* use defaults */ }
    }
  }, [])

  const handleConsultation = (paket = '') => {
    const promoText = appliedPromo ? ` (Kode Promo: ${appliedPromo}, Diskon ${promoDiscount}%)` : ''
    const msg = `Halo LOKAL, saya tertarik membuat brosur digital dengan ${paket || 'jasa BrosurHub'}${promoText}. Mohon info selengkapnya.`
    window.open(`https://wa.me/6285111326098?text=${msg}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-[#333333] flex flex-col selection:bg-[#E8681A] selection:text-white">
      <main className="flex-grow pt-24 pb-16">

        {/* Hero */}
        <section className="px-4 mb-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-pink-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="flex items-center gap-4 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lokal.png" alt="LOKAL" className="h-6 object-contain" />
                <span className="text-gray-300 font-light text-2xl">×</span>
                <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo-produk/brosur-hub.jpg" alt="BrosurHub" className="h-8 object-contain" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Brosur Kertas?<br />
                <span className="text-pink-600">Udah Basi.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Masih cetak brosur 1.000 lembar tiap bulan? Stop dulu. Saatnya beralih ke brosur digital interaktif. Kamu isi form pesanan, tim kami yang buatkan sampai live!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#pricing" className="bg-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-pink-700 transition shadow-lg shadow-pink-600/30 flex items-center justify-center">Lihat Harga Promo</a>
                <a href="https://brosurhub.com/live-demo.php" target="_blank" rel="noopener noreferrer" className="bg-white text-pink-600 border-2 border-pink-100 px-8 py-4 rounded-xl font-bold hover:bg-pink-50 transition flex items-center justify-center">
                  Lihat Live Demo <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="aspect-[4/3] bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-green-400" /></div>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1 border border-gray-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                    <div className="text-[10px] font-bold text-gray-500">brosurhub.id/promo</div>
                  </div>
                </div>
                <div className="flex gap-3 flex-1 min-h-0">
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="text-xs font-bold text-gray-500 mb-1">Editor Brosur Digital</div>
                    <div className="flex-1 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-3 flex flex-col relative overflow-hidden">
                      <div className="bg-white/20 rounded-lg h-16 mb-2 flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-1 p-2 w-full"><div className="bg-white/30 rounded aspect-square" /><div className="bg-white/30 rounded aspect-square" /><div className="bg-white/30 rounded aspect-square" /></div>
                      </div>
                      <div className="w-3/4 h-2.5 bg-white/70 rounded mb-1.5" />
                      <div className="w-1/2 h-2 bg-white/50 rounded mb-3" />
                      <div className="bg-white rounded-lg py-1.5 px-3 self-start"><div className="text-[8px] font-black text-pink-600">Pesan Sekarang →</div></div>
                    </div>
                    <div className="flex gap-1.5">
                      {['bg-pink-200', 'bg-rose-200', 'bg-pink-100'].map((c, i) => (
                        <div key={i} className={`flex-1 ${c} rounded-lg h-8 border-2 ${i === 0 ? 'border-pink-500' : 'border-transparent'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="w-28 flex flex-col gap-2">
                    <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                      <div className="text-[9px] font-bold text-gray-500 mb-1.5">Statistik Brosur</div>
                      {[{ label: 'Dilihat', val: '1.2k', bar: 'w-full', color: 'bg-pink-500' }, { label: 'Diklik', val: '340', bar: 'w-3/4', color: 'bg-rose-400' }, { label: 'WA Masuk', val: '28', bar: 'w-1/3', color: 'bg-green-400' }].map((s, i) => (
                        <div key={i}><div className="flex justify-between text-[8px] text-gray-500 mb-0.5"><span>{s.label}</span><span className="font-bold">{s.val}</span></div><div className="w-full bg-gray-200 rounded-full h-1"><div className={`${s.bar} ${s.color} h-1 rounded-full`} /></div></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 animate-[bounce_4s_infinite]">
                <div className="bg-pink-100 text-pink-600 p-1.5 rounded-lg"><Pointer size={14} /></div>
                <div><div className="text-[10px] text-gray-400">Interaktif</div><div className="text-xs font-bold">Klik & Pesan 🎯</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Solusi Digital Masa Kini</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Dari warung makan sampai korporat, kami punya template dan fitur yang disesuaikan.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { Icon: PenTool,    bg: 'bg-pink-100',  color: 'text-pink-600',  title: 'Tim Kami yang Desain', desc: 'Tanpa pusing desain. Ceritakan bisnismu di form, tim kami siap bantu dari awal sampai brosurmu siap sebar.' },
              { Icon: Pointer,    bg: 'bg-blue-100',  color: 'text-blue-600',  title: 'Brosur Interaktif',    desc: 'Masukkan tombol pesanan WhatsApp, link Google Maps, atau video langsung ke dalam brosur.' },
              { Icon: RefreshCcw, bg: 'bg-green-100', color: 'text-green-600', title: 'Live & Mudah Direvisi', desc: 'Harga berubah? Typo? Ganti foto? Chat WhatsApp asisten kami, dan konten langsung terupdate tanpa repot.' },
            ].map(({ Icon, bg, color, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center mb-6`}><Icon size={24} /></div>
                <h3 className="font-bold text-lg mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="max-w-6xl mx-auto px-4 mb-24">
          <div className="bg-pink-50 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3">COCOK UNTUK SEMUA BISNIS</div>
              <h2 className="text-3xl font-bold mb-4">Satu Brosur, Banyak Kegunaan</h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: 'Katalog Produk', desc: 'Tampilkan puluhan produk dengan foto HD, deskripsi, dan tombol order langsung ke WA admin toko.', emoji: '🛍️' },
                { title: 'Menu Restoran',  desc: 'Scan QR di meja, pelanggan langsung bisa lihat menu, gambar makanan, dan total harga pesanan.',     emoji: '🍔' },
                { title: 'Portofolio Jasa',desc: 'Tunjukkan hasil kerja terbaik Anda lengkap dengan testimoni pelanggan.',                              emoji: '✂️' },
                { title: 'Undangan Digital',desc: 'Sebar undangan event, seminar, atau pernikahan secara estetik dengan integrasi peta lokasi.',         emoji: '💌' },
              ].map(item => (
                <div key={item.title} className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50 hover:-translate-y-1 transition duration-300">
                  <div className="text-3xl mb-4">{item.emoji}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Cara Kerja Pembuatan Brosur</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Hanya butuh 3 langkah mudah sampai brosur digital Anda siap disebar.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Pilih Template & Isi Form', desc: 'Pilih desain yang cocok, lalu kirimkan materi foto dan teks (copywriting) ke tim kami.' },
              { step: '02', title: 'Tim Kami Mendesain',        desc: 'Duduk manis. Desainer kami akan merangkai materi Anda menjadi brosur interaktif.' },
              { step: '03', title: 'Live & Mulai Sebar',        desc: 'Brosur selesai! Anda dapat link khusus dan QR code untuk disebar via IG, FB, atau WA.' },
            ].map(s => (
              <div key={s.step} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-pink-600 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-pink-600/30 mb-6 transform rotate-3 hover:rotate-0 transition">{s.step}</div>
                <h3 className="font-bold text-lg text-gray-800 mb-3">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed px-4">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="max-w-5xl mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Paket Pembuatan Brosur</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Pilih paket pembuatan brosur digital interaktif untuk bisnis Anda.</p>
          </div>

          <div className="max-w-xl mx-auto mb-10">
            <PromoCodeInput
              promoCodes={pricing.promoCodes}
              onApply={(d, c) => { setPromoDiscount(d); setAppliedPromo(c) }}
              onClear={() => { setPromoDiscount(0); setAppliedPromo('') }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Basic */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col hover:border-pink-300 transition">
              <h3 className="text-2xl font-black text-gray-800 mb-1">Basic</h3>
              <div className="text-sm font-semibold text-pink-500 mb-3">brosurhub.com/namamu</div>
              <p className="text-sm text-gray-500 mb-6">Paling pas untuk UMKM yang baru mulai go digital.</p>
              <div className="mb-8">
                {promoDiscount > 0 && <div className="text-sm text-gray-400 line-through mb-1">{fmt(257000)}</div>}
                <div className={`text-4xl font-black ${promoDiscount > 0 ? 'text-green-600' : 'text-gray-900'}`}>{fmt(257000 * (1 - promoDiscount / 100))}</div>
                <div className="text-sm text-gray-500 mt-1 font-medium">/ tahun (Bayar di Muka)</div>
              </div>
              <ul className="flex-1 space-y-3 mb-8">
                {['Brosur digital interaktif', 'Bagikan lewat link & QR', 'Desain basic', 'Analitik dasar', 'Update konten kapan saja'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <div className="w-4 h-4 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center shrink-0 mt-0.5">{CM}</div>{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleConsultation(`Paket Brosur Basic (${fmt(257000 * (1 - promoDiscount / 100))}/tahun)`)} className="w-full bg-pink-50 text-pink-600 py-3.5 rounded-xl font-bold hover:bg-pink-100 transition">Pilih Paket</button>
            </div>

            {/* Standard */}
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-xl flex flex-col relative transform md:-translate-y-2">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">POPULAR</div>
              <h3 className="text-2xl font-black text-white mb-1">Standard</h3>
              <div className="text-sm font-semibold text-pink-400 mb-3">namamu.my.id</div>
              <p className="text-sm text-gray-400 mb-6">Domain my.id personal untuk branding lebih profesional.</p>
              <div className="mb-8">
                {promoDiscount > 0 && <div className="text-sm text-gray-500 line-through mb-1">{fmt(735000)}</div>}
                <div className={`text-4xl font-black ${promoDiscount > 0 ? 'text-green-400' : 'text-white'}`}>{fmt(735000 * (1 - promoDiscount / 100))}</div>
                <div className="text-sm text-gray-500 mt-1 font-medium">/ tahun (Bayar di Muka)</div>
              </div>
              <ul className="flex-1 space-y-3 mb-8">
                {['Domain .my.id', 'Semua fitur Basic', 'Desain basic+', 'Analitik lengkap', 'SSL included', 'Basic support'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <div className="w-4 h-4 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 mt-0.5">{CM}</div>{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleConsultation(`Paket Brosur Standard (${fmt(735000 * (1 - promoDiscount / 100))}/tahun)`)} className="w-full bg-pink-500 text-white py-3.5 rounded-xl font-bold hover:bg-pink-600 transition shadow-lg shadow-pink-500/20">Pilih Paket</button>
            </div>
          </div>
        </section>

        {/* Promo Bridge */}
        <section id="promo" className="max-w-4xl mx-auto px-4 mb-16">
          <div className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 text-white">
                <div className="inline-block bg-[#E8681A]/20 text-[#E8681A] px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 border border-[#E8681A]/30">PENAWARAN SPESIAL LOKAL</div>
                <h2 className="text-3xl font-bold mb-6">Mengapa Pesan via LOKAL?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3"><Tag className="text-[#E8681A] shrink-0 mt-1" size={20} /><div><h3 className="font-bold text-lg">Diskon Eksklusif</h3><p className="text-sm text-gray-400 mt-1">Dapatkan penawaran harga dan bonus desain tambahan yang tidak ada di website utama BrosurHub.</p></div></div>
                  <div className="flex items-start gap-3"><ShieldCheck className="text-pink-400 shrink-0 mt-1" size={20} /><div><h3 className="font-bold text-lg">Bantuan Materi Konten</h3><p className="text-sm text-gray-400 mt-1">Tim LOKAL siap mendampingi Anda menyusun copywriting dan materi gambar agar brosur digital Anda lebih menjual.</p></div></div>
                </div>
              </div>
              <div className="w-full md:w-80 flex flex-col gap-4">
                <button onClick={() => handleConsultation()} className="w-full bg-[#E8681A] hover:bg-[#c95914] text-white py-4 px-6 rounded-xl font-bold transition shadow-lg shadow-[#E8681A]/30 flex items-center justify-center gap-2">
                  <MessageCircle size={20} /> Konsultasi via WhatsApp
                </button>
                <div className="flex items-center gap-4 my-2 opacity-30"><div className="h-px bg-white flex-1" /><span className="text-xs font-bold text-white">ATAU</span><div className="h-px bg-white flex-1" /></div>
                <a href="https://brosurhub.com/" target="_blank" rel="noopener noreferrer" className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-4 px-6 rounded-xl font-bold transition flex items-center justify-center gap-2">
                  Pelajari BrosurHub Asli <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
