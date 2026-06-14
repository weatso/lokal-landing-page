import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ── Stealth: Disable React DevTools fingerprint in production ──
if (import.meta.env.PROD) {
  const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__
  if (hook && typeof hook === 'object') {
    Object.keys(hook).forEach((key) => {
      hook[key] = typeof hook[key] === 'function' ? () => {} : null
    })
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
