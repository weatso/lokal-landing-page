'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Beranda',            href: '/' },
  { label: 'Bikin Website',      href: '/jasa-landing-page' },
  { label: 'Kasir F&B',         href: '/pos-fnb' },
  { label: 'Cuci Mobil',        href: '/iwash' },
  { label: 'Valet',             href: '/valet-indonesia' },
  { label: 'Brosur Digital',    href: '/brosurhub' },
  { label: 'WA Blast',          href: '/wa-blast' },
]

const WA_NUMBER  = process.env.NEXT_PUBLIC_WA_NUMBER ?? '6281234567890'
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-[#1A7A7A]/10 ${
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
            {navLinks.map((link) => (
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
          <div className="md:hidden bg-white border-t border-[#1A7A7A]/10 py-4 px-2 shadow-lg rounded-b-2xl">
            {navLinks.map((link) => (
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
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full mt-4 justify-center text-sm"
            >
              Konsultasi via WhatsApp
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
