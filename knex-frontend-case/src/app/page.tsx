import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { ProductsSection } from '@/components/home/ProductsSection'
import { ContactSection } from '@/components/home/ContactSection'
import { TestimonialCard } from '@/components/testimonials/TestimonialCard'

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
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

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
                sizes="300px"
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

      <ProductsSection />

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
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} name={t.name} text={t.text} image={t.image} />
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

      <footer className="bg-[#090909] py-10 flex items-center justify-center">
        <span className="text-[46px] text-[var(--color-pink-400)] font-sevillana">
          Cup&amp;Cake
        </span>
      </footer>
    </div>
  )
}
