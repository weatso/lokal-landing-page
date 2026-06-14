import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Eye, EyeOff, Lock, User } from 'lucide-react'
import SEO from '../components/SEO'

// ============================================================
// AUTH UTILITIES — exported so AdminPricing can use them
// ============================================================

function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash.toString(36)
}

// Default admin users (used if no users have been saved in CMS yet)
export const DEFAULT_USERS = [
  { id: '1', username: 'lokaladmin', passwordHash: hashString('Lokal@2024!'), role: 'superadmin', name: 'Super Admin' }
]

export function hashPassword(str) {
  return hashString(str)
}

export function getAdminUsers() {
  const saved = localStorage.getItem('lokal_admin_users')
  if (saved) {
    try { return JSON.parse(saved) } catch { /* fall through */ }
  }
  return DEFAULT_USERS
}

export function saveAdminUsers(users) {
  localStorage.setItem('lokal_admin_users', JSON.stringify(users))
}

export function checkAdminSession() {
  const session = localStorage.getItem('lokal_admin_session')
  if (!session) return false
  try {
    const { expires } = JSON.parse(session)
    if (Date.now() > expires) {
      localStorage.removeItem('lokal_admin_session')
      return false
    }
    return true
  } catch {
    return false
  }
}

export function getSessionUser() {
  const session = localStorage.getItem('lokal_admin_session')
  if (!session) return null
  try {
    const parsed = JSON.parse(session)
    if (Date.now() > parsed.expires) {
      localStorage.removeItem('lokal_admin_session')
      return null
    }
    return parsed.user || null
  } catch {
    return null
  }
}

export function createAdminSession(user) {
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36)
  const expires = Date.now() + 24 * 60 * 60 * 1000 // 24 jam
  localStorage.setItem('lokal_admin_session', JSON.stringify({
    token,
    expires,
    user: { id: user.id, username: user.username, role: user.role, name: user.name }
  }))
}

export function destroyAdminSession() {
  localStorage.removeItem('lokal_admin_session')
}

// ============================================================
// LOGIN PAGE
// ============================================================
export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (checkAdminSession()) {
      navigate('/admin-pricing', { replace: true })
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate async delay (prevent timing attacks)
    await new Promise(resolve => setTimeout(resolve, 600))

    const users = getAdminUsers()
    const inputHash = hashString(password)
    const matched = users.find(u =>
      u.username.toLowerCase() === username.toLowerCase().trim() &&
      u.passwordHash === inputHash
    )

    if (matched) {
      createAdminSession(matched)
      navigate('/admin-pricing', { replace: true })
    } else {
      setError('Username atau password salah. Coba lagi.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d2d2d] via-[#1A4A4A] to-[#1A7A7A] flex items-center justify-center p-4 font-sans">
      <SEO title="Admin Login - LOKAL" robots="noindex, nofollow" />

      {/* Background decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E8681A]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#1A7A7A]/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-2xl px-6 py-3 mb-4 shadow-xl">
            <img src="/lokal.png" alt="LOKAL" className="h-10 object-contain" />
          </div>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <ShieldCheck size={16} />
            <span>Admin Panel</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-2">Masuk ke Admin</h1>
          <p className="text-white/50 text-sm mb-8">Gunakan kredensial admin untuk mengakses panel ini.</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#E8681A]/60 focus:border-[#E8681A]/60 transition"
                  placeholder="Masukkan username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-12 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#E8681A]/60 focus:border-[#E8681A]/60 transition"
                  placeholder="Masukkan password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-[#E8681A] hover:bg-[#c95914] disabled:bg-[#E8681A]/50 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-[#E8681A]/30 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Masuk ke Panel
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          Akses terbatas. Sesi berlaku 24 jam.
        </p>
      </div>
    </div>
  )
}
