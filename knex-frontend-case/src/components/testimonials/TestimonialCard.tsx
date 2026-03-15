import Image from 'next/image'

interface TestimonialCardProps {
  name: string
  text: string
  image: string
}

export function TestimonialCard({ name, text, image }: TestimonialCardProps) {
  return (
    <div className="bg-[#f6f5f6] border border-[#d1d1d1] rounded-[10px] p-6 flex flex-col">
      <div className="flex items-center gap-5 mb-8">
        <div className="w-[98px] h-[98px] rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={image}
            alt={name}
            width={98}
            height={98}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <p className="font-roboto text-base font-medium text-[var(--color-brown-900)]">{name}</p>
          <p className="font-roboto text-base text-[#a19895]">Cliente</p>
        </div>
      </div>
      <div className="relative px-4">
        <span className="font-roboto text-5xl text-[var(--color-pink-400)] absolute -top-4 -left-1">
          &ldquo;
        </span>
        <p className="font-roboto text-base text-[#7c706c] leading-relaxed pt-6">{text}</p>
        <span className="font-roboto text-5xl text-[var(--color-pink-400)] absolute -bottom-6 right-0">
          &rdquo;
        </span>
      </div>
    </div>
  )
}
