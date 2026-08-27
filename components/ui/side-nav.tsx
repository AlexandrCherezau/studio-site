'use client'

// ponytail: fixed right-side nav anchored to the section list.
// Uses react-bits LineSidebar for the visual, IntersectionObserver
// for the active state — observer fires on real section boundaries
// instead of guesswork from scroll math.
import { useEffect, useState } from 'react'
import { LineSidebar } from '@/components/ui/line-sidebar'

const SECTIONS: { id: string; label: string }[] = [
  { id: 'services', label: 'Услуги' },
  { id: 'team', label: 'Обо мне' },
  { id: 'work', label: 'Кворки' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'cases', label: 'Кейсы' },
  { id: 'process', label: 'Процесс' },
  { id: 'contact', label: 'Контакт' },
]

export function SideNav() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    // ponytail: IntersectionObserver with a generous bottom rootMargin
    // so the "active" item flips when the section's middle crosses
    // ~30% from the top — matches the way the eye reads a page.
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the trigger zone that is
        // intersecting. If multiple, the highest one wins so the
        // nav doesn't flicker between adjacent sections.
        let bestIndex = -1
        let bestY = Infinity
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const idx = SECTIONS.findIndex((s) => s.id === entry.target.id)
          if (idx === -1) continue
          if (entry.boundingClientRect.top < bestY) {
            bestY = entry.boundingClientRect.top
            bestIndex = idx
          }
        }
        if (bestIndex !== -1) setActive(bestIndex)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    )

    for (const s of SECTIONS) {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const handleClick = (index: number) => {
    const target = document.getElementById(SECTIONS[index].id)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      // z-30 sits above ScrollBackground (z-[1]) and the marquee
      // divider, but below SiteHeader (z-40). right-6 keeps it
      // clear of the scrollbar on standard desktop widths; hidden
      // below md because the editorial header already carries the
      // nav at that size and a fixed side rail steals too much
      // horizontal real-estate.
      className="pointer-events-auto fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 md:block"
      aria-label="Навигация по разделам"
    >
      <LineSidebar
        items={SECTIONS.map((s) => s.label)}
        accentColor="var(--foreground)"
        textColor="var(--muted-foreground)"
        markerColor="var(--border)"
        proximityRadius={70}
        maxShift={14}
        markerLength={48}
        itemGap={14}
        fontSize={0.85}
        smoothing={140}
        defaultActive={active}
        onItemClick={(index) => handleClick(index)}
      />
    </div>
  )
}