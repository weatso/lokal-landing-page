'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, ShoppingBag, Globe, Smartphone,
  Car, FileText, MessageSquare, LogOut, ChevronRight,
  ShieldCheck
} from 'lucide-react'

const PRODUCTS = [
  { key: 'pos-fnb',          label: 'LOKAL POS F&B',        icon: ShoppingBag,    color: 'text-emerald-500' },
  { key: 'jasa-landing-page',label: 'Web Studio',            icon: Globe,          color: 'text-blue-500'    },
  { key: 'iwash',            label: 'iWash',                 icon: Smartphone,     color: 'text-cyan-500'    },
  { key: 'valet-indonesia',  label: 'Valet Indonesia',       icon: Car,            color: 'text-purple-500'  },
  { key: 'brosurhub',        label: 'BrosurHub',             icon: FileText,       color: 'text-orange-500'  },
  { key: 'wa-blast',         label: 'WA Blast',              icon: MessageSquare,  color: 'text-green-500'   },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router   = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin-login')
  }

  return (
    <aside className="w-64 shrink-0 bg-[#0d1f1f] text-white flex flex-col min-h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#E8681A] rounded-xl flex items-center justify-center shrink-0">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">LOKAL Admin</div>
            <div className="text-white/40 text-xs">Control Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {/* Overview */}
        <Link
          href="/admin-pricing"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            pathname === '/admin-pricing'
              ? 'bg-[#1A7A7A] text-white'
              : 'text-white/60 hover:bg-white/5 hover:text-white'
          }`}
        >
          <LayoutDashboard size={17} />
          Overview
        </Link>

        {/* Products divider */}
        <div className="pt-4 pb-1 px-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Pengaturan Harga</span>
        </div>

        {PRODUCTS.map(({ key, label, icon: Icon, color }) => {
          const href     = `/admin-pricing/${key}`
          const isActive = pathname === href
          return (
            <Link
              key={key}
              href={href}
              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#1A7A7A]/20 text-white border border-[#1A7A7A]/40'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className={isActive ? 'text-[#1A7A7A]' : color} />
                {label}
              </div>
              {isActive && <ChevronRight size={14} className="text-[#1A7A7A]" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all mb-1"
        >
          <Globe size={16} />
          Lihat Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </aside>
  )
}
