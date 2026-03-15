'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Cookies from 'js-cookie'
import { authService } from '@/services/auth'
import { useAuth } from '@/hooks/useAuth'
import AuthLayout from '@/components/ui/AuthLayout'
import FormField from '@/components/forms/FormField'

const registerSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const { setAuthenticated } = useAuth()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) })

  async function onSubmit(data: RegisterFormData) {
    try {
      const response = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      Cookies.set('token', response.data.token, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      setAuthenticated(true)
      router.push('/')
    } catch {
      setError('root', { message: 'Erro ao cadastrar. Tente novamente.' })
    }
  }

  return (
    <AuthLayout>
      <div className="relative w-full max-w-[360px]">
        <div className="absolute -top-[33px] left-1/2 -translate-x-1/2 z-0">
          <Link href="/login" className="signup-tab">
            Login
          </Link>
        </div>

        <div className="auth-card">
          <h1 className="font-bahiana text-brown-900 text-5xl text-center tracking-widest uppercase mb-036">
            Cadastro Admin
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-020">
            <FormField
              label="Nome:"
              type="text"
              error={errors.name?.message}
              {...register('name')}
            />
            <FormField
              label="Email:"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <FormField
              label="Senha:"
              type="password"
              error={errors.password?.message}
              {...register('password')}
            />
            <FormField
              label="Confirmar Senha:"
              type="password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            {errors.root && (
              <span className="text-red-500 text-xs text-center">{errors.root.message}</span>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}
