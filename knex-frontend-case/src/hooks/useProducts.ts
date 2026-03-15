'use client'

import { useEffect, useReducer } from 'react'
import { productsService } from '@/services/products'
import { Product } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://knex.zernis.space'

export function normalizeProducts(data: unknown): Product[] {
  return Array.isArray(data) ? data : ((data as { products: Product[] }).products ?? [])
}

export function productImageUrl(product: Product) {
  return product.file?.path ? `${API_URL}/${product.file.path}` : '/cupcake_lp.png'
}

export function formatPrice(price: number) {
  return price.toFixed(2).replace('.', ',')
}

type State = {
  products: Product[]
  loading: boolean
  error: string | null
}

type Action =
  | { type: 'fetch_start' }
  | { type: 'fetch_success'; data: Product[] }
  | { type: 'fetch_error' }
  | { type: 'add'; product: Product }
  | { type: 'remove'; id: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'fetch_start':
      return { ...state, loading: true, error: null }
    case 'fetch_success':
      return { products: action.data, loading: false, error: null }
    case 'fetch_error':
      return { ...state, loading: false, error: 'Não foi possível carregar os produtos.' }
    case 'add':
      return { ...state, products: [...state.products, action.product] }
    case 'remove':
      return { ...state, products: state.products.filter((p) => p.id !== action.id) }
  }
}

export function useProducts(enabled: boolean) {
  const [{ products, loading, error }, dispatch] = useReducer(reducer, {
    products: [],
    loading: false,
    error: null,
  })

  useEffect(() => {
    if (!enabled) return
    dispatch({ type: 'fetch_start' })
    productsService
      .list()
      .then((res) => dispatch({ type: 'fetch_success', data: normalizeProducts(res.data) }))
      .catch(() => dispatch({ type: 'fetch_error' }))
  }, [enabled])

  function addProduct(product: Product) {
    dispatch({ type: 'add', product })
  }

  async function removeProduct(id: string) {
    await productsService.remove(id)
    dispatch({ type: 'remove', id })
  }

  return { products, loading, error, addProduct, removeProduct }
}
