'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useProducts } from '@/hooks/useProducts'
import { AddProductModal } from '@/components/products/AddProductModal'
import { DeleteProductModal } from '@/components/products/DeleteProductModal'
import { EditProductModal } from '@/components/products/EditProductModal'
import { ProductCard } from '@/components/products/ProductCard'

const PAGE_SIZE = 3

export function ProductsSection() {
  const { isAuthenticated } = useAuth()
  const { products, loading, error, addProduct, removeProduct, updateProduct } =
    useProducts(isAuthenticated)

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [editTargetId, setEditTargetId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const editTarget = products.find((p) => p.id === editTargetId) ?? null
  const [carouselPage, setCarouselPage] = useState(0)

  const totalPages = Math.ceil(products.length / PAGE_SIZE)
  const visibleProducts = products.slice(carouselPage * PAGE_SIZE, (carouselPage + 1) * PAGE_SIZE)

  return (
    <section id="produtos" className="bg-[var(--color-pink-200)] py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="relative flex flex-col items-center mb-12">
          <div className="flex items-center gap-4 mb-1">
            <span className="w-28 h-[3px] rounded-full bg-[var(--color-pink-400)]" />
            <h2 className="font-bahiana text-5xl text-[var(--color-brown-900)] tracking-[0.03em] whitespace-nowrap">
              Nossos Produtos
            </h2>
            <span className="w-28 h-[3px] rounded-full bg-[var(--color-pink-400)]" />
          </div>
          <p className="font-roboto text-base text-[#694b41]">
            Conheça nossas opções de gostosuras.
          </p>
          {isAuthenticated && (
            <button
              onClick={() => setShowAddModal(true)}
              className="absolute right-0 top-1/2 -translate-y-1/2 border border-[var(--color-border-muted)] rounded-[10px] px-8 py-4 font-roboto text-base text-[var(--color-brown-900)] hover:bg-[var(--color-pink-300)] transition-colors"
            >
              +
            </button>
          )}
        </div>

        {!isAuthenticated ? (
          <p className="text-center font-roboto text-[#7c706c] py-16">
            <Link
              href="/login"
              className="text-[var(--color-pink-400)] underline hover:text-[var(--color-brown-900)] transition-colors"
            >
              Faça login
            </Link>{' '}
            para ver os produtos da loja.
          </p>
        ) : loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-[var(--color-pink-400)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-center font-roboto text-red-500 py-16">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center font-roboto text-[#7c706c] py-16">
            Nenhum produto cadastrado ainda.
          </p>
        ) : (
          <div className="relative">
            <button
              onClick={() => setCarouselPage((p) => Math.max(0, p - 1))}
              disabled={carouselPage === 0}
              className="absolute -left-5 top-[120px] -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-pink-400)] flex items-center justify-center z-10 hover:bg-[var(--color-pink-300)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="#653321"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex gap-10 justify-center overflow-hidden">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  canDelete={isAuthenticated}
                  onDelete={() => setDeleteTargetId(product.id)}
                  onEdit={() => setEditTargetId(product.id)}
                />
              ))}
            </div>

            <button
              onClick={() => setCarouselPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={carouselPage >= totalPages - 1}
              className="absolute -right-5 top-[120px] -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-pink-400)] flex items-center justify-center z-10 hover:bg-[var(--color-pink-300)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Próximo"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="#653321"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {deleteTargetId && (
        <DeleteProductModal
          onClose={() => setDeleteTargetId(null)}
          onConfirm={() => removeProduct(deleteTargetId)}
        />
      )}

      {showAddModal && (
        <AddProductModal onClose={() => setShowAddModal(false)} onAdd={addProduct} />
      )}

      {editTarget && (
        <EditProductModal
          product={editTarget}
          onClose={() => setEditTargetId(null)}
          onSave={updateProduct}
        />
      )}
    </section>
  )
}
