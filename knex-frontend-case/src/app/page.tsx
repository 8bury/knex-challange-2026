'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { productsService } from '@/services/products'
import { Product } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://knex.zernis.space'

function normalizeProducts(data: unknown): Product[] {
  return Array.isArray(data) ? data : ((data as { products: Product[] }).products ?? [])
}

function formatPrice(price: number) {
  return price.toFixed(2).replace('.', ',')
}

function productImageUrl(product: Product) {
  return product.file?.path ? `${API_URL}/${product.file.path}` : '/cupcake_lp.png'
}

const testimonials = [
  {
    name: 'Laura Silva',
    text: 'Simplesmente os melhores cupcakes que já experimentei! A massa é fofinha e o recheio é perfeito.',
    image: '/laura.png',
  },
  {
    name: 'Carlos André',
    text: 'Os sabores são incríveis, dá para sentir o cuidado em cada detalhe. É impossível comer só um!',
    image: '/carlos.jpg',
  },
  {
    name: 'Joseph Nunes',
    text: 'Sempre que quero adoçar meu dia, corro para cá. Qualidade e sabor sem comparação!',
    image: '/joseph.jpg',
  },
]

export default function Home() {
  const { logout, isAuthenticated } = useAuth()
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    setLoggedIn(isAuthenticated())
  }, [isAuthenticated])

  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [showAddModal, setShowAddModal] = useState(false)
  const [addName, setAddName] = useState('')
  const [addDescription, setAddDescription] = useState('')
  const [addPrice, setAddPrice] = useState('')
  const [addPhoto, setAddPhoto] = useState<globalThis.File | null>(null)
  const [addPhotoPreview, setAddPhotoPreview] = useState<string | null>(null)
  const [addLoading, setAddLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (addPhotoPreview) URL.revokeObjectURL(addPhotoPreview)
    }
  }, [addPhotoPreview])

  useEffect(() => {
    if (!loggedIn) return

    setLoadingProducts(true)
    productsService
      .list()
      .then((res) => {
        const data = res.data
        setProducts(normalizeProducts(data))
      })
      .catch(() => {})
      .finally(() => setLoadingProducts(false))
  }, [loggedIn])

  async function handleDeleteProduct() {
    if (!deleteTargetId) return
    setDeleteLoading(true)
    try {
      await productsService.remove(deleteTargetId)
      setProducts((prev) => prev.filter((p) => p.id !== deleteTargetId))
      setDeleteTargetId(null)
    } catch {
    } finally {
      setDeleteLoading(false)
    }
  }

  async function handleAddProduct() {
    if (!addName || !addDescription || !addPrice || !addPhoto) return
    setAddLoading(true)
    try {
      const uploadRes = await productsService.uploadFile(addPhoto)
      const file_id = uploadRes.data.file.id
      const res = await productsService.create({
        name: addName,
        description: addDescription,
        price: parseInt(addPrice, 10),
        file_id,
      })
      setProducts((prev) => [...prev, res.data.product])
      setShowAddModal(false)
      setAddName('')
      setAddDescription('')
      setAddPrice('')
      setAddPhoto(null)
      setAddPhotoPreview(null)
    } catch {
    } finally {
      setAddLoading(false)
    }
  }

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
              Descubra o sabor que derrete na boca: cupcakes feitos com amor, perfeitos para adoçar
              o seu dia!
            </p>
            <button className="btn-cta px-10 py-4 self-start">Conhecer agora</button>
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

      <section id="quem-somos" className="bg-[#fffbfc] py-[120px]">
        <div className="max-w-7xl mx-auto grid grid-cols-[300px_1fr] items-center gap-[130px] px-16">
          <div className="relative w-[300px] h-[328px] justify-self-center">
            <div
              className="absolute rounded-full bg-[var(--color-pink-400)] z-0"
              style={{ left: 87, top: 0, width: 213, height: 231 }}
            />
            <div
              className="absolute rounded-full bg-[var(--color-pink-400)] z-0"
              style={{ left: 0, top: 97, width: 213, height: 231 }}
            />
            <div
              className="absolute rounded-full overflow-hidden z-10"
              style={{ left: 0, top: 14, width: 300, height: 300 }}
            >
              <Image
                src="/making_cupcake_lp.png"
                alt="Fazendo cupcakes"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-6 mb-4">
              <span className="w-28 h-[9px] rounded-full bg-[var(--color-pink-400)]" />
              <p className="font-bahiana text-5xl tracking-wide whitespace-nowrap">
                <span className="text-[var(--color-brown-900)]">SOMOS UMA EQUIPE </span>
                <span className="text-[var(--color-pink-400)]">CENTRADA</span>
              </p>
              <span className="w-28 h-[9px] rounded-full bg-[var(--color-pink-400)]" />
            </div>

            <h2 className="font-bahiana text-5xl leading-tight text-[var(--color-brown-900)] tracking-[0.03em] mb-5 whitespace-nowrap">
              EM LEVAR O CUPCAKE DE MELHOR QUALIDADE ATÉ VOCÊ
            </h2>

            <hr className="border-none h-[2px] bg-[var(--color-pink-400)] mb-6" />

            <p className="font-roboto text-xl leading-relaxed text-[#7c706c]">
              A Cup&amp;Cake é uma confeitaria especializada em criar cupcakes deliciosos e feitos
              com carinho. Usamos ingredientes frescos e receitas únicas para oferecer sabores que
              encantam a cada mordida. Nosso objetivo é adoçar seus momentos especiais, seja com um
              mimo do dia a dia ou em grandes celebrações!&quot;
            </p>
          </div>
        </div>
      </section>

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
            {loggedIn && (
              <button
                onClick={() => setShowAddModal(true)}
                className="absolute right-0 top-1/2 -translate-y-1/2 border border-[var(--color-border-muted)] rounded-[10px] px-8 py-4 font-roboto text-base text-[var(--color-brown-900)] hover:bg-[var(--color-pink-300)] transition-colors"
              >
                +
              </button>
            )}
          </div>

          {!loggedIn ? (
            <p className="text-center font-roboto text-[#7c706c] py-16">
              <Link
                href="/login"
                className="text-[var(--color-pink-400)] underline hover:text-[var(--color-brown-900)] transition-colors"
              >
                Faça login
              </Link>{' '}
              para ver os produtos da loja.
            </p>
          ) : loadingProducts ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-4 border-[var(--color-pink-400)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <p className="text-center font-roboto text-[#7c706c] py-16">
              Nenhum produto cadastrado ainda.
            </p>
          ) : (
            <div className="relative">
              <button
                className="absolute -left-5 top-[120px] -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-pink-400)] flex items-center justify-center z-10 hover:bg-[var(--color-pink-300)] transition-colors"
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
                {products.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex flex-col">
                    <div className="relative w-[240px] h-[240px] rounded-[10px] bg-white overflow-hidden">
                      <Image
                        src={productImageUrl(product)}
                        alt={product.name}
                        fill
                        sizes="240px"
                        className="object-cover"
                      />
                      {loggedIn && (
                        <button
                          onClick={() => setDeleteTargetId(product.id)}
                          className="absolute top-2 right-2 border border-[#b09da0] rounded-[10px] px-4 py-1 font-roboto text-base text-[#653321] bg-white/90 hover:bg-[var(--color-pink-200)] transition-colors"
                        >
                          -
                        </button>
                      )}
                    </div>
                    <div className="bg-white rounded-[10px] mt-0 px-4 pt-2 pb-3">
                      <p className="font-roboto text-[15px] text-[#694b41] mb-2">{product.name}</p>
                      <div className="border border-[var(--color-border-muted)] rounded-[5px] px-4 py-1 flex items-center justify-center gap-0.5">
                        <span className="font-roboto text-[10px] text-[var(--color-brown-900)] self-center">
                          R$
                        </span>
                        <span className="font-roboto text-[20px] font-medium text-[var(--color-brown-900)]">
                          {formatPrice(product.price)}
                        </span>
                        <span className="font-roboto text-[10px] text-[var(--color-brown-900)] self-end mb-[3px]">
                          /un
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="absolute -right-5 top-[120px] -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-pink-400)] flex items-center justify-center z-10 hover:bg-[var(--color-pink-300)] transition-colors"
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
      </section>

      <section id="depoimentos" className="bg-[var(--color-pink-50)] py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-4 mb-1">
              <span className="w-28 h-[3px] rounded-full bg-[var(--color-pink-400)]" />
              <h2 className="font-bahiana text-5xl text-[var(--color-brown-900)] tracking-[0.03em] whitespace-nowrap">
                Depoimentos
              </h2>
              <span className="w-28 h-[3px] rounded-full bg-[var(--color-pink-400)]" />
            </div>
            <p className="font-roboto text-base text-[#694b41]">Feedback de alguns clientes.</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {testimonials.map((dep) => (
              <div
                key={dep.name}
                className="bg-[#f6f5f6] border border-[#d1d1d1] rounded-[10px] p-6 flex flex-col"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-[98px] h-[98px] rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={dep.image}
                      alt={dep.name}
                      width={98}
                      height={98}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-roboto text-base font-medium text-[var(--color-brown-900)]">
                      {dep.name}
                    </p>
                    <p className="font-roboto text-base text-[#a19895]">Cliente</p>
                  </div>
                </div>
                <div className="relative px-4">
                  <span className="font-roboto text-5xl text-[var(--color-pink-400)] absolute -top-4 -left-1">
                    &ldquo;
                  </span>
                  <p className="font-roboto text-base text-[#7c706c] leading-relaxed pt-6">
                    {dep.text}
                  </p>
                  <span className="font-roboto text-5xl text-[var(--color-pink-400)] absolute -bottom-6 right-0">
                    &rdquo;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="bg-[var(--color-pink-200)] py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-4 mb-1">
              <span className="w-28 h-[3px] rounded-full bg-[var(--color-pink-400)]" />
              <h2 className="font-bahiana text-5xl text-[var(--color-brown-900)] tracking-[0.03em] whitespace-nowrap">
                Contato
              </h2>
              <span className="w-28 h-[3px] rounded-full bg-[var(--color-pink-400)]" />
            </div>
            <p className="font-roboto text-base text-[#694b41]">Conecte-se conosco.</p>
          </div>

          <div className="flex gap-16 items-start">
            <div className="bg-white border border-[#d1d1d1] rounded-[10px] p-10 flex-1 max-w-[589px]">
              <h3 className="font-roboto text-2xl text-[#694b41] text-center mb-8">
                Receba nossas promoções
              </h3>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="font-roboto text-base text-[#7c706c] mb-1 block">Nome</label>
                  <input
                    type="text"
                    className="w-full h-[50px] bg-[#f3f3f3] border border-[#b9b9b9] rounded-[10px] px-4 font-roboto text-base text-brown-900 outline-none focus:border-[var(--color-pink-400)] transition-colors"
                  />
                </div>
                <div>
                  <label className="font-roboto text-base text-[#7c706c] mb-1 block">Email</label>
                  <input
                    type="email"
                    className="w-full h-[50px] bg-[#f3f3f3] border border-[#b9b9b9] rounded-[10px] px-4 font-roboto text-base text-brown-900 outline-none focus:border-[var(--color-pink-400)] transition-colors"
                  />
                </div>
                <div className="max-w-[230px]">
                  <label className="font-roboto text-base text-[#7c706c] mb-1 block">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    className="w-full h-[50px] bg-[#f3f3f3] border border-[#b9b9b9] rounded-[10px] px-4 font-roboto text-base text-brown-900 outline-none focus:border-[var(--color-pink-400)] transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button className="border border-[var(--color-border-muted)] rounded-[10px] px-8 py-4 font-roboto text-base text-[var(--color-brown-900)] hover:bg-[var(--color-pink-200)] transition-colors">
                  Enviar
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-16 pt-10">
              <div>
                <h4 className="font-roboto text-2xl text-[#694b41] mb-4">Redes sociais</h4>
                <div className="flex gap-4">
                  <Image src="/whatsapp.svg" alt="WhatsApp" width={40} height={40} />
                  <Image src="/email.svg" alt="Email" width={40} height={40} />
                  <Image src="/instagram.svg" alt="Instagram" width={40} height={40} />
                </div>
              </div>

              <div>
                <h4 className="font-roboto text-2xl text-[#694b41] mb-4">
                  Horário de funcionamento
                </h4>
                <p className="font-roboto text-base text-[#694b41] leading-relaxed">
                  8h ás 21h (exceto segunda)
                  <br />
                  Não abrimos feriados
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {deleteTargetId && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && setDeleteTargetId(null)}
        >
          <div className="w-[287px] bg-[#fff4f6] border border-[#653321] rounded-[10px] px-6 py-6 flex flex-col gap-4">
            <p className="font-roboto text-xl text-[#694b41] text-center">
              Deseja realmente apagar o produto
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="w-[94px] h-[34px] border border-[#b09da0] rounded-[10px] font-roboto text-base text-[#653321] hover:bg-[var(--color-pink-200)] transition-colors"
              >
                Não
              </button>
              <button
                onClick={handleDeleteProduct}
                disabled={deleteLoading}
                className="w-[92px] h-[34px] border border-[#b09da0] rounded-[10px] font-roboto text-base text-white bg-[#653321] hover:bg-[#874b35] transition-colors disabled:opacity-50"
              >
                {deleteLoading ? '...' : 'Sim'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}
        >
          <div className="w-[402px] bg-[#fff4f6] border border-[#b09da0] rounded-[30px] py-7 px-0 flex flex-col">
            <div className="flex items-center justify-center gap-3 px-8 mb-2">
              <span className="w-10 h-[9px] rounded-full bg-[var(--color-pink-400)]" />
              <h2 className="font-bahiana text-5xl text-[var(--color-brown-900)] whitespace-nowrap">
                Adicionar Produtos
              </h2>
              <span className="w-10 h-[9px] rounded-full bg-[var(--color-pink-400)]" />
            </div>

            <div className="px-[47px] mt-4">
              <p className="font-roboto text-base text-[#694b41] mb-1">Foto:</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null
                  setAddPhoto(file)
                  setAddPhotoPreview(file ? URL.createObjectURL(file) : null)
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-[235px] h-[203px] bg-white border border-[#653321] rounded-[10px] flex items-center justify-center overflow-hidden mx-auto block"
              >
                {addPhotoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={addPhotoPreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 44 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 4L12 10H4C2.9 10 2 10.9 2 12V32C2 33.1 2.9 34 4 34H40C41.1 34 42 33.1 42 32V12C42 10.9 41.1 10 40 10H32L28 4H16Z"
                      stroke="#694b41"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="22" cy="22" r="7" stroke="#694b41" strokeWidth="2" />
                  </svg>
                )}
              </button>
            </div>

            <div className="px-[47px] mt-4">
              <p className="font-roboto text-base text-[#694b41] mb-1">Nome:</p>
              <input
                type="text"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                className="w-full h-[34px] bg-white border border-[#653321] rounded-[10px] px-3 font-roboto text-base text-[#653321] outline-none focus:border-[var(--color-pink-400)] transition-colors"
              />
            </div>

            <div className="px-[47px] mt-4">
              <p className="font-roboto text-base text-[#694b41] mb-1">Descrição:</p>
              <input
                type="text"
                value={addDescription}
                onChange={(e) => setAddDescription(e.target.value)}
                className="w-full h-[34px] bg-white border border-[#653321] rounded-[10px] px-3 font-roboto text-base text-[#653321] outline-none focus:border-[var(--color-pink-400)] transition-colors"
              />
            </div>

            <div className="px-[47px] mt-4 flex items-end justify-between">
              <div>
                <p className="font-roboto text-base text-[#694b41] mb-1">Valor:</p>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={addPrice}
                  onChange={(e) => setAddPrice(e.target.value)}
                  className="w-[107px] h-[34px] bg-white border border-[#653321] rounded-[10px] px-3 font-roboto text-base text-[#653321] outline-none focus:border-[var(--color-pink-400)] transition-colors"
                />
              </div>
              <button
                onClick={handleAddProduct}
                disabled={addLoading || !addName || !addDescription || !addPrice || !addPhoto}
                className="w-[74px] h-[34px] border border-[#b09da0] rounded-[10px] font-roboto text-base text-[var(--color-brown-900)] hover:bg-[var(--color-pink-300)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {addLoading ? '...' : '+'}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#090909] py-10 flex items-center justify-center">
        <span className="text-[46px] text-[var(--color-pink-400)] font-sevillana">
          Cup&amp;Cake
        </span>
      </footer>
    </div>
  )
}
