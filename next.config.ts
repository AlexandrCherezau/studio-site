import type { NextConfig } from "next"

// ponytail: immutable 1-year cache for self-hosted static assets
// under /public/. Browser HTTP cache does the work — second visit
// doesn't re-fetch. Bump filename to v2 etc. if an asset changes.
// The Spline iframe itself is cross-origin to our domain so these
// headers don't touch it; the browser caches the Spline chunks on
// its own (Spline's CDN already sets sensible Cache-Control
// values).
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/3d-models/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/portfolio/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/hero.gif",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/preview.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
}

export default nextConfig
