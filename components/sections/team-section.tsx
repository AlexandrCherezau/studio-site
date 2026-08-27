import { lead } from '@/lib/studio'
import { Star } from 'lucide-react'
import { CountUp } from '@/components/ui/count-up'

// ponytail: lucide-react no longer ships a GitHub glyph in this version —
// inline an SVG so we don't add a new dependency just for one icon.
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.16 1.18a10.95 10.95 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.17v3.22c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

export function TeamSection() {
  return (
    // ponytail: bg-muted/30 alternates with services above (bg-background)
    // — gives the page a two-tone rhythm without adding a hard border.
    <section
      id="team"
      className="relative bg-muted/30 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="view-reveal mb-16 max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            02 — Обо мне
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Fullstack-разработчик с рейтингом 5.0 на Kwork
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Отвечаю лично, деплою на вашем сервере. Исходники и
            инфраструктура — ваши, не подписка на чужой SaaS.
          </p>
        </div>

        <div className="view-reveal max-w-3xl">
          <article className="rounded-2xl bg-background p-8 ring-1 ring-foreground/[0.06] md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  {lead.name}
                </h3>
                <a
                  href={lead.kworkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  @{lead.handle}
                </a>
              </div>
              <div className="flex items-center gap-1 font-mono text-xs">
                <Star className="size-3 fill-current" />
                <span className="font-medium">{lead.stats.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  · {lead.stats.reviews}
                </span>
              </div>
            </div>

            <p className="mt-6 text-base font-medium text-foreground/90">
              {lead.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {lead.bio}
            </p>

            <ul className="mt-6 grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-2">
              {lead.stack.map((tech) => (
                <li key={tech} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-foreground/30" />
                  <span>{tech}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border/40 pt-5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <span>
                <CountUp to={lead.stats.orders} className="tabular-nums" /> заказов
              </span>
              <span aria-hidden>·</span>
              <span>
                <CountUp to={lead.stats.completion} className="tabular-nums" />% сдано
              </span>
              <span aria-hidden>·</span>
              <span>
                <CountUp to={lead.stats.onTime} className="tabular-nums" />% вовремя
              </span>
              {lead.stats.repeat > 0 && (
                <>
                  <span aria-hidden>·</span>
                  <span>
                    <CountUp to={lead.stats.repeat} className="tabular-nums" />% повторных
                  </span>
                </>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={lead.kworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-foreground/20 bg-foreground/[0.06] px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-150 hover:border-foreground/40 hover:bg-foreground/[0.12]"
              >
                Профиль на Kwork
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  <path d="M3 9 L9 3 M5 3 L9 3 L9 7" />
                </svg>
              </a>
              {lead.githubUrl && (
                <a
                  href={lead.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-150 hover:border-foreground/30 hover:bg-muted/50 hover:text-foreground"
                >
                  <GithubIcon className="size-3.5" />
                  GitHub
                </a>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}