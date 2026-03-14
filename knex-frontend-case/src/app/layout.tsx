import type { Metadata } from 'next'
import { Geist, Geist_Mono, Roboto } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
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
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${bahiana.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
