import { lead, partner } from '@/lib/studio'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative border-t border-border/60 bg-background px-6 py-20"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-border/60 bg-muted/30 p-8 text-center md:p-12">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Готовы начать?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Напишите в личку на Kwork — ответим в течение дня с оценкой сроков и
          стоимости. Если задача типовая — берите кворк со страницы выше.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={lead.kworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: 'lg' })}
          >
            Написать @{lead.handle} <ArrowRight />
          </a>
          <a
            href={partner.kworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: 'lg', variant: 'outline' })}
          >
            Написать @{partner.handle}
          </a>
        </div>
      </div>
    </section>
  )
}