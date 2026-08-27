'use client'

// ponytail: fixed-position Iridescence backdrop that fades in as the
// reader leaves the hero and fades out before the footer. Uses rAF +
// scrollY instead of IntersectionObserver because we need a continuous
// opacity curve, not a binary is-visible flag.
//
// Iridescence over ColorBends: pearl-slick shader vs banded grid-warps.
// Smaller dep footprint (ogl ~25KB gz vs three ~600KB), single color
// tint instead of palette, organic vs geometric. Fits the editorial
// Apple-HIG aesthetic — pearlescent shimmer, not arcade.
import { useEffect, useRef, useState } from 'react'
import { Iridescence } from '@/components/ui/iridescence'

// Subtle pearl tint — light cool-purple shifts so the shader's own
// sine-wave field gives the color variation, not the tint.
const TINT: [number, number, number] = [0.78, 0.7, 1.0]

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
      // Fade in as the reader leaves the hero (one viewport down).
      const fadeIn = Math.min(1, Math.max(0, (y - vh * 0.5) / (vh * 0.5)))
      // Fade out in the last viewport before the bottom (so the
      // contact section — which has its own bg — reads as the finale).
      const fromBottom = document.documentElement.scrollHeight - vh - y
      const fadeOut = Math.min(1, Math.max(0, fromBottom / vh))
      const target = Math.min(fadeIn, fadeOut) * 0.65
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
      <Iridescence color={TINT} speed={0.6} amplitude={0.2} mouseReact />
    </div>
  )
}