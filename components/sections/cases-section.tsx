import { portfolio, type Portfolio } from '@/lib/studio'
import { Bot, Server, Globe, Database, type LucideIcon } from 'lucide-react'

// ponytail: icons drawn from the same lucide set services uses —
// no new dependency, no new glyphs to maintain.
const ICON: Record<Portfolio['type'], LucideIcon> = {
  parser: Server,
  shop: Globe,
  bot: Bot,
  infra: Database,
}

// ponytail: stagger labels vertically when dots crowd the same
// pixel — offsets rotate so adjacent dots don't overlap their
// hover captions. 5-entry cycle covers the 4-item portfolio.
function staggerY(i: number) {
  const offsets = [0, 8, 16, 24, -8]
  return offsets[i % offsets.length]
}

export function CasesSection() {
  return (
    // ponytail: zero chrome — only two hairlines + dots. Position
    // encodes scale, not weight. view-reveal drives the canvas
    // fade-up via the existing CSS animation in globals.css.
    <section
      id="cases"
      aria-label="Кейсы — карта проектов"
      className="relative view-reveal bg-muted/30 px-6 md:px-10 py-24 md:py-32"
      data-reveal
    >
      <header className="mx-auto max-w-6xl mb-12 md:mb-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          05 — Кейсы
        </p>
        <h2 className="mt-3 font-serif text-3xl md:text-5xl tracking-tight text-foreground max-w-3xl">
          Четыре закрытых проекта — по&nbsp;точке на&nbsp;каждой оси.
        </h2>
      </header>

      {/* Canvas */}
      <div className="reveal-stagger relative mx-auto max-w-6xl h-[60vh] md:h-[70vh]">
        {/* Y axis */}
        <span
          aria-hidden
          className="absolute left-0 top-0 bottom-0 border-l border-foreground/20"
        />
        <span className="absolute -left-2 top-0 -translate-x-full font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground [writing-mode:vertical-rl] rotate-180">
          recency ↑
        </span>

        {/* X axis */}
        <span
          aria-hidden
          className="absolute left-0 right-0 bottom-0 border-b border-foreground/20"
        />
        <span className="absolute right-0 -bottom-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          scope →
        </span>

        {/* Projects */}
        {portfolio.map((p, i) => {
          const Icon = ICON[p.type]
          return (
            <a
              key={p.id}
              href={p.kworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute"
              style={{
                left: `${p.scope}%`,
                bottom: `${p.recency}%`,
                transform: `translateY(${staggerY(i)}px)`,
              }}
              aria-label={`${p.title} — открыть кейс на Kwork`}
            >
              <span
                aria-hidden
                className="block size-2.5 rounded-full bg-foreground/80 transition-colors duration-200 group-hover:bg-foreground"
              />
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap
                           opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  transform: `translate(1rem, calc(-50% + ${staggerY(i)}px))`,
                }}
              >
                <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <Icon size={12} className="text-muted-foreground" strokeWidth={1.5} />
                  {p.title}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {p.month} · {p.stack.join(' · ')}
                </p>
                {p.desc && (
                  <p className="mt-1 max-w-[18ch] text-xs text-muted-foreground/0 group-hover:text-muted-foreground transition-colors duration-200">
                    {p.desc}
                  </p>
                )}
              </div>
            </a>
          )
        })}
      </div>

      {/* Legend (mono captions, not chips) */}
      <ul className="mx-auto mt-10 flex max-w-6xl flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Server size={10} strokeWidth={1.5} /> parser
        </li>
        <li className="flex items-center gap-1.5">
          <Globe size={10} strokeWidth={1.5} /> shop
        </li>
        <li className="flex items-center gap-1.5">
          <Bot size={10} strokeWidth={1.5} /> bot
        </li>
        <li className="flex items-center gap-1.5">
          <Database size={10} strokeWidth={1.5} /> infra
        </li>
      </ul>
    </section>
  )
}