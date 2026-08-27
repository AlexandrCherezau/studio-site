'use client'

// ponytail: fixed-position ColorBends backdrop that fades in as the
// reader leaves the hero and fades out before they hit the footer.
// Uses rAF + scrollY, not IntersectionObserver, because we need a
// continuous opacity curve (not a binary is-visible flag). The cost
// is one scroll-read per frame — already paid by the reading-progress
// bar elsewhere, so no new layout thrash.
import { useEffect, useRef, useState } from 'react'
import { ColorBends } from '@/components/ui/color-bends'

// Mid-tone palette that shows on both light and dark themes with
// mix-blend-mode: overlay — saturated enough to be felt, soft enough
// not to fight the editorial type.
const COLORS = ['#6366f1', '#22d3ee', '#a855f7', '#f472b6']

function shouldSkipForHardware(): boolean {
  if (typeof navigator === 'undefined') return true
  // ponytail: same gate as Spline — single WebGL context already taken
  // by Spline in the hero, so adding another on weak devices is what
  // makes a fan-less laptop stutter.
  const mem = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory
  const cores = navigator.hardwareConcurrency
  if (mem !== undefined && mem < 6) return true
  if (cores !== undefined && cores < 4) return true
  return false
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function ScrollBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (shouldSkipForHardware() || prefersReducedMotion()) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled || !ref.current) return
    const node = ref.current
    let raf = 0

    const tick = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      // Fade in from 50% to 100% of the hero (one screen down).
      const fadeIn = Math.min(1, Math.max(0, (y - vh * 0.5) / (vh * 0.5)))
      // Fade out in the last viewport before the bottom (so the
      // contact section — which has its own bg — reads as the finale).
      const fromBottom = document.documentElement.scrollHeight - vh - y
      const fadeOut = Math.min(1, Math.max(0, fromBottom / vh))
      const target = Math.min(fadeIn, fadeOut) * 0.55
      // ponytail: write directly to style.opacity and skip a React
      // re-render — this fires every frame, no need to round-trip
      // through the reconciler.
      node.style.opacity = target.toFixed(3)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-0"
      style={{ mixBlendMode: 'overlay' }}
    >
      <ColorBends
        colors={COLORS}
        speed={0.18}
        intensity={0.9}
        warpStrength={1.3}
      />
    </div>
  )
}