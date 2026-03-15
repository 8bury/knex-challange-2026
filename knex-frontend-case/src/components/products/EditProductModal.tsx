'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Product } from '@/types'

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  price: z
    .number({ message: 'Informe um valor válido' })
    .int('O preço deve ser inteiro')
    .positive('O valor deve ser maior que zero'),
})

type FormData = z.infer<typeof schema>

interface EditProductModalProps {
  product: Product
  onClose: () => void
  onSave: (
    id: string,
    data: Partial<{ name: string; description: string; price: number; index: number }>,
  ) => Promise<void>
}

export function EditProductModal({ product, onClose, onSave }: EditProductModalProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
    },
  })

  async function onSubmit(data: FormData) {
    try {
      await onSave(product.id, data)
      onClose()
    } catch {
      setError('root', { message: 'Erro ao atualizar produto. Tente novamente.' })
    }
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
            Editar Produto
          </h2>
          <span className="w-10 h-[9px] rounded-full bg-[var(--color-pink-400)]" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="px-[47px] mt-4">
            <p className="font-roboto text-base text-[#694b41] mb-1">Nome:</p>
            <input
              {...register('name')}
              type="text"
              className="w-full h-[34px] bg-white border border-[#653321] rounded-[10px] px-3 font-roboto text-base text-[#653321] outline-none focus:border-[var(--color-pink-400)] transition-colors"
            />
            {errors.name && (
              <p className="mt-1 font-roboto text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="px-[47px] mt-4">
            <p className="font-roboto text-base text-[#694b41] mb-1">Descrição:</p>
            <input
              {...register('description')}
              type="text"
              className="w-full h-[34px] bg-white border border-[#653321] rounded-[10px] px-3 font-roboto text-base text-[#653321] outline-none focus:border-[var(--color-pink-400)] transition-colors"
            />
            {errors.description && (
              <p className="mt-1 font-roboto text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>

          {errors.root && (
            <p className="px-[47px] mt-3 font-roboto text-xs text-red-500">
              {errors.root.message}
            </p>
          )}

          <div className="px-[47px] mt-4 flex items-start justify-between">
            <div>
              <p className="font-roboto text-base text-[#694b41] mb-1">Valor:</p>
              <input
                {...register('price', { valueAsNumber: true })}
                type="number"
                min="1"
                step="1"
                className="w-[107px] h-[34px] bg-white border border-[#653321] rounded-[10px] px-3 font-roboto text-base text-[#653321] outline-none focus:border-[var(--color-pink-400)] transition-colors"
              />
              {errors.price && (
                <p className="mt-1 font-roboto text-xs text-red-500">{errors.price.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-[26px] w-[74px] h-[34px] border border-[#b09da0] rounded-[10px] font-roboto text-base text-[var(--color-brown-900)] hover:bg-[var(--color-pink-300)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '...' : '✓'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
