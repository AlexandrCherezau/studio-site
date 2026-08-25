import { process } from '@/lib/studio'

export function ProcessSection() {
  return (
    // ponytail: bg-background, large display number as the signature
    // element. Apple-style: big number = visual anchor, not decoration.
    <section
      id="process"
      className="relative bg-background px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="view-reveal mb-16 max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            05 — Процесс
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Как устроена работа
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Один формат для любого проекта, независимо от стека.
          </p>
        </div>

        <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
          {process.map((item) => (
            <li key={item.step} className="view-reveal">
              <div className="font-mono text-6xl font-light leading-none tracking-tight text-foreground/15 md:text-7xl">
                {item.step}
              </div>
              <h3 className="mt-4 text-lg font-medium">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}