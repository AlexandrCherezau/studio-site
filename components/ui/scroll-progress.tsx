// ponytail: page-level scroll bar. Pure CSS — no motion/react, no
// useScroll/useSpring, no JS re-renders on scroll. The browser's
// animation engine interpolates scaleX directly from the scroll
// position via animation-timeline: scroll(root), so the work
// happens off the main thread (Safari < 17.4 / Firefox ignore
// the @supports block — bar just stays at scaleX(1) instead of
// animating, which is fine). Color uses foreground token so it
// adapts to theme. z-[60] keeps it above the SiteHeader.
export function ScrollProgress() {
  return (
    <div
      aria-hidden
      className="scroll-progress-bar pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-foreground"
      style={{ transform: 'scaleX(0)' }}
    />
  )
}