'use client'

import { SubpageCanvas } from '@/components/Hero/Laptop/R3F/SubpageCanvas'
import { Project } from '@/types/project'
import { Play } from 'lucide-react'

export function HeroSection({ project }: { project: Project }) {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center md:text-left px-6 pt-40 pb-32 overflow-hidden max-w-5xl mx-auto"
      style={{ background: "radial-gradient(ellipse 80% 60% at 50% 60%, #1a0a3e 0%, var(--background) 70%)" }}
    >
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
        <div className="flex-1 max-w-xl">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight text-balance relative mb-6">
            <span className="text-[var(--text-primary)]">{project.title}</span>
          </h1>
          <p
            className="max-w-md text-base leading-relaxed text-[var(--text-secondary)] relative"
          >
            {project.subpage.description}
          </p>
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors"
          >
            Preview
            <Play className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 w-full flex justify-center md:justify-end">
          <div className="w-[320px] h-[260px] sm:w-[420px] sm:h-[320px] md:w-[440px] md:h-[360px]">
            <SubpageCanvas>
              <mesh rotation={[0.25, 0.6, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial/>
              </mesh>
            </SubpageCanvas>
          </div>
        </div>
      </div>
    </section>
  )
}
