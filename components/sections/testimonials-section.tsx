'use client'

import { motion } from 'motion/react'

import { testimonials, lead, partner } from '@/lib/studio'
import {
  TestimonialsColumn,
  type TestimonialItem,
} from '@/components/ui/testimonials-columns-1'

// ponytail: review strings live in lib/studio.ts → testimonials array.
// Each item maps to { text, name (Kwork handle), role (заказанная услуга) }.
// Owner context (lead vs partner) becomes a third line in the role field.
const items: TestimonialItem[] = testimonials.map((t) => ({
  text: `«${t.body}»`,
  name: t.author,
  role: `${t.service} · @${t.owner === 'lead' ? lead.handle : partner.handle}`,
}))

// ponytail: round-robin distributes items across the 3 columns so the
// visual mix is interleaved (lead's reviews sit next to partner's in
// adjacent columns) instead of three contiguous chunks. With a small
// source list this matters more than scrolling speed — uneven
// distribution makes one column obviously the "slow" one.
const columns: TestimonialItem[][] = [[], [], []]
items.forEach((t, i) => columns[i % 3].push(t))

export function TestimonialsSection() {
  return (
    <section
      id="reviews"
      className="relative border-t border-border/60 bg-background px-6 py-20"
    >
      <div className="container relative z-10 mx-auto">
        <div className="mx-auto flex max-w-[540px] flex-col items-center justify-center">
          <div className="flex justify-center">
            <div className="rounded-lg border py-1 px-4">Отзывы</div>
          </div>

          <h2 className="mt-5 text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Что говорят заказчики
          </h2>
          <p className="mt-5 text-center opacity-75">
            Живые отзывы с Kwork — оба профиля держат рейтинг 5.0.
          </p>
        </div>

        <div className="mt-10 flex justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px]">
          <TestimonialsColumn testimonials={columns[0]} duration={14} />
          <TestimonialsColumn
            testimonials={columns[1]}
            className="hidden md:block"
            duration={18}
          />
          <TestimonialsColumn
            testimonials={columns[2]}
            className="hidden lg:block"
            duration={12}
          />
        </div>
      </div>
    </section>
  )
}
