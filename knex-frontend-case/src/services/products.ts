import api from '@/lib/axios'
import { Product } from '@/types'

export const productsService = {
  list: () => api.get<Product[]>('/products'),

  create: (data: { name: string; description: string; price: number; file_id: string }) =>
    api.post<Product>('/products', data),

  update: (
    id: string,
    data: Partial<{ name: string; description: string; price: number; index: number }>,
  ) => api.put<Product>(`/products/${id}`, data),

  remove: (id: string) => api.delete(`/products/${id}`),

  uploadFile: (file: Blob) => {
    const form = new FormData()
    form.append('file', file)
    return api.post<{ id: string; path: string }>('/files', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
