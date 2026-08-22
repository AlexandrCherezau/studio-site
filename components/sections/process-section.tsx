import { process } from '@/lib/studio'

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative border-t border-border/60 bg-background px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Как устроена работа
          </h2>
          <p className="mt-3 text-muted-foreground">
            Один формат для любого проекта, независимо от стека.
          </p>
        </div>

        <ol className="grid gap-6 md:grid-cols-3">
          {process.map((item) => (
            <li
              key={item.step}
              className="rounded-xl border border-border/60 bg-background p-6"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}