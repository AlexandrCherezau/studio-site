import Link from 'next/link'
import { lead } from '@/lib/studio'
import { ThemeToggle } from '@/components/layout/theme-toggle'

const NAV = [
  { href: '#services', label: 'Услуги' },
  { href: '#team', label: 'Команда' },
  { href: '#work', label: 'Кворки' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#cases', label: 'Кейсы' },
  { href: '#process', label: 'Процесс' },
  { href: '#contact', label: 'Контакт' },
] as const

export function SiteHeader() {
  return (
    <header className="scroll-header-shadow sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-semibold tracking-tight text-foreground"
        >
          {lead.name}
          <span className="ml-1 text-muted-foreground">.</span>
        </Link>
        <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}