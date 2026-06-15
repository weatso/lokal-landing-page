'use client'

import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, ShieldCheck, LogOut, Tag, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const DEFAULT = {
  'pos-fnb': {
    title: 'LOKAL POS F&B',
    basePrices: [
      { id: '1', area: 'Semarang (LOKAL Area)', price: 75000 },
      { id: '2', area: 'Belitung (LOKAL Area)', price: 75000 },
      { id: '3', area: 'Luar Daerah (Nasional)', price: 99000 },
    ],
    addons: [
      { id: 'a1', name: 'Laporan Keuangan', price: 20000 },
      { id: 'a2', name: 'Sistem Penggajian (Payroll)', price: 15000 },
      { id: 'a3', name: 'Manajemen Meja', price: 15000 },
      { id: 'a4', name: 'Jasa Setting Hardware (Sekali Bayar)', price: 50000 },
      { id: 'a5', name: 'Tambahan Cabang', price: 50000 },
    ],
    discount6m: 10, discount12m: 20,
    promoCodes: [{ id: 'p1', code: 'LOKALPOS', discount: 15, isActive: true }]
  },
  'iwash': {
    title: 'LOKAL x Iwash',
    basePrices: [
      { id: '1', area: 'Starter', price: 150000 },
      { id: '2', area: 'Pro', price: 250000 },
      { id: '3', area: 'Enterprise', price: 500000 }
    ],
    addons: [], discount6m: 0, discount12m: 0,
    promoCodes: [{ id: 'p1', code: 'IWASHLOKAL', discount: 20, isActive: true }]
  },
  'valet-indonesia': {
    title: 'LOKAL x ValetIndonesia',
    basePrices: [
      { id: '1', area: 'Harga Standar', price: 999000 },
      { id: '2', area: 'Harga Promo', price: 299000 }
    ],
    addons: [], discount6m: 0, discount12m: 0,
    promoCodes: [{ id: 'p1', code: 'VALET2024', discount: 25, isActive: true }]
  },
  'brosurhub': {
    title: 'LOKAL x BrosurHub',
    basePrices: [
      { id: '1', area: 'Basic (Per Tahun)', price: 59000 },
      { id: '2', area: 'Standard (Per Tahun)', price: 119000 },
      { id: '3', area: 'Premium (Per Tahun)', price: 169000 }
    ],
    addons: [], discount6m: 0, discount12m: 0,
    promoCodes: [{ id: 'p1', code: 'BROSURDIGITAL', discount: 20, isActive: true }]
  },
  'jasa-landing-page': {
    title: 'LOKAL Web Studio',
    basePrices: [
      { id: 'landing-page', name: 'Landing Page 1 Halaman', price: 3000000, desc: 'Cocok untuk 1 produk spesifik / promosi.' },
      { id: 'company-profile', name: 'Company Profile (Max 5 Halaman)', price: 5000000, desc: 'Untuk profil perusahaan dan multi-produk.' },
      { id: 'ecommerce', name: 'Toko Online E-Commerce', price: 8000000, desc: 'Katalog produk dengan sistem checkout keranjang.' },
      { id: 'custom', name: 'Custom Sesuai Keinginan', price: 0, desc: 'Fitur khusus (Sistem Web, SaaS, dll).' },
    ],
    addons: [
      { id: 'seo', name: 'Setup SEO & Analytics', price: 300000, type: 'flat' },
      { id: 'copywriting', name: 'Full Custom Copywriting', price: 500000, type: 'flat' },
      { id: 'extra-pages', name: 'Tambahan 5 Halaman Ekstra', price: 250000, type: 'flat' },
    ],
    promoCodes: []
  },
  'wa-blast': {
    title: 'WA Blasting',
    basePrices: [
      { id: '1', name: 'Blast Starter', price: 318000, kontak: 500, original: 435000, perNomor: '636', badge: 'PALING HEMAT' },
      { id: '2', name: 'Blast Growth', price: 1390000, kontak: 2500, original: 1900000, perNomor: '556', badge: '' },
      { id: '3', name: 'Blast Scale', price: 4760000, kontak: 10000, original: 6520000, perNomor: '476', badge: '' },
    ],
    addons: [],
    promoCodes: []
  }
}

export default function AdminPricingPage() {
  const router = useRouter()
  const [pricingData, setPricingData] = useState<any>(DEFAULT)
  const [activeTab, setActiveTab] = useState('pos-fnb')
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('lokal_pricing_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const merged: any = {}
        Object.keys(DEFAULT).forEach(k => {
          merged[k] = { ...DEFAULT[k as keyof typeof DEFAULT], ...(parsed[k] || {}) }
        })
        setPricingData(merged)
      } catch { /* use defaults */ }
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('lokal_pricing_data', JSON.stringify(pricingData))
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin-login')
  }

  const current = pricingData[activeTab] || DEFAULT['pos-fnb']
  const handleChange = (field: string, val: any) => {
    setPricingData((prev: any) => ({ ...prev, [activeTab]: { ...prev[activeTab], [field]: val } }))
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-[#333333] pb-24">
      {/* Header */}
      <div className="bg-[#0f2e2e] text-white py-4 px-6 sticky top-0 z-50 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition"><ArrowLeft size={18} /></Link>
          <div>
            <div className="flex items-center gap-2 font-bold text-lg"><ShieldCheck className="text-[#E8681A]" size={20} /> LOKAL Admin Panel</div>
            <div className="text-xs text-white/50">Pengaturan Data CMS</div>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
          <LogOut size={16} /> Keluar
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-4 border-b border-gray-100"><h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Produk</h2></div>
            <div className="flex flex-col">
              {Object.entries(pricingData).map(([key, data]: [string, any]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`text-left px-5 py-4 text-sm font-semibold transition-colors border-l-4 ${activeTab === key ? 'border-[#1A7A7A] bg-[#1A7A7A]/5 text-[#1A7A7A]' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  {data.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Pengaturan {current.title}</h2>
                <p className="text-sm text-gray-500">Ubah harga paket, fitur tambahan, promo, dan diskon.</p>
              </div>
              <button onClick={handleSave} className="flex items-center gap-2 bg-[#1A7A7A] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#135c5c] transition shadow-lg shadow-[#1A7A7A]/30">
                <Save size={18} /> Simpan Perubahan
              </button>
            </div>

            {isSaved && <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">Tersimpan! Perubahan sudah aktif.</div>}

            {/* Promo Codes */}
            <div className="mb-10">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2"><Tag size={18} className="text-[#E8681A]" /> Kupon Promo</h3>
              <div className="space-y-3 mb-4">
                {current.promoCodes?.map((promo: any, idx: number) => (
                  <div key={promo.id} className="flex flex-col sm:flex-row gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <input type="text" value={promo.code} placeholder="KODEPROMO" className="flex-1 p-2.5 rounded-lg border focus:ring-2 focus:ring-[#1A7A7A] text-sm uppercase" onChange={(e) => {
                      const newP = [...current.promoCodes]; newP[idx].code = e.target.value.toUpperCase(); handleChange('promoCodes', newP)
                    }} />
                    <div className="flex items-center gap-2">
                      <input type="number" value={promo.discount} className="w-24 p-2.5 rounded-lg border focus:ring-2 focus:ring-[#1A7A7A] text-sm" onChange={(e) => {
                        const newP = [...current.promoCodes]; newP[idx].discount = Number(e.target.value); handleChange('promoCodes', newP)
                      }} />
                      <span className="text-gray-500 text-sm font-bold">%</span>
                    </div>
                    <label className="flex items-center gap-2 ml-2 cursor-pointer">
                      <input type="checkbox" checked={promo.isActive} onChange={(e) => {
                        const newP = [...current.promoCodes]; newP[idx].isActive = e.target.checked; handleChange('promoCodes', newP)
                      }} className="w-5 h-5 rounded text-[#1A7A7A] focus:ring-[#1A7A7A]" />
                      <span className="text-sm font-medium text-gray-600">Aktif</span>
                    </label>
                    <button onClick={() => {
                      const newP = current.promoCodes.filter((_: any, i: number) => i !== idx); handleChange('promoCodes', newP)
                    }} className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition" title="Hapus Kupon"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
              <button onClick={() => {
                const newP = [...(current.promoCodes || []), { id: Date.now().toString(), code: '', discount: 0, isActive: true }]; handleChange('promoCodes', newP)
              }} className="flex items-center gap-2 text-[#1A7A7A] font-semibold text-sm hover:underline"><Plus size={16} /> Tambah Kupon Promo</button>
            </div>

            {/* Base Prices */}
            <div className="mb-10">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Paket Dasar</h3>
              <div className="space-y-3">
                {current.basePrices.map((item: any, idx: number) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <input type="text" value={item.area || item.name} className="flex-1 p-2.5 rounded-lg border focus:ring-2 focus:ring-[#1A7A7A] text-sm" onChange={(e) => {
                      const newB = [...current.basePrices]; 
                      if ('name' in newB[idx]) newB[idx].name = e.target.value;
                      else newB[idx].area = e.target.value;
                      handleChange('basePrices', newB)
                    }} />
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-400">Rp</span>
                      <input type="number" value={item.price} className="w-full sm:w-40 p-2.5 rounded-lg border focus:ring-2 focus:ring-[#1A7A7A] text-sm" onChange={(e) => {
                        const newB = [...current.basePrices]; newB[idx].price = Number(e.target.value); handleChange('basePrices', newB)
                      }} />
                    </div>
                    {item.desc !== undefined && (
                      <input type="text" value={item.desc} placeholder="Deskripsi" className="flex-1 p-2.5 rounded-lg border focus:ring-2 focus:ring-[#1A7A7A] text-sm" onChange={(e) => {
                        const newB = [...current.basePrices]; newB[idx].desc = e.target.value; handleChange('basePrices', newB)
                      }} />
                    )}
                    {item.kontak !== undefined && (
                      <div className="flex gap-2">
                        <input type="number" value={item.kontak} placeholder="Jml Kontak" className="w-24 p-2.5 rounded-lg border focus:ring-2 focus:ring-[#1A7A7A] text-sm" onChange={(e) => {
                          const newB = [...current.basePrices]; newB[idx].kontak = Number(e.target.value); handleChange('basePrices', newB)
                        }} />
                        <input type="number" value={item.original} placeholder="Harga Asli" className="w-32 p-2.5 rounded-lg border focus:ring-2 focus:ring-[#1A7A7A] text-sm" onChange={(e) => {
                          const newB = [...current.basePrices]; newB[idx].original = Number(e.target.value); handleChange('basePrices', newB)
                        }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Addons (if applicable) */}
            {current.addons && (
              <div className="mb-10">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Add-ons (Opsional)</h3>
                <div className="space-y-3 mb-4">
                  {current.addons.map((addon: any, idx: number) => (
                    <div key={addon.id} className="flex flex-col sm:flex-row gap-3 sm:items-center bg-gray-50 p-2 rounded-lg border border-gray-100">
                      <input type="text" value={addon.name} className="flex-1 p-2 rounded border-transparent bg-transparent focus:bg-white focus:border-gray-300 text-sm" onChange={(e) => {
                        const newA = [...current.addons]; newA[idx].name = e.target.value; handleChange('addons', newA)
                      }} />
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-400">Rp</span>
                        <input type="number" value={addon.price} className="w-32 p-2 rounded border-transparent bg-transparent focus:bg-white focus:border-gray-300 text-sm" onChange={(e) => {
                          const newA = [...current.addons]; newA[idx].price = Number(e.target.value); handleChange('addons', newA)
                        }} />
                      </div>
                      {addon.type !== undefined && (
                        <select value={addon.type} className="p-2 rounded border-transparent bg-transparent focus:bg-white focus:border-gray-300 text-sm" onChange={(e) => {
                          const newA = [...current.addons]; newA[idx].type = e.target.value; handleChange('addons', newA)
                        }}>
                          <option value="flat">Sekali Bayar</option>
                          <option value="yearly">Per Tahun</option>
                        </select>
                      )}
                      <button onClick={() => {
                        const newA = current.addons.filter((_: any, i: number) => i !== idx); handleChange('addons', newA)
                      }} className="p-2 text-gray-400 hover:text-red-500 transition"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
                <button onClick={() => {
                  const newA = [...current.addons, { id: Date.now().toString(), name: 'Add-on Baru', price: 0 }]; handleChange('addons', newA)
                }} className="flex items-center gap-2 text-[#1A7A7A] font-semibold text-sm hover:underline"><Plus size={16} /> Tambah Add-on</button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
