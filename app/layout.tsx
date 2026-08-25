import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
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
        {/* ponytail: warm the connection to the Spline viewer CDN before
            the iframe ever asks for it. Saves one round-trip (DNS +
            TLS handshake) — typically 80–250ms on first visit. preview
            is also preconnected in case the Spline viewer redirects to
            its prod assets. type="preconnect" without crossorigin is
            enough for the iframe HTML; crossorigin is added via the
            second hint for the scene-file asset which is fetched as a
            CORS request from inside the viewer. */}
        <link rel="preconnect" href="https://my.spline.design" />
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
