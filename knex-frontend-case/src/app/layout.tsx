import type { Metadata } from 'next'
import { Geist, Geist_Mono, Roboto, Sevillana } from 'next/font/google'
import localFont from 'next/font/local'
import { AuthProvider } from '@/providers/AuthProvider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

const sevillana = Sevillana({
  variable: '--font-sevillana',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const bahiana = localFont({
  src: './fonts/Bahiana-Regular.ttf',
  variable: '--font-bahiana',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cup&Cake',
  description: 'O cupcake de melhor qualidade até você',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${bahiana.variable} ${sevillana.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
