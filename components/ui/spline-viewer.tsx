'use client'

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
// anymore (the brightness filter washed the 3D colors too). Instead the
// hero layer a radial-gradient overlay on top — transparent over the
// character, dark everywhere else — so the bg reads black without
// touching the model. ponytail: tune the ellipse center to the model's
// real on-screen position, not the viewport center.
export function SplineViewer({ viewerUrl, className }: SplineViewerProps) {
  return (
    <iframe
      src={viewerUrl}
      title="Spline scene"
      className={className}
      allow="autoplay; fullscreen; xr-spatial-tracking"
      // ponytail: fetchPriority="high" dropped — it's not in @types/react@19's
      // IframeHTMLAttributes in this Next 16 combo, and the LCP win isn't
      // worth fighting the types. The Spline iframe loads eagerly by default.
      { ...({ fetchpriority: 'high' } as Record<string, string>) }
      style={{
        border: 0,
        background: 'transparent',
      }}
    />
  )
}