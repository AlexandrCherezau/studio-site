'use client'

// ponytail: pure-CSS backdrop — no canvas, no WebGL, no shader, no
// library. Just a fixed <div> with two layered radial-gradients
// (dot-grid + faint halo) and a CSS @keyframes pulse. Opacity is the
// only thing that gets a rAF tick (scroll-position driven).
//
// Why this and not another shader: the site already runs Spline in
// the hero. Adding a second WebGL pass for a backdrop felt like a
// GPU tax for decoration. This costs zero JS per frame and zero
// graphics memory.
import { useEffect, useRef, useState } from 'react'

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function ScrollBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled || !ref.current) return
    const node = ref.current
    let raf = 0

    const tick = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      // Same fade-in / fade-out curve as the previous shader version
      // so the visual handoff at the section boundaries stays the
      // same — only the texture changes.
      const fadeIn = Math.min(1, Math.max(0, (y - vh * 0.5) / (vh * 0.5)))
      const fromBottom = document.documentElement.scrollHeight - vh - y
      const fadeOut = Math.min(1, Math.max(0, fromBottom / vh))
      const target = Math.min(fadeIn, fadeOut) * 0.5
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
      // Layered radial-gradients: a tight dot grid (4px circles
      // every 28px) + a wider soft halo. The two layers shift at
      // different periods via the .bg-drift keyframes — no JS
      // per-frame work, just the compositor moving two layers.
      className="scroll-bg pointer-events-none fixed inset-0 z-[1] opacity-0"
    />
  )
}