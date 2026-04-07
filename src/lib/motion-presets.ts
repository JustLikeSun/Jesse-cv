/** Framer Motion presets — springy, calm, Apple-adjacent. */

export const spring = {
  gentle: { type: 'spring' as const, stiffness: 220, damping: 32, mass: 0.9 },
  snappy: { type: 'spring' as const, stiffness: 380, damping: 34, mass: 0.85 },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.gentle,
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.gentle,
  },
}

export const cardReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.snappy,
  },
}
