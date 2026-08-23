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
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'

// ponytail: icons mapped to service order; reorder freely.
const ICONS: LucideIcon[] = [Bot, Server, Globe, Sparkles, Database, Wrench]

function ownerLabel(owner: Service['owner']): { name: string; url: string } {
  if (owner === 'lead') return { name: `@${lead.handle}`, url: lead.kworkUrl }
  if (owner === 'partner')
    return { name: `@${partner.handle}`, url: partner.kworkUrl }
  return { name: 'оба', url: '#team' }
}

// ponytail: cards fade-up on enter. Stagger reduced (was 0.06 per card)
// because each staggered spring wakes the layout/paint pipeline on scroll.
// `viewport.once` so it doesn't replay on scroll-back.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.3,
    },
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
          className="grid gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, idx) => {
            const Icon = ICONS[idx] ?? Sparkles
            const owner = ownerLabel(service.owner)
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="bg-background p-6 transition-colors hover:bg-muted/40"
              >
                <Icon className="size-5 text-foreground/80" />
                <h3 className="mt-4 text-lg font-medium">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <a
                  href={owner.url}
                  target={owner.url.startsWith('http') ? '_blank' : undefined}
                  rel={owner.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                >
                  ведёт {owner.name}
                  <ArrowUpRight className="size-3" />
                </a>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
