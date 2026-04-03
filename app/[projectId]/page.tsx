'use client'

import { HeroSection } from "@/components/subpage/hero-section"
import { CoreArchitecture } from "@/components/subpage/core-architecture"
import { EcosystemMedia } from "@/components/subpage/ecosystem-media"
import { useApp } from "@/contexts/AppContext"

export default function ProjectSubpage({
  params,
}: {
  params: { projectId: string }
}) {
  const { projects, selectedProject } = useApp()

  const projectId = params.projectId
  const projectFromList = projects?.find((p) => p.id === projectId)
  const project = projectFromList ?? selectedProject

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-[var(--text-secondary)]">
          Project not found.
        </p>
      </main>
    )
  }

  return (
    <>
      <HeroSection project={project} />
      <CoreArchitecture project={project} />
      <EcosystemMedia project={project} />
    </>
  )
}
