'use client'

import { useState, useEffect } from 'react'
import { MessageSquarePlus, Activity, Target, Zap, ShieldCheck, Eye, MessageCircle, TrendingUp, MousePointerClick, BarChart } from 'lucide-react'
import Image from 'next/image'

const fmt = (p: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(p)

const DEFAULT_PLANS = [
  { name: 'Blast Starter', kontak: 500,    original: 435000,  promo: 318000,  perNomor: '636', badge: 'PALING HEMAT', features: ['500 nomor WhatsApp', 'Kirim dalam 1-2 jam', 'Laporan pengiriman', 'Target area bebas'], popular: false },
  { name: 'Blast Growth',  kontak: 2500,   original: 1900000, promo: 1390000, perNomor: '556', badge: '', features: ['2.500 nomor WhatsApp', 'Kirim dalam 3-4 jam', 'Laporan lengkap', 'Segmentasi per kota', 'Tim bantu kirim'], popular: true },
  { name: 'Blast Scale',   kontak: 10000,  original: 6520000, promo: 4760000, perNomor: '476', badge: '', features: ['10.000 nomor WhatsApp', 'Kirim dalam 1 hari kerja', 'Dashboard analitik', 'Segmentasi minat & demografi', 'Dedicated account manager'], popular: false },
]

const FEATURES = [
  { Icon: Eye,               bg: 'bg-blue-100',    color: 'text-blue-600',    title: 'Open Rate 90%+',       desc: 'Pesan WhatsApp dibuka jauh lebih tinggi dibanding email atau iklan digital.' },
  { Icon: Target,            bg: 'bg-purple-100',  color: 'text-purple-600',  title: 'Tepat Sasaran',        desc: 'Segmentasi berdasarkan kota, minat, atau demografi - bukan asal sebar.' },
  { Icon: MessageCircle,     bg: 'bg-green-100',   color: 'text-green-600',   title: 'Prospek Langsung Chat',desc: 'Pelanggan tertarik? Klik link brosurmu dan lanjut tanya langsung via WA.' },
  { Icon: Zap,               bg: 'bg-yellow-100',  color: 'text-yellow-600',  title: 'Hasil Instan',         desc: 'Hanya hitungan jam, ratusan calon pelanggan sudah melihat penawaranmu.' },
  { Icon: TrendingUp,        bg: 'bg-emerald-100', color: 'text-emerald-600', title: 'ROI Tinggi',           desc: 'Mulai dari ratusan rupiah per kontak - jauh lebih murah dari iklan banner atau radio.' },
  { Icon: ShieldCheck,       bg: 'bg-orange-100',  color: 'text-orange-600',  title: 'Aman & Legal',         desc: 'Database kontak bersih, sesuai regulasi, dan tim kami yang eksekusi.' },
  { Icon: MousePointerClick, bg: 'bg-pink-100',    color: 'text-pink-600',    title: 'Maksimalkan Website',  desc: 'Website tanpa pengunjung sia-sia. Blast menyalurkan traffic ke brosurmu.' },
  { Icon: BarChart,          bg: 'bg-indigo-100',  color: 'text-indigo-600',  title: 'Laporan Transparan',   desc: 'Lihat berapa yang terkirim, dibuka, dan klik link brosurmu.' },
]

const CM = (
  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
    <path d="M1 3l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function WaBlastPage() {
  const [plans, setPlans] = useState(DEFAULT_PLANS)

  useEffect(() => {
    const saved = localStorage.getItem('lokal_pricing_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed['wa-blast'] && parsed['wa-blast'].basePrices) {
          const cmsPlans = parsed['wa-blast'].basePrices
          setPlans(DEFAULT_PLANS.map((dp, i) => {
            const cp = cmsPlans[i]
            if (!cp) return dp
            return {
              ...dp,
              name: cp.name || dp.name,
              kontak: cp.kontak || dp.kontak,
              original: cp.original || dp.original,
              promo: cp.price || dp.promo,
              perNomor: cp.kontak && cp.price ? Math.ceil(cp.price / cp.kontak).toString() : dp.perNomor
            }
          }))
        }
      } catch { /* ignore */ }
    }
  }, [])

  const handleConsultation = (paket = '') => {
    const msg = `Halo LOKAL, saya tertarik dengan layanan WA Blasting${paket ? ` mengenai ${paket}` : ''}. Mohon info selengkapnya.`
    window.open(`https://wa.me/6285111326098?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-[#333333] flex flex-col selection:bg-green-500 selection:text-white">
      <main className="flex-grow pt-24 pb-16">

        {/* Hero */}
        <section className="px-4 mb-16 md:mb-24 relative overflow-hidden">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-4 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lokal.png" alt="LOKAL" className="h-6 object-contain" />
                <span className="text-gray-300 font-light text-2xl">×</span>
                <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo-produk/wa-blast.webp" alt="WA Blasting" className="h-8 object-contain" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
                Jangkau Ribuan Pelanggan<br />
                <span className="text-green-500">Cukup dari WhatsApp.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Blast link promosi, brosur digital, atau info diskon Anda ke ratusan hingga ribuan nomor WA pelanggan lama. Tingkatkan repeat order tanpa biaya iklan.
              </p>
              <a href="#pricing" className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition shadow-lg shadow-green-500/30 inline-flex items-center gap-2">
                Lihat Harga Credit
              </a>
            </div>

            {/* Illustration — shown below on mobile, right side on md+ */}
            <div className="w-full max-w-sm mx-auto shrink-0 relative">
              <div className="absolute inset-0 bg-green-500/20 blur-[80px] rounded-full" />
              <div className="bg-white rounded-[2rem] p-6 shadow-2xl relative border-4 border-gray-100">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <MessageSquarePlus size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">WA Blast Manager</div>
                    <div className="text-xs text-green-500 font-medium">● Sedang mengirim...</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Total Kontak', val: '1.240', color: 'bg-blue-50 text-blue-700' },
                    { label: 'Terkirim',     val: '1.204', color: 'bg-green-50 text-green-700' },
                    { label: 'Dibuka',       val: '836',   color: 'bg-yellow-50 text-yellow-700' },
                    { label: 'Klik Link',    val: '112',   color: 'bg-pink-50 text-pink-700' },
                  ].map((s, i) => (
                    <div key={i} className={`flex items-center justify-between px-4 py-3 rounded-xl ${s.color}`}>
                      <span className="text-sm font-semibold">{s.label}</span>
                      <span className="text-lg font-black">{s.val}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500 mb-1 font-semibold"><span>Progres Pengiriman</span><span>97%</span></div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-[97%] h-full bg-green-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kenapa Pakai WA Blast Kami?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Kami mengelola teknis pengiriman agar nomor bisnis Anda tetap aman dari banned.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ Icon, bg, color, title, desc }) => (
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pilih Paket Credit</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Harga sekali bayar (beli credit) tanpa biaya bulanan. Kirim kapan saja.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((pkg, i) => (
              <div key={pkg.name} className={`bg-white rounded-3xl p-8 border-2 shadow-sm flex flex-col relative transition ${pkg.popular ? 'border-green-500 shadow-green-500/10 md:-translate-y-2' : 'border-gray-200 hover:border-green-300'}`}>
                {pkg.badge && <div className="absolute top-0 right-6 -translate-y-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">{pkg.badge}</div>}
                <h3 className="text-2xl font-black text-gray-800 mb-1">{pkg.name}</h3>
                <div className="mb-2 bg-green-50 rounded-lg py-2 px-3 inline-block self-start border border-green-100">
                  <span className="font-bold text-green-700">{pkg.kontak.toLocaleString('id-ID')}</span>{' '}
                  <span className="text-xs text-green-600">kontak</span>
                </div>
                <div className="mb-8">
                  <div className="text-sm text-gray-400 line-through mb-1">{fmt(pkg.original)}</div>
                  <div className="text-4xl font-black text-green-600 mb-2">{fmt(pkg.promo)}</div>
                  <div className="text-xs font-bold text-green-700 bg-green-50 py-1 px-2 rounded inline-block">≈ Rp {pkg.perNomor} per nomor (promo)</div>
                </div>
                <ul className="flex-1 space-y-3 mb-8">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${pkg.popular ? 'bg-green-100 text-green-600' : 'bg-green-50 text-green-600'}`}>{CM}</div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleConsultation(`Credit WA Blast ${pkg.name} (${pkg.kontak.toLocaleString('id-ID')} kontak)`)}
                  className={`w-full py-3.5 rounded-xl font-bold transition ${pkg.popular ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
                >
                  Beli Credit
                </button>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
