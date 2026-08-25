import Image from 'next/image'
import { portfolio } from '@/lib/studio'

export function CasesSection() {
  return (
    // ponytail: 2x2 image-grid portfolio. Real Kwork preview images
    // (downloaded from the kwork CDN og:image meta tags into
    // public/portfolio/). Each card is a separate viewport entry
    // with its own view-reveal. Hover scales the image via
    // transform/opacity only — same constraint as services/gigs.
    // bg-background alternates with the testimonials section
    // above (bg-muted/30) so we land a single two-tone rhythm.
    <section
      id="cases"
      className="relative bg-background px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl md:mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            05 — Кейсы
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Четыре закрытых проекта с&nbsp;открытой документацией
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            На каждой карточке — превью с Kwork и ссылка на полный
            разбор: что делали, на чём, и за сколько закрыли.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {portfolio.map((p) => (
            <a
              key={p.id}
              href={p.kworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="view-reveal group flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-background transition-colors hover:border-foreground/30"
            >
              {/* Preview image — Next/Image with explicit dimensions
                  so layout is reserved before the asset loads. */}
              <div className="relative aspect-[3/2] overflow-hidden bg-muted/30">
                <Image
                  src={p.preview}
                  alt={p.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  unoptimized
                />
                {/* Tag in top-left — matches the Instagram card pattern,
                    gives the image an instantly-readable label even at
                    200px tall. */}
                <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground backdrop-blur">
                  {p.month} · {p.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <h3 className="text-lg font-semibold leading-snug text-foreground">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground">{p.scope}</p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/40 bg-muted/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
                    открыть на Kwork →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}