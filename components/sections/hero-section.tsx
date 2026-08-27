import { SplineViewer } from '@/components/ui/spline-viewer'
import { BlurText } from '@/components/ui/blur-text'
import { buttonVariants } from '@/components/ui/button'
import { SCENE_VIEWER_URL, lead } from '@/lib/studio'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    // Hero fills the entire first viewport. h-svh = small viewport height so
    // mobile browser chrome (URL bar) doesn't clip content.
    <section className="hero-parallax relative h-svh w-full overflow-hidden bg-black text-white">
      {/* Background scene — fills entire viewport */}
      <SplineViewer
        viewerUrl={SCENE_VIEWER_URL}
        className="absolute inset-0 h-full w-full"
      />

      {/* Top-left: studio mark. Plain text, no pill. pointer-events:none
          so the iframe keeps cursor-follow when cursor crosses it. */}
      <div className="pointer-events-none absolute left-6 top-6 z-10 font-mono text-xs uppercase tracking-[0.2em] text-white/70 md:left-10 md:top-10">
        {lead.name}
        <span className="text-white/40">/ studio</span>
      </div>

      {/* Bottom-left: big headline. pointer-events:none so cursor-follow
          keeps running when cursor is over the title. On mobile the headline
          moves to the top so it doesn't fight the CTAs for vertical space. */}
      <div className="pointer-events-none absolute left-6 right-6 top-20 z-10 md:left-10 md:right-auto md:top-auto md:bottom-32 md:max-w-md md:p-0">
        <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
          <BlurText
            text="Бот, парсер или SaaS — за 14 дней, не за 3 месяца"
            wordClassName="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
            delay={90}
            direction="top"
            stepDuration={0.3}
          />
        </h1>
      </div>

      {/* Bottom-right: description + CTAs.
          Mobile: full-width stack at the bottom, centered.
          Desktop: right-aligned column above the watermark strip.
          Buttons are fully interactive: native pointer-events, real hover,
          real focus ring. z-20 keeps them above the gradient fade. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-20 z-20 mx-auto flex max-w-sm flex-col items-stretch gap-4 px-6 md:inset-x-auto md:right-10 md:bottom-40 md:mx-0 md:max-w-sm md:items-end md:px-0">
        <p className="text-pretty text-center text-base text-white/85 md:text-right md:text-lg">
          Fullstack-разработчик с рейтингом 5.0 на Kwork. Без менеджеров
          и подрядчиков — общаетесь напрямую с тем, кто пишет код. Деплой
          на вашем сервере, исходники — ваши.
        </p>
        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
          <a
            href={lead.kworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: 'lg',
              className:
                'pointer-events-auto bg-white text-black shadow-[0_8px_24px_rgba(0,0,0,0.5)] ring-1 ring-white/30 hover:bg-white/90',
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
                'pointer-events-auto border-white/40 bg-black/40 text-white shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-sm hover:bg-white/10',
            })}
          >
            Смотреть кворки
          </a>
        </div>
      </div>

      {/* Bottom fade keeps the text readable. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black to-transparent md:h-24" />

      {/* Watermark strip — covers ONLY the Spline viewer's "Build with
          Spline" footer (bottom-right of the iframe). Color matches
          section bg (bg-black) so it merges cleanly. Tall enough (h-10)
          to mask the watermark link + logo, kept narrow so it doesn't
          shade the CTAs (which sit at bottom-20/bottom-40). */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 z-40 h-10 w-72 bg-black"
      />
    </section>
  )
}