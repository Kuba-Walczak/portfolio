import { Card } from "@/components/ui/card"
import { Project } from "@/types/project"

export function EcosystemMedia({ project }: { project: Project }) {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      {/* Section header */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">
          Ecosystem Media
        </h2>
        <div className="mt-2 h-0.5 w-12 bg-[var(--primary)]" />
      </div>

      {/* Media grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Large left card – wave visualization */}
        <Card
          className="relative rounded-xl overflow-hidden row-span-2 p-0"
        >
          {/* Effects removed; card renders as a simple background surface */}
        </Card>

        {/* Top right card – Architecture Overview */}
        <Card
          className="relative rounded-xl overflow-hidden p-0"
        >
          {/* Effects removed; keep only the container */}
        </Card>

        {/* Bottom right - 2 small cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Gray placeholder card */}
          <Card
            className="rounded-xl overflow-hidden flex items-center justify-center p-0"
          >
            {/* Placeholder removed; container surface only */}
          </Card>

          {/* Data stream card */}
          <Card
            className="relative rounded-xl overflow-hidden p-0"
          >
            {/* Effects removed; container surface only */}
          </Card>
        </div>
      </div>
    </section>
  )
}
