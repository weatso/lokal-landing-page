'use client'

import { useEffect, useState } from 'react'
import {
  Database, Clock, CheckCircle2, AlertCircle,
  ShoppingBag, Globe, Smartphone, Car, FileText, MessageSquare,
  RefreshCw, ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const PRODUCTS = [
  { key: 'pos-fnb',           label: 'LOKAL POS F&B',   icon: ShoppingBag,   color: 'bg-emerald-100 text-emerald-600', href: '/admin-pricing/pos-fnb' },
  { key: 'jasa-landing-page', label: 'Web Studio',       icon: Globe,         color: 'bg-blue-100 text-blue-600',       href: '/admin-pricing/jasa-landing-page' },
  { key: 'iwash',             label: 'iWash',            icon: Smartphone,    color: 'bg-cyan-100 text-cyan-600',       href: '/admin-pricing/iwash' },
  { key: 'valet-indonesia',   label: 'Valet Indonesia',  icon: Car,           color: 'bg-purple-100 text-purple-600',   href: '/admin-pricing/valet-indonesia' },
  { key: 'brosurhub',         label: 'BrosurHub',        icon: FileText,      color: 'bg-orange-100 text-orange-600',   href: '/admin-pricing/brosurhub' },
  { key: 'wa-blast',          label: 'WA Blast',         icon: MessageSquare, color: 'bg-green-100 text-green-600',     href: '/admin-pricing/wa-blast' },
]

export default function AdminOverviewPage() {
  const [kvStatus, setKvStatus]   = useState<'loading' | 'ok' | 'error'>('loading')
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [source, setSource]       = useState<'kv' | 'default' | null>(null)

  const check = async () => {
    setKvStatus('loading')
    try {
      const res  = await fetch('/api/pricing')
      const json = await res.json()
      setKvStatus(res.ok ? 'ok' : 'error')
      setSource(json.source)
      setUpdatedAt(json.updatedAt)
    } catch {
      setKvStatus('error')
    }
  }

  useEffect(() => { check() }, [])

  const fmt = (iso: string | null) => {
    if (!iso) return 'Belum pernah disimpan'
    return new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Jakarta'
    }).format(new Date(iso))
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Selamat Datang di Panel Admin 👋</h1>
        <p className="text-gray-500 text-sm">Kelola harga dan konfigurasi produk LOKAL dari sini.</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {/* KV Status */}
        <div className={`rounded-2xl p-5 border-2 flex items-start gap-4 ${
          kvStatus === 'ok'      ? 'bg-emerald-50 border-emerald-200' :
          kvStatus === 'error'   ? 'bg-red-50 border-red-200' :
                                   'bg-gray-50 border-gray-200'
        }`}>
          <div className={`mt-0.5 ${kvStatus === 'ok' ? 'text-emerald-600' : kvStatus === 'error' ? 'text-red-500' : 'text-gray-400'}`}>
            {kvStatus === 'loading' ? <RefreshCw size={22} className="animate-spin" /> :
             kvStatus === 'ok'      ? <CheckCircle2 size={22} /> : <AlertCircle size={22} />}
          </div>
          <div>
            <div className="font-bold text-gray-800 text-sm">Database (Upstash KV)</div>
            <div className={`text-xs mt-1 font-medium ${kvStatus === 'ok' ? 'text-emerald-600' : kvStatus === 'error' ? 'text-red-500' : 'text-gray-500'}`}>
              {kvStatus === 'loading' ? 'Memeriksa koneksi...' : kvStatus === 'ok' ? 'Terhubung & Aktif' : 'Tidak dapat terhubung'}
            </div>
          </div>
        </div>

        {/* Data Source */}
        <div className="rounded-2xl p-5 border-2 bg-white border-gray-200 flex items-start gap-4">
          <Database size={22} className="text-[#1A7A7A] mt-0.5 shrink-0" />
          <div>
            <div className="font-bold text-gray-800 text-sm">Sumber Data Aktif</div>
            <div className="text-xs mt-1 font-medium text-[#1A7A7A]">
              {source === 'kv' ? '✅ Dari Database (KV)' : source === 'default' ? '⚠️ Dari Default (Belum disimpan)' : '—'}
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="rounded-2xl p-5 border-2 bg-white border-gray-200 flex items-start gap-4">
          <Clock size={22} className="text-[#E8681A] mt-0.5 shrink-0" />
          <div>
            <div className="font-bold text-gray-800 text-sm">Terakhir Diperbarui</div>
            <div className="text-xs mt-1 text-gray-500">{fmt(updatedAt)}</div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end mb-6">
        <button onClick={check} className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#1A7A7A] transition font-medium">
          <RefreshCw size={13} /> Refresh Status
        </button>
      </div>

      {/* Product Grid */}
      <h2 className="text-base font-bold text-gray-700 mb-4 uppercase tracking-wider">Pengaturan Harga Produk</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRODUCTS.map(({ key, label, icon: Icon, color, href }) => (
          <Link
            key={key}
            href={href}
            className="group bg-white rounded-2xl p-5 border border-gray-200 hover:border-[#1A7A7A]/40 hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={20} />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">{label}</div>
                <div className="text-xs text-gray-400 mt-0.5">Atur harga & promo</div>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-[#1A7A7A] transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  )
}
