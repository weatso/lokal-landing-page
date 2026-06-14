import { useState } from 'react'
import { Tag, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react'

/**
 * PromoCodeInput
 * 
 * Props:
 *  - promoCodes: array of {id, code, discount, isActive} — loaded from CMS (lokal_pricing_data)
 *  - onApply: function(discount, code) — called when a valid code is applied
 *  - onClear: function() — called when code is cleared
 */
export default function PromoCodeInput({ promoCodes = [], onApply, onClear }) {
  const [input, setInput] = useState('')
  const [status, setStatus] = useState(null) // null | 'success' | 'error'
  const [appliedCode, setAppliedCode] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleApply = () => {
    const trimmed = input.trim().toUpperCase()
    if (!trimmed) return

    const found = promoCodes.find(p => p.code.toUpperCase() === trimmed && p.isActive)
    if (found) {
      setStatus('success')
      setAppliedCode(found)
      onApply?.(found.discount, found.code)
    } else {
      setStatus('error')
      setAppliedCode(null)
      onClear?.()
    }
  }

  const handleClear = () => {
    setInput('')
    setStatus(null)
    setAppliedCode(null)
    onClear?.()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleApply()
  }

  return (
    <div className="mb-8">
      {/* Trigger toggle */}
      <button
        type="button"
        onClick={() => setIsExpanded(v => !v)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition mb-3 select-none"
      >
        <Tag size={16} className="text-[#E8681A]" />
        Punya Kode Promo?
        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>

      {/* Input area — shown when expanded */}
      {isExpanded && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 transition-all">
          {appliedCode ? (
            /* Success state — showing applied code */
            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                <div>
                  <p className="text-sm font-bold text-green-800">
                    Kode <span className="tracking-widest">{appliedCode.code}</span> berhasil diterapkan!
                  </p>
                  <p className="text-xs text-green-600 mt-0.5">
                    Diskon <span className="font-black">{appliedCode.discount}%</span> telah aktif pada harga di bawah.
                  </p>
                </div>
              </div>
              <button
                onClick={handleClear}
                className="text-xs text-red-400 hover:text-red-600 font-semibold ml-4 shrink-0"
              >
                Hapus
              </button>
            </div>
          ) : (
            /* Input state */
            <div>
              <div className="flex gap-2">
                <input
                  id="promo-code-input"
                  type="text"
                  value={input}
                  onChange={e => { setInput(e.target.value.toUpperCase()); setStatus(null) }}
                  onKeyDown={handleKeyDown}
                  placeholder="Masukkan kode promo..."
                  className={`flex-1 px-4 py-2.5 border-2 rounded-xl text-sm font-mono font-bold uppercase tracking-widest focus:outline-none transition ${
                    status === 'error'
                      ? 'border-red-400 bg-red-50 text-red-700 focus:border-red-500'
                      : 'border-gray-200 bg-white focus:border-[#E8681A]/60'
                  }`}
                />
                <button
                  id="promo-apply-btn"
                  onClick={handleApply}
                  className="bg-[#E8681A] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#c95914] transition shadow-md shadow-[#E8681A]/20 shrink-0"
                >
                  Terapkan
                </button>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 mt-2.5">
                  <XCircle className="text-red-500 shrink-0" size={16} />
                  <p className="text-xs text-red-600 font-medium">
                    Kode promo tidak valid atau sudah tidak aktif.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
