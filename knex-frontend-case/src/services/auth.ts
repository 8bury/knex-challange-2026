import api from '@/lib/axios'
import { AuthResponse } from '@/types'

export const authService = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post<AuthResponse>('/auth/register', data),

  login: (data: { email: string; password: string }) => api.post<AuthResponse>('/auth/login', data),
}
