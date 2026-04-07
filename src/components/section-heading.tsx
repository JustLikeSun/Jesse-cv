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
    <div className={cn('mb-8', className)}>
      <div className="flex items-center gap-4">
        <span
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-xl border',
            tone === 'accent'
              ? 'border-primary/25 bg-primary/8 text-primary'
              : 'border-border/60 bg-muted/50 text-primary/80'
          )}
          aria-hidden
        >
          <Icon className="size-[18px]" strokeWidth={1.8} />
        </span>
        <h2
          id={id}
          className={cn(
            'font-display scroll-mt-24 text-xl font-semibold tracking-tight text-foreground md:text-2xl',
            headingClassName
          )}
        >
          {children}
        </h2>
      </div>
    </div>
  )
}
