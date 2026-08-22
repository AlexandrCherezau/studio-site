import { lead, partner, type TeamMember } from '@/lib/studio'
import { Star } from 'lucide-react'

// ponytail: lucide-react no longer ships a GitHub glyph in this version —
// inline an SVG so we don't add a new dependency just for one icon.
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.16 1.18a10.95 10.95 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.17v3.22c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

function MemberCard({ member, featured }: { member: TeamMember; featured: boolean }) {
  return (
    <article
      className={
        featured
          ? 'rounded-2xl border border-border/60 bg-background p-8 md:p-10'
          : 'rounded-2xl border border-border/60 bg-background p-6 md:p-8'
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-semibold tracking-tight">
              {member.name}
            </h3>
            {featured && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                Lead
              </span>
            )}
          </div>
          <a
            href={member.kworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            @{member.handle}
          </a>
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border/60 bg-muted/40 px-2 py-1 text-xs">
          <Star className="size-3 fill-current text-yellow-500" />
          <span className="font-medium">{member.stats.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">
            · {member.stats.reviews} отзывов
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm font-medium text-foreground/90">
        {member.tagline}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {member.bio}
      </p>

      <ul className="mt-5 grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-2">
        {member.stack.map((tech) => (
          <li key={tech} className="flex items-start gap-2">
            <span className="mt-1 size-1 shrink-0 rounded-full bg-foreground/40" />
            <span>{tech}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/60 pt-5 text-xs text-muted-foreground">
        <span>{member.since}</span>
        <span>·</span>
        <span>{member.stats.orders} заказов выполнено</span>
        <span>·</span>
        <span>{member.stats.completion}% сдано успешно</span>
        <span>·</span>
        <span>{member.stats.onTime}% вовремя</span>
        {member.stats.repeat > 0 && (
          <>
            <span>·</span>
            <span>{member.stats.repeat}% повторных</span>
          </>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={member.kworkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
        >
          Профиль на Kwork ↗
        </a>
        {member.githubUrl && (
          <a
            href={member.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
          >
            <GithubIcon className="size-3" />
            GitHub
          </a>
        )}
      </div>
    </article>
  )
}

export function TeamSection() {
  return (
    <section id="team" className="relative border-t border-border/60 bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Кто делает работу
          </h2>
          <p className="mt-3 text-muted-foreground">
            Маленькая команда — два fullstack-разработчика с рейтингом 5.0 на
            Kwork. Работаем вместе, отвечаем лично, деплоим на вашем сервере.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <MemberCard member={lead} featured />
          </div>
          <div className="lg:col-span-2">
            <MemberCard member={partner} featured={false} />
          </div>
        </div>
      </div>
    </section>
  )
}