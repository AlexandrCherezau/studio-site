import { cn } from '@/lib/utils'

type CornerLabelsProps = {
  topLeft?: string
  topRight?: string
  bottomLeft?: string
  bottomRight?: string
  className?: string
}

// ponytail: firecrawl.dev hero has four bracketed status markers
// ([ 200 OK ] [ SCRAPE ] [ .JSON ] [ .MD ]) framing the content as if
// it were an API response. We port the pattern with dev-portfolio
// labels — solo-studio, rating, response time, marketplace. Same
// visual language (mono brackets, muted, corner-pinned), site-native
// copy.
export function CornerLabels({
  topLeft = '[ solo · dev ]',
  topRight = '[ 5.0 ★ ]',
  bottomLeft = '[ отвечу за 24ч ]',
  bottomRight = '[ kwork.ru ]',
  className,
}: CornerLabelsProps) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute left-4 top-4 z-10 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 sm:left-6 sm:top-6 md:left-10 md:top-10 md:block md:text-xs',
          className,
        )}
      >
        {topLeft}
      </span>
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute right-4 top-4 z-10 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 sm:right-6 sm:top-6 md:right-10 md:top-10 md:block md:text-xs',
          className,
        )}
      >
        {topRight}
      </span>
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute bottom-4 left-4 z-10 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 sm:bottom-6 sm:left-6 md:bottom-10 md:left-10 md:block md:text-xs',
          className,
        )}
      >
        {bottomLeft}
      </span>
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute bottom-4 right-4 z-10 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 sm:bottom-6 sm:right-6 md:bottom-10 md:right-10 md:block md:text-xs',
          className,
        )}
      >
        {bottomRight}
      </span>
    </>
  )
}