import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

type AnimatedSectionProps = {
  id?: string
  className?: string
  children: ReactNode
}

export function AnimatedSection({ id, className, children }: AnimatedSectionProps) {
  const reduce = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={cn('scroll-mt-24', className)}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
      }
    >
      {children}
    </motion.section>
  )
}
