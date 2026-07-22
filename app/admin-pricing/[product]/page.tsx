'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Save, Plus, Trash2, Tag, ArrowLeft, RefreshCw,
  CheckCircle2, AlertCircle, Info
} from 'lucide-react'
import Link from 'next/link'

const fmt = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export default function ProductPricingPage() {
  const { product } = useParams<{ product: string }>()
  const router = useRouter()

  const [allData,   setAllData]   = useState<any>(null)
  const [loading,   setLoading]   = useState(true)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')

  const current = allData?.[product]

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await fetch('/api/pricing')
      const json = await res.json()
      setAllData(json.data)
    } catch {
      // Keep defaults
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const handleChange = (field: string, val: any) => {
    setAllData((prev: any) => ({
      ...prev,
      [product]: { ...prev[product], [field]: val }
    }))
    setSaveStatus('idle')
  }

  const handleSave = async () => {
    setSaveStatus('saving')
    try {
      const res = await fetch('/api/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allData),
      })
      if (res.ok) {
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 3000)
      } else {
        setSaveStatus('error')
      }
    } catch {
      setSaveStatus('error')
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-gray-500">
          <RefreshCw size={20} className="animate-spin" />
          <span>Memuat data dari database...</span>
        </div>
      </div>
    )
  }

  if (!current) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-4">
          <AlertCircle className="text-red-500" />
          <div>
            <p className="font-bold text-red-700">Produk tidak ditemukan</p>
            <p className="text-sm text-red-500">Key: {product}</p>
          </div>
        </div>
      </div>
    )
  }

  const isWebStudio = product === 'jasa-landing-page'
  const isWaBlast   = product === 'wa-blast'

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin-pricing" className="p-2 rounded-xl hover:bg-white transition border border-transparent hover:border-gray-200 text-gray-400 hover:text-gray-700">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{current.title}</h1>
            <p className="text-sm text-gray-400 mt-0.5">Pengaturan harga & promo</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveStatus === 'saved' && (
            <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
              <CheckCircle2 size={16} /> Tersimpan ke Database!
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-600 text-sm font-semibold bg-red-50 px-4 py-2 rounded-xl border border-red-200">
              <AlertCircle size={16} /> Gagal menyimpan
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="flex items-center gap-2 bg-[#1A7A7A] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#135c5c] transition shadow-md shadow-[#1A7A7A]/20 disabled:opacity-50"
          >
            {saveStatus === 'saving' ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
            {saveStatus === 'saving' ? 'Menyimpan...' : 'Simpan ke Database'}
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center gap-3 mb-8 text-sm text-blue-700">
        <Info size={16} className="shrink-0 text-blue-500" />
        Perubahan akan langsung aktif untuk semua pengunjung website setelah Anda klik <strong className="ml-1">Simpan ke Database</strong>.
      </div>

      <div className="space-y-8">
        {/* ── PROMO CODES ─────────────────────────────────────────────────── */}
        {current.promoCodes !== undefined && (
          <section className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
              <Tag size={18} className="text-[#E8681A]" /> Kupon Promo
            </h2>
            <div className="space-y-3 mb-4">
              {current.promoCodes.map((promo: any, idx: number) => (
                <div key={promo.id} className="flex flex-col sm:flex-row gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200 items-center">
                  <input
                    type="text"
                    value={promo.code}
                    placeholder="KODEPROMO"
                    className="flex-1 p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A7A7A] text-sm uppercase font-mono tracking-wider"
                    onChange={e => {
                      const newP = [...current.promoCodes]
                      newP[idx] = { ...newP[idx], code: e.target.value.toUpperCase() }
                      handleChange('promoCodes', newP)
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={promo.discount}
                      className="w-20 p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A7A7A] text-sm text-center"
                      onChange={e => {
                        const newP = [...current.promoCodes]
                        newP[idx] = { ...newP[idx], discount: Number(e.target.value) }
                        handleChange('promoCodes', newP)
                      }}
                    />
                    <span className="text-gray-500 font-bold">%</span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={promo.isActive}
                      onChange={e => {
                        const newP = [...current.promoCodes]
                        newP[idx] = { ...newP[idx], isActive: e.target.checked }
                        handleChange('promoCodes', newP)
                      }}
                      className="w-4 h-4 rounded text-[#1A7A7A]"
                    />
                    <span className={`text-sm font-semibold ${promo.isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                      {promo.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </label>
                  <button
                    onClick={() => {
                      const newP = current.promoCodes.filter((_: any, i: number) => i !== idx)
                      handleChange('promoCodes', newP)
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                const newP = [...(current.promoCodes || []), { id: Date.now().toString(), code: '', discount: 0, isActive: true }]
                handleChange('promoCodes', newP)
              }}
              className="flex items-center gap-2 text-[#1A7A7A] font-semibold text-sm hover:underline"
            >
              <Plus size={14} /> Tambah Kupon
            </button>
          </section>
        )}

        {/* ── BASE PRICES ─────────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-800 mb-5">Paket / Harga Dasar</h2>
          <div className="space-y-4">
            {current.basePrices.map((item: any, idx: number) => (
              <div key={item.id} className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-3">
                  {/* Name / Area */}
                  <input
                    type="text"
                    value={item.area ?? item.name ?? ''}
                    placeholder="Nama Paket"
                    className="flex-1 p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A7A7A] text-sm font-medium"
                    onChange={e => {
                      const newB = [...current.basePrices]
                      if ('name' in newB[idx]) newB[idx] = { ...newB[idx], name: e.target.value }
                      else newB[idx] = { ...newB[idx], area: e.target.value }
                      handleChange('basePrices', newB)
                    }}
                  />

                  {/* Standard price (non web-studio, non wa-blast) */}
                  {!isWebStudio && !isWaBlast && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 font-bold text-sm">Rp</span>
                      <input
                        type="number"
                        value={item.price ?? 0}
                        className="w-36 p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A7A7A] text-sm"
                        onChange={e => {
                          const newB = [...current.basePrices]
                          newB[idx] = { ...newB[idx], price: Number(e.target.value) }
                          handleChange('basePrices', newB)
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Web Studio matrix */}
                {isWebStudio && item.prices && (
                  <>
                    <textarea
                      value={item.desc ?? ''}
                      placeholder="Deskripsi paket"
                      rows={2}
                      className="w-full mb-3 p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A7A7A] text-sm"
                      onChange={e => {
                        const newB = [...current.basePrices]
                        newB[idx] = { ...newB[idx], desc: e.target.value }
                        handleChange('basePrices', newB)
                      }}
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {([['0.5', '6 Bulan'], ['1', '1 Tahun'], ['2', '2 Tahun'], ['3', '3 Tahun']] as [string, string][]).map(([k, label]) => (
                        <div key={k}>
                          <label className="text-xs font-bold text-gray-500 block mb-1">{label}</label>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-400 text-xs">Rp</span>
                            <input
                              type="number"
                              value={item.prices[k] ?? 0}
                              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A7A7A] text-sm"
                              onChange={e => {
                                const newB = [...current.basePrices]
                                newB[idx] = { ...newB[idx], prices: { ...newB[idx].prices, [k]: Number(e.target.value) } }
                                handleChange('basePrices', newB)
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* WA Blast extra fields */}
                {isWaBlast && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { field: 'price',    label: 'Harga Promo (Rp)' },
                      { field: 'original', label: 'Harga Asli (Rp)'  },
                      { field: 'kontak',   label: 'Jumlah Kontak'    },
                    ].map(({ field, label }) => (
                      <div key={field}>
                        <label className="text-xs font-bold text-gray-500 block mb-1">{label}</label>
                        <input
                          type="number"
                          value={item[field] ?? 0}
                          className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A7A7A] text-sm"
                          onChange={e => {
                            const newB = [...current.basePrices]
                            newB[idx] = { ...newB[idx], [field]: Number(e.target.value) }
                            handleChange('basePrices', newB)
                          }}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs font-bold text-gray-500 block mb-1">Badge</label>
                      <input
                        type="text"
                        value={item.badge ?? ''}
                        placeholder="PALING HEMAT"
                        className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A7A7A] text-sm"
                        onChange={e => {
                          const newB = [...current.basePrices]
                          newB[idx] = { ...newB[idx], badge: e.target.value }
                          handleChange('basePrices', newB)
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Price preview */}
                {!isWebStudio && !isWaBlast && (
                  <div className="mt-3 text-right text-xs text-gray-400">
                    Preview: <span className="text-[#1A7A7A] font-bold">{fmt(item.price ?? 0)}</span> / bulan
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── ADD-ONS ─────────────────────────────────────────────────────── */}
        {current.addons && current.addons.length > 0 && (
          <section className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 mb-5">Add-ons (Opsional)</h2>
            <div className="space-y-3 mb-4">
              {current.addons.map((addon: any, idx: number) => (
                <div key={addon.id} className="flex flex-col sm:flex-row gap-3 items-center bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <input
                    type="text"
                    value={addon.name}
                    className="flex-1 p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A7A7A] text-sm"
                    onChange={e => {
                      const newA = [...current.addons]
                      newA[idx] = { ...newA[idx], name: e.target.value }
                      handleChange('addons', newA)
                    }}
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-gray-400 text-sm">Rp</span>
                    <input
                      type="number"
                      value={addon.price}
                      className="w-32 p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A7A7A] text-sm"
                      onChange={e => {
                        const newA = [...current.addons]
                        newA[idx] = { ...newA[idx], price: Number(e.target.value) }
                        handleChange('addons', newA)
                      }}
                    />
                  </div>
                  {addon.type !== undefined && (
                    <select
                      value={addon.type}
                      className="p-2.5 rounded-lg border border-gray-300 text-sm"
                      onChange={e => {
                        const newA = [...current.addons]
                        newA[idx] = { ...newA[idx], type: e.target.value }
                        handleChange('addons', newA)
                      }}
                    >
                      <option value="flat">Sekali Bayar</option>
                      <option value="yearly">Per Tahun</option>
                    </select>
                  )}
                  <button
                    onClick={() => {
                      const newA = current.addons.filter((_: any, i: number) => i !== idx)
                      handleChange('addons', newA)
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                const newA = [...current.addons, { id: Date.now().toString(), name: 'Add-on Baru', price: 0 }]
                handleChange('addons', newA)
              }}
              className="flex items-center gap-2 text-[#1A7A7A] font-semibold text-sm hover:underline"
            >
              <Plus size={14} /> Tambah Add-on
            </button>
          </section>
        )}
      </div>
    </div>
  )
}
