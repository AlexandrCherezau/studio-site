import { SplineViewer } from '@/components/ui/spline-viewer'
import { buttonVariants } from '@/components/ui/button'
import { SCENE_VIEWER_URL, lead, partner } from '@/lib/studio'
import { ArrowRight, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    // Hero fills the entire first viewport. h-svh = small viewport height so
    // mobile browser chrome (URL bar) doesn't clip content.
    <section className="relative h-svh w-full overflow-hidden bg-black/[0.96] text-white">
      {/* Background scene — fills entire viewport */}
      <SplineViewer
        viewerUrl={SCENE_VIEWER_URL}
        className="absolute inset-0 h-full w-full"
      />

      {/* Top-left: studio mark. Plain text, no pill. pointer-events:none
          so the iframe keeps cursor-follow when cursor crosses it. */}
      <div className="pointer-events-none absolute left-6 top-6 z-10 font-mono text-xs uppercase tracking-[0.2em] text-white/70 md:left-10 md:top-10">
        {lead.name} · {partner.name}{' '}
        <span className="text-white/40">/ studio</span>
      </div>

      {/* Bottom-left: big headline. pointer-events:none so cursor-follow
          keeps running when cursor is over the title. */}
      <div className="pointer-events-none absolute bottom-1/2 left-6 z-10 max-w-md p-6 md:bottom-32 md:left-10 md:p-0">
        <h1 className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-bold leading-[1.02] tracking-tight text-transparent md:text-5xl lg:text-6xl">
          Боты, парсеры, AI и SaaS под ключ
        </h1>
      </div>

      {/* Bottom-right: description + CTAs.
          Lifted above the bottom watermark strip so they stay fully visible.
          Buttons are fully interactive: native pointer-events, real hover,
          real focus ring. z-20 keeps them above the gradient fade. */}
      <div className="pointer-events-none absolute bottom-32 right-6 z-20 flex max-w-sm flex-col items-end gap-5 p-4 md:bottom-40 md:right-10 md:p-0">
        <p className="text-pretty text-base text-white/85 md:text-lg">
          Fullstack-дуэт с рейтингом 5.0 на Kwork. Telegram-боты, парсеры с
          обходом защит, CRM/ERP, RAG-ассистенты, деплой на вашем сервере.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={lead.kworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: 'lg',
              className:
                'pointer-events-auto bg-white text-black shadow-lg shadow-black/40 hover:bg-white/90',
            })}
          >
            Написать на Kwork <ArrowRight />
          </a>
          <a
            href="#gigs"
            className={buttonVariants({
              size: 'lg',
              variant: 'outline',
              className:
                'pointer-events-auto border-white/40 bg-white/10 text-white shadow-lg shadow-black/40 backdrop-blur-sm hover:bg-white/20',
            })}
          >
            Смотреть кворки
          </a>
        </div>
      </div>

      {/* Bottom fade keeps the text readable. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Watermark strip — covers ONLY the Spline viewer's "Build with
          Spline" footer (bottom-right of the iframe). Color exact
          #0a0a0a so it merges with the section's bg-black/[0.96]. Tall
          enough (h-12) to mask the watermark link + logo, but kept
          narrow so it doesn't shade the CTAs (which sit at bottom-32). */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 z-40 h-12 w-72"
        style={{ background: '#0a0a0a' }}
      />
    </section>
  )
}