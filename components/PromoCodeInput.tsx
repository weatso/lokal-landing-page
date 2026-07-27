'use client'

import { useState } from 'react'
import { Tag, CheckCircle2, XCircle } from 'lucide-react'

interface PromoCode {
  id: string
  code: string
  discount: number
  isActive: boolean
  type?: 'percentage' | 'nominal' | 'months'
}

interface PromoCodeInputProps {
  promoCodes?: PromoCode[]
  onApply?: (promo: PromoCode) => void
  onClear?: () => void
}

export default function PromoCodeInput({
  promoCodes = [],
  onApply,
  onClear,
}: PromoCodeInputProps) {
  const [input, setInput]           = useState('')
  const [status, setStatus]         = useState<null | 'success' | 'error'>(null)
  const [appliedCode, setAppliedCode] = useState<PromoCode | null>(null)

  const handleApply = () => {
    const trimmed = input.trim().toUpperCase()
    if (!trimmed) return

    const found = promoCodes.find(
      (p) => p.code.toUpperCase() === trimmed && p.isActive
    )
    if (found) {
      setStatus('success')
      setAppliedCode(found)
      onApply?.(found)
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleApply()
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-8">
      {/* Label */}
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-3">
        <Tag size={15} className="text-[#E8681A]" />
        Punya Kode Promo?
      </div>

      {appliedCode ? (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-green-500 shrink-0" size={20} />
            <div>
              <p className="text-sm font-bold text-green-800">
                Kode <span className="tracking-widest">{appliedCode.code}</span> berhasil diterapkan!
              </p>
              <p className="text-xs text-green-600 mt-0.5">
                {(!appliedCode.type || appliedCode.type === 'percentage') && (
                  <>Diskon <span className="font-black">{appliedCode.discount}%</span> telah aktif pada harga di bawah.</>
                )}
                {appliedCode.type === 'nominal' && (
                  <>Potongan <span className="font-black">Rp {appliedCode.discount.toLocaleString('id-ID')}</span> telah aktif pada harga di bawah.</>
                )}
                {appliedCode.type === 'months' && (
                  <>Gratis <span className="font-black">{appliedCode.discount} Bulan</span> langganan tambahan!</>
                )}
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
        <div>
          <div className="flex gap-2">
            <input
              id="promo-code-input"
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value.toUpperCase())
                setStatus(null)
              }}
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
  )
}
