'use client'

import { useState } from 'react'

interface DeleteProductModalProps {
  onClose: () => void
  onConfirm: () => Promise<void>
}

export function DeleteProductModal({ onClose, onConfirm }: DeleteProductModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleConfirm() {
    setLoading(true)
    setError(null)
    try {
      await onConfirm()
      onClose()
    } catch {
      setError('Erro ao apagar o produto. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-[287px] bg-[#fff4f6] border border-[#653321] rounded-[10px] px-6 py-6 flex flex-col gap-4">
        <p className="font-roboto text-xl text-[#694b41] text-center">
          Deseja realmente apagar o produto
        </p>
        {error && <p className="font-roboto text-xs text-red-500 text-center">{error}</p>}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="w-[94px] h-[34px] border border-[#b09da0] rounded-[10px] font-roboto text-base text-[#653321] hover:bg-[var(--color-pink-200)] transition-colors"
          >
            Não
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-[92px] h-[34px] border border-[#b09da0] rounded-[10px] font-roboto text-base text-white bg-[#653321] hover:bg-[#874b35] transition-colors disabled:opacity-50"
          >
            {loading ? '...' : 'Sim'}
          </button>
        </div>
      </div>
    </div>
  )
}
