import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface DetailsProps {
  description: string
  feature: string[]
  techStack: string[]
}

export function Details({
  description,
  feature,
  techStack,
}: DetailsProps) {
  return (
    <div className="flex w-full h-full flex-col justify-center">
      <Card className="p-1 vsm:p-2 vmd:p-3 vlg:p-4 mb-1 vsm:mb-2 vmd:mb-3 vlg:mb-4 [font-family:var(--font-manrope)]">
        <div className="flex items-center gap-1 vsm:gap-2 vmd:gap-3 vlg:gap-4">
          <div className="flex-1">
            <h3 className="text-[10px] vmd:text-xs vlg:text-base font-medium text-muted-foreground mb-1 vsm:mb-2 vlg:mb-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-1 vlg:gap-2">
              {techStack.map((tech: string) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-1 py-0.5 vsm:px-2 vsm:py-1 vlg:px-3 text-[10px] vsm:text-xs vmd:text-base vlg:text-xl font-medium border-transparent !bg-glass"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-1 vsm:gap-2 vmd:gap-3 vlg:gap-4">
      <Card className="p-1 vsm:p-2 vmd:p-3 vlg:p-4 [font-family:var(--font-manrope)]">
        <div className="flex items-center gap-1 vsm:gap-2 vlg:gap-4">
            <div className="flex-1">
            <h3 className="text-[10px] vmd:text-xs vlg:text-base font-medium text-muted-foreground mb-1 vsm:mb-2 vlg:mb-3">
              Description
            </h3>
            <p className="text-[10px] vmd:text-xs vlg:text-base leading-relaxed text-justify text-foreground/90">
              {description}
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-1 vsm:p-2 vmd:p-3 vlg:p-4 [font-family:var(--font-manrope)]">
        <div className="flex items-center gap-1 vsm:gap-2 vlg:gap-4">
            <div className="flex-1">
            <h3 className="text-[10px] vmd:text-xs vlg:text-base font-medium text-muted-foreground mb-1 vsm:mb-2 vlg:mb-3">
              Features
            </h3>
            {feature.length > 0 ? (
              <ul className="text-[10px] vmd:text-xs vlg:text-base leading-relaxed text-foreground/90 list-disc list-inside space-y-0.5 vsm:space-y-1">
                {feature.map((item, i) => (
                  <li key={`${i}-${item}`}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-[10px] vmd:text-xs vlg:text-base text-muted-foreground">—</p>
            )}
          </div>
        </div>
      </Card>
      </div>
    </div>
  )
}
