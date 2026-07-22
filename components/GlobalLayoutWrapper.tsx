'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export default function GlobalLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Hide on any admin routes
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Navbar />}
      <main>{children}</main>
      {!isAdmin && (
        <>
          <Footer />
          <FloatingWhatsApp />
        </>
      )}
    </>
  )
}
