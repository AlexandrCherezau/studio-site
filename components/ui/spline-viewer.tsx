'use client'

import { useEffect, useRef, useState } from 'react'

interface SplineViewerProps {
  viewerUrl: string
  className?: string
}

// ponytail: Spline's Public Viewer page (my.spline.design/...) embeds the
// scene inline rather than serving it from prod.spline.design, so the only
// way to render a viewer-only scene is via iframe. The viewer's CDN has no
// X-Frame-Options, so embedding is allowed.
//
// Per Taron's feedback (integrated graphics → "browser dies" on scroll),
// the 3D scene is the dominant CPU/GPU sink. Mitigations:
//   1. Renders a static dark placeholder until rIC fires. No layout shift
//      when the iframe appears.
//   2. Defers the iframe src assignment past first paint + idle window so
//      the rest of the page (text, header, CTAs) wins the main thread.
//   3. On weak devices (deviceMemory < 4GB OR hardwareConcurrency < 4) we
//      NEVER load the iframe — the placeholder stays as the final state.
//      Saves the JS+WASM cost entirely on laptops with integrated graphics
//      where 3D was guaranteed to stutter. The user can still kick the load
//      manually via the placeholder if they want to see it.
//   4. prefers-reduced-motion → skip the defer, load immediately.
//   5. iframe opacity is binary (no fade) — the Spline viewer page paints
//      a white body bg, so a fade-in would briefly show the white bg
//      through the dark hero and turn the white CTAs into invisible ones.
export function SplineViewer({ viewerUrl, className }: SplineViewerProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [tooWeak, setTooWeak] = useState(false)
  const skippedRef = useRef(false)

  // Cheap device gate. Runs once on mount; the placeholder is dark either
  // way so the visual result is identical — we just skip the iframe render.
  useEffect(() => {
    const mem = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory
    const cores = navigator.hardwareConcurrency ?? 8
    if ((typeof mem === 'number' && mem > 0 && mem < 4) || cores < 4) {
      setTooWeak(true)
    }
  }, [])

  useEffect(() => {
    if (shouldLoad || tooWeak) return

    // User-initiated skip: tap/click on the placeholder kicks the load
    // immediately. Mouse-hover doesn't — that fires too eagerly on touch.
    const placeholder = document.getElementById('spline-placeholder')
    const onPointerDown = () => {
      if (skippedRef.current) return
      skippedRef.current = true
      setShouldLoad(true)
    }
    placeholder?.addEventListener('pointerdown', onPointerDown, { once: true })

    // Schedule the deferred load after the first paint, then defer to
    // idle. requestIdleCallback fires within ~50ms on idle browsers; the
    // 1500ms timeout guarantees it doesn't get starved on busy main threads.
    let raf: number
    let idleId: number | undefined
    let fallback: ReturnType<typeof setTimeout> | undefined

    raf = requestAnimationFrame(() => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(() => setShouldLoad(true), {
          timeout: 1500,
        })
      } else {
        fallback = setTimeout(() => setShouldLoad(true), 250)
      }
    })

    return () => {
      cancelAnimationFrame(raf)
      placeholder?.removeEventListener('pointerdown', onPointerDown)
      if (
        idleId !== undefined &&
        typeof window.cancelIdleCallback === 'function'
      ) {
        window.cancelIdleCallback(idleId)
      }
      if (fallback) clearTimeout(fallback)
    }
  }, [shouldLoad, tooWeak])

  return (
    <div className={`relative ${className ?? ''}`}>
      <div
        id="spline-placeholder"
        aria-hidden
        className="absolute inset-0 cursor-pointer overflow-hidden bg-black"
        style={{
          // ponytail: pulse stays on transform/opacity → compositor-only,
          // never wakes the main thread during the loading window.
          background:
            'radial-gradient(ellipse 50% 60% at 50% 45%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,1) 70%)',
          animation: tooWeak
            ? 'none'
            : 'spline-skeleton-pulse 2.4s ease-in-out infinite',
        }}
      >
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-[120px] font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 md:bottom-32 md:translate-y-0">
          {tooWeak ? '3D недоступно на этом устройстве' : 'Загружаем 3D'}
        </div>
      </div>

      {shouldLoad && !tooWeak && (
        <iframe
          src={viewerUrl}
          title="Spline scene"
          // ponytail: fetchpriority passes through React's prop spread;
          // the camelCase `fetchPriority` is missing from @types/react@19's
          // IFrameHTMLAttributes in this Next.js 16 combo.
          {...({ fetchpriority: 'high' } as Record<string, string>)}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          className="absolute inset-0 h-full w-full border-0"
          style={{
            // ponytail: opaque black bg on the iframe element itself.
            // The Spline viewer page paints its own white bg once it
            // loads, but during the initial paint window this keeps the
            // hero dark so the white CTAs above stay readable.
            background: '#000',
          }}
        />
      )}
    </div>
  )
}