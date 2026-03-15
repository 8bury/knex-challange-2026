'use client'

import Image from 'next/image'
import { Product } from '@/types'
import { formatPrice, productImageUrl } from '@/hooks/useProducts'

interface ProductCardProps {
  product: Product
  canDelete: boolean
  onDelete: () => void
}

export function ProductCard({ product, canDelete, onDelete }: ProductCardProps) {
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
          <button
            onClick={onDelete}
            className="absolute top-2 right-2 border border-[#b09da0] rounded-[10px] px-4 py-1 font-roboto text-base text-[#653321] bg-white/90 hover:bg-[var(--color-pink-200)] transition-colors"
          >
            -
          </button>
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
