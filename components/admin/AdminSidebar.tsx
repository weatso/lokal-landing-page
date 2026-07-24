'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, ShoppingBag, Globe, Smartphone,
  Car, FileText, MessageSquare, LogOut, ChevronRight,
  ShieldCheck, Menu, X
} from 'lucide-react'

const PRODUCTS = [
  { key: 'pos-fnb',          label: 'LOKAL POS F&B',        icon: ShoppingBag,    color: 'text-emerald-500' },
  { key: 'jasa-landing-page',label: 'Web Studio',            icon: Globe,          color: 'text-blue-500'    },
  { key: 'iwash',            label: 'iWash',                 icon: Smartphone,     color: 'text-cyan-500'    },
  { key: 'valet-indonesia',  label: 'Valet Indonesia',       icon: Car,            color: 'text-purple-500'  },
  { key: 'brosurhub',        label: 'BrosurHub',             icon: FileText,       color: 'text-orange-500'  },
  { key: 'wa-blast',         label: 'WA Blast',              icon: MessageSquare,  color: 'text-green-500'   },
]

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const router   = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin-login')
  }

  return (
    <aside className="w-64 bg-[#0d1f1f] text-white flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#E8681A] rounded-xl flex items-center justify-center shrink-0">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">LOKAL Admin</div>
            <div className="text-white/40 text-xs">Control Panel</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {/* Overview */}
        <Link
          href="/admin-pricing"
          onClick={onClose}
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
              onClick={onClose}
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
          onClick={onClose}
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

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex shrink-0 min-h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0d1f1f] text-white flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <button
          onClick={() => setIsOpen(true)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#E8681A] rounded-lg flex items-center justify-center shrink-0">
            <ShieldCheck size={14} className="text-white" />
          </div>
          <span className="font-bold text-sm">LOKAL Admin</span>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          {/* Drawer */}
          <div className="relative z-10 flex h-full">
            <SidebarContent onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}
