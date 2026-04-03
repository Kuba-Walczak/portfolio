import { Card } from "@/components/ui/card"
import { Project } from "@/types/project"
import {
  Brain,
  Car,
  Layers,
  LucideIcon,
  Network,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from "lucide-react"

const ICON_BY_NAME: Record<string, LucideIcon> = {
  brain: Brain,
  car: Car,
  layers: Layers,
  network: Network,
  shield: Shield,
  sliders: SlidersHorizontal,
  sparkles: Sparkles,
  zap: Zap,
}

function FeatureIcon({ Icon }: { Icon: React.ElementType<{ className?: string; style?: React.CSSProperties }>
}) {
  return (
    <div
      className="h-10 w-10 rounded-lg flex items-center justify-center mb-4"
    >
      <Icon className="h-8 w-8 text-[var(--secondary)]" />
    </div>
  )
}

export function CoreArchitecture({ project }: { project: Project }) {
  const isDense = project.subpage.feature.length > 6

  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      {/* Section header */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">
          Core Architecture
        </h2>
        <div className="mt-2 h-0.5 w-12" style={{ background: "var(--brand-purple)" }} />
      </div>

      {/* Responsive feature grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {project.subpage.feature.map((feature) => (
          <Card
            key={feature.title}
            className={isDense ? "p-4" : "p-6"}
          >
            <FeatureIcon Icon={ICON_BY_NAME[feature.icon.toLowerCase()] ?? Sparkles} />
            <h3
              className={
                isDense
                  ? "text-sm font-bold mb-2 text-[var(--text-primary)]"
                  : "text-base font-bold mb-2 text-[var(--text-primary)]"
              }
            >
              {feature.title}
            </h3>
            <p
              className={
                isDense
                  ? "text-xs leading-relaxed text-[var(--text-secondary)]"
                  : "text-sm leading-relaxed text-[var(--text-secondary)]"
              }
            >
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
