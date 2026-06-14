import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, ShieldCheck, ArrowLeft, LogOut, Tag, Users, Eye, EyeOff, UserPlus, Crown, Edit3 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import { checkAdminSession, destroyAdminSession, getAdminUsers, saveAdminUsers, hashPassword, getSessionUser, DEFAULT_USERS } from './AdminLogin'

// ============================================================
// DEFAULT PRICING DATA
// ============================================================
const defaultPricingData = {
  'pos-fnb': {
    title: 'LOKAL POS F&B',
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
    promoCodes: [{ id: 'p1', code: 'LOKALPOS', discount: 15, isActive: true }]
  },
  'iwash': {
    title: 'LOKAL x Iwash',
    basePrices: [
      { id: '1', area: 'Starter', price: 150000 },
      { id: '2', area: 'Pro', price: 250000 },
      { id: '3', area: 'Enterprise', price: 500000 }
    ],
    addons: [],
    discount6m: 0,
    discount12m: 0,
    promoCodes: [{ id: 'p1', code: 'IWASHLOKAL', discount: 20, isActive: true }]
  },
  'valet-indonesia': {
    title: 'LOKAL x ValetIndonesia',
    basePrices: [
      { id: '1', area: 'Harga Standar', price: 999000 },
      { id: '2', area: 'Harga Promo', price: 299000 }
    ],
    addons: [],
    discount6m: 0,
    discount12m: 0,
    promoCodes: [{ id: 'p1', code: 'VALET2024', discount: 25, isActive: true }]
  },
  'brosurhub': {
    title: 'LOKAL x BrosurHub',
    basePrices: [
      { id: '1', area: 'Basic (Per Tahun)', price: 59000 },
      { id: '2', area: 'Standard (Per Tahun)', price: 119000 },
      { id: '3', area: 'Premium (Per Tahun)', price: 169000 }
    ],
    addons: [],
    discount6m: 0,
    discount12m: 0,
    promoCodes: [{ id: 'p1', code: 'BROSURDIGITAL', discount: 20, isActive: true }]
  }
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AdminPricing() {
  const navigate = useNavigate()
  const [pricingData, setPricingData] = useState(defaultPricingData)
  const [activeTab, setActiveTab] = useState('pos-fnb')
  const [isSaved, setIsSaved] = useState(false)
  const [activeSection, setActiveSection] = useState('pricing') // 'pricing' | 'users'
  const [sessionUser, setSessionUser] = useState(null)

  // User management state
  const [adminUsers, setAdminUsers] = useState([])
  const [userMsg, setUserMsg] = useState({ type: '', text: '' })
  const [editingUserId, setEditingUserId] = useState(null)
  const [newUser, setNewUser] = useState({ username: '', name: '', password: '', role: 'admin' })
  const [showNewPass, setShowNewPass] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)

  // Auth check
  useEffect(() => {
    if (!checkAdminSession()) {
      navigate('/admin-login', { replace: true })
    } else {
      setSessionUser(getSessionUser())
    }
  }, [navigate])

  // Load pricing
  useEffect(() => {
    const saved = localStorage.getItem('lokal_pricing_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const merged = {}
        Object.keys(defaultPricingData).forEach(key => {
          merged[key] = { ...defaultPricingData[key], ...(parsed[key] || {}) }
          if (!merged[key].promoCodes || !Array.isArray(merged[key].promoCodes)) {
            merged[key].promoCodes = defaultPricingData[key].promoCodes
          }
          if (merged[key].discount6m === undefined) merged[key].discount6m = defaultPricingData[key].discount6m
          if (merged[key].discount12m === undefined) merged[key].discount12m = defaultPricingData[key].discount12m
        })
        setPricingData(merged)
      } catch (e) {
        console.error('Failed to parse pricing data', e)
      }
    }
  }, [])

  // Load users
  useEffect(() => {
    setAdminUsers(getAdminUsers())
  }, [])

  const handleLogout = () => {
    destroyAdminSession()
    navigate('/admin-login', { replace: true })
  }

  const handleSave = () => {
    localStorage.setItem('lokal_pricing_data', JSON.stringify(pricingData))
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  // ---- Pricing Helpers ----
  const updateBasePrice = (id, field, value) => {
    setPricingData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        basePrices: prev[activeTab].basePrices.map(item =>
          item.id === id ? { ...item, [field]: value } : item
        )
      }
    }))
  }
  const addBasePrice = () => {
    setPricingData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        basePrices: [...prev[activeTab].basePrices, { id: Date.now().toString(), area: 'Paket Baru', price: 0 }]
      }
    }))
  }
  const removeBasePrice = (id) => {
    setPricingData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        basePrices: prev[activeTab].basePrices.filter(item => item.id !== id)
      }
    }))
  }
  const updateAddon = (id, field, value) => {
    setPricingData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        addons: prev[activeTab].addons.map(item =>
          item.id === id ? { ...item, [field]: value } : item
        )
      }
    }))
  }
  const addAddon = () => {
    setPricingData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        addons: [...prev[activeTab].addons, { id: Date.now().toString(), name: 'Add-on Baru', price: 0 }]
      }
    }))
  }
  const removeAddon = (id) => {
    setPricingData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        addons: prev[activeTab].addons.filter(item => item.id !== id)
      }
    }))
  }
  const updateDiscount = (field, value) => {
    setPricingData(prev => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [field]: Number(value) }
    }))
  }

  // ---- Promo Code Helpers ----
  const addPromoCode = () => {
    setPricingData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        promoCodes: [
          ...(prev[activeTab].promoCodes || []),
          { id: Date.now().toString(), code: '', discount: 0, isActive: true }
        ]
      }
    }))
  }
  const updatePromoCode = (id, field, value) => {
    setPricingData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        promoCodes: prev[activeTab].promoCodes.map(p =>
          p.id === id ? { ...p, [field]: value } : p
        )
      }
    }))
  }
  const removePromoCode = (id) => {
    setPricingData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        promoCodes: prev[activeTab].promoCodes.filter(p => p.id !== id)
      }
    }))
  }

  // ---- User Management Helpers ----
  const handleAddUser = () => {
    setUserMsg({ type: '', text: '' })
    if (!newUser.username.trim() || !newUser.name.trim()) {
      setUserMsg({ type: 'error', text: 'Username dan nama tidak boleh kosong.' })
      return
    }
    if (!newUser.password || newUser.password.length < 8) {
      setUserMsg({ type: 'error', text: 'Password minimal 8 karakter.' })
      return
    }
    const duplicate = adminUsers.find(u => u.username.toLowerCase() === newUser.username.toLowerCase().trim())
    if (duplicate) {
      setUserMsg({ type: 'error', text: 'Username sudah digunakan.' })
      return
    }
    const created = {
      id: Date.now().toString(),
      username: newUser.username.trim(),
      name: newUser.name.trim(),
      passwordHash: hashPassword(newUser.password),
      role: newUser.role
    }
    const updated = [...adminUsers, created]
    setAdminUsers(updated)
    saveAdminUsers(updated)
    setNewUser({ username: '', name: '', password: '', role: 'admin' })
    setShowAddForm(false)
    setUserMsg({ type: 'success', text: `User "${created.name}" berhasil ditambahkan.` })
  }

  const handleDeleteUser = (id) => {
    if (sessionUser?.id === id) {
      setUserMsg({ type: 'error', text: 'Tidak bisa menghapus akun yang sedang aktif.' })
      return
    }
    // Prevent deleting the last superadmin
    const remaining = adminUsers.filter(u => u.id !== id)
    if (remaining.filter(u => u.role === 'superadmin').length === 0) {
      setUserMsg({ type: 'error', text: 'Harus ada minimal 1 Super Admin.' })
      return
    }
    setAdminUsers(remaining)
    saveAdminUsers(remaining)
    setUserMsg({ type: 'success', text: 'User berhasil dihapus.' })
  }

  const [editPass, setEditPass] = useState({})
  const handleUpdateUser = (id) => {
    const newPass = editPass[id]
    if (newPass && newPass.length < 8) {
      setUserMsg({ type: 'error', text: 'Password baru minimal 8 karakter.' })
      return
    }
    const updated = adminUsers.map(u => {
      if (u.id !== id) return u
      return {
        ...u,
        ...(newPass ? { passwordHash: hashPassword(newPass) } : {})
      }
    })
    setAdminUsers(updated)
    saveAdminUsers(updated)
    setEditingUserId(null)
    setEditPass({})
    setUserMsg({ type: 'success', text: 'Password berhasil diperbarui.' })
  }

  const activeProduct = pricingData[activeTab]
  const isPOSFnb = activeTab === 'pos-fnb'

  const roleLabel = (role) => role === 'superadmin' ? 'Super Admin' : 'Admin'
  const roleBadgeClass = (role) => role === 'superadmin'
    ? 'bg-amber-100 text-amber-700 border border-amber-200'
    : 'bg-blue-100 text-blue-700 border border-blue-200'

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-[#333333] pb-20">
      <SEO title="Admin CMS - LOKAL Pricing" robots="noindex, nofollow" />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-400 hover:text-gray-700 transition">
              <ArrowLeft size={20} />
            </Link>
            {/* Original LOKAL Logo */}
            <img src="/lokal.png" alt="LOKAL" className="h-7 object-contain" />
            <div className="hidden sm:flex items-center gap-1.5 text-gray-400 text-sm border-l border-gray-200 pl-4">
              <ShieldCheck size={15} className="text-[#1A7A7A]" />
              <span className="font-medium text-gray-600">Admin Panel</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Session User */}
            {sessionUser && (
              <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
                <div className="w-6 h-6 rounded-full bg-[#1A7A7A] text-white text-xs flex items-center justify-center font-bold">
                  {sessionUser.name?.[0] || sessionUser.username?.[0] || 'A'}
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-700 leading-none">{sessionUser.name || sessionUser.username}</div>
                  <div className="text-[10px] text-gray-400 capitalize">{roleLabel(sessionUser.role)}</div>
                </div>
              </div>
            )}
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                isSaved ? 'bg-green-500 text-white' : 'bg-[#E8681A] text-white hover:bg-[#c95914]'
              } shadow-md`}
            >
              <Save size={16} />
              <span className="hidden sm:inline">{isSaved ? 'Tersimpan!' : 'Simpan'}</span>
            </button>
            <button
              onClick={handleLogout}
              title="Logout"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 transition border border-gray-200"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6">
          <div>
            <h2 className="text-xs font-bold uppercase text-gray-400 mb-3 tracking-wider">Kelola Produk</h2>
            <div className="flex flex-col gap-2">
              {Object.keys(pricingData).map(key => (
                <button
                  key={key}
                  onClick={() => { setActiveTab(key); setActiveSection('pricing') }}
                  className={`text-left px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    activeSection === 'pricing' && activeTab === key
                      ? 'bg-[#1A7A7A] text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {pricingData[key].title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase text-gray-400 mb-3 tracking-wider">Pengaturan</h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActiveSection('users')}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                  activeSection === 'users'
                    ? 'bg-gray-800 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Users size={16} />
                Manajemen User
                <span className="ml-auto bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{adminUsers.length}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <section className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          {/* ===== PRICING SECTION ===== */}
          {activeSection === 'pricing' && (
            <>
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="font-bold text-xl">{activeProduct.title}</h2>
                <p className="text-sm text-gray-500 mt-1">Kelola harga paket, add-ons, dan kode promo rahasia.</p>
              </div>

              <div className="p-6 flex flex-col gap-8">
                {/* === Base Prices === */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">Harga Paket / Wilayah</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Harga dasar yang ditampilkan di halaman produk.</p>
                    </div>
                    <button onClick={addBasePrice} className="text-sm text-[#1A7A7A] font-semibold flex items-center gap-1 hover:underline">
                      <Plus size={16} /> Tambah Paket
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {activeProduct.basePrices.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <input type="text" value={item.area} onChange={(e) => updateBasePrice(item.id, 'area', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A7A7A]/50 text-sm w-full" placeholder="Nama Paket / Wilayah" />
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <span className="text-sm font-semibold text-gray-500">Rp</span>
                          <input type="number" value={item.price} onChange={(e) => updateBasePrice(item.id, 'price', Number(e.target.value))} className="w-full sm:w-36 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A7A7A]/50 text-sm text-right font-bold" />
                          <button onClick={() => removeBasePrice(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    ))}
                    {activeProduct.basePrices.length === 0 && <p className="text-sm text-gray-400 italic">Belum ada paket harga.</p>}
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* === Add-ons (POS FnB only) === */}
                {isPOSFnb && (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg">Add-ons Tambahan</h3>
                          <p className="text-xs text-gray-400 mt-0.5">Fitur opsional yang bisa dipilih pelanggan.</p>
                        </div>
                        <button onClick={addAddon} className="text-sm text-[#1A7A7A] font-semibold flex items-center gap-1 hover:underline">
                          <Plus size={16} /> Tambah Add-on
                        </button>
                      </div>
                      <div className="flex flex-col gap-3">
                        {activeProduct.addons.map((item) => (
                          <div key={item.id} className="flex flex-col sm:flex-row items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <input type="text" value={item.name} onChange={(e) => updateAddon(item.id, 'name', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A7A7A]/50 text-sm w-full" />
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                              <span className="text-sm font-semibold text-gray-500">Rp</span>
                              <input type="number" value={item.price} onChange={(e) => updateAddon(item.id, 'price', Number(e.target.value))} className="w-full sm:w-36 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A7A7A]/50 text-sm text-right font-bold" />
                              <button onClick={() => removeAddon(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition"><Trash2 size={18} /></button>
                            </div>
                          </div>
                        ))}
                        {activeProduct.addons.length === 0 && <p className="text-sm text-gray-400 italic">Belum ada add-on.</p>}
                      </div>
                    </div>
                    <hr className="border-gray-100" />
                  </>
                )}

                {/* === Volume Discount (POS FnB) === */}
                {isPOSFnb && (
                  <>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Diskon Volume Langganan</h3>
                      <p className="text-xs text-gray-400 mb-4">Diskon otomatis berdasarkan durasi (tampil tanpa kode promo). Set 0 untuk tidak ada diskon.</p>
                      <div className="grid sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Diskon Paket 6 Bulan (%)</label>
                          <input type="number" min="0" max="100" value={activeProduct.discount6m ?? 0} onChange={(e) => updateDiscount('discount6m', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A7A7A]/50 text-sm font-bold" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Diskon Paket 12 Bulan (%)</label>
                          <input type="number" min="0" max="100" value={activeProduct.discount12m ?? 0} onChange={(e) => updateDiscount('discount12m', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A7A7A]/50 text-sm font-bold" />
                        </div>
                      </div>
                    </div>
                    <hr className="border-gray-100" />
                  </>
                )}

                {/* === Secret Promo Codes === */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <Tag size={20} className="text-[#E8681A]" />
                        Kode Promo Rahasia
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">Tidak ditampilkan ke publik. Hanya yang punya kode yang bisa memasukkannya.</p>
                    </div>
                    <button onClick={addPromoCode} className="text-sm text-[#E8681A] font-semibold flex items-center gap-1 hover:underline">
                      <Plus size={16} /> Tambah Kode
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 mt-4">
                    {activeProduct.promoCodes?.map((p) => (
                      <div key={p.id} className={`flex flex-col sm:flex-row items-center gap-3 p-3 rounded-lg border-2 transition ${p.isActive ? 'bg-orange-50 border-[#E8681A]/30' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
                        <input type="text" value={p.code} onChange={(e) => updatePromoCode(p.id, 'code', e.target.value.toUpperCase())} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8681A]/40 text-sm font-bold uppercase tracking-widest w-full" placeholder="KODE-PROMO" />
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <input type="number" min="0" max="100" value={p.discount} onChange={(e) => updatePromoCode(p.id, 'discount', Number(e.target.value))} className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8681A]/40 text-sm text-right font-bold" />
                          <span className="text-sm text-gray-500 font-semibold">%</span>
                          <div onClick={() => updatePromoCode(p.id, 'isActive', !p.isActive)} className={`relative inline-flex w-10 h-5 rounded-full transition-colors cursor-pointer ml-2 ${p.isActive ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${p.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                          </div>
                          <span className="text-xs font-semibold text-gray-500 w-8">{p.isActive ? 'Aktif' : 'Mati'}</span>
                          <button onClick={() => removePromoCode(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    ))}
                    {(!activeProduct.promoCodes || activeProduct.promoCodes.length === 0) && (
                      <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
                        Belum ada kode promo. Klik 'Tambah Kode'.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===== USER MANAGEMENT SECTION ===== */}
          {activeSection === 'users' && (
            <>
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-xl flex items-center gap-2">
                    <Users size={20} className="text-[#1A7A7A]" />
                    Manajemen User Admin
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Kelola semua akun yang bisa mengakses panel ini.</p>
                </div>
                <button
                  onClick={() => { setShowAddForm(v => !v); setUserMsg({ type: '', text: '' }) }}
                  className="flex items-center gap-2 bg-[#1A7A7A] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#135c5c] transition shadow-md"
                >
                  <UserPlus size={16} />
                  Tambah User
                </button>
              </div>

              <div className="p-6 flex flex-col gap-6">

                {/* Add User Form */}
                {showAddForm && (
                  <div className="bg-[#1A7A7A]/5 border border-[#1A7A7A]/20 rounded-2xl p-5">
                    <h3 className="font-bold text-lg mb-4 text-[#1A7A7A]">Tambah User Baru</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                        <input type="text" value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7A7A]/40 text-sm" placeholder="Nama tampilan" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                        <input type="text" value={newUser.username} onChange={e => setNewUser(p => ({ ...p, username: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7A7A]/40 text-sm" placeholder="username_login" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password (min. 8 karakter)</label>
                        <div className="relative">
                          <input type={showNewPass['new'] ? 'text' : 'password'} value={newUser.password} onChange={e => setNewUser(p => ({ ...p, password: e.target.value }))} className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7A7A]/40 text-sm" placeholder="••••••••" />
                          <button type="button" onClick={() => setShowNewPass(p => ({ ...p, new: !p['new'] }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {showNewPass['new'] ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                        <select value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7A7A]/40 text-sm">
                          <option value="admin">Admin</option>
                          <option value="superadmin">Super Admin</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button onClick={handleAddUser} className="bg-[#1A7A7A] text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-[#135c5c] transition">
                        Simpan User
                      </button>
                      <button onClick={() => { setShowAddForm(false); setNewUser({ username: '', name: '', password: '', role: 'admin' }) }} className="bg-gray-100 text-gray-600 px-5 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition">
                        Batal
                      </button>
                    </div>
                  </div>
                )}

                {/* Status Message */}
                {userMsg.text && (
                  <div className={`text-sm px-4 py-3 rounded-xl ${userMsg.type === 'error' ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700'}`}>
                    {userMsg.text}
                  </div>
                )}

                {/* User List */}
                <div className="flex flex-col gap-3">
                  {adminUsers.map(user => (
                    <div key={user.id} className={`bg-white border rounded-2xl p-5 shadow-sm ${sessionUser?.id === user.id ? 'border-[#1A7A7A] ring-1 ring-[#1A7A7A]/20' : 'border-gray-200'}`}>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 ${user.role === 'superadmin' ? 'bg-amber-500' : 'bg-[#1A7A7A]'}`}>
                            {user.name?.[0] || user.username?.[0] || 'A'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-900">{user.name || user.username}</span>
                              {user.role === 'superadmin' && <Crown size={14} className="text-amber-500" />}
                              {sessionUser?.id === user.id && <span className="text-xs text-[#1A7A7A] font-bold bg-[#1A7A7A]/10 px-2 py-0.5 rounded-full">Anda</span>}
                            </div>
                            <div className="text-sm text-gray-400">@{user.username}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${roleBadgeClass(user.role)}`}>
                            {roleLabel(user.role)}
                          </span>
                          <button
                            onClick={() => setEditingUserId(editingUserId === user.id ? null : user.id)}
                            className="p-2 text-gray-400 hover:text-[#1A7A7A] hover:bg-[#1A7A7A]/10 rounded-lg transition"
                            title="Edit password"
                          >
                            <Edit3 size={16} />
                          </button>
                          {sessionUser?.id !== user.id && (
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                              title="Hapus user"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Inline Edit Password */}
                      {editingUserId === user.id && (
                        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3 flex-wrap items-center">
                          <div className="relative flex-1 min-w-48">
                            <input
                              type={showNewPass[user.id] ? 'text' : 'password'}
                              value={editPass[user.id] || ''}
                              onChange={e => setEditPass(p => ({ ...p, [user.id]: e.target.value }))}
                              placeholder="Password baru (min. 8 karakter)"
                              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7A7A]/40 text-sm"
                            />
                            <button type="button" onClick={() => setShowNewPass(p => ({ ...p, [user.id]: !p[user.id] }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                              {showNewPass[user.id] ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                          </div>
                          <button onClick={() => handleUpdateUser(user.id)} className="bg-[#1A7A7A] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#135c5c] transition">
                            Simpan
                          </button>
                          <button onClick={() => { setEditingUserId(null); setEditPass({}) }} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition">
                            Batal
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </section>
      </main>
    </div>
  )
}
