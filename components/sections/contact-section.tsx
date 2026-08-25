import { lead, partner } from '@/lib/studio'
import { buttonVariants } from '@/components/ui/button'

export function ContactSection() {
  return (
    // ponytail: signature finale — elevated card on the page's
    // background. Uses `bg-foreground/[0.04]` (4% of the text-color
    // token, which adapts) so the section reads as a raised card in
    // BOTH light and dark themes — no harsh inversion that fights
    // a dark-mode reader's eye. Border uses the same token at
    // lower opacity to keep edges visible without a hard line.
    <section
      id="contact"
      className="relative bg-foreground/[0.04] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="view-reveal font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          07 — Контакт
        </div>
        <h2 className="view-reveal mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
          Готовы начать?
        </h2>
        <p className="view-reveal mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
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
                'bg-foreground text-background hover:bg-foreground/90',
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
                'border-foreground/30 bg-transparent text-foreground hover:bg-foreground/10',
            })}
          >
            Написать @{partner.handle}
          </a>
        </div>
      </div>
    </section>
  )
}