'use client'

import { CustomCanvas } from '@/components/Hero/Laptop/R3F/CustomCanvas'
import { Model } from '@/components/Hero/Laptop/R3F/Model'
import { useScroll } from '@/hooks/useScroll'
import { useApp } from '@/contexts/AppContext'
import { Screen } from '@/components/Hero/Laptop/Screen'
import { ArrowRight } from 'lucide-react'
import { Card } from '../ui/card'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { projectView, laptopReady } = useApp()
  const scrollY = useScroll()
  const contentRef = useRef<HTMLDivElement>(null)

  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (!contentRef.current) return

    if (scrollY >= 0.1 && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true
      gsap.to(contentRef.current, {
        x: '+=100%',
        duration: 1
      })
    } else if (scrollY < 0.1 && hasAnimatedRef.current) {
      hasAnimatedRef.current = false
      gsap.to(contentRef.current, {
        x: '0%',
        duration: 1
      })
    }
  }, [scrollY])

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {  
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const targetPosition = elementPosition + 200
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

  return (
    <div className="flex flex-col items-center justify-center">
      <section
        id="home"
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex flex-col justify-center gap-4 sm:gap-6 lg:gap-8 scroll-mt-20 z-10"
        style={{
          height: 'min(100vh, calc(165vh * 9 / 16))'
        }}
      >
      <div
      className={`flex flex-col mx-auto w-fit transition-opacity duration-500 ${projectView || scrollY > 0.2 ? 'hidden' : ''}`}
      style={{
        width: 'calc(100vh * 1.2)',
        clipPath: scrollY > 0.2 ? 'inset(-40px 75% -40px -40px)' : scrollY > 0.1 ? 'inset(-40px 50% -40px -40px)' : 'inset(-40px 25% -40px -40px)',
    
      }}>
      <div 
        ref={contentRef}
        className={`w-fit transition-transform duration-100 ease-out relative`}
      >
        <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[5rem] 2xl:text-[6rem] 3xl:text-[7rem] font-bold text-foreground text-balance leading-[0.8] xl:-ml-1 2xl:-ml-1 3xl:-ml-2 mb-2 sm:mb-3 lg:mb-4 xl:mb-5 2xl:mb-5 3xl:mb-6">
          KUBA WALCZAK
        </h1>
        <div className="flex flex-col justify-center gap-3 sm:gap-4 lg:gap-5 xl:gap-5 2xl:gap-6 3xl:gap-8">
          <div className="flex flex-col gap-1">
            <h3 className="font-mono text-xs sm:text-xs lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-base tracking-[0.2em] uppercase text-muted-foreground/60">Role</h3>
            <h2 className="text-base sm:text-lg lg:text-2xl xl:text-xl 2xl:text-2xl 3xl:text-3xl font-medium text-foreground tracking-tight">Programmer<span className="mx-2 sm:mx-3 text-muted-foreground/40">•</span>Technical Artist</h2>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-mono text-xs sm:text-xs lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-base tracking-[0.2em] uppercase text-muted-foreground/60">Focus</h3>
            <h2 className="text-base sm:text-lg lg:text-2xl xl:text-xl 2xl:text-2xl 3xl:text-3xl font-medium text-foreground tracking-tight">Real-time Graphics<span className="mx-2 sm:mx-3 text-muted-foreground/40">•</span>Creative Tools</h2>
          </div>
          <h3 className="font-mono text-xs sm:text-xs lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-base tracking-[0.2em] uppercase text-muted-foreground/60">Based in Warsaw<span className="mx-2 sm:mx-3 text-muted-foreground/40">•</span>Poland</h3>
          <Card
            className="w-fit flex flex-row items-center gap-2 sm:gap-2 lg:gap-3 xl:gap-3 2xl:gap-4 3xl:gap-4 p-2 sm:p-3 lg:p-4 xl:p-5 2xl:p-6 3xl:p-8 hover:bg-white/5 hover:cursor-pointer text-muted-foreground hover:text-white transition-colors duration-300"
            onClick={() => handleScroll('projects')}
          >
            <p className="text-sm sm:text-lg lg:text-2xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl font-medium">View Selected Work</p>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8"/>
          </Card>
        </div>
      </div>
      </div>
      <div className="absolute inset-0 w-full h-full pointer-events-none">
      <CustomCanvas>
        <Model/>
      </CustomCanvas>
      </div>
      {laptopReady && (
        <div 
          className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          style={{ 
            width: 'calc(100vh * 1.018)', 
            height: 'calc(100vh * 0.76)' //previously 0.696
          }}
        >
          <Screen />
        </div>
      )}
    </section>
    </div>
  )
}
