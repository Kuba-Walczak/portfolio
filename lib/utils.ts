import { Project } from "@/types/project"
import { parseProjects } from "@/lib/project-schema"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchProjects(url: string): Promise<Project[]> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`)
  const data = await res.json()
  const projects = parseProjects(data)

  projects.forEach((project) => {
    project.subpage.gallery.forEach((content) => {
      content.media.forEach((media) => {
        const img = new Image()
        img.src = media.src
        img.onload = () => {
          media.width = img.naturalWidth
          media.height = img.naturalHeight
        }
      })
    })
  })

  return projects
}
