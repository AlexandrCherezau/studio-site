'use client'

import { motion, type Variants } from 'motion/react'
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

// ponytail: cards fade-up on enter. No stagger — each staggered spring
// woke the layout/paint pipeline on scroll (Taron: "browser dies").
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0, duration: 0.3 },
  },
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative border-t border-border/60 bg-background px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Что делаем
          </h2>
          <p className="mt-3 text-muted-foreground">
            Услуги, под которыми есть живые заказы на Kwork. Имя у каждой
            услуги — кто из нас её закрывает.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, idx) => {
            const Icon = ICONS[idx] ?? Sparkles
            const owner = ownerLabel(service.owner)
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                // ponytail: per-card border + rounded corners replace the
                // old hairline-grid pattern (gap-px + bg-border/60), which
                // ÆLUA flagged as visually busy. Hover is border-color
                // only — no transform, no shadow (perf: keeps the
                // compositor out of the paint pipeline on weak GPUs).
                className="group flex flex-col rounded-xl border border-border/60 bg-background p-6 transition-colors hover:border-foreground/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-foreground/[0.04] ring-1 ring-foreground/[0.06]">
                    <Icon className="size-5 text-foreground/80" />
                  </div>
                  <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {owner.name}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-medium leading-snug">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <a
                  href={owner.url}
                  target={owner.url.startsWith('http') ? '_blank' : undefined}
                  rel={owner.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="mt-auto inline-block pt-5 text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  Открыть в Kwork
                </a>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}