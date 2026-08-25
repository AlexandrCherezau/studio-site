import { services, lead, partner, type Service } from '@/lib/studio'
import {
  Bot,
  Server,
  Globe,
  Sparkles,
  Database,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

// ponytail: icons mapped to service order; reorder freely.
const ICONS: LucideIcon[] = [Bot, Server, Globe, Sparkles, Database, Wrench]

function ownerLabel(owner: Service['owner']): { name: string; url: string } {
  if (owner === 'lead') return { name: `@${lead.handle}`, url: lead.kworkUrl }
  if (owner === 'partner')
    return { name: `@${partner.handle}`, url: partner.kworkUrl }
  return { name: 'lead + partner', url: '#team' }
}

export function ServicesSection() {
  return (
    // ponytail: bg-background + border-t + py-24 — first content section
    // sits on white. Border separates from the marquee above.
    <section
      id="services"
      className="relative border-t border-border/60 bg-background px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="view-reveal mb-16 max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            01 — Что делаем
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Шесть направлений, под&nbsp;которыми есть живые заказы
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Имя у каждой услуги — кто из нас её закрывает. Никаких
            «менеджер уточнит» — общаетесь напрямую с тем, кто пишет код.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = ICONS[idx] ?? Sparkles
            const owner = ownerLabel(service.owner)
            return (
              <div
                key={service.title}
                className="view-reveal group relative flex flex-col bg-background p-7 transition-colors hover:bg-foreground/[0.02]"
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-foreground/70" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {owner.name}
                  </span>
                </div>

                <h3 className="mt-12 text-lg font-medium leading-snug">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <a
                  href={owner.url}
                  target={owner.url.startsWith('http') ? '_blank' : undefined}
                  rel={owner.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="mt-8 inline-flex items-center gap-2 text-xs font-medium text-foreground underline-offset-4 transition-opacity hover:opacity-70"
                >
                  Открыть в Kwork
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}