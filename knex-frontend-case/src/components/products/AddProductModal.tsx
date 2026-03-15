'use client'

import { useEffect, useRef, useState } from 'react'
import { productsService } from '@/services/products'
import { Product } from '@/types'

interface AddProductModalProps {
  onClose: () => void
  onAdd: (product: Product) => void
}

export function AddProductModal({ onClose, onAdd }: AddProductModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview)
    }
  }, [photoPreview])

  async function handleSubmit() {
    if (!name || !description || !price || !photo) return
    setLoading(true)
    setError(null)
    try {
      const uploadRes = await productsService.uploadFile(photo)
      const file_id = uploadRes.data.file.id
      const res = await productsService.create({
        name,
        description,
        price: parseInt(price, 10),
        file_id,
      })
      onAdd(res.data.product)
      onClose()
    } catch {
      setError('Erro ao adicionar produto. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setPhoto(file)
    setPhotoPreview(file ? URL.createObjectURL(file) : null)
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-[402px] bg-[#fff4f6] border border-[#b09da0] rounded-[30px] py-7 px-0 flex flex-col">
        <div className="flex items-center justify-center gap-3 px-8 mb-2">
          <span className="w-10 h-[9px] rounded-full bg-[var(--color-pink-400)]" />
          <h2 className="font-bahiana text-5xl text-[var(--color-brown-900)] whitespace-nowrap">
            Adicionar Produtos
          </h2>
          <span className="w-10 h-[9px] rounded-full bg-[var(--color-pink-400)]" />
        </div>

        <div className="px-[47px] mt-4">
          <p className="font-roboto text-base text-[#694b41] mb-1">Foto:</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-[235px] h-[203px] bg-white border border-[#653321] rounded-[10px] flex items-center justify-center overflow-hidden mx-auto block"
          >
            {photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <svg
                width="48"
                height="48"
                viewBox="0 0 44 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 4L12 10H4C2.9 10 2 10.9 2 12V32C2 33.1 2.9 34 4 34H40C41.1 34 42 33.1 42 32V12C42 10.9 41.1 10 40 10H32L28 4H16Z"
                  stroke="#694b41"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="22" cy="22" r="7" stroke="#694b41" strokeWidth="2" />
              </svg>
            )}
          </button>
        </div>

        <div className="px-[47px] mt-4">
          <p className="font-roboto text-base text-[#694b41] mb-1">Nome:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[34px] bg-white border border-[#653321] rounded-[10px] px-3 font-roboto text-base text-[#653321] outline-none focus:border-[var(--color-pink-400)] transition-colors"
          />
        </div>

        <div className="px-[47px] mt-4">
          <p className="font-roboto text-base text-[#694b41] mb-1">Descrição:</p>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-[34px] bg-white border border-[#653321] rounded-[10px] px-3 font-roboto text-base text-[#653321] outline-none focus:border-[var(--color-pink-400)] transition-colors"
          />
        </div>

        {error && <p className="px-[47px] mt-3 font-roboto text-xs text-red-500">{error}</p>}

        <div className="px-[47px] mt-4 flex items-end justify-between">
          <div>
            <p className="font-roboto text-base text-[#694b41] mb-1">Valor:</p>
            <input
              type="number"
              min="0"
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-[107px] h-[34px] bg-white border border-[#653321] rounded-[10px] px-3 font-roboto text-base text-[#653321] outline-none focus:border-[var(--color-pink-400)] transition-colors"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading || !name || !description || !price || !photo}
            className="w-[74px] h-[34px] border border-[#b09da0] rounded-[10px] font-roboto text-base text-[var(--color-brown-900)] hover:bg-[var(--color-pink-300)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? '...' : '+'}
          </button>
        </div>
      </div>
    </div>
  )
}
