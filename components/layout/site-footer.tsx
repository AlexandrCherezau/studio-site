import { lead } from '@/lib/studio'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-start md:justify-between">
        <div>
          <div className="font-medium text-foreground">{lead.name}</div>
          <div className="mt-1">Fullstack-разработчик · рейтинг 5.0 на Kwork</div>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <a
            href={lead.kworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            kwork / {lead.handle}
          </a>
          {lead.githubUrl && (
            <a
              href={lead.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              github / {lead.handle}
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}