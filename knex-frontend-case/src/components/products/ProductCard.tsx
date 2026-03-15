'use client'

import Image from 'next/image'
import { Product } from '@/types'
import { formatPrice, productImageUrl } from '@/hooks/useProducts'

interface ProductCardProps {
  product: Product
  canDelete: boolean
  onDelete: () => void
  onEdit: () => void
}

export function ProductCard({ product, canDelete, onDelete, onEdit }: ProductCardProps) {
  return (
    <div className="flex flex-col">
      <div className="relative w-[240px] h-[240px] rounded-[10px] bg-white overflow-hidden">
        <Image
          src={productImageUrl(product)}
          alt={product.name}
          fill
          sizes="240px"
          className="object-cover"
        />
        {canDelete && (
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={onEdit}
              className="border border-[#b09da0] rounded-[10px] px-3 py-1 font-roboto text-base text-[#653321] bg-white/90 hover:bg-[var(--color-pink-200)] transition-colors"
              aria-label="Editar produto"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  stroke="#653321"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  stroke="#653321"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={onDelete}
              className="border border-[#b09da0] rounded-[10px] px-4 py-1 font-roboto text-base text-[#653321] bg-white/90 hover:bg-[var(--color-pink-200)] transition-colors"
              aria-label="Remover produto"
            >
              -
            </button>
          </div>
        )}
      </div>
      <div className="bg-white rounded-[10px] mt-0 px-4 pt-2 pb-3">
        <p className="font-roboto text-[15px] text-[#694b41] mb-2">{product.name}</p>
        <div className="border border-[var(--color-border-muted)] rounded-[5px] px-4 py-1 flex items-center justify-center gap-0.5">
          <span className="font-roboto text-[10px] text-[var(--color-brown-900)] self-center">
            R$
          </span>
          <span className="font-roboto text-[20px] font-medium text-[var(--color-brown-900)]">
            {formatPrice(product.price)}
          </span>
          <span className="font-roboto text-[10px] text-[var(--color-brown-900)] self-end mb-[3px]">
            /un
          </span>
        </div>
      </div>
    </div>
  )
}
