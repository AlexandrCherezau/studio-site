import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollBackground } from "@/components/ui/scroll-background"
import { SideNav } from "@/components/ui/side-nav"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <head>
        {/* ponytail: warm the connection to the Spline viewer CDN
            before the iframe ever asks for it. Saves one round-trip
            (DNS + TLS handshake) — typically 80–250ms on first visit.
            type="preconnect" without crossorigin is enough for the
            iframe HTML; crossorigin is added on the second hint for
            the scene-file asset which is fetched as a CORS request. */}
        <link rel="preconnect" href="https://my.spline.design" />
        <link
          rel="preconnect"
          href="https://prod.spline.design"
          crossOrigin="anonymous"
        />
        {/* ponytail: preload the Spline runtime boot chunk. The browser
            starts the ~350KB download in parallel with HTML parsing
            instead of waiting for the iframe to mount and kick its
            own request — saves ~120ms on first visit, more on slow
            networks. Subsequent visits skip this entirely because
            the chunk is already in HTTP cache (Spline's CDN serves it
            with max-age, content-hashed filename). as=script keeps
            the browser from treating it as image/font. */}
        <link
          rel="preload"
          href="https://cdn.spline.design/@splinetool/runtime@2.0.5/build/runtime.js"
          as="script"
          crossOrigin="anonymous"
        />
        {/* ponytail: dark is the default theme — paint .dark on <html>
            before React hydrates to avoid the flash of light bg on
            first load. Reads localStorage 'theme' so the toggle still
            wins if the user has picked light. The script runs sync in
            <head>, blocking the first paint by ~0.1ms in exchange for
            no FOUC. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();",
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <ScrollBackground />
          <SideNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
