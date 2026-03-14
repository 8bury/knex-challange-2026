import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-pink-300">
      <main className="flex-1 flex items-center justify-center px-016 gap-080">
        <div className="hidden md:flex flex-1 justify-center">
          <Image src="/cupandcake_logo.png" alt="Cup&Cake" width={420} height={300} priority />
        </div>
        <div className="flex-1 flex justify-center">{children}</div>
      </main>

      <footer className="bg-c12 py-016 flex justify-center">
        <Image
          src="/cupandcake_logo_text.png"
          alt="Cup&Cake"
          width={150}
          height={38}
          className="logo-pink-filter"
        />
      </footer>
    </div>
  )
}
