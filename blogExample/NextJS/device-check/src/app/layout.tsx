import { DeviceType } from '@/context/DeviceType'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <header></header>
        <DeviceType>
          {children}
        </DeviceType>
        <footer></footer>
      </body>
    </html>
  )
}
