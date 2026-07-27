'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

const internalLinks = [
  { label: 'Beranda',            href: '/' },
  { label: 'Bikin Website',      href: '/jasa-landing-page' },
  { label: 'Lokal F&B',          href: '/pos-fnb' },
  { label: 'Lokal Retail',       href: '/pos-retail' },
  { label: 'Lokal Beauty',       href: '/pos-beauty' },
]

const collabLinks = [
  { label: 'Cuci Mobil (iWash)', href: '/iwash' },
  { label: 'Sistem Valet',       href: '/valet-indonesia' },
  { label: 'Brosur Digital',     href: '/brosurhub' },
  { label: 'WA Blast',           href: '/wa-blast' },
]

const WA_NUMBER  = process.env.NEXT_PUBLIC_WA_NUMBER ?? '6285111326098'
const WA_MESSAGE = 'Halo LOKAL, saya ingin tahu lebih lanjut tentang solusi untuk bisnis saya.'

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname                = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-[#1A7A7A]/10 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/lokal.png"
              alt="LOKAL"
              width={120}
              height={32}
              className="h-11 w-auto transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {internalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm ${
                  pathname === link.href ? 'text-[#1A7A7A] font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Dropdown Kolaborasi */}
            <div className="relative group">
              <button className="flex items-center gap-1 nav-link text-sm font-medium py-2">
                Produk Kolaborasi <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-0 w-48 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                {collabLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#1A7A7A]/5 hover:text-[#1A7A7A]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Desktop */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn-primary text-sm py-2.5"
          >
            Konsultasi
          </a>

          {/* Hamburger Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[#1A7A7A] hover:bg-[#1A7A7A]/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-[#1A7A7A]/10 py-4 px-2 shadow-lg rounded-b-2xl h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-2 mt-2">Layanan Utama</div>
            {internalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 px-4 rounded-xl font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-[#1A7A7A]/10 text-[#1A7A7A]'
                    : 'text-[#333333] hover:bg-[#1A7A7A]/5 hover:text-[#1A7A7A]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-2 mt-4">Produk Kolaborasi</div>
            {collabLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 px-4 rounded-xl font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-[#1A7A7A]/10 text-[#1A7A7A]'
                    : 'text-[#333333] hover:bg-[#1A7A7A]/5 hover:text-[#1A7A7A]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="mt-4 px-4 pb-10">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full mt-4 justify-center text-sm"
              >
                Konsultasi via WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
