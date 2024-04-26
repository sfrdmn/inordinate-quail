import type { Metadata } from 'next'

import './globals.css'
import Header from '@/app/components/Header'

export const metadata: Metadata = {
  title: 'Patient Manager',
  description: 'Manage your patients',
}

type FooterProps = {
  className?: string
}

function Footer({ className }: FooterProps) {
  return (
    <div className={`${className} p-4 bg-blue-100 text-right text-zinc-500 text-sm rounded`}>
      © 2024 Sean Fridman
    </div>
  )
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body className="h-full bg-zinc-50 font-sans p-4 text-lg">
        <div className="container min-h-full mx-auto flex flex-col px-4">
          <Header className="basis-auto" />
          <main className="grow bg-blue-50 border border-blue-100 rounded p-4 mt-4">
            {children}
          </main>
          <Footer className="basis-auto mt-4" />
        </div>
      </body>
    </html>
  )
}
