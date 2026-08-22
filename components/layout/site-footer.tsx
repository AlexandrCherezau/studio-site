import { lead, partner, team } from '@/lib/studio'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-start md:justify-between">
        <div>
          <div className="font-medium text-foreground">
            {lead.name} · {partner.name}
          </div>
          <div className="mt-1">
            Fullstack-дуэт · рейтинг 5.0 на Kwork
          </div>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {team.map((m) => (
              <a
                key={m.handle}
                href={m.kworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                kwork / {m.handle} ↗
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {team.map((m) =>
              m.githubUrl ? (
                <a
                  key={m.handle + '-gh'}
                  href={m.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  github / {m.handle} ↗
                </a>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}