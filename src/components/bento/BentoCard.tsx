import { cn } from "@/lib/utils"

export type BentoCardVariant = "text" | "image" | "feature"
export type BentoCardSize = "small" | "medium" | "large"

export type BentoCardProps = {
  title: string
  description: string
  variant: BentoCardVariant
  size?: BentoCardSize
  image?: string
  onClick?: () => void
  className?: string
}

const sizeClasses: Record<BentoCardSize, string> = {
  small: "p-6",
  medium: "p-8",
  large: "p-10",
}

export function BentoCard({
  title,
  description,
  variant,
  size = "medium",
  image,
  onClick,
  className,
}: BentoCardProps): JSX.Element {
  const isClickable = !!onClick

  const baseClasses = cn(
    "bento-card",
    "relative overflow-hidden rounded-lg",
    "bg-card transition-all duration-300",
    sizeClasses[size],
    variant === "feature" && "md:col-span-2",
    isClickable && "cursor-pointer hover:scale-[1.02]",
    className
  )

  if (variant === "image" && image) {
    return (
      <div
        className={baseClasses}
        onClick={onClick}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-end">
          <h3 className="mb-2 text-xl font-medium text-white md:text-2xl">
            {title}
          </h3>
          <p className="text-sm text-white/90 md:text-base">{description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      <h3 className="mb-3 text-xl font-medium text-foreground md:text-2xl">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
        {description}
      </p>
    </div>
  )
}
