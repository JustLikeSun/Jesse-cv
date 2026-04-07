import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  id: string
  icon: LucideIcon
  children: ReactNode
  className?: string
  tone?: 'default' | 'accent'
  headingClassName?: string
}

export function SectionHeading({
  id,
  icon: Icon,
  children,
  className,
  tone = 'default',
  headingClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-5 sm:mb-8', className)}>
      <div className="flex items-center gap-3 sm:gap-4">
        <span
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-xl border sm:size-10',
            tone === 'accent'
              ? 'border-primary/25 bg-primary/8 text-primary'
              : 'border-border/60 bg-muted/50 text-primary/80'
          )}
          aria-hidden
        >
          <Icon className="size-4 sm:size-[18px]" strokeWidth={1.8} />
        </span>
        <h2
          id={id}
          className={cn(
            'font-display scroll-mt-20 text-lg font-semibold tracking-tight text-foreground sm:text-xl md:text-2xl',
            headingClassName
          )}
        >
          {children}
        </h2>
      </div>
    </div>
  )
}
