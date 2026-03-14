'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { logout, isAuthenticated } = useAuth()
  const loggedIn = isAuthenticated()

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
            <Link href="#quem-somos" className="nav-link">Quem Somos?</Link>
            <Link href="#produtos" className="nav-link">Produtos</Link>
            <Link href="#depoimentos" className="nav-link">Depoimentos</Link>
            <Link href="#contato" className="nav-link">Contato</Link>

            {loggedIn ? (
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

      <section className="flex-1 bg-[var(--color-pink-200)]">
        <div className="max-w-7xl mx-auto px-8 py-16 flex items-center justify-between min-h-[calc(100vh-88px)]">
          <div className="flex flex-col max-w-lg">
            <h1 className="text-7xl leading-none mb-2 font-bahiana text-[var(--color-pink-400)] tracking-[0.05em]">
              FALA AI
            </h1>
            <h2 className="text-6xl leading-tight mb-6 font-bahiana text-[var(--color-brown-900)] tracking-[0.03em]">
              QUAL VAI QUERER?
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-sm font-roboto text-[var(--color-brown-900)]">
              Descubra o sabor que derrete na boca: cupcakes feitos
              com amor, perfeitos para adoçar o seu dia!
            </p>
            <button className="btn-cta px-10 py-4 self-start">
              Conhecer agora
            </button>
          </div>

          <div className="relative flex-shrink-0 w-[460px] h-[460px]">
            <div
              className="absolute rounded-full w-[420px] h-[420px] bottom-0 left-1/2 -translate-x-1/2"
              style={{ backgroundColor: 'var(--color-pink-400)' }}
            />
            <div className="absolute w-[320px] bottom-[-10px] left-1/2 -translate-x-1/2 z-[5]">
              <Image
                src="/cupcake_shadow.png"
                alt=""
                width={320}
                height={60}
                className="object-contain w-full"
              />
            </div>
            <div className="absolute inset-0 flex items-end justify-center">
              <Image
                src="/cupcake_lp.png"
                alt="Cupcake delicioso"
                width={420}
                height={480}
                className="object-contain relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <section id="quem-somos" className="bg-[var(--color-pink-50)] py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-[380px_1fr] items-center gap-20 px-16">

          <div className="relative w-[320px] h-[320px] justify-self-center">
            <div className="absolute w-[130px] h-[130px] rounded-full bg-[var(--color-pink-400)] -bottom-3 -left-6 z-0" />
            <div className="relative w-full h-full rounded-full overflow-hidden z-10">
              <Image
                src="/making_cupcake_lp.png"
                alt="Fazendo cupcakes"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-[3px] rounded-full bg-[var(--color-pink-400)]" />
              <p className="font-bahiana tracking-widest text-xl whitespace-nowrap">
                <span className="text-[var(--color-brown-900)]">SOMOS UMA EQUIPE </span>
                <span className="text-[var(--color-pink-400)]">CENTRADA</span>
              </p>
              <span className="w-10 h-[3px] rounded-full bg-[var(--color-pink-400)]" />
            </div>

            <h2 className="font-bahiana text-[2.6rem] leading-tight text-[var(--color-brown-900)] tracking-[0.03em] mb-5 whitespace-nowrap">
              EM LEVAR O CUPCAKE DE MELHOR QUALIDADE ATÉ VOCÊ
            </h2>

            <hr className="border-none h-[2px] bg-[var(--color-pink-400)] mb-6" />

            <p className="font-roboto text-sm leading-relaxed text-[var(--color-brown-900)] max-w-lg">
              A Cup&amp;Cake é uma confeitaria especializada em criar cupcakes
              deliciosos e feitos com carinho. Usamos ingredientes frescos e receitas
              únicas para oferecer sabores que encantam a cada mordida. Nosso
              objetivo é adoçar seus momentos especiais, seja com um mimo do dia a
              dia ou em grandes celebrações!&quot;
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
