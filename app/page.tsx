'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects/index'
import About from '@/components/About'
import Footer from '@/components/Footer'
import Background from '@/components/Background'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import SectionHeader from '@/components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const projectsStartTop = 'calc(50vh + min(50vh, calc(165vh * 9 / 32)))'
  const wrapperRef = useRef<HTMLDivElement>(null)
  
  return (
    <div className="h-[300vh]">
      <div ref={wrapperRef} className="relative min-h-screen">
      <Background />
        <div 
        className="relative h-screen"
        >
          <Hero />
        </div>
        <div
          className="relative"
          style={{
            marginTop: `calc(${projectsStartTop} - 100vh)`
          }}
        >
          <Projects />
        </div>
        <SectionHeader/>
        <About />
        <SectionHeader/>
    </div>
    </div>
  )
}
