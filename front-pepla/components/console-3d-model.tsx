"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei"
import { Suspense } from "react"

interface Console3DModelProps {
  consoleSlug: string
}

const consoleModels: Record<string, string> = {
  "play-station-1": "/models/playstation-1/scene.gltf",
  "play-station-2": "/models/playstation-2/scene.gltf",
  "play-station-3": "/models/playstation-3/scene.gltf",
  "play-station-4": "/models/playstation-4/scene.gltf",
  "nintendo-64": "/models/nintendo-64/scene.gltf",
  "gamecube": "/models/gamecube/scene.gltf",
  "wii": "/models/wii/scene.gltf",
  "xbox": "/models/xbox/scene.gltf",
  "xbox-360": "/models/xbox-360/scene.gltf",
  "play-station-portable-psp": "/models/play-station-portable-psp/scene.gltf",
}

const consoleSettings: Record<
  string,
  {
    scale: number
    position?: [number, number, number]
    rotation?: [number, number, number]
  }
> = {
   "play-station-1": {
  scale: 1,
  rotation: [-0.45, -0.65, -0.08],
},
  "play-station-2": { scale: 22 },
  "play-station-3": { scale: 9 },
  "play-station-4": { scale: 0.2 },

  "nintendo-64": { scale: 4 },
  "gamecube": { scale: 0.3 },

  "wii": {
    scale: 0.2,
    rotation: [0, Math.PI / 2, 0],
  },

  "xbox": { scale: 0.04 },
  "xbox-360": { scale: 0.01 },

  "play-station-portable-psp": {
    scale: 0.4,
    position: [0, -0.15, 0],
  },
}

function Model({ slug, path }: { slug: string; path: string }) {
  const { scene } = useGLTF(path)
  const settings = consoleSettings[slug]

  return (
    <Center>
      <primitive
        object={scene}
        scale={settings?.scale ?? 30}
        position={settings?.position ?? [0, 0, 0]}
        rotation={settings?.rotation ?? [0, 0, 0]}
      />
    </Center>
  )
}

const Console3DModel = ({ consoleSlug }: Console3DModelProps) => {
  const modelPath = consoleModels[consoleSlug]

  if (!modelPath) return null

  return (
    <div className="w-full">
      <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
        <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.25} />

              <directionalLight
                position={[-5, -5, -5]}
                intensity={0.25}
              />

            <Environment preset="warehouse" />

            <Model slug={consoleSlug} path={modelPath} />
          </Suspense>

          <OrbitControls
            enableZoom={true}
            autoRotate={true}
            autoRotateSpeed={1.5}
            minDistance={2}
            maxDistance={10}
          />
        </Canvas>
      </div>

      <p className="text-center text-sm text-gray-500 mt-2">
        Arrastra para rotar
      </p>
    </div>
  )
}

export default Console3DModel