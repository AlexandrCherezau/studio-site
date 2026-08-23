'use client'

import React from 'react'
import { motion, useReducedMotion } from 'motion/react'

export type TestimonialItem = {
  text: string
  name: string
  role: string
  image?: string
}

// ponytail: TestimonialsColumn duplicates its list COPIES times and
// animates translateY -50% for the seamless loop. The trick to reading
// as "endless" is enough scroll distance between same-content passes —
// 2 copies (the demo default) only gave 6 items per column reset cycle,
// which feels slow / repetitive with our 7-item source list. COPIES=5
// triples the on-screen distance; combined with shorter durations it
// flows continuously instead of stepping.
const COPIES = 5

export const TestimonialsColumn = (props: {
  className?: string
  testimonials: TestimonialItem[]
  duration?: number
}) => {
  // apple-design §14: skip the infinite marquee for reduced-motion users —
  // a slow looping oscillation near 0.2 Hz is exactly what the guidelines
  // single out. Render one copy, no animation.
  const shouldReduceMotion = useReducedMotion()
  const copies = shouldReduceMotion ? 1 : COPIES
  return (
    <div className={props.className}>
      <motion.div
        animate={shouldReduceMotion ? undefined : { translateY: '-50%' }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: props.duration || 10,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop',
              }
        }
        className="flex flex-col gap-6 bg-background pb-6"
      >
        {new Array(copies).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map((t, i) => (
              <div
                className="w-full max-w-xs rounded-3xl border p-10 shadow-lg shadow-primary/10"
                key={`${index}-${i}`}
              >
                <div>{t.text}</div>
                <div className="mt-5 flex items-center gap-2">
                  {t.image ? (
                    <img
                      width={40}
                      height={40}
                      src={t.image}
                      alt={t.name}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <Avatar name={t.name} />
                  )}
                  <div className="flex flex-col">
                    <div className="font-medium leading-5 tracking-tight">
                      {t.name}
                    </div>
                    <div className="leading-5 tracking-tight opacity-60">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

// Inline SVG avatar — initials in a deterministic-color circle.
// Avoids external image deps and survives the user's Kwork profile photos not being public.
function Avatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  // Hash name → hsl hue. Stable across renders.
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  }
  const hue = hash % 360
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-white"
      style={{ backgroundColor: `hsl(${hue} 55% 45%)` }}
      aria-label={name}
    >
      {initials}
    </div>
  )
}
