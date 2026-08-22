// Infinite horizontal ticker. Pure CSS — no scroll hook, no JS overhead,
// runs on the compositor thread. Items repeat 4× so the loop is seamless
// at any viewport width. Pauses on hover so users can read if they want.
// Direction reverses per row for visual rhythm.
// ponytail: speed is set in globals.css keyframes (--marquee-duration).
// Add/remove tokens freely; pick a divider character that survives the loop.

const ROW_A = [
  'Telegram-боты',
  'SaaS под ключ',
  'Парсинг с обходом защит',
  'AI-агенты',
  'RAG-ассистенты',
  'FastAPI',
  'React · Next.js',
  'PostgreSQL',
]

const ROW_B = [
  'CRM · ERP',
  'Mini Apps',
  'Деплой на вашем VPS',
  'Обход Cloudflare',
  'OpenAI · Claude · DeepSeek',
  'Docker · Nginx · SSL',
  'amoCRM · Bitrix24',
  'Google Sheets · МойСклад',
]

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  // 4× repeat = guaranteed seamless wrap at any reasonable viewport.
  const repeated = [...items, ...items, ...items, ...items]
  return (
    <div
      className={
        'flex w-max gap-12 whitespace-nowrap will-change-transform ' +
        (reverse ? 'animate-marquee-rev' : 'animate-marquee')
      }
      aria-hidden
    >
      {repeated.map((item, i) => (
        <span
          key={i}
          className="text-2xl font-semibold tracking-tight text-foreground/30 transition-colors hover:text-foreground md:text-3xl"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

export function MarqueeSection() {
  return (
    <section
      aria-label="Технологии и услуги"
      className="group relative overflow-hidden border-y border-border/60 bg-background py-10"
    >
      {/* gradient fades on both edges so items don't clip hard against
          the section borders. pointer-events:none so they don't eat clicks. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="space-y-4">
        <Row items={ROW_A} />
        <Row items={ROW_B} reverse />
      </div>
    </section>
  )
}
