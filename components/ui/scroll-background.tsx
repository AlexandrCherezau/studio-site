'use client'

// ponytail: fixed-position ColorBends backdrop that's visible while
// the user is scrolling through the content sections (between hero
// and footer). rAF + scrollY, no IntersectionObserver — we need a
// continuous opacity curve, not a binary is-visible flag.
import { useEffect, useRef, useState } from 'react'
import { ColorBends } from '@/components/ui/color-bends'

// Bright example palette from react-bits docs — pink / purple / cyan
// in an additive overlay gives an iridescent wash that reads as
// "background" on both light and dark themes.
const COLORS = ['#ff5c7a', '#8a5cff', '#00ffd1', '#ff5c7a']

function shouldSkipForHardware(): boolean {
  if (typeof navigator === 'undefined') return true
  // ponytail: same gate as Spline — hero already uses one WebGL
  // context, so a second full-screen WebGL pass on a fan-less
  // laptop turns into dropped frames. Bumping the bar to 6GB / 4
  // cores to match what desktop browsers report on M-series Macs
  // and modern ultrabooks.
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
      // Fade in as the reader leaves the hero (one viewport down),
      // hold through the content sections, fade out in the last
      // viewport before the bottom (so the contact section — which
      // has its own bg — reads as the finale, not the page bg).
      const fadeIn = Math.min(1, Math.max(0, (y - vh * 0.6) / (vh * 0.4)))
      const fromBottom = document.documentElement.scrollHeight - vh - y
      const fadeOut = Math.min(1, Math.max(0, fromBottom / vh))
      const target = Math.min(fadeIn, fadeOut) * 0.9
      // ponytail: write directly to style.opacity, skip React
      // re-render — fires every frame, no need to round-trip.
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
        rotation={90}
        speed={0.2}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.15}
        iterations={1}
        intensity={1.8}
        bandWidth={6}
        transparent
      />
    </div>
  )
}