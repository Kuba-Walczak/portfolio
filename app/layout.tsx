import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Zen_Maru_Gothic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppProvider } from '@/contexts/AppContext'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'
import Background from '@/components/Background'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
export const zenMaruGothic = Zen_Maru_Gothic({ subsets: ["latin"], weight: ["700"], variable: "--font-zen-maru-gothic" });

export const metadata: Metadata = {
  title: 'Portfolio - Full Stack Developer',
  description: 'Welcome to my portfolio. I create beautiful and functional digital experiences that help businesses grow and users succeed.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased ${zenMaruGothic.variable}`}>
        <AppProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <Analytics />
        </AppProvider>
      </body>
    </html>
  )
}
