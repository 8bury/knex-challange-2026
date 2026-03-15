'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export function Header() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src="/cupandcake_logo_text.png"
            alt="Cup&Cake"
            width={180}
            height={60}
            className="object-contain"
            priority
          />
        </Link>

        <nav className="flex items-center gap-10">
          <Link href="#quem-somos" className="nav-link">
            Quem Somos?
          </Link>
          <Link href="#produtos" className="nav-link">
            Produtos
          </Link>
          <Link href="#depoimentos" className="nav-link">
            Depoimentos
          </Link>
          <Link href="#contato" className="nav-link">
            Contato
          </Link>

          {isAuthenticated ? (
            <button
              onClick={logout}
              aria-label="Sair"
              className="w-12 h-12 rounded-full bg-[var(--color-pink-400)] flex items-center justify-center hover:bg-[var(--color-pink-300)] transition-colors ml-2"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                  stroke="#3d1a0e"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="16 17 21 12 16 7"
                  stroke="#3d1a0e"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="21"
                  y1="12"
                  x2="9"
                  y2="12"
                  stroke="#3d1a0e"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <Link href="/login" className="btn-cta px-8 py-2 ml-2">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
