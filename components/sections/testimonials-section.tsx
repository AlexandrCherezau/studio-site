import { testimonials, lead, partner } from '@/lib/studio'

// ponytail: Apple HIG print-spread — large quote with attribution
// underneath. Two quotes side by side on desktop, stacked on mobile.
// No infinite-marquee animation (was the most "AI-template"-looking
// element of the previous design); the quotes just sit there as
// evidence the user can read at their own pace.
type Quote = { body: string; author: string; service: string; owner: 'lead' | 'partner' }

const featured: Quote[] = [
  testimonials.find((t) => t.author === 'gk_perspektiva') ?? testimonials[0],
  testimonials.find((t) => t.author === 'labirintm') ?? testimonials[1],
].map((t) => ({
  body: t.body,
  author: t.author,
  service: t.service,
  owner: t.owner,
}))

export function TestimonialsSection() {
  return (
    // ponytail: bg-muted/30 alternates with gigs above (bg-background).
    // Py-32 = more breath than the list sections, since text-heavy
    // content needs more space to breathe.
    <section
      id="reviews"
      className="relative bg-muted/30 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="view-reveal mb-16 max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            04 — Отзывы
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Что говорят заказчики
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Два профиля, рейтинг 5.0. Цитаты живые — ссылки на оригинал
            в каждой карточке.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {featured.map((q, i) => {
            const handle = q.owner === 'lead' ? lead.handle : partner.handle
            return (
              <figure key={i} className="view-reveal">
                <div
                  aria-hidden
                  className="font-serif text-6xl leading-none text-foreground/30 md:text-7xl"
                >
                  «
                </div>
                <blockquote className="-mt-4 text-xl font-medium leading-snug text-foreground md:text-2xl">
                  {q.body}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 text-sm">
                  <span className="font-medium text-foreground">
                    {q.author}
                  </span>
                  <span aria-hidden className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{q.service}</span>
                  <span aria-hidden className="text-muted-foreground">·</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    @{handle}
                  </span>
                </figcaption>
              </figure>
            )
          })}
        </div>

        <p className="view-reveal mt-16 max-w-md text-sm text-muted-foreground">
          Все отзывы — на страницах профилей:{' '}
          <a
            href={lead.kworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            @{lead.handle}
          </a>{' '}
          ·{' '}
          <a
            href={partner.kworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            @{partner.handle}
          </a>
        </p>
      </div>
    </section>
  )
}