import Link from "next/link"
import { cn } from "@/lib/utils"

export type CaseStudyMetric = {
  label: string
  value: string
}

export type CaseStudyCardProps = {
  title: string
  description: string
  image: string
  metrics: CaseStudyMetric[]
  link: string
  className?: string
}

export function CaseStudyCard({
  title,
  description,
  image,
  metrics,
  link,
  className,
}: CaseStudyCardProps): JSX.Element {
  return (
    <Link
      href={link}
      className={cn(
        "group relative block overflow-hidden rounded-lg",
        "transition-transform duration-300 hover:scale-[1.02]",
        "h-[400px] md:h-[450px]",
        className
      )}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/95 via-neutral-900/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
        <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
          {title}
        </h3>
        <p className="mb-6 text-sm text-white/90 md:text-base">{description}</p>

        {/* Metrics */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4 sm:grid-cols-4">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-xl font-bold text-white md:text-2xl">
                  {metric.value}
                </div>
                <div className="text-xs text-white/80 md:text-sm">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
