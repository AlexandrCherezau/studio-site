import { gigs } from '@/lib/studio'

export function GigsSection() {
  return (
    // ponytail: editorial list instead of cards. Stripe-pricing-tier
    // feel — hairline dividers, price + title on one line, Kwork
    // link as the right-side affordance. No card chrome.
    <section
      id="work"
      className="relative bg-background px-6 py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="view-reveal mb-16 max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            03 — Кворки
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Готовые предложения с&nbsp;фиксированной ценой
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Клик — откроется страница кворка на Kwork, можно сразу
            оформить заказ.
          </p>
        </div>

        <ul className="view-reveal divide-y divide-border/60 border-y border-border/60">
          {gigs.map((gig) => (
            <li key={gig.title}>
              <a
                href={gig.kworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-6 py-5 transition-colors hover:bg-muted/30"
              >
                <div className="flex min-w-0 items-baseline gap-6">
                  <span className="w-20 shrink-0 font-mono text-sm tabular-nums text-foreground md:w-24">
                    {gig.price}
                  </span>
                  <span className="text-base font-medium md:text-lg">
                    {gig.title}
                  </span>
                </div>
                <span
                  aria-hidden
                  className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground"
                >
                  открыть →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}