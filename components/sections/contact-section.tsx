import { lead, partner } from '@/lib/studio'
import { buttonVariants } from '@/components/ui/button'

export function ContactSection() {
  return (
    // ponytail: signature finale — inverts the page to dark after a
    // run of light/muted sections. Apple-style "stage moment" — the
    // reader knows this is the call-to-action because the whole
    // visual register shifts.
    <section
      id="contact"
      className="relative bg-foreground px-6 py-24 text-background md:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="view-reveal font-mono text-xs uppercase tracking-[0.2em] text-background/60">
          06 — Контакт
        </div>
        <h2 className="view-reveal mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Готовы начать?
        </h2>
        <p className="view-reveal mx-auto mt-6 max-w-xl text-base text-background/75 md:text-lg">
          Напишите в личку на Kwork — ответим в течение дня с оценкой
          сроков и стоимости. Если задача типовая — берите кворк со
          страницы выше.
        </p>
        <div className="view-reveal mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={lead.kworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: 'lg',
              className:
                'bg-background text-foreground hover:bg-background/90',
            })}
          >
            Написать @{lead.handle}
          </a>
          <a
            href={partner.kworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: 'lg',
              variant: 'outline',
              className:
                'border-background/30 bg-transparent text-background hover:bg-background/10',
            })}
          >
            Написать @{partner.handle}
          </a>
        </div>
      </div>
    </section>
  )
}