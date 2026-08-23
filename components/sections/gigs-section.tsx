import { gigs } from '@/lib/studio'
import { ArrowRight } from 'lucide-react'

export function GigsSection() {
  return (
    <section id="work" className="relative border-t border-border/60 bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="view-reveal mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Кворки
          </h2>
          <p className="mt-3 text-muted-foreground">
            Готовые предложения с фиксированной ценой. Кликайте — откроется на
            Kwork.
          </p>
        </div>

        <ul className="grid gap-3">
          {gigs.map((gig) => (
            <li key={gig.title} className="view-reveal">
              <a
                href={gig.kworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-background p-4 transition-colors hover:border-foreground/30 hover:bg-muted/30"
              >
                <div className="flex items-center gap-4">
                  <span className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                    {gig.price}
                  </span>
                  <span className="text-sm font-medium">{gig.title}</span>
                </div>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}