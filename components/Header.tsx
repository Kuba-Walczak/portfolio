'use client'

import { gsap } from 'gsap'
import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa'
import { FileUser, User } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useScroll } from '@/hooks/useScroll'
import { useApp } from '@/contexts/AppContext'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export default function Header() {
  const scrollY = useScroll()
  const { projectView } = useApp()
  const hidden = scrollY > 0

  if (projectView) return null

  const handleScroll = (id: string) => {
    const targetPosition = document.documentElement.scrollHeight - window.innerHeight
    const scrollProxy = { y: window.pageYOffset }
    gsap.to(scrollProxy, {
      y: targetPosition,
      duration: 5,
      overwrite: 'auto',
      onUpdate: () => {
        window.scrollTo(0, scrollProxy.y)
      },
    })
  }

  return (
    <header
      className="fixed top-4 left-1/2 z-50 transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(-50%) translateY(${hidden ? 'calc(-100% - 2rem)' : '0'})` }}
    >
      <Card className="flex flex-row items-center p-3 sm:p-5 lg:p-7 w-fit text-muted-foreground divide-x backdrop-blur-sm bg-white/3">
        <div className="flex flex-row gap-3 sm:gap-5 lg:gap-6 pr-3 sm:pr-5 lg:pr-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <FaGithub
                className="w-6 h-6 sm:w-10 sm:h-10 lg:w-16 lg:h-16 hover:text-white transition-colors duration-300 cursor-pointer"
                onClick={() => window.open('https://github.com/kuba-walczak', '_blank')}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={48}>GitHub</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <FaLinkedin
                className="w-6 h-6 sm:w-10 sm:h-10 lg:w-16 lg:h-16 hover:text-white transition-colors duration-300 cursor-pointer"
                onClick={() => window.open('https://linkedin.com/in/jakubwalczak', '_blank')}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={48}>LinkedIn</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <FaDiscord
                className="w-6 h-6 sm:w-10 sm:h-10 lg:w-16 lg:h-16 hover:text-white transition-colors duration-300 cursor-pointer"
                onClick={() => window.open('https://discord.com/users/1234567890', '_blank')}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={48}>Discord</TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-row items-center gap-3 sm:gap-5 lg:gap-6 pl-3 sm:pl-5 lg:pl-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row items-center hover:text-white hover:cursor-pointer transition-colors duration-300">
                <FileUser className="w-6 h-6 sm:w-10 sm:h-10 lg:w-16 lg:h-16" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={48}>Resume</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex flex-row items-center hover:text-white hover:cursor-pointer transition-colors duration-300"
                onClick={() => handleScroll('about')}
              >
                <User className="w-6 h-6 sm:w-10 sm:h-10 lg:w-16 lg:h-16" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={48}>About</TooltipContent>
          </Tooltip>
        </div>
      </Card>
    </header>
  )
}
