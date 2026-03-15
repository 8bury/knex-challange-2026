'use client'

import Image from 'next/image'
import { useState } from 'react'

export function ContactSection() {
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')

  function handleSubmit() {
    console.log('Contato:', { name: contactName, email: contactEmail, phone: contactPhone })
    setContactName('')
    setContactEmail('')
    setContactPhone('')
  }

  return (
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
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full h-[50px] bg-[#f3f3f3] border border-[#b9b9b9] rounded-[10px] px-4 font-roboto text-base text-brown-900 outline-none focus:border-[var(--color-pink-400)] transition-colors"
                />
              </div>
              <div>
                <label className="font-roboto text-base text-[#7c706c] mb-1 block">Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full h-[50px] bg-[#f3f3f3] border border-[#b9b9b9] rounded-[10px] px-4 font-roboto text-base text-brown-900 outline-none focus:border-[var(--color-pink-400)] transition-colors"
                />
              </div>
              <div className="max-w-[230px]">
                <label className="font-roboto text-base text-[#7c706c] mb-1 block">Telefone</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full h-[50px] bg-[#f3f3f3] border border-[#b9b9b9] rounded-[10px] px-4 font-roboto text-base text-brown-900 outline-none focus:border-[var(--color-pink-400)] transition-colors"
                />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={handleSubmit}
                className="border border-[var(--color-border-muted)] rounded-[10px] px-8 py-4 font-roboto text-base text-[var(--color-brown-900)] hover:bg-[var(--color-pink-200)] transition-colors"
              >
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
              <h4 className="font-roboto text-2xl text-[#694b41] mb-4">Horário de funcionamento</h4>
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
  )
}
