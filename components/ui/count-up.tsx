'use client'

// Ported from react-bits.dev TextAnimations/CountUp (TS-TW).
// Ponytail: dropped the `from`, `direction`, `separator`, `onStart`,
// `onEnd` props — only `to` and `className` are used in this site, the
// rest are footguns for our copy. Drop the helper back if a future
// section needs a "count down from 100" treatment.
import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'motion/react'

type CountUpProps = {
  to: number
  duration?: number
  delay?: number
  className?: string
}

export function CountUp({
  to,
  duration = 2,
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  // ponytail: damping/stiffness formula matches react-bits upstream —
  // shorter duration → stiffer spring, fewer wasted frames.
  const damping = 20 + 40 * (1 / duration)
  const stiffness = 100 * (1 / duration)
  const springValue = useSpring(motionValue, { damping, stiffness })
  const isInView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    if (!isInView) return
    const start = window.setTimeout(() => motionValue.set(to), delay * 1000)
    return () => window.clearTimeout(start)
  }, [isInView, motionValue, to, delay])

  useEffect(() => {
    const off = springValue.on('change', (latest) => {
      if (!ref.current) return
      // ponytail: integer if there's no fractional part, else one decimal.
      // Avoids the "5.0" trailing-zero look on whole ratings.
      const hasDecimal = !Number.isInteger(latest) && latest % 1 !== 0
      ref.current.textContent = hasDecimal
        ? latest.toFixed(1)
        : Math.round(latest).toString()
    })
    return off
  }, [springValue])

  return <span ref={ref} className={className} />
}