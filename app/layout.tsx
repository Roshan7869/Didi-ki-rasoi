import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Didi ki Rasoi - CSVTU Campus Mess',
  description: 'Order delicious homestyle food from your classroom. Fresh, tasty, and delivered fast to CSVTU students.',
  keywords: 'food delivery, campus mess, CSVTU, homestyle food, student meals, online ordering',
  authors: [{ name: 'Didi ki Rasoi' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Didi ki Rasoi - CSVTU Campus Mess',
    description: 'Order delicious homestyle food from your classroom. Fresh, tasty, and delivered fast.',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#f97316" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
