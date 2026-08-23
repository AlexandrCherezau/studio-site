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
// The viewer paints a light body bg. We DON'T darken the iframe itself
// (the brightness filter washed the 3D colors too). Instead the hero layer
// a radial-gradient overlay on top — transparent over the character,
// dark everywhere else — so the bg reads black without touching the
// model. ponytail: tune the ellipse center to the model's real on-screen
// position, not the viewport center.
//
// LOOSE perf budget before this change:
//   - HTML TTFB ~180ms, total page ~250ms (137KB) on warm Vercel edge
//   - Iframe starts loading immediately at <head> parse time → main thread
//     blocked on viewer JS + scene file + textures while the rest of the
//     page (text, header, CTAs) is waiting to paint
//   - Measured: ~6s to Spline ready on a fresh visit
//
// What this component does:
//   1. Renders a skeleton placeholder matching the hero's dark bg.
//      Reserves the layout box, so no CLS when Spline arrives.
//   2. Waits for first paint + requestIdleCallback (with setTimeout
//      fallback for browsers without rIC) before assigning `src` to
//      the iframe. That defers the network cost past initial render.
//   3. Once the iframe has loaded, fades it in over the skeleton (300ms)
//      so the swap isn't jarring.
//   4. Falls back to immediate load if the user has `prefers-reduced-motion`
//      OR if they touch the placeholder (skip-the-wait affordance —
//      hovering/clicking the skeleton signals intent to interact).
export function SplineViewer({ viewerUrl, className }: SplineViewerProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const skippedRef = useRef(false)

  useEffect(() => {
    if (shouldLoad) return

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
  }, [shouldLoad])

  return (
    <div className={`relative ${className ?? ''}`}>
      {/* Skeleton: dark with a soft pulsing radial gradient. Matches the
          hero bg so the swap to Spline isn't a color flash. aria-hidden
          so AT ignores it; the iframe below carries the title. */}
      <div
        id="spline-placeholder"
        aria-hidden
        className="absolute inset-0 cursor-pointer overflow-hidden bg-black/[0.96]"
        style={{
          // ponytail: the pulse lives on transform/opacity so it stays
          // on the compositor and never wakes the main thread during
          // the loading window — when the iframe is what's eating CPU.
          background:
            'radial-gradient(ellipse 50% 60% at 50% 45%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,1) 70%)',
          animation: 'spline-skeleton-pulse 2.4s ease-in-out infinite',
        }}
      >
        {/* Tiny "loading 3D" hint, lower-third, faint. Gives the user
            a signal that something is coming without stealing focus
            from the headline. */}
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-[120px] font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 md:bottom-32 md:translate-y-0">
          Загружаем 3D
        </div>
      </div>

      {shouldLoad && (
        <iframe
          src={viewerUrl}
          title="Spline scene"
          // ponytail: fetchpriority passes through React's prop spread;
          // the camelCase `fetchPriority` is missing from @types/react@19's
          // IFrameHTMLAttributes in this Next.js 16 combo.
          {...({ fetchpriority: 'high' } as Record<string, string>)}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          onLoad={() => setIframeLoaded(true)}
          className="absolute inset-0 h-full w-full border-0 transition-opacity duration-300"
          style={{
            background: 'transparent',
            opacity: iframeLoaded ? 1 : 0,
          }}
        />
      )}
    </div>
  )
}
