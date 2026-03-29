'use client'

import { gsap } from 'gsap'
import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa'
import { FileUser, User } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useScroll } from '@/hooks/useScroll'
import { useApp } from '@/contexts/AppContext'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import Contacts from './Contacts'

export default function Header() {
  const scrollY = useScroll()
  const { projectView } = useApp()
  const hidden = scrollY > 0

  if (projectView) return null

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {  
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      console.log('elementPosition', elementPosition)
      console.log('window.pageYOffset', window.pageYOffset)
      const targetPosition = elementPosition
      const scrollProxy = { y: window.pageYOffset }
      gsap.to(scrollProxy, {
        y: targetPosition,
        duration: 3,
        overwrite: "auto",
        onUpdate: () => {
          window.scrollTo(0, scrollProxy.y)
        },
      })
    }
  }

  const handleScrollToTop = () => {
    const targetPosition = 0
    const scrollProxy = { y: window.pageYOffset }
    gsap.to(scrollProxy, {
      y: targetPosition,
      duration: 3,
      overwrite: "auto",
      onUpdate: () => {
        window.scrollTo(0, scrollProxy.y)
      },
    })
  }

  const handleScrollToEnd = () => {
    const targetPosition = document.documentElement.scrollHeight - window.innerHeight
    const scrollProxy = { y: window.pageYOffset }
    gsap.to(scrollProxy, {
      y: targetPosition,
      duration: 3,
      overwrite: 'auto',
      onUpdate: () => {
        window.scrollTo(0, scrollProxy.y)
      },
    })
  }

  const NAV_ITEMS = [
    { label: 'Home', sectionId: 'home', scrollTo: handleScrollToTop },
    { label: 'Projects', sectionId: 'projects', scrollTo: handleScrollToSection },
    { label: 'About', sectionId: 'about', scrollTo: handleScrollToEnd },
    { label: 'Contact', sectionId: 'contact', scrollTo: handleScrollToSection },
  ] as const

  return (
    <header
      className="pointer-events-none fixed left-0 top-3 z-50 flex w-full justify-center vsm:top-4 vmd:top-5 vlg:top-6"
    >
      <Card className="pointer-events-auto divide-ui-x-glass flex w-fit flex-row items-center bg-glass px-2.5 py-2 text-muted-foreground vsm:px-3 vsm:py-2 vmd:px-3.5 vmd:py-2.5 vlg:px-4 vlg:py-3">
      <nav
          aria-label="Primary"
          className="flex flex-row items-stretch divide-ui-x-glass"
        >
          {NAV_ITEMS.map(({ label, sectionId, scrollTo }) => (
            <button
              key={sectionId}
              type="button"
              className="flex items-center cursor-pointer rounded-sm px-3 py-1 type-h2 transition-colors duration-200 first:pl-2.5 last:pr-2.5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              onClick={() => scrollTo(sectionId)}
            >
              {label}
            </button>
          ))}
        </nav>
      </Card>
    </header>
  )
}
