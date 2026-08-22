'use client'

import { SplineScene } from '@/components/ui/splite'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'
import { SCENE_URL } from '@/lib/studio'

export function SplineSceneBasic() {
  return (
    <Card className="relative w-full h-[500px] overflow-hidden bg-black/[0.96]">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#ffffff"
      />

      <div className="flex h-full">
        {/* Left content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center p-8">
          <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Interactive 3D
          </h1>
          <p className="mt-4 max-w-lg text-neutral-300">
            Bring your UI to life with beautiful 3D scenes. Create immersive
            experiences that capture attention and enhance your design.
          </p>
        </div>

        {/* Right content */}
        <div className="relative flex-1">
          {/* ponytail: cursor-follow / look-at interactivity lives inside the
              Spline scene itself. Swap SCENE_URL to a published scene that
              has lookAt or follow events wired up on its meshes. */}
          <SplineScene scene={SCENE_URL} className="h-full w-full" />
        </div>
      </div>
    </Card>
  )
}