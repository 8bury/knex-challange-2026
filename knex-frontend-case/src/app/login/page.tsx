'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Cookies from 'js-cookie'
import { authService } from '@/services/auth'
import AuthLayout from '@/components/ui/AuthLayout'
import FormField from '@/components/forms/FormField'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  async function onSubmit(data: LoginFormData) {
    try {
      const response = await authService.login({ email: data.email, password: data.password })
      Cookies.set('token', response.data.token, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      router.push('/dashboard')
    } catch {
      setError('root', { message: 'Email ou senha incorretos' })
    }
  }

  return (
    <AuthLayout>
      <div className="relative w-full max-w-[360px]">
        <div className="absolute -top-[33px] left-1/2 -translate-x-1/2 z-0">
          <Link href="/register" className="signup-tab">
            Sign Up
          </Link>
        </div>

        <div className="auth-card">
          <h1 className="font-bahiana text-brown-900 text-5xl text-center tracking-widest uppercase mb-036">
            Login Admin
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-020">
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

            {errors.root && (
              <span className="text-red-500 text-xs text-center">{errors.root.message}</span>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Entrando...' : 'Logar'}
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}
