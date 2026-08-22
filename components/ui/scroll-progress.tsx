'use client'

import { motion, useScroll, useSpring } from 'motion/react'

// ponytail: page-level scroll bar. Fixed top, full width, fills left→right
// as user scrolls the document. Smoothing via useSpring to avoid jitter
// from trackpad/wheel micro-events. Pinned over everything (z-[60], above
// the SiteHeader). Color uses foreground token so it adapts to theme.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-foreground"
      style={{ scaleX }}
    />
  )
}
