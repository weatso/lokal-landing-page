import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// Lazy-loaded pages
const Home           = lazy(() => import('./pages/Home'))
const Portal         = lazy(() => import('./pages/Portal'))
const PosFnb         = lazy(() => import('./pages/PosFnb'))
const Iwash          = lazy(() => import('./pages/Iwash'))
const ValetIndonesia = lazy(() => import('./pages/ValetIndonesia'))
const BrosurHub      = lazy(() => import('./pages/BrosurHub'))
const AdminPricing   = lazy(() => import('./pages/AdminPricing'))
const AdminLogin     = lazy(() => import('./pages/AdminLogin'))
const NotFound       = lazy(() => import('./pages/NotFound'))

// GA4 page tracking on route change
const GA_ID = 'G-XXXXXXXXXX' // Ganti dengan Measurement ID Anda

function GATracker() {
  const location = useLocation()
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', GA_ID, { page_path: location.pathname })
    }
  }, [location])
  return null
}

// GA4 script injection
function injectGA() {
  if (document.getElementById('ga4-script')) return
  const script = document.createElement('script')
  script.id = 'ga4-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_ID)
}

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="flex flex-col items-center gap-4">
        <img src="/lokal.png" alt="LOKAL" className="w-28 animate-pulse" />
        <div className="w-8 h-8 border-3 border-[#1A7A7A] border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}

export default function App() {
  useEffect(() => {
    if (import.meta.env.PROD) injectGA()
  }, [])

  return (
    <HelmetProvider>
      <BrowserRouter>
        <GATracker />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"                 element={<Home />} />
            <Route path="/portal"           element={<Portal />} />
            <Route path="/pos-fnb"          element={<PosFnb />} />
            <Route path="/iwash"            element={<Iwash />} />
            <Route path="/valet-indonesia"  element={<ValetIndonesia />} />
            <Route path="/brosurhub"        element={<BrosurHub />} />
            <Route path="/admin-pricing"    element={<AdminPricing />} />
            <Route path="/admin-login"      element={<AdminLogin />} />
            <Route path="*"                 element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}
