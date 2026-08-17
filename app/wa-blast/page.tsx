'use client'

import { useState, useEffect } from 'react'
import { MessageSquarePlus, Activity, Target, Zap, ShieldCheck, Eye, MessageCircle, TrendingUp, MousePointerClick, BarChart } from 'lucide-react'
import Image from 'next/image'

const fmt = (p: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(p)

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
  const handleConsultation = () => {
    const msg = `Halo LOKAL, saya tertarik dengan layanan WA Blasting. Mohon info selengkapnya.`
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
              <button onClick={() => handleConsultation()} className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition shadow-lg shadow-green-500/30 inline-flex items-center gap-2">
                Konsultasi Sekarang
              </button>
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



      </main>
    </div>
  )
}
