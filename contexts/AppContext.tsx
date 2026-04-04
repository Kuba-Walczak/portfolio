'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Project } from '@/types/project'
import { fetchProjects } from '@/lib/utils'

interface AppContextType {
  projects: Project[] | null
  setProjects: (projects: Project[] | null) => void
  animationReady: boolean
  setAnimationReady: (animationReady: boolean) => void
  heroVideoGlowRef: HTMLDivElement | null
  setHeroVideoGlowRef: (heroVideoGlowRef: HTMLDivElement | null) => void
  openContacts: boolean
  setOpenContacts: (openContacts: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [animationReady, setAnimationReady] = useState(false)
  const [heroVideoGlowRef, setHeroVideoGlowRef] = useState<HTMLDivElement | null>(null)
  const [openContacts, setOpenContacts] = useState(false)
  useEffect(() => {
    const fetchAndUpdate = async () => {
      try {
        const next = await fetchProjects('/projects.json')
        setProjects(next)
      } catch (e) {
        console.error(e)
      }
    }
    void fetchAndUpdate()
    const interval = setInterval(() => void fetchAndUpdate(), 1000)
    return () => clearInterval(interval)
  }, [])

  const value: AppContextType = {
    projects,
    setProjects,
    animationReady,
    setAnimationReady,
    heroVideoGlowRef,
    setHeroVideoGlowRef,
    openContacts,
    setOpenContacts,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
