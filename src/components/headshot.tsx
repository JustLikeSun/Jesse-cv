import { useState } from 'react'

import { cn } from '@/lib/utils'

const HEADSHOT_SOURCES = [
  '/jesse-profile.jpg',
  '/jesse-profile.png',
  '/jesse.jpg',
  '/jesse.jpeg',
  '/jesse.png',
  '/jesse.webp',
] as const

type HeadshotProps = {
  className?: string
  name: string
}

export function Headshot({ className, name }: HeadshotProps) {
  const [sourceIndex, setSourceIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  if (failed || sourceIndex >= HEADSHOT_SOURCES.length) {
    return (
      <div
        className={cn(
          'flex size-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary/25 via-primary/10 to-transparent text-2xl font-semibold tracking-tight text-primary',
          className
        )}
        aria-hidden
      >
        JT
      </div>
    )
  }

  return (
    <img
      src={HEADSHOT_SOURCES[sourceIndex]}
      alt={name}
      width={260}
      height={260}
      decoding="async"
      fetchPriority="high"
      className={cn(
        'size-full rounded-2xl object-cover shadow-lg ring-1 ring-black/5 dark:ring-white/10',
        className
      )}
      onError={() => {
        if (sourceIndex < HEADSHOT_SOURCES.length - 1) {
          setSourceIndex((i) => i + 1)
        } else {
          setFailed(true)
        }
      }}
    />
  )
}
