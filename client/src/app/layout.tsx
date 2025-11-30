import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import { ReactQueryProvider } from './providers/react-query-provider'
import { CartProvider } from '@/context/cart-context'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'FreshMart',
  description: 'Groceries E-commerce Web Application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased w-full min-h-screen flex flex-col justify-center items-start`}
      >
        <CartProvider>
          <Navbar />
          <main className="w-full h-full flex flex-grow flex-col justify-start items-center">
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </main>
        </CartProvider>
      </body>
    </html>
  )
}
