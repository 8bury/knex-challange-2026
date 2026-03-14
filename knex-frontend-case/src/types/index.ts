export interface User {
  id: string
  name: string
  email: string
}

export interface File {
  id: string
  path: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  index: number
  file: File
}

export interface AuthResponse {
  token: string
  user: User
}
